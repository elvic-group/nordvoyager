import { NextRequest, NextResponse } from 'next/server';
import { planJourney } from '@/lib/services/entur-service';
import { z } from 'zod';

const querySchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  dateTime: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    dateTime: searchParams.get('dateTime') || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ValidationError', details: parsed.error.issues },
      { status: 422 },
    );
  }

  try {
    const result = await planJourney(
      parsed.data.from as any,
      parsed.data.to as any,
      parsed.data.dateTime,
    );

    if (result.error) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Journey planning failed' }, { status: 502 });
  }
}
