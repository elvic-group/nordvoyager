'use client';

import { City } from '@/lib/types';
import { CITIES } from '@/lib/utils/constants';

interface LocationSelectorProps {
  selected: City;
  onChange: (location: City) => void;
}

export default function LocationSelector({ selected, onChange }: LocationSelectorProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Hvor starter reisen?</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Velg startsted. Reiseruten vil bli tilpasset dette utgangspunktet.
      </p>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Startsted">
        {CITIES.map((city) => (
          <button
            key={city.value}
            role="radio"
            aria-checked={selected === city.value}
            onClick={() => onChange(city.value)}
            className={`p-3 rounded-[4px] border text-left transition-colors ${
              selected === city.value
                ? 'border-[#E5212D] bg-[#E5212D]/5'
                : 'border-[#E0E2E5] bg-white hover:bg-[#F8F8F8]'
            }`}
          >
            <div className="font-semibold text-sm text-[#15273F]">{city.label}</div>
            <div className="text-xs text-[#5A6A7A]">{city.region}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
