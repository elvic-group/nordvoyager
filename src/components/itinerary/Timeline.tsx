'use client';

import { Day, City } from '@/lib/types';
import TimelineItem from './TimelineItem';
import WeatherWidget from './WeatherWidget';
import { getCoordinates } from '@/lib/utils/geography';

interface TimelineProps {
  day: Day;
}

export default function Timeline({ day }: TimelineProps) {
  // Get coordinates from the first activity's location
  const firstLocation = day.activities[0]?.location as City;
  const coords = getCoordinates(firstLocation);

  return (
    <div role="list" aria-label={`Aktiviteter for dag ${day.dayNumber}`}>
      <div className="mb-4">
        <h3 className="text-base font-bold text-[#15273F]">{day.title}</h3>
        {day.transportNotes && (
          <p className="text-xs text-[#5A6A7A] mt-0.5">{day.transportNotes}</p>
        )}
      </div>
      {day.activities.map((activity, idx) => (
        <TimelineItem
          key={activity.id}
          activity={activity}
          isLast={idx === day.activities.length - 1}
        />
      ))}
      <div className="mt-4">
        <WeatherWidget
          forecast={day.weatherForecast}
          lat={coords?.lat}
          lon={coords?.lng}
        />
      </div>
    </div>
  );
}
