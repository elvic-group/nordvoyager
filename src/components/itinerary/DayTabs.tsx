"use client";

import { useLocale, t } from "@/lib/i18n";

interface DayTabsProps {
  days: { dayNumber: number; title: string }[];
  activeDay: number;
  onSelect: (day: number) => void;
  onRegenerateDay?: (day: number) => void;
  regeneratingDay?: number | null;
}

export default function DayTabs({
  days,
  activeDay,
  onSelect,
  onRegenerateDay,
  regeneratingDay,
}: DayTabsProps) {
  const { locale } = useLocale();

  return (
    <div
      className="flex gap-1 mb-4 flex-wrap"
      role="tablist"
      aria-label={locale === "nb" ? "Dager" : "Days"}
    >
      {days.map((day) => (
        <div key={day.dayNumber} className="flex items-center gap-0.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeDay === day.dayNumber}
            onClick={() => onSelect(day.dayNumber)}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              activeDay === day.dayNumber
                ? "bg-[#15273F] text-white"
                : "bg-[#F0F1F3] text-[#5A6A7A] hover:bg-[#E0E2E5]"
            }`}
          >
            {t("itinerary.dag", locale)} {day.dayNumber}
          </button>
          {onRegenerateDay && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onRegenerateDay(day.dayNumber);
              }}
              disabled={regeneratingDay === day.dayNumber}
              className="px-1 py-1.5 text-[#7A8A9A] hover:text-[#E5212D] transition-colors text-xs disabled:opacity-50"
              aria-label={`${t("itinerary.regenerer-dag", locale)} ${day.dayNumber}`}
              title={t("itinerary.regenerer-dag", locale)}
            >
              {regeneratingDay === day.dayNumber ? "⟳" : "↻"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
