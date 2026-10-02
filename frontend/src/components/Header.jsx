import React from 'react';
import { Menu, Plus, UserCircle, RefreshCw } from 'lucide-react';

export default function Header({ 
  currentStep, 
  onReset, 
  onToggleSidebar, 
  user,
  backendConnected,
  onCheckBackend,
  onNavigate
}) {
  const getPageTitle = () => {
    switch (currentStep) {
      case 0: return "Overview";
      case 1: return "Profile";
      case 2: return "AI Analysis";
      case 3: return "Career Paths";
      case 4: return "Skill Gaps";
      case 5: return "Roadmap";
      default: return "Dashboard";
    }
  };

  return (
    <header className="saas-header">
      {/* Left: Mobile hamburger & Current page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          style={{ display: 'flex', padding: '0.35rem', color: 'var(--text-secondary)' }}
        >
          <Menu size={18} />
        </button>

        <h1 className="header-title" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="header-actions">
        {/* Backend status dot */}
        <div 
          onClick={onCheckBackend}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title={backendConnected ? "Backend Connected (FastAPI)" : "Backend Offline / Retrying"}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: backendConnected ? '#10b981' : '#f59e0b'
          }} />
          <span style={{ display: 'inline' }}>
            {backendConnected ? "Live" : "Connecting"}
          </span>
        </div>

        {/* New Assessment */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onReset}
          id="new-assessment-header-btn"
          title="Start a fresh career assessment"
        >
          <Plus size={14} />
          <span>New Assessment</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => onNavigate && onNavigate(1)}
          title="Go to Profile"
          style={{ color: 'var(--text-primary)', fontWeight: 500 }}
        >
          <UserCircle size={16} />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
}
