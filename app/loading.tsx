import styles from "./loading.module.css";

export default function RootLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Decorative floating dots */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>

        {/* Animated paper plane */}
        <div className={styles.planeIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className={styles.title}>در حال بارگذاری</h1>
        <p className={styles.subtitle}>
          لطفاً چند لحظه صبر کنید...
        </p>

        {/* Animated loading bar */}
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarFill} />
        </div>

        {/* Bouncing dots */}
        <div className={styles.bounceDots}>
          <div className={styles.bounceDot} />
          <div className={styles.bounceDot} />
          <div className={styles.bounceDot} />
        </div>
      </div>
    </div>
  );
}
