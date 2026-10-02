import React from 'react';
import { ShieldCheck, Info, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-indigo)', fontWeight: 600, fontSize: '0.875rem' }}>
          <Sparkles size={16} />
          <span>Core Product Principle: Decision Support, Not Career Prediction</span>
        </div>

        <p style={{ maxWidth: '720px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          CareerMatrix AI helps students understand choices, evaluate realistic trade-offs, and prioritize learning—rather than making career decisions for them.
        </p>

        <div className="footer-disclaimer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            <ShieldCheck size={15} color="var(--primary-indigo)" />
            <span>Official System Disclaimer</span>
          </div>
          <p>
            CareerMatrix provides alignment indicators based on verified student input and industry benchmarks. It does not predict career outcomes or guarantee employment.
          </p>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
          CareerMatrix AI • Decision-Support System • Academic & Industry Alignment Framework
        </div>
      </div>
    </footer>
  );
}
