import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal,
  ShieldCheck,
  Award,
  Sparkles,
  Database
} from 'lucide-react';
import { careerPathways as defaultCareerPathways } from '../data/mockData';
import PipelineBanner from '../components/PipelineBanner';

export default function CareerMatrixPage({ careerComparisons, onSelectPath, onStageNavigate }) {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('alignment');

  // Normalize API or default pathways
  const pathways = (careerComparisons && careerComparisons.length > 0)
    ? careerComparisons.map(c => {
        const matchingStr = Array.isArray(c.matching_skills) ? c.matching_skills.join(", ") : (c.matching_skills || c.strengths || "");
        const missingStr = Array.isArray(c.missing_skills) ? c.missing_skills.join(", ") : (c.missing_skills || c.skillGaps || "");
        const name = c.career_name || c.title || "";
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        let category = "Software Engineering";
        if (name.includes("AI") || name.includes("ML")) category = "Artificial Intelligence";
        else if (name.includes("Data")) category = "Data & BI";
        else if (name.includes("Cloud") || name.includes("DevOps")) category = "Infrastructure & Platform";
        else if (name.includes("Python")) category = "Backend & Systems";

        const effort = c.effort_level || c.effort || "Medium";
        let effortLevel = 2;
        if (effort.toLowerCase().includes("low")) effortLevel = 1;
        else if (effort.toLowerCase().includes("high")) effortLevel = 3;

        return {
          id: id,
          title: name,
          category: category,
          alignmentPercent: Math.round(c.alignment_score ?? c.alignmentPercent ?? 75),
          whyItMatches: c.reasoning || c.whyItMatches || "Strong foundational overlap.",
          strengths: matchingStr,
          skillGaps: missingStr,
          effort: effort,
          effortLevel: effortLevel,
          suggestedFirstStep: c.first_recommended_action || c.suggestedFirstStep || "Build a capstone project targeting key gaps.",
          isFromApi: true
        };
      })
    : defaultCareerPathways;

  let displayedPaths = [...pathways];
  if (filterDifficulty !== 'all') {
    displayedPaths = displayedPaths.filter(p => p.effort.toLowerCase().includes(filterDifficulty.toLowerCase()));
  }

  if (sortBy === 'alignment') {
    displayedPaths.sort((a, b) => b.alignmentPercent - a.alignmentPercent);
  } else if (sortBy === 'effort') {
    displayedPaths.sort((a, b) => a.effortLevel - b.effortLevel);
  }

  const getEffortBadge = (effort) => {
    const e = effort.toLowerCase();
    if (e.includes('low')) return <span className="badge badge-emerald">Low Effort • 1-2 mos</span>;
    if (e.includes('med')) return <span className="badge badge-amber">Medium Effort • 2-3 mos</span>;
    if (e.includes('high')) return <span className="badge badge-rose">High Effort • 3-6 mos</span>;
    return <span className="badge badge-slate">{effort}</span>;
  };

  const getAlignmentColor = (pct) => {
    if (pct >= 85) return '#059669'; // Emerald
    if (pct >= 80) return '#4f46e5'; // Indigo
    if (pct >= 70) return '#0891b2'; // Cyan
    return '#7c3aed'; // Purple
  };

  return (
    <div className="career-matrix-page" style={{ maxWidth: '1140px', margin: '0 auto' }}>
      {/* 1. DECISION PIPELINE BANNER (Stage 2: POSSIBLE CAREERS) */}
      <PipelineBanner 
        activeStage={2} 
        onStageClick={(stage) => {
          if (onStageNavigate) {
            if (stage === 1) onStageNavigate(1); // Profile
            else if (stage === 2) onStageNavigate(3); // Career Matrix
            else if (stage === 3) onStageNavigate(4); // Skill Gap
            else if (stage === 4) onStageNavigate(5); // Roadmap
          }
        }} 
      />

      {/* Step Header */}
      <div style={{ textAlign: 'center', margin: '1.75rem 0 1.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-indigo">
            Step 3 of 4 — Career Pathways Comparison
          </span>
          {careerComparisons && (
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
              <Database size={11} /> Live API Match
            </span>
          )}
        </div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.35rem' }}>
          The Career Matrix
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
          Compare 5 realistic engineering and data trajectories tailored to your verified skill profile.
        </p>
      </div>

      {/* TOP MANDATORY GUIDANCE BANNER */}
      <div className="banner-guidance" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', marginBottom: '1.5rem' }}>
        <Compass size={24} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
            "These are possible pathways based on your current profile — you choose the path."
          </div>
          <div style={{ fontSize: '0.825rem', fontWeight: 400, opacity: 0.9, marginTop: '0.2rem' }}>
            Alignment percentage is a computed compatibility indicator reflecting overlapping skills—it is <strong>NOT</strong> a prediction, automated decree, or guaranteed outcome.
          </div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <SlidersHorizontal size={16} />
          <span style={{ fontWeight: 600 }}>Filter Pathways:</span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['all', 'low', 'medium', 'high'].map(d => (
              <button
                key={d}
                type="button"
                className={`btn btn-sm ${filterDifficulty === d ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterDifficulty(d)}
                style={{ textTransform: 'capitalize' }}
              >
                {d === 'all' ? 'All Roles' : `${d} Effort`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="alignment">Highest Alignment %</option>
            <option value="effort">Lowest Effort Required</option>
          </select>
        </div>
      </div>

      {/* 5 Realistic Career Pathway Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {displayedPaths.map((path) => {
          const isTopMatch = path.alignmentPercent >= 82;
          const alignColor = getAlignmentColor(path.alignmentPercent);

          return (
            <div 
              key={path.id || path.title} 
              className="card career-pathway-card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative', 
                padding: '1.75rem',
                border: isTopMatch ? '2px solid var(--primary-indigo)' : '1px solid var(--border-light)',
                boxShadow: isTopMatch ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                background: '#ffffff'
              }}
            >
              {/* Card Top / Header with Enhanced Alignment Score Ring */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '0.75rem' }}>
                <div>
                  <span className="badge badge-slate" style={{ marginBottom: '0.35rem', fontSize: '0.7rem' }}>
                    {path.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {path.title}
                  </h3>
                </div>

                {/* Circular Alignment Score Ring */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div 
                    className="alignment-ring"
                    style={{ 
                      background: `conic-gradient(${alignColor} ${path.alignmentPercent * 3.6}deg, #e2e8f0 0deg)`,
                    }}
                    title={`Calculated alignment: ${path.alignmentPercent}% based on current skill overlap`}
                  >
                    <div className="alignment-ring-inner">
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                        {path.alignmentPercent}%
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    Alignment
                  </span>
                </div>
              </div>

              {/* Why it matches */}
              <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.1rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-indigo)', marginBottom: '0.2rem' }}>
                  Why It Matches:
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.45 }}>
                  {path.whyItMatches}
                </div>
              </div>

              {/* Strengths */}
              <div style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--success-text)', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={14} />
                  <span>Current Strengths:</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {path.strengths || "Strong logical and programming aptitude"}
                </div>
              </div>

              {/* Main Missing Skills / Skill Gaps */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: '#b91c1c', marginBottom: '0.25rem' }}>
                  <AlertCircle size={14} />
                  <span>Main Missing Skills:</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {path.skillGaps || "Advanced production architectures"}
                </div>
              </div>

              {/* Effort & Suggested First Step */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Effort Level:</span>
                  {getEffortBadge(path.effort)}
                </div>

                <div style={{ background: '#f8fafc', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-light)', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Suggested First Step:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.15rem', fontWeight: 500 }}>
                    {path.suggestedFirstStep}
                  </div>
                </div>

                {/* Explore Path Button */}
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem 1rem' }}
                  onClick={() => onSelectPath(path.title)}
                  id={`explore-path-${path.id}`}
                >
                  <span>Explore Path</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision-Support Philosophy Reminder */}
      <div className="banner-principle">
        <ShieldCheck size={24} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
          <strong>Decision-Support Commitment:</strong> You are not locked into any single path. CareerMatrix enables you to evaluate what it takes to pivot towards any of these pathways by breaking down concrete skills into manageable milestones.
        </div>
      </div>
    </div>
  );
}
