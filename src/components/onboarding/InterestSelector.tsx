'use client';

import Tag from '@/components/ui/Tag';
import { Interest } from '@/lib/types';
import { INTERESTS } from '@/lib/utils/constants';

interface InterestSelectorProps {
  selected: Interest[];
  onChange: (interests: Interest[]) => void;
}

export default function InterestSelector({ selected, onChange }: InterestSelectorProps) {
  const toggleInterest = (value: Interest) => {
    if (selected.includes(value)) {
      onChange(selected.filter((interest) => interest !== value));
    } else if (selected.length < 5) {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Hva vil du oppleve?</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Velg interesser for å skreddersy reiseruten. Maks 5 valg.
      </p>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Interesser">
        {INTERESTS.map((interest) => (
          <Tag
            key={interest.value}
            label={`${interest.emoji} ${interest.label}`}
            active={selected.includes(interest.value)}
            onClick={() => toggleInterest(interest.value)}
            size="md"
          />
        ))}
      </div>
      {selected.length === 0 && (
        <p className="text-xs text-[#E5212D]">Velg minst én interesse for å fortsette</p>
      )}
    </div>
  );
}
