"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faPlane,
  faClock,
  faAngleDown,
  faBell,
  faBolt,
  faCheck,
  faXmark,
  faArrowLeft,
  faSuitcase,
  faWallet,
  faMagnifyingGlass,
  faTicket,
  faShieldHalved,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/(Headers)/SecondHeader";
import Form from "../../components/(Forms)/FormType2";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import FilterSidebar from "../../components/(filters)/FilterSidebar";
import FilterAccordion from "../../components/(filters)/FilterAccordion";
import PriceRangeFilter from "../../components/(filters)/PriceRangeFilter";
import CheckboxFilter from "../../components/(filters)/CheckboxFilter";
import "../../components/(filters)/FiltersGlobal.css";
import "./globals.css";

interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  price: number;
  flightClass: "economy" | "business";
  baggage: string;
  departureHour: number;
  arrivalHour: number;
  seats: number;
  tags: string[];
  classRate: string;
  available: boolean;
}

const flightsData: Flight[] = [
  {
    id: 1,
    airline: "چابهار",
        airlineCode: "IRU",
        logo: "/airlines/IRU.svg",
    departureTime: "06:00",
    arrivalTime: "07:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1802400,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 6,
    arrivalHour: 7,
    seats: 6,
    tags: [],
    classRate: "Y",
    available: true,
  },
  {
    id: 2,
    airline: "فلای کیش",
        airlineCode: "KIS",
        logo: "/airlines/KIS.svg",
    departureTime: "09:30",
    arrivalTime: "10:45",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2100000,
    flightClass: "economy",
    baggage: "25kg",
    departureHour: 9,
    arrivalHour: 10,
    seats: 12,
    tags: [],
    classRate: "M",
    available: true,
  },
  {
    id: 3,
    airline: "کیش ایر",
        airlineCode: "KIA",
        logo: "/airlines/KIA.svg",
    departureTime: "14:15",
    arrivalTime: "15:30",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1950000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 14,
    arrivalHour: 15,
    seats: 8,
    tags: [],
    classRate: "Y",
    available: true,
  },
  {
    id: 4,
    airline: "آتا",
        airlineCode: "ATA",
        logo: "/airlines/ATA.svg",
    departureTime: "20:45",
    arrivalTime: "22:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2500000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 20,
    arrivalHour: 22,
    seats: 4,
    tags: [],
    classRate: "C",
    available: true,
  },
  {
    id: 5,
    airline: "آسمان",
        airlineCode: "ASM",
        logo: "/airlines/ASM.svg",
    departureTime: "07:20",
    arrivalTime: "08:35",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1680000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 7,
    arrivalHour: 8,
    seats: 10,
    tags: ["foreign-restriction"],
    classRate: "Y",
    available: true,
  },
  {
    id: 6,
    airline: "قشم ایر",
        airlineCode: "QES",
        logo: "/airlines/QES.svg",
    departureTime: "12:00",
    arrivalTime: "13:15",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2200000,
    flightClass: "economy",
    baggage: "25kg",
    departureHour: 12,
    arrivalHour: 13,
    seats: 7,
    tags: [],
    classRate: "M",
    available: true,
  },
  {
    id: 7,
    airline: "معراج",
        airlineCode: "MRJ",
        logo: "/airlines/MRJ.svg",
    departureTime: "16:30",
    arrivalTime: "17:45",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2300000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 16,
    arrivalHour: 17,
    seats: 5,
    tags: [],
    classRate: "C",
    available: true,
  },
  {
    id: 8,
    airline: "زاگرس",
        airlineCode: "ZAG",
        logo: "/airlines/ZAG.svg",
    departureTime: "22:10",
    arrivalTime: "23:25",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1450000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 22,
    arrivalHour: 23,
    seats: 0,
    tags: [],
    classRate: "Y",
    available: false,
  },
  {
    id: 9,
    airline: "مهر",
        airlineCode: "MEH",
        logo: "/airlines/MEH.svg",
    departureTime: "05:00",
    arrivalTime: "06:15",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2900000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 5,
    arrivalHour: 6,
    seats: 0,
    tags: [],
    classRate: "J",
    available: false,
  },
  {
    id: 10,
    airline: "اطلس ایر",
        airlineCode: "ATL",
        logo: "/airlines/ATL.svg",
    departureTime: "11:45",
    arrivalTime: "13:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1980000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 11,
    arrivalHour: 13,
    seats: 0,
    tags: [],
    classRate: "Y",
    available: false,
  },
];

