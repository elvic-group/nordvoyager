import { describe, it, expect } from 'vitest';
import { tripInputSchema } from '@/lib/validators/trip';

describe('tripInputSchema', () => {
  it('accepts valid input', () => {
    const result = tripInputSchema.safeParse({
      interests: ['northern_lights', 'photography'],
      season: 'autumn',
      duration: 5,
      budget: 'medium',
      startLocation: 'tromso',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty interests', () => {
    const result = tripInputSchema.safeParse({
      interests: [],
      season: 'autumn',
      duration: 5,
      budget: 'medium',
      startLocation: 'tromso',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid season', () => {
    const result = tripInputSchema.safeParse({
      interests: ['hiking'],
      season: 'monsoon',
      duration: 5,
      budget: 'medium',
      startLocation: 'tromso',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid budget', () => {
    const result = tripInputSchema.safeParse({
      interests: ['hiking'],
      season: 'summer',
      duration: 5,
      budget: 'ultra',
      startLocation: 'tromso',
    });
    expect(result.success).toBe(false);
  });
});
