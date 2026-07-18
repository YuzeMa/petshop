import type {
  CartResponse,
  UpdateCartItemRequest,
} from '@petcircle/api-types';
import { http } from '../http/http';

export type CartApi = {
  getCart: (signal?: AbortSignal) => Promise<CartResponse>;
  removeItem: (
    productId: string,
    signal?: AbortSignal,
  ) => Promise<CartResponse>;
  updateQuantity: (
    productId: string,
    request: UpdateCartItemRequest,
    signal?: AbortSignal,
  ) => Promise<CartResponse>;
};

export const cartApi: CartApi = {
  getCart(signal) {
    return http<CartResponse>('/cart', { signal });
  },
  removeItem(productId, signal) {
    return http<CartResponse>(`/cart/items/${encodeURIComponent(productId)}`, {
      method: 'DELETE',
      signal,
    });
  },
  updateQuantity(productId, request, signal) {
    return http<CartResponse>(`/cart/items/${encodeURIComponent(productId)}`, {
      method: 'PATCH',
      body: request,
      signal,
    });
  },
};