const allAirlines = Array.from(
  new Set(flightsData.map((f) => f.airline)),
).sort();
const allBaggageOptions = Array.from(
  new Set(flightsData.map((f) => f.baggage)),
).sort();

const flightRulesData = [
  {
    title: "قوانین استرداد بلیط",
    content:
      "بلیط‌های چارتری تا ۲۴ ساعت قبل از پرواز قابل استرداد می‌باشند. در صورت استرداد کمتر از ۲۴ ساعت قبل از پرواز، جریمه ۳۰ درصدی اعمال می‌شود. بلیط‌های سیستمی تا ۳ ساعت قبل از پرواز بدون جریمه قابل استرداد هستند. لطفاً توجه داشته باشید که هزینه خدمات آنلاین غیرقابل بازگشت است.",
  },
  {
    title: "قوانین بار مجاز",
    content:
      "بار مجاز برای پروازهای اکونومی ۲۰ کیلوگرم و برای پروازهای بیزینس ۳۰ کیلوگرم می‌باشد. حداکثر وزن هر چمدان نباید از ۳۲ کیلوگرم بیشتر شود. بار دستی شامل یک کیف کوچک و یک لپ‌تاپ است. در صورت اضافه بار، هزینه هر کیلوگرم اضافه معادل ۱ درصد قیمت بلیط محاسبه می‌شود.",
  },
  {
    title: "قوانین تغییر بلیط",
    content:
      "تغییر تاریخ پرواز تا ۴۸ ساعت قبل از پرواز با پرداخت جریمه ۱۰ درصدی امکان‌پذیر است. تغییر نام مسافر مجاز نمی‌باشد. ارتقاء کلاس پروازی با پرداخت مابه‌التفاوت امکان‌پذیر است. لطفاً برای تغییرات با پشتیبانی تماس بگیرید.",
  },
  {
    title: "قوانین حضور در فرودگاه",
    content:
      "مسافران باید حداقل ۲ ساعت قبل از پروازهای داخلی و ۳ ساعت قبل از پروازهای خارجی در فرودگاه حضور داشته باشند. کارت شناسایی معتبر (کارت ملی یا پاسپورت) الزامی است. در صورت تأخیر بیش از ۳۰ دقیقه، با پشتیبانی تماس بگیرید. پذیرش مسافران ۴۵ دقیقه قبل از پرواز بسته می‌شود.",
  },
];

