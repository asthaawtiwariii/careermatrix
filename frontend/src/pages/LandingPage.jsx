import React from 'react';
import { ArrowRight, Sparkles, User, GraduationCap, Code2, Heart } from 'lucide-react';
import { careerPathways as defaultCareerPathways } from '../data/mockData';

export default function LandingPage({ 
  profile, 
  careerComparisons, 
  onStart, 
  onSelectPath,
  onEditProfile 
}) {
  // Normalize career paths from API data or fallback defaults
  const paths = (careerComparisons && careerComparisons.length > 0)
    ? careerComparisons.map(c => ({
        id: (c.career_name || c.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: c.career_name || c.title || "Software Engineer",
        alignmentPercent: Math.round(c.alignment_score ?? c.alignmentPercent ?? 80),
        reason: c.reasoning || c.whyItMatches || "Strong alignment with your programming skills and interests."
      }))
    : defaultCareerPathways.map(p => ({
        id: p.id,
        title: p.title,
        alignmentPercent: p.alignmentPercent,
        reason: p.whyItMatches
      }));

  const educationText = profile?.education?.degree 
    ? `${profile.education.degree}${profile.education.year ? ` • ${profile.education.year}` : ''}`
    : "B.Tech Computer Science • 3rd Year";

  const allSkills = [
    ...(profile?.skills?.programmingLanguages || []),
    ...(profile?.skills?.technicalSkills || [])
  ];

  const displayedSkills = allSkills.length > 0 ? allSkills.slice(0, 5) : ["Python", "JavaScript", "React", "SQL", "Git"];
  const displayedInterests = profile?.interests?.length > 0 ? profile.interests.slice(0, 4) : ["Web Development", "AI/ML", "Cloud Systems"];

  return (
    <div className="overview-page">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Your Career Analysis
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Personalized career guidance based on your profile.
        </p>
      </div>

      {/* Compact Profile Summary */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Profile Summary
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onEditProfile || onStart}
            style={{ fontSize: '0.8125rem', padding: '0.25rem 0.5rem', color: 'var(--primary)' }}
          >
            Edit Profile
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <GraduationCap size={14} />
              <span>Education</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {educationText}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <Code2 size={14} />
              <span>Skills</span>
            </div>
            <div className="tags-container" style={{ marginTop: 0 }}>
              {displayedSkills.map((s) => (
                <span key={s} className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <Heart size={14} />
              <span>Interests</span>
            </div>
            <div className="tags-container" style={{ marginTop: 0 }}>
              {displayedInterests.map((i) => (
                <span key={i} className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Career Paths Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Recommended Career Paths
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Paths aligned with your technical competencies and interests.
        </p>
      </div>

      <div className="career-grid">
        {paths.map((path) => (
          <div key={path.id || path.title} className="card career-card">
            <div>
              <div className="career-card-header">
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {path.title}
                </h3>
                <span className="career-score">
                  {path.alignmentPercent}% match
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1.25rem' }}>
                {path.reason}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onSelectPath(path.title)}
            >
              <span>View Details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
