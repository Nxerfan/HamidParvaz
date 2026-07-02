"use client";
import "../global.css";
import Image from "next/image";
import HeaderMakeYourTour from "../../../components/(Headers)/HeaderMakeYourTour";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "../../../actions/booking";
import type { BookingState } from "../../../actions/booking";
import { useToast } from "../../../lib/hooks/useToast";
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
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gateway");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const [bookingState, bookingFormAction, isBookingPending] = useActionState(createBooking, { success: false, message: "" } as BookingState);
  const toast = useToast();

  useEffect(() => {
    if (bookingState.success && bookingState.bookingId) {
      router.push("/userpanel/tracking");
    } else if (bookingState.message) {
      toast.error(bookingState.message);
    }
  }, [bookingState, router]);

  const handleConfirm = () => {
    const fd = new FormData();
    fd.set("type", "tour");
    fd.set("itemId", PAGE_DATA.hotel.name);
    fd.set("passengerName", PAGE_DATA.passengerSection.passengers[0]?.name || "");
    fd.set("passengerPhone", PAGE_DATA.passengerSection.contactNumber);
    fd.set("date", PAGE_DATA.hotel.details[0].value);
    fd.set("passengers", PAGE_DATA.passengerSection.passengers.length.toString());
    bookingFormAction(fd);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <HeaderMakeYourTour currentStep={5}/>
      <div className="Countainer">
        <div className="Right">
          <div className="sidebarFilters">
            <div className="sidebarHeader">
              <svg className="sidebarHeaderIcon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>{PAGE_DATA.rightSidebar.summary.title}</span>
            </div>

            <div className="hotelMiniCard">
              <div className="hotelMiniTop">
                <div className="hotelMiniImgWrap">
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={PAGE_DATA.hotel.image} alt={PAGE_DATA.hotel.name} fill sizes="80px" unoptimized style={{ objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                </div>
                <div className="hotelMiniMeta">
                  <div className="hotelMiniName">{PAGE_DATA.hotel.name}</div>
                  <div className="hotelMiniStars">
                    {[...Array(PAGE_DATA.hotel.stars)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" width="12" height="12" fill="#caa23f">
                        <path d="M10 1l2.39 4.84L17.6 6.7l-3.8 3.7.9 5.24L10 13.2l-4.7 2.46.9-5.24-3.8-3.7 5.21-.86L10 1z" />
                      </svg>
                    ))}
                    <span className="hotelMiniStarsText">{PAGE_DATA.hotel.stars} ستاره</span>
                  </div>
                </div>
                <button className="editBtn" title="ویرایش هتل" onClick={() => router.push("/tour/make-your-own/hotel")}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="hotelMiniDetails">
                <div className="hotelMiniDetail">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{PAGE_DATA.hotel.location}</span>
                </div>
                <div className="hotelMiniOptions">
                  {PAGE_DATA.hotel.options.map((opt, i) => (
                    <span key={i} className="hotelMiniBadge">{opt}</span>
                  ))}
                </div>
              </div>
              <div className="hotelMiniDates">
                <div className="hotelMiniDate">
                  <span className="hotelMiniDateLabel">ورود</span>
                  <span className="hotelMiniDateValue">{PAGE_DATA.hotel.details[0].value}</span>
                </div>
                <div className="hotelMiniDateSep" />
                <div className="hotelMiniDate">
                  <span className="hotelMiniDateLabel">خروج</span>
                  <span className="hotelMiniDateValue">{PAGE_DATA.hotel.details[1].value}</span>
                </div>
                <div className="hotelMiniDateSep" />
                <div className="hotelMiniDate">
                  <span className="hotelMiniDateLabel">مدت</span>
                  <span className="hotelMiniDateValue highlight">{PAGE_DATA.hotel.details[2].value}</span>
                </div>
              </div>
              <div className="hotelMiniRoom">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{PAGE_DATA.passengerSection.passengers[0].room}</span>
                <span className="hotelMiniRoomDivider">·</span>
                <span>{PAGE_DATA.passengerSection.passengers.length} مسافر</span>
              </div>
            </div>

            {PAGE_DATA.rightSidebar.flights.map((flight, fi) => (
              <div key={flight.id} className="card flightCard">
                <div className="flightCardHeader">
                  <div className="flightCardTitle">
                    <div className={`flightIconWrap ${fi === 0 ? "outbound" : "return"}`}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </div>
                    {flight.title}
                  </div>
                  <button className="editBtn sm" title="ویرایش پرواز" onClick={() => router.push("/tour/make-your-own/flight/away")}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <div className="timeline">
                  {flight.lines.map((line, index) => (
                    <div key={index} className={`timelineItem ${index === 0 ? "first" : ""} ${index === flight.lines.length - 1 ? "last" : ""}`}>
                      <div className="timelineDotCol">
                        <div className={`timelineDot ${index === 0 ? "origin" : "dest"}`}>
                          <div className="timelineDotInner" />
                        </div>
                        {index < flight.lines.length - 1 && <div className="timelineConnector" />}
                      </div>
                      <div className="timelineInfo">
                        <span className="timelineAirport">{line.airport}</span>
                        <span className="timelineTime">{line.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="payCard">
              <div className="payCardRows">
                <div className="payRow">
                  <span className="payRowLabel">قیمت پایه</span>
                  <span className="payRowValue">0 تومان</span>
                </div>
                <div className="payRow discount">
                  <span className="payRowLabel">تخفیف</span>
                  <span className="payRowValue">0 تومان</span>
                </div>
                <div className="payRow gift">
                  <span className="payRowLabel">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                    کد تخفیف
                  </span>
                  <span className="payRowValue">ثبت نشده</span>
                </div>
              </div>
              <div className="payDivider" />
              <div className="payTotal">
                <span className="payTotalLabel">{PAGE_DATA.rightSidebar.summary.priceLabel}</span>
                <div className="payTotalValueWrap">
                  <span className="payTotalValue">{PAGE_DATA.rightSidebar.summary.priceValue}</span>
                </div>
              </div>
              <button className="payButton" onClick={handleConfirm} disabled={isBookingPending}>
                <span>{isBookingPending ? "در حال پردازش..." : "پرداخت و تکمیل سفارش"}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="Left">
          <div className="Titel">
            <FontAwesomeIcon icon={PAGE_DATA.hotel.header.icon} />
            <p>{PAGE_DATA.hotel.header.text}</p>
          </div>

          <div className="MediaElementHotel">
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image src={PAGE_DATA.hotel.image} alt={PAGE_DATA.hotel.name} fill sizes="(max-width: 768px) 100vw, 600px" unoptimized style={{ objectFit: "cover" }} />
            </div>
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
