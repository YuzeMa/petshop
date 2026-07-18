import type { Cart } from '../../entities/cart.js';
import type { CartStore } from '../cart-store.js';

export class MapCartStore implements CartStore {
  private readonly carts = new Map<string, Cart>();

  findById(id: string): Cart | undefined {
    return this.carts.get(id);
  }

  save(cart: Cart): void {
    this.carts.set(cart.id, cart);
  }
}
