"use client";

import Header from "../components/(Headers)/SecondHeader";
import "./global.css";

const PAGE_DATA = {
  title: "تور مجازی و گالری تصاویر",
  description:
    "قبل از خرید، مقصد را به صورت مجازی ببینید و از تصاویر gorgeous مقاصد گردشگری لذت ببرید.",
};

export default function GetTourPage() {
  return (
    <>
      <Header />
      <main className="get-tour-page">
        <section className="hero">
          <div className="container">
            <h1>{PAGE_DATA.title}</h1>
            <p>{PAGE_DATA.description}</p>
          </div>
        </section>
        <section className="gallery">
          <div className="container">
            <p className="placeholder-text">
              گالری تصاویر و تور مجازی به زودی اضافه خواهد شد.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
