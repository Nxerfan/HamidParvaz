"use client";

import Link from "next/link";
import Header from "../components/(Headers)/Header";
import "./global.css";

const PAGE_DATA = {
  title: "پنل سازمانی حمید پرواز",
  description:
    "خدمات اختصاصی برای سازمان‌ها و شرکت‌ها جهت مدیریت سفرهای کاری با بهترین نرخ‌ها و پشتیبانی ۲۴ ساعته.",
  features: [
    { title: "مدیریت سفرهای سازمانی", desc: "ثبت و مدیریت آسان سفرهای کاری کارکنان" },
    { title: "گزارش‌گیری جامع", desc: "دسترسی به گزارش‌های دقیق از هزینه‌های سفر" },
    { title: "نرخ‌های ویژه سازمانی", desc: "تخفیف‌های اختصاصی برای سازمان‌ها و شرکت‌ها" },
    { title: "پشتیبانی ۲۴ ساعته", desc: "پشتیبانی تلفنی و آنلاین مخصوص سازمان‌ها" },
  ],
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main className="company-page">
        <section className="hero">
          <div className="container">
            <h1>{PAGE_DATA.title}</h1>
            <p>{PAGE_DATA.description}</p>
            <button className="btn-primary">درخواست فعال‌سازی پنل سازمانی</button>
          </div>
        </section>
        <section className="features">
          <div className="container">
            <h2>امکانات پنل سازمانی</h2>
            <div className="features-grid">
              {PAGE_DATA.features.map((f, i) => (
                <div key={i} className="feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="cta">
          <div className="container">
            <h2>همین حالا شروع کنید</h2>
            <p>برای اطلاعات بیشتر با ما تماس بگیرید</p>
            <Link href="/cooperation">
              <button className="btn-secondary">ارتباط با ما</button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
