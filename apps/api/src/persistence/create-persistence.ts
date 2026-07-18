import type { CartItemStore } from './cart-item-store.js';
import type { CartStore } from './cart-store.js';
import { MapCartItemStore } from './in-memory/map-cart-item-store.js';
import { MapCartStore } from './in-memory/map-cart-store.js';
import { MapProductStore } from './in-memory/map-product-store.js';
import type { ProductStore } from './product-store.js';

export type Persistence = {
  productStore: ProductStore;
  cartStore: CartStore;
  cartItemStore: CartItemStore;
};

/**
 * Composition root for persistence adapters.
 * Only in-memory for now. Later: branch on env and return a DB-backed adapter.
 */
export function createPersistence(): Persistence {
  return {
    productStore: new MapProductStore(),
    cartStore: new MapCartStore(),
    cartItemStore: new MapCartItemStore(),
  };
}
