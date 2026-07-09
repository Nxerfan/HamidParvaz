"use client";
import { Suspense, useState, useEffect, useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "../../../actions/booking";
import type { BookingState } from "../../../actions/booking";
import { useToast } from "../../../lib/hooks/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlane,
  faPlus,
  faChevronDown,
  faUsers,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import "../../../reserve/global.css";
import HeaderBuyRoom from "../../../components/(Headers)/HeaderBuyRoom";

const PAGE_DATA = {
  flightInfo: {
    originCity: "تهران",
    destinationCity: "تهران",
    departureTime: "6:00",
    arrivalTime: "7:00",
    penaltyText: "قوانین جریمه و استرداد",
    charterBadge: "چارتری",
    dotCount: 28,
    airplaneIcon: "✈",
  },
  bill: {
    title: "صورتحساب",
    totalLabel: "مجموع",
    currency: "تومان",
    pricePerPassenger: "9,572,000",
    totalPrice: "9,772,000",
    passengerCountLabel: "مسافر",
  },
  contactInfo: {
    title: "اطلاعات تماس",
    mobilePlaceholder: "0912...",
    phonePlaceholder: "021...",
    emailPlaceholder: "Email@example.com",
  },
  flightSummary: {
    originTime: "6:00",
    originCity: "تهران",
    destTime: "7:00",
    destCity: "تهران",
    rules: "قوانین جریمه و استرداد",
    charter: "چارتری",
  },
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
  invoiceZero: "صورتحساب",
  confirmButton: "تایید و ادامه",
  icons: {
    arrowLeft: faArrowLeft,
    plane: faPlane,
    circleDot: faCircleDot,
    plus: faPlus,
  },
};

function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BookingReviewContent() {
  const searchParams = useSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gateway");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const [isBillOpen, setIsBillOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [bookingState, bookingFormAction, isBookingPending] = useActionState(createBooking, { success: false, message: "" } as BookingState);
  const [passengers] = useState([
    {
      id: 1,
      type: "adult",
      typeLabel: "بزرگسال",
      gender: "آقا",
      nationality: "iranian",
    },
  ]);

  useEffect(() => {
    if (bookingState.success && bookingState.bookingId) {
      router.push("/userpanel/tracking");
    } else if (bookingState.message) {
      toast.error(bookingState.message);
    }
  }, [bookingState, router, toast]);

  const handleConfirm = () => {
    const fd = new FormData();
    fd.set("type", "flight");
    fd.set("itemId", invoiceOrigin + "-" + invoiceDestination);
    fd.set("passengerName", passengers[0]?.typeLabel || "");
    fd.set("passengerPhone", PAGE_DATA.contactTable.rows[0]?.[0] || "");
    fd.set("date", invoiceOrigin);
    fd.set("passengers", invoicePassengers);
    bookingFormAction(fd);
  };

  const invoicePassengers = searchParams.get('passengers') || passengers.length.toString();
  const invoiceOrigin = searchParams.get('origin') || PAGE_DATA.flightInfo.originCity;
  const invoiceDestination = searchParams.get('destination') || PAGE_DATA.flightInfo.destinationCity;
  const invoicePrice = searchParams.get('price') || '1500000';
  const formattedPrice = formatPrice(Number(invoicePrice));

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <HeaderBuyRoom currentStep={2} />
      <section>
        <div className="container">
          <div className="Right" style={{ width: "100%" }}>
            {/* کارت اطلاعات هتل */}
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

            {/* کارت مشخصات اتاق */}
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

            {/* کارت مشخصات مسافر و اطلاعات تماس */}
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

            {/* کارت روش‌های پرداخت و آکاردئون */}
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
                  className={`bankListWrapper ${
                    selectedPaymentMethod === "gateway" ? "open" : ""
                  }`}
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

          {/* سمت چپ - اطلاعات پرواز و صورتحساب */}
          <div className="left">
            {/* کارت اطلاعات پرواز (card1) */}
            <div className="card1">
              <div className="top">
                <div className="Time">
                  <div className="Form">
                    <span>{PAGE_DATA.flightInfo.departureTime}</span>
                    <p>{PAGE_DATA.flightInfo.originCity}</p>
                  </div>
                  <div className="i">
                    {Array.from({ length: PAGE_DATA.flightInfo.dotCount }).map(
                      (_, idx) => (
                        <span key={idx}>•</span>
                      ),
                    )}
                    <span>{PAGE_DATA.flightInfo.airplaneIcon}</span>
                  </div>
                  <div className="Form">
                    <span>{PAGE_DATA.flightInfo.arrivalTime}</span>
                    <p>{PAGE_DATA.flightInfo.destinationCity}</p>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <p>{PAGE_DATA.flightInfo.penaltyText}</p>
                <div className="Avablity">
                  <span>{PAGE_DATA.flightInfo.charterBadge}</span>
                </div>
              </div>
            </div>

            {/* کارت صورتحساب (card2) */}
            <div className="invoiceContainer">
              <div className="invoiceHeader" onClick={() => setIsBillOpen(!isBillOpen)}>
                <div className="invoiceHeaderRight">
                  <span className="invoiceHeaderTitle">{PAGE_DATA.bill.title}</span>
                  <FontAwesomeIcon icon={faChevronDown} className={`invoiceChevron ${isBillOpen ? "open" : ""}`} />
                </div>
                <span className="invoiceHeaderPrice">{formattedPrice} تومان</span>
              </div>
              <div className={`invoiceBody ${isBillOpen ? "open" : ""}`}>
                <div className="invoiceBodyInner">
                  <div className="invoiceRow">
                    <span className="invoiceRowLabel"><FontAwesomeIcon icon={faUsers} /> تعداد مسافران</span>
                    <span className="invoiceRowValue">{invoicePassengers} نفر</span>
                  </div>
                  <div className="invoiceRow">
                    <span className="invoiceRowLabel"><FontAwesomeIcon icon={faPlane} /> مبدا</span>
                    <span className="invoiceRowValue">{invoiceOrigin}</span>
                  </div>
                  <div className="invoiceRow">
                    <span className="invoiceRowLabel"><FontAwesomeIcon icon={faPlane} /> مقصد</span>
                    <span className="invoiceRowValue">{invoiceDestination}</span>
                  </div>
                  <div className="invoiceDivider" />
                  <div className="invoiceTotalRow">
                    <span className="invoiceRowLabel"><FontAwesomeIcon icon={faGem} /> قیمت کل</span>
                    <span className="invoiceRowValue">{formattedPrice} تومان</span>
                  </div>
                </div>
              </div>
              <button onClick={handleConfirm} disabled={isBookingPending} style={{ width: "100%", marginTop: 0, borderRadius: "0 0 12px 12px" }}>
                {isBookingPending ? "در حال پردازش..." : PAGE_DATA.confirmButton}{" "}
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookingReview() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>در حال بارگذاری...</div>}>
      <BookingReviewContent />
    </Suspense>
  );
}
