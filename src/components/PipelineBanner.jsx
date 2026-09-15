import React from 'react';
import { 
  UserCheck, 
  Compass, 
  Target, 
  CalendarCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PipelineBanner({ activeStage = 2, onStageClick }) {
  const stages = [
    {
      num: 1,
      title: "CURRENT PROFILE",
      subtitle: "Skills, Projects & Academics",
      icon: <UserCheck size={18} />,
      badge: "Verified Profile"
    },
    {
      num: 2,
      title: "POSSIBLE CAREERS",
      subtitle: "5 Pathways Benchmarked",
      icon: <Compass size={18} />,
      badge: "Alignment Scoring"
    },
    {
      num: 3,
      title: "SKILL GAPS",
      subtitle: "High, Med & Low Priorities",
      icon: <Target size={18} />,
      badge: "Why It Matters"
    },
    {
      num: 4,
      title: "ACTION PLAN",
      subtitle: "30/60/90-Day Roadmap",
      icon: <CalendarCheck size={18} />,
      badge: "Next Best Action"
    }
  ];

  return (
    <div className="pipeline-banner-container" role="region" aria-label="Decision Pipeline">
      <div className="pipeline-banner-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-indigo)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={14} />
          <span>Decision-Support Architecture</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Transparent Student Decision Journey
        </span>
      </div>

      <div className="pipeline-grid">
        {stages.map((stg, idx) => {
          const isActive = activeStage === stg.num;
          const isPassed = activeStage > stg.num;

          return (
            <React.Fragment key={stg.num}>
              <div
                className={`pipeline-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                onClick={() => onStageClick && onStageClick(stg.num)}
                title={onStageClick ? `Jump to ${stg.title}` : undefined}
                style={{ cursor: onStageClick ? 'pointer' : 'default' }}
              >
                <div className="pipeline-node-icon">
                  {stg.icon}
                </div>
                <div className="pipeline-node-content">
                  <div className="pipeline-node-badge">
                    {stg.badge}
                  </div>
                  <div className="pipeline-node-title">
                    {stg.title}
                  </div>
                  <div className="pipeline-node-subtitle">
                    {stg.subtitle}
                  </div>
                </div>
              </div>

              {idx < stages.length - 1 && (
                <div className="pipeline-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
