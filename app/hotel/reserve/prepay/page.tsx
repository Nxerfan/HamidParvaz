"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowLeft,
  faPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import "../../../reserve/global.css";
import HeaderBuyRoom from "../../../components/(Headers)/HeaderBuyRoom";

const PAGE_DATA = {
  reviewTitle: "بررسی اطلاعات",
  hotelSpec: "مشخصات رزرو هتل",
  hotelTable: {
    headers: ["نام هتل", "مقصد", "ورود", "خروج", "مدت اقامت"],
    rows: [
      ["هتل آپارتمان جمالی", "مشهد", "سه‌شنبه 14 بهمن", "جمعه 17 بهمن", "3 شب"],
    ],
  },
  roomSpec: "مشخصات اتاق",
  roomTable: {
    headers: ["ظرفیت", "اتاق", "خدمات"],
    rows: [["2", "اتاق دو تخته استاندارد", "صبحانه"]],
  },
  passengerSpec: "مشخصات مسافر",
  passengerTable: {
    headers: [
      "ردیف",
      "عنوان",
      "نام و نام خانوادگی",
      "ملیت",
      "تاریخ تولد",
      "شماره ملی",
    ],
    rows: [
      ["بزرگسال", "آقا", "amir sadeghi", "ایرانی", "1367-03-03", "0386022887"],
    ],
  },
  contactSpec: "اطلاعات تماس",
  contactTable: {
    headers: ["تلفن همراه", "تلفن ثابت", "ایمیل"],
    rows: [["09981826109", "", ""]],
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
  departureTime: "6:00",
  departureCity: "تهران",
  arrivalTime: "7:00",
  arrivalCity: "تهران",
  dotsCount: 8,
  cancellationRules: "قوانین جریمه و استرداد",
  charter: "چارتری",
  invoiceZero: "صورتحاسب صفر",
  confirmButton: "تایید و ادامه",
  icons: {
    arrowLeft: faArrowLeft,
    plane: faPlane,
    circleDot: faCircleDot,
    plus: faPlus,
  },
};

export default function BookingReview() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gateway");
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (title) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
    <HeaderBuyRoom currentStep={2} /> 
      <section>
        <div className="container">
          <div className="Right" style={{ width: "100%" }}>
            <div className="Card">
              <div className="Sec">
                <div className="Titel">
                  <p>{PAGE_DATA.reviewTitle}</p>
                </div>
                <h3>{PAGE_DATA.hotelSpec}</h3>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.hotelTable.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.hotelTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
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
                  <p>{PAGE_DATA.roomSpec}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.roomTable.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.roomTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
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
                  <p>{PAGE_DATA.passengerSpec}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.passengerTable.headers.map(
                          (header, index) => (
                            <th key={index}>{header}</th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.passengerTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="Titel">
                  <p>{PAGE_DATA.contactSpec}</p>
                </div>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {PAGE_DATA.contactTable.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAGE_DATA.contactTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
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
                          icon={PAGE_DATA.icons.plus}
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
          <div className="left2">
            <div className="card2">
              <span>{PAGE_DATA.invoiceZero}</span>
            </div>
            <button>
              {PAGE_DATA.confirmButton}{" "}
              <FontAwesomeIcon icon={PAGE_DATA.icons.arrowLeft} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
