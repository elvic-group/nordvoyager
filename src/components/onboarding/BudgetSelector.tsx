'use client';

import { Budget } from '@/lib/types';
import { BUDGETS } from '@/lib/utils/constants';

interface BudgetSelectorProps {
  selected: Budget;
  onChange: (budget: Budget) => void;
}

export default function BudgetSelector({ selected, onChange }: BudgetSelectorProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#15273F] mb-1">Hva er budsjettet?</h2>
      <p className="text-xs text-[#5A6A7A] mb-4">
        Velg budsjettnivå. Prisene er veiledende per person for hele reisen.
      </p>
      <div className="flex gap-2" role="radiogroup" aria-label="Budsjett">
        {BUDGETS.map((budget) => (
          <button
            key={budget.value}
            role="radio"
            aria-checked={selected === budget.value}
            onClick={() => onChange(budget.value)}
            className={`flex-1 p-3 rounded-[4px] border text-left transition-colors ${
              selected === budget.value
                ? 'border-[#E5212D] bg-[#E5212D]/5'
                : 'border-[#E0E2E5] bg-white hover:bg-[#F8F8F8]'
            }`}
          >
            <div className="font-semibold text-sm text-[#15273F]">{budget.label}</div>
            <div className="text-xs text-[#5A6A7A] mt-0.5">{budget.range}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
