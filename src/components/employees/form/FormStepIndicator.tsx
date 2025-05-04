import React from 'react';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  hasErrors?: boolean;
}

export const FormStepIndicator = ({ 
  currentStep, 
  totalSteps, 
  stepTitles,
  hasErrors = false
}: FormStepIndicatorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
        <span className={`text-sm ${hasErrors ? 'text-red-500' : 'text-slate-500'}`}>
          {stepTitles[currentStep - 1]}
          {hasErrors && " (Please fix errors)"}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${hasErrors ? 'bg-red-500' : 'bg-blue-600'}`} 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
