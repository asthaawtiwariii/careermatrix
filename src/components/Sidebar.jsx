import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Target, 
  CalendarCheck, 
  UserCheck, 
  RefreshCw, 
  LogIn, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  X,
  User
} from 'lucide-react';
import { careerPathways } from '../data/mockData';

export default function Sidebar({ 
  currentStep, 
  onNavigate, 
  user, 
  onOpenLogin, 
  onLogout,
  onLoadSample,
  onReset,
  isOpen, 
  onClose,
  selectedPathId,
  onSelectPath
}) {
  const navItems = [
    { step: 0, label: "Platform Overview", icon: <Compass size={18} />, badge: "Home" },
    { step: 1, label: "1. Student Profile", icon: <GraduationCap size={18} />, badge: "Step 1" },
    { step: 2, label: "2. AI Profile Analysis", icon: <Sparkles size={18} />, badge: "Step 2" },
    { step: 3, label: "3. Career Matrix", icon: <Layers size={18} />, badge: "Step 3" },
    { step: 4, label: "4. Skill Gap Matrix", icon: <Target size={18} />, badge: "Step 4" },
    { step: 5, label: "5. 30/60/90 Roadmap", icon: <CalendarCheck size={18} />, badge: "Action" },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose} 
          aria-hidden="true"
        />
      )}

      <aside className={`saas-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header & Brand */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => { onNavigate(0); onClose(); }}>
            <div className="sidebar-logo-icon">
              <Compass size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="sidebar-logo-title">
                CareerMatrix <span>AI</span>
              </div>
              <div className="sidebar-logo-sub">
                Decision-Support SaaS
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Student Profile Card Widget */}
        <div className="sidebar-student-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div className="student-avatar">
              {user?.avatar || 'AC'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="student-name">
                {user?.name || 'Alex Chen'}
              </div>
              <div className="student-dept">
                {user?.degree || 'B.Tech CS (3rd Year)'}
              </div>
            </div>
          </div>

          <div className="student-strength-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <span>Profile Strength</span>
              <span style={{ color: 'var(--primary-indigo)' }}>78%</span>
            </div>
            <div className="progress-bar-track" style={{ height: '6px', marginTop: '0.25rem' }}>
              <div className="progress-bar-fill" style={{ width: '78%' }} />
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="sidebar-section-title">
          Decision Workflow
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = currentStep === item.step;
            return (
              <button
                key={item.step}
                type="button"
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.step);
                  onClose();
                }}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-label">{item.label}</span>
                <span className="sidebar-nav-badge">{item.badge}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Role Switcher for Hackathon Judges */}
        <div className="sidebar-section-title" style={{ marginTop: '1.25rem' }}>
          Evaluate Career Roles
        </div>
        <div className="sidebar-role-chips">
          {careerPathways.map((p) => {
            const isSelected = selectedPathId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`role-chip-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectPath(p.id);
                  onNavigate(4); // navigate to skill gap for this role
                  onClose();
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                <span className="role-chip-pct">{p.alignmentPercent}%</span>
              </button>
            );
          })}
        </div>

        {/* Demo Fast Actions */}
        <div className="sidebar-section-title" style={{ marginTop: '1.25rem' }}>
          Hackathon Demo Tools
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0 0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { onLoadSample(); onClose(); }}
          >
            <UserCheck size={14} color="var(--primary-indigo)" />
            <span>Load Demo Student</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { onReset(); onClose(); }}
          >
            <RefreshCw size={14} />
            <span>Reset Evaluation</span>
          </button>
        </div>

        {/* Footer User Account Area */}
        <div className="sidebar-footer">
          {user?.isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.email}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                onClick={onLogout}
                title="Sign Out"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={() => { onOpenLogin(); onClose(); }}
            >
              <LogIn size={14} />
              <span>Student / Demo Login</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
