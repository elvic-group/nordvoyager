'use client';

import { TripInput } from '@/lib/types';
import { INTERESTS, SEASONS, BUDGETS, CITIES } from '@/lib/utils/constants';
import Tag from '@/components/ui/Tag';

interface SummaryStepProps {
  input: TripInput;
}

export default function SummaryStep({ input }: SummaryStepProps) {
  const cityLabel =
    CITIES.find((city) => city.value === input.startLocation)?.label || input.startLocation;
  const seasonLabel =
    SEASONS.find((season) => season.value === input.season)?.label || input.season;
  const budgetLabel =
    BUDGETS.find((budget) => budget.value === input.budget)?.label || input.budget;
  const interestLabels = input.interests
    .map((interest) => INTERESTS.find((item) => item.value === interest))
    .filter(
      (
        interest,
      ): interest is (typeof INTERESTS)[number] => Boolean(interest),
    )
    .map((interest) => `${interest.emoji} ${interest.label}`);

  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Oppsummering</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Se over valgene dine før vi genererer reiseplanen.
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1.5">
            Interesser
          </div>
          <div className="flex flex-wrap gap-1.5">
            {interestLabels.map((label) => (
              <Tag key={label} label={label} active />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F0F1F3] rounded-[4px] p-3 text-center">
            <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1">
              Sesong
            </div>
            <div className="font-semibold text-sm text-[#15273F]">{seasonLabel}</div>
          </div>
          <div className="bg-[#F0F1F3] rounded-[4px] p-3 text-center">
            <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1">
              Varighet
            </div>
            <div className="font-semibold text-sm text-[#15273F]">{input.duration} dager</div>
          </div>
          <div className="bg-[#F0F1F3] rounded-[4px] p-3 text-center">
            <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1">
              Budsjett
            </div>
            <div className="font-semibold text-sm text-[#15273F]">{budgetLabel}</div>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1.5">
            Startsted
          </div>
          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-3">
            <div className="font-semibold text-sm text-[#15273F]">{cityLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
