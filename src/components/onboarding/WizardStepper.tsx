'use client';

import StepIndicator from '@/components/ui/StepIndicator';

interface WizardStepperProps {
  currentStep: number;
  steps?: { label: string; step: number }[];
}

const DEFAULT_STEPS = [
  { label: 'Interesser', step: 0 },
  { label: 'Sesong', step: 1 },
  { label: 'Varighet', step: 2 },
  { label: 'Detaljer', step: 3 },
  { label: 'Oppsummering', step: 4 },
];

export default function WizardStepper({ currentStep, steps }: WizardStepperProps) {
  return (
    <div className="mb-6">
      <StepIndicator steps={steps || DEFAULT_STEPS} currentStep={currentStep} />
    </div>
  );
}
