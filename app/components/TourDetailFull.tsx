"use client";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faLocationDot,
  faUtensils,
  faPlaneDeparture,
  faPlaneArrival,
  faPlus,
  faMinus,
  faUser,
  faChild,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import { FaCar, FaSwimmingPool, FaSink } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SecondHeader from "./(Headers)/SecondHeader";
import "../tour/tourch/globals.css";

const jalaali = {
  toJalaali: function (gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = gy <= 1600 ? 0 : 979;
    gy -= gy <= 1600 ? 621 : 1600;
    var gy2 = gm > 2 ? gy + 1 : gy;
    var days =
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
    var jm =
      days < 186
        ? 1 + Math.floor(days / 31)
        : 7 + Math.floor((days - 186) / 30);
    var jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
    return { jy: jy, jm: jm, jd: jd };
  },
  toGregorian: function (jy, jm, jd) {
    var gy = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    var days =
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
    var gd = days + 1;
    var gm = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var i = 0; i < 13; i++) {
      var v =
        gm[i] +
        (i === 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)
          ? 1
          : 0);
      if (gd <= v) break;
      gd -= v;
    }
    return { gy: gy, gm: i, gd: gd };
  },
  isValidJalaaliDate: function (jy, jm, jd) {
    return (
      jy >= -61 &&
      jy <= 3177 &&
      jm >= 1 &&
      jm <= 12 &&
      jd >= 1 &&
      jd <=
        (jm <= 6 ? 31 : jm <= 11 ? 30 : jalaali.isLeapJalaaliYear(jy) ? 30 : 29)
    );
  },
  isLeapJalaaliYear: function (jy) {
    return jalaali.jalCal(jy).leap === 0;
  },
  jalCal: function (jy) {
    var breaks = [
      -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
      2192, 2262, 2324, 2394, 2456, 3178,
    ];
    var bl = breaks.length;
    var gy = jy + 621;
    var leapJ = -14;
    var jp = breaks[0];
    var jump;
    if (jy < jp || jy >= breaks[bl - 1])
      throw new Error("Invalid Jalaali year " + jy);
    for (var i = 1; i < bl; i += 1) {
      var jm = breaks[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor((jump % 33) / 4);
      jp = jm;
    }
    var n = jy - jp;
    leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
    if (jump % 33 === 4 && jump - n === 4) leapJ += 1;
    var leapG =
      Math.floor(gy / 4) - Math.floor(gy / 100 + 1) + Math.floor(gy / 400);
    var march = 20 + (leapJ - leapG);
    if (jump - n < 6) n = n - jump + Math.floor((jump + 4) / 33) * 33;
    var leap = (((n + 1) % 33) - 1) % 4;
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  },
  jMonthLength: function (jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    if (jalaali.isLeapJalaaliYear(jy)) return 30;
    return 29;
  },
};

const TEXTS = {
  optionsTitle: "امکانات و ویژگی‌ها",
  itineraryTitle: "برنامه سفر",
  roomsTitle: "هتل‌های محل اقامت در تور",
  rulesTitle: "قوانین و مقررات تور",
  faqTitle: "سوالات متداول",
  durationLabel: "مدت تور",
  flightTypeLabel: "نوع پرواز",
  departureLabel: "تاریخ رفت",
  returnLabel: "تاریخ برگشت",
  passengerLabel: "تعداد مسافران",
  adultLabel: "بزرگسال",
  childLabel: "کودک (۲ تا ۱۲ سال)",
  infantLabel: "نوزاد (۰ تا ۲ سال)",
  searchButton: "رزرو و خرید تور",
  datePlaceholderStart: "انتخاب تاریخ رفت",
  datePlaceholderEnd: "انتخاب تاریخ برگشت",
  closeButton: "بستن",
  weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  monthNames: [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
  ],
  departureFlight: "پرواز رفت",
  returnFlight: "پرواز برگشت",
};

const iconMap = {
  FaCar: <FaCar />,
  FaSwimmingPool: <FaSwimmingPool />,
  FaCartShopping: <FaCartShopping />,
  FaSink: <FaSink />,
};

