import React, { useState } from 'react';
import { ArrowLeft, Check, Compass, Printer } from 'lucide-react';
import { careerPathways } from '../data/mockData';

export default function RoadmapPage({ 
  selectedCareerName, 
  roadmapData, 
  onBackToSkillGap, 
  onBackToMatrix, 
  onEditProfile 
}) {
  const currentTitle = selectedCareerName || roadmapData?.career_name || "Full Stack Developer";
  const defaultPathway = careerPathways.find(p => p.title.toLowerCase() === currentTitle.toLowerCase()) || careerPathways[0];

  const days30 = roadmapData?.day_30 || defaultPathway.roadmap.days30;
  const days60 = roadmapData?.day_60 || defaultPathway.roadmap.days60;
  const days90 = roadmapData?.day_90 || defaultPathway.roadmap.days90;

  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (id) => {
    setCompletedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      num: "01",
      duration: "Days 1–30",
      theme: "Foundation",
      goal: days30?.milestone_goal || "Strengthen Core Fundamentals",
      tasks: days30?.tasks || []
    },
    {
      num: "02",
      duration: "Days 31–60",
      theme: "Build & Practice",
      goal: days60?.milestone_goal || "Hands-on Feature Development",
      tasks: days60?.tasks || []
    },
    {
      num: "03",
      duration: "Days 61–90",
      theme: "Projects & Interview Preparation",
      goal: days90?.milestone_goal || "Portfolio Deployment & Interview Readiness",
      tasks: days90?.tasks || []
    }
  ];

  return (
    <div className="roadmap-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onBackToSkillGap}
            style={{ paddingLeft: 0, marginBottom: '0.25rem', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} /> Back to Skill Gaps
          </button>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Your 90-Day Roadmap
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            A structured path for {currentTitle}.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => window.print()}
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onBackToMatrix}
          >
            <Compass size={14} />
            <span>All Pathways</span>
          </button>
        </div>
      </div>

      {/* Clean Timeline */}
      <div className="timeline">
        {sections.map((sec) => (
          <div key={sec.num} className="timeline-phase">
            <div className="timeline-phase-marker" />
            
            {/* Phase Header */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="timeline-phase-title">
                {sec.num} — {sec.duration}
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {sec.theme}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Goal: {sec.goal}
              </p>
            </div>

            {/* Task list */}
            <ul className="timeline-task-list">
              {sec.tasks.map((task) => {
                const isDone = !!completedTasks[task.id];
                return (
                  <li 
                    key={task.id} 
                    className="timeline-task-item"
                    onClick={() => toggleTask(task.id)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      opacity: isDone ? 0.6 : 1,
                      backgroundColor: isDone ? 'var(--bg-subtle)' : 'var(--bg-surface)'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-default)',
                      backgroundColor: isDone ? 'var(--primary)' : 'var(--bg-surface)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {isDone && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none' }}>
                        {task.title}
                      </div>
                      {task.desc && (
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                          {task.desc}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Navigation Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-default)' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToSkillGap}
        >
          <ArrowLeft size={14} />
          <span>Review Skill Gaps</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onEditProfile}
        >
          <span>Update Profile</span>
        </button>
      </div>
    </div>
  );
}
