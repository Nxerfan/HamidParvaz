"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowLeft,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import HeaderAutoReserve from "../../components/(Headers)/HeaderAutoReserve";

const PAGE_DATA = {
  mainTitle: "مشخصات «موجود شد رزرو کن»",
  flight: {
    route: "هواپیما تهران به کیش",
    date: "شنبه 11 بهمن",
  },
  availableFlights: [
    {
      logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=TKN",
      airline: "فلای کیش",
      time: "ساعت‌ پرواز 17:45",
    },
    {
      logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=TKN",
      airline: "فلای کیش",
      time: "ساعت‌ پرواز 17:45",
    },
    {
      logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=TKN",
      airline: "فلای کیش",
      time: "ساعت‌ پرواز 17:45",
    },
    {
      logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=TKN",
      airline: "فلای کیش",
      time: "ساعت‌ پرواز 17:45",
    },
  ],
  passengerTitle: "مشخصات مسافر",
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
      {
        row: "بزرگسال",
        gender: "آقا",
        name: "amir sadeghi",
        nationality: "ایرانی",
        birth: "1367-03-03",
        nationalId: "0386022887",
      },
    ],
  },
  contactTitle: "اطلاعات تماس",
  contactTable: {
    headers: ["تلفن همراه", "تلفن ثابت", "ایمیل"],
    row: { mobile: "09981826109", phone: "", email: "" },
  },
  autoReserve: {
    title: "خدمات رزرو خودکار",
    costTitle: "هزینه خدمات رزرو خودکار در این مسیر",
    cost: "200,000",
    currency: "تومانء",
    paymentText: "پرداخت هزینه خدمات با امتیاز کاربری",
    pointsNeeded: "امتیاز کاربری کافی نیست! 8500 امتیاز دیگر کسب کنید!",
    rulesTitle: "شرایط و قوانین",
    rules: [
      "هزینه خدمات رزرو خودکار در صورت عدم موفقیت در یافتن بلیط مورد نظر و یا غیرفعال کردن رزرو توسط کاربر، به طور کامل بازگشت داده خواهد شد.",
      "شرایط کنسلی بلیط خریداری شده از طریق رزرو خودکار مشابه بلیط‌های معمولی، مطابق شرایط کنسلی پرواز یا اتوبوس رزرو شده، خواهد بود.",
      "همواره می‌توانید رزروهای خودکار فعال را از طریق پنل کاربری خود در بخش مدیریت رزروهای خودکار، غیرفعال یا ویرایش کنید. تا قبل از صدور بلیط توسط رزرو خودکار، کنسل کردن رزرو هیچ جریمه‌ای نخواهد داشت.",
      "فعالسازی رزرو خودکار به منزله پذیرش کلیه شرایط و مقررات و سیاست حفظ حریم خصوصی مِستربلیط است",
    ],
  },
  reward: {
    icon: faShieldHalved,
    text: "200 امتیاز دریافتی از این سفر",
  },
  bill: {
    title: "صورت حساب سفر",
    items: [
      { desc: "1 بزرگسال", amount: "9,572,000" },
      { desc: "1 هزینه رزرو خودکار", amount: "200000" },
      { desc: "مجموع", amount: "9,772,000", currency: "تومان", border: true },
      { desc: "اعتبار موجود", amount: "0", currency: "تومان" },
      {
        desc: "شارژ آنلاین مورد نیاز",
        amount: "9,572,000",
        currency: "تومان",
        red: true,
      },
    ],
  },
  confirmBtn: {
    text: "تایید و افزایش اعتبار کاربری",
    icon: faArrowLeft,
  },
};

