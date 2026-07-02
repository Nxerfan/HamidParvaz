import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Decorative floating dots */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>

        {/* Animated compass icon */}
        <div className={styles.compassIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* 404 gradient number */}
        <div className={styles.errorCode}>۴۰۴</div>

        {/* Persian text */}
        <h1 className={styles.title}>صفحه‌ای که دنبالش هستید پیدا نشد!</h1>
        <p className={styles.subtitle}>
          شاید آدرس را اشتباه وارد کرده‌اید یا صفحه حذف شده است.
        </p>

        {/* Action button */}
        <div className={styles.actions}>
          <Link href="/" className={styles.btnHome}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}
