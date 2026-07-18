import { describe, expect, it } from 'vitest';
import { GLOBAL_CART_ID } from './constants.js';
import { PRODUCT_CATEGORIES } from './product-category.js';
import {
  DEFAULT_PRODUCT_CURRENCY,
  DEFAULT_PRODUCT_IMAGE_URL,
  PRODUCT_DESCRIPTIONS,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MIN,
  createCartItem,
  createProduct,
  seedProducts,
} from './product-factory.js';

describe('createProduct', () => {
  it('generates name from category and id', () => {
    const product = createProduct('dry-food', { id: 'prod-001' }, { randomSeed: 1 });

    expect(product.name).toBe('Dry Food (prod-001)');
    expect(product.category).toBe('dry-food');
  });

  it('uses AUD currency and default image by default', () => {
    const product = createProduct('toys', { id: 'prod-x' }, { randomSeed: 1 });

    expect(product.currency).toBe(DEFAULT_PRODUCT_CURRENCY);
    expect(product.imageUrls).toEqual([DEFAULT_PRODUCT_IMAGE_URL]);
  });

  it('keeps price in range and description from the fixed list', () => {
    const product = createProduct('treats', { id: 'prod-y' }, { randomSeed: 7 });

    expect(product.price).toBeGreaterThanOrEqual(PRODUCT_PRICE_MIN);
    expect(product.price).toBeLessThanOrEqual(PRODUCT_PRICE_MAX);
    expect(PRODUCT_DESCRIPTIONS).toContain(product.description);
  });

  it('is stable for the same seed', () => {
    const a = createProduct('healthcare', { id: 'prod-z' }, { randomSeed: 99 });
    const b = createProduct('healthcare', { id: 'prod-z' }, { randomSeed: 99 });

    expect(a.price).toBe(b.price);
    expect(a.description).toBe(b.description);
  });

  it('applies overrides', () => {
    const product = createProduct(
      'wet-food',
      {
        id: 'custom',
        name: 'Custom Wet',
        price: 12.5,
        description: 'Override desc',
        currency: 'USD',
        imageUrls: ['https://example.com/a.jpg'],
      },
      { randomSeed: 1 },
    );

    expect(product.name).toBe('Custom Wet');
    expect(product.price).toBe(12.5);
    expect(product.description).toBe('Override desc');
    expect(product.currency).toBe('USD');
    expect(product.imageUrls).toEqual(['https://example.com/a.jpg']);
  });
});

describe('createCartItem', () => {
  it('creates a cart line with FK fields', () => {
    const item = createCartItem(GLOBAL_CART_ID, 'prod-001', 3, {
      id: 'item-001',
    });

    expect(item.id).toBe('item-001');
    expect(item.cartId).toBe(GLOBAL_CART_ID);
    expect(item.productId).toBe('prod-001');
    expect(item.quantity).toBe(3);
  });
});

describe('seedProducts', () => {
  it('returns 10 products across all categories with stable ids', () => {
    const products = seedProducts();

    expect(products).toHaveLength(10);
    expect(products.map((p) => p.id)).toEqual([
      'prod-001',
      'prod-002',
      'prod-003',
      'prod-004',
      'prod-005',
      'prod-006',
      'prod-007',
      'prod-008',
      'prod-009',
      'prod-010',
    ]);

    const categories = new Set(products.map((p) => p.category));
    for (const category of PRODUCT_CATEGORIES) {
      expect(categories.has(category)).toBe(true);
    }
  });

  it('uses AUD, default image, and in-range prices', () => {
    for (const product of seedProducts()) {
      expect(product.currency).toBe(DEFAULT_PRODUCT_CURRENCY);
      expect(product.imageUrls).toEqual([DEFAULT_PRODUCT_IMAGE_URL]);
      expect(product.price).toBeGreaterThanOrEqual(PRODUCT_PRICE_MIN);
      expect(product.price).toBeLessThanOrEqual(PRODUCT_PRICE_MAX);
      expect(PRODUCT_DESCRIPTIONS).toContain(product.description);
    }
  });

  it('is deterministic across calls', () => {
    const a = seedProducts();
    const b = seedProducts();

    expect(a.map((p) => ({ id: p.id, price: p.price, description: p.description }))).toEqual(
      b.map((p) => ({ id: p.id, price: p.price, description: p.description })),
    );
  });
});
