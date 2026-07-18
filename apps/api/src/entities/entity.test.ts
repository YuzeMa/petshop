import { describe, expect, it } from 'vitest';
import { Cart } from './cart.js';
import { CartItem } from './cart-item.js';
import { GLOBAL_CART_ID } from './constants.js';
import { Product } from './product.js';

const createdAt = new Date('2026-01-01T00:00:00.000Z');
const updatedAt = new Date('2026-01-02T00:00:00.000Z');

describe('entities', () => {
  it('constructs a Product with all fields', () => {
    const product = new Product(
      'prod-001',
      createdAt,
      updatedAt,
      'Dry Food (prod-001)',
      19.99,
      'AUD',
      'dry-food',
      'A tasty meal for pets.',
      ['https://example.com/image.jpg'],
    );

    expect(product.id).toBe('prod-001');
    expect(product.createdAt).toBe(createdAt);
    expect(product.updatedAt).toBe(updatedAt);
    expect(product.name).toBe('Dry Food (prod-001)');
    expect(product.price).toBe(19.99);
    expect(product.currency).toBe('AUD');
    expect(product.category).toBe('dry-food');
    expect(product.description).toBe('A tasty meal for pets.');
    expect(product.imageUrls).toEqual(['https://example.com/image.jpg']);
  });

  it('constructs a Cart with the global cart id', () => {
    const cart = new Cart(GLOBAL_CART_ID, createdAt, updatedAt);

    expect(cart.id).toBe(GLOBAL_CART_ID);
    expect(cart.createdAt).toBe(createdAt);
    expect(cart.updatedAt).toBe(updatedAt);
  });

  it('constructs a CartItem with FK fields', () => {
    const item = new CartItem(
      'item-001',
      createdAt,
      updatedAt,
      GLOBAL_CART_ID,
      'prod-001',
      2,
    );

    expect(item.id).toBe('item-001');
    expect(item.cartId).toBe(GLOBAL_CART_ID);
    expect(item.productId).toBe('prod-001');
    expect(item.quantity).toBe(2);
  });
});
