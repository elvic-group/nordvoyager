import { db } from '@/lib/db';
import { trips, tripShares } from '@/lib/db/schema';
import { Trip } from '@/lib/types';
import { eq } from 'drizzle-orm';
import { generateId } from '@/lib/utils/formatters';
import crypto from 'crypto';

export async function saveTripToDb(
  trip: Trip,
  userId: string = 'anonymous',
): Promise<Trip> {
  await db
    .insert(trips)
    .values({
      id: trip.id,
      userId,
      title: `${trip.input.startLocation} — ${trip.input.duration} dager`,
      inputJson: JSON.stringify(trip.input),
      itineraryJson: JSON.stringify(trip),
      season: trip.input.season,
      duration: trip.input.duration,
      startCity: trip.input.startLocation,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: trips.id,
      set: {
        userId,
        title: `${trip.input.startLocation} — ${trip.input.duration} dager`,
        inputJson: JSON.stringify(trip.input),
        itineraryJson: JSON.stringify(trip),
        season: trip.input.season,
        duration: trip.input.duration,
        startCity: trip.input.startLocation,
        updatedAt: new Date(),
      },
    });

  return trip;
}

export async function getTripFromDb(id: string): Promise<Trip | null> {
  const result = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
  if (result.length === 0) return null;
  return JSON.parse(result[0].itineraryJson) as Trip;
}

export async function getUserTrips(
  userId: string = 'anonymous',
): Promise<Trip[]> {
  const result = await db
    .select()
    .from(trips)
    .where(eq(trips.userId, userId))
    .orderBy(trips.createdAt);
  return result.map((row) => JSON.parse(row.itineraryJson) as Trip);
}

export async function deleteTripFromDb(id: string): Promise<boolean> {
  await db.delete(trips).where(eq(trips.id, id));
  return true;
}

export async function createShareToken(tripId: string): Promise<string> {
  const token = crypto.randomBytes(16).toString('hex');
  await db.insert(tripShares).values({
    id: generateId(),
    tripId,
    shareToken: token,
  });
  return token;
}

export async function getTripByShareToken(token: string): Promise<Trip | null> {
  const result = await db
    .select({ trip: trips })
    .from(tripShares)
    .where(eq(tripShares.shareToken, token))
    .innerJoin(trips, eq(tripShares.tripId, trips.id))
    .limit(1);

  if (result.length === 0) return null;
  return JSON.parse(result[0].trip.itineraryJson) as Trip;
}
