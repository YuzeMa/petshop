import { ErrorBanner } from '../../shared/ui/ErrorBanner';
import { ProductCard } from './components/ProductCard';
import { ProductsProvider, useProducts } from './state/ProductsProvider';
import styles from './ProductListPage.module.css';

export function ProductListPageContent() {
  const { state, controller } = useProducts();
  const { list, mutations } = state;

  return (
    <div>
      <h1 className={styles.title}>Products</h1>
      {list.error ? <ErrorBanner message={list.error} /> : null}
      {list.status === 'loading' && list.data === null ? (
        <p>Loading products…</p>
      ) : null}
      {list.data && list.data.length === 0 ? <p>No products found.</p> : null}
      {list.data && list.data.length > 0 ? (
        <div className={styles.grid}>
          {list.data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              mutation={mutations[product.id]}
              onAddToCart={(productId) => {
                void controller.addToCart(productId);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductListPage() {
  return (
    <ProductsProvider>
      <ProductListPageContent />
    </ProductsProvider>
  );
}
