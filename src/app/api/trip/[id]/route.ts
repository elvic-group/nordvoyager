import { NextRequest, NextResponse } from 'next/server';
import { getTripFromDb, deleteTripFromDb } from '@/lib/services/db-service';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const trip = await getTripFromDb(id);
    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }
    return NextResponse.json({ trip });
  } catch (error) {
    console.error('Failed to fetch trip:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await deleteTripFromDb(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete trip:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
