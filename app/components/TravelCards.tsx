"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function TravelCards() {
  const pathname = usePathname();

  return (
    <section className="TravelCards">
      <div className="CardsContainer">
        <Link href="/flight" data-page="/flight">
          <div
            className={`TravelCard ${pathname.startsWith("/flight") ? "Active" : ""}`}
            data-page="/flight"
            data-type="plane"
          >
            <div className="CardIcon">
              <Image src="/Airplane Take Off-هواپیما.svg" alt="هواپیما" width={45} height={45} />
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
              <Image src="/traveler-خدمات مسافرتی.svg" alt="تور" width={45} height={45} />
            </div>
            <div className="CardText">تور</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
