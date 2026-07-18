import type { CartApi } from '../api/cart-api';
import { toErrorMessage } from '../http/http';
import { mapCartResponse, type CartViewModel } from './cart-mapper';

export type CartAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; cart: CartViewModel }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'MUTATION_START'; productId: string }
  | { type: 'MUTATION_SUCCESS'; cart: CartViewModel; productId: string }
  | { type: 'MUTATION_ERROR'; productId: string; error: string };

export type CartDispatch = (action: CartAction) => void;

export type CartController = {
  load: (signal?: AbortSignal) => Promise<void>;
  removeItem: (productId: string, signal?: AbortSignal) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    signal?: AbortSignal,
  ) => Promise<void>;
};

export function createCartController(
  dispatch: CartDispatch,
  api: CartApi,
): CartController {
  return {
    async load(signal) {
      dispatch({ type: 'LOAD_START' });
      try {
        const dto = await api.getCart(signal);
        if (signal?.aborted) {
          return;
        }
        dispatch({ type: 'LOAD_SUCCESS', cart: mapCartResponse(dto) });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }
        dispatch({ type: 'LOAD_ERROR', error: toErrorMessage(error) });
      }
    },

    async removeItem(productId, signal) {
      dispatch({ type: 'MUTATION_START', productId });
      try {
        const dto = await api.removeItem(productId, signal);
        if (signal?.aborted) {
          return;
        }
        dispatch({
          type: 'MUTATION_SUCCESS',
          cart: mapCartResponse(dto),
          productId,
        });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }
        dispatch({
          type: 'MUTATION_ERROR',
          productId,
          error: toErrorMessage(error),
        });
      }
    },

    async updateQuantity(productId, quantity, signal) {
      dispatch({ type: 'MUTATION_START', productId });
      try {
        const dto = await api.updateQuantity(productId, { quantity }, signal);
        if (signal?.aborted) {
          return;
        }
        dispatch({
          type: 'MUTATION_SUCCESS',
          cart: mapCartResponse(dto),
          productId,
        });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }
        dispatch({
          type: 'MUTATION_ERROR',
          productId,
          error: toErrorMessage(error),
        });
      }
    },
  };
}
