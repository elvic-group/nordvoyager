import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "./prompts";
import { TripInput, Trip, Day, Activity } from "@/lib/types";
import { generateId } from "@/lib/utils/formatters";

const activitySchema = z.object({
  id: z.string(),
  time: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "transport",
    "accommodation",
    "food",
    "outdoor",
    "culture",
    "aurora",
    "photography",
    "other",
  ] as const),
  location: z.string(),
  price: z.number().nullable(),
  currency: z.string(),
  bookingStatus: z.enum(["not_booked", "recommended", "booked"]),
  tags: z.array(z.string()),
});

const daySchema = z.object({
  dayNumber: z.number(),
  date: z.string(),
  title: z.string(),
  activities: z.array(activitySchema),
  transportNotes: z.string(),
});

const tripResponseSchema = z.object({
  days: z.array(daySchema),
  totalBudget: z.object({
    flights: z.number(),
    accommodation: z.number(),
    transport: z.number(),
    activities: z.number(),
    food: z.number(),
    total: z.number(),
  }),
  packingList: z.array(
    z.object({
      name: z.string(),
      category: z.enum([
        "clothing",
        "footwear",
        "tech",
        "accessories",
        "documents",
      ]),
      requiredFor: z.array(z.string()),
    }),
  ),
  aiExplanation: z.string(),
});

type TripResponse = z.infer<typeof tripResponseSchema>;

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "mock-key",
});

export async function generateTrip(input: TripInput): Promise<Trip> {
  const userPrompt = buildUserPrompt(input);

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: tripResponseSchema,
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      temperature: 0.7,
    });

    return buildTripFromResponse(object, input);
  } catch (error) {
    console.error("AI generation failed, using fallback:", error);
    return generateFallbackTrip(input);
  }
}

export async function* streamTrip(
  input: TripInput,
): AsyncGenerator<
  { type: "day"; day: Day } | { type: "complete"; trip: Trip }
> {
  const userPrompt = buildUserPrompt(input);

  try {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      schema: tripResponseSchema,
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      temperature: 0.7,
    });

    const seenDays = new Set<number>();
    let accumulated: any = {};

    for await (const partial of partialObjectStream) {
      accumulated = partial;

      if (accumulated.days) {
        for (const day of accumulated.days) {
          if (
            day.dayNumber &&
            !seenDays.has(day.dayNumber) &&
            day.activities &&
            day.activities.length > 0
          ) {
            seenDays.add(day.dayNumber);
            yield {
              type: "day",
              day: {
                dayNumber: day.dayNumber,
                date:
                  day.date ||
                  new Date(Date.now() + (day.dayNumber - 1) * 86400000)
                    .toISOString()
                    .split("T")[0],
                title: day.title || `Dag ${day.dayNumber}`,
                activities: day.activities.map((a: any) =>
                  enrichActivity(a, input, day.dayNumber!),
                ),
                transportNotes: day.transportNotes || "",
                weatherForecast: generateMockWeather(
                  new Date(Date.now() + (day.dayNumber - 1) * 86400000)
                    .toISOString()
                    .split("T")[0],
                  input.season,
                ),
              },
            };
          }
        }
      }
    }

    const completeTrip = buildTripFromResponse(
      accumulated as TripResponse,
      input,
    );
    yield { type: "complete", trip: completeTrip };
  } catch (error) {
    console.error("AI stream failed, falling back:", error);
    const fallback = generateFallbackTrip(input);
    for (const day of fallback.days) {
      yield { type: "day", day };
    }
    yield { type: "complete", trip: fallback };
  }
}

function buildTripFromResponse(object: TripResponse, input: TripInput): Trip {
  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    input,
    days: object.days.map((day) => ({
      ...day,
      weatherForecast: generateMockWeather(day.date, input.season),
      activities: day.activities.map((a) =>
        enrichActivity(a, input, day.dayNumber),
      ),
    })),
    totalBudget: object.totalBudget,
    packingList: object.packingList,
    aiExplanation: object.aiExplanation,
  };
}

function enrichActivity(
  activity: any,
  input: TripInput,
  dayNumber: number,
): Activity {
  return {
    ...activity,
    auroraForecast:
      activity.category === "aurora"
        ? {
            kpIndex: Math.floor(Math.random() * 4) + 2,
            cloudCover: 30 + Math.floor(Math.random() * 40),
            probability: "Good" as const,
          }
        : undefined,
  };
}

function buildUserPrompt(input: TripInput): string {
  return `Planlegg en ${input.duration}-dagers reise til Nord-Norge.
Interesser: ${input.interests.join(", ")}
Sesong: ${input.season}
Budsjett: ${input.budget}
Startsted: ${input.startLocation}

Generer en komplett reiserute med aktiviteter, budsjett og pakkeliste.`;
}

