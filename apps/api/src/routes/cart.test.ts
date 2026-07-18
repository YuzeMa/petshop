import type { ApiError, CartResponse, ProductListResponse } from '@petcircle/api-types';
import type { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { createModels } from '../models/create-models.js';

const config = {
  port: 3000,
  corsAllowedOrigins: ['http://localhost:5173'],
};

describe('Cart APIs', () => {
  let app: Express;
  let products: ProductListResponse;

  beforeEach(async () => {
    app = createApp(config, createModels());
    const list = await request(app).get('/products');
    products = list.body as ProductListResponse;
  });

  it('returns an empty cart with cartId 1', async () => {
    const response = await request(app).get('/cart');

    expect(response.status).toBe(200);
    const body = response.body as CartResponse;
    expect(body).toEqual({
      cartId: '1',
      items: [],
      grandTotal: 0,
    } satisfies CartResponse);
  });

  it('adds one product and returns totals', async () => {
    const product = products[0]!;
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });

    expect(response.status).toBe(200);
    const body = response.body as CartResponse;
    expect(body.cartId).toBe('1');
    expect(body.items).toHaveLength(1);
    expect(body.items[0]).toMatchObject({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      currency: product.currency,
      quantity: 1,
      lineSubtotal: product.price,
    });
    expect(body.grandTotal).toBe(product.price);
  });

  it('increments quantity when adding the same product again', async () => {
    const product = products[0]!;

    await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 2 });

    const body = response.body as CartResponse;
    expect(body.items).toHaveLength(1);
    expect(body.items[0]!.quantity).toBe(3);
    expect(body.grandTotal).toBe(product.price * 3);
  });

  it('supports two distinct products and sums grand total', async () => {
    const a = products[0]!;
    const b = products[1]!;

    await request(app)
      .post('/cart/items')
      .send({ productId: a.id, quantity: 1 });
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: b.id, quantity: 2 });

    const body = response.body as CartResponse;
    expect(body.items).toHaveLength(2);
    expect(body.grandTotal).toBe(a.price + b.price * 2);
  });

  it('adds quantity 3 in one request', async () => {
    const product = products[0]!;
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 3 });

    const body = response.body as CartResponse;
    expect(body.items[0]!.quantity).toBe(3);
    expect(body.items[0]!.lineSubtotal).toBe(product.price * 3);
  });

  it('removes one of two lines and recalculates total', async () => {
    const a = products[0]!;
    const b = products[1]!;

    await request(app)
      .post('/cart/items')
      .send({ productId: a.id, quantity: 1 });
    await request(app)
      .post('/cart/items')
      .send({ productId: b.id, quantity: 1 });

    const response = await request(app).delete(`/cart/items/${a.id}`);
    const body = response.body as CartResponse;

    expect(body.items).toHaveLength(1);
    expect(body.items[0]!.productId).toBe(b.id);
    expect(body.grandTotal).toBe(b.price);
  });

  it('removes the last line leaving an empty cart', async () => {
    const product = products[0]!;
    await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });

    const response = await request(app).delete(`/cart/items/${product.id}`);
    expect(response.body).toEqual({
      cartId: '1',
      items: [],
      grandTotal: 0,
    } satisfies CartResponse);
  });

  it('read-your-writes: GET after POST matches', async () => {
    const product = products[0]!;
    const posted = await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 2 });
    const got = await request(app).get('/cart');

    expect(got.body).toEqual(posted.body);
  });

  it('full flow POST → GET → DELETE → GET stays consistent', async () => {
    const product = products[0]!;

    await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });
    const afterAdd = await request(app).get('/cart');
    expect((afterAdd.body as CartResponse).items).toHaveLength(1);

    await request(app).delete(`/cart/items/${product.id}`);
    const afterRemove = await request(app).get('/cart');
    expect(afterRemove.body).toEqual({
      cartId: '1',
      items: [],
      grandTotal: 0,
    } satisfies CartResponse);
  });

  it('rejects unknown product id with 404 ApiError', async () => {
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: 'missing-product', quantity: 1 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: {
        code: 'NOT_FOUND',
        message: expect.stringContaining('missing-product'),
      },
    } satisfies ApiError);
  });

  it('rejects non-positive and non-integer quantities with 400', async () => {
    const product = products[0]!;

    for (const quantity of [0, -1, 1.5]) {
      const response = await request(app)
        .post('/cart/items')
        .send({ productId: product.id, quantity });

      expect(response.status).toBe(400);
      expect((response.body as ApiError).error.code).toBe('VALIDATION_ERROR');
    }
  });

  it('rejects malformed or incomplete bodies with 400', async () => {
    const cases = [
      {},
      { productId: 'prod-001' },
      { quantity: 1 },
      { productId: '', quantity: 1 },
      { productId: 'prod-001', quantity: '2' },
      null,
    ];

    for (const body of cases) {
      const response = await request(app).post('/cart/items').send(body);
      expect(response.status).toBe(400);
      expect((response.body as ApiError).error.code).toBe('VALIDATION_ERROR');
    }
  });

  it('rejects deleting a product that is not in the cart with 404', async () => {
    const product = products[0]!;
    const response = await request(app).delete(`/cart/items/${product.id}`);

    expect(response.status).toBe(404);
    expect((response.body as ApiError).error.code).toBe('NOT_FOUND');
  });

  it('works without the client sending a cart id', async () => {
    const product = products[0]!;
    const response = await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });

    expect(response.status).toBe(200);
    expect((response.body as CartResponse).cartId).toBe('1');
  });

  it('chained flow: get → add A → add B → delete A → set qty B → patch missing A', async () => {
    const productA = products[0]!;
    const productB = products[1]!;

    const empty = await request(app).get('/cart');
    expect(empty.status).toBe(200);
    expect(empty.body).toEqual({
      cartId: '1',
      items: [],
      grandTotal: 0,
    } satisfies CartResponse);

    const afterA = await request(app)
      .post('/cart/items')
      .send({ productId: productA.id, quantity: 1 });
    expect(afterA.status).toBe(200);
    expect((afterA.body as CartResponse).items).toHaveLength(1);
    expect((afterA.body as CartResponse).items[0]!.productId).toBe(productA.id);
    expect((afterA.body as CartResponse).grandTotal).toBe(productA.price);

    const afterB = await request(app)
      .post('/cart/items')
      .send({ productId: productB.id, quantity: 2 });
    expect(afterB.status).toBe(200);
    const twoLines = afterB.body as CartResponse;
    expect(twoLines.items).toHaveLength(2);
    expect(twoLines.grandTotal).toBe(productA.price + productB.price * 2);

    const afterDeleteA = await request(app).delete(
      `/cart/items/${productA.id}`,
    );
    expect(afterDeleteA.status).toBe(200);
    const onlyB = afterDeleteA.body as CartResponse;
    expect(onlyB.items).toHaveLength(1);
    expect(onlyB.items[0]!.productId).toBe(productB.id);
    expect(onlyB.grandTotal).toBe(productB.price * 2);

    const afterPatch = await request(app)
      .patch(`/cart/items/${productB.id}`)
      .send({ quantity: 5 });
    expect(afterPatch.status).toBe(200);
    const patched = afterPatch.body as CartResponse;
    expect(patched.items).toHaveLength(1);
    expect(patched.items[0]!.quantity).toBe(5);
    expect(patched.items[0]!.lineSubtotal).toBe(productB.price * 5);
    expect(patched.grandTotal).toBe(productB.price * 5);

    const missingLine = await request(app)
      .patch(`/cart/items/${productA.id}`)
      .send({ quantity: 1 });
    expect(missingLine.status).toBe(404);
    expect((missingLine.body as ApiError).error.code).toBe('NOT_FOUND');
  });

  it('rejects PATCH with bad or missing quantity', async () => {
    const product = products[0]!;
    await request(app)
      .post('/cart/items')
      .send({ productId: product.id, quantity: 1 });

    for (const quantity of [0, -1, 1.5]) {
      const response = await request(app)
        .patch(`/cart/items/${product.id}`)
        .send({ quantity });
      expect(response.status).toBe(400);
      expect((response.body as ApiError).error.code).toBe('VALIDATION_ERROR');
    }

    const missingBody = await request(app)
      .patch(`/cart/items/${product.id}`)
      .send({});
    expect(missingBody.status).toBe(400);
    expect((missingBody.body as ApiError).error.code).toBe('VALIDATION_ERROR');
  });
});
