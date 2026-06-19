import { Trip, TripInput, PackingItem } from '@/lib/types';
import { generateTrip } from '@/lib/ai/generator';
import { calculateBudget } from './budget-service';
import { generatePackingList } from './packing-service';

export async function createTrip(input: TripInput): Promise<Trip> {
  return generateTrip(input);
}

export async function saveTrip(trip: Trip): Promise<void> {
  try {
    const res = await fetch('/api/trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    if (!res.ok) throw new Error('Failed to save trip');
  } catch (error) {
    console.error('Save trip failed:', error);
    throw error;
  }
}

export async function getSavedTrips(): Promise<Trip[]> {
  try {
    const res = await fetch('/api/trip');
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function deleteTrip(id: string): Promise<void> {
  await fetch(`/api/trip/${id}`, { method: 'DELETE' });
}
