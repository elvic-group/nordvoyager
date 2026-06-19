# NordVoyager ✈️

**AI-drevet reiseplanlegger for Nord-Norge**

Planlegg din perfekte reise til Nord-Norge med hjelp av AI. Skreddersydd for sesong, budsjett og interesser.

## ✨ Funksjoner

- **AI-generert reiserute** — Få en komplett reiseplan basert på dine interesser
- **Sesongbevisst** — Aktiviteter tilpasset årstid (nordlys, midnattssol, høstfarger)
- **Budsjettkontroll** — Gjennomsiktige priser i NOK med totaloversikt
- **Pakkliste** — Skreddersydd for arktiske forhold
- **Vær og nordlys** — Prognoser for hver dag
- **Norsk design** — Inspirert av Norwegian Airlines

## 🚀 Kom i gang

```bash
# Installer avhengigheter
npm install

# Sett opp miljøvariabler
cp .env.local.example .env.local
# Rediger .env.local med dine API-nøkler

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build
```

### Påkrevet

- **OpenAI API Key** — For AI-generering av reiseruter
- Sett `OPENAI_API_KEY` i `.env.local`

### Valgfritt

- `OPENWEATHER_API_KEY` — For sanntids værmeldinger
- `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` — For innlogging (Phase 2)

## 🏗️ Prosjektstruktur

```
src/
├── app/             # Sider og API-ruter
├── components/      # UI-komponenter
├── lib/             # Typer, tjenester, AI, verktøy
├── stores/          # Zustand state management
└── hooks/           # Custom React hooks
```

## 🧭 Ruter

| Sti | Beskrivelse |
|---|---|
| `/` | Landingsside |
| `/planlegg` | Planleggingsveiviser (4 steg) |
| `/planlegg/resultater` | Generert reiserute |
| `/mine-reiser` | Lagrede reiser (kommer) |

## 📋 Faser

- **Phase 1 (MVP):** ✅ Planlegging, AI-generering, tidslinje, budsjett, pakkeliste, vær
- **Phase 2:** 🗺️ Kart, innlogging, lagring, deling, PDF
- **Phase 3:** 🌡️ Sanntids vær, flerspråk, bestillingslenker
- **Phase 4:** 🏔️ Værtilpasning, anmeldelser, booking

## 🎨 Design

Inspirert av Norwegian Airlines' designlinje — rent, skandinavisk, funksjonelt.

- Primærfarge: `#E5212D` (Norwegian Red)
- Tekst: `#15273F` (Deep Navy)
- Bakgrunn: `#F8F8F8` (Off-white)
- Kort: `#F0F1F3` (Light Grey)
- Typografi: Inter

## 📄 Lisens

Privat prosjekt — internt bruk.
