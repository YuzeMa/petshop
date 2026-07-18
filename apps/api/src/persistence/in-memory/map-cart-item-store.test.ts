import { describe, expect, it } from 'vitest';
import { GLOBAL_CART_ID } from '../../entities/constants.js';
import { createCartItem } from '../../entities/product-factory.js';
import { MapCartItemStore } from './map-cart-item-store.js';

describe('MapCartItemStore', () => {
  it('saves, finds by cart, finds by cart+product, and deletes', () => {
    const store = new MapCartItemStore();
    const item = createCartItem(GLOBAL_CART_ID, 'prod-001', 2, {
      id: 'item-001',
    });

    store.save(item);

    expect(store.findByCartId(GLOBAL_CART_ID)).toEqual([item]);
    expect(
      store.findByCartIdAndProductId(GLOBAL_CART_ID, 'prod-001'),
    ).toBe(item);

    store.delete('item-001');

    expect(store.findByCartId(GLOBAL_CART_ID)).toEqual([]);
  });
});
