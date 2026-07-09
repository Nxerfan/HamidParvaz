"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../components/(Headers)/Header";
import styles from "./company.module.css";

/* ===== Intersection Observer Hook ===== */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ===== Animated Counter Hook ===== */
function useCounter(end: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

/* ===== Animated Counter with ref ===== */
function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const { count, ref } = useCounter(value, 2200);
  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statNumber}>
        {count.toLocaleString("fa-IR")}
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
    </div>
  );
}

/* ===== Data ===== */
const STATS = [
  { value: 18, suffix: "+", label: "سال تجربه" },
  { value: 95000, suffix: "+", label: "مسافر خوشحال" },
  { value: 120, suffix: "+", label: "مقصد رویایی" },
  { value: 40, suffix: "+", label: "شریک سازمانی" },
];

const VALUES = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "اعتماد و کیفیت",
    desc: "بیش از ۱۸ سال تجربه در ارائه خدمات مسافرتی با بالاترین استانداردهای کیفی.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "جهان‌نگری",
    desc: "شناخت عمیق مقاصد جهان و ارائه تجربه‌های سفر منحصربه‌فرد.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "مسئولیت‌پذیری",
    desc: "از لحظه رزرو تا پایان سفر، مسئولیت کامل خدمات را بر عهده می‌گیریم.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: " تعالی",
    desc: "تلاش مداوم برای بهتر شدن و ارائه خدماتی فراتر از انتظارات.",
  },
];

const TIMELINE = [
  {
    year: "۱۳۸۶",
    title: "تاسیس حمید پرواز",
    desc: "آغاز فعالیت با هدف ارائه خدمات مسافرتی متفاوت و باکیفیت.",
  },
  {
    year: "۱۳۹۰",
    title: "ورود به خدمات سازمانی",
    desc: "عقد قرارداد با شرکت‌ها و سازمان‌های بزرگ کشور.",
  },
  {
    year: "۱۳۹۵",
    title: "پلتفرم آنلاین",
    desc: "راه‌اندازی سیستم رزرو آنلاین بلیط و هتل.",
  },
  {
    year: "۱۳۹۸",
    title: "گسترش تورها",
    desc: "پوشش بیش از ۱۲۰ مقصد در سراسر جهان.",
  },
  {
    year: "۱۴۰۲",
    title: "رشد و تعالی",
    desc: "رسیدن به رکورد ۹۵ هزار مسافر راضی.",
  },
];

/* ===== Component ===== */
export default function CompanyPage() {
  const { ref: storyRef, visible: storyVisible } = useInView(0.15);
  const { ref: valuesRef, visible: valuesVisible } = useInView(0.1);
  const { ref: parallaxRef, visible: parallaxVisible } = useInView(0.2);
  const { ref: timelineRef, visible: timelineVisible } = useInView(0.1);
  const { ref: ctaRef, visible: ctaVisible } = useInView(0.15);

  return (
    <>
      <Header dark />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroEye}>H A M I D &nbsp; P A R V A Z</div>
          <h1 className={styles.heroTitle}>
            حمید پرواز
            <span className={styles.heroTitleAccent}>از سال ۱۳۸۶</span>
          </h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroTagline}>
            سفر را با ما تجربه کنید.
            <br />
            بیش از ۱۸ سال خلق خاطرات فراموش‌نشدنی.
          </p>
        </div>
        <div className={styles.heroScroll}>
          <div className={styles.heroScrollLine} />
          SCROLL
        </div>
      </section>

      {/* ── Story ── */}
      <div
        ref={storyRef}
        className={`${styles.section} ${styles.story}`}
        style={{
          opacity: storyVisible ? 1 : 0,
          transform: storyVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className={styles.sectionNarrow}>
          <div className={styles.storyAccent} />
          <div className={styles.storyLayout}>
            <div className={styles.storyText}>
              <span className={styles.sectionLabel}>داستان ما</span>
              <h3>از یک آژانس کوچک تا برندی معتبر در صنعت گردشگری</h3>
              <p>
                حمید پرواز در سال ۱۳۸۶ با هدف ساده‌ای بزرگ تأسیس شد: تبدیل تجربه
                سفر به یک خاطره فراموش‌نشدنی برای هر ایرانی.
              </p>
              <p>
                ما باور داریم سفر حق هر انسانی است. با ارائه خدمات باکیفیت و
                نرخ‌های مناسب، این باور را هر روز محقق می‌کنیم.
              </p>
            </div>
            <div className={styles.storyVisual}>
              <div className={styles.storyFrame}>
                <div className={styles.storyFrameInner}>✈</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={`${styles.section} ${styles.stats}`}>
        <div className={styles.sectionWide}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              className={styles.sectionLabel}
              style={{ color: "var(--gold)" }}
            >
              در اعداد
            </span>
          </div>
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <StatCounter key={i} value={stat.value} suffix={stat.suffix} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div
        ref={valuesRef}
        className={`${styles.section} ${styles.values}`}
        style={{
          opacity: valuesVisible ? 1 : 0,
          transform: valuesVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className={styles.sectionNarrow}>
          <div style={{ textAlign: "center" }}>
            <span className={styles.sectionLabel}>ارزش‌های ما</span>
            <h2 className={styles.sectionTitle}>چرا حمید پرواز؟</h2>
          </div>
        </div>
        <div className={styles.sectionWide}>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Parallax Quote ── */}
      <div
        ref={parallaxRef}
        className={styles.parallax}
        style={{
          opacity: parallaxVisible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <div className={styles.parallaxBg} />
        <div className={styles.parallaxContent}>
          <p className={styles.parallaxQuote}>
            &ldquo; سفر تنها چیزی است که <span>می‌خریم</span> و
            <br />
            ما را <span>غنی‌تر</span> می‌کند &rdquo;
          </p>
          <div className={styles.parallaxDivider} />
          <p className={styles.parallaxAuthor}>— حمید پرواز —</p>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div
        ref={timelineRef}
        className={`${styles.section} ${styles.timeline}`}
        style={{
          opacity: timelineVisible ? 1 : 0,
          transform: timelineVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className={styles.sectionNarrow}>
          <div style={{ textAlign: "center" }}>
            <span className={styles.sectionLabel}>مسیر ما</span>
            <h2 className={styles.sectionTitle}>سفر حمید پرواز</h2>
          </div>
        </div>
        <div className={styles.sectionWide}>
          <div className={styles.timelineWrapper}>
            <div className={styles.timelineLine} />
            {TIMELINE.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineTitle}>{item.title}</div>
                  <div className={styles.timelineDesc}>{item.desc}</div>
                </div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineSpacer} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div
        ref={ctaRef}
        className={`${styles.section} ${styles.cta}`}
        style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className={styles.sectionNarrow}>
          <h2 className={styles.ctaTitle}>آماده سفر هستید؟</h2>
          <p className={styles.ctaDesc}>
            با ما تماس بگیرید و بهترین تجربه سفر خود را رقم بزنید.
          </p>
          <Link href="/cooperation">
            <button className={styles.ctaBtn}>تماس با ما</button>
          </Link>
          <div className={styles.ctaInfo}>
            <div className={styles.ctaInfoItem}>
              <strong>تلفن</strong>&nbsp; ۰۲۵۳۸۱۱۸
            </div>
            <div className={styles.ctaInfoItem}>
              <strong>ایمیل</strong>&nbsp; info@hamidparvaz.ir
            </div>
            <div className={styles.ctaInfoItem}>
              <strong>آدرس</strong>&nbsp; مشهد، خیابان امام رضا
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerLine} />
    </>
  );
}
