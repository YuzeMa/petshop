import styles from './TotalSkeleton.module.css';

export function TotalSkeleton() {
  return (
    <span
      className={styles.skeleton}
      aria-busy="true"
      aria-label="Updating total"
    />
  );
}
