"use client";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import Description from "../components/Description";
import UsefulWays from "../components/UsefullWays";
import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form1 from "../components/(Forms)/FormType1";
import FAQSection from "../components/FAQSection"; // اضافه شده

type HotelCardType = {
  id: number;
  title: string;
  price: string;
  rate: string;
  image: string;
  location: string;
};

type SectionType = {
  id: number;
  title: string;
  cards: HotelCardType[];
};

const PAGE_DATA = {
  hotelSections: [
    {
      id: 1,
      title: "هتل‌های پیشنهادی",
      cards: [
        {
          id: 1,
          title: "هتل پارسیان استقلال",
          price: "9,215,000",
          rate: "6.8/10",
          location: "تهران",
          image:
            "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
        },
        {
          id: 2,
          title: "هتل اسپیناس پالاس",
          price: "12,500,000",
          rate: "8.2/10",
          location: "تهران",
          image:
            "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
        },
        ...Array.from({ length: 8 }, (_, i) => ({
          id: i + 3,
          title: `هتل پیشنهادی ${i + 3}`,
          price: `${7_000_000 + i * 300_000}`,
          rate: "7.5/10",
          location: "ایران",
          image:
            "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
        })),
      ],
    },
    {
      id: 2,
      title: "رزرو هتل‌های مشهد",
      cards: Array.from({ length: 12 }, (_, i) => ({
        id: i + 20,
        title: `هتل مشهد ${i + 1}`,
        price: `${5_500_000 + i * 200_000}`,
        rate: "7.1/10",
        location: "مشهد",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9c_M1ci4VkRomOKzefrFbTLqwtSgoHwu-LA&s",
      })),
    },
    {
      id: 3,
      title: "رزرو هتل‌های تهران",
      cards: Array.from({ length: 14 }, (_, i) => ({
        id: i + 40,
        title: `هتل تهران ${i + 1}`,
        price: `${8_000_000 + i * 250_000}`,
        rate: "6.9/10",
        location: "تهران",
        image:
          "https://thumbs.dreamstime.com/b/luxury-hotel-exterior-front-view-night-glowing-illuminated-text-sign-glass-facade-architecture-urban-nobody-tourism-resort-384827766.jpg",
      })),
    },
  ] as SectionType[],
  destinations: {
    header: "رزرو آنلاین هتل در تمام شهرها",
    list: Array(8).fill({
      src: "https://seamoon.tours/uploads/31f29a2b6f3649e4ae3cc400b6d990f5.jpg.webp",
      alt: "استانبول",
      title: "رزرو هتل تهران",
    }),
  },
  hotelGroups: {
    title: "رزرو گروه هتل‌های ایران",
    list: Array(6).fill({
      src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
      alt: "گروه هتل‌های اسپیناس",
      caption: "گروه هتل‌های اسپیناس",
      internalLink: "#",
      internalText: "دیدن پرواز های این شرکت",
      externalLink: "https://espinashotels.com/",
      externalText: "درباره ی این شرکت",
    }),
  },
  faq: {
    title: "سوالات متداول هتل",
    list: [
      {
        id: 1,
        question: "ساعت ورود و خروج به هتل چه زمانی است؟",
        answer:
          "ساعت ورود (check-in) معمولاً از ساعت ۱۴:۰۰ به بعد و ساعت خروج (check-out) تا ساعت ۱۲:۰۰ ظهر می‌باشد.",
      },
      {
        id: 2,
        question: "آیا لغو رایگان رزرو هتل امکان‌پذیر است؟",
        answer:
          "بستگی به نرخ و شرایط هتل دارد. برخی هتل‌ها تا ۲۴ ساعت قبل از ورود، لغو رایگان ارائه می‌دهند.",
      },
      {
        id: 3,
        question: "آثار به همراه داشتن حیوان خانگی در هتل چه قانونی دارد؟",
        answer:
          "بیشتر هتل‌های ایران اجازه ورود حیوان خانگی را نمی‌دهند. قبل از رزرو حتماً با هتل تماس بگیرید.",
      },
      {
        id: 4,
        question: "آیا صبحانه در قیمت اتاق لحاظ شده است؟",
        answer:
          "در اکثر رزروهای این سایت، صبحانه به صورت رایگان ارائه می‌شود، اما حتماً جزئیات هر هتل را مطالعه کنید.",
      },
    ],
  },
};

function HotelCard({ id, title, price, rate, image, location }: HotelCardType) {
  return (
    <Link href={`/hotel/hotelch`} className="MediaElementHotel">
      <img src={image} alt={title} />
      <p>{title}</p>
      <div className="rating">
        <div className="Stars">
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffcd11" }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffcd11" }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffcd11" }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffcd11" }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffcd11" }} />
          <span>5 ستاره</span>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> {location}
          </p>
        </div>
        <div className="SmilyFace">
          <p>
            {rate} <FontAwesomeIcon icon={faFaceSmile} />
          </p>
        </div>
      </div>
      <div className="price">
        <p>
          <span>{price}</span> تومان
        </p>
      </div>
    </Link>
  );
}

export default function HotelsPage() {
  return (
    <>
      <Header />
      <TravelCards />
      <Form1 />
      <main>
        <section className="hotelOffersContainer">
          <div className="offers">
            {PAGE_DATA.hotelSections.map((section) => (
              <div className="bottomHotel" key={section.id}>
                <h2>{section.title}</h2>
                <div className="MediaScrollerHotel">
                  {section.cards.map((card) => (
                    <HotelCard key={card.id} {...card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            <h2 className="SectionTitle">{PAGE_DATA.hotelGroups.title}</h2>
            <div className="MediaScroller">
              {PAGE_DATA.hotelGroups.list.map((item, i) => (
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
