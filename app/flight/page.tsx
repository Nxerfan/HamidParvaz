"use client";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Description from "../components/Description";
import UsefulWays from "../components/UsefullWays";
import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form2 from "../components/(Forms)/FormType2";
import FAQSection from "../components/FAQSection";

const PAGE_DATA = {
  offerSection: {
    title: "بلیط هواپیما",
    links: [
      {
        id: 1,
        href: "/cooperation",
        src: "	https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/MBS_1_1a9008da4e.png",
        alt: "سازمانی",
      },
      {
        id: 2,
        href: "/hotel",
        src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/mrbilit2_Size_2_1000_Hotels_copy_2_0ab8e6c1be.png",
        alt: "هتل",
      },
    ],
  },
  destinationsSection: {
    header: "رزرو بلیط هواپیما داخلی و خارجی",
    list: [
      {
        id: 1,
        src: "/kish city.jpg",
        alt: "کیش",
        title: "بلیط هواپیما کیش",
      },
      {
        id: 2,
        src: "/tehran city.jpg",
        alt: "تهران",
        title: "بلیط هواپیما تهران",
      },
      {
        id: 3,
        src: "/mashhad city.jpg",
        alt: "مشهد",
        title: "بلیط هواپیما مشهد",
      },
      {
        id: 4,
        src: "/gheshm city.jpg",
        alt: "قشم",
        title: "بلیط هواپیما قشم",
      },
      {
        id: 5,
        src: "/shiraz city.jpg",
        alt: "شیراز",
        title: "بلیط هواپیما شیراز",
      },
      {
        id: 6,
        src: "/masghat city.jpg",
        alt: "مسقط ",
        title: "بلیط هواپیما مسقط ",
      },
      {
        id: 7,
        src: "/istabul city.jpg",
        alt: "استانبول",
        title: "بلیط هواپیما استانبول",
      },
      {
        id: 8,
        src: "/dubai city.jpg",
        alt: "دبی",
        title: "بلیط هواپیما دبی",
      },
    ],
  },
  airlinesSection: {
    title: "شرکت های هواپیمایی",
    list: [
      {
        id: 1,
        src: "/Iran_Air.png",
        alt: "ایران ایر",
        name: "ایران ایر (هما)",
        internalLink: "#",
        externalLink: "https://www.iranair.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 2,
        src: "/mahan-air.png",
        alt: "ماهان",
        name: "ماهان ایر",
        internalLink: "#",
        externalLink: "https://www.mahan.aero/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 3,
        src: "/IranAseman_Air.png",
        alt: "آسمان",
        name: "آسمان ایر",
        internalLink: "#",
        externalLink: "https://www.iaa.ir/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 4,
        src: "/Kish_Air.png",
        alt: "کیش ایر",
        name: "کیش ایر",
        internalLink: "#",
        externalLink: "https://www.kishairlines.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 5,
        src: "/Gheshm_Air.png",
        alt: "قشم ایر",
        name: "قشم ایر",
        internalLink: "#",
        externalLink: "https://www.qeshm-air.ir/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 6,
        src: "/Zagros_Air.png",
        alt: "زاگرس",
        name: "زاگرس ایر",
        internalLink: "#",
        externalLink: "https://www.zagrosairlines.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 7,
        src: "/Ata_Air.png",
        alt: "آتا",
        name: "آتا ایر",
        internalLink: "#",
        externalLink: "https://www.ataair.ir/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
    ],
  },
  faqSection: {
    title: "سوالات متداول",
    list: [
      {
        id: 1,
        question: "آیا امکان لغو رزرو بلیط هواپیما وجود دارد؟",
        answer:
          "بله، طبق قوانین هر ایرلاین، لغو بلیط تا ساعات مشخصی قبل از پرواز با کسر جریمه امکان‌پذیر است.",
      },
      {
        id: 2,
        question: "هزینه چمدان اضافی در پروازهای داخلی چقدر است؟",
        answer:
          "معمولاً ۱۵ کیلوگرم اول رایگان است. برای وزن اضافی، نرخ هر کیلوگرم بسته به ایرلاین متفاوت (حدود ۵۰ تا ۱۵۰ هزار تومان) می‌باشد.",
      },
      {
        id: 3,
        question: "بهترین زمان برای خرید بلیط هواپیما کی است؟",
        answer:
          "حداقل ۳ تا ۶ هفته قبل از سفر، به‌ویژه در روزهای سه‌شنبه و چهارشنبه، قیمت‌ها مناسب‌تر است.",
      },
      {
        id: 4,
        question: "آیا برای کودکان زیر ۲ سال بلیط جداگانه نیاز است؟",
        answer:
          "بله، کودکان زیر ۲ سال با ۱۰٪ قیمت بزرگسال (بلیط بغل) و بدون صندلی مجزا سفر می‌کنند.",
      },
    ],
  },
};

const Page = () => {
  return (
    <>
      <Header banner="/FlightBanner.png" />
      <TravelCards />
      <Form2 />
      <main>
        <div className="main">
          <section>
            <div className="ImgForOfer">
              <div className="top">
                <h4>{PAGE_DATA.offerSection.title}</h4>
              </div>
              <div className="bottom">
                {PAGE_DATA.offerSection.links.map((link) => (
                  <Link key={link.id} href={link.href} style={{ display: "block" }}>
                    <div style={{ position: "relative", width: "100%", height: "270px" }}>
                      <Image src={link.src} alt={link.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <div className="destinationsContainer">
            <section className="destinationsSection">
              <header className="destinationsHeader">
                <h5>{PAGE_DATA.destinationsSection.header}</h5>
              </header>
              <div className="destinationsList">
                {PAGE_DATA.destinationsSection.list &&
                PAGE_DATA.destinationsSection.list.length > 0 ? (
                  PAGE_DATA.destinationsSection.list.map((item, i) => (
                    <Link
                      href={`/flight/flightse?destination=${encodeURIComponent(item.alt)}`}
                      key={item.id || i}
                      className="destinationItem"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={140}
                        height={140}
                        style={{ objectFit: "cover", borderRadius: "8px", width: "auto", height: "auto" }}
                      />
                      <span>{item.title}</span>
                    </Link>
                  ))
                ) : (
                  <p>هیچ مقصدی یافت نشد</p>
                )}
              </div>
            </section>
          </div>

          <Description />

          <section>
            <h2 className="SectionTitle">{PAGE_DATA.airlinesSection.title}</h2>
            <div className="MediaScroller">
              {PAGE_DATA.airlinesSection.list.map((item, i) => (
                <div key={i} className="MediaElement">
                  <div style={{ position: "relative", width: "100px", height: "100px" }}>
                    <Image src={item.src} alt={item.alt} fill sizes="100px" style={{ objectFit: "contain" }} />
                  </div>
                  <p>{item.name}</p>
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
            faqData={PAGE_DATA.faqSection.list}
            title={PAGE_DATA.faqSection.title}
          />
        </div>
        <UsefulWays />
      </main>
    </>
  );
};

export default Page;
