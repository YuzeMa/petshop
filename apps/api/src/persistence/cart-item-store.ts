import type { CartItem } from '../entities/cart-item.js';

export interface CartItemStore {
  findByCartId(cartId: string): CartItem[];
  findByCartIdAndProductId(
    cartId: string,
    productId: string,
  ): CartItem | undefined;
  save(item: CartItem): void;
  delete(id: string): void;
}
