"use client";

import type { BudgetBreakdown } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/formatters";
import { useLocale, t } from "@/lib/i18n";

interface BudgetBreakdownProps {
  budget: BudgetBreakdown;
}

const lineItems: {
  key: "flights" | "accommodation" | "transport" | "activities" | "food";
  labelKey: string;
}[] = [
  { key: "flights", labelKey: "budsjett.fly" },
  { key: "accommodation", labelKey: "budsjett.overnatting" },
  { key: "transport", labelKey: "budsjett.transport" },
  { key: "activities", labelKey: "budsjett.aktiviteter" },
  { key: "food", labelKey: "budsjett.mat" },
];

export default function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const { locale } = useLocale();

  return (
    <div>
      <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-2">
        {t("sidebar.budsjett", locale)}
      </div>
      {lineItems.map(({ key, labelKey }) => (
        <div key={key} className="flex justify-between text-xs py-1">
          <span className="text-[#5A6A7A]">{t(labelKey, locale)}</span>
          <span className="font-semibold text-[#15273F]">
            {formatCurrency(budget[key])}
          </span>
        </div>
      ))}
      <div className="flex justify-between text-sm py-2 mt-1 border-t border-[#E0E2E5]">
        <span className="font-semibold text-[#15273F]">
          {t("budsjett.totalt", locale)}
        </span>
        <span className="font-bold text-[#E5212D]">
          {formatCurrency(budget.total)}
        </span>
      </div>
    </div>
  );
}
