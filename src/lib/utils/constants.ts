import { Budget, City, Duration, Interest, Season } from '@/lib/types';

export const APP_NAME = 'NordVoyager';
export const APP_TAGLINE = 'Planlegg din Nord-Norge-reise';
export const APP_DESCRIPTION = 'AI-drevet reiseplanlegger — skreddersydd for sesong, budsjett og interesser';

export const NORWEGIAN_RED = '#E5212D';
export const DEEP_NAVY = '#15273F';
export const OFF_WHITE = '#F8F8F8';
export const LIGHT_GREY = '#F0F1F3';
export const BORDER_COLOR = '#E0E2E5';
export const TEXT_MUTED = '#7A8A9A';
export const TEXT_SECONDARY = '#5A6A7A';

export const INTERESTS: { value: Interest; label: string; emoji: string }[] = [
  { value: 'northern_lights', label: 'Nordlys', emoji: '🌌' },
  { value: 'dog_sledding', label: 'Hundekjøring', emoji: '🐕' },
  { value: 'hiking', label: 'Fjelltur', emoji: '⛰️' },
  { value: 'whale_safari', label: 'Hvalsafari', emoji: '🐋' },
  { value: 'sami_culture', label: 'Samisk kultur', emoji: '🏕️' },
  { value: 'fjord_cruise', label: 'Fjordcruise', emoji: '🚢' },
  { value: 'photography', label: 'Fotografering', emoji: '📷' },
  { value: 'local_food', label: 'Lokal mat', emoji: '🍽️' },
];

export const SEASONS: { value: Season; label: string; description: string }[] = [
  { value: 'winter', label: 'Vinter', description: 'Des–Feb · Nordlys, hundekjøring, begrenset dagslys' },
  { value: 'spring', label: 'Vår', description: 'Mar–Mai · Ski, nordlyshale, lengre dager' },
  { value: 'summer', label: 'Sommer', description: 'Jun–Aug · Midnattssol, fottur, fjordcruise' },
  { value: 'autumn', label: 'Høst', description: 'Sep–Nov · Nordlys starter, høstfarger, moderate priser' },
];

export const DURATIONS: readonly Duration[] = [3, 5, 7, 10];

export const BUDGETS: { value: Budget; label: string; range: string }[] = [
  { value: 'low', label: 'Lav 💵', range: '8 000–12 000 kr' },
  { value: 'medium', label: 'Middels 💵💵', range: '15 000–25 000 kr' },
  { value: 'premium', label: 'Premium 💵💵💵', range: '30 000–50 000 kr' },
];

export const CITIES: { value: City; label: string; region: string }[] = [
  { value: 'tromso', label: 'Tromsø', region: 'Troms' },
  { value: 'bodo', label: 'Bodø', region: 'Nordland' },
  { value: 'alta', label: 'Alta', region: 'Finnmark' },
  { value: 'svalbard', label: 'Svalbard', region: 'Svalbard' },
  { value: 'lofoten', label: 'Lofoten', region: 'Nordland' },
  { value: 'senja', label: 'Senja', region: 'Troms' },
  { value: 'narvik', label: 'Narvik', region: 'Nordland' },
  { value: 'hammerfest', label: 'Hammerfest', region: 'Finnmark' },
];

export const NAV_LINKS = [
  { href: '/mine-reiser', label: 'Mine reiser' },
  { href: '/api/auth/signin', label: 'Logg inn' },
];

export const WIZARD_STEPS = [
  { label: 'Interesser', step: 0 },
  { label: 'Sesong', step: 1 },
  { label: 'Varighet', step: 2 },
  { label: 'Oppsummering', step: 3 },
];
