import { z } from 'zod';

const interests = [
  'northern_lights',
  'dog_sledding',
  'hiking',
  'whale_safari',
  'sami_culture',
  'fjord_cruise',
  'photography',
  'local_food',
] as const;

const cities = [
  'tromso',
  'bodo',
  'alta',
  'svalbard',
  'lofoten',
  'senja',
  'narvik',
  'hammerfest',
] as const;

export const tripInputSchema = z.object({
  interests: z.array(z.enum(interests)).min(1, 'Velg minst én interesse').max(5, 'Maks 5 interesser'),
  season: z.enum(['winter', 'spring', 'summer', 'autumn']),
  duration: z.union([z.literal(3), z.literal(5), z.literal(7), z.literal(10)]),
  budget: z.enum(['low', 'medium', 'premium']),
  startLocation: z.enum(cities),
});
