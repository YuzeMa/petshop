import type { CartItem } from '../../entities/cart-item.js';
import type { CartItemStore } from '../cart-item-store.js';

export class MapCartItemStore implements CartItemStore {
  private readonly items = new Map<string, CartItem>();

  findByCartId(cartId: string): CartItem[] {
    return [...this.items.values()].filter((item) => item.cartId === cartId);
  }

  findByCartIdAndProductId(
    cartId: string,
    productId: string,
  ): CartItem | undefined {
    return [...this.items.values()].find(
      (item) => item.cartId === cartId && item.productId === productId,
    );
  }

  save(item: CartItem): void {
    this.items.set(item.id, item);
  }

  delete(id: string): void {
    this.items.delete(id);
  }
}
