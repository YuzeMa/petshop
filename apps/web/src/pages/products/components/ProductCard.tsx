import { formatPrice } from '../../../shared/ui/formatPrice';
import type { ProductViewModel } from '../../../shared/controller/products-mapper';
import type { MutationStatus } from '../state/products-reducer';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: ProductViewModel;
  mutation?: MutationStatus;
  onAddToCart: (productId: string) => void;
};

export function ProductCard({
  product,
  mutation,
  onAddToCart,
}: ProductCardProps) {
  const pending = mutation === 'pending';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>
          {formatPrice(product.price, product.currency)}
        </p>
        <button
          type="button"
          className={styles.addButton}
          disabled={pending}
          onClick={() => {
            onAddToCart(product.id);
          }}
        >
          {pending ? 'Adding…' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
