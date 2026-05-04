"use client";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faClock,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import Description from "../components/Description";
import UsefulWays from "../components/UsefullWays";
import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form5 from "../components/(Forms)/FormType5";
import FAQSection from "../components/FAQSection"; 

const PAGE_DATA = {
  offersSection: {
    header: "تورهای پیشنهادی",
    tours: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800",
        alt: "تور استانبول",
        title: "تور استانبول",
        location: "از تهران به استانبول",
        date: "10 فروردین",
        duration: "4 شب و 5 روز",
        airline: "پرواز ترکیش",
        description: "اقامت در هتل 4 ستاره با صبحانه و گشت شهری رایگان",
        price: "22,500,000",
        link: "/TourDetails/Istanbul",
        badge: { text: "ویژه", className: "" },
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800",
        alt: "تور کیش",
        title: "تور کیش",
        location: "از شیراز به کیش",
        date: "15 فروردین",
        duration: "3 شب و 4 روز",
        airline: "پرواز ماهان",
        description: "پرواز رفت و برگشت + اقامت هتل 5 ستاره ترنج",
        price: "9,850,000",
        link: "/TourDetails/Kish",
        badge: { text: "لحظه آخری", className: "lastMinute" },
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        alt: "تور تایلند",
        title: "تور تایلند (بانکوک + پوکت)",
        location: "از تهران",
        date: "25 فروردین",
        duration: "7 شب",
        airline: "پرواز قطر ایرویز",
        description: "تور خارجی ویژه با دو مقصد و خدمات فول پکیج",
        price: "68,000,000",
        link: "/TourDetails/Thailand",
        badge: { text: "تور خارجی", className: "foreign" },
      },
    ],
  },
  destinations: {
    header: "بهترین مقاصد تور",
    list: Array(8).fill({
      src: "hagia_sophia_istanbul_70699c6526.jpg",
      alt: "استانبول",
      title: "استانبول",
    }),
  },
  agencies: {
    title: "تور های معتبر ایران",
    list: Array(9).fill({
      src: "Media/cc-2-1024x576.jpg",
      alt: "گروه هتل‌های اسپیناس",
      caption: "شرکت گردشگری رها سیر پارس",
      internalLink: "#",
      internalText: "دیدن پرواز های این شرکت",
      externalLink: "https://www.rahaseir.com/cgi-sys/suspendedpage.cgi",
      externalText: "درباره ی این شرکت",
    }),
  },

  faq: {
    title: "سوالات متداول تورهای مسافرتی",
    list: [
      {
        id: 1,
        question: "آیا تور شامل بیمه مسافرتی می‌شود؟",
        answer:
          "بله، تمام تورهای ارائه شده شامل بیمه مسافرتی پایه ۱۴ روزه هستند.",
      },
      {
        id: 2,
        question: "شرایط لغو تور چگونه است؟",
        answer:
          "لغو تور تا ۱۵ روز قبل از شروع، با کسر ۱۰٪؛ از ۱۴ روز تا ۷ روز قبل، ۲۵٪ و کمتر از ۷ روز، ۵۰٪ جریمه دارد.",
      },
      {
        id: 3,
        question: "آخرین مهلت ثبت‌نام تورهای خارجی چقدر است؟",
        answer:
          "حداقل ۲۰ روز قبل از شروع تور، به دلیل زمان اخذ ویزا و رزرو هتل و پرواز.",
      },
      {
        id: 4,
        question: "آیا امکان تغییر تاریخ تور وجود دارد؟",
        answer:
          "بله، در صورت موجود بودن ظرفیت و حداکثر ۱۰ روز قبل از شروع تور، با پرداخت ۱۵٪ هزینه تغییر، امکان‌پذیر است.",
      },
    ],
  },
};

export default function Offers() {


  return (
    <>
      <Header />
      <TravelCards />
      <Form5 />
      <main className="offersContainer">
        <section className="offersSection">
          <header className="offersHeader">
            <h4>{PAGE_DATA.offersSection.header}</h4>
          </header>

          <section className="tourList">
            {PAGE_DATA.offersSection.tours.map((tour) => (
              <article key={tour.id} className="tourCard">
                <figure className="tourImageWrapper">
                  <img
                    src={tour.image}
                    alt={tour.alt}
                    width={800}
                    height={500}
                  />
                </figure>
                <div className="tourInfo">
                  <h3>{tour.title}</h3>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} /> {tour.location}
                  </p>
                  <div className="tourDetails">
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} /> {tour.date}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} /> {tour.duration}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faPlane} /> {tour.airline}
                    </span>
                  </div>
                  <p className="tourDesc">{tour.description}</p>
                  <footer className="tourFooter">
                    <div className="tourPrice">
                      <span>{tour.price}</span> تومان
                    </div>
                    <Link href={tour.link}>
                      <button className="btnPrimary">مشاهده جزئیات</button>
                    </Link>
                  </footer>
                </div>
                <span className={`badge ${tour.badge.className}`}>
                  {tour.badge.text}
                </span>
              </article>
            ))}
          </section>
        </section>

        <div className="destinationsContainer">
          <section className="destinationsSection">
            <header className="destinationsHeader">
              <h5>{PAGE_DATA.destinations.header}</h5>
            </header>
            <div className="destinationsList">
              {PAGE_DATA.destinations.list.map((item, i) => (
                <div key={i} className="destinationItem">
                  <img src={item.src} alt={item.alt} width={140} height={140} />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </section>

          <Description />

          <section className="ScrollCards">
            <h2 className="SectionTitle">{PAGE_DATA.agencies.title}</h2>
            <div className="MediaScroller">
              {PAGE_DATA.agencies.list.map((item, i) => (
                <div key={i} className="MediaElement">
                  <img src={item.src} alt={item.alt} />
                  <p>{item.caption}</p>
                  <div className="Options2">
                    <Link href={item.internalLink}>
                      <p>{item.internalText}</p>
                    </Link>
                    <Link href={item.externalLink}>
                      <p>{item.externalText}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>


          <FAQSection
            faqData={PAGE_DATA.faq.list}
            title={PAGE_DATA.faq.title}
          />
        </div>
        <UsefulWays />
      </main>
    </>
  );
}
