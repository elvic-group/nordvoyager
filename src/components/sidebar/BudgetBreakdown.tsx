import type { BudgetBreakdown } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';

interface BudgetBreakdownProps {
  budget: BudgetBreakdown;
}

const lineItems: { key: 'flights' | 'accommodation' | 'transport' | 'activities' | 'food'; label: string }[] = [
  { key: 'flights', label: 'Fly' },
  { key: 'accommodation', label: 'Overnatting' },
  { key: 'transport', label: 'Leiebil + drivstoff' },
  { key: 'activities', label: 'Aktiviteter' },
  { key: 'food', label: 'Mat' },
];

export default function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  return (
    <div>
      <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-2">
        Budsjett
      </div>
      {lineItems.map(({ key, label }) => (
        <div key={key} className="flex justify-between text-xs py-1">
          <span className="text-[#5A6A7A]">{label}</span>
          <span className="font-semibold text-[#15273F]">{formatCurrency(budget[key])}</span>
        </div>
      ))}
      <div className="flex justify-between text-sm py-2 mt-1 border-t border-[#E0E2E5]">
        <span className="font-semibold text-[#15273F]">Totalt</span>
        <span className="font-bold text-[#E5212D]">{formatCurrency(budget.total)}</span>
      </div>
    </div>
  );
}
