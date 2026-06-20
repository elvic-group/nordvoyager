import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { generateId } from '@/lib/utils/formatters';

const reviewSchema = z.object({
  tripId: z.string().min(1),
  authorName: z.string().min(1).max(50),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
  userId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'ValidationError', details: parsed.error.issues }, { status: 422 });
    }

    await db.insert(reviews).values({
      id: generateId(),
      tripId: parsed.data.tripId,
      authorName: parsed.data.authorName,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
      userId: parsed.data.userId || null,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Review creation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get('tripId');

  if (!tripId) {
    return NextResponse.json({ error: 'tripId required' }, { status: 400 });
  }

  try {
    const result = await db.select().from(reviews).where(eq(reviews.tripId, tripId)).orderBy(reviews.createdAt);
    return NextResponse.json({ reviews: result });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ reviews: [] });
  }
}
