import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUtensils,
  faHotel,
  faPlaneDeparture,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toursDB } from "../../../data/tours";
import SecondHeader from "../../../components/(Headers)/SecondHeader";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import "../../tourse/global.css";
import "./globals.css";

// All known destination names from the landing page (matches PAGE_DATA.destinations.list) + toursDB
const ALL_DESTINATIONS: string[] = [
  "travel",
  "استانبول",
  "کیش",
  "دبی",
  "آنتالیا",
  "تفلیس",
  "ایروان",
  "باکو",
  "مشهد",
  "تایلند",
];

export async function generateStaticParams() {
  const destinations = new Set<string>();

  // Include all known destinations from the landing page
  for (const dest of ALL_DESTINATIONS) {
    destinations.add(dest);
  }

  // Auto-discover any additional destinations from tour data
  for (const tour of toursDB) {
    if (tour.destination) destinations.add(tour.destination);
  }

  return Array.from(destinations).map((slug) => ({ slug }));
}

async function TourTagContent({ slug }: { slug: string }) {
  const showAll = slug === "travel" || !slug;
  const filteredTours = showAll
    ? toursDB
    : toursDB.filter(
        (tour) =>
          tour.destination.includes(slug) ||
          tour.title.includes(slug)
      );

  const pageTitle = showAll
    ? "همه تورها"
    : `تورهای ${slug}`;

  return (
    <>
      <SecondHeader />
      <main className="tour-tag-page">
        <div className="tag-container">
          <div className="tag-header">
            <h1>{pageTitle}</h1>
            <p className="tag-result-count">
              {filteredTours.length} تور پیدا شد
            </p>
          </div>

          {filteredTours.length > 0 ? (
            <div className="tag-tours-list">
              {filteredTours.map((tour) => (
                <div className="TourCard" key={tour.id}>
                  <div className="TourImage">
                    {tour.badge && (
                      <span
                        className={`Badge ${tour.isSpecial ? "Special" : ""}`}
                      >
                        {tour.badge}
                      </span>
                    )}
                    <div className="tour-score-badge">
                      <span className="score-value">{tour.hotelStars}.0</span>
                      <span className="score-label">ستاره</span>
                    </div>
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                  <div className="TourContent">
                    <div>
                      <h3 className="TourTitle">{tour.title}</h3>
                      <div className="TourAgency">
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                        {tour.airline ? ` ${tour.airline} | ` : " "}
                        آژانس {tour.agency}
                      </div>
                      <div className="TourMeta">
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faClock} /> {tour.durationNights}
                          شب و {tour.durationDays} روز
                        </div>
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faUtensils} /> {tour.mealPlan}
                        </div>
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faHotel} /> {tour.hotelStars}{" "}
                          ستاره
                        </div>
                      </div>
                      {tour.services.length > 0 && (
                        <div className="TourServices">
                          {tour.services.map((svc, idx) => (
                            <span key={idx} className="service-pill">
                              <FontAwesomeIcon icon={faCheck} /> {svc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="TourFooter">
                      <div className="Capacity">
                        {typeof tour.capacity === "number" ? (
                          <>
                            <span>{tour.capacity}</span> صندلی باقی‌مانده
                          </>
                        ) : (
                          tour.capacity
                        )}
                      </div>
                      <div className="price-cta">
                        <div className="PriceBox">
                          {tour.originalPrice && (
                            <span className="PriceLabel">
                              {tour.originalPrice.toLocaleString("fa-IR")}
                            </span>
                          )}
                          <span className="PriceValue">
                            {tour.price.toLocaleString("fa-IR")}{" "}
                            <span className="Currency">تومان</span>
                          </span>
                        </div>
                        <Link href={`/tour/${tour.slug}`}>
                          <button className="BtnBook">رزرو تور</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="tag-empty">
              <p>هیچ توری برای این مقصد یافت نشد</p>
              <Link href="/tour/travel/tour-tag" className="tag-back-link">
                مشاهده همه تورها
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default async function TourTagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingSkeleton type="list" />}>
      <TourTagContent slug={slug} />
    </Suspense>
  );
}
