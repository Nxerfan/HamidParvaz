"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import "./globals.css";

export default function TravelCards() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const mobile = window.innerWidth <= 768;
      const container = el.querySelector(".CardsContainer") as HTMLElement;
      const cards = el.querySelectorAll(
        ".TravelCard",
      ) as NodeListOf<HTMLElement>;
      const links = el.querySelectorAll(
        ".CardsContainer > a",
      ) as NodeListOf<HTMLElement>;

      if (mobile) {
        el.style.marginTop = "-45px";
        el.style.padding = "0 16px";
        el.style.width = "100%";
        container.style.marginLeft = "0";
        container.style.marginBottom = "0";
        container.style.gap = "16px";
        links.forEach((a) => {
          a.style.flex = "1 1 0";
          a.style.minWidth = "0";
        });
        cards.forEach((c) => {
          c.style.padding = "20px 12px";
          c.style.width = "100%";
          c.style.marginTop = "0";
          c.style.boxSizing = "border-box";
        });
      } else {
        el.style.marginTop = "";
        el.style.padding = "";
        el.style.width = "";
        container.style.marginLeft = "";
        container.style.marginBottom = "";
        container.style.gap = "";
        links.forEach((a) => {
          a.style.flex = "";
          a.style.minWidth = "";
        });
        cards.forEach((c) => {
          c.style.padding = "";
          c.style.width = "";
          c.style.marginTop = "";
          c.style.boxSizing = "";
        });
      }
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <section className="TravelCards" ref={ref}>
      <div className="CardsContainer">
        <Link href="/flight" data-page="/flight">
          <div
            className={`TravelCard ${pathname.startsWith("/flight") ? "Active" : ""}`}
            data-page="/flight"
            data-type="plane"
          >
            <div className="CardIcon">
              <Image
                src="/Airplane Take Off-هواپیما.svg"
                alt="هواپیما"
                width={45}
                height={45}
              />
            </div>
            <div className="CardText">هواپیما</div>
          </div>
        </Link>

        <Link href="/hotel" data-page="/hotel">
          <div
            className={`TravelCard ${pathname.startsWith("/hotel") ? "Active" : ""}`}
            data-page="/hotel"
            data-type="hotel"
          >
            <div className="CardIcon">
              <Image src="/bedroom-هتل.svg" alt="هتل" width={45} height={45} />
            </div>
            <div className="CardText">هتل</div>
          </div>
        </Link>

        <Link href="/tour" data-page="/tour">
          <div
            className={`TravelCard ${pathname.startsWith("/tour") ? "Active" : ""}`}
            data-page="/tour"
            data-type="bus"
          >
            <div className="CardIcon">
              <Image
                src="/traveler-خدمات مسافرتی.svg"
                alt="تور"
                width={45}
                height={45}
              />
            </div>
            <div className="CardText">تور</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
