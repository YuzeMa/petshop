import type { ProductDto, ProductListResponse } from '@petcircle/api-types';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { PRODUCT_CATEGORIES } from '../entities/product-category.js';
import { createModels } from '../models/create-models.js';

const config = {
  port: 3000,
  corsAllowedOrigins: ['http://localhost:5173'],
};

function createTestApp() {
  return createApp(config, createModels());
}

describe('GET /products', () => {
  it('returns the seeded catalog', async () => {
    const app = createTestApp();
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    const body = response.body as ProductListResponse;
    expect(body).toHaveLength(10);

    const categories = new Set(body.map((p) => p.category));
    for (const category of PRODUCT_CATEGORIES) {
      expect(categories.has(category)).toBe(true);
    }

    const sample = body[0]!;
    expect(sample).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
      currency: 'AUD',
      category: expect.any(String),
      description: expect.any(String),
      imageUrls: expect.any(Array),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    } satisfies Partial<ProductDto>);
  });
});
