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
  paymentSection: {
    title: "لطفا روش پرداخت را انتخاب کنید",
    methods: [
      { id: "gateway", title: "درگاه بانکی", hint: "پرداخت امن آنلاین" },
      {
        id: "credit",
        title: "استفاده از اعتبار (۰ تومان)",
        hint: "کیف پول داخلی",
      },
    ],
    banks: ["ملی", "سامان", "سینا"],
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
        content: "شما 1200 امتیاز دارید (۲۰٪ تخفیف معادل ۲۰۰,۰۰۰ تومان)",
      },
      {
        id: "travelCard",
        title: "سفر کارت",
        type: "input",
        placeholder: "کد سفر کارت",
        btnText: "بررسی",
      },
    ],
    payBtnText: "برداخت",
  },
};

export default function CheckoutPage() {
  const [activePayment, setActivePayment] = useState("gateway");
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
            <div className="Titel">
              <p>{PAGE_DATA.paymentSection.title}</p>
            </div>

            <div className="paymentOptions">
              {PAGE_DATA.paymentSection.methods.map((method) => (
                <label
                  key={method.id}
                  className={`paymentOption ${activePayment === method.id ? "active" : ""}`}
                  onClick={() => setActivePayment(method.id)}
                >
                  <span
                    className={`paymentRadio ${activePayment === method.id ? "checked" : ""}`}
                  ></span>
                  <div>
                    <div className="optionTitle">{method.title}</div>
                    <div className="optionHint">{method.hint}</div>
                  </div>
                </label>
              ))}

              {activePayment === "gateway" && (
                <div className="bankListWrapper open">
                  <div className="bankList">
                    {PAGE_DATA.paymentSection.banks.map((bank, i) => (
                      <div key={i} className="bankItem">
                        {bank}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="accordion">
              {PAGE_DATA.paymentSection.accordions.map((item) => (
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
                      <>
                        <input type="text" placeholder={item.placeholder} />
                        <button className="primaryButton">
                          {item.btnText}
                        </button>
                      </>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="BtnPrimary">
            {PAGE_DATA.paymentSection.payBtnText}
          </button>
        </div>
      </div>
    </>
  );
}
