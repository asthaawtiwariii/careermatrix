import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function WorkflowProgress({ currentStep, onStepClick, maxUnlockedStep }) {
  const steps = [
    { num: 1, label: 'Student Profile', sub: 'Step 1 of 4' },
    { num: 2, label: 'AI Profile Analysis', sub: 'Step 2 of 4' },
    { num: 3, label: 'Career Matrix', sub: 'Step 3 of 4' },
    { num: 4, label: 'Skill Gap & Roadmap', sub: 'Step 4 of 4' }
  ];

  return (
    <div className="stepper-container" role="navigation" aria-label="Evaluation Workflow">
      {steps.map((step, idx) => {
        const isCurrent = currentStep === step.num;
        const isCompleted = currentStep > step.num;
        const isClickable = maxUnlockedStep >= step.num;

        return (
          <React.Fragment key={step.num}>
            <div
              className={`stepper-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => isClickable && onStepClick(step.num)}
              style={{ cursor: isClickable ? 'pointer' : 'default', opacity: isClickable ? 1 : 0.55 }}
              title={isClickable ? `Jump to ${step.label}` : 'Complete preceding steps to unlock'}
            >
              <div className="stepper-num">
                {isCompleted ? <Check size={12} strokeWidth={3} /> : step.num}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontSize: '0.6875rem', color: isCurrent ? 'var(--primary-indigo)' : 'var(--text-light)', fontWeight: 600 }}>
                  {step.sub}
                </span>
                <span>{step.label}</span>
              </div>
            </div>

            {idx < steps.length - 1 && <div className="stepper-divider" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
