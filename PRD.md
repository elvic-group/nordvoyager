# PRD — NordVoyager: AI Travel Planner for Northern Norway

**Status:** Draft · v1.0  
**Author:** AI Agent  
**Date:** 2026-06-19  

---

## 1. Executive Summary

NordVoyager is a domain-specific AI travel planner webapp for **Northern Norway** (Nord-Norge). Unlike generic trip planners, it understands the unique constraints and opportunities of Arctic travel: Northern Lights seasonality, midnight sun, winter road conditions, ferry schedules, Sami cultural events, and weather-dependent activity planning. The app uses a conversational AI agent to generate multi-day itineraries that are **season-aware, budget-conscious, and logistically sound**.

The UI is inspired by **Norwegian Airlines' booking experience** — clean, Scandinavian, minimal, trust-oriented, with red (#E5212D) as the primary CTA colour and deep navy (#15273F) for text.

---

## 2. Problem Statement

Planning a trip to Northern Norway is fragmented and high-risk for travellers:

- **Seasonal complexity:** Activities available in summer (midnight sun hikes, fjord cruises) differ completely from winter (Northern Lights, dog sledding, ice hotels). Booking the wrong season means disappointment.
- **Logistical friction:** Ferry schedules, winter tyre requirements, limited accommodation, sparse public transport — these constraints are not obvious to an outsider.
- **Weather dependency:** Aurora forecasts, road closures, temperature swings — a static itinerary fails when conditions change.
- **No specialised tool:** Generic trip planners (Google Trips, TripIt) ignore Arctic-specific variables. Local tourism sites are scattered across dozens of municipality pages.
- **Budget ambiguity:** Arctic travel is expensive. First-time visitors have no baseline for realistic costs (flights to Tromsø, car hire with winter tyres, Northern Lights tours).

NordVoyager solves this by embedding **Arctic travel expertise** directly into an AI planning agent.

---

## 3. Target Audience / Personas

### Persona A: The Experience Seeker (Primary)
- **Age:** 28–45  
- **Origin:** Europe, North America, Asia  
- **Goal:** Bucket-list trip — Northern Lights, dog sledding, Lofoten photography  
- **Pain points:** Overwhelmed by options, unsure about timing, worried about missing key experiences  
- **Budget:** Mid-range to premium (willing to pay for curated experiences)

### Persona B: The Independent Adventurer (Secondary)
- **Age:** 22–35  
- **Origin:** Europe  
- **Goal:** Self-guided road trip — hiking, camping, ferry hopping  
- **Pain points:** Needs practical logistics (ferry times, fuel stops, winter tyre rules), wants budget optimisation  
- **Budget:** Budget to mid-range

### Persona C: The Family Planner (Tertiary)
- **Age:** 35–55  
- **Origin:** Europe  
- **Goal:** Stress-free family holiday with diverse activities  
- **Pain points:** Needs child-friendly activities, safe transport, reliable accommodation, clear cost breakdown  
- **Budget:** Mid-range

---

## 4. User Stories

