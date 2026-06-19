import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { generateDay } from '@/lib/ai/generator';
import { getTripFromDb, saveTripToDb } from '@/lib/services/db-service';

const regenSchema = z.object({
  tripId: z.string(),
  dayNumber: z.number().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = regenSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'ValidationError', details: parsed.error.issues },
        { status: 422 },
      );
    }

    const { tripId, dayNumber } = parsed.data;
    const trip = await getTripFromDb(tripId);

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    const dayIndex = trip.days.findIndex((day) => day.dayNumber === dayNumber);
    if (dayIndex < 0) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    const newDay = await generateDay(trip.input, dayNumber, trip.days);
    trip.days[dayIndex] = newDay;

    const session = await auth();
    const userId = session?.user?.id || 'anonymous';
    await saveTripToDb(trip, userId);

    return NextResponse.json({ trip, day: newDay });
  } catch (error) {
    console.error('Day regeneration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