const NiksaAutoReserveConfirm = () => {
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [autoReserveEnabled, setAutoReserveEnabled] = useState(false);

  const handleBillToggle = () => setIsBillOpen((prev) => !prev);

  return (
    <>
      <HeaderAutoReserve currentStep={4} />
      <div className="container">
        <div className="Right2">
          {/* کارت اصلی مشخصات رزرو */}
          <div className="Card Card2">
            <div className="TopCard">
              <p>{PAGE_DATA.mainTitle}</p>
            </div>
            <div className="Sec BottomCard">
              <div className="Titel">
                <p>{PAGE_DATA.flight.route}</p>
                <p>{PAGE_DATA.flight.date}</p>
              </div>
              <div className="AvableFlights">
                {PAGE_DATA.availableFlights.map((flight, index) => (
                  <div key={index} className="Option">
                    <div className="R">
                      <img src={flight.logo} alt="" />
                      <p>{flight.airline}</p>
                    </div>
                    <div className="L">
                      <p>{flight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* کارت مشخصات مسافر و تماس */}
          <div className="Card">
            <div className="Sec">
              <div className="Titel">
                <p>{PAGE_DATA.passengerTitle}</p>
              </div>
              <div className="table">
                <table>
                  <tr>
                    {PAGE_DATA.passengerTable.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                  {PAGE_DATA.passengerTable.rows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.row}</td>
                      <td>{row.gender}</td>
                      <td>{row.name}</td>
                      <td>{row.nationality}</td>
                      <td>{row.birth}</td>
                      <td>{row.nationalId}</td>
                    </tr>
                  ))}
                </table>
              </div>

              <div className="Titel">
                <p>{PAGE_DATA.contactTitle}</p>
              </div>
              <div className="table">
                <table>
                  <tr>
                    {PAGE_DATA.contactTable.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                  <tr>
                    <td>{PAGE_DATA.contactTable.row.mobile}</td>
                    <td>{PAGE_DATA.contactTable.row.phone}</td>
                    <td>{PAGE_DATA.contactTable.row.email}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          {/* کارت خدمات رزرو خودکار */}
          <div className="Card">
            <div className="TopCard">
              <p>{PAGE_DATA.autoReserve.title}</p>
            </div>
            <div className="BottomCard">
              <div className="TextTi">
                <p>{PAGE_DATA.autoReserve.costTitle}</p>
                <p>
                  {PAGE_DATA.autoReserve.cost}{" "}
                  <span>{PAGE_DATA.autoReserve.currency}</span>
                </p>
              </div>
              <div className="Enable">
                <div className="R">
                  <FontAwesomeIcon icon={PAGE_DATA.reward.icon} />
                  <div className="Content">
                    <p>{PAGE_DATA.autoReserve.paymentText}</p>
                    <p>{PAGE_DATA.autoReserve.pointsNeeded}</p>
                  </div>
                </div>
                <div className="L">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={autoReserveEnabled}
                      onChange={(e) => setAutoReserveEnabled(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="Rules">
                <p>{PAGE_DATA.autoReserve.rulesTitle}</p>
                <div className="RulesList">
                  <ul>
                    {PAGE_DATA.autoReserve.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* کارت امتیاز */}
          <div className="Card">
            <div className="BottomCard" style={{ padding: 0 }}>
              <div className="Titel">
                <div className="R">
                  <FontAwesomeIcon icon={PAGE_DATA.reward.icon} />
                  <p>{PAGE_DATA.reward.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش چپ - صورت حساب */}
        <div className="left2">
          <div className="card2 Card2">
            <div className="T" onClick={handleBillToggle}>
              <span>{PAGE_DATA.bill.title}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            <div className={`SeeMore ${isBillOpen ? "active" : ""}`}>
              <div className="MoreDetails" style={{ padding: 0 }}>
                <div className="Spand">
                  {PAGE_DATA.bill.items.map((item, index) => (
                    <div
                      key={index}
                      className={`items ${item.border ? "borderTopBottom" : ""} ${item.red ? "red" : ""}`}
                    >
                      <p>{item.desc}</p>
                      <p>
                        {item.amount}
                        {item.currency && <span>{item.currency}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button>
              {PAGE_DATA.confirmBtn.text}
              <FontAwesomeIcon icon={PAGE_DATA.confirmBtn.icon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NiksaAutoReserveConfirm;
