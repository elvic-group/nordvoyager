# TDD — NordVoyager: Technical Design Document

**Status:** Draft · v1.0  
**Author:** AI Agent  
**Date:** 2026-06-19  

---

## 1. Architecture Overview

```
Client (Next.js) → Next.js API Routes (BFF) → Services → External APIs (LLM, Weather, Aurora)
                                                    ↘ Database (SQLite/Turso)
```

**Pattern:** BFF (Backend-for-Frontend) via Next.js API routes. Client never talks directly to external services.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Validation | Zod |
| AI/LLM | OpenAI via Vercel AI SDK |
| Database | SQLite via Drizzle ORM (MVP); Turso for edge |
| Auth | NextAuth.js v5 (Phase 2) |
| Hosting | Vercel |

---

## 3. Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── layout.tsx         # Root layout (nav, fonts, providers)
│   ├── page.tsx           # Landing page
│   ├── planlegg/          # Onboarding wizard
│   │   └── resultater/    # Itinerary view
│   ├── mine-reiser/       # Saved trips
│   └── api/               # BFF API routes
│       ├── trip/generate/ # POST - AI trip generation
│       ├── trip/[id]/     # GET/DELETE - CRUD
│       ├── weather/       # GET - Weather proxy
│       ├── aurora/        # GET - Aurora proxy
│       └── auth/          # NextAuth handlers (Phase 2)
├── components/
│   ├── ui/                # Primitives (Button, Tag, Badge, etc.)
│   ├── layout/            # Navbar, Footer, Container
│   ├── onboarding/        # Wizard components
│   ├── itinerary/         # Timeline, DayTabs, Weather, Aurora
│   ├── sidebar/           # TripOverview, Map, Budget, Packing
│   └── shared/            # ErrorBoundary, EmptyState, Skeleton
├── lib/
│   ├── ai/                # Prompt templates + generator
│   ├── services/          # trip-service, weather, aurora, budget, packing
│   ├── db/                # Drizzle schema
│   ├── types/             # TypeScript types
│   ├── utils/             # Constants, formatters, geography
│   └── validators/        # Zod schemas
├── stores/                # Zustand stores (trip-store, ui-store)
└── hooks/                 # useTripGeneration, useWeather, useAurora
```

---

## 4. Key Data Models

```typescript
interface TripInput {
  interests: Interest[];
  season: Season;
  duration: 3 | 5 | 7 | 10;
  budget: 'low' | 'medium' | 'premium';
  startLocation: City;
}

interface Trip {
  id: string;
  input: TripInput;
  days: Day[];
  totalBudget: BudgetBreakdown;
  packingList: PackingItem[];
  aiExplanation: string;
}

interface Day {
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  weatherForecast?: WeatherForecast;
  transportNotes?: string;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  category: ActivityCategory;
  location: string;
  price: number | null;
  bookingStatus: 'not_booked' | 'recommended' | 'booked';
  auroraForecast?: AuroraForecast;
}
```

---

## 5. API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /api/trip/generate | Generate trip from user input |
| GET | /api/trip/[id] | Retrieve saved trip |
| DELETE | /api/trip/[id] | Delete saved trip |
| GET | /api/weather?lat=&lon= | Weather forecast proxy |
| GET | /api/aurora?lat=&lon= | Aurora forecast proxy |

---

## 6. AI Integration

- **Provider:** OpenAI GPT-4o-mini via Vercel AI SDK (`generateObject`)
- **System prompt:** Arctic travel expertise, geographic constraints, budget guidance
- **Validation:** Zod schema post-generation; fallback template on failure
- **Safety:** Server-side prompt only; user input sanitised

---

## 7. State Management (Zustand)

Two stores:
- **trip-store:** onboarding step, input, generated trip, loading/error state, active day
- **ui-store:** sidebar open/close, active section

---

## 8. Design Tokens

```css
/* Norwegian Airlines palette */
norwegian-red: #E5212D
deep-navy: #15273F
off-white: #F8F8F8
light-grey: #F0F1F3
border: #E0E2E5
text-muted: #7A8A9A
text-secondary: #5A6A7A
```

---

## 9. Build Output

- Static pages: `/`, `/mine-reiser`, `/planlegg`, `/planlegg/resultater`
- Dynamic routes: `/api/aurora`, `/api/weather`, `/api/trip/[id]`, `/api/trip/generate`, `/api/auth/[...nextauth]`
- Server-rendered on demand
- Zero TypeScript errors, zero lint errors

---

## 10. Deployment

- **Host:** Vercel
- **CI:** GitHub Actions (lint → type-check → test → build → deploy)
- **Database:** Turso (SQLite edge) for MVP, Neon (PostgreSQL) for scale
- **Monitoring:** Vercel Analytics + Sentry
