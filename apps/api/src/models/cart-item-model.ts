import type { CartItem } from '../entities/cart-item.js';
import type { CartItemStore } from '../persistence/cart-item-store.js';

export class CartItemModel {
  constructor(private readonly store: CartItemStore) {}

  findByCartId(cartId: string): CartItem[] {
    return this.store.findByCartId(cartId);
  }

  findByCartIdAndProductId(
    cartId: string,
    productId: string,
  ): CartItem | undefined {
    return this.store.findByCartIdAndProductId(cartId, productId);
  }

  save(item: CartItem): void {
    this.store.save(item);
  }

  delete(id: string): void {
    this.store.delete(id);
  }
}
