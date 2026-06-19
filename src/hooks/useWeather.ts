'use client';

import { useState, useEffect } from 'react';
import { WeatherForecast } from '@/lib/types';

export function useWeather(lat: number, lon: number) {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (!cancelled) setForecast(data.forecast);
      } catch {
        // Silently fail - show nothing
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWeather();
    return () => { cancelled = true; };
  }, [lat, lon]);

  return { forecast, loading };
}
