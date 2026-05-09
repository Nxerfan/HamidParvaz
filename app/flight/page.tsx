"use client";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";
// دیگر نیازی به FontAwesome برای بخش FAQ نیست چون داخل کامپوننت مدیریت می‌شود
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Description from "../components/Description";
import UsefulWays from "../components/UsefullWays";
import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form2 from "../components/(Forms)/FormType2";
import FAQSection from "../components/FAQSection"; // <-- اضافه کردن کامپوننت

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
    list: Array(8).fill({
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhUzmDUifMVFfRLXXvOc-StXlMyz9cPstUQ&s",
      alt: "کیش",
      title: "بلیط هواپیما کیش",
    }),
  },
  airlinesSection: {
    title: "شرکت های هواپیمایی",
    list: Array(7).fill({
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1A_ob-vY6riwaEzwfGcCSBh-CwiDYqE95uQ&s",
      alt: "شرکت هواپیمائی ایران ایر",
      name: "شرکت هواپیمائی ایران ایر",
      internalLink: "#",
      externalLink: "https://www.iranair.com/",
      internalText: "دیدن پرواز های این شرکت",
      externalText: "درباره ی این شرکت",
    }),
  },
  // ✅ بخش FAQ اصلاح شد
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
                {PAGE_DATA.destinationsSection.list.map((item, i) => (
                  <div key={i} className="destinationItem">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={140}
                      height={140}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
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
