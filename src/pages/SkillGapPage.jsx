import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Target,
  Database,
  Sparkles
} from 'lucide-react';
import { careerPathways } from '../data/mockData';
import PipelineBanner from '../components/PipelineBanner';

export default function SkillGapPage({ 
  selectedCareerName,
  skillGapData, 
  onSelectCareerName, 
  onGenerateRoadmap, 
  onBackToMatrix,
  onStageNavigate 
}) {
  // Determine pathway title
  const currentTitle = selectedCareerName || skillGapData?.career_name || "Full Stack Developer";
  const defaultPathway = careerPathways.find(p => p.title.toLowerCase() === currentTitle.toLowerCase()) || careerPathways[0];

  const alignmentScore = skillGapData?.alignment_score ?? defaultPathway.alignmentPercent;
  const skillsList = skillGapData?.skills || defaultPathway.skillsComparison.map(s => ({
    skill_name: s.name,
    current_skill_level: s.current,
    required_skill_level: s.status === 'match' ? 'Matched' : 'Action Needed',
    gap: s.status === 'match' ? 'On Track' : 'Action Needed',
    priority: s.status === 'match' ? 'MEDIUM' : 'HIGH',
    reason: s.note,
    current_score: s.currentScore,
    required_score: s.requiredScore
  }));

  const priorityHigh = skillGapData?.priority_breakdown?.high || defaultPathway.priorities.high;
  const priorityMedium = skillGapData?.priority_breakdown?.medium || defaultPathway.priorities.medium;
  const priorityLow = skillGapData?.priority_breakdown?.low || defaultPathway.priorities.low;

  const getSkillBadge = (level) => {
    const l = (level || '').toLowerCase();
    if (l.includes('strong')) return <span className="badge badge-emerald">Strong</span>;
    if (l.includes('intermed')) return <span className="badge badge-indigo">Intermediate</span>;
    if (l.includes('beginn') || l.includes('novice')) return <span className="badge badge-amber">Beginner</span>;
    return <span className="badge badge-slate">{level}</span>;
  };

  const getSkillBarClass = (level) => {
    const l = (level || '').toLowerCase();
    if (l.includes('strong')) return 'skill-level-strong';
    if (l.includes('intermed')) return 'skill-level-intermediate';
    if (l.includes('beginn')) return 'skill-level-beginner';
    return 'skill-level-gap';
  };

  return (
    <div className="skill-gap-page" style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* 1. DECISION PIPELINE BANNER (Active Stage 3: SKILL GAPS) */}
      <PipelineBanner 
        activeStage={3} 
        onStageClick={(stage) => {
          if (onStageNavigate) {
            if (stage === 1) onStageNavigate(1);
            else if (stage === 2) onStageNavigate(3);
            else if (stage === 3) onStageNavigate(4);
            else if (stage === 4) onStageNavigate(5);
          }
        }} 
      />

      {/* Navigation & Role Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.75rem 0 1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToMatrix}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Career Matrix</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Evaluate Role:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}
            value={currentTitle}
            onChange={(e) => onSelectCareerName(e.target.value)}
          >
            {careerPathways.map(p => (
              <option key={p.title} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Career Title Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid var(--border-light)', marginBottom: '2rem', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-indigo">
                Step 4 of 4 — Skill Gap Analysis
              </span>
              {skillGapData && (
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                  <Database size={11} /> API Computed
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              {currentTitle}
            </h1>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-indigo)' }}>
              Current Profile vs Required Skills
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Diagnostic comparison mapping your existing student baseline against enterprise expectations.
            </p>
          </div>

          <div style={{ background: 'var(--bg-accent-soft)', border: '1px solid var(--border-active)', padding: '0.875rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '150px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary-indigo)' }}>Pathway Alignment</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{alignmentScore}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decision Indicator</div>
          </div>
        </div>
      </div>

      {/* 1. Visual Skill Comparison Matrix */}
      <div className="card" style={{ marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Target size={20} color="var(--primary-indigo)" />
            <h2 style={{ fontSize: '1.25rem' }}>Visual Skill Level Comparison</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /> Strong (Ready)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6' }} /> Intermediate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /> Beginner / Gap
            </span>
          </div>
        </div>

        {/* Skills List with Enhanced Progress Bars */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {skillsList.map((skill) => (
            <div key={skill.skill_name || skill.name} className="skill-bar-row">
              {/* Skill Name & Current Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {skill.skill_name || skill.name}
                </span>
                {getSkillBadge(skill.current_skill_level || skill.current)}
              </div>

              {/* Visual Progress Bar (Current vs Target with Dual-Track) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>{skill.reason || skill.note}</span>
                  <span style={{ fontWeight: 600 }}>{skill.current_score || skill.currentScore}% of required {skill.required_score || skill.requiredScore}%</span>
                </div>
                <div className="skill-bar-container">
                  <div 
                    className={`skill-bar-progress ${getSkillBarClass(skill.current_skill_level || skill.current)}`}
                    style={{ width: `${skill.current_score || skill.currentScore}%` }}
                  />
                  {/* Target Goal Marker Line */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: `${skill.required_score || skill.requiredScore}%`, 
                      top: 0, 
                      bottom: 0, 
                      width: '2px', 
                      background: 'rgba(15, 23, 42, 0.4)', 
                      zIndex: 2 
                    }} 
                    title={`Industry Target: ${skill.required_score || skill.requiredScore}%`}
                  />
                </div>
              </div>

              {/* Status Indicator */}
              <div style={{ textAlign: 'right' }}>
                {((skill.gap || '').includes('Track') || skill.status === 'match') ? (
                  <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle2 size={13} /> On Track
                  </span>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertTriangle size={13} /> Action Needed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Prioritized Skill Gaps */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Prioritized Skill Gaps
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Focus your limited time strategically. High-priority items unlock the fastest career readiness.
          </p>
        </div>

        {/* HIGH PRIORITY */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
            <span className="badge badge-rose" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 800 }}>
              HIGH PRIORITY
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Critical blockers that define everyday competence in this role
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {priorityHigh.map((item) => (
              <div 
                key={item.name} 
                className="card priority-card-high" 
                style={{ 
                  borderLeft: '4px solid #f43f5e', 
                  background: '#ffffff',
                  padding: '1.35rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.name}
                  </h3>
                  <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                    {item.tag || "High Priority"}
                  </span>
                </div>

                <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '0.6rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#be123c', marginBottom: '0.2rem' }}>
                    WHY IT MATTERS:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#881337', lineHeight: 1.45, fontWeight: 500 }}>
                    "{item.whyItMatters || item.reason}"
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '0.35rem' }}>
                  <span>Current: <strong>{item.currentLevel || "Beginner"}</strong></span>
                  <span>Target: <strong>{item.targetLevel || "Production-ready"}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEDIUM PRIORITY */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
            <span className="badge badge-amber" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 800 }}>
              MEDIUM PRIORITY
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Important concepts that elevate your code from junior to solid contributor
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {priorityMedium.map((item) => (
              <div 
                key={item.name} 
                className="card priority-card-medium" 
                style={{ 
                  borderLeft: '4px solid #f59e0b', 
                  background: '#ffffff',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.name}
                  </h4>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                    {item.tag || "Medium Priority"}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {item.whyItMatters || item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LOW PRIORITY */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
            <span className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', fontWeight: 800 }}>
              LOW PRIORITY
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Polishing skills to master after core competencies are locked in
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {priorityLow.map((item) => (
              <div 
                key={item.name} 
                className="card priority-card-low" 
                style={{ 
                  borderLeft: '4px solid var(--primary-indigo)', 
                  background: '#ffffff',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.name}
                  </h4>
                  <span className="badge badge-slate" style={{ fontSize: '0.7rem' }}>
                    {item.tag || "Low Priority"}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {item.whyItMatters || item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onGenerateRoadmap}
          id="generate-roadmap-btn"
          style={{ minWidth: '280px' }}
        >
          <Sparkles size={18} />
          <span>Generate My Roadmap</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
