import { describe, expect, it } from 'vitest';
import {
  cartReducer,
  hasPendingMutations,
  initialCartState,
} from './cart-reducer';

const sampleCart = {
  cartId: '1',
  items: [
    {
      productId: 'prod-001',
      name: 'Food',
      quantity: 2,
      unitPrice: 10,
      lineSubtotal: 20,
      currency: 'AUD',
      imageUrl: null,
    },
  ],
  grandTotal: 20,
  itemCount: 2,
  currency: 'AUD',
};

describe('cartReducer', () => {
  it('loads cart into success state', () => {
    const next = cartReducer(initialCartState, {
      type: 'LOAD_SUCCESS',
      cart: sampleCart,
    });
    expect(next.list.status).toBe('success');
    expect(next.list.data?.grandTotal).toBe(20);
  });

  it('marks mutation pending and replaces cart on success', () => {
    const loaded = cartReducer(initialCartState, {
      type: 'LOAD_SUCCESS',
      cart: sampleCart,
    });
    const pending = cartReducer(loaded, {
      type: 'MUTATION_START',
      productId: 'prod-001',
    });
    expect(hasPendingMutations(pending)).toBe(true);

    const updated = {
      ...sampleCart,
      items: [],
      grandTotal: 0,
      itemCount: 0,
    };
    const done = cartReducer(pending, {
      type: 'MUTATION_SUCCESS',
      productId: 'prod-001',
      cart: updated,
    });
    expect(hasPendingMutations(done)).toBe(false);
    expect(done.list.data?.grandTotal).toBe(0);
  });

  it('stores mutation error on the list channel', () => {
    const loaded = cartReducer(initialCartState, {
      type: 'LOAD_SUCCESS',
      cart: sampleCart,
    });
    const next = cartReducer(loaded, {
      type: 'MUTATION_ERROR',
      productId: 'prod-001',
      error: 'Quantity must be a positive integer',
    });
    expect(next.mutations['prod-001']).toBe('error');
    expect(next.list.error).toBe('Quantity must be a positive integer');
  });
});
