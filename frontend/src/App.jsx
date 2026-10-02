import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import WorkflowProgress from './components/WorkflowProgress';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import AnalysisPage from './pages/AnalysisPage';
import CareerMatrixPage from './pages/CareerMatrixPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import { initialStudentProfile } from './data/mockData';
import { 
  checkBackendHealth,
  generateCareerMatrix,
  fetchSkillGapOnBackend,
  fetchRoadmapOnBackend
} from './services/api';

export default function App() {
  // Step 0: Overview/Landing, 1: Profile, 2: AI Analysis, 3: Career Paths, 4: Skill Gap, 5: Roadmap
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(1);
  const [profile, setProfile] = useState(initialStudentProfile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dynamic Session State
  const [selectedCareerName, setSelectedCareerName] = useState("Full Stack Developer");
  const [analysisData, setAnalysisData] = useState(null);
  const [careerComparisons, setCareerComparisons] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  // User details for active session
  const user = {
    name: 'Student User',
    degree: profile?.education?.degree || 'Undergraduate Student',
    year: profile?.education?.year || 'Active Profile',
    avatar: 'SU'
  };

  // Check backend health on initial load and periodically
  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      const health = await checkBackendHealth();
      if (isMounted) {
        setBackendConnected(!!(health && health.status === "ok"));
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Stepper mapping
  const getStepperActiveStep = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 1) return 1;
    if (currentStep === 2) return 2;
    if (currentStep === 3) return 3;
    if (currentStep === 4 || currentStep === 5) return 4;
    return 1;
  };

  const handleStepperJump = (stepperStep) => {
    if (stepperStep === 1) setCurrentStep(1);
    else if (stepperStep === 2 && maxUnlockedStep >= 2) setCurrentStep(2);
    else if (stepperStep === 3 && maxUnlockedStep >= 3) setCurrentStep(3);
    else if (stepperStep === 4 && maxUnlockedStep >= 4) setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = () => {
    setCurrentStep(1);
    setMaxUnlockedStep(prev => Math.max(prev, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Submit Real User Profile & Generate Career Matrix via Gemini API
  const handleAnalyzeProfile = async () => {
    setIsLoading(true);
    try {
      const result = await generateCareerMatrix(profile);
      
      setAnalysisData({
        profile_summary: result.profile_summary,
        strengths: result.strengths,
        current_level: result.current_level,
        profile_strength_score: result.profile_strength_score
      });

      if (result.careers && result.careers.length > 0) {
        setCareerComparisons(result.careers);
        setSelectedCareerName(result.careers[0].career_name);
      }

      if (result.skill_gap) {
        setSkillGapData(result.skill_gap);
      }

      if (result.roadmap) {
        setRoadmapData(result.roadmap);
      }
    } catch (err) {
      console.warn("Backend API call warning:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(2);
      setMaxUnlockedStep(prev => Math.max(prev, 2));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewMatrix = () => {
    setCurrentStep(3);
    setMaxUnlockedStep(prev => Math.max(prev, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Select Career & Fetch Dynamic Skill Gap
  const handleSelectPath = async (careerNameOrId) => {
    let careerName = careerNameOrId;
    if (careerNameOrId === "full-stack-developer") careerName = "Full Stack Developer";
    else if (careerNameOrId === "python-developer") careerName = "Python Developer";
    else if (careerNameOrId === "ai-ml-engineer") careerName = "AI/ML Engineer";
    else if (careerNameOrId === "data-analyst") careerName = "Data Analyst";
    else if (careerNameOrId === "cloud-devops-engineer") careerName = "Cloud/DevOps Engineer";

    setSelectedCareerName(careerName);
    setIsLoading(true);

    try {
      const gapRes = await fetchSkillGapOnBackend(profile, careerName);
      if (gapRes) {
        setSkillGapData(gapRes);
      }
    } catch (err) {
      console.warn("Skill gap fetch warning:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(4);
      setMaxUnlockedStep(prev => Math.max(prev, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 3. Generate Dynamic 30/60/90 Roadmap
  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    try {
      const roadmapRes = await fetchRoadmapOnBackend(profile, selectedCareerName);
      if (roadmapRes) {
        setRoadmapData(roadmapRes);
      }
    } catch (err) {
      console.warn("Roadmap fetch warning:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(5);
      setMaxUnlockedStep(prev => Math.max(prev, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentStep(1); // Go straight to profile entry for new assessment
    setProfile(initialStudentProfile);
    setAnalysisData(null);
    setCareerComparisons(null);
    setSkillGapData(null);
    setRoadmapData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="saas-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentStep={currentStep}
        onNavigate={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onReset={handleReset}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="saas-main-wrapper">
        <Header 
          currentStep={currentStep}
          onReset={handleReset}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
          backendConnected={backendConnected}
          onCheckBackend={async () => {
            const h = await checkBackendHealth();
            setBackendConnected(!!(h && h.status === 'ok'));
          }}
          onNavigate={(step) => {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <main className="main-content">
          {/* Progress Stepper for Steps 1 - 5 */}
          {typeof currentStep === 'number' && currentStep > 0 && (
            <WorkflowProgress 
              currentStep={getStepperActiveStep()} 
              onStepClick={handleStepperJump}
              maxUnlockedStep={maxUnlockedStep}
            />
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', margin: '1rem 0' }}>
              <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ marginTop: '0.75rem', fontWeight: 500, color: 'var(--primary)', fontSize: '0.875rem' }}>
                Analyzing profile with Gemini AI...
              </p>
            </div>
          )}

          {/* View 0: Overview Dashboard */}
          {currentStep === 0 && (
            <LandingPage 
              profile={profile}
              careerComparisons={careerComparisons}
              onStart={handleStart}
              onSelectPath={handleSelectPath}
              onEditProfile={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* View 1: Student Profile Page */}
          {currentStep === 1 && (
            <ProfilePage 
              profile={profile}
              setProfile={setProfile}
              onAnalyze={handleAnalyzeProfile}
            />
          )}

          {/* View 2: AI Profile Analysis */}
          {currentStep === 2 && (
            <AnalysisPage 
              profile={profile}
              analysisData={analysisData}
              onViewMatrix={handleViewMatrix}
            />
          )}

          {/* View 3: Career Paths */}
          {currentStep === 3 && (
            <CareerMatrixPage 
              careerComparisons={careerComparisons}
              onSelectPath={handleSelectPath}
            />
          )}

          {/* View 4: Skill Gaps */}
          {currentStep === 4 && (
            <SkillGapPage 
              selectedCareerName={selectedCareerName}
              skillGapData={skillGapData}
              onSelectCareerName={(cName) => handleSelectPath(cName)}
              onGenerateRoadmap={handleGenerateRoadmap}
              onBackToMatrix={() => setCurrentStep(3)}
            />
          )}

          {/* View 5: 90-Day Roadmap */}
          {currentStep === 5 && (
            <RoadmapPage 
              selectedCareerName={selectedCareerName}
              roadmapData={roadmapData}
              onBackToSkillGap={() => setCurrentStep(4)}
              onBackToMatrix={() => setCurrentStep(3)}
              onEditProfile={() => setCurrentStep(1)}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
