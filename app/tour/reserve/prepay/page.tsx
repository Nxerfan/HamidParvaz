"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import HeaderBuyRoom from "../../../components/(Headers)/HeaderBuyRoom";

import "../../../reserve/global.css";

const PAGE_DATA = {
  icons: {
    angleDown: faAngleDown,
    circle: faCircle,
  },
  tourInfo: {
    title: "بررسی اطلاعات تور",
    timer: "00:56",
    subtitle: "مشخصات رزرو تور",
    headers: ["شرکت/کاروان", "مبدا", "مقصد", "مدت تور"],
    rows: [
      {
        company: "حمید برواز",
        origin: "قم",
        destination: "تورنتو",
        duration: "جمعه 25 بهمن",
      },
    ],
  },
  hotelInfo: {
    title: "مشخصات رزرو هتل",
    headers: ["نام هتل", "مقصد", "ورود", "خروج", "مدت اقامت"],
    rows: [
      {
        name: "هتل آپارتمان جمالی",
        destination: "مشهد",
        checkIn: "سه‌شنبه 14 بهمن",
        checkOut: "جمعه 17 بهمن",
        stay: "3 شب",
      },
    ],
  },
  flights: {
    departure: {
      title: "مشخصات پرواز رفت",
      headers: [
        "شرکت هوابیمایی",
        "فرودگاه",
        "تاریخ پرواز",
        "ساعت",
        "تعداد توقف",
      ],
      rows: [
        {
          airline: "ایران ایرلاین",
          airport: "بین المللی قم",
          date: "سه‌شنبه 14 بهمن",
          time: "13 ظهر به وقت ایران",
          stops: "3",
        },
      ],
    },
    return: {
      title: "مشخصات پرواز برگشت",
      headers: [
        "شرکت هوابیمایی",
        "فرودگاه",
        "تاریخ پرواز",
        "ساعت",
        "تعداد توقف",
      ],
      rows: [
        {
          airline: "قطر ایرلاین",
          airport: "تورنتو ایرپورت",
          date: "26 بهمن",
          time: "3 بامداد به وقت ایران",
          stops: "3",
        },
      ],
    },
  },
  hotelCard: {
    image: "/Media/choosedTour.jpg", // Add proper extension
    alt: "تور",
    name: "تور استانبول",
    checkIn: {
      time: "14:00",
      label: "حرکت: یک‌شنبه 12 اسفند",
    },
    checkOut: {
      time: "12:00",
      label: "بازگشت: دوشنبه 18 اسفند",
    },
  },
  passenger: {
    title: "مشخصات مسافر",
    headers: [
      "ردیف",
      "عنوان",
      "نام و نام خانوادگی",
      "ملیت",
      "تاریخ تولد",
      "شماره ملی",
    ],
    rows: [
      {
        type: "بزرگسال",
        title: "آقا",
        name: "amir sadeghi",
        nationality: "ایرانی",
        dob: "1367-03-03",
        nationalId: "0386022887",
      },
    ],
    contact: {
      title: "اطلاعات تماس",
      headers: ["تلفن همراه", "تلفن ثابت", "ایمیل"],
      rows: [
        {
          mobile: "09981826109",
          phone: "-",
          email: "-",
        },
      ],
    },
  },
  payment: {
    options: [
      {
        id: "gateway",
        title: "درگاه بانکی",
        hint: "پرداخت امن آنلاین",
        banks: ["ملی", "سامان", "سینا"],
      },
      {
        id: "credit",
        title: "استفاده از اعتبار (۰ تومان)",
        hint: "کیف پول داخلی",
      },
    ],
    accordions: [
      {
        id: "discount",
        title: "کد تخفیف",
        type: "input",
        placeholder: "کد تخفیف را وارد کنید",
        btnText: "بررسی",
      },
      {
        id: "points",
        title: "امتیاز کاربری",
        type: "text",
        content: "شما ۱۲۰۰ امتیاز دارید (۲۰٪ تخفیف معادل ۲۰۰,۰۰۰ تومان)",
      },
      {
        id: "travelCard",
        title: "سفر کارت",
        type: "input",
        placeholder: "کد سفر کارت",
        btnText: "بررسی",
      },
    ],
  },
  sidebar: {
    flight: {
      from: { time: "6:00", city: "تهران" },
      to: { time: "7:00", city: "تهران" },
      rules: "قوانین جریمه و استرداد",
      tag: "چارتری",
    },
    invoice: "صورتحاسب صفر",
    btnText: "تایید و ادامه",
  },
};

