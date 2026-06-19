"use client";

import { PackingItem } from "@/lib/types";
import { useLocale, t } from "@/lib/i18n";

interface PackingListProps {
  items: PackingItem[];
}

export default function PackingList({ items }: PackingListProps) {
  const { locale } = useLocale();

  return (
    <div>
      <div className="text-[10px] font-bold text-[#7A8A9A] uppercase tracking-wider mb-2">
        {t("sidebar.pakkliste", locale)}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item.name}
            className="px-2.5 py-1 bg-[#F0F1F3] text-[#5A6A7A] rounded-[4px] text-xs"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
