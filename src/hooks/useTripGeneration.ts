'use client';

import { useState, useCallback } from 'react';
import { Trip, TripInput } from '@/lib/types';

export function useTripGeneration() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (input: TripInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/trip/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed');
      }

      const data = await res.json();
      setTrip(data.trip);
      sessionStorage.setItem('currentTrip', JSON.stringify(data.trip));
      return data.trip;
    } catch (err: any) {
      setError(err.message || 'Failed to generate trip');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setTrip(null);
    setError(null);
    sessionStorage.removeItem('currentTrip');
  }, []);

  return { trip, isLoading, error, generate, clear };
}
