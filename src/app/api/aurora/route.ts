import { NextRequest, NextResponse } from 'next/server';
import { fetchAuroraForecast } from '@/lib/services/aurora-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '69.6496');
  const lon = parseFloat(searchParams.get('lon') || '18.9560');

  try {
    const forecast = await fetchAuroraForecast(lat, lon);
    return NextResponse.json({ forecast });
  } catch {
    return NextResponse.json({ error: 'Aurora fetch failed' }, { status: 502 });
  }
}
