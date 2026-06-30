"use client";

import Link from "next/link";
import Header from "../components/(Headers)/SecondHeader";
import "./global.css";

const PAGE_DATA = {
  title: "مشاهده هتل‌ها روی نقشه",
  description: "هتل‌های مورد نظر خود را روی نقشه مشاهده و مقایسه کنید.",
};

export default function HotelOnMapPage() {
  return (
    <>
      <Header />
      <main className="hotel-on-map-page">
        <section className="hero">
          <div className="container">
            <h1>{PAGE_DATA.title}</h1>
            <p>{PAGE_DATA.description}</p>
          </div>
        </section>
        <section className="map-placeholder">
          <div className="container">
            <p className="placeholder-text">
              نمایش هتل‌ها روی نقشه به زودی اضافه خواهد شد.
            </p>
            <Link href="/hotel/hotelse">
              <button className="btn-primary">بازگشت به لیست هتل‌ها</button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
