import { City } from '@/lib/types';

interface CityCoordinates {
  lat: number;
  lng: number;
}

const CITY_COORDS: Record<City, CityCoordinates> = {
  tromso: { lat: 69.6496, lng: 18.9560 },
  bodo: { lat: 67.2804, lng: 14.4049 },
  alta: { lat: 69.9689, lng: 23.2717 },
  svalbard: { lat: 78.2232, lng: 15.6267 },
  lofoten: { lat: 68.1464, lng: 14.2058 },
  senja: { lat: 69.3300, lng: 17.7200 },
  narvik: { lat: 68.4384, lng: 17.4274 },
  hammerfest: { lat: 70.6634, lng: 23.6821 },
};

// Approximate driving distances in km between cities
const DRIVING_DISTANCES: Partial<Record<string, Partial<Record<string, number>>>> = {
  tromso: { senja: 150, alta: 350, narvik: 260, lofoten: 420, bodo: 580 },
  bodo: { lofoten: 180, narvik: 280, tromso: 580 },
  alta: { tromso: 350, hammerfest: 150 },
  lofoten: { narvik: 180, tromso: 420, bodo: 180 },
  senja: { tromso: 150, narvik: 260 },
};

export function getCoordinates(city: City): CityCoordinates {
  return CITY_COORDS[city];
}

export function getDrivingDistance(from: City, to: City): number | null {
  return DRIVING_DISTANCES[from]?.[to] ?? DRIVING_DISTANCES[to]?.[from] ?? null;
}

export function getDrivingTimeHours(distanceKm: number): string {
  const hours = distanceKm / 60;
  return `${Math.round(hours * 10) / 10} timer`;
}

export function isRouteFeasible(from: City, to: City, maxHours: number = 6): boolean {
  const dist = getDrivingDistance(from, to);
  if (dist === null) return false;
  return dist / 60 <= maxHours;
}

export function getAllCityCoordinates(): { city: City; lat: number; lng: number }[] {
  return Object.entries(CITY_COORDS).map(([city, coords]) => ({
    city: city as City,
    ...coords,
  }));
}
