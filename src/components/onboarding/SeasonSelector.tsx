'use client';

import { Season } from '@/lib/types';
import { SEASONS } from '@/lib/utils/constants';

interface SeasonSelectorProps {
  selected: Season;
  onChange: (season: Season) => void;
}

export default function SeasonSelector({ selected, onChange }: SeasonSelectorProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Når vil du reise?</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Velg sesong — aktiviteter og opplevelser varierer gjennom året.
      </p>
      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Sesong">
        {SEASONS.map((season) => (
          <button
            key={season.value}
            role="radio"
            aria-checked={selected === season.value}
            onClick={() => onChange(season.value)}
            className={`text-left p-3 rounded-[4px] border transition-colors ${
              selected === season.value
                ? 'border-[#E5212D] bg-[#E5212D]/5 text-[#15273F]'
                : 'border-[#E0E2E5] bg-white hover:bg-[#F8F8F8] text-[#5A6A7A]'
            }`}
          >
            <div className="font-semibold text-sm">{season.label}</div>
            <div className="text-xs mt-1 opacity-80">{season.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