export default function TourReviewPage() {
  const [activePayment, setActivePayment] = useState("gateway");
  const [openAccordions, setOpenAccordions] = useState({});
  const [isHotelOpen, setIsHotelOpen] = useState(false);

  const handlePaymentClick = (methodId) => setActivePayment(methodId);
  const toggleAccordion = (id) =>
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <HeaderBuyRoom />
      <section>
        <div className="container">
          <div className="Right" style={{ width: "100%" }}>
            <div className="Card">
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.tourInfo.title}</p>
                </div>
                <h3>{PAGE_DATA.tourInfo.subtitle}</h3>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.tourInfo.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.tourInfo.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.company}</td>
                          <td>{row.origin}</td>
                          <td>{row.destination}</td>
                          <td>{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="Card">
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.hotelInfo.title}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.hotelInfo.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.hotelInfo.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.name}</td>
                          <td>{row.destination}</td>
                          <td>{row.checkIn}</td>
                          <td>{row.checkOut}</td>
                          <td>{row.stay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="Card" style={{ display: "grid", gap: "24px" }}>
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.flights.departure.title}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.flights.departure.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.flights.departure.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.airline}</td>
                          <td>{row.airport}</td>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.stops}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.flights.return.title}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.flights.return.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.flights.return.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.airline}</td>
                          <td>{row.airport}</td>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.stops}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="Card">
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.passenger.title}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.passenger.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.passenger.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.type}</td>
                          <td>{row.title}</td>
                          <td>{row.name}</td>
                          <td>{row.nationality}</td>
                          <td>{row.dob}</td>
                          <td>{row.nationalId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="Titel">
                  <p>{PAGE_DATA.passenger.contact.title}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.passenger.contact.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.passenger.contact.rows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.mobile}</td>
                          <td>{row.phone}</td>
                          <td>{row.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="Card">
              <div className="paymentOptions">
                {PAGE_DATA.payment.options.map((option) => (
                  <label
                    key={option.id}
                    className={`paymentOption ${activePayment === option.id ? "active" : ""}`}
                    onClick={() => handlePaymentClick(option.id)}
                  >
                    <span
                      className={`paymentRadio ${activePayment === option.id ? "checked" : ""}`}
                    ></span>
                    <div>
                      <div className="optionTitle">{option.title}</div>
                      <div className="optionHint">{option.hint}</div>
                    </div>
                  </label>
                ))}

                {activePayment === "gateway" && (
                  <div className="bankListWrapper open">
                    <div className="bankList">
                      {PAGE_DATA.payment.options[0].banks.map((bank, i) => (
                        <div key={i} className="bankItem">
                          {bank}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="accordion">
                {PAGE_DATA.payment.accordions.map((item) => (
                  <div key={item.id} className="accordionItem">
                    <div
                      className="accordionHeader"
                      onClick={() => toggleAccordion(item.id)}
                    >
                      <span>{item.title}</span>
                      <div
                        className={`plusIcon ${openAccordions[item.id] ? "open" : ""}`}
                      ></div>
                    </div>
                    <div
                      className={`accordionBody ${openAccordions[item.id] ? "open" : ""}`}
                    >
                      {item.type === "input" ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input type="text" placeholder={item.placeholder} />
                          <button className="primaryButton">
                            {item.btnText}
                          </button>
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="left2">
            <div className={`hotelCard ${isHotelOpen ? "open" : ""}`}>
              <div className="card1">
                <div className="top">
                  <div
                    className="ChoosedHotel"
                    onClick={() => setIsHotelOpen(!isHotelOpen)}
                  >
                    <img
                      src={PAGE_DATA.hotelCard.image}
                      alt={PAGE_DATA.hotelCard.alt}
                    />
                    <h4>{PAGE_DATA.hotelCard.name}</h4>
                    <FontAwesomeIcon icon={PAGE_DATA.icons.angleDown} />
                  </div>
                </div>

                <div className="bottom">
                  <div className="In">
                    <p>{PAGE_DATA.hotelCard.checkIn.time}</p>
                    <FontAwesomeIcon icon={PAGE_DATA.icons.circle} />
                    <p>{PAGE_DATA.hotelCard.checkIn.label}</p>
                  </div>
                  <div className="In">
                    <p>{PAGE_DATA.hotelCard.checkOut.time}</p>
                    <FontAwesomeIcon icon={PAGE_DATA.icons.circle} />
                    <p>{PAGE_DATA.hotelCard.checkOut.label}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card2">
              <span>{PAGE_DATA.sidebar.invoice}</span>
            </div>
            <button>
              {PAGE_DATA.sidebar.btnText} <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
