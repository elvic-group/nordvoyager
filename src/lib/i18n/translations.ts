export type Locale = "nb" | "en";

type TranslationMap = Record<string, Record<Locale, string>>;

export const translations: TranslationMap = {
  "app.name": { nb: "NordVoyager", en: "NordVoyager" },
  "app.tagline": {
    nb: "Planlegg din Nord-Norge-reise",
    en: "Plan your Northern Norway trip",
  },
  "app.description": {
    nb: "AI-drevet reiseplanlegger — skreddersydd for sesong, budsjett og interesser",
    en: "AI-powered travel planner — tailored for season, budget and interests",
  },
  "nav.mine-reiser": { nb: "Mine reiser", en: "My Trips" },
  "nav.logg-inn": { nb: "Logg inn", en: "Sign in" },
  "nav.logg-ut": { nb: "Logg ut", en: "Sign out" },
  "nav.ny-reise": { nb: "Ny reise", en: "New Trip" },
  "onboarding.interesser": { nb: "Interesser", en: "Interests" },
  "onboarding.sesong": { nb: "Sesong", en: "Season" },
  "onboarding.varighet": { nb: "Varighet", en: "Duration" },
  "onboarding.detaljer": { nb: "Detaljer", en: "Details" },
  "onboarding.oppsummering": { nb: "Oppsummering", en: "Summary" },
  "onboarding.neste": { nb: "Neste →", en: "Next →" },
  "onboarding.tilbake": { nb: "Tilbake", en: "Back" },
  "onboarding.generer": { nb: "Generer reiseplan", en: "Generate Trip" },
  "onboarding.velg-interesser": {
    nb: "Hva vil du oppleve?",
    en: "What do you want to experience?",
  },
  "onboarding.velg-interesser-desc": {
    nb: "Velg interesser for å skreddersy reiseruten. Maks 5 valg.",
    en: "Select interests to tailor the itinerary. Max 5 choices.",
  },
  "onboarding.velg-sesong": {
    nb: "Når vil du reise?",
    en: "When do you want to travel?",
  },
  "onboarding.velg-varighet": {
    nb: "Hvor lenge vil du reise?",
    en: "How long do you want to travel?",
  },
  "onboarding.velg-budsjett": {
    nb: "Hva er budsjettet?",
    en: "What is your budget?",
  },
  "onboarding.velg-started": {
    nb: "Hvor starter reisen?",
    en: "Where does the trip start?",
  },
  "onboarding.oppsummering-tittel": { nb: "Oppsummering", en: "Summary" },
  "onboarding.oppsummering-desc": {
    nb: "Se over valgene dine før vi genererer reiseplanen.",
    en: "Review your choices before we generate the itinerary.",
  },
  "onboarding.minst-en": {
    nb: "Velg minst én interesse for å fortsette",
    en: "Select at least one interest to continue",
  },
  "itinerary.dag": { nb: "Dag", en: "Day" },
  "itinerary.aktiviteter": { nb: "aktiviteter", en: "activities" },
  "itinerary.vaermelding": { nb: "Værmelding", en: "Weather Forecast" },
  "itinerary.nordlys": { nb: "Nordlysjakt", en: "Northern Lights Chase" },
  "itinerary.generer-pa-nytt": { nb: "↻ Generer på nytt", en: "↻ Regenerate" },
  "itinerary.regenerer-dag": {
    nb: "Regenerer denne dagen",
    en: "Regenerate this day",
  },
  "sidebar.reiseoversikt": { nb: "Reiseoversikt", en: "Trip Overview" },
  "sidebar.budsjett": { nb: "Budsjett", en: "Budget" },
  "sidebar.pakkliste": { nb: "Pakkliste", en: "Packing List" },
  "sidebar.handlinger": { nb: "Handlinger", en: "Actions" },
  "sidebar.eksporter-pdf": { nb: "📤 Eksporter PDF", en: "📤 Export PDF" },
  "sidebar.del-lenke": { nb: "🔗 Del lenke", en: "🔗 Share Link" },
  "sidebar.kart": { nb: "Kart vises her", en: "Map shown here" },
  "sidebar.stopp": { nb: "stopp på reisen", en: "stops on the route" },
  "budsjett.fly": { nb: "Fly", en: "Flights" },
  "budsjett.overnatting": { nb: "Overnatting", en: "Accommodation" },
  "budsjett.transport": { nb: "Leiebil + drivstoff", en: "Car rental + fuel" },
  "budsjett.aktiviteter": { nb: "Aktiviteter", en: "Activities" },
  "budsjett.mat": { nb: "Mat", en: "Food" },
  "budsjett.totalt": { nb: "Totalt", en: "Total" },
  "trips.mine-reiser": { nb: "Mine reiser", en: "My Trips" },
  "trips.dine-reiser": {
    nb: "Dine lagrede reiseplaner",
    en: "Your saved trip plans",
  },
  "trips.ny-reise": { nb: "Ny reise", en: "New Trip" },
  "trips.ingen": { nb: "Ingen reiser enda", en: "No trips yet" },
  "trips.ingen-desc": {
    nb: "Start med å planlegge din første reise til Nord-Norge.",
    en: "Start planning your first trip to Northern Norway.",
  },
  "trips.logg-inn-tittel": {
    nb: "Logg inn for å se dine reiser",
    en: "Sign in to see your trips",
  },
  "trips.logg-inn-desc": {
    nb: "Du må være logget inn for å lagre og se reiseplanene dine.",
    en: "You need to be signed in to save and view your trip plans.",
  },
  "trips.slett": { nb: "Slett", en: "Delete" },
  "trips.dager": { nb: "dager", en: "days" },
  "landing.planlegg": { nb: "Planlegg din reise →", en: "Plan your trip →" },
  "landing.start": { nb: "Start planleggingen", en: "Start planning" },
  "landing.populaere": {
    nb: "Populære destinasjoner",
    en: "Popular destinations",
  },
  "landing.hvorfor": { nb: "Hvorfor NordVoyager?", en: "Why NordVoyager?" },
  "landing.opplevelser": {
    nb: "Opplevelser vi kan planlegge",
    en: "Experiences we can plan",
  },
  "landing.klar": {
    nb: "Klar for ditt neste arktiske eventyr?",
    en: "Ready for your next Arctic adventure?",
  },
  "weather.hoy": { nb: "Høy", en: "High" },
  "weather.lav": { nb: "Lav", en: "Low" },
  "weather.skydekke": { nb: "Skydekke", en: "Cloud cover" },
  "weather.nedbor": { nb: "Nedbør", en: "Precipitation" },
  "weather.vind": { nb: "Vind", en: "Wind" },
  "footer.copyright": {
    nb: "AI-drevet reiseplanlegger for Nord-Norge",
    en: "AI-powered travel planner for Northern Norway",
  },
  "ai.anbefaler": { nb: "Jeg anbefaler", en: "I recommend" },
  "ai.dager": { nb: "dager i", en: "days in" },
  "ai.klar": {
    nb: "Klar til å generere din personlige reiseplan?",
    en: "Ready to generate your personal itinerary?",
  },
  "ai.genererer": {
    nb: "Genererer din reiseplan...",
    en: "Generating your itinerary...",
  },
  "ai.genererer-desc": {
    nb: "AI-en jobber med å skreddersy reisen etter dine ønsker.",
    en: "The AI is tailoring the trip to your preferences.",
  },
  "generic.loading": { nb: "Laster innhold", en: "Loading content" },
  "generic.error": { nb: "Noe gikk galt", en: "Something went wrong" },
  "generic.prov-igjen": { nb: "Prøv igjen", en: "Try again" },
  "generic.offline": { nb: "Ingen tilkobling", en: "No connection" },
  "generic.offline-desc": {
    nb: "Du er offline. Dine lagrede reiseplaner er fortsatt tilgjengelige.",
    en: "You are offline. Your saved trip plans are still available.",
  },
  "resultater.ingen-tittel": {
    nb: "Ingen reiseplan funnet",
    en: "No itinerary found",
  },
  "resultater.ingen-desc": {
    nb: "Du må først generere en reiseplan. Start med å velge dine preferanser.",
    en: "You need to generate an itinerary first. Start by selecting your preferences.",
  },
  "resultater.planlegg": { nb: "Planlegg reise", en: "Plan trip" },
  "resultater.genererer-tittel": {
    nb: "Genererer din reiseplan...",
    en: "Generating your itinerary...",
  },
  "resultater.genererer-desc": {
    nb: "AI-en jobber med å skreddersy reisen etter dine ønsker.",
    en: "The AI is tailoring the trip to your preferences.",
  },
  "resultater.dager-generert": { nb: "dager generert", en: "days generated" },
  "footer.tagline": {
    nb: "🌍 Planlagt med ❤️ for arktiske eventyr",
    en: "🌍 Planned with ❤️ for Arctic adventures",
  },
  "sidebar.lagre": { nb: "💾 Lagre reise", en: "💾 Save trip" },
  "sidebar.kopiert": { nb: "✅ Kopiert!", en: "✅ Copied!" },
  "sidebar.lagret": { nb: "✅ Lagret!", en: "✅ Saved!" },
  "sidebar.lagre-feilet": {
    nb: "❌ Kunne ikke lagre",
    en: "❌ Could not save",
  },
};

export function t(key: string, locale: Locale): string {
  return translations[key]?.[locale] || key;
}
