import { Trip } from '@/lib/types';
import { CITIES } from '@/lib/utils/constants';

interface TripOverviewProps {
  trip: Trip;
}

export default function TripOverview({ trip }: TripOverviewProps) {
  const cityLabel = CITIES.find((c) => c.value === trip.input.startLocation)?.label || trip.input.startLocation;

  return (
    <div>
      <div className="text-[10px] font-bold text-[#7A8A9A] uppercase tracking-wider mb-2">
        Reiseoversikt
      </div>
      <div className="text-xl font-bold text-[#15273F] leading-tight">
        {cityLabel}{trip.days.length > 1 ? ` → ${trip.days[trip.days.length - 1]?.title.split(' — ')[1] || ''}` : ''}
      </div>
      <div className="text-xs text-[#5A6A7A] mt-1">
        {trip.days.length} dager · {trip.input.season} · {trip.days.reduce((sum, d) => sum + d.activities.length, 0)} aktiviteter
      </div>
    </div>
  );
}
