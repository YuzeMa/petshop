import { formatPrice } from '../../../shared/ui/formatPrice';
import type { CartLineViewModel } from '../../../shared/controller/cart-mapper';
import type { MutationStatus } from '../state/cart-reducer';
import styles from './CartLine.module.css';

type CartLineProps = {
  line: CartLineViewModel;
  mutation?: MutationStatus;
  onIncrement: (productId: string, quantity: number) => void;
  onDecrement: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartLine({
  line,
  mutation,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineProps) {
  const pending = mutation === 'pending';
  // const minusDisabled = pending || line.quantity <= 1;

  return (
    <div className={styles.row}>
      <div className={styles.thumb}>
        {line.imageUrl ? (
          <img src={line.imageUrl} alt="" className={styles.thumbImage} />
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}
      </div>
      <div className={styles.details}>
        <p className={styles.name}>{line.name}</p>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label={`Decrease quantity of ${line.name}`}
            // disabled={minusDisabled} disable for now 
            onClick={() => {
              onDecrement(line.productId, line.quantity - 1);
            }}
          >
            −
          </button>
          <span aria-label={`Quantity ${line.quantity}`}>{line.quantity}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${line.name}`}
            disabled={pending}
            onClick={() => {
              onIncrement(line.productId, line.quantity + 1);
            }}
          >
            +
          </button>
          <span className={styles.sep}>|</span>
          <button
            type="button"
            className={styles.delete}
            disabled={pending}
            onClick={() => {
              onRemove(line.productId);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p className={styles.price}>
        {formatPrice(line.lineSubtotal, line.currency)}
      </p>
    </div>
  );
}
