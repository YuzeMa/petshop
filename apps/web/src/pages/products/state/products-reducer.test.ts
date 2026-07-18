import { describe, expect, it } from 'vitest';
import {
  initialProductsState,
  productsReducer,
} from './products-reducer';

describe('productsReducer', () => {
  it('loads products into success state', () => {
    const products = [
      {
        id: 'p1',
        name: 'Food',
        description: 'Yum',
        price: 10,
        currency: 'AUD',
        imageUrl: null,
      },
    ];

    const next = productsReducer(initialProductsState, {
      type: 'LOAD_SUCCESS',
      products,
    });

    expect(next.list.status).toBe('success');
    expect(next.list.data).toEqual(products);
  });

  it('tracks add-to-cart pending then clears on success', () => {
    const pending = productsReducer(initialProductsState, {
      type: 'ADD_START',
      productId: 'p1',
    });
    expect(pending.mutations.p1).toBe('pending');

    const done = productsReducer(pending, {
      type: 'ADD_SUCCESS',
      productId: 'p1',
    });
    expect(done.mutations).toEqual({});
  });

  it('stores add error on the list channel', () => {
    const next = productsReducer(initialProductsState, {
      type: 'ADD_ERROR',
      productId: 'p1',
      error: 'Unknown product',
    });
    expect(next.mutations.p1).toBe('error');
    expect(next.list.error).toBe('Unknown product');
  });
});
