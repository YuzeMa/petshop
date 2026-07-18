import type { Cart } from '../entities/cart.js';

export interface CartStore {
  findById(id: string): Cart | undefined;
  save(cart: Cart): void;
}
