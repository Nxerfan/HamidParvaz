"use client";
import "../global.css";
import SecondHeader from "../../components/(Headers)/SecondHeader";
import { useState } from "react";

const PAGE_DATA = {
  hero: {
    title: "پیگیری و کنسلی رزرو هتل",
    description:
      "وضعیت رزرو هتل خود را بررسی کنید یا درخواست استرداد ثبت کنید.",
  },
  search: {
    fields: [
      {
        label: "شماره موبایل یا ایمیل",
        placeholder: "مثال: 09121234567",
        type: "text",
      },
      {
        label: "کد رزرو هتل / شماره پیگیری",
        placeholder: "مثال: HT-45892",
        type: "text",
      },
    ],
    buttonText: "جستجو",
  },
  sectionTitle: "جزئیات رزرو شما",
  booking: {
    typeBadge: "هتل پارسیان کیش",
    bookingLabel: "شماره رزرو:",
    bookingID: "HT-45892",
    status: "تایید شده",
    statusClass: "success",
    route: {
      from: {
        Time: "۱۴۰۳/۰۱/۱۰",
        InOrOut: "ورود (Check-in)",
      },
      to: {
        Time: "۱۴۰۳/۰۱/۱۵",
        InOrOut: "خروج (Check-out)",
      },
    },
    passengerLabel: "نام مسافر: علی علوی",
    passengers: "۱ بزرگسال",
    airlineLabel: "نوع اتاق:",
    airline: " سوئیت رویال",
    actions: [
      { text: "دانلود  واچر", className: "BtnSecondary" },
      { text: "درخواست کنسلی", className: "BtnDanger" },
      { text: "پشتیبانی", className: "BtnSecondary" },
    ],
  },
  policy: {
    title: "قوانین استرداد هتل",
    items: [
      "لغو رزرو تا ۷۲ ساعت قبل از ورود بدون جریمه انجام می‌شود. ",
      "لغو رزرو کمتر از ۷۲ ساعت قبل از ورود شامل جریمه یک شب اقامت خواهد بود. ",
      "مبلغ استرداد حداکثر تا ۷۲ ساعت کاری به حساب مسافر واریز می‌گردد. ",
    ],
  },
};

export default function TrackPage() {
  const [searchValues, setSearchValues] = useState<string[]>(["", ""]);
  const [searchResult, setSearchResult] = useState<
    "not_searched" | "found" | "not_found"
  >("not_searched");

  const handleSearch = () => {
    const code = searchValues[1]?.trim().toUpperCase();
    if (!code) {
      alert("لطفاً کد پیگیری را وارد کنید.");
      return;
    }
    setSearchResult(
      code === PAGE_DATA.booking.bookingID ? "found" : "not_found",
    );
  };

  const updateField = (index: number, value: string) => {
    setSearchValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <>
      <SecondHeader />
      <div className="TrackContainer">
        <div className="TrackHero">
          <h1>{PAGE_DATA.hero.title}</h1>
          <p>{PAGE_DATA.hero.description}</p>
        </div>

        <div className="SearchCard">
          <div className="Grid2">
            {PAGE_DATA.search.fields.map((field, index) => (
              <div key={index} className="Field">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={searchValues[index]}
                  onChange={(e) => updateField(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="SubmitArea">
            <button className="SubmitBtn" onClick={handleSearch}>
              {PAGE_DATA.search.buttonText}
            </button>
          </div>
        </div>

        {searchResult === "not_found" && (
          <div className="NotFoundCard">
            <h3>رزروی با این مشخصات یافت نشد</h3>
            <p>لطفاً کد پیگیری را بررسی کنید و دوباره تلاش کنید.</p>
          </div>
        )}
        {searchResult === "found" && (
          <>
            <h2 className="SectionTitle">{PAGE_DATA.sectionTitle}</h2>

            <div className="BookingResultCard">
              <div className="ResultHeader">
                <div className="TypeBadge">{PAGE_DATA.booking.typeBadge}</div>
                <div className="BookingID">
                  {PAGE_DATA.booking.bookingLabel}{" "}
                  <span>{PAGE_DATA.booking.bookingID}</span>
                </div>
                <div className={`StatusBadge ${PAGE_DATA.booking.statusClass}`}>
                  {PAGE_DATA.booking.status}
                </div>
              </div>

              <div className="ResultBody">
                <div className="TravelInfo">
                  <div className="Route">
                    <div className="Point">
                      <strong>{PAGE_DATA.booking.route.from.Time}</strong>
                      <span>{PAGE_DATA.booking.route.from.InOrOut}</span>
                    </div>
                    <div className="Line"></div>
                    <div className="Point">
                      <strong>{PAGE_DATA.booking.route.to.Time}</strong>
                      <span>{PAGE_DATA.booking.route.to.InOrOut}</span>
                    </div>
                  </div>

                  <div className="PassengerInfo">
                    <span>
                      {PAGE_DATA.booking.passengerLabel}{" "}
                      <strong>{PAGE_DATA.booking.passengers}</strong>
                    </span>
                    <span>
                      {PAGE_DATA.booking.airlineLabel}{" "}
                      <strong>{PAGE_DATA.booking.airline}</strong>
                    </span>
                  </div>
                </div>

                <div className="ActionButtons">
                  {PAGE_DATA.booking.actions.map((action, index) => (
                    <button key={index} className={action.className}>
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="PolicyCard">
          <div className="SectionTitle">{PAGE_DATA.policy.title}</div>
          <div className="PolicyContent">
            <ul>
              {PAGE_DATA.policy.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
