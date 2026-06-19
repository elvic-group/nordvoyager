import { getTripByShareToken } from '@/lib/services/db-service';
import { notFound } from 'next/navigation';
import Container from '@/components/layout/Container';
import Link from 'next/link';
import { CITIES } from '@/lib/utils/constants';

interface Props {
  params: Promise<{ shareToken: string }>;
}

export default async function SharedTripPage({ params }: Props) {
  const { shareToken } = await params;
  const trip = await getTripByShareToken(shareToken);

  if (!trip) {
    notFound();
  }

  const cityLabel = CITIES.find((c) => c.value === trip.input.startLocation)?.label || trip.input.startLocation;

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#F0F1F3] rounded-[4px] p-4 mb-6 text-center">
          <p className="text-xs text-[#15273F] font-semibold">
            🗺️ {cityLabel} — {trip.input.duration} dager i {trip.input.season}
          </p>
          <p className="text-[10px] text-[#5A6A7A] mt-1">
            Delt reiseplan · {trip.days.length} dager · {trip.days.reduce((s, d) => s + d.activities.length, 0)} aktiviteter
          </p>
        </div>

        {trip.days.map((day) => (
          <div key={day.dayNumber} className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 mb-3">
            <div className="font-semibold text-sm text-[#15273F] mb-2">
              Dag {day.dayNumber} — {day.title}
            </div>
            <div className="space-y-2">
              {day.activities.map((activity) => (
                <div key={activity.id} className="flex gap-2 text-xs">
                  <span className="text-[#5A6A7A] min-w-[36px]">{activity.time}</span>
                  <div>
                    <span className="text-[#15273F] font-medium">{activity.title}</span>
                    <span className="text-[#5A6A7A] ml-1">— {activity.description}</span>
                    {activity.price && (
                      <span className="text-[#E5212D] font-semibold ml-1">{activity.price.toLocaleString('nb-NO')} kr</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          <Link href="/planlegg" className="text-sm text-[#E5212D] hover:underline font-medium">
            Lag din egen reiseplan med NordVoyager →
          </Link>
        </div>
      </div>
    </Container>
  );
}
