"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import WizardStepper from "@/components/onboarding/WizardStepper";
import InterestSelector from "@/components/onboarding/InterestSelector";
import SeasonSelector from "@/components/onboarding/SeasonSelector";
import DurationSelector from "@/components/onboarding/DurationSelector";
import BudgetSelector from "@/components/onboarding/BudgetSelector";
import LocationSelector from "@/components/onboarding/LocationSelector";
import SummaryStep from "@/components/onboarding/SummaryStep";
import AIChatBubble from "@/components/onboarding/AIChatBubble";
import Button from "@/components/ui/Button";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import Badge from "@/components/ui/Badge";
import { TripInput, Season, Budget, City } from "@/lib/types";

const FULL_STEPS = [
  { label: "Interesser", step: 0 },
  { label: "Sesong", step: 1 },
  { label: "Varighet", step: 2 },
  { label: "Detaljer", step: 3 },
  { label: "Oppsummering", step: 4 },
];

type DraftTripInput = {
  interests: TripInput["interests"];
  season: Season | "";
  duration: TripInput["duration"];
  budget: Budget | "";
  startLocation: City | "";
};

function isCompleteInput(input: DraftTripInput): input is TripInput {
  return (
    input.interests.length > 0 &&
    input.season !== "" &&
    input.duration > 0 &&
    input.budget !== "" &&
    input.startLocation !== ""
  );
}

export default function PlanleggPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [streamedDays, setStreamedDays] = useState<number>(0);
  const [input, setInput] = useState<DraftTripInput>({
    interests: [],
    season: "",
    duration: 5,
    budget: "",
    startLocation: "",
  });

  const updateField = useCallback(
    <K extends keyof DraftTripInput>(field: K, value: DraftTripInput[K]) => {
      setInput((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const nextStep = useCallback(() => {
    if (step < 4) {
      setStep((currentStep) => currentStep + 1);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep((currentStep) => currentStep - 1);
    }
  }, [step]);

  const handleGenerate = useCallback(async () => {
    if (!isCompleteInput(input)) return;

    setLoading(true);
    sessionStorage.setItem("streamingTrip", "true");

    try {
      const response = await fetch("/api/trip/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error("Generation failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let buffer = "";
      let dayCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === "day") {
              dayCount++;
              setStreamedDays(dayCount);

              // Accumulate in session storage
              const existing = sessionStorage.getItem("currentTrip");
              const trip = existing
                ? JSON.parse(existing)
                : { ...event.day, days: [], input };
              if (!trip.days) trip.days = [];
              trip.days.push(event.day);
              sessionStorage.setItem("currentTrip", JSON.stringify(trip));
            } else if (event.type === "complete") {
              sessionStorage.setItem("currentTrip", JSON.stringify(event.trip));
              sessionStorage.removeItem("streamingTrip");
              router.push("/planlegg/resultater");
              return;
            }
          } catch {
            // skip malformed events
          }
        }
      }
    } catch (error) {
      console.error("Generate failed:", error);
      setLoading(false);
      sessionStorage.removeItem("streamingTrip");
    }
  }, [input, router]);

  const canProceed = () => {
    switch (step) {
      case 0:
        return input.interests.length > 0;
      case 1:
        return input.season !== "";
      case 2:
        return input.duration > 0;
      case 3:
        return input.startLocation !== "" && input.budget !== "";
      case 4:
        return isCompleteInput(input);
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="max-w-3xl mx-auto text-center py-8">
          <h2 className="text-lg font-bold text-[#15273F] mb-2">
            Genererer din reiseplan...
          </h2>
          <p className="text-sm text-[#5A6A7A] mb-4">
            AI-en jobber med å skreddersy reisen etter dine ønsker.
          </p>
          {streamedDays > 0 && (
            <div className="mb-4">
              <Badge
                label={`${streamedDays} / ${input.duration} dager generert`}
                color="red"
                active
              />
            </div>
          )}
          <LoadingSkeleton />
        </div>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl">
      <WizardStepper currentStep={step} steps={FULL_STEPS} />

      <div className="bg-white border border-[#E0E2E5] rounded-[4px] p-5 mb-4">
        {step === 0 && (
          <InterestSelector
            selected={input.interests}
            onChange={(value) =>
              updateField("interests", value as TripInput["interests"])
            }
          />
        )}
        {step === 1 && (
          <SeasonSelector
            selected={input.season as Season}
            onChange={(value) => updateField("season", value as Season)}
          />
        )}
        {step === 2 && (
          <DurationSelector
            selected={input.duration}
            onChange={(value) => updateField("duration", value)}
          />
        )}
        {step === 3 && (
          <div className="space-y-5">
            <LocationSelector
              selected={input.startLocation as City}
              onChange={(value) => updateField("startLocation", value as City)}
            />
            <BudgetSelector
              selected={input.budget as Budget}
              onChange={(value) => updateField("budget", value as Budget)}
            />
          </div>
        )}
        {step === 4 && isCompleteInput(input) && (
          <>
            <SummaryStep input={input} />
            <div className="mt-4">
              <AIChatBubble
                message={`Jeg anbefaler ${input.duration} dager i ${input.season} med fokus på ${input.interests.join(", ")}. ${(input.season === "autumn" || input.season === "winter") && input.interests.includes("northern_lights") ? "Høst og vinter gir gode muligheter for nordlys!" : ""} Klar til å generere din personlige reiseplan?`}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div>
          {step > 0 && (
            <Button variant="outline" onClick={prevStep}>
              Tilbake
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          {step < 4 ? (
            <Button onClick={nextStep} disabled={!canProceed()}>
              Neste →
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={!canProceed()}>
              Generer reiseplan
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
