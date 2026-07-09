import styles from "./loading.module.css";

export default function RootLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Decorative floating dots — like 404 */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>

        {/* Glow orbs */}
        <div className={styles.glowOrbA} />
        <div className={styles.glowOrbB} />

        {/* ─── Sparkle particles ─── */}
        <div className={styles.sparkleContainer}>
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
        </div>

        {/* ─── Animated Globe + Paper Plane ─── */}
        <div className={styles.iconGroup}>
          {/* Outer orbit ring */}
          <div className={styles.orbitRing}>
            <div className={styles.orbitDot} />
          </div>

          {/* Inner orbit ring (counter-rotating) */}
          <div className={styles.orbitRingInner}>
            <div className={styles.orbitDotInner} />
          </div>

          {/* Paper plane — flying around */}
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
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>

          {/* Globe background */}
          <div className={styles.globeIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>

        {/* ─── Gradient Title ─── */}
        <h1 className={styles.title}>درحال بارگزاری</h1>

        {/* ─── Shimmer subtitle ─── */}
        <p className={styles.subtitle}>
          لطفاً چند لحظه صبر کنید...
        </p>

        {/* ─── Animated loading bar ─── */}
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarFill} />
          <div className={styles.loadingBarGlow} />
        </div>

        {/* ─── Pulsing dots beneath bar ─── */}
        <div className={styles.dotsBar}>
          <div className={styles.dotsBarDot} />
          <div className={styles.dotsBarDot} />
          <div className={styles.dotsBarDot} />
        </div>

        {/* ─── Travel quote ─── */}
        <p className={styles.quote}>
          &ldquo;سفر بهترین سرمایه‌گذاری است که می‌توانی انجام دهی&rdquo;
        </p>
      </div>
    </div>
  );
}
