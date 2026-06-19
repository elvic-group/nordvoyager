"use client";

import { useEffect, useRef } from "react";
import { Day, Activity, City } from "@/lib/types";
import { getCoordinates } from "@/lib/utils/geography";

interface TripMapProps {
  days: Day[];
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  transport: "#7A8A9A",
  accommodation: "#15273F",
  food: "#D4A04A",
  outdoor: "#3A8C4A",
  culture: "#8B5CF6",
  aurora: "#8B3A9A",
  photography: "#2D7DB0",
  other: "#7A8A9A",
};

const CATEGORY_EMOJI: Record<string, string> = {
  transport: "🚌",
  accommodation: "🏨",
  food: "🍽️",
  outdoor: "⛰️",
  culture: "🏛️",
  aurora: "🌌",
  photography: "📷",
  other: "📍",
};

export default function TripMap({ days, className = "" }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Extract all unique activity locations with coordinates
  const activities = days.flatMap((day) => day.activities);
  const locations = activities
    .map((a) => ({
      activity: a,
      coords: getCoordinates(a.location.toLowerCase() as City),
    }))
    .filter((l) => l.coords) as {
    activity: Activity;
    coords: { lat: number; lng: number };
  }[];

  useEffect(() => {
    async function initMap() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
      }).setView([69.0, 19.0], 4);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 18,
        },
      ).addTo(map);

      mapInstanceRef.current = map;

      const markerLayer = L.layerGroup();
      const routeCoords: [number, number][] = [];

      locations.forEach(({ activity, coords }) => {
        routeCoords.push([coords.lat, coords.lng]);

        const color = CATEGORY_COLORS[activity.category] || "#7A8A9A";
        const emoji = CATEGORY_EMOJI[activity.category] || "📍";

        const marker = L.circleMarker([coords.lat, coords.lng], {
          radius: activity.price ? 10 : 7,
          fillColor: color,
          color: "#FFFFFF",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(markerLayer);

        marker.bindPopup(
          `
          <div style="font-family: Inter, sans-serif; font-size: 13px; line-height: 1.4; min-width: 180px;">
            <div style="font-weight: 600; margin-bottom: 2px;">
              ${emoji} ${activity.title}
            </div>
            <div style="color: #5A6A7A; font-size: 12px; margin-bottom: 4px;">
              ${activity.time} · ${activity.location}
            </div>
            <div style="color: #15273F; font-size: 12px;">
              ${activity.description?.slice(0, 80)}${activity.description?.length > 80 ? "…" : ""}
            </div>
            ${activity.price ? `<div style="color: #E5212D; font-weight: 600; margin-top: 4px; font-size: 12px;">${activity.price.toLocaleString("nb-NO")} kr</div>` : ""}
          </div>
        `,
          { maxWidth: 280 },
        );

        marker.bindTooltip(activity.title, {
          direction: "top",
          offset: L.point(0, -10),
        });
      });

      // Draw route line between consecutive locations
      if (routeCoords.length > 1) {
        L.polyline(routeCoords, {
          color: "#E5212D",
          weight: 2,
          opacity: 0.5,
          dashArray: "8, 8",
        }).addTo(markerLayer);
      }

      markerLayer.addTo(map);

      if (routeCoords.length > 0) {
        map.fitBounds(routeCoords, { padding: [50, 50] });
      }
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [days, locations.length]);

  if (locations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#E8EAED] to-[#D0D5DA] rounded-[4px] h-[250px] flex items-center justify-center text-xs text-[#5A6A7A]">
        <div className="text-center">
          <div className="text-lg mb-1">🗺️</div>
          <div>Kart vises når reiseplanen er generert</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`rounded-[4px] overflow-hidden ${className}`}
      style={{ height: "300px", minHeight: "250px" }}
    />
  );
}

export { CATEGORY_COLORS, CATEGORY_EMOJI };
