import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Compass, 
  Target, 
  Calendar,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentStep, 
  onNavigate, 
  user, 
  onReset,
  isOpen, 
  onClose
}) {
  const navItems = [
    { step: 0, label: "Overview", icon: <LayoutDashboard size={16} /> },
    { step: 1, label: "Profile", icon: <User size={16} /> },
    { step: 3, label: "Career Paths", icon: <Compass size={16} /> },
    { step: 4, label: "Skill Gaps", icon: <Target size={16} /> },
    { step: 5, label: "Roadmap", icon: <Calendar size={16} /> },
  ];

  // Helper to determine active nav item
  const isActiveStep = (step) => {
    if (step === 0 && currentStep === 0) return true;
    if (step === 1 && (currentStep === 1 || currentStep === 2)) return true;
    if (step === 3 && currentStep === 3) return true;
    if (step === 4 && currentStep === 4) return true;
    if (step === 5 && currentStep === 5) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.3)',
            zIndex: 35
          }}
          aria-hidden="true"
        />
      )}

      <aside className={`saas-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div 
            className="sidebar-brand" 
            onClick={() => { onNavigate(0); onClose(); }}
          >
            <div className="sidebar-brand-icon">
              <Compass size={16} />
            </div>
            <span>CareerMatrix AI</span>
          </div>

          <button 
            type="button" 
            className="btn btn-ghost btn-sm"
            style={{ display: isOpen ? 'flex' : 'none', padding: '0.25rem' }}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = isActiveStep(item.step);
            return (
              <button
                key={item.step}
                type="button"
                className={`sidebar-nav-item ${active ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.step);
                  onClose();
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User / Session Footer */}
        <div className="sidebar-footer">
          <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            {user?.degree || "Student Assessment"}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', marginTop: '0.125rem' }}>
            {user?.year || "Active Session"}
          </div>
        </div>
      </aside>
    </>
  );
}
