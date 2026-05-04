import Link from "next/link";
import Sidebar from "../../components/SideBar";
import "../globals.css";

const faqPageMock = {
  headerTitle: "چطور می‌توانیم به شما کمک کنیم؟",
  searchPlaceholder: "جستجوی سوال شما (مثلاً: استرداد بلیط، ویزا...)",

  sections: [
    {
      title: "سوالات عمومی",
      items: [
        {
          question: "چگونه می‌توانم رزرو خود را به صورت آنلاین کنسل کنم؟",
          answer:
            "شما می‌توانید با ورود به پنل کاربری و بخش «سفارشات من»، گزینه استرداد را انتخاب کنید. مبالغ بر اساس قوانین کنسلی هتل یا ایرلاین به حساب شما عودت داده خواهد شد.",
        },
        {
          question: "مدارک لازم برای سفرهای خارجی چیست؟",
          answer:
            "برای سفرهای خارجی، داشتن گذرنامه با حداقل ۶ ماه اعتبار الزامی است. همچنین بسته به کشور مقصد، ممکن است نیاز به ویزا یا بیمه مسافرتی داشته باشید.",
        },
        {
          question: "آیا امکان تغییر نام در بلیط صادر شده وجود دارد؟",
          answer:
            "خیر، به دلیل قوانین سیستمی هواپیمایی، امکان تغییر نام وجود ندارد و بلیط باید کنسل و مجدداً صادر گردد.",
        },
      ],
    },
  ],

  support: {
    title: "جواب سوال خود را پیدا نکردید؟",
    description: "تیم پشتیبانی حمید پرواز به صورت ۲۴ ساعته در کنار شماست.",
    phoneNumber: "02538118",
    buttons: {
      ticket: "ارسال تیکت",
      call: "تماس مستقیم",
    },
  },
};

export default function FAQPage() {
  return (
    <>
      <div className="UP">
        <Sidebar />
        <div className="FAQHeader">
          <h1>{faqPageMock.headerTitle}</h1>
          <div className="SearchBox">
            <input type="text" placeholder={faqPageMock.searchPlaceholder} />
            <button>جستجو</button>
          </div>
        </div>
      </div>

      <div className="FAQContainer">
        <div></div>
        <div className="FAQContent">
          <main className="FAQMain">
            {faqPageMock.sections.map((section, sectionIndex) => (
              <div className="FAQSection" key={sectionIndex}>
                <div className="SectionTitle">{section.title}</div>

                <div className="FAQWrapper">
                  {section.items.map((item, itemIndex) => (
                    <div className="FAQItem" key={itemIndex}>
                      <button className="FAQButton">
                        <span>{item.question}</span>
                        <span className="Icon">+</span>
                      </button>

                      <div className="FAQAnswer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="SupportCard">
              <h3>{faqPageMock.support.title}</h3>
              <p>{faqPageMock.support.description}</p>

              <div className="SupportButtons">
                <button className="BtnContact">
                  {faqPageMock.support.buttons.ticket}
                </button>
                <Link  className="BtnCall" href={`tel:${faqPageMock.support.phoneNumber}`}>
                  {faqPageMock.support.buttons.call}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}