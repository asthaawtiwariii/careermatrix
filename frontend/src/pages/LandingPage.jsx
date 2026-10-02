import React from 'react';
import { 
  Compass, 
  GitCompare, 
  Target, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0 3rem', maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-accent-soft)', border: '1px solid var(--border-active)', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-pill)', color: 'var(--primary-indigo)', fontWeight: 600, fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
          <Sparkles size={15} />
          <span>Student Career Decision-Support System</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          CareerMatrix <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
        </h1>

        <p style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 600, color: 'var(--primary-indigo)', marginBottom: '1rem', lineHeight: 1.4 }}>
          "Don't ask AI to choose your career. Ask it to show you what each path would require."
        </p>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          CareerMatrix helps students compare realistic career pathways, understand skill gaps, and create an actionable learning roadmap.
        </p>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn btn-primary btn-lg"
            onClick={onStart}
            id="start-matrix-btn"
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)' }}
          >
            <span>Build My Career Matrix</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Philosophy Highlight */}
        <div style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.65rem', background: '#ffffff', border: '1px solid var(--border-light)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-xs)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span>Alignment indicators based on facts • Zero opaque black-box predictions</span>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section style={{ margin: '1rem 0 3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Empowering Your Career Choice
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Three transparent stages to transform ambiguity into a tangible action plan.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1 */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GitCompare size={24} />
            </div>
            <div>
              <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Stage 1</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Compare Career Paths</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Evaluate 5 realistic roles side-by-side (Full Stack, AI/ML, Data Analyst, Python, Cloud/DevOps) with clear alignment percentages and effort scores.
              </p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Transparent alignment scoring
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Current strengths vs. missing skills
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={24} />
            </div>
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Stage 2</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Identify Skill Gaps</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Pinpoint exact competencies needed. Categorized into High, Medium, and Low priorities with contextual explanations on <em>why each skill matters</em>.
              </p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Visual skill profile vs. market needs
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Actionable "Why It Matters" rationale
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Stage 3</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Get a 30/60/90-Day Roadmap</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Execute with confidence. Structured 30-day foundation, 60-day build phase, and 90-day deployment & interview prep with your "Next Best Action".
              </p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Interactive checklist milestone tracking
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" /> Concrete student project blueprint
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Workflow Strip */}
      <section style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Layers size={20} color="var(--primary-indigo)" />
          <h3 style={{ fontSize: '1.15rem' }}>The CareerMatrix Decision Journey</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { title: 'Student Profile', desc: 'Academics & Skills' },
            { title: 'AI Profile Analysis', desc: 'Strengths & Gaps' },
            { title: 'Career Comparison', desc: '5 Real Roles' },
            { title: 'Path Selection', desc: 'You Choose' },
            { title: 'Skill Gap Breakdown', desc: 'Prioritized Gaps' },
            { title: '30/60/90 Roadmap', desc: 'Execution Plan' }
          ].map((flow, index, arr) => (
            <React.Fragment key={flow.title}>
              <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', minWidth: '140px', flex: '1 1 140px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary-indigo)', fontWeight: 700 }}>STEP 0{index + 1}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>{flow.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flow.desc}</div>
              </div>
              {index < arr.length - 1 && (
                <div style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}>
                  <ArrowRight size={16} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
