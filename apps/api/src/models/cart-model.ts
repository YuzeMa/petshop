import type { Cart } from '../entities/cart.js';
import type { CartStore } from '../persistence/cart-store.js';

export class CartModel {
  constructor(private readonly store: CartStore) {}

  findById(id: string): Cart | undefined {
    return this.store.findById(id);
  }

  save(cart: Cart): void {
    this.store.save(cart);
  }
}
