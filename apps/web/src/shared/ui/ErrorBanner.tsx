import styles from './ErrorBanner.module.css';

type ErrorBannerProps = {
  message: string;
};

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className={styles.banner} role="alert">
      {message}
    </div>
  );
}
