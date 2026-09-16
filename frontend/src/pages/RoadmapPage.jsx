import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowLeft, 
  Sparkles, 
  Printer, 
  Compass, 
  CheckCircle2, 
  Rocket, 
  Code, 
  Server, 
  CloudUpload,
  Database
} from 'lucide-react';
import { careerPathways } from '../data/mockData';
import PipelineBanner from '../components/PipelineBanner';

export default function RoadmapPage({ 
  selectedCareerName,
  roadmapData, 
  onBackToSkillGap, 
  onBackToMatrix, 
  onEditProfile,
  onStageNavigate 
}) {
  const currentTitle = selectedCareerName || roadmapData?.career_name || "Full Stack Developer";
  const defaultPathway = careerPathways.find(p => p.title.toLowerCase() === currentTitle.toLowerCase()) || careerPathways[0];

  const days30 = roadmapData?.day_30 || defaultPathway.roadmap.days30;
  const days60 = roadmapData?.day_60 || defaultPathway.roadmap.days60;
  const days90 = roadmapData?.day_90 || defaultPathway.roadmap.days90;
  const nextBest = roadmapData?.next_best_action || defaultPathway.nextBestAction;
  const disclaimerText = roadmapData?.disclaimer || 
    "CareerMatrix provides alignment indicators based on the information provided. It does not predict career outcomes or guarantee employment.";

  const allTasks = [
    ...(days30?.tasks || []),
    ...(days60?.tasks || []),
    ...(days90?.tasks || [])
  ];

  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleTask = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const totalCount = allTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="roadmap-page" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* 1. DECISION PIPELINE BANNER (Active Stage 4: ACTION PLAN) */}
      <PipelineBanner 
        activeStage={4} 
        onStageClick={(stage) => {
          if (onStageNavigate) {
            if (stage === 1) onStageNavigate(1);
            else if (stage === 2) onStageNavigate(3);
            else if (stage === 3) onStageNavigate(4);
            else if (stage === 4) onStageNavigate(5);
          }
        }} 
      />

      {/* Top Breadcrumb & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.75rem 0 1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToSkillGap}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Skill Gaps</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handlePrint}
            title="Print or Save PDF"
          >
            <Printer size={15} />
            <span>Print Roadmap</span>
          </button>

          <button
            type="button"
            className="btn btn-subtle btn-sm"
            onClick={onBackToMatrix}
          >
            <Compass size={15} />
            <span>Switch Career Path</span>
          </button>
        </div>
      </div>

      {/* Main Header & Overview Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid var(--border-light)', marginBottom: '2rem', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-emerald">
                Action Plan • 30/60/90 Days
              </span>
              {roadmapData && (
                <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                  <Database size={11} /> API Roadmap
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {currentTitle} Learning Roadmap
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Structured, milestone-driven execution plan transforming identified skill gaps into interview-ready competence.
            </p>
          </div>

          {/* Interactive Progress Meter */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', minWidth: '230px', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <span>ROADMAP COMPLETION</span>
              <span style={{ color: 'var(--primary-indigo)' }}>{progressPercent}%</span>
            </div>
            <div className="progress-bar-track" style={{ height: '10px', marginBottom: '0.4rem' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'right' }}>
              {completedCount} of {totalCount} Milestones Checked
            </div>
          </div>
        </div>
      </div>

      {/* Connected 30/60/90 Timeline Container */}
      <div className="roadmap-timeline-wrapper">
        <div className="roadmap-timeline-line" />

        {/* Phase 1: 30 DAYS — FOUNDATION */}
        <div className="roadmap-phase-card" style={{ borderLeftColor: '#3b82f6', position: 'relative' }}>
          <div className="roadmap-timeline-node" style={{ background: '#3b82f6' }}>1</div>
          <div className="roadmap-phase-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={20} />
              </div>
              <div>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>Month 1</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {days30?.phase || "30 DAYS — FOUNDATION"}
                </h2>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 600, background: '#eff6ff', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-pill)' }}>
              Goal: {days30?.milestone_goal || days30?.milestoneGoal || "Strengthen Core Fundamentals"}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {days30?.tasks?.map((task) => {
              const isChecked = !!checkedTasks[task.id];
              return (
                <div 
                  key={task.id} 
                  className={`task-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isChecked}
                    onChange={() => toggleTask(task.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div>
                    <div className="task-title" style={{ fontWeight: 600, fontSize: '0.95rem', color: isChecked ? 'var(--text-muted)' : 'var(--text-main)' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      {task.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2: 60 DAYS — BUILD */}
        <div className="roadmap-phase-card" style={{ borderLeftColor: '#7c3aed', position: 'relative' }}>
          <div className="roadmap-timeline-node" style={{ background: '#7c3aed' }}>2</div>
          <div className="roadmap-phase-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Server size={20} />
              </div>
              <div>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Month 2</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {days60?.phase || "60 DAYS — BUILD"}
                </h2>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: 600, background: '#f5f3ff', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-pill)' }}>
              Goal: {days60?.milestone_goal || days60?.milestoneGoal || "Complete Functional Integration"}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {days60?.tasks?.map((task) => {
              const isChecked = !!checkedTasks[task.id];
              return (
                <div 
                  key={task.id} 
                  className={`task-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isChecked}
                    onChange={() => toggleTask(task.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div>
                    <div className="task-title" style={{ fontWeight: 600, fontSize: '0.95rem', color: isChecked ? 'var(--text-muted)' : 'var(--text-main)' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      {task.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 3: 90 DAYS — DEPLOY */}
        <div className="roadmap-phase-card" style={{ borderLeftColor: '#10b981', position: 'relative' }}>
          <div className="roadmap-timeline-node" style={{ background: '#10b981' }}>3</div>
          <div className="roadmap-phase-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloudUpload size={20} />
              </div>
              <div>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Month 3</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {days90?.phase || "90 DAYS — DEPLOY"}
                </h2>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600, background: '#ecfdf5', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-pill)' }}>
              Goal: {days90?.milestone_goal || days90?.milestoneGoal || "Deploy Live & Interview Ready"}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {days90?.tasks?.map((task) => {
              const isChecked = !!checkedTasks[task.id];
              return (
                <div 
                  key={task.id} 
                  className={`task-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isChecked}
                    onChange={() => toggleTask(task.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div>
                    <div className="task-title" style={{ fontWeight: 600, fontSize: '0.95rem', color: isChecked ? 'var(--text-muted)' : 'var(--text-main)' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      {task.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FINAL SECTION: Your Next Best Action */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)', border: '2px solid #818cf8', borderRadius: 'var(--radius-lg)', padding: '1.75rem', margin: '2.5rem 0', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--grad-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Rocket size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary-indigo)' }}>
              Actionable Student Priority
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Your Next Best Action
            </h3>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-active)', marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
            "{nextBest?.headline || 'Build a full-stack student project using React + Python + SQL and deploy it.'}"
          </p>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {nextBest?.detail || "Construct a functional portfolio application targeting your critical high-priority skill gaps."}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="badge badge-indigo">Step 1: Set up repository & architecture</div>
          <div className="badge badge-purple">Step 2: Build REST API endpoints with auth</div>
          <div className="badge badge-emerald">Step 3: Connect React client & Deploy live</div>
        </div>
      </div>

      {/* Mandatory Disclaimer & Product Principle */}
      <div className="banner-guidance" style={{ borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
        <Compass size={22} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.875rem' }}>
          <strong>Important Product Principle:</strong> CareerMatrix is designed to help students understand choices rather than make the career decision for them. 
          <br />
          <span style={{ fontSize: '0.825rem', opacity: 0.9 }}>
            "{disclaimerText}"
          </span>
        </div>
      </div>

      {/* Action Footer Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onBackToMatrix}
        >
          <Compass size={18} />
          <span>Compare Another Career Pathway</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={onEditProfile}
        >
          <span>Update Student Profile</span>
        </button>
      </div>
    </div>
  );
}
