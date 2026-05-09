"use client";
import "../global.css";
import HeaderMakeYourTour from "../../../components/(Headers)/HeaderMakeYourTour";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faStar,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

const PAGE_DATA = {
  header: {
    currentStep: 4,
  },
  rightSidebar: {
    summary: {
      title: "خلاصه سفارش",
      priceLabel: "قیمت نهایی",
      priceValue: "0 تومان",
    },
    flights: [
      {
        id: 1,
        title: "پرواز رفت تهران به مشهد",
        lines: [
          {
            dot: true,
            airport: "فرودگاه مهرآباد تهران",
            time: "12:50 · جمعه ۰۱ اسفند ۱۴۰۴",
          },
          {
            dot: true,
            airport: "فرودگاه مشهد",
            time: "14:20 · جمعه ۰۱ اسفند ۱۴۰۴",
          },
        ],
      },
      {
        id: 2,
        title: "پرواز برگشت مشهد به تهران",
        lines: [
          {
            dot: true,
            airport: "فرودگاه مشهد",
            time: "14:20 · جمعه ۰۱ اسفند ۱۴۰۴",
          },
          {
            dot: true,
            airport: "فرودگاه مهرآباد تهران",
            time: "12:50 · جمعه ۰۱ اسفند ۱۴۰۴",
          },
        ],
      },
    ],
  },
  hotel: {
    header: {
      icon: faHotel,
      text: "هتل انتخابی شما",
    },
    image:
      "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
    name: "هتل پارسیان استقلال",
    stars: 5,
    location: "محله آرارات",
    options: ["ترانسفر رایگان"],
    score: "6.8/10",
    details: [
      { label: "تاریخ ورود", value: "جمعه. 01 اسفند 1404" },
      { label: "تاریخ خروج", value: "سه‌شنبه. 05 اسفند 1404" },
      { label: "مدت اقامت", value: "4 شب" },
    ],
  },
  passengerSection: {
    title: "مشخصات مسافر",
    tableHeaders: [
      "اتاق",
      "نام و نام خانوادگی",
      "تاریخ تولد",
      "شماره پاسپورت",
      "کد ملی",
      "",
    ],
    passengers: [
      {
        id: 1,
        room: "اتاق دو تخته تویین(صبحانه)",
        name: "amir ali",
        dob: "2010/05/23",
        passport: "",
        nationalId: "0055114229",
      },
      {
        id: 2,
        room: "اتاق دو تخته تویین(صبحانه)",
        name: "amir ali",
        dob: "2010/05/23",
        passport: "",
        nationalId: "0055114229",
      },
    ],
    contactTitle: "اطلاعات تماس",
    contactHeaders: ["شماره تماس"],
    contactNumber: "9981826109",
  },
  paymentOptions: [
    { method: "gateway", title: "درگاه بانکی", hint: "پرداخت امن آنلاین" },
    {
      method: "credit",
      title: "استفاده از اعتبار (۰ تومان)",
      hint: "کیف پول داخلی",
    },
  ],
  banks: ["ملی", "سامان", "سینا"],
  accordionItems: [
    {
      title: "کد تخفیف",
      type: "discount",
      placeholder: "کد تخفیف را وارد کنید",
      buttonText: "بررسی",
    },
    {
      title: "امتیاز کاربری",
      type: "points",
      points: 1200,
      discountPercent: "۲۰٪",
      discountAmount: "۲۰۰,۰۰۰ تومان",
    },
    {
      title: "سفر کارت",
      type: "travelCard",
      placeholder: "کد سفر کارت",
      buttonText: "بررسی",
    },
  ],
};

