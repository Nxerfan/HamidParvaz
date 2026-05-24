"use client";
import "./globals.css";
import Link from "next/link";
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
      { id: 1, href: "/company", src: "https://shut.ir/storage/image/2023/3/21/%D8%B9%DA%A9%D8%B3-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D9%85%D8%B3%D8%A7%D9%81%D8%B1%D8%A8%D8%B1%DB%8C-%D8%AF%D8%B1-%D8%A2%D8%B3%D9%85%D8%A7%D9%86.webp", alt: "سازمانی" },
      { id: 2, href: "/hotel", src: "https://shut.ir/storage/image/2026/2/25/%D8%B9%DA%A9%D8%B3-%D8%AA%D8%B5%D9%88%DB%8C%D8%B1-%D8%B2%D9%85%DB%8C%D9%86%D9%87-%D8%A8%D8%B1%DA%AF-%D8%A2%D8%A8%DB%8C.webp", alt: "هتل" },
    ],
  },
  destinationsSection: {
    header: "رزرو بلیط هواپیما داخلی و خارجی",
    // list مستقیماً زیر destinationsSection قرار دارد (لایه اضافی حذف شد)
    list: [
      {
        id: 1,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "کیش",
        title: "بلیط هواپیما کیش",
      },
      {
        id: 2,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "تهران",
        title: "بلیط هواپیما تهران",
      },
      {
        id: 3,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "مشهد",
        title: "بلیط هواپیما مشهد",
      },
      {
        id: 4,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "قشم",
        title: "بلیط هواپیما قشم",
      },
      {
        id: 5,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "شیراز",
        title: "بلیط هواپیما شیراز",
      },
      {
        id: 6,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "هنگام",
        title: "بلیط هواپیما هنگام",
      },
      {
        id: 7,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "استانبول",
        title: "بلیط هواپیما استانبول",
      },
      {
        id: 8,
        src: "https://www.eligasht.com/Blog/wp-content/uploads/2025/01/%D8%B3%D8%A7%D8%AD%D9%84-%D8%AF%D8%B1%D8%AE%D8%AA%D8%A7%D9%86-%D9%86%D8%A7%D8%B1%DA%AF%DB%8C%D9%84-%DA%A9%DB%8C%D8%B4.webp",
        alt: "دبی",
        title: "بلیط هواپیما دبی",
      }
    ]
  },
  airlinesSection: {
    title: "شرکت های هواپیمایی",
    list: [
      {
        id: 1,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "ایران ایر",
        name: "ایران ایر (هما)",
        internalLink: "#",
        externalLink: "https://www.iranair.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 2,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "ماهان",
        name: "ماهان ایر",
        internalLink: "#",
        externalLink: "https://www.mahan.aero/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 3,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "آسمان",
        name: "آسمان ایر",
        internalLink: "#",
        externalLink: "https://www.iaa.ir/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 4,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "کیش ایر",
        name: "کیش ایر",
        internalLink: "#",
        externalLink: "https://www.kishairlines.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 5,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "قشم ایر",
        name: "قشم ایر",
        internalLink: "#",
        externalLink: "https://www.qeshm-air.ir/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 6,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
        alt: "زاگرس",
        name: "زاگرس ایر",
        internalLink: "#",
        externalLink: "https://www.zagrosairlines.com/",
        internalText: "دیدن پرواز های این شرکت",
        externalText: "درباره ی این شرکت",
      },
      {
        id: 7,
        src: "https://armcade.com/view/articleid/blogimage/portalid/0/w/900/h/901/url/articleimages/iranairlogo-0.jpg",
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
      <Header />
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
                  <Link key={link.id} href={link.href}>
                    <img src={link.src} alt={link.alt} />
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
                {PAGE_DATA.destinationsSection.list && PAGE_DATA.destinationsSection.list.length > 0 ? (
                  PAGE_DATA.destinationsSection.list.map((item, i) => (
                    <div key={item.id || i} className="destinationItem">
                      <img src={item.src} alt={item.alt} width={140} height={140} />
                      <span>{item.title}</span>
                    </div>
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
                  <img src={item.src} alt={item.alt} />
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