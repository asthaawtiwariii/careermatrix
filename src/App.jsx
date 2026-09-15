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
import LoginPage from './pages/LoginPage';
import { initialStudentProfile, careerPathways } from './data/mockData';
import { 
  checkBackendHealth,
  saveProfileToBackend, 
  analyzeProfileOnBackend, 
  compareCareersOnBackend, 
  selectCareerOnBackend, 
  fetchSkillGapOnBackend, 
  fetchRoadmapOnBackend 
} from './services/api';

export default function App() {
  // Step 0: Landing, 1: Profile, 2: AI Analysis, 3: Career Matrix, 4: Skill Gap, 5: Roadmap, 'login': Login View
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(1);
  const [profile, setProfile] = useState(initialStudentProfile);
  const [isSampleLoaded, setIsSampleLoaded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Backend Live State
  const [studentId, setStudentId] = useState(1);
  const [selectedCareerName, setSelectedCareerName] = useState("Full Stack Developer");
  const [analysisData, setAnalysisData] = useState(null);
  const [careerComparisons, setCareerComparisons] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  // Authenticated Student State
  const [user, setUser] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    degree: 'B.Tech CS & Engineering (3rd Year)',
    avatar: 'AC',
    isLoggedIn: true
  });

  // Check backend health on initial load
  useEffect(() => {
    async function checkHealth() {
      const health = await checkBackendHealth();
      if (health && health.status === "ok") {
        setBackendConnected(true);
        console.log("FastAPI backend connected:", health);
      } else {
        setBackendConnected(false);
      }
    }
    checkHealth();
  }, []);

  // Stepper mapping:
  const getStepperActiveStep = () => {
    if (currentStep === 0 || currentStep === 'login') return 0;
    if (currentStep === 1) return 1;
    if (currentStep === 2) return 2;
    if (currentStep === 3) return 3;
    if (currentStep === 4 || currentStep === 5) return 4;
    return 1;
  };

  const handleStepperJump = (stepperStep) => {
    if (stepperStep === 1) setCurrentStep(1);
    else if (stepperStep === 2) setCurrentStep(2);
    else if (stepperStep === 3) setCurrentStep(3);
    else if (stepperStep === 4) setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = () => {
    setCurrentStep(1);
    setMaxUnlockedStep(prev => Math.max(prev, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartWithDemo = () => {
    setProfile(initialStudentProfile);
    setIsSampleLoaded(true);
    setCurrentStep(1);
    setMaxUnlockedStep(prev => Math.max(prev, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Trigger API Analysis Workflow
  const handleAnalyzeProfile = async () => {
    setIsLoading(true);
    try {
      // POST /api/profile
      const savedProfile = await saveProfileToBackend(profile);
      const activeId = savedProfile?.id || 1;
      setStudentId(activeId);

      // POST /api/analyze/{student_id}
      const analysis = await analyzeProfileOnBackend(activeId);
      setAnalysisData(analysis);

      // POST /api/careers/compare/{student_id}
      const comparisonRes = await compareCareersOnBackend(activeId);
      if (comparisonRes?.careers) {
        setCareerComparisons(comparisonRes.careers);
      }
    } catch (err) {
      console.warn("Backend API call failed, continuing with client state:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(2);
      setMaxUnlockedStep(prev => Math.max(prev, 2));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewMatrix = async () => {
    // If career comparisons aren't loaded yet, try fetching from backend
    if (!careerComparisons && studentId) {
      try {
        const comparisonRes = await compareCareersOnBackend(studentId);
        if (comparisonRes?.careers) {
          setCareerComparisons(comparisonRes.careers);
        }
      } catch (err) {
        console.warn("Could not fetch comparisons:", err);
      }
    }
    setCurrentStep(3);
    setMaxUnlockedStep(prev => Math.max(prev, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Select Career & Fetch Skill Gap
  const handleSelectPath = async (careerNameOrId) => {
    let careerName = careerNameOrId;
    // Map id to title if an ID was passed
    if (careerNameOrId === "full-stack-developer") careerName = "Full Stack Developer";
    else if (careerNameOrId === "python-developer") careerName = "Python Developer";
    else if (careerNameOrId === "ai-ml-engineer") careerName = "AI/ML Engineer";
    else if (careerNameOrId === "data-analyst") careerName = "Data Analyst";
    else if (careerNameOrId === "cloud-devops-engineer") careerName = "Cloud/DevOps Engineer";

    setSelectedCareerName(careerName);
    setIsLoading(true);

    try {
      // POST /api/careers/select
      await selectCareerOnBackend(studentId, careerName);

      // POST /api/skill-gap
      const gapRes = await fetchSkillGapOnBackend(studentId, careerName);
      if (gapRes) {
        setSkillGapData(gapRes);
      }
    } catch (err) {
      console.warn("Skill gap fetch failed, falling back to client defaults:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(4);
      setMaxUnlockedStep(prev => Math.max(prev, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 3. Generate 30/60/90 Roadmap
  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    try {
      // POST /api/roadmap
      const roadmapRes = await fetchRoadmapOnBackend(studentId, selectedCareerName);
      if (roadmapRes) {
        setRoadmapData(roadmapRes);
      }
    } catch (err) {
      console.warn("Roadmap fetch failed, using fallback template:", err);
    } finally {
      setIsLoading(false);
      setCurrentStep(5);
      setMaxUnlockedStep(prev => Math.max(prev, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = () => {
    setProfile(initialStudentProfile);
    setIsSampleLoaded(true);
    if (currentStep === 0) {
      setCurrentStep(1);
      setMaxUnlockedStep(1);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentStep(1);
    setMaxUnlockedStep(prev => Math.max(prev, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser({
      name: 'Guest Student',
      email: 'guest@careermatrix.ai',
      degree: 'Undergraduate',
      avatar: 'GS',
      isLoggedIn: false
    });
  };

  return (
    <div className="saas-layout">
      {/* SaaS Dashboard Sidebar */}
      <Sidebar 
        currentStep={currentStep}
        onNavigate={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenLogin={() => setCurrentStep('login')}
        onLogout={handleLogout}
        onLoadSample={handleLoadSample}
        onReset={() => handleReset(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedPathId={selectedCareerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        onSelectPath={(pathId) => handleSelectPath(pathId)}
      />

      {/* Main Content Wrapper */}
      <div className="saas-main-wrapper">
        {/* Top Header */}
        <Header 
          currentStep={currentStep}
          onReset={handleReset}
          onLoadSample={handleLoadSample}
          isSampleLoaded={isSampleLoaded}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenLogin={() => setCurrentStep('login')}
          user={user}
        />

        {/* Content Container */}
        <main className="main-content">
          {/* Progress Stepper for steps 1-4 */}
          {typeof currentStep === 'number' && currentStep > 0 && (
            <WorkflowProgress 
              currentStep={getStepperActiveStep()} 
              onStepClick={handleStepperJump}
              maxUnlockedStep={maxUnlockedStep}
            />
          )}

          {/* View: Login Page */}
          {currentStep === 'login' && (
            <LoginPage 
              onLoginSuccess={handleLoginSuccess}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {/* View 0: Landing Page */}
          {currentStep === 0 && (
            <LandingPage 
              onStart={handleStart} 
              onStartWithDemo={handleStartWithDemo} 
            />
          )}

          {/* View 1: Student Profile Page (Step 1 of 4) */}
          {currentStep === 1 && (
            <ProfilePage 
              profile={profile}
              setProfile={setProfile}
              onAnalyze={handleAnalyzeProfile}
              onLoadSample={handleLoadSample}
            />
          )}

          {/* View 2: AI Profile Analysis (Step 2 of 4) */}
          {currentStep === 2 && (
            <AnalysisPage 
              profile={profile}
              analysisData={analysisData}
              onViewMatrix={handleViewMatrix}
            />
          )}

          {/* View 3: Career Matrix (Step 3 of 4) */}
          {currentStep === 3 && (
            <CareerMatrixPage 
              careerComparisons={careerComparisons}
              onSelectPath={handleSelectPath}
              onStageNavigate={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* View 4: Selected Career & Skill Gap (Step 4 of 4 - A) */}
          {currentStep === 4 && (
            <SkillGapPage 
              selectedCareerName={selectedCareerName}
              skillGapData={skillGapData}
              onSelectCareerName={(cName) => handleSelectPath(cName)}
              onGenerateRoadmap={handleGenerateRoadmap}
              onBackToMatrix={() => setCurrentStep(3)}
              onStageNavigate={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* View 5: 30/60/90-Day Roadmap (Step 4 of 4 - B) */}
          {currentStep === 5 && (
            <RoadmapPage 
              selectedCareerName={selectedCareerName}
              roadmapData={roadmapData}
              onBackToSkillGap={() => setCurrentStep(4)}
              onBackToMatrix={() => setCurrentStep(3)}
              onEditProfile={() => setCurrentStep(1)}
              onStageNavigate={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Global Footer with Mandatory Disclaimers */}
        <Footer />
      </div>
    </div>
  );
}
