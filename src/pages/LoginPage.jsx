import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Lock, 
  Mail, 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('student123');
  const [degree, setDegree] = useState('B.Tech Computer Science (3rd Year)');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'Alex Chen',
      email: email || 'alex.chen@university.edu',
      degree: degree || 'B.Tech Computer Science',
      avatar: 'AC',
      isLoggedIn: true
    });
  };

  const handleDemoQuickLogin = () => {
    onLoginSuccess({
      name: 'Alex Chen',
      email: 'alex.chen@university.edu',
      degree: 'B.Tech CS & Engineering (3rd Year)',
      avatar: 'AC',
      isLoggedIn: true
    });
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-container">
        {/* Back Link */}
        <button 
          type="button" 
          className="btn btn-secondary btn-sm"
          onClick={onBack}
          style={{ alignSelf: 'flex-start', marginBottom: '1.25rem' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Prototype</span>
        </button>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--grad-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>
            <Compass size={28} strokeWidth={2.2} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            CareerMatrix <span style={{ color: 'var(--primary-indigo)' }}>AI</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Student Career Decision-Support & Skill Gap Matrix
          </p>
        </div>

        {/* Hackathon Fast-Pass 1-Click Login Card */}
        <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)', border: '1px solid var(--border-active)', borderRadius: 'var(--radius-md)', padding: '1.1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--primary-indigo)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
            <Sparkles size={16} />
            <span>Hackathon Judge Fast-Pass</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Instantly authenticate as <strong>Alex Chen</strong> (B.Tech CS 3rd Year) with preloaded projects and verified skills.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem' }}
            onClick={handleDemoQuickLogin}
            id="demo-fast-login-btn"
          >
            <UserCheck size={16} />
            <span>1-Click Demo Student Sign In</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>OR CUSTOM CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={13} /> Student Email
              </span>
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.chen@university.edu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <GraduationCap size={13} /> Degree & Year
              </span>
            </label>
            <input
              type="text"
              className="form-input"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="e.g. B.Tech Computer Science (3rd Year)"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Lock size={13} /> Password
              </span>
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.7rem' }}
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Disclaimer Note */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Frontend MVP prototype • Local state session only</span>
        </div>
      </div>
    </div>
  );
}
