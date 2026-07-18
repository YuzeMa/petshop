import type { HelloResponse } from '@petcircle/api-types';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

const app = createApp({
  port: 3000,
  corsAllowedOrigins: ['http://localhost:5173'],
});

describe('GET /hello', () => {
  it('returns hello message', async () => {
    const response = await request(app).get('/hello');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello from PetCircle API',
    } satisfies HelloResponse);
  });
});
