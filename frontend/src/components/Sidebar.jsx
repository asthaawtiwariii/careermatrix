import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Target, 
  CalendarCheck, 
  RefreshCw, 
  X,
  UserCheck
} from 'lucide-react';
import { careerPathways } from '../data/mockData';

export default function Sidebar({ 
  currentStep, 
  onNavigate, 
  user, 
  onReset,
  isOpen, 
  onClose,
  selectedPathId,
  onSelectPath,
  backendConnected,
  careerComparisons
}) {
  const navItems = [
    { step: 0, label: "Platform Overview", icon: <Compass size={18} />, badge: "Home" },
    { step: 1, label: "1. Student Profile", icon: <GraduationCap size={18} />, badge: "Step 1" },
    { step: 2, label: "2. AI Profile Analysis", icon: <Sparkles size={18} />, badge: "Step 2" },
    { step: 3, label: "3. Career Matrix", icon: <Layers size={18} />, badge: "Step 3" },
    { step: 4, label: "4. Skill Gap Matrix", icon: <Target size={18} />, badge: "Step 4" },
    { step: 5, label: "5. 30/60/90 Roadmap", icon: <CalendarCheck size={18} />, badge: "Action" },
  ];

  // Use dynamically generated career paths if available, otherwise fallback to standard pathways
  const pathwaysToDisplay = careerComparisons && careerComparisons.length > 0 
    ? careerComparisons.map(c => ({
        id: c.career_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: c.career_name,
        alignmentPercent: Math.round(c.alignment_score)
      }))
    : careerPathways.map(p => ({
        id: p.id,
        title: p.title,
        alignmentPercent: p.alignmentPercent
      }));

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
              <div className="sidebar-logo-sub" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: backendConnected ? '#10b981' : '#f59e0b', display: 'inline-block' }} />
                <span>{backendConnected ? "FastAPI Online" : "Connecting..."}</span>
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

        {/* User Status Card */}
        <div className="sidebar-student-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="student-avatar">
              <GraduationCap size={16} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="student-name">
                {user?.degree || 'Student Session'}
              </div>
              <div className="student-dept" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user?.year || 'Active Profile'}
              </div>
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

        {/* Quick Role Switcher */}
        <div className="sidebar-section-title" style={{ marginTop: '1.25rem' }}>
          Compare Career Roles
        </div>
        <div className="sidebar-role-chips">
          {pathwaysToDisplay.map((p) => {
            const isSelected = selectedPathId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`role-chip-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectPath(p.title);
                  onClose();
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                <span className="role-chip-pct">{p.alignmentPercent}%</span>
              </button>
            );
          })}
        </div>

        {/* Assessment Controls */}
        <div className="sidebar-section-title" style={{ marginTop: '1.25rem' }}>
          Session Actions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0 0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => { onReset(); onClose(); }}
          >
            <RefreshCw size={14} />
            <span>Start Fresh Assessment</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', fontSize: '0.75rem', color: 'var(--text-light)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <span>AI Decision Support Engine</span>
          </div>
        </div>
      </aside>
    </>
  );
}
