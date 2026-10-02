import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function AnalysisPage({ profile, analysisData, onViewMatrix }) {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    "Analyzing academic background and coursework...",
    "Evaluating current technical skills and project depth...",
    "Matching profile against industry benchmarks...",
    "Calculating career path alignments..."
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStepIndex(1), 350);
    const timer2 = setTimeout(() => setActiveStepIndex(2), 700);
    const timer3 = setTimeout(() => setActiveStepIndex(3), 1050);
    const timer4 = setTimeout(() => setAnalysisComplete(true), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const summaryText = analysisData?.profile_summary || 
    "Your profile demonstrates strong programming fundamentals and practical software engineering interest.";

  return (
    <div className="analysis-page" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Analyzing Your Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Generating personalized career matches and skill evaluations with Gemini AI.
        </p>
      </div>

      {/* Synthesis Box */}
      <div className="card" style={{ textAlign: 'left', marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          Summary
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
          "{summaryText}"
        </p>

        {analysisData?.strengths && analysisData.strengths.length > 0 && (
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Identified Strengths
            </div>
            <div className="tags-container">
              {analysisData.strengths.map((s, idx) => (
                <span key={idx} className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress Steps */}
      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {steps.map((step, idx) => {
            const isDone = activeStepIndex > idx || analysisComplete;
            const isCurrent = activeStepIndex === idx && !analysisComplete;

            return (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  fontSize: '0.875rem',
                  color: isDone ? 'var(--text-primary)' : isCurrent ? 'var(--primary)' : 'var(--text-light)',
                  fontWeight: isCurrent ? 600 : 400
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={16} color="#059669" />
                ) : (
                  <div style={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    border: '2px solid var(--border-default)', 
                    borderTopColor: isCurrent ? 'var(--primary)' : 'var(--border-default)',
                    animation: isCurrent ? 'spin 1s linear infinite' : 'none'
                  }} />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onViewMatrix}
          id="view-matrix-btn"
        >
          <span>View Career Paths</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
