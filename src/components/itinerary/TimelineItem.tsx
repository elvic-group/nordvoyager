"use client";

import { Activity } from "@/lib/types";
import ActivityPopover from "./ActivityPopover";
import AuroraBadge from "./AuroraBadge";
import BookingLinks from "@/components/shared/BookingLinks";

const dotColors: Record<string, string> = {
  transport: "bg-[#15273F] border-[#D0D5DA]",
  accommodation: "bg-[#2A5A7A] border-[#C0D4E0]",
  food: "bg-[#C07A2A] border-[#F0DCC0]",
  outdoor: "bg-[#2A7A4A] border-[#C0DCC8]",
  culture: "bg-[#7A4A2A] border-[#E0C8B0]",
  aurora: "bg-[#6A2A7A] border-[#DCC0F0]",
  photography: "bg-[#2A5A7A] border-[#C0D4E0]",
  other: "bg-[#7A8A9A] border-[#D0D5DA]",
};

interface TimelineItemProps {
  activity: Activity;
  isLast: boolean;
}

export default function TimelineItem({ activity, isLast }: TimelineItemProps) {
  const dotColor = dotColors[activity.category] || dotColors.other;

  return (
    <div className="flex gap-3.5" role="listitem">
      <div className="flex flex-col items-center min-w-[36px]">
        <div className={`w-3 h-3 rounded-full border-2 ${dotColor}`} />
        {!isLast && <div className="w-px flex-1 bg-[#E0E2E5] min-h-[44px]" />}
      </div>
      <div className="flex-1 pb-2">
        <ActivityPopover activity={activity}>
          <div className="text-xs font-semibold text-[#15273F] hover:text-[#E5212D] transition-colors cursor-pointer">
            {activity.title}
          </div>
        </ActivityPopover>
        <div className="text-xs text-[#5A6A7A]">
          {activity.time} —{" "}
          {activity.description.length > 80
            ? activity.description.substring(0, 80) + "..."
            : activity.description}
        </div>
        {activity.price && (
          <div className="text-xs text-[#5A6A7A] mt-0.5">
            <span className="text-[#E5212D] font-semibold">
              {activity.price.toLocaleString("nb-NO")} kr
            </span>
          </div>
        )}
        {activity.auroraForecast && (
          <AuroraBadge forecast={activity.auroraForecast} />
        )}
        <BookingLinks
          category={activity.category}
          location={activity.location}
          price={activity.price}
        />
      </div>
    </div>
  );
}
