import Link from "next/link";
import "./globals.css";
export default function TravelCards() {
  return (
    <section className="TravelCards">
      <div className="CardsContainer">

        <Link href="/flight" data-page="/flight">
          <div className="TravelCard" data-page="/flight" data-type="plane">
            <div className="CardIcon">
              <svg viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div className="CardText">هواپیما</div>
          </div>
        </Link>

        <Link href="/hotel" data-page="/hotel">
          <div className="TravelCard" data-page="/hotel" data-type="hotel">
            <div className="CardIcon">
              <svg viewBox="0 0 24 24">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>
            </div>
            <div className="CardText">هتل</div>
          </div>
        </Link>

        <Link href="/tour" data-page="/tour">
          <div className="TravelCard" data-page="/tour" data-type="bus">
            <div className="CardIcon">
              <svg viewBox="0 0 24 24">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
              </svg>
            </div>
            <div className="CardText">تور</div>
          </div>
        </Link>

      </div>
    </section>
  );
}
