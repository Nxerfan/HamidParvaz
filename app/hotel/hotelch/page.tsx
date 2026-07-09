"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faFaceSmile,
  faClock,
  faWifi,
  faCar,
  faSwimmingPool,
  faUtensils,
  faParking,
  faCheck,
  faBan,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import SecondHeader from "../../components/(Headers)/SecondHeader";
import FAQSection from "../../components/FAQSection";
import type { Hotel } from "../../types/index";

interface HotelFromApi extends Hotel {
  priceText?: string;
  roomTypes: { name: string; price: number; capacity: string }[];
}
import "./globals.css";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const facilityIcons: Record<string, IconDefinition> = {
  "اینترنت رایگان": faWifi,
  "ترانسفر رایگان": faCar,
  استخر: faSwimmingPool,
  "صبحانه رایگان": faUtensils,
  پارکینگ: faParking,
};

const TEXTS = {
  facilitiesTitle: "امکانات و ویژگی‌ها",
  roomsTitle: "انواع اتاق‌ها",
  rulesTitle: "قوانین و مقررات",
  faqTitle: "سوالات متداول",
  checkInLabel: "ساعت ورود",
  checkOutLabel: "ساعت خروج",
  cancelLabel: "قانون کنسلی",
  cancelYes: "قابل کنسلی رایگان",
  cancelNo: "غیرقابل کنسلی",
  passengerLabel: "تعداد مسافران",
  adultLabel: "بزرگسال",
  childLabel: "کودک (۲ تا ۱۲ سال)",
  infantLabel: "نوزاد (۰ تا ۲ سال)",
  searchButton: "رزرو و خرید",
  datePlaceholderStart: "انتخاب تاریخ ورود",
  datePlaceholderEnd: "انتخاب تاریخ خروج",
  closeButton: "بستن",
  weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  monthNames: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
};

const jalaali = {
  toJalaali(gy: number, gm: number, gd: number) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = gy <= 1600 ? 0 : 979;
    gy -= gy <= 1600 ? 621 : 1600;
    const gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400) -
      80 +
      gd +
      g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    const jm =
      days < 186
        ? 1 + Math.floor(days / 31)
        : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return { jy, jm, jd };
  },
  toGregorian(jy: number, jm: number, jd: number) {
    let gy = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    let days =
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      78 +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    gy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    let gd = days + 1;
    const gm = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let i = 0;
    for (; i < 13; i++) {
      const v =
        gm[i] +
        (i === 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)
          ? 1
          : 0);
      if (gd <= v) break;
      gd -= v;
    }
    return { gy, gm: i, gd };
  },
  jMonthLength(jy: number, jm: number) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return 29;
  },
  isLeapJalaaliYear() {
    return true;
  },
};

function HotelDetailInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [hotel, setHotel] = useState<HotelFromApi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      const tid = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(tid);
    }
    fetch(`/api/hotels/${id}`)
      .then((res) => res.json())
      .then((data: HotelFromApi) => {
        setHotel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const [current, setCurrent] = useState(0);
  const images = hotel?.images || (hotel ? [hotel.image] : []);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const maxChildrenInfants = 3 * adults;
  const totalChildrenInfants = children + infants;

  const handleIncrement = (type: string) => {
    if (type === "adults") setAdults((p) => p + 1);
    if (type === "children" && totalChildrenInfants < maxChildrenInfants)
      setChildren((p) => p + 1);
    if (type === "infants" && totalChildrenInfants < maxChildrenInfants)
      setInfants((p) => p + 1);
  };

  const handleDecrement = (type: string) => {
    if (type === "adults") setAdults((p) => Math.max(0, p - 1));
    if (type === "children" && children > 0) setChildren((p) => p - 1);
    if (type === "infants" && infants > 0) setInfants((p) => p - 1);
  };

  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<{
    jy: number;
    jm: number;
    jd: number;
  } | null>(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const jDateToString = useCallback(
    (jy: number, jm: number, jd: number) =>
      `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`,
    [],
  );
  const stringToJDate = useCallback((str: string) => {
    const p = str.split("/");
    return { jy: parseInt(p[0]), jm: parseInt(p[1]), jd: parseInt(p[2]) };
  }, []);
  const getDateValue = useCallback(
    (jy: number, jm: number, jd: number) => jy * 10000 + jm * 100 + jd,
    [],
  );

  const isDateInRange = useCallback(
    (jy: number, jm: number, jd: number) => {
      if (!selectedStartDate || !selectedEndDate) return false;
      const start = stringToJDate(selectedStartDate);
      const end = stringToJDate(selectedEndDate);
      const val = getDateValue(jy, jm, jd);
      return (
        val > getDateValue(start.jy, start.jm, start.jd) &&
        val < getDateValue(end.jy, end.jm, end.jd)
      );
    },
    [selectedStartDate, selectedEndDate, stringToJDate, getDateValue],
  );

  const isDateInHoverRange = useCallback(
    (jy: number, jm: number, jd: number) => {
      if (!selectedStartDate || selectedEndDate || !hoverDate) return false;
      const start = stringToJDate(selectedStartDate);
      const val = getDateValue(jy, jm, jd);
      return (
        val > getDateValue(start.jy, start.jm, start.jd) &&
        val < getDateValue(hoverDate.jy, hoverDate.jm, hoverDate.jd)
      );
    },
    [
      selectedStartDate,
      selectedEndDate,
      hoverDate,
      stringToJDate,
      getDateValue,
    ],
  );

  const selectDate = useCallback(
    (jy: number, jm: number, jd: number) => {
      const dateStr = jDateToString(jy, jm, jd);
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(dateStr);
        setSelectedEndDate(null);
        setActiveInput("end");
        setHoverDate(null);
        setShowCalendar(true);
      } else {
        const start = stringToJDate(selectedStartDate);
        if (
          getDateValue(jy, jm, jd) < getDateValue(start.jy, start.jm, start.jd)
        ) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(dateStr);
        } else {
          setSelectedEndDate(dateStr);
        }
        setShowCalendar(false);
        setActiveInput(null);
      }
    },
    [
      selectedStartDate,
      selectedEndDate,
      jDateToString,
      stringToJDate,
      getDateValue,
    ],
  );

  const openCalendar = useCallback((inputType: string) => {
    setActiveInput(inputType);
    setShowCalendar(true);
  }, []);

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
    setActiveInput(null);
    setHoverDate(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCalendar]);

  const renderCalendar = () => {
    const daysInMonth = jalaali.jMonthLength(currentJy, currentJm);
    const gDate = jalaali.toGregorian(currentJy, currentJm, 1);
    const dateObj = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    const startDayOfWeek = (dateObj.getDay() + 1) % 7;
    const cells = [];
    for (let i = 0; i < startDayOfWeek; i++)
      cells.push(<div key={`e-${i}`} className="calendarDay empty" />);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = jDateToString(currentJy, currentJm, day);
      const isToday =
        currentJy === jToday.jy && currentJm === jToday.jm && day === jToday.jd;
      const isSelected =
        dateStr === selectedStartDate || dateStr === selectedEndDate;
      const inRange = isDateInRange(currentJy, currentJm, day);
      const inHoverRange = isDateInHoverRange(currentJy, currentJm, day);
      cells.push(
        <div
          key={day}
          className={`calendarDay${isToday ? " today" : ""}${isSelected ? " selected" : ""}${inRange ? " in-range" : ""}${inHoverRange ? " hover-range" : ""}`}
          onClick={() => selectDate(currentJy, currentJm, day)}
          onMouseEnter={() => {
            if (selectedStartDate && !selectedEndDate)
              setHoverDate({ jy: currentJy, jm: currentJm, jd: day });
          }}
        >
          {day}
        </div>,
      );
    }
    return cells;
  };

  const handleReserve = () => {
    if (hotel) router.push(`/hotel/reserve/form?id=${hotel.id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>هتل مورد نظر یافت نشد</h2>
        <a href="/hotel" style={{ color: "var(--gold)" }}>بازگشت به لیست هتل‌ها</a>
      </div>
    );
  }

  return (
    <>
      <SecondHeader />
      <div className="container26">
        <div className="right">
          <div className="Card">
            <div className="MainImg" style={{ position: "relative" }}>
              <Image
                src={images[current]}
                width={790}
                height={430}
                alt={hotel.name}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <button onClick={prevImage} className="nav prev">
                ‹
              </button>
              <button onClick={nextImage} className="nav next">
                ›
              </button>
            </div>
            {images.length > 1 && (
              <div className="MoreImg">
                {images.map((img, idx) => (
                  <div key={idx} onClick={() => setCurrent(idx)}>
                    <Image
                      src={img}
                      width={129}
                      height={73}
                      alt={`thumb-${idx}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="HotelInfo">
            <div className="Card">
              <div className="content expanded">
                <h4>{hotel.name}</h4>
                <div
                  className="Stars"
                  style={{
                    display: "flex",
                    gap: "2px",
                    margin: "8px 0",
                    alignItems: "center",
                  }}
                >
                  {Array(hotel.stars)
                    .fill(0)
                    .map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{ color: "#ffcd11", fontSize: "16px" }}
                      />
                    ))}
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--textGray)",
                      marginRight: "8px",
                    }}
                  >
                    {hotel.stars} ستاره
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "green",
                      marginRight: "16px",
                    }}
                  >
                    {hotel.rating}/10 <FontAwesomeIcon icon={faFaceSmile} />
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--textGray)",
                      marginRight: "16px",
                    }}
                  >
                    <FontAwesomeIcon icon={faLocationDot} /> {hotel.location}
                  </span>
                </div>
                <p>{hotel.description}</p>
              </div>
            </div>
          </div>

          <div className="Options">
            <h4>{TEXTS.facilitiesTitle}</h4>
            <div className="Card">
              {hotel.facilities.map((fac, idx) => (
                <div className="Option" key={idx}>
                  <FontAwesomeIcon icon={facilityIcons[fac] || faCheck} />
                  <p>{fac}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Rooms">
            <h4>{TEXTS.roomsTitle}</h4>
            {hotel.roomTypes.map((room, idx) => (
              <div className="Card HotelListItem" key={idx}>
                <div className="Top">
                  <div
                    className="Title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{room.name}</p>
                    <span>{room.capacity}</span>
                  </div>
                  <div
                    className="AboutRoom"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--goldDark)",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <span>{room.price.toLocaleString("fa-IR")}</span> تومان
                    </p>
                    <button onClick={handleReserve}>رزرو اتاق</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="Rules">
            <h4>{TEXTS.rulesTitle}</h4>
            <div className="Card">
              <div className="Time">
                <div className="Value">
                  <p>{TEXTS.checkInLabel}</p>
                  <span>
                    {hotel.checkInStart}:00 تا {hotel.checkInEnd}:00{" "}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
                <div className="Value">
                  <p>{TEXTS.checkOutLabel}</p>
                  <span>
                    {hotel.checkOutStart}:00 تا {hotel.checkOutEnd}:00{" "}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
              </div>
              <div className="rule">
                <p
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {hotel.isCancelable ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#22c55e" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBan}
                      style={{ color: "#ef4444" }}
                    />
                  )}
                  {TEXTS.cancelLabel}:{" "}
                  {hotel.isCancelable ? TEXTS.cancelYes : TEXTS.cancelNo}
                </p>
              </div>
            </div>
          </div>

          {hotel.faq && hotel.faq.length > 0 && (
            <FAQSection title={TEXTS.faqTitle} faqData={hotel.faq} />
          )}
        </div>

        <div className="left">
          <div className="Card">
            <div className="rating">
              <div className="Stars">
                <div className="Wth">
                  {Array(hotel.stars)
                    .fill(0)
                    .map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  <span>{hotel.stars} ستاره</span>
                </div>
                <div className="Rate">
                  <p>
                    {hotel.rating}/10 <FontAwesomeIcon icon={faFaceSmile} />
                  </p>
                </div>
              </div>
              <p>{hotel.name}</p>
              <div className="titel">
                <p>{hotel.priceText || "قیمت هر شب"}</p>
                <p>
                  <span>{hotel.pricePerNight.toLocaleString("fa-IR")}</span>{" "}
                  تومان
                </p>
              </div>
            </div>
            <div className="price">
              <div className="text">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{hotel.location}</p>
              </div>
            </div>
          </div>

          <div className="Card LeftFilterCard">
            <div className="filters" ref={calendarRef}>
              <p>{TEXTS.datePlaceholderStart}</p>
              <input
                type="text"
                id="startDateInput"
                placeholder={TEXTS.datePlaceholderStart}
                value={selectedStartDate || ""}
                readOnly
                onClick={() => openCalendar("start")}
                className={activeInput === "start" ? "active" : ""}
              />
              <p>{TEXTS.datePlaceholderEnd}</p>
              <input
                type="text"
                id="endDateInput"
                placeholder={TEXTS.datePlaceholderEnd}
                value={selectedEndDate || ""}
                readOnly
                onClick={() => openCalendar("end")}
                className={activeInput === "end" ? "active" : ""}
              />
              {showCalendar && (
                <div className="calendarPopup show">
                  <div
                    className="calendarHeader"
                    style={{
                      visibility: currentView === "days" ? "visible" : "hidden",
                    }}
                  >
                    <button
                      className="calendarNavBtn"
                      onClick={() =>
                        setCurrentJm((p) =>
                          p === 1 ? (setCurrentJy((y) => y - 1), 12) : p - 1,
                        )
                      }
                    >
                      &gt;
                    </button>
                    <span
                      className="calendarTitle"
                      onClick={() =>
                        setCurrentView(
                          currentView === "days"
                            ? "years"
                            : currentView === "years"
                              ? "months"
                              : "days",
                        )
                      }
                    >
                      {currentView === "days"
                        ? `${currentJy} ${TEXTS.monthNames[currentJm - 1]}`
                        : currentView === "months"
                          ? `${currentJy} - انتخاب ماه`
                          : "انتخاب سال"}
                    </span>
                    <button
                      className="calendarNavBtn"
                      onClick={() =>
                        setCurrentJm((p) =>
                          p === 12 ? (setCurrentJy((y) => y + 1), 1) : p + 1,
                        )
                      }
                    >
                      &lt;
                    </button>
                  </div>
                  {currentView === "days" && (
                    <div className="calendarView active">
                      <div className="calendarWeekdays">
                        {TEXTS.weekDays.map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                      <div className="calendarDays">{renderCalendar()}</div>
                    </div>
                  )}
                  {currentView === "months" && (
                    <div className="calendarView active">
                      <div className="monthsGrid">
                        {TEXTS.monthNames.map((name, idx) => (
                          <div
                            key={idx}
                            className={`monthItem ${currentJm === idx + 1 ? "selected" : ""}`}
                            onClick={() => {
                              setCurrentJm(idx + 1);
                              setCurrentView("days");
                            }}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentView === "years" && (
                    <div className="calendarView active">
                      <div className="yearsWrapper">
                        <div className="yearsGrid">
                          {Array.from(
                            { length: jToday.jy - 1300 + 1 },
                            (_, i) => jToday.jy - i,
                          ).map((y) => (
                            <div
                              key={y}
                              className={`yearItem ${y === currentJy ? "selected" : ""}`}
                              onClick={() => {
                                setCurrentJy(y);
                                setCurrentView("months");
                              }}
                            >
                              {y}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="calendarFooter">
                    <button className="btnClose" onClick={closeCalendar}>
                      {TEXTS.closeButton}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="PassengerFilter">
              <p>{TEXTS.passengerLabel}</p>
              <div className="PassengerControl">
                <div className="ControlGroup">
                  <label>{TEXTS.adultLabel}</label>
                  <div className="Counter">
                    <button
                      className="Minus"
                      onClick={() => handleDecrement("adults")}
                      disabled={adults <= 0}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{adults}</span>
                    <button
                      className="Plus"
                      onClick={() => handleIncrement("adults")}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="ControlGroup">
                  <label>{TEXTS.childLabel}</label>
                  <div className="Counter">
                    <button
                      className="Minus"
                      onClick={() => handleDecrement("children")}
                      disabled={children <= 0}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{children}</span>
                    <button
                      className="Plus"
                      onClick={() => handleIncrement("children")}
                      disabled={totalChildrenInfants >= maxChildrenInfants}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="ControlGroup">
                  <label>{TEXTS.infantLabel}</label>
                  <div className="Counter">
                    <button
                      className="Minus"
                      onClick={() => handleDecrement("infants")}
                      disabled={infants <= 0}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{infants}</span>
                    <button
                      className="Plus"
                      onClick={() => handleIncrement("infants")}
                      disabled={totalChildrenInfants >= maxChildrenInfants}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="Btn1" onClick={handleReserve}>
              {TEXTS.searchButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HotelDetailPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "40px", textAlign: "center" }}>
          در حال بارگذاری...
        </div>
      }
    >
      <HotelDetailInner />
    </Suspense>
  );
}
