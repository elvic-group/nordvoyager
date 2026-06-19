import { NextRequest, NextResponse } from 'next/server';
import { fetchFlights } from '@/lib/services/avinor-service';
import { z } from 'zod';

const querySchema = z.object({
  city: z.string().min(1),
  direction: z.enum(['D', 'A']).optional().default('D'),
  hours: z.coerce.number().min(1).max(24).optional().default(12),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    city: searchParams.get('city'),
    direction: searchParams.get('direction') || 'D',
    hours: searchParams.get('hours') || 12,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ValidationError', details: parsed.error.issues },
      { status: 422 },
    );
  }

  try {
    const { flights, lastUpdate } = await fetchFlights(
      parsed.data.city as any,
      parsed.data.direction,
      1,
      parsed.data.hours,
    );
    return NextResponse.json({ flights, lastUpdate });
  } catch {
    return NextResponse.json({ error: 'Flight fetch failed' }, { status: 502 });
  }
}
