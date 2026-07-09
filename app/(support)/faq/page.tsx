"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/SideBar";
import FAQSection from "../../components/FAQSection";
import "../globals.css";
import { useToast } from "../../lib/hooks/useToast";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const toast = useToast();

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { sendContactMessage } = await import("../../actions/contact");
      const fd = new FormData();
      fd.set("name", formData.name);
      fd.set("email", formData.contact);
      fd.set("subject", formData.subject);
      fd.set("message", formData.message);
      const result = await sendContactMessage({ success: false, message: "" }, fd);
      toast.success(result.message || "تیکت شما با موفقیت ثبت شد!");
      setIsModalOpen(false);
      setFormData({ name: "", contact: "", subject: "", message: "" });
    } catch {
      toast.error("خطا در ارسال تیکت");
    }
  };

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
            {/* استفاده از کامپوننت FAQSection */}
            {faqPageMock.sections.map((section, sectionIndex) => (
              <FAQSection
                key={sectionIndex}
                title={section.title}
                faqData={section.items}
              />
            ))}

            {/* کارت پشتیبانی */}
            <div className="SupportCard">
              <h3>{faqPageMock.support.title}</h3>
              <p>{faqPageMock.support.description}</p>

              <div className="SupportButtons">
                <button
                  className="BtnContact"
                  onClick={() => setIsModalOpen(true)}
                >
                  {faqPageMock.support.buttons.ticket}
                </button>
                <Link
                  className="BtnCall"
                  href={`tel:${faqPageMock.support.phoneNumber}`}
                >
                  {faqPageMock.support.buttons.call}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* پاپ‌آپ (Modal) ارسال تیکت - بدون استایل اینلاین */}
      {isModalOpen && (
        <div className="ModalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <div className="ModalHeader">
              <h3>ارسال تیکت پشتیبانی</h3>
              <button
                className="ModalClose"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form className="ModalForm" onSubmit={handleSubmitTicket}>
              <div className="FormField">
                <label htmlFor="name">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="FormField">
                <label htmlFor="contact">شماره تماس یا ایمیل *</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>

              <div className="FormField">
                <label htmlFor="subject">موضوع تیکت *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="FormField">
                <label htmlFor="message">متن پیام *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="ModalActions">
                <button type="submit" className="BtnSubmit">
                  ثبت و ارسال تیکت
                </button>
                <button
                  type="button"
                  className="BtnCancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
