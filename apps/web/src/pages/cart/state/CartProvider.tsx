import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { cartApi, type CartApi } from '../../../shared/api/cart-api';
import {
  createCartController,
  type CartController,
} from '../../../shared/controller/cart-controller';
import {
  cartReducer,
  initialCartState,
  type CartState,
} from './cart-reducer';

type CartContextValue = {
  state: CartState;
  controller: CartController;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  api?: CartApi;
};

export function CartProvider({ children, api = cartApi }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const controller = useMemo(
    () => createCartController(dispatch, api),
    [api],
  );

  useEffect(() => {
    const abort = new AbortController();
    void controller.load(abort.signal);
    return () => {
      abort.abort();
    };
  }, [controller]);

  const value = useMemo(() => ({ state, controller }), [state, controller]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error('useCart must be used within CartProvider');
  }
  return value;
}
