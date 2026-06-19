'use client';

import { Activity, City } from '@/lib/types';
import { CITIES } from '@/lib/utils/constants';

const BOOKING_LINKS: Record<string, { url: string; label: string }[]> = {
  flights: [
    { url: 'https://www.norwegian.com', label: 'Norwegian' },
    { url: 'https://www.wideroe.no', label: 'Widerøe' },
    { url: 'https://www.sas.no', label: 'SAS' },
  ],
  accommodation: [
    { url: 'https://www.booking.com', label: 'Booking.com' },
  ],
  transport: [
    { url: 'https://www.vy.no', label: 'Vy' },
    { url: 'https://www.entur.no', label: 'Entur' },
    { url: 'https://www.torghatten.no', label: 'Torghatten' },
  ],
  outdoor: [
    { url: 'https://www.getyourguide.com', label: 'GetYourGuide' },
  ],
  culture: [
    { url: 'https://www.getyourguide.com', label: 'GetYourGuide' },
  ],
  aurora: [
    { url: 'https://www.getyourguide.com', label: 'GetYourGuide' },
  ],
  food: [
    { url: 'https://www.tripadvisor.com', label: 'TripAdvisor' },
  ],
  other: [
    { url: 'https://www.visitnorway.com', label: 'Visit Norway' },
  ],
};

const CITY_BOOKING_LINKS: Record<string, { url: string; label: string }[]> = {
  tromso: [
    { url: 'https://www.visitnorway.com/destinations/northern-norway/tromso/', label: 'Visit Tromsø' },
    { url: 'https://www.fjellheisen.no', label: 'Fjellheisen' },
  ],
  lofoten: [
    { url: 'https://www.visitnorway.com/destinations/northern-norway/lofoten/', label: 'Visit Lofoten' },
  ],
  bodo: [
    { url: 'https://www.visitnorway.com/destinations/northern-norway/bodo/', label: 'Visit Bodø' },
  ],
  alta: [
    { url: 'https://www.visitnorway.com/destinations/northern-norway/alta/', label: 'Visit Alta' },
  ],
  svalbard: [
    { url: 'https://www.visitnorway.com/destinations/northern-norway/svalbard/', label: 'Visit Svalbard' },
  ],
};

interface BookingLinksProps {
  category: string;
  location: string;
  price?: number | null;
}

export default function BookingLinks({ category, location, price }: BookingLinksProps) {
  const categoryLinks = BOOKING_LINKS[category] || BOOKING_LINKS.other;
  const cityKey = location?.toLowerCase() as keyof typeof CITY_BOOKING_LINKS;
  const cityLinks = CITY_BOOKING_LINKS[cityKey] || [];

  if (category === 'accommodation' && !price) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {[...categoryLinks, ...cityLinks].slice(0, 3).map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] px-2 py-0.5 bg-[#F0F1F3] text-[#5A6A7A] rounded-[4px] hover:bg-[#E0E2E5] hover:text-[#15273F] transition-colors no-underline"
          onClick={(e) => e.stopPropagation()}
        >
          🔗 {link.label}
        </a>
      ))}
    </div>
  );
}
