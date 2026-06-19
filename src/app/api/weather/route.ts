import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "@/lib/services/weather-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "69.6496");
  const lon = parseFloat(searchParams.get("lon") || "18.9560");
  const days = parseInt(searchParams.get("days") || "7", 10);

  try {
    const forecast = await fetchWeather(lat, lon, Math.min(days, 7));
    return NextResponse.json({ forecast });
  } catch {
    return NextResponse.json(
      { error: "Weather fetch failed" },
      { status: 502 },
    );
  }
}
