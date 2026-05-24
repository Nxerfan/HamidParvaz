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
import FAQSection from "../components/FAQSection";

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
      cards: [
        {
          id: 20,
          title: "هتل مدینه الرضا",
          price: "۵,۵۰۰,۰۰۰",
          rate: "7.1/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 21,
          title: "هتل قصر طلایی",
          price: "۵,۷۰۰,۰۰۰",
          rate: "7.8/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 22,
          title: "هتل پارس",
          price: "۵,۹۰۰,۰۰۰",
          rate: "6.5/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 23,
          title: "هتل درویشی",
          price: "۶,۱۰۰,۰۰۰",
          rate: "8.2/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 24,
          title: "هتل خیام",
          price: "۶,۳۰۰,۰۰۰",
          rate: "7.5/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 25,
          title: "هتل سیمرغ",
          price: "۶,۵۰۰,۰۰۰",
          rate: "6.8/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 26,
          title: "هتل الماس شرق",
          price: "۶,۷۰۰,۰۰۰",
          rate: "8.0/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 27,
          title: "هتل اترک",
          price: "۶,۹۰۰,۰۰۰",
          rate: "7.3/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 28,
          title: "هتل مروارید",
          price: "۷,۱۰۰,۰۰۰",
          rate: "6.9/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 29,
          title: "هتل بین المللی قصر",
          price: "۷,۳۰۰,۰۰۰",
          rate: "8.4/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 30,
          title: "هتل گوهرشاد",
          price: "۷,۵۰۰,۰۰۰",
          rate: "7.7/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
        {
          id: 31,
          title: "هتل پردیس",
          price: "۷,۷۰۰,۰۰۰",
          rate: "6.4/10",
          location: "مشهد",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
        },
      ],
    },
    {
      id: 3,
      title: "رزرو هتل‌های تهران",
      cards: [
        {
          id: 40,
          title: "هتل اسپیناس پالاس",
          price: "۸,۰۰۰,۰۰۰",
          rate: "6.9/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 41,
          title: "هتل لاله",
          price: "۸,۲۵۰,۰۰۰",
          rate: "7.2/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 42,
          title: "هتل استقلال",
          price: "۸,۵۰۰,۰۰۰",
          rate: "8.1/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 43,
          title: "هتل هما",
          price: "۸,۷۵۰,۰۰۰",
          rate: "7.6/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 44,
          title: "هتل آزادی",
          price: "۹,۰۰۰,۰۰۰",
          rate: "6.8/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 45,
          title: "هتل پارسیان اوین",
          price: "۹,۲۵۰,۰۰۰",
          rate: "8.3/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 46,
          title: "هتل بزرگ تهران",
          price: "۹,۵۰۰,۰۰۰",
          rate: "7.0/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 47,
          title: "هتل سیمیا",
          price: "۹,۷۵۰,۰۰۰",
          rate: "7.9/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 48,
          title: "هتل ویستریا",
          price: "۱۰,۰۰۰,۰۰۰",
          rate: "6.5/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 49,
          title: "هتل کوروش",
          price: "۱۰,۲۵۰,۰۰۰",
          rate: "8.7/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 50,
          title: "هتل داریوش",
          price: "۱۰,۵۰۰,۰۰۰",
          rate: "7.4/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 51,
          title: "هتل نیاوران",
          price: "۱۰,۷۵۰,۰۰۰",
          rate: "6.3/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 52,
          title: "هتل ونوس",
          price: "۱۱,۰۰۰,۰۰۰",
          rate: "9.0/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
        {
          id: 53,
          title: "هتل الماس تهران",
          price: "۱۱,۲۵۰,۰۰۰",
          rate: "8.5/10",
          location: "تهران",
          image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
        },
      ],
    },
  ] as SectionType[],
  destinationsData: {
    header: "رزرو آنلاین هتل در تمام شهرها",
    list: [
      {
        id: 1,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "تهران",
        title: "رزرو هتل تهران",
        link: "/hotels/tehran",
      },
      {
        id: 2,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "مشهد",
        title: "رزرو هتل مشهد",
        link: "/hotels/mashhad",
      },
      {
        id: 3,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "اصفهان",
        title: "رزرو هتل اصفهان",
        link: "/hotels/isfahan",
      },
      {
        id: 4,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "شیراز",
        title: "رزرو هتل شیراز",
        link: "/hotels/shiraz",
      },
      {
        id: 5,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "تبریز",
        title: "رزرو هتل تبریز",
        link: "/hotels/tabriz",
      },
      {
        id: 6,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg"
,        alt: "کیش",
        title: "رزرو هتل کیش",
        link: "/hotels/kish",
      },
      {
        id: 7,
        src: "https://cdn.alibaba.ir/ostorage/alibaba-mag/wp-content/uploads/Goharshad-mosque.jpg",
        alt: "قشم",
        title: "رزرو هتل قشم",
        link: "/hotels/qeshm",
      },
    ],
  },
  hotelGroupsData: {
    title: "رزرو گروه هتل‌های ایران",
    list: [
      {
        id: 1,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های اسپیناس",
        caption: "گروه هتل‌های اسپیناس",
        internalLink: "#",
        externalLink: "https://espinashotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
      {
        id: 2,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های هما",
        caption: "گروه هتل‌های هما",
        internalLink: "#",
        externalLink: "https://homahotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
      {
        id: 3,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های پارسیان",
        caption: "گروه هتل‌های پارسیان",
        internalLink: "#",
        externalLink: "https://parsianhotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
      {
        id: 4,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های کوثر",
        caption: "گروه هتل‌های کوثر",
        internalLink: "#",
        externalLink: "https://kowsarhotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
      {
        id: 5,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های ایرانگردی",
        caption: "گروه هتل‌های ایرانگردی",
        internalLink: "#",
        externalLink: "https://irantourismhotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
      {
        id: 6,
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/Espinas_hotel_36ce8be68b.webp",
        alt: "گروه هتل‌های اترک",
        caption: "گروه هتل‌های اترک",
        internalLink: "#",
        externalLink: "https://atrakhotels.com/",
        internalText: "دیدن هتل‌های این گروه",
        externalText: "درباره‌ی این گروه",
      },
    ],
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
  //
  const hotelSectionsJSX: JSX.Element[] = [];
  for (const section of PAGE_DATA.hotelSections) {

    const cardsJSX: JSX.Element[] = [];
    for (const card of section.cards) {
      cardsJSX.push(<HotelCard key={card.id} {...card} />);
    }

    hotelSectionsJSX.push(
      <div className="bottomHotel" key={section.id}>
        <h2>{section.title}</h2>
        <div className="MediaScrollerHotel">{cardsJSX}</div>
      </div>
    );
  }


  const destinationsJSX: JSX.Element[] = [];
  for (const item of PAGE_DATA.destinationsData.list) {
    destinationsJSX.push(
      <div key={item.id} className="destinationItem">
        <img src={item.src} alt={item.alt} width={140} height={140} />
        <span>{item.title}</span>
      </div>
    );
  }


  const groupsJSX: JSX.Element[] = [];
  for (const item of PAGE_DATA.hotelGroupsData.list) {
    groupsJSX.push(
      <div key={item.id} className="MediaElement">
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
    );
  }

  return (
    <>
      <Header />
      <TravelCards />
      <Form1 />
      <main>
        <section className="hotelOffersContainer">
          <div className="offers">{hotelSectionsJSX}</div>
        </section>

        <div className="destinationsContainer">
          <section className="destinationsSection">
            <header className="destinationsHeader">
              <h5>{PAGE_DATA.destinationsData.header}</h5>
            </header>
            <div className="destinationsList">{destinationsJSX}</div>
          </section>

          <Description />

          <section className="ScrollCards">
            <h2 className="SectionTitle">{PAGE_DATA.hotelGroupsData.title}</h2>
            <div className="MediaScroller">{groupsJSX}</div>
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