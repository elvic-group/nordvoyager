import { BudgetBreakdown } from '@/lib/types';

export function calculateBudget(
  duration: number,
  budget: string
): BudgetBreakdown {
  const perDayMultiplier = { low: 1, medium: 1.5, premium: 2.5 };
  const m = perDayMultiplier[budget as keyof typeof perDayMultiplier] || 1;

  const base = {
    flights: Math.round(3200 * (budget === 'premium' ? 1.5 : budget === 'low' ? 0.7 : 1)),
    accommodation: Math.round(duration * 1300 * m),
    transport: Math.round(4000 * m),
    activities: Math.round(3000 * m),
    food: Math.round(duration * 600 * m),
  };

  return {
    ...base,
    total: base.flights + base.accommodation + base.transport + base.activities + base.food,
  };
}
