import type { ProductsApi } from '../api/products-api';
import { toErrorMessage } from '../http/http';
import { mapProductList, type ProductViewModel } from './products-mapper';

export type ProductsAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; products: ProductViewModel[] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'ADD_START'; productId: string }
  | { type: 'ADD_SUCCESS'; productId: string }
  | { type: 'ADD_ERROR'; productId: string; error: string };

export type ProductsDispatch = (action: ProductsAction) => void;

export type ProductsController = {
  load: (signal?: AbortSignal) => Promise<void>;
  addToCart: (productId: string, signal?: AbortSignal) => Promise<void>;
};

export function createProductsController(
  dispatch: ProductsDispatch,
  api: ProductsApi,
): ProductsController {
  return {
    async load(signal) {
      dispatch({ type: 'LOAD_START' });
      try {
        const dtos = await api.listProducts(signal);
        if (signal?.aborted) {
          return;
        }
        dispatch({ type: 'LOAD_SUCCESS', products: mapProductList(dtos) });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }
        dispatch({ type: 'LOAD_ERROR', error: toErrorMessage(error) });
      }
    },

    async addToCart(productId, signal) {
      dispatch({ type: 'ADD_START', productId });
      try {
        await api.addToCart({ productId, quantity: 1 }, signal);
        if (signal?.aborted) {
          return;
        }
        dispatch({ type: 'ADD_SUCCESS', productId });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }
        dispatch({
          type: 'ADD_ERROR',
          productId,
          error: toErrorMessage(error),
        });
      }
    },
  };
}
