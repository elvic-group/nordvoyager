'use client';

import { Duration } from '@/lib/types';
import { DURATIONS } from '@/lib/utils/constants';

interface DurationSelectorProps {
  selected: Duration;
  onChange: (duration: Duration) => void;
}

export default function DurationSelector({ selected, onChange }: DurationSelectorProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Hvor lenge vil du reise?</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Velg antall dager for reisen.
      </p>
      <div className="flex gap-2" role="radiogroup" aria-label="Varighet">
        {DURATIONS.map((duration) => (
          <button
            key={duration}
            role="radio"
            aria-checked={selected === duration}
            onClick={() => onChange(duration)}
            className={`flex-1 py-3 px-4 rounded-[4px] border text-center font-semibold text-sm transition-colors ${
              selected === duration
                ? 'border-[#E5212D] bg-[#E5212D] text-white'
                : 'border-[#E0E2E5] bg-white text-[#15273F] hover:bg-[#F8F8F8]'
            }`}
          >
            {duration} dager
          </button>
        ))}
      </div>
    </div>
  );
}
