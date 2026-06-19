"use client";

import { useState, useEffect } from "react";
import { WeatherForecast } from "@/lib/types";
import { formatTemp, formatPercentage } from "@/lib/utils/formatters";
import { useLocale, t } from "@/lib/i18n";

interface WeatherWidgetProps {
  forecast?: WeatherForecast;
  lat?: number;
  lon?: number;
}

export default function WeatherWidget({
  forecast: initialForecast,
  lat,
  lon,
}: WeatherWidgetProps) {
  const { locale } = useLocale();
  const [forecast, setForecast] = useState<WeatherForecast | null>(
    initialForecast || null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon || initialForecast) return;

    setLoading(true);
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.forecast) setForecast(data.forecast);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lat, lon, initialForecast]);

  if (loading) {
    return (
      <div className="bg-[#F8F8F8] border border-[#E8EAED] rounded-[4px] p-3 animate-pulse">
        <div className="h-3 bg-[#E0E2E5] rounded w-1/3 mb-2" />
        <div className="h-3 bg-[#E0E2E5] rounded w-2/3" />
      </div>
    );
  }

  if (!forecast) return null;

  return (
    <div className="bg-[#F8F8F8] border border-[#E8EAED] rounded-[4px] p-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider">
          🌤 {t("itinerary.vaermelding", locale)}
        </div>
        {forecast.condition.toLowerCase().includes("snø") && (
          <span className="text-xs">❄️</span>
        )}
        {forecast.condition.toLowerCase().includes("sol") && (
          <span className="text-xs">☀️</span>
        )}
        {forecast.condition.toLowerCase().includes("sky") && (
          <span className="text-xs">☁️</span>
        )}
        {forecast.condition.toLowerCase().includes("regn") && (
          <span className="text-xs">🌧️</span>
        )}
      </div>
      <div className="text-xs text-[#15273F]">
        {formatTemp(forecast.highTemp)} / {formatTemp(forecast.lowTemp)} ·{" "}
        {forecast.condition}
      </div>
      <div className="text-xs text-[#5A6A7A] mt-0.5">
        {t("weather.skydekke", locale)}: {formatPercentage(forecast.cloudCover)}{" "}
        · {t("weather.nedbor", locale)}:
        {formatPercentage(forecast.precipitation)}
        {forecast.windSpeed &&
          ` · ${t("weather.vind", locale)}: ${forecast.windSpeed} m/s`}
      </div>
    </div>
  );
}
