import type { HealthResponse } from '@petcircle/api-types';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

const app = createApp({
  port: 3000,
  corsAllowedOrigins: ['http://localhost:5173'],
});

describe('GET /health', () => {
  it('returns ok status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' } satisfies HealthResponse);
  });
});
