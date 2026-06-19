import { AuroraForecast } from '@/lib/types';

export async function fetchAuroraForecast(lat: number, lon: number): Promise<AuroraForecast> {
  try {
    const res = await fetch(
      `https://services.swpc.noaa.gov/json/planetary_k_index_3h.json`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return getFallbackAurora();

    const data = await res.json();
    const latest = data[data.length - 1];
    const kpIndex = latest?.kp_index ?? 3;

    return {
      kpIndex,
      cloudCover: 35,
      probability: kpIndex >= 5 ? 'Excellent' : kpIndex >= 4 ? 'Good' : kpIndex >= 3 ? 'Fair' : 'Poor',
    };
  } catch {
    return getFallbackAurora();
  }
}

function getFallbackAurora(): AuroraForecast {
  return { kpIndex: 3, cloudCover: 35, probability: 'Fair' };
}