export type TourDetailData = {
  images: string[];
  options: { icon: string; label: string }[];
  hotelInfoData: { title: string; rating: number; options: string[]; description: string }[];
  hotelRules: { checkIn: string; checkOut: string; descriptions: string[] };
  faqData: { question: string; answer: string }[];
  hotels: { name: string; stars: number; rate: number; price: number; priceText: string; location: string }[];
  itineraryData: { duration: string; days: { day: string; title: string; description: string }[] };
  tourData: { badges: string[]; title: string; priceLabel: string; price: number; flights: { departure: string; return: string } };
};

export default function TourDetailFull({ data }: { data: TourDetailData }) {
  const [current, setCurrent] = useState(0);

  const images = data.images;
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const maxChildrenInfants = 3 * adults;
  const totalChildrenInfants = children + infants;

  const handleIncrement = (type) => {
    if (type === "adults") setAdults((prev) => prev + 1);
    if (type === "children") {
      if (totalChildrenInfants < maxChildrenInfants)
        setChildren((prev) => prev + 1);
    }
    if (type === "infants") {
      if (totalChildrenInfants < maxChildrenInfants)
        setInfants((prev) => prev + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === "adults") {
      setAdults((prev) => {
        const newAdult = Math.max(0, prev - 1);
        if (newAdult < prev) {
          const newMax = 3 * newAdult;
          if (totalChildrenInfants > newMax) {
            let newInfant = infants;
            let newChild = children;
            const excess = totalChildrenInfants - newMax;
            if (newInfant > 0) {
              const reduceInfant = Math.min(newInfant, excess);
              newInfant -= reduceInfant;
              const remainingExcess = excess - reduceInfant;
              if (remainingExcess > 0) newChild -= remainingExcess;
            } else {
              newChild -= excess;
            }
            setInfants(newInfant);
            setChildren(newChild);
          }
        }
        return newAdult;
      });
    }
    if (type === "children" && children > 0) setChildren((prev) => prev - 1);
    if (type === "infants" && infants > 0) setInfants((prev) => prev - 1);
  };

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const calendarRef = useRef(null);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const jDateToString = useCallback((jy, jm, jd) => {
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  }, []);

  const stringToJDate = useCallback((str) => {
    if (!str) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    return {
      jy: parseInt(parts[0]),
      jm: parseInt(parts[1]),
      jd: parseInt(parts[2]),
    };
  }, []);

  const getDateValue = useCallback(
    (jy, jm, jd) => jy * 10000 + jm * 100 + jd,
    [],
  );

  const isDateInRange = useCallback(
    (jy, jm, jd) => {
      if (!selectedStartDate || !selectedEndDate) return false;
      const start = stringToJDate(selectedStartDate);
      const end = stringToJDate(selectedEndDate);
      const val = getDateValue(jy, jm, jd);
      const startVal = getDateValue(start.jy, start.jm, start.jd);
      const endVal = getDateValue(end.jy, end.jm, end.jd);
      return val > startVal && val < endVal;
    },
    [selectedStartDate, selectedEndDate, stringToJDate, getDateValue],
  );

  const isDateInHoverRange = useCallback(
    (jy, jm, jd) => {
      if (!selectedStartDate || selectedEndDate || !hoverDate) return false;
      const start = stringToJDate(selectedStartDate);
      const end = hoverDate;
      const val = getDateValue(jy, jm, jd);
      const startVal = getDateValue(start.jy, start.jm, start.jd);
      const endVal = getDateValue(end.jy, end.jm, end.jd);
      return val > startVal && val < endVal;
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
    (jy, jm, jd) => {
      const dateStr = jDateToString(jy, jm, jd);
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(dateStr);
        setSelectedEndDate(null);
        setActiveInput("end");
        setHoverDate(null);
        setShowCalendar(true);
        setCurrentJy(jy);
        setCurrentJm(jm);
        setCurrentView("days");
      } else {
        const start = stringToJDate(selectedStartDate);
        const currentVal = getDateValue(jy, jm, jd);
        const startVal = getDateValue(start.jy, start.jm, start.jd);
        if (currentVal < startVal) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(dateStr);
        } else {
          setSelectedEndDate(dateStr);
        }
        setShowCalendar(false);
        setActiveInput(null);
        setHoverDate(null);
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

  const openCalendar = useCallback(
    (inputType) => {
      let targetDate;
      if (inputType === "start") {
        targetDate = selectedStartDate
          ? stringToJDate(selectedStartDate)
          : null;
      } else {
        targetDate = selectedEndDate
          ? stringToJDate(selectedEndDate)
          : selectedStartDate
            ? stringToJDate(selectedStartDate)
            : null;
      }
      if (!targetDate) targetDate = jToday;
      setActiveInput(inputType);
      setCurrentJy(targetDate.jy);
      setCurrentJm(targetDate.jm);
      setCurrentView("days");
      setShowCalendar(true);
      setHoverDate(null);
    },
    [selectedStartDate, selectedEndDate, jToday, stringToJDate],
  );

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
    setActiveInput(null);
    setHoverDate(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        e.target.id !== "startDateInput" &&
        e.target.id !== "endDateInput"
      ) {
        closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCalendar]);

  const renderCalendar = useCallback(() => {
    const daysInMonth = jalaali.jMonthLength(currentJy, currentJm);
    const gDate = jalaali.toGregorian(currentJy, currentJm, 1);
    const dateObj = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    let startDayOfWeek = (dateObj.getDay() + 1) % 7;

    const cells = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendarDay empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = jDateToString(currentJy, currentJm, day);
      const isToday =
        currentJy === jToday.jy && currentJm === jToday.jm && day === jToday.jd;
      const isSelected =
        dateStr === selectedStartDate || dateStr === selectedEndDate;
      const inRange = isDateInRange(currentJy, currentJm, day);
      const inHoverRange = isDateInHoverRange(currentJy, currentJm, day);

      const dayClass = `calendarDay${isToday ? " today" : ""}${
        isSelected ? " selected" : ""
      }${inRange ? " in-range" : ""}${inHoverRange ? " hover-range" : ""}`;

      cells.push(
        <div
          key={day}
          className={dayClass}
          data-date={`${currentJy}-${currentJm}-${day}`}
          onClick={() => selectDate(currentJy, currentJm, day)}
          onMouseEnter={() => {
            if (selectedStartDate && !selectedEndDate) {
              setHoverDate({ jy: currentJy, jm: currentJm, jd: day });
            }
          }}
        >
          {day}
        </div>,
      );
    }
    return cells;
  }, [
    currentJy,
    currentJm,
    selectedStartDate,
    selectedEndDate,
    hoverDate,
    jToday,
    jDateToString,
    isDateInRange,
    isDateInHoverRange,
    selectDate,
  ]);

  const handleCalendarTitleClick = () => {
    if (currentView === "days") setCurrentView("years");
    else if (currentView === "years") setCurrentView("months");
    else setCurrentView("days");
  };

  const handlePrevMonth = () => {
    setCurrentJm((prev) => {
      if (prev === 1) {
        setCurrentJy((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentJm((prev) => {
      if (prev === 12) {
        setCurrentJy((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const handleSearch = () => {
    const params = {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      adults,
      children,
      infants,
    };
    console.log("Search params:", params);
  };

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
                alt="main"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <button onClick={prevImage} className="nav prev">
                ‹
              </button>
              <button onClick={nextImage} className="nav next">
                ›
              </button>
            </div>

            <div className="MoreImg">
              {images.map((img, idx) => (
                <div key={idx} onClick={() => setCurrent(idx)}>
                  <Image src={img} width={129} height={73} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="Options">
            <h4>{TEXTS.optionsTitle}</h4>
            <div className="Card">
              {data.options.map((opt, idx) => (
                <div className="Option" key={idx}>
                  {iconMap[opt.icon]}
                  <p>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ItinerarySection">
            <h4>
              {TEXTS.itineraryTitle} (
              {data.itineraryData.duration})
            </h4>
            <div className="Card ItineraryCard">
              {data.itineraryData.days.map((day, index) => (
                <div className="DayItem" key={index}>
                  <div className="DayMarker">{day.day}</div>
                  <div className="DayContent">
                    <h5>{day.title}</h5>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="Rooms">
            <h4>{TEXTS.roomsTitle}</h4>
            {data.hotelInfoData.map((hotel, index) => (
              <div className="Card HotelListItem" key={index}>
                <div className="Top">
                  <div className="Title">
                    <p>
                      {hotel.title}{" "}
                      <FontAwesomeIcon icon={faStar} />{" "}
                      {hotel.rating}
                    </p>
                  </div>
                </div>
                <div className="HotelDetails">
                  <div className="Options Mini">
                    {hotel.options.map((option, i) => (
                      <div className="Option" key={i}>
                        <FontAwesomeIcon
                          icon={
                            i === 0
                              ? faLocationDot
                              : faUtensils
                          }
                        />{" "}
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="Desc">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="Rules">
            <h4>{TEXTS.rulesTitle}</h4>
            <div className="Card">
              <div className="Time">
                <div className="Value">
                  <p>{TEXTS.durationLabel}</p>
                  <span>
                    {data.hotelRules.checkIn}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
                <div className="Value">
                  <p>{TEXTS.flightTypeLabel}</p>
                  <span>
                    {data.hotelRules.checkOut}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
              </div>
              <div className="rule">
                {data.hotelRules.descriptions.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="FAQSection">
            <div className="top">
              <span>{TEXTS.faqTitle}</span>
            </div>
            <div className="bottom">
              {data.faqData.map((item, index) => (
                <div
                  key={index}
                  className={`FAQ ${activeIndex === index ? "active" : ""}`}
                >
                  <div className="question">
                    <button className="Button" onClick={() => toggleFAQ(index)}>
                      {item.question}
                      <span className="Icon">
                        {activeIndex === index ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                  {activeIndex === index && (
                    <div
                      className={`ansure ${activeIndex === index ? "open" : ""}`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="left">
          <div className="Card">
            <div className="rating">
              <div className="Stars">
                <div className="Wth">
                  {data.tourData.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`Badge ${
                        i === 0 ? "TourBadge" : "CharterBadge"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <p>{data.tourData.title}</p>
              <div className="titel">
                <p>{data.tourData.priceLabel}</p>
                <p>
                  <span>{data.tourData.price.toLocaleString()}</span> تومان
                </p>
              </div>
            </div>

            <div className="price">
              <div className="text">
                <FontAwesomeIcon icon={faPlaneDeparture} />
                <p>
                  {TEXTS.departureFlight}:{" "}
                  {data.tourData.flights.departure}
                </p>
              </div>
              <div className="text">
                <FontAwesomeIcon icon={faPlaneArrival} />
                <p>
                  {TEXTS.returnFlight}:{" "}
                  {data.tourData.flights.return}
                </p>
              </div>
            </div>
          </div>

          <div className="Card LeftFilterCard">
            <div className="filters" ref={calendarRef}>
              <p>{TEXTS.departureLabel}</p>
              <input
                type="text"
                id="startDateInput"
                placeholder={TEXTS.datePlaceholderStart}
                value={selectedStartDate || ""}
                readOnly
                onClick={() => openCalendar("start")}
                className={activeInput === "start" ? "active" : ""}
              />
              <p>{TEXTS.returnLabel}</p>
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
                <div
                  className="calendarPopup show"
                  onMouseLeave={() => setHoverDate(null)}
                >
                  <div
                    className="calendarHeader"
                    style={{
                      visibility: currentView === "days" ? "visible" : "hidden",
                    }}
                  >
                    <button
                      className="calendarNavBtn"
                      onClick={handleNextMonth}
                    >
                      &gt;
                    </button>
                    <span
                      className="calendarTitle"
                      onClick={handleCalendarTitleClick}
                    >
                      {currentView === "days"
                        ? `${currentJy} ${TEXTS.monthNames[currentJm - 1]}`
                        : currentView === "months"
                          ? `${currentJy} - انتخاب ماه`
                          : "انتخاب سال"}
                    </span>
                    <button
                      className="calendarNavBtn"
                      onClick={handlePrevMonth}
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

            <button className="Btn1" onClick={handleSearch}>
              {TEXTS.searchButton}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .DatePicker {
          position: relative;
          display: flex;
          gap: 8px;
        }
        .DatePicker input {
          background-color: var(--grayBg);
          height: 45px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: var(--fontSize);
          padding: 0 10px;
          color: var(--textGray);
          font-weight: bold;
          font-family: var(--Font);
          cursor: pointer;
          transition: var(--transition);
          box-sizing: border-box;
          text-align: right;
          direction: rtl;
        }
        .DatePicker input:focus,
        .DatePicker input:hover,
        .DatePicker input.active {
          outline: none;
          background-color: var(--grayBgHover);
          box-shadow: 0 0 0 2px var(--gold);
          color: var(--textDark);
        }
        .calendarPopup {
          position: absolute;
          top: 110%;
          left: 0;
          width: 100%;
          background: var(--bgWhite);
          border: var(--borderLight);
          border-radius: 12px;
          box-shadow: var(--boxShadow);
          padding: 15px;
          z-index: 1000;
          display: none;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.2s ease-out;
        }
        .calendarPopup.show {
          display: flex;
        }
        .calendarHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          cursor: default;
        }
        .calendarNavBtn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 5px 10px;
          border-radius: 5px;
          color: var(--textDark);
          transition: var(--transition);
        }
        .calendarNavBtn:hover {
          background-color: var(--grayBg);
        }
        .calendarTitle {
          font-weight: bold;
          font-size: 16px;
          color: var(--goldText);
          background-color: var(--grayBg);
          padding: 4px 12px;
          border-radius: 20px;
          cursor: pointer;
          user-select: none;
          transition: var(--transition);
        }
        .calendarTitle:hover {
          background-color: var(--gold);
          color: #3e2e00;
        }
        .calendarView {
          display: none;
          width: 100%;
          animation: fadeIn 0.2s ease-out;
        }
        .calendarView.active {
          display: block;
        }
        .calendarWeekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 12px;
          color: var(--textGray);
          margin-bottom: 5px;
        }
        .calendarDays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .calendarDay {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 6px;
          font-size: 14px;
          transition: var(--transition);
          color: var(--textDark);
        }
        .calendarDay:not(.empty):hover {
          background-color: var(--grayBgHover);
        }
        .calendarDay.empty {
          cursor: default;
        }
        .calendarDay.today {
          border: 1px solid var(--gold);
          color: var(--goldText);
          font-weight: bold;
        }
        .calendarDay.selected {
          background-color: var(--gold) !important;
          color: #3e2e00 !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .calendarDay.in-range {
          background-color: #fff3cf;
          color: var(--goldText);
        }
        .calendarDay.hover-range {
          background-color: #ffe6a3;
          color: #5c4b00;
        }
        .monthsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          text-align: center;
          padding: 10px 0;
        }
        .monthItem {
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: var(--transition);
        }
        .monthItem:hover {
          background-color: var(--grayBgHover);
          color: var(--goldText);
        }
        .monthItem.selected {
          background-color: var(--gold);
          color: #3e2e00;
        }
        .yearsWrapper {
          max-height: 200px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--gold) var(--grayBg);
        }
        .yearsWrapper::-webkit-scrollbar {
          width: 6px;
        }
        .yearsWrapper::-webkit-scrollbar-thumb {
          background-color: var(--gold);
          border-radius: 4px;
        }
        .yearsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
          text-align: center;
        }
        .yearItem {
          padding: 8px 0;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: var(--transition);
        }
        .yearItem:hover {
          background-color: var(--grayBgHover);
          color: var(--goldText);
        }
        .yearItem.selected {
          background-color: var(--gold);
          color: #3e2e00;
        }
        .calendarFooter {
          display: flex;
          justify-content: flex-end;
          padding-top: 10px;
          border-top: var(--borderLight);
          margin-top: 5px;
        }
        .btnClose {
          background-color: var(--textDark);
          color: white;
          border: none;
          padding: 6px 15px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-family: var(--Font);
          transition: var(--transition);
        }
        .btnClose:hover {
          opacity: 0.85;
          background-color: var(--goldDark);
          color: #2a2400;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
