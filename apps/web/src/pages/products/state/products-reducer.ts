import type { ProductsAction } from '../../../shared/controller/products-controller';
import type { ProductViewModel } from '../../../shared/controller/products-mapper';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';
export type MutationStatus = 'pending' | 'error';

export type ProductsState = {
  list: {
    status: LoadStatus;
    data: ProductViewModel[] | null;
    error: string | null;
  };
  mutations: Record<string, MutationStatus>;
};

export type { ProductsAction };

export const initialProductsState: ProductsState = {
  list: { status: 'idle', data: null, error: null },
  mutations: {},
};

export function productsReducer(
  state: ProductsState,
  action: ProductsAction,
): ProductsState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        list: { status: 'loading', data: state.list.data, error: null },
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        list: { status: 'success', data: action.products, error: null },
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        list: { status: 'error', data: state.list.data, error: action.error },
      };
    case 'ADD_START':
      return {
        ...state,
        mutations: { ...state.mutations, [action.productId]: 'pending' },
        list: { ...state.list, error: null },
      };
    case 'ADD_SUCCESS': {
      const { [action.productId]: _removed, ...rest } = state.mutations;
      return { ...state, mutations: rest };
    }
    case 'ADD_ERROR':
      return {
        ...state,
        mutations: { ...state.mutations, [action.productId]: 'error' },
        list: { ...state.list, error: action.error },
      };
    default:
      return state;
  }
}
