import { NextRequest, NextResponse } from 'next/server';
import { createShareToken, getTripFromDb } from '@/lib/services/db-service';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const shareSchema = z.object({
  tripId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = shareSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'ValidationError', details: parsed.error.issues },
        { status: 422 },
      );
    }

    // Verify trip exists
    const trip = await getTripFromDb(parsed.data.tripId);
    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    const token = await createShareToken(parsed.data.tripId);
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nordvoyager.vercel.app'}/reise/${token}`;

    return NextResponse.json({ shareUrl, token });
  } catch (error) {
    console.error('Share token creation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
