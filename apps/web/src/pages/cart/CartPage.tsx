import { ErrorBanner } from '../../shared/ui/ErrorBanner';
import { formatPrice } from '../../shared/ui/formatPrice';
import { TotalSkeleton } from '../../shared/ui/TotalSkeleton';
import { CartLine } from './components/CartLine';
import { CartProvider, useCart } from './state/CartProvider';
import { hasPendingMutations } from './state/cart-reducer';
import styles from './CartPage.module.css';

export function CartPageContent() {
  const { state, controller } = useCart();
  const { list, mutations } = state;
  const cart = list.data;
  const showTotalSkeleton = hasPendingMutations(state);

  return (
    <div>
      <h1 className={styles.title}>Cart</h1>
      {list.error ? <ErrorBanner message={list.error} /> : null}
      {list.status === 'loading' && cart === null ? (
        <p>Loading cart…</p>
      ) : null}
      {cart && cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : null}
      {cart && cart.items.length > 0 ? (
        <>
          <p className={styles.count}>
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in the
            cart
          </p>
          <div className={styles.list}>
            {cart.items.map((line) => (
              <CartLine
                key={line.productId}
                line={line}
                mutation={mutations[line.productId]}
                onIncrement={(productId, quantity) => {
                  void controller.updateQuantity(productId, quantity);
                }}
                onDecrement={(productId, quantity) => {
                  void controller.updateQuantity(productId, quantity);
                }}
                onRemove={(productId) => {
                  void controller.removeItem(productId);
                }}
              />
            ))}
          </div>
          <div className={styles.footer}>
            <p className={styles.total}>
              Total:{' '}
              {showTotalSkeleton ? (
                <TotalSkeleton />
              ) : (
                formatPrice(cart.grandTotal, cart.currency)
              )}
            </p>
            <button type="button" className={styles.checkout}>
              Checkout
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function CartPage() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
