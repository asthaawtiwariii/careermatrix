import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { careerPathways } from '../data/mockData';

export default function SkillGapPage({ 
  selectedCareerName, 
  skillGapData, 
  onSelectCareerName, 
  onGenerateRoadmap, 
  onBackToMatrix 
}) {
  const currentTitle = selectedCareerName || skillGapData?.career_name || "Full Stack Developer";
  const defaultPathway = careerPathways.find(p => p.title.toLowerCase() === currentTitle.toLowerCase()) || careerPathways[0];

  // Extract skills list cleanly
  let skills = [];
  if (skillGapData?.skills && skillGapData.skills.length > 0) {
    skills = skillGapData.skills.map(s => {
      let priority = s.priority || (s.current_score < 40 ? 'High' : s.current_score < 70 ? 'Medium' : 'Low');
      priority = priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
      return {
        name: s.skill_name || s.name,
        priority: priority,
        currentScore: s.current_score || 50,
        requiredScore: s.required_score || 85
      };
    });
  } else if (skillGapData?.priority_breakdown) {
    const pb = skillGapData.priority_breakdown;
    (pb.high || []).forEach(item => skills.push({ name: item.name || item, priority: 'High', currentScore: 35, requiredScore: 85 }));
    (pb.medium || []).forEach(item => skills.push({ name: item.name || item, priority: 'Medium', currentScore: 55, requiredScore: 80 }));
    (pb.low || []).forEach(item => skills.push({ name: item.name || item, priority: 'Low', currentScore: 70, requiredScore: 85 }));
  } else {
    // Fallback default skills
    skills = defaultPathway.skillsComparison.map(s => ({
      name: s.name,
      priority: s.status === 'match' ? 'Low' : s.currentScore < 50 ? 'High' : 'Medium',
      currentScore: s.currentScore,
      requiredScore: s.requiredScore
    }));
  }

  const getPriorityBadge = (priority) => {
    const p = (priority || '').toLowerCase();
    if (p === 'high') {
      return <span className="badge badge-warning" style={{ color: '#b91c1c', backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>High</span>;
    }
    if (p === 'medium') {
      return <span className="badge badge-warning">Medium</span>;
    }
    return <span className="badge badge-neutral">Low</span>;
  };

  return (
    <div className="skill-gap-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onBackToMatrix}
            style={{ paddingLeft: 0, marginBottom: '0.25rem', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} /> Back to Career Paths
          </button>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Skill Gaps for {currentTitle}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
            Key skills to develop to meet industry requirements for this role.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Role:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8125rem' }}
            value={currentTitle}
            onChange={(e) => onSelectCareerName(e.target.value)}
          >
            {careerPathways.map(p => (
              <option key={p.title} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Skill Gaps Clean Table / List */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-default)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <span>Skill</span>
          <span>Gap Level</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="skill-row"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 140px 80px', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '0.875rem 0'
              }}
            >
              {/* Skill Name */}
              <div style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                {skill.name}
              </div>

              {/* Simple progress bar */}
              <div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${skill.currentScore}%`, 
                      height: '100%', 
                      backgroundColor: skill.priority === 'High' ? '#ef4444' : skill.priority === 'Medium' ? '#f59e0b' : '#10b981',
                      borderRadius: 'var(--radius-full)'
                    }} 
                  />
                </div>
              </div>

              {/* Priority Badge */}
              <div style={{ textAlign: 'right' }}>
                {getPriorityBadge(skill.priority)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action to Roadmap */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onBackToMatrix}
        >
          <ArrowLeft size={14} />
          <span>Switch Path</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onGenerateRoadmap}
          id="view-roadmap-btn"
        >
          <span>View 90-Day Roadmap</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
