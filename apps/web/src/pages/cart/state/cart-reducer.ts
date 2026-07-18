import type { CartAction } from '../../../shared/controller/cart-controller';
import type { CartViewModel } from '../../../shared/controller/cart-mapper';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';
export type MutationStatus = 'pending' | 'error';

export type CartState = {
  list: {
    status: LoadStatus;
    data: CartViewModel | null;
    error: string | null;
  };
  mutations: Record<string, MutationStatus>;
};

export type { CartAction };

export const initialCartState: CartState = {
  list: { status: 'idle', data: null, error: null },
  mutations: {},
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        list: { status: 'loading', data: state.list.data, error: null },
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        list: { status: 'success', data: action.cart, error: null },
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        list: { status: 'error', data: state.list.data, error: action.error },
      };
    case 'MUTATION_START':
      return {
        ...state,
        mutations: { ...state.mutations, [action.productId]: 'pending' },
        list: { ...state.list, error: null },
      };
    case 'MUTATION_SUCCESS': {
      const { [action.productId]: _removed, ...rest } = state.mutations;
      return {
        ...state,
        mutations: rest,
        list: { status: 'success', data: action.cart, error: null },
      };
    }
    case 'MUTATION_ERROR':
      return {
        ...state,
        mutations: { ...state.mutations, [action.productId]: 'error' },
        list: { ...state.list, error: action.error },
      };
    default:
      return state;
  }
}

export function hasPendingMutations(state: CartState): boolean {
  return Object.values(state.mutations).some((status) => status === 'pending');
}
