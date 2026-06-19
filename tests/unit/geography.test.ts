import { describe, it, expect } from 'vitest';
import { getCoordinates, getDrivingDistance, isRouteFeasible } from '@/lib/utils/geography';

describe('getCoordinates', () => {
  it('returns coordinates for Tromsø', () => {
    const coords = getCoordinates('tromso');
    expect(coords.lat).toBeCloseTo(69.65, 1);
    expect(coords.lng).toBeCloseTo(18.96, 1);
  });

  it('returns coordinates for Lofoten', () => {
    const coords = getCoordinates('lofoten');
    expect(coords).toBeDefined();
  });
});

describe('getDrivingDistance', () => {
  it('Tromsø to Senja is about 150km', () => {
    const dist = getDrivingDistance('tromso', 'senja');
    expect(dist).toBe(150);
  });

  it('Tromsø to Lofoten is about 420km', () => {
    const dist = getDrivingDistance('tromso', 'lofoten');
    expect(dist).toBe(420);
  });
});

describe('isRouteFeasible', () => {
  it('Tromsø to Senja is feasible in 6 hours', () => {
    expect(isRouteFeasible('tromso', 'senja')).toBe(true);
  });

  it('Tromsø to Svalbard is not feasible (flight needed)', () => {
    expect(isRouteFeasible('tromso', 'svalbard')).toBe(false);
  });
});
