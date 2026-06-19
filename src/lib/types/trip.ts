export type Interest =
  | 'northern_lights'
  | 'dog_sledding'
  | 'hiking'
  | 'whale_safari'
  | 'sami_culture'
  | 'fjord_cruise'
  | 'photography'
  | 'local_food';

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export type Budget = 'low' | 'medium' | 'premium';

export type Duration = 3 | 5 | 7 | 10;

export type City =
  | 'tromso'
  | 'bodo'
  | 'alta'
  | 'svalbard'
  | 'lofoten'
  | 'senja'
  | 'narvik'
  | 'hammerfest';

export interface TripInput {
  interests: Interest[];
  season: Season;
  duration: Duration;
  budget: Budget;
  startLocation: City;
}

export interface Trip {
  id: string;
  createdAt: string;
  input: TripInput;
  days: Day[];
  totalBudget: BudgetBreakdown;
  packingList: PackingItem[];
  aiExplanation: string;
}

export interface Day {
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  weatherForecast?: WeatherForecast;
  transportNotes?: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  category: ActivityCategory;
  location: string;
  price: number | null;
  currency: string;
  bookingStatus: 'not_booked' | 'recommended' | 'booked';
  tags: string[];
  auroraForecast?: AuroraForecast;
}

export type ActivityCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'outdoor'
  | 'culture'
  | 'aurora'
  | 'photography'
  | 'other';

export interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  transport: number;
  activities: number;
  food: number;
  total: number;
}

export interface PackingItem {
  name: string;
  category: 'clothing' | 'footwear' | 'tech' | 'accessories' | 'documents';
  requiredFor: string[];
}

export interface WeatherForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  cloudCover: number;
  precipitation: number;
  condition: string;
  windSpeed?: number;
}

export interface AuroraForecast {
  kpIndex: number;
  cloudCover: number;
  probability: 'Poor' | 'Fair' | 'Good' | 'Excellent';
}
