"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import DayTabs from "@/components/itinerary/DayTabs";
import Timeline from "@/components/itinerary/Timeline";
import TripOverview from "@/components/sidebar/TripOverview";
import MapWidget from "@/components/sidebar/MapWidget";
import BudgetBreakdown from "@/components/sidebar/BudgetBreakdown";
import PackingList from "@/components/sidebar/PackingList";
import ActionPanel from "@/components/sidebar/ActionPanel";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/ui/Button";
import { Trip, City, Day } from "@/lib/types";

export default function ResultaterPage() {
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [regeneratingDay, setRegeneratingDay] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("currentTrip");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Trip;
        setTrip(parsed);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (!trip) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/trip/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip.input),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = (await response.json()) as { trip: Trip };
      setTrip(data.trip);
      setActiveDay(1);
      sessionStorage.setItem("currentTrip", JSON.stringify(data.trip));
    } catch (error) {
      console.error("Regenerate failed:", error);
    } finally {
      setLoading(false);
    }
  }, [trip]);

  const handleRegenerateDay = useCallback(
    async (dayNumber: number) => {
      if (!trip) {
        return;
      }

      setRegeneratingDay(dayNumber);
      try {
        const response = await fetch("/api/trip/regenerate-day", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tripId: trip.id, dayNumber }),
        });

        if (!response.ok) {
          throw new Error("Day regeneration failed");
        }

        const data = (await response.json()) as { trip: Trip; day: Day };
        setTrip(data.trip);
        setActiveDay(dayNumber);
        sessionStorage.setItem("currentTrip", JSON.stringify(data.trip));
      } catch (error) {
        console.error("Regenerate day failed:", error);
      } finally {
        setRegeneratingDay(null);
      }
    },
    [trip],
  );

  if (loading || !trip) {
    return (
      <Container>
        {loading ? (
          <div className="max-w-4xl mx-auto">
            <LoadingSkeleton />
          </div>
        ) : (
          <EmptyState
            title="Ingen reiseplan funnet"
            description="Du må først generere en reiseplan. Start med å velge dine preferanser."
            action={
              <Button onClick={() => router.push("/planlegg")}>
                Planlegg reise
              </Button>
            }
          />
        )}
      </Container>
    );
  }

  const currentDay =
    trip.days.find((day) => day.dayNumber === activeDay) || trip.days[0];
  const cities = [
    ...new Set(
      trip.days.flatMap((day) =>
        day.activities.map((activity) => activity.location),
      ),
    ),
  ] as City[];

  return (
    <Container className="max-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div>
          <DayTabs
            days={trip.days.map((day) => ({
              dayNumber: day.dayNumber,
              title: day.title,
            }))}
            activeDay={activeDay}
            onSelect={setActiveDay}
            onRegenerateDay={handleRegenerateDay}
            regeneratingDay={regeneratingDay}
          />
          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-4">
            {currentDay && <Timeline day={currentDay} />}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 space-y-4">
            <TripOverview trip={trip} />
            <MapWidget days={trip.days} />
          </div>

          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 space-y-4">
            <BudgetBreakdown budget={trip.totalBudget} />
          </div>

          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 space-y-4">
            <PackingList items={trip.packingList} />
          </div>

          <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 space-y-4">
            <ActionPanel onRegenerate={handleRegenerate} tripId={trip.id} />
          </div>
        </aside>
      </div>
    </Container>
  );
}