export default function CheckoutPage() {
  const [activePayment, setActivePayment] = useState("gateway");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gateway");
  const [openAccordions, setOpenAccordions] = useState({});
  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <HeaderMakeYourTour />
      <div className="Countainer">
        <div className="Right">
          <div
            className="sidebarFilters"
            style={{ display: "grid", gap: "24px" }}
          >
            <div className="card">
              <header className="cardHeader">
                <div className="title">
                  {PAGE_DATA.rightSidebar.summary.title}
                </div>
              </header>
              <section className="flightBlock">
                <div className="line">
                  <span className="airport">
                    {PAGE_DATA.rightSidebar.summary.priceLabel}
                  </span>
                  <span>{PAGE_DATA.rightSidebar.summary.priceValue}</span>
                </div>
              </section>
            </div>

            {PAGE_DATA.rightSidebar.flights.map((flight) => (
              <div key={flight.id} className="card">
                <header className="cardHeader">
                  <div className="title">{flight.title}</div>
                  <div className="edit" role="button">
                    <span className="icon">✎</span>
                  </div>
                </header>

                <section className="flightBlock">
                  {flight.lines.map((line, index) => (
                    <div key={index} className="line">
                      <span className="dot"></span>
                      <span className="airport">{line.airport}</span>
                      <span className="time">{line.time}</span>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          </div>
        </div>

        <div className="Left">
          <div className="Titel">
            <FontAwesomeIcon icon={PAGE_DATA.hotel.header.icon} />
            <p>{PAGE_DATA.hotel.header.text}</p>
          </div>

          <div className="MediaElementHotel">
            <img src={PAGE_DATA.hotel.image} alt={PAGE_DATA.hotel.name} />
            <div className="Down">
              <p>{PAGE_DATA.hotel.name}</p>
              <div className="rating">
                <div className="Stars">
                  {[...Array(PAGE_DATA.hotel.stars)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      style={{ color: "#ffcd11" }}
                    />
                  ))}
                  <span>{PAGE_DATA.hotel.stars}ستاره</span>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {PAGE_DATA.hotel.location}
                  </p>
                </div>
                <div className="AdditionalOptions">
                  {PAGE_DATA.hotel.options.map((opt, i) => (
                    <span key={i}>{opt}</span>
                  ))}
                </div>
                <div className="SmilyFace">
                  <p>
                    {PAGE_DATA.hotel.score}{" "}
                    <FontAwesomeIcon icon={faFaceSmile} />
                  </p>
                </div>
              </div>
            </div>
            <div className="price" style={{ alignItems: "start" }}>
              {PAGE_DATA.hotel.details.map((item, i) => (
                <p key={i}>
                  {item.label}
                  <span>{item.value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="Card">
            <div className="Sec">
              <div className="Titel">
                <p>{PAGE_DATA.passengerSection.title}</p>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      {PAGE_DATA.passengerSection.tableHeaders.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PAGE_DATA.passengerSection.passengers.map((p) => (
                      <tr key={p.id}>
                        <td>{p.room}</td>
                        <td>{p.name}</td>
                        <td>{p.dob}</td>
                        <td>{p.passport}</td>
                        <td>{p.nationalId}</td>
                        <td>
                          <button>ویرایش</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="Titel">
                <p>{PAGE_DATA.passengerSection.contactTitle}</p>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      {PAGE_DATA.passengerSection.contactHeaders.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{PAGE_DATA.passengerSection.contactNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="Card">
            <div className="paymentOptions">
              {PAGE_DATA.paymentOptions.map((option) => {
                const isActive = selectedPaymentMethod === option.method;
                return (
                  <label
                    key={option.method}
                    className={`paymentOption ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedPaymentMethod(option.method)}
                  >
                    <span
                      className={`paymentRadio ${isActive ? "checked" : ""}`}
                    ></span>
                    <div>
                      <div className="optionTitle">{option.title}</div>
                      <div className="optionHint">{option.hint}</div>
                    </div>
                  </label>
                );
              })}
              <div
                className={`bankListWrapper ${selectedPaymentMethod === "gateway" ? "open" : ""}`}
              >
                <div className="bankList">
                  {PAGE_DATA.banks.map((bank, index) => (
                    <div key={index} className="bankItem">
                      {bank}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="accordion">
              {PAGE_DATA.accordionItems.map((item) => {
                const isOpen = openAccordions[item.title] || false;
                return (
                  <div key={item.title} className="accordionItem">
                    <div
                      className="accordionHeader"
                      onClick={() => toggleAccordion(item.title)}
                    >
                      <span>{item.title}</span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={isOpen ? "open" : ""}
                      />
                    </div>
                    <div className={`accordionBody ${isOpen ? "open" : ""}`}>
                      {item.type === "discount" ||
                      item.type === "travelCard" ? (
                        <>
                          <input type="text" placeholder={item.placeholder} />
                          <button className="primaryButton">
                            {item.buttonText}
                          </button>
                        </>
                      ) : (
                        <p>
                          شما <strong>{item.points}</strong> امتیاز دارید (
                          {item.discountPercent} تخفیف معادل{" "}
                          {item.discountAmount})
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
