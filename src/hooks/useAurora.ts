'use client';

import { useState, useEffect } from 'react';
import { AuroraForecast } from '@/lib/types';

export function useAurora(lat: number, lon: number) {
  const [forecast, setForecast] = useState<AuroraForecast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAurora() {
      try {
        const res = await fetch(`/api/aurora?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (!cancelled) setForecast(data.forecast);
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAurora();
    return () => { cancelled = true; };
  }, [lat, lon]);

  return { forecast, loading };
}
