import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

describe('API endpoints', () => {
  it('GET / returns 200', async () => {
    const res = await fetch(`${BASE_URL}/`);
    expect(res.status).toBe(200);
  });

  it('GET /planlegg returns 200', async () => {
    const res = await fetch(`${BASE_URL}/planlegg`);
    expect(res.status).toBe(200);
  });

  it('GET /mine-reiser returns 200', async () => {
    const res = await fetch(`${BASE_URL}/mine-reiser`);
    expect(res.status).toBe(200);
  });

  it('POST /api/trip/generate returns trip with days', async () => {
    const res = await fetch(`${BASE_URL}/api/trip/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interests: ['hiking'],
        season: 'summer',
        duration: 3,
        budget: 'low',
        startLocation: 'tromso',
      }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.trip).toBeDefined();
    expect(data.trip.days).toHaveLength(3);
    expect(data.trip.totalBudget).toBeDefined();
    expect(data.trip.packingList.length).toBeGreaterThan(0);
    expect(data.trip.aiExplanation).toBeDefined();
  });

  it('POST /api/trip/generate with invalid input returns 422', async () => {
    const res = await fetch(`${BASE_URL}/api/trip/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interests: [] }),
    });
    expect(res.status).toBe(422);
  });
});
