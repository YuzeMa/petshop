import type {
  AddToCartRequest,
  CartResponse,
  ProductListResponse,
} from '@petcircle/api-types';
import { http } from '../http/http';

export type ProductsApi = {
  listProducts: (signal?: AbortSignal) => Promise<ProductListResponse>;
  addToCart: (
    request: AddToCartRequest,
    signal?: AbortSignal,
  ) => Promise<CartResponse>;
};

export const productsApi: ProductsApi = {
  listProducts(signal) {
    return http<ProductListResponse>('/products', { signal });
  },
  addToCart(request, signal) {
    return http<CartResponse>('/cart/items', {
      method: 'POST',
      body: request,
      signal,
    });
  },
};
