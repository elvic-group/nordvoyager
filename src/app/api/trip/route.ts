import { NextResponse } from 'next/server';
import { getUserTrips } from '@/lib/services/db-service';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id || 'anonymous';
    const trips = await getUserTrips(userId);
    return NextResponse.json({ trips });
  } catch (error) {
    console.error('Failed to fetch trips:', error);
    return NextResponse.json({ trips: [] });
  }
}
