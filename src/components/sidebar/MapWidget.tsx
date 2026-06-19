"use client";

import dynamic from "next/dynamic";
import { Day } from "@/lib/types";
import Skeleton from "@/components/ui/Skeleton";

const TripMap = dynamic(() => import("@/components/map/TripMap"), {
  loading: () => <Skeleton className="h-[250px] w-full rounded-[4px]" />,
  ssr: false,
});

interface MapWidgetProps {
  days: Day[];
}

export default function MapWidget({ days }: MapWidgetProps) {
  return <TripMap days={days} />;
}