function FlightResultsPageContent() {
  const searchParams = useSearchParams();
  const airportParam = searchParams.get("airport") || "";
  const destinationParam = searchParams.get("destination") || "";
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const globalMin = 0;
  const globalMax = 3000000;
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedDepTimes, setSelectedDepTimes] = useState<string[]>([]);
  const [selectedArrTimes, setSelectedArrTimes] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"time" | "price" | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeDetailId, setActiveDetailId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [chancePercent, setChancePercent] = useState(0);

  useEffect(() => {
    if (showPopup) {
      const target = 78;
      const duration = 1200;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setChancePercent(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [showPopup]);

  const filteredFlights = flightsData
    .filter((flight) => {
      if (destinationParam && !flight.destination.includes(destinationParam.trim())) return false;
      if (flight.price < minPrice || flight.price > maxPrice) return false;
      if (
        selectedClasses.length &&
        !selectedClasses.includes(flight.flightClass)
      )
        return false;
      if (selectedDepTimes.length) {
        let match = false;
        for (const range of selectedDepTimes) {
          if (
            range === "0-8" &&
            flight.departureHour >= 0 &&
            flight.departureHour < 8
          )
            match = true;
          if (
            range === "8-18" &&
            flight.departureHour >= 8 &&
            flight.departureHour < 18
          )
            match = true;
          if (
            range === "18-24" &&
            flight.departureHour >= 18 &&
            flight.departureHour <= 24
          )
            match = true;
        }
        if (!match) return false;
      }
      if (selectedArrTimes.length) {
        let match = false;
        for (const range of selectedArrTimes) {
          if (
            range === "0-8" &&
            flight.arrivalHour >= 0 &&
            flight.arrivalHour < 8
          )
            match = true;
          if (
            range === "8-18" &&
            flight.arrivalHour >= 8 &&
            flight.arrivalHour < 18
          )
            match = true;
          if (
            range === "18-24" &&
            flight.arrivalHour >= 18 &&
            flight.arrivalHour <= 24
          )
            match = true;
        }
        if (!match) return false;
      }
      if (selectedAirlines.length && !selectedAirlines.includes(flight.airline))
        return false;
      if (selectedBaggage.length && !selectedBaggage.includes(flight.baggage))
        return false;
      if (selectedTags.length) {
        let hasTag = false;
        for (const tag of selectedTags) {
          if (flight.tags.includes(tag)) hasTag = true;
        }
        if (!hasTag) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "time") return a.departureHour - b.departureHour;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  const availableFlights = filteredFlights.filter((f) => f.available);
  const unavailableFlights = filteredFlights.filter((f) => !f.available);

  const toggleDropdown = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));
  const handleClassChange = (val: string) =>
    setSelectedClasses((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const handleDepTimeChange = (val: string) =>
    setSelectedDepTimes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const handleArrTimeChange = (val: string) =>
    setSelectedArrTimes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const handleAirlineChange = (val: string) =>
    setSelectedAirlines((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const handleBaggageChange = (val: string) =>
    setSelectedBaggage((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const handleTagChange = (val: string) =>
    setSelectedTags((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );




  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filterDropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [activeRuleId, setActiveRuleId] = useState<number | null>(null);
  const [openRuleItem, setOpenRuleItem] = useState<number | null>(null);

  const cheapDays = Array(14).fill({ day: "سه‌شنبه 10/2", price: "1,082,000" });

  const renderFlightCard = (flight: Flight) => {
    const hasForeignRestriction = flight.tags.includes("foreign-restriction");

    // Calculate flight duration
    const [depH, depM] = flight.departureTime.split(":").map(Number);
    const [arrH, arrM] = flight.arrivalTime.split(":").map(Number);
    let durationMin = (arrH * 60 + arrM) - (depH * 60 + depM);
    if (durationMin < 0) durationMin += 1440;
    const durationHours = Math.floor(durationMin / 60);
    const durationMins = durationMin % 60;
    const durationText = durationHours > 0
      ? `${durationHours}h ${durationMins}m`
      : `${durationMins}m`;

    // Seat gauge level based on remaining seats (assuming max ~60)
    const seatRatio = flight.seats / 60;
    const seatLevel = seatRatio < 0.2 ? "low" : seatRatio < 0.5 ? "med" : "high";

    return (
      <div
        className={`Cards ${!flight.available ? "CardsOfline" : ""}`}
        key={flight.id}
      >
        <div className="cardInner">
          {/* Main section: flight info + pricing */}
          <div className="cardMain">
            {/* Left: Airline + Timeline */}
            <div className="cardFlightInfo">
              {/* Airline row */}
              <div className="cardAirlineRow">
                <div className="airlineLogo">
                  <Image src={flight.logo} alt={flight.airline} width={44} height={44} />
                  <div className="airlineDetails">
                    <span className="airlineName">{flight.airline}</span>
                    <span className="airlineCode">{flight.airlineCode}</span>
                  </div>
                </div>
                {hasForeignRestriction && (
                  <span className="tagBadge tagRestricted">
                    <FontAwesomeIcon icon={faBell} style={{ fontSize: 10 }} />
                    محدودیت خرید اتباع
                  </span>
                )}
              </div>

              {/* Flight timeline */}
              <div className="flightTimeline">
                <div className="timelinePoint">
                  <span className="timelineTime">{flight.departureTime}</span>
                  <span className="timelineCity">{flight.origin}</span>
                  <span className="timelineCode">{flight.originCode}</span>
                </div>
                <div className="timelineVisual">
                  <span className="durationBadge">{durationText}</span>
                  <span className="timelineDot" />
                  <span className="timelineLine" />
                  <span className="timelinePlane">
                    <FontAwesomeIcon icon={faPlane} className="fa-flip-horizontal" />
                  </span>
                  <span className="timelineLine" />
                  <span className="timelineDot" />
                </div>
                <div className="timelinePoint">
                  <span className="timelineTime">{flight.arrivalTime}</span>
                  <span className="timelineCity">{flight.destination}</span>
                  <span className="timelineCode">{flight.destinationCode}</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing + CTA */}
            <div className="cardPricing">
              <div className="priceSection">
                <span className="priceValue">{flight.price.toLocaleString("fa-IR")}</span>
                <span className="priceLabel">تومان</span>
              </div>
              <span className="pricePerPerson">قیمت هر نفر</span>
              {flight.available ? (
                <Link href="/flight/reserve/form">
                  <button className="btnReserve">
                    <span>رزرو آنلاین</span>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 12 }} />
                  </button>
                </Link>
              ) : (
                <button className="btnAutoReserve" onClick={() => setShowPopup(true)}>
                  <FontAwesomeIcon icon={faBolt} />
                  <span>رزرو خودکار</span>
                </button>
              )}
            </div>
          </div>

          {/* Meta info row */}
          <div className="cardMetaRow">
            <span className="metaItem">
              <FontAwesomeIcon icon={faCircleDot} style={{ fontSize: 10, color: flight.flightClass === "economy" ? "#4caf50" : "#ff9800" }} />
              {flight.flightClass === "economy" ? "اکونومی" : "بیزنس"}
            </span>
            <span className="metaItem">
              <FontAwesomeIcon icon={faSuitcase} style={{ fontSize: 10 }} />
              {flight.baggage}
            </span>
            <span className="metaItem">
              <FontAwesomeIcon icon={faClock} style={{ fontSize: 10 }} />
              {durationHours} ساعت {durationMins} دقیقه
            </span>
            {flight.available ? (
              <span className={`seatGauge seatGauge${seatLevel.charAt(0).toUpperCase() + seatLevel.slice(1)}`}>
                <div className="seatGaugeBar">
                  <div className="seatGaugeFill" style={{ width: `${Math.max(5, seatRatio * 100)}%` }} />
                </div>
                {flight.seats} صندلی
              </span>
            ) : (
              <span className="metaItem metaSoldOut">
                <FontAwesomeIcon icon={faXmark} style={{ fontSize: 10 }} />
                ظرفیت تکمیل
              </span>
            )}
          </div>

          {/* Toggle actions */}
          <div className="cardActions">
            <button
              className={`actionToggle ${activeDetailId === flight.id ? "active" : ""}`}
              onClick={() => setActiveDetailId(activeDetailId === flight.id ? null : flight.id)}
            >
              <FontAwesomeIcon icon={faAngleDown} />
              جزئیات پرواز
            </button>
            <button
              className={`actionToggle ${activeRuleId === flight.id ? "active" : ""}`}
              onClick={() => setActiveRuleId(activeRuleId === flight.id ? null : flight.id)}
            >
              <FontAwesomeIcon icon={faAngleDown} />
              قوانین پرواز
            </button>
          </div>
        </div>

        {/* Expandable flight details */}
        <div className={`flightDetails ${activeDetailId === flight.id ? "active" : ""}`}>
          <div className="detailsContent">
            <div className="detailsInfo">
              <div className="detailsHeader">
                {flight.origin} به {flight.destination} — {flight.departureTime} تا {flight.arrivalTime}
                <span style={{ marginRight: 8, borderRight: "1px solid #ddd", paddingRight: 8 }}>
                  کلاس نرخی {flight.classRate}
                </span>
              </div>
              <div className="detailsBody">
                <div className="detailCol">
                  <span className="detailLabel">ساعت حرکت</span>
                  <span className="detailValue">
                    {flight.departureTime} — {flight.origin}، فرودگاه مهرآباد ({flight.originCode})
                  </span>
                  <span className="detailLabel">ساعت رسیدن</span>
                  <span className="detailValue">
                    {flight.arrivalTime} — {flight.destination}، فرودگاه کیش ({flight.destinationCode})
                  </span>
                </div>
                <div className="detailCol">
                  <span className="detailLabel">مدت پرواز</span>
                  <span className="detailValue">{durationHours} ساعت و {durationMins} دقیقه</span>
                  <span className="detailLabel">نوع پرواز</span>
                  <span className="detailValue">سیستمی</span>
                </div>
              </div>
            </div>
            <div className="detailsSummary">
              <div className="summaryRow">
                <span>بزرگسال × 1</span>
                <span className="summaryValue">{flight.price.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="summaryRow">
                <span>مالیات و عوارض</span>
                <span className="summaryValue">شامل</span>
              </div>
              <div className="summaryRow summaryTotal">
                <span className="summaryLabel">مجموع</span>
                <span className="summaryValue">{flight.price.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="detailsActions">
                <button onClick={() => setShowPopup(true)}>
                  <FontAwesomeIcon icon={faBell} />{" "}
                  {flight.available ? "ارزان شد خبرم کن" : "موجود شد خبرم کن"}
                </button>
                <button onClick={() => setShowPopup(true)}>
                  <FontAwesomeIcon icon={faBolt} />{" "}
                  {flight.available ? "ارزان شد رزرو کن" : "موجود شد رزرو کن"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable flight rules */}
        <div className={`flightRules ${activeRuleId === flight.id ? "active" : ""}`}>
          <div className="rulesContent">
            {flightRulesData.map((rule, rIdx) => {
              const isRuleOpen = activeRuleId === flight.id && openRuleItem === rIdx;
              return (
                <div key={rIdx} className="ruleItem">
                  <div
                    className={`ruleHeader ${isRuleOpen ? "active" : ""}`}
                    onClick={() => setOpenRuleItem(isRuleOpen ? null : rIdx)}
                  >
                    <span>{rule.title}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                  <div className={`ruleBody ${isRuleOpen ? "active" : ""}`}>
                    <p>{rule.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const chanceStatus =
    chancePercent < 35 ? "low" : chancePercent < 70 ? "mid" : "high";
  const chanceMessage =
    chancePercent < 35
      ? "شانس پیدا شدن این پرواز پایین و پرریسک است."
      : chancePercent < 70
        ? "شانس پیدا شدن متوسط و وابسته به شرایط است."
        : "شانس پیدا شدن این پرواز بالا و امیدوارکننده است.";

  return (
    <>
      <Header />
      <main className="flight-results-page">
        <Form />
        <section>
          <div className="Countainer">
            <div className="Right">
              <div className="Title">
                <span>بلیط هواپیما{airportParam ? ` ${airportParam}` : " تهران به کیش"}</span>
              </div>

              <div className="NotifMe">
                <div className="Bell">
                  <FontAwesomeIcon icon={faBell} />
                  <span>ارزان شد خبرم کن</span>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="Sort">
                <span>مرتب‌سازی بر اساس</span>
                <div className="Choosen">
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => setSortBy("time")}
                      checked={sortBy === "time"}
                    />
                    زود‌ترین زمان
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => setSortBy("price")}
                      checked={sortBy === "price"}
                    />
                    کمترین قیمت
                  </label>
                </div>
              </div>

              <FilterSidebar
                resultCount={`نمایش ${filteredFlights.length} از ${flightsData.length} نتیجه`}
              >
                <FilterAccordion
                  title="قیمت"
                  isOpen={openDropdown === "price"}
                  onToggle={() => toggleDropdown("price")}
                >
                  <PriceRangeFilter
                    min={minPrice}
                    max={maxPrice}
                    globalMin={globalMin}
                    globalMax={globalMax}
                    step={10000}
                    onMinChange={(val) => {
                      if (val <= maxPrice) setMinPrice(val);
                    }}
                    onMaxChange={(val) => {
                      if (val >= minPrice) setMaxPrice(val);
                    }}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="کلاس پروازی"
                  isOpen={openDropdown === "class"}
                  onToggle={() => toggleDropdown("class")}
                >
                  <CheckboxFilter
                    options={[
                      { value: "economy", label: "اکونومی" },
                      { value: "business", label: "بیزنس" },
                    ]}
                    selectedValues={selectedClasses}
                    onChange={handleClassChange}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="زمان پرواز"
                  isOpen={openDropdown === "time"}
                  onToggle={() => toggleDropdown("time")}
                >
                  <div className="timeSubSection">
                    <span className="subTitle">زمان حرکت از تهران</span>
                    <div className="checkboxGroup">
                      {[
                        { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                        { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                        { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                      ].map((item) => {
                        const isChecked = selectedDepTimes.includes(item.value);
                        return (
                          <label
                            key={item.value}
                            className="checkboxItem"
                            onClick={() => handleDepTimeChange(item.value)}
                          >
                            <div
                              className={`customCheckbox ${isChecked ? "checked" : ""}`}
                            >
                              {isChecked && <FontAwesomeIcon icon={faCheck} />}
                            </div>
                            <input
                              type="checkbox"
                              onChange={() => handleDepTimeChange(item.value)}
                              checked={isChecked}
                              style={{ display: "none" }}
                            />
                            <span>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="filterDivider" />
                  <div className="timeSubSection">
                    <span className="subTitle">زمان رسیدن به کیش</span>
                    <div className="checkboxGroup">
                      {[
                        { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                        { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                        { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                      ].map((item) => {
                        const isChecked = selectedArrTimes.includes(item.value);
                        return (
                          <label
                            key={item.value}
                            className="checkboxItem"
                            onClick={() => handleArrTimeChange(item.value)}
                          >
                            <div
                              className={`customCheckbox ${isChecked ? "checked" : ""}`}
                            >
                              {isChecked && <FontAwesomeIcon icon={faCheck} />}
                            </div>
                            <input
                              type="checkbox"
                              onChange={() => handleArrTimeChange(item.value)}
                              checked={isChecked}
                              style={{ display: "none" }}
                            />
                            <span>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </FilterAccordion>

                <FilterAccordion
                  title="شرکت‌های هواپیمایی"
                  isOpen={openDropdown === "airline"}
                  onToggle={() => toggleDropdown("airline")}
                >
                  <CheckboxFilter
                    options={allAirlines.map((a) => ({ value: a, label: a }))}
                    selectedValues={selectedAirlines}
                    onChange={handleAirlineChange}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="مقدار بار مجاز"
                  isOpen={openDropdown === "baggage"}
                  onToggle={() => toggleDropdown("baggage")}
                >
                  <CheckboxFilter
                    options={allBaggageOptions.map((b) => ({
                      value: b,
                      label: b,
                    }))}
                    selectedValues={selectedBaggage}
                    onChange={handleBaggageChange}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="برچسب‌ها"
                  isOpen={openDropdown === "tags"}
                  onToggle={() => toggleDropdown("tags")}
                >
                  <CheckboxFilter
                    options={[
                      {
                        value: "foreign-restriction",
                        label: "محدودیت خرید اتباع",
                      },
                    ]}
                    selectedValues={selectedTags}
                    onChange={handleTagChange}
                  />
                </FilterAccordion>
              </FilterSidebar>
            </div>

            <div className="Left">
              <div className="Top">
                <div className="Title">ارزان‌ترین قیمت در هر روز</div>
                <div className="Price">
                  {cheapDays.map((item, idx) => (
                    <div className="Cards" key={idx}>
                      <span>{item.day}</span>
                      <p>{item.price} تومان</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Bottom">
                {/* فقط پروازهای موجود */}
                {availableFlights.map(renderFlightCard)}

                {/* باکس زرد رنگ با پروازهای ناموجود */}
                <div className="GetLater">
                  <div className="Titel">
                    <div className="About">
                      <div className="Logo">
                        <svg
                          height="64px"
                          width="64px"
                          version="1.1"
                          viewBox="-51.2 -51.2 614.4 614.4"
                          fill="#ffffff"
                        >
                          <rect
                            x="-51.2"
                            y="-51.2"
                            width="614.4"
                            height="614.4"
                            rx="307.2"
                            fill="#ffc800"
                            strokeWidth="0"
                          ></rect>
                          <path
                            style={{ fill: "#f5f0de" }}
                            d="M330.08,267.413h-93.758l-55.104,91.322h40.588l-31.221,124.946l140.197-158.768h-41.265 L330.08,267.413z"
                          ></path>
                          <g>
                            <path
                              style={{ fill: "#cea500" }}
                              d="M190.579,499.533c-2.508,0-5.036-0.594-7.371-1.821c-6.468-3.402-9.773-10.784-8.002-17.873 l26.3-105.249H181.22c-5.718,0-10.994-3.08-13.804-8.059c-2.811-4.979-2.723-11.087,0.231-15.984l55.104-91.322 c2.871-4.756,8.02-7.661,13.574-7.661h93.758c5.921,0,11.349,3.3,14.074,8.557s2.292,11.594-1.121,16.434l-22.933,32.508h10.683 c6.233,0,11.888,3.652,14.449,9.335c2.563,5.681,1.558,12.338-2.566,17.009L202.471,494.175 C199.377,497.673,195.013,499.533,190.579,499.533z M209.299,342.884h12.507c4.881,0,9.489,2.248,12.495,6.095 c3.004,3.847,4.068,8.865,2.885,13.6l-15.467,61.893l73.917-83.708h-6.119c-5.921,0-11.349-3.3-14.074-8.557 c-2.725-5.257-2.292-11.594,1.121-16.434l22.933-32.508h-54.226L209.299,342.884z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="Content">
                        <p>
                          موجود شد رزرو کن! <span>(جدید)</span>
                        </p>
                        <p>
                          در لحظه موجود شدن ظرفیت خالی، رزرو خودکار انجام
                          می‌شود.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* پروازهای ناموجود داخل باکس زرد */}
                  {unavailableFlights.length > 0 && (
                    <div className="UnAvailableFlights">
                      {unavailableFlights.map(renderFlightCard)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

              {/* پاپ‌آپ مدرن */}
        {showPopup && (
          <div
            className="popup-overlay show"
            onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
          >
            <div className="popup-modal">
              <div className="popup-bg-decor decor-1" />
              <div className="popup-bg-decor decor-2" />

              <div className="popup-header">
                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                  aria-label="بستن"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="header-content">
                  <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faBolt} />
                  </div>
                  <h2>فعال‌سازی رزرو خودکار</h2>
                  <p className="subtitle">هرگز یک صندلی خالی را از دست نده!</p>
                </div>
              </div>

              <div className="flight-summary">
                <div className="flight-route">
                  <div className="route-point">
                    <span className="city">تهران</span>
                    <span className="code">THR</span>
                  </div>
                  <div className="route-line">
                    <div className="route-dash" />
                    <div className="route-plane">
                      <FontAwesomeIcon icon={faPlane} />
                    </div>
                    <div className="route-dash" />
                  </div>
                  <div className="route-point">
                    <span className="city">کیش</span>
                    <span className="code">KIH</span>
                  </div>
                </div>
                <div className="flight-date">
                  <FontAwesomeIcon icon={faClock} />
                  <span>شنبه ۱۱ بهمن ۱۴۰۴</span>
                </div>
              </div>

              <div className="steps-section">
                <h3 className="section-title">
                  <span>چطور کار می‌کند؟</span>
                </h3>
                <div className="steps-grid">
                  <div className="step-card step-1">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className="step-content">
                      <h4>۱. جستجوی مداوم</h4>
                      <p>
                        سیستم ما ۲۴ ساعته پروازهای این مسیر را بررسی می‌کند.
                      </p>
                    </div>
                  </div>
                  <div className="step-card step-2">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div className="step-content">
                      <h4>۲. شناسایی ظرفیت</h4>
                      <p>
                        به محض آزاد شدن صندلی، در کمتر از چند ثانیه متوجه
                        می‌شویم.
                      </p>
                    </div>
                  </div>
                  <div className="step-card step-3">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faTicket} />
                    </div>
                    <div className="step-content">
                      <h4>۳. رزرو خودکار</h4>
                      <p>بلیط به صورت آنی به نام شما صادر و پیامک می‌شود.</p>
                    </div>
                  </div>
                  <div className="step-card step-4">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                    <div className="step-content">
                      <h4>۴. ضمانت بازگشت وجه</h4>
                      <p>
                        اگر بلیط پیدا نشد، تمام مبلغ بدون کارمزد برگشت داده
                        می‌شود.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chance-section">
                <div className="chance-header">
                  <div className="chance-title">
                    <FontAwesomeIcon icon={faGaugeHigh} />
                    <span>تحلیل هوشمند شانس موفقیت</span>
                  </div>
                  <div className="chance-value">
                    <span className="percent">{chancePercent}</span>
                    <span className="symbol">٪</span>
                  </div>
                </div>
                <div className={`chance-bar chance-${chanceStatus}`}>
                  <div
                    className="chance-fill"
                    style={{ width: `${chancePercent}%` }}
                  >
                    <div className="chance-dot" />
                  </div>
                </div>
                <div className="chance-labels">
                  <span>پایین</span>
                  <span>متوسط</span>
                  <span>بالا</span>
                </div>
                <div
                  className={`chance-message chance-message-${chanceStatus}`}
                >
                  <FontAwesomeIcon
                    icon={chanceStatus === "high" ? faCheck : faBell}
                  />
                  <span>{chanceMessage}</span>
                </div>
              </div>

              <div className="popup-footer">
                <p className="terms">
                  با ادامه فرآیند،{" "}
                  <Link href="/rules" target="_blank">
                    شرایط و قوانین رزرو خودکار
                  </Link>{" "}
                  را می‌پذیرید.
                </p>
                <Link href="/reserve/auto-reserve" className="cta-button">
                  <span className="cta-icon">
                    <FontAwesomeIcon icon={faWallet} />
                  </span>
                  <span className="cta-text">
                    <span className="cta-main">ادامه و شارژ کیف پول</span>
                    <span className="cta-sub">
                      مبلغ مورد نیاز: ۳,۱۶۱,۶۰۰ تومان
                    </span>
                  </span>
                  <span className="cta-arrow">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default function FlightResultsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton type="list" />}>
      <FlightResultsPageContent />
    </Suspense>
  );
}
