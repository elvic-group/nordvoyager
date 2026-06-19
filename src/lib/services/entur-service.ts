import { City } from '@/lib/types';

interface JourneyLeg {
  mode: string;
  lineName: string;
  fromPlace: string;
  toPlace: string;
  scheduledTime: string;
  estimatedTime?: string;
  duration: number;
  operator?: string;
}

interface JourneyResponse {
  legs: JourneyLeg[];
  totalDuration: number;
  error?: string;
}

const ENTUR_GRAPHQL = 'https://api.entur.io/journey-planner/v3/graphql';
const ENTUR_GEOCODER = 'https://api.entur.io/geocoder/v1/search';

const CITY_NAMES: Record<City, string> = {
  tromso: 'Tromsø',
  bodo: 'Bodø',
  alta: 'Alta',
  svalbard: 'Longyearbyen',
  lofoten: 'Leknes',
  senja: 'Senja',
  narvik: 'Narvik',
  hammerfest: 'Hammerfest',
};

export async function planJourney(
  from: City,
  to: City,
  dateTime?: string,
): Promise<JourneyResponse> {
  const fromName = CITY_NAMES[from];
  const toName = CITY_NAMES[to];

  if (!fromName || !toName) {
    return { legs: [], totalDuration: 0, error: 'Unknown city' };
  }

  try {
    const fromCoords = await geocodeCity(fromName);
    const toCoords = await geocodeCity(toName);

    if (!fromCoords || !toCoords) {
      return { legs: [], totalDuration: 0, error: 'Could not geocode cities' };
    }

    return await queryJourneyPlanner(fromCoords, toCoords, dateTime);
  } catch (error) {
    console.error('Entur journey planning failed:', error);
    return { legs: [], totalDuration: 0, error: 'Journey planning failed' };
  }
}

async function geocodeCity(cityName: string): Promise<{ lat: number; lon: number } | null> {
  const url = `${ENTUR_GEOCODER}?text=${encodeURIComponent(cityName)},Norway&size=1&lang=no`;

  try {
    const res = await fetch(url, {
      headers: { 'ET-Client-Name': 'nordvoyager-travel-planner' },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature?.geometry?.coordinates) return null;

    return {
      lon: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1],
    };
  } catch {
    return null;
  }
}

async function queryJourneyPlanner(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
  dateTime?: string,
): Promise<JourneyResponse> {
  const date = dateTime || new Date().toISOString().split('T')[0];
  const time = dateTime ? dateTime.split('T')[1]?.slice(0, 5) : '08:00';

  const query = `
  {
    trip(
      from: { coordinates: { latitude: ${from.lat}, longitude: ${from.lon} } }
      to: { coordinates: { latitude: ${to.lat}, longitude: ${to.lon} } }
      dateTime: "${date}T${time}:00+02:00"
      numTripPatterns: 3
    ) {
      tripPatterns {
        duration
        legs {
          mode
          line {
            name
            transportMode
            publicCode
          }
          fromEstimatedCall {
            destinationDisplay {
              frontText
            }
          }
          aimedStartTime
          expectedStartTime
          fromPlace {
            name
          }
          toPlace {
            name
          }
          duration
          authority {
            name
          }
        }
      }
    }
  }`;

  try {
    const res = await fetch(ENTUR_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ET-Client-Name': 'nordvoyager-travel-planner',
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`Entur API returned ${res.status}`);

    const data = await res.json();
    const trip = data?.data?.trip?.tripPatterns?.[0];

    if (!trip) {
      return { legs: [], totalDuration: 0, error: 'No route found' };
    }

    const legs: JourneyLeg[] = trip.legs.map((leg: any) => ({
      mode: leg.mode,
      lineName: leg.line?.publicCode
        ? `${leg.line.publicCode} ${leg.line.name || ''}`
        : leg.line?.name || leg.mode,
      fromPlace: leg.fromPlace?.name || '',
      toPlace: leg.toPlace?.name || '',
      scheduledTime: leg.aimedStartTime,
      estimatedTime: leg.expectedStartTime,
      duration: Math.round(leg.duration / 60),
      operator: leg.authority?.name,
    }));

    return {
      legs,
      totalDuration: Math.round(trip.duration / 60),
    };
  } catch (error) {
    console.error('Journey planner query failed:', error);
    return { legs: [], totalDuration: 0, error: 'Failed to query journey planner' };
  }
}

export async function findFerryRoutes(from: City, to: City): Promise<JourneyLeg[]> {
  const result = await planJourney(from, to);
  return result.legs.filter((leg) => leg.mode === 'ferry' || leg.mode === 'water');
}

export type { JourneyLeg, JourneyResponse };