function generateMockWeather(date: string, season: string) {
  const temps: Record<
    string,
    { high: number; low: number; condition: string }
  > = {
    winter: { high: -2, low: -8, condition: "Snøbyger, opphold mot kvelden" },
    spring: { high: 4, low: -2, condition: "Lettskyet, perioder med sol" },
    summer: { high: 16, low: 9, condition: "Lettskyet, mildt, god sikt" },
    autumn: { high: 5, low: 0, condition: "Lettskyet, oppklaring mot midnatt" },
  };
  const temperature = temps[season] || temps.autumn;
  return {
    date,
    highTemp: temperature.high + Math.floor(Math.random() * 4),
    lowTemp: temperature.low - Math.floor(Math.random() * 3),
    cloudCover: 30 + Math.floor(Math.random() * 40),
    precipitation: 10 + Math.floor(Math.random() * 40),
    condition: temperature.condition,
    windSpeed: 3 + Math.floor(Math.random() * 8),
  };
}

export async function generateDay(
  input: TripInput,
  dayNumber: number,
  existingDays: Day[],
): Promise<Day> {
  const cityLabel =
    input.startLocation.charAt(0).toUpperCase() + input.startLocation.slice(1);

  return {
    dayNumber,
    date: new Date(Date.now() + (dayNumber - 1) * 86400000)
      .toISOString()
      .split("T")[0],
    title: `Dag ${dayNumber} — Utforsk ${cityLabel}`,
    activities: [
      {
        id: `day_${dayNumber}_1`,
        time: "09:00",
        title: "Frokost",
        description: "Start dagen med en god frokost",
        category: "food",
        location: input.startLocation,
        price: 150,
        currency: "NOK",
        bookingStatus: "recommended",
        tags: ["frokost"],
      },
      {
        id: `day_${dayNumber}_2`,
        time: "11:00",
        title: "Dagens aktivitet",
        description: "Utforsk området på egen hånd",
        category: "outdoor",
        location: input.startLocation,
        price: 0,
        currency: "NOK",
        bookingStatus: "recommended",
        tags: ["utforskning"],
      },
      {
        id: `day_${dayNumber}_3`,
        time: "19:00",
        title: "Middag",
        description: "Lokal restaurant",
        category: "food",
        location: input.startLocation,
        price: 400,
        currency: "NOK",
        bookingStatus: "recommended",
        tags: ["middag"],
      },
    ],
    transportNotes: `Lokal transport i ${cityLabel}`,
    weatherForecast: generateMockWeather(
      new Date(Date.now() + (dayNumber - 1) * 86400000)
        .toISOString()
        .split("T")[0],
      input.season,
    ),
  };
}

function generateFallbackTrip(input: TripInput): Trip {
  const seasonLabels: Record<string, string> = {
    winter: "Vinter",
    spring: "Vår",
    summer: "Sommer",
    autumn: "Høst",
  };

  const days = Array.from({ length: input.duration }, (_, index) => ({
    dayNumber: index + 1,
    date: new Date(Date.now() + index * 86400000).toISOString().split("T")[0],
    title:
      index === input.duration - 1
        ? "Siste dag — hjemreise"
        : `Dag ${index + 1} — Utforskning`,
    activities: [
      {
        id: `fallback_${index}_1`,
        time: "09:00",
        title: index === 0 ? "Ankomst" : "Frokost",
        description:
          index === 0
            ? `Ankomst til ${input.startLocation}`
            : "Start dagen med frokost",
        category: "food" as const,
        location: input.startLocation,
        price: index === 0 ? null : 150,
        currency: "NOK",
        bookingStatus: "recommended" as const,
        tags: ["frokost"],
      },
      {
        id: `fallback_${index}_2`,
        time: "11:00",
        title: index === 0 ? `Utforsk ${input.startLocation}` : "Dagens tur",
        description: `Guidet eller selvstyrt utforskning i ${input.startLocation}`,
        category: "outdoor" as const,
        location: input.startLocation,
        price: 0,
        currency: "NOK",
        bookingStatus: "recommended" as const,
        tags: ["utforskning"],
      },
      {
        id: `fallback_${index}_3`,
        time: "19:00",
        title: "Middag",
        description: "Lokal restaurant",
        category: "food" as const,
        location: input.startLocation,
        price: 400,
        currency: "NOK",
        bookingStatus: "recommended" as const,
        tags: ["middag"],
      },
    ],
    transportNotes:
      index === 0
        ? `Ankomst til ${input.startLocation}`
        : `Lokal transport i ${input.startLocation}`,
    weatherForecast: generateMockWeather(
      new Date(Date.now() + index * 86400000).toISOString().split("T")[0],
      input.season,
    ),
  }));

  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    input,
    days,
    totalBudget: {
      flights:
        input.budget === "premium"
          ? 5000
          : input.budget === "medium"
            ? 3200
            : 2000,
      accommodation:
        input.duration *
        (input.budget === "premium"
          ? 2500
          : input.budget === "medium"
            ? 1300
            : 600),
      transport:
        input.budget === "premium"
          ? 8000
          : input.budget === "medium"
            ? 4800
            : 2500,
      activities:
        input.budget === "premium"
          ? 6000
          : input.budget === "medium"
            ? 3600
            : 1500,
      food:
        input.duration *
        (input.budget === "premium"
          ? 800
          : input.budget === "medium"
            ? 600
            : 350),
      total: 0,
    },
    packingList: [],
    aiExplanation: `En ${input.duration}-dagers tur til ${input.startLocation} i ${seasonLabels[input.season]}-sesongen.`,
  };
}
