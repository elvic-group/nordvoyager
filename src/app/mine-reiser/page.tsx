"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import { useLocale, t } from "@/lib/i18n";

interface SavedTrip {
  id: string;
  input: {
    startLocation: string;
    season: string;
    duration: number;
    interests: string[];
  };
  days: { title: string }[];
}

export default function MineReiserPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("/api/trip");
        if (!res.ok) throw new Error("Failed to load trips");
        const data = await res.json();
        setTrips(data.trips || []);
      } catch (err) {
        setError(t("generic.error", locale));
        console.error("Failed to fetch trips:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [locale]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/trip/${id}`, { method: "DELETE" });
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch {
      console.error("Failed to delete trip");
    }
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#15273F]">
              {t("trips.mine-reiser", locale)}
            </h1>
            <p className="text-sm text-[#5A6A7A] mt-0.5">
              {t("trips.dine-reiser", locale)}
            </p>
          </div>
          <Link href="/planlegg">
            <Button size="sm">{t("trips.ny-reise", locale)}</Button>
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <EmptyState
            title={t("generic.error", locale)}
            description={error}
            action={
              <Button onClick={() => window.location.reload()}>
                {t("generic.prov-igjen", locale)}
              </Button>
            }
          />
        ) : trips.length === 0 ? (
          <EmptyState
            title={t("trips.ingen", locale)}
            description={t("trips.ingen-desc", locale)}
            action={
              <Link href="/planlegg">
                <Button>{t("trips.ny-reise", locale)}</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {trips.map((trip) => {
              const city = trip.input?.startLocation || "";
              const season = trip.input?.season || "";
              const duration = trip.input?.duration || 0;
              const activityCount = trip.days?.length || 0;
              const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);

              return (
                <div
                  key={trip.id}
                  className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 hover:border-[#E5212D]/30 transition-colors cursor-pointer"
                  onClick={() => {
                    sessionStorage.setItem("currentTrip", JSON.stringify(trip));
                    router.push("/planlegg/resultater");
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-[#15273F]">
                        {cityLabel} — {duration} {t("trips.dager", locale)}
                      </div>
                      <div className="text-xs text-[#5A6A7A] mt-1">
                        {season} · {activityCount}{" "}
                        {t("itinerary.aktiviteter", locale)}
                        {trip.input?.interests?.length
                          ? ` · ${trip.input.interests.slice(0, 3).join(", ")}`
                          : ""}
                      </div>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(trip.id);
                      }}
                      className="text-xs text-[#E5212D] hover:underline px-2 py-1"
                      aria-label={`${t("trips.slett", locale)} ${locale === "nb" ? "reise" : "trip"}`}
                      type="button"
                    >
                      {t("trips.slett", locale)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
