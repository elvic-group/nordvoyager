interface StepIndicatorProps {
  steps: { label: string; step: number }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex gap-1 flex-wrap" role="tablist" aria-label="Planleggingssteg">
      {steps.map((s) => {
        const isActive = s.step === currentStep;
        const isCompleted = s.step < currentStep;
        return (
          <span
            key={s.step}
            role="tab"
            aria-selected={isActive}
            tabIndex={onStepClick ? 0 : undefined}
            onClick={() => onStepClick?.(s.step)}
            onKeyDown={(e) => e.key === 'Enter' && onStepClick?.(s.step)}
            className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-[#E5212D] text-white'
                : isCompleted
                ? 'bg-[#2A7A4A] text-white'
                : 'bg-[#F0F1F3] text-[#7A8A9A]'
            }`}
          >
            {isCompleted ? '✓ ' : ''}{s.label}
          </span>
        );
      })}
    </div>
  );
}
