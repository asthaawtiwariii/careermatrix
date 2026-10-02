import React from 'react';
import { Check } from 'lucide-react';

export default function WorkflowProgress({ currentStep, onStepClick, maxUnlockedStep }) {
  const steps = [
    { num: 1, label: 'Profile' },
    { num: 2, label: 'AI Analysis' },
    { num: 3, label: 'Career Paths' },
    { num: 4, label: 'Skill Gaps' },
  ];

  return (
    <div className="stepper-container" role="navigation" aria-label="Assessment Progress">
      {steps.map((step) => {
        const isCurrent = currentStep === step.num;
        const isCompleted = currentStep > step.num;
        const isClickable = maxUnlockedStep >= step.num;

        return (
          <button
            key={step.num}
            type="button"
            className={`stepper-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => isClickable && onStepClick(step.num)}
            disabled={!isClickable}
            style={{ opacity: isClickable ? 1 : 0.4 }}
          >
            <span className="stepper-number">
              {isCompleted ? <Check size={12} strokeWidth={3} /> : step.num}
            </span>
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}
