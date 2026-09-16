import React from 'react';
import { 
  Compass, 
  Menu, 
  RefreshCw, 
  UserCheck, 
  LogIn, 
  User, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  currentStep, 
  onReset, 
  onLoadSample, 
  isSampleLoaded, 
  onToggleSidebar, 
  onOpenLogin, 
  user,
  backendConnected,
  onCheckBackend
}) {
  const getBreadcrumb = () => {
    switch (currentStep) {
      case 0: return "Platform Overview";
      case 1: return "Step 1: Student Profile";
      case 2: return "Step 2: AI Profile Analysis";
      case 3: return "Step 3: Career Matrix Comparison";
      case 4: return "Step 4: Skill Gap Matrix";
      case 5: return "Action Plan: 30/60/90-Day Roadmap";
      case 'login': return "Student Authentication";
      default: return "Dashboard";
    }
  };

  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Left Side: Hamburger & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Sidebar"
            title="Toggle Sidebar Menu"
          >
            <Menu size={20} />
          </button>

          <div className="logo-brand" onClick={() => onReset(false)}>
            <div className="logo-icon-box">
              <Compass size={22} strokeWidth={2.4} />
            </div>
            <div>
              <div className="logo-text-title">
                CareerMatrix <span style={{ color: 'var(--primary-indigo)' }}>AI</span>
                <span className="logo-badge">SaaS MVP</span>
              </div>
              <div className="header-breadcrumb">
                <span>Dashboard</span>
                <ChevronRight size={12} />
                <span style={{ color: 'var(--primary-indigo)', fontWeight: 600 }}>{getBreadcrumb()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions & Login */}
        <div className="header-actions">
          {/* Live Backend Connection Indicator */}
          <div 
            onClick={onCheckBackend}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: backendConnected ? '#ecfdf5' : '#fffbeb',
              color: backendConnected ? '#065f46' : '#92400e',
              border: `1px solid ${backendConnected ? '#a7f3d0' : '#fde68a'}`,
              transition: 'all 0.2s ease'
            }}
            title={backendConnected ? "FastAPI Backend is Connected (Click to re-ping)" : "Backend Offline / Retrying (Click to re-ping)"}
          >
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: backendConnected ? '#10b981' : '#f59e0b',
              boxShadow: backendConnected ? '0 0 6px #10b981' : 'none'
            }} />
            <span className="hide-mobile">
              {backendConnected ? "Backend Online" : "Backend Offline"}
            </span>
          </div>

          <button
            type="button"
            className={`btn btn-sm ${isSampleLoaded ? 'btn-subtle' : 'btn-secondary'}`}
            onClick={onLoadSample}
            title="Load sample CS student profile for instant evaluation"
          >
            <UserCheck size={16} />
            <span className="hide-mobile">{isSampleLoaded ? 'Sample Active' : 'Load Demo Profile'}</span>
          </button>

          {currentStep !== 0 && (
            <button
              type="button"
              className="btn btn-sm btn-secondary hide-mobile"
              onClick={() => onReset(true)}
              title="Reset to beginning"
            >
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          )}

          {user?.isLoggedIn ? (
            <div 
              className="user-status-pill"
              onClick={onOpenLogin}
              title="Signed in student"
            >
              <div className="user-status-avatar">{user.avatar || 'AC'}</div>
              <span className="hide-mobile" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user.name}</span>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={onOpenLogin}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
