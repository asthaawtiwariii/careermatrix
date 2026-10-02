import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { careerPathways as defaultCareerPathways } from '../data/mockData';

export default function CareerMatrixPage({ careerComparisons, onSelectPath }) {
  // Normalize pathways
  const pathways = (careerComparisons && careerComparisons.length > 0)
    ? careerComparisons.map(c => {
        const name = c.career_name || c.title || "";
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        
        // Parse strengths into clean array
        let strengthsArr = [];
        if (Array.isArray(c.matching_skills)) {
          strengthsArr = c.matching_skills;
        } else if (typeof c.matching_skills === 'string') {
          strengthsArr = c.matching_skills.split(/[,•]/).map(s => s.trim()).filter(Boolean);
        } else if (typeof c.strengths === 'string') {
          strengthsArr = c.strengths.split(/[,•]/).map(s => s.trim()).filter(Boolean);
        }

        // Parse missing skills into clean array
        let gapsArr = [];
        if (Array.isArray(c.missing_skills)) {
          gapsArr = c.missing_skills;
        } else if (typeof c.missing_skills === 'string') {
          gapsArr = c.missing_skills.split(/[,•]/).map(s => s.trim()).filter(Boolean);
        } else if (typeof c.skillGaps === 'string') {
          gapsArr = c.skillGaps.split(/[,•]/).map(s => s.trim()).filter(Boolean);
        }

        // Parse fit points
        let fitPoints = [];
        if (c.reasoning) {
          fitPoints = c.reasoning.split('. ').map(p => p.trim()).filter(p => p.length > 5);
        }
        if (fitPoints.length === 0) {
          fitPoints = ["Strong alignment with your core technical competencies.", "Practical foundation allows rapid upskilling."];
        }

        return {
          id: id,
          title: name,
          alignmentPercent: Math.round(c.alignment_score ?? c.alignmentPercent ?? 80),
          fitPoints: fitPoints.slice(0, 3),
          strengths: strengthsArr.slice(0, 5),
          skillGaps: gapsArr.slice(0, 5)
        };
      })
    : defaultCareerPathways.map(p => ({
        id: p.id,
        title: p.title,
        alignmentPercent: p.alignmentPercent,
        fitPoints: [
          p.whyItMatches,
          "Relevant hands-on foundational skills.",
          "High market demand with clear growth trajectory."
        ],
        strengths: p.strengths ? p.strengths.split(', ') : ["Problem Solving", "Core Programming"],
        skillGaps: p.skillGaps ? p.skillGaps.split(', ') : ["System Design", "Cloud Deployment"]
      }));

  return (
    <div className="career-matrix-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Career Pathways
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Evaluate realistic career paths matched to your current strengths and growth areas.
        </p>
      </div>

      {/* Pathways List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pathways.map((path) => (
          <div key={path.id || path.title} className="card" style={{ padding: '1.5rem' }}>
            {/* Top row: Title and Match % */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {path.title}
                </h2>
              </div>
              <span className="badge badge-primary" style={{ fontSize: '0.875rem', fontWeight: 600, padding: '0.35rem 0.75rem' }}>
                {path.alignmentPercent}% match
              </span>
            </div>

            {/* Why this fits you (2-3 short points) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Why this fits you
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {path.fitPoints.map((point, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Skill Gaps Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              {/* Your strengths */}
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Your strengths</span>
                </div>
                <div className="tags-container">
                  {path.strengths.map((s, idx) => (
                    <span key={idx} className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill gaps */}
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertCircle size={14} color="#dc2626" />
                  <span>Skill gaps</span>
                </div>
                <div className="tags-container">
                  {path.skillGaps.map((g, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* View Roadmap CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => onSelectPath(path.title)}
                id={`view-roadmap-${path.id}`}
              >
                <span>View 90-Day Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
