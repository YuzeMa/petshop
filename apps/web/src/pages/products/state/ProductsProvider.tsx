import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { productsApi, type ProductsApi } from '../../../shared/api/products-api';
import {
  createProductsController,
  type ProductsController,
} from '../../../shared/controller/products-controller';
import {
  initialProductsState,
  productsReducer,
  type ProductsState,
} from './products-reducer';

type ProductsContextValue = {
  state: ProductsState;
  controller: ProductsController;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

type ProductsProviderProps = {
  children: ReactNode;
  api?: ProductsApi;
};

export function ProductsProvider({
  children,
  api = productsApi,
}: ProductsProviderProps) {
  const [state, dispatch] = useReducer(productsReducer, initialProductsState);
  const controller = useMemo(
    () => createProductsController(dispatch, api),
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

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const value = useContext(ProductsContext);
  if (!value) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return value;
}