### Onboarding & Trip Creation
| ID | Story | Priority |
|---|---|---|
| US-01 | As a user, I want to specify my **interests** (Northern Lights, dog sledding, hiking, whale safari, Sami culture, fjord cruise, photography, local food) so the AI can tailor suggestions. | P0 |
| US-02 | As a user, I want to select a **season** (winter, spring, summer, autumn) so the planner filters available activities correctly. | P0 |
| US-03 | As a user, I want to choose a **trip duration** (3, 5, 7, 10+ days) so the itinerary fits my schedule. | P0 |
| US-04 | As a user, I want to set a **budget level** (low, medium, premium) so the plan respects my spending range. | P0 |
| US-05 | As a user, I want to pick a **starting location** (Tromsø, Bodø, Alta, Svalbard, or custom) so routes are grounded in reality. | P0 |
| US-06 | As a user, I want an AI agent to **recommend and explain** its choices during planning. | P0 |
| US-07 | As a user, I want to see a **step indicator** showing my progress through the onboarding flow. | P1 |
| US-08 | As a user, I want a **day-by-day timeline** with activities, times, and locations for my trip. | P0 |
| US-09 | As a user, I want to see **transport details** within each day. | P0 |
| US-10 | As a user, I want to click a day tab to **switch between days** in the itinerary. | P0 |
| US-11 | As a user, I want to see **pricing per activity** and a **total budget breakdown**. | P0 |
| US-12 | As a user, I want to see a **packing list** generated for my specific season and activities. | P1 |
| US-13 | As a user, I want to see a **weather forecast** widget for each day. | P1 |
| US-14 | As a user, I want an **aurora forecast** (KP-index, cloud cover) shown for relevant activities. | P1 |
| US-15 | As a user, I want to **regenerate** the entire itinerary. | P1 |
| US-16 | As a user, I want to **export my itinerary** as PDF. | P2 |
| US-17 | As a user, I want to see my route plotted on an **interactive map**. | P1 |
| US-18 | As a user, I want to **save trips** to my account and return later. | P2 |
| US-19 | As a user, I want to **share a trip** via a unique link. | P2 |
| US-20 | As a user, I want to **log in** to access my saved trips. | P2 |

---

## 5. Functional Requirements

### FR-01: AI Trip Generation Engine
- Must accept structured input: `{ interests, season, duration, budget, startLocation }`
- Must return a structured itinerary with `Day[]`, budget breakdown, packing list, AI explanation
- Must be **season-aware**: winter plans exclude summer-only activities and vice versa
- Must factor **geographic routing** — no impossible same-day jumps

### FR-02: Budget Calculator
- Must break down costs into: flights, accommodation, transport, activities, food
- Must show line-item estimates and a prominent red total

### FR-03: Weather & Aurora Integration
- Must display per-day weather: high/low temp, cloud cover, precipitation
- Must display KP-index and cloud cover for aurora-related activities

### FR-04: Packing List Generator
- Must generate season-specific and activity-specific packing items

### FR-05: Saved Trips (Auth — Phase 2)
- Support Google OAuth; persist trips to database; list in "Mine reiser"

---

## 6. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Page load (initial) | < 2s desktop, < 3s mobile |
| NFR-02 | Itinerary generation | < 10s with skeleton |
| NFR-03 | Core Web Vitals | LCP ≤ 2.5s, CLS ≤ 0.1 |
| NFR-04 | Accessibility | WCAG 2.1 AA |
| NFR-05 | Mobile support | Down to 375px |
| NFR-06 | API reliability | 99.5% uptime |

---

## 7. UX / UI Requirements

- **Colors:** Red `#E5212D` (CTA), Navy `#15273F` (text), Off-white `#F8F8F8` (bg), Light grey `#F0F1F3` (cards)
- **Border radius:** 4px (sharp Scandinavian feel)
- **Typography:** Inter (Google Fonts)
- **Layout:** Max 1200px, two-panel (2/3 timeline + 1/3 sticky sidebar)
- **Onboarding:** 4-step wizard (Interesser → Sesong → Varighet → Oppsummering)
- **Timeline:** Vertical with coloured dots (navy=transport, green=outdoor, amber=food, purple=aurora)

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Trip completion rate | > 80% |
| Avg session duration | > 4 min |
| Saved trip rate | > 15% |
| User satisfaction | > 4.2/5 |

---

## 9. Scope & Phasing

- **Phase 1 (MVP):** Onboarding, AI generation, timeline view, budget, packing, weather/aurora, day switching, regenerate, responsive design
- **Phase 2:** Interactive map, auth, save/restore trips, share link, PDF export
- **Phase 3:** Real weather/aurora APIs, single-day regenerate, multi-language, booking links
- **Phase 4:** Live weather adaptation, community reviews, accommodation/transport booking, offline mode

---

## 10. Risk Register

| Risk | Mitigation |
|---|---|
| AI hallucinates routes | Geographic constraints in prompt; post-generation validation |
| Slow generation | Streaming; skeleton loading; fallback template |
| Weather API failures | Graceful degradation with cached climatology |
| Mobile layout cramped | Stack panels vertically; collapsible sidebar |
