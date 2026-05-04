"use client";

import "./globals.css";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faFaceSmile,
  faClock,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FaCar, FaSwimmingPool, FaSink } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

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

const PAGE_DATA = {
  images: [
    "https://img.mstatic.ir/ZAPV_BviraPri7BLnBEnGpOnl4fU_OrEnWrApELUovE/gravity:nowe:1:20/crop:1279:715/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsL0ZENUIwNTMzRTQzQTYzMUE3RDcxNjcyMDA4NERBRDg0LmpwZWc.jpg",
    "https://img.mstatic.ir/ZAPV_BviraPri7BLnBEnGpOnl4fU_OrEnWrApELUovE/gravity:nowe:1:20/crop:1279:715/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsL0ZENUIwNTMzRTQzQTYzMUE3RDcxNjcyMDA4NERBRDg0LmpwZWc.jpg",
    "https://img.mstatic.ir/ZAPV_BviraPri7BLnBEnGpOnl4fU_OrEnWrApELUovE/gravity:nowe:1:20/crop:1279:715/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsL0ZENUIwNTMzRTQzQTYzMUE3RDcxNjcyMDA4NERBRDg0LmpwZWc.jpg",
    "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoyNXbjU3W83XkMyvbVTsH8Y2kFI1MpcDQA&s",
  ],
  options: [
    { label: "پارکینگ", icon: "FaCar" },
    { label: "استخر، جکوزی یا سونا", icon: "FaSwimmingPool" },
    { label: "مرکز خرید", icon: "FaCartShopping" },
    { label: "خدمات خانه داری", icon: "FaSink" },
  ],
  rooms: [
    {
      id: 1,
      title: "دو تخته تویین کلاسیک CF",
      capacity: "2 نفره",
      breakfast: "صبحانه",
      nights: 1,
      price: 14345000,
      features: [
        "آباژور",
        "سیستم IPTV",
        "صندوق امانات در اتاق",
        "تلفن",
        "میز و صندلی",
        "اینترنت رایگان و نامحدود در اتاق",
        "حوله",
      ],
    },
    {
      id: 2,
      title: "یک تخته دلوکس",
      capacity: "1 نفره",
      breakfast: "صبحانه",
      nights: 1,
      price: 12300000,
      features: [
        "آباژور",
        "سیستم IPTV",
        "مینی بار",
        "تلویزیون هوشمند",
        "اینترنت رایگان",
      ],
    },
    {
      id: 3,
      title: "دو تخته لوکس با بالکن",
      capacity: "2 نفره",
      breakfast: "صبحانه و ناهار",
      nights: 1,
      price: 16500000,
      features: [
        "بالکن با منظره شهر",
        "تلویزیون",
        "اینترنت رایگان",
        "صندوق امانات",
        "میز و صندلی",
      ],
    },
  ],
  hotelInfoData: [
    {
      type: "p",
      text: "هتل اسپیناس پالاس تهران از بهترین و مجلل‌ترین هتل‌های این شهر است که در منطقه سعادت آباد قرار دارد. این هتل 5 ستاره بوده و در زمره هتل‌های خیلی خوب شهر تهران به‌شمار می‌رود. نظرات مهمانان هتل اسپیناس پالاس تهران نشان می‌دهد که این هتل برای اقامت بسیار عالی است و بسیاری از مهمانان رفتار عالی پرسنل، کیفیت بی‌نظیر غذا، امکانات اتاق‌ها و لوکس‌بودن هتل را از نقاط قوت آن می‌دانند. این هتل نه تنها گزینه‌ای برای اقامت، بلکه گزینه ای عالی برای برگزاری همایش‌ها و مراسمات مختلف است. هتلی که به عنوان لوکسترین هتل تهران نیز شناخته می‌شود.",
    },
    {
      type: "h4",
      text: "رزرو هتل اسپیناس پالاس تهران در حمید پرواز",
    },
    {
      type: "p",
      text: "پس از خرید بلیط هواپیما تهران، برای رزرو هتل اسپیناس پالاس تهران می‌توانید تاریخ ورود و خروج خود را مشخص کرده و پس از انجام جستجو، لیستی از اتاق‌ها برای شما باز شده که هرکدام امکانات و ویژگی‌های خود را دارند. برای انتخاب اتاق موردنظر خود، روی گزینه افزودن اتاق کلیک کرده تا دکمه ادامه فرایند رزرو برای شما فعال شود. پس از کلیک روی دکمه ادامه فرایند رزرو، شما به صفحه بعد هدایت می‌شوید. در صفحه بعدی باید اطلاعات شخصی خود و همراهانتان مانند نام و نام خانوادگی و کدملی را وارد کرده و سپس این اطلاعات را تایید کنید تا صفحه بعد برای شما باز شود. در صفحه بعد، کلیه اطلاعات رزرو هتل قابل مشاهده بوده و شما باید این اطلاعات را با دقت مطالعه و در صورت صحت اطلاعات، آن‌ها را تایید تا به درگاه‌های پرداخت هدایت شوید. پس از پرداخت، کلیه اطلاعات رزرو در حساب کاربری شما قابل مشاهده بوده و همچنین این اطلاعات برای شما پیامک شده و یا ایمیل می‌گردد.",
    },
  ],
  distanceData: [
    { title: "نمایشگاه بین‌المللی", distance: "9.8 کیلومتر" },
    { title: "برج میلاد", distance: "11.8 کیلومتر" },
    { title: "ایران مال", distance: "11.8 کیلومتر" },
    { title: "پارک آب و آتش", distance: "10.2 کیلومتر" },
    { title: "پل طبیعت", distance: "10.5 کیلومتر" },
    { title: "فرودگاه مهرآباد", distance: "18.4 کیلومتر" },
    { title: "فرودگاه امام خمینی", distance: "52 کیلومتر" },
    { title: "بازار بزرگ تهران", distance: "14.6 کیلومتر" },
    { title: "کاخ سعدآباد", distance: "7.9 کیلومتر" },
    { title: "دریاچه چیتگر", distance: "13.1 کیلومتر" },
    { title: "بام تهران", distance: "8.3 کیلومتر" },
    { title: "پارک لاله", distance: "12.4 کیلومتر" },
    { title: "موزه هنرهای معاصر", distance: "11.9 کیلومتر" },
    { title: "تالار وحدت", distance: "13.7 کیلومتر" },
    { title: "بوستان ملت", distance: "9.1 کیلومتر" },
  ],
  hotelRules: {
    checkIn: "14:00",
    checkOut: "12:00",
    descriptions: [
      "شرایط و مقررات کنسلی این هتل مطابق مقررات تامین‌کننده می‌باشد.",
      "در صورت انتخاب مسافر خارجی احتمال تغییر قیمت وجود دارد.",
      "پذیرش زوج‌ها تنها با ارائه شناسنامه معتبر امکان‌پذیر است.",
      "پذیرش حیوانات خانگی در این هتل مجاز نمی‌باشد.",
    ],
  },
  faqData: [
    {
      question: "ساعت ورود و خروج هتل اسپیناس پالاس چه زمانی است؟",
      answer: "ساعت ورود به هتل از 14:00 و ساعت خروج تا 12:00 ظهر می‌باشد.",
    },
    {
      question: "آیا صبحانه در قیمت اتاق لحاظ شده است؟",
      answer:
        "بله، در اکثر اتاق‌ها صبحانه به‌صورت رایگان در قیمت اقامت لحاظ شده است.",
    },
    {
      question: "شرایط کنسلی رزرو چگونه است؟",
      answer:
        "قوانین کنسلی بسته به نوع اتاق و تاریخ رزرو متفاوت بوده و طبق قوانین تامین‌کننده اعمال می‌شود.",
    },
    {
      question: "آیا هتل پارکینگ اختصاصی دارد؟",
      answer:
        "بله، هتل دارای پارکینگ اختصاصی با ظرفیت محدود برای مهمانان می‌باشد.",
    },
  ],
  hotels: [
    {
      name: "هتل پارسیان استقلال",
      stars: 5,
      rate: 6.8,
      price: 9215000,
      priceText: "قیمت 1 شب اتاق 1 تخته",
      location:
        "سعادت آباد، انتهای بزرگراه یادگار امام، میدان بهرود، هتل اسپیناس پالاس",
    },
  ],
  texts: {
    optionsTitle: "امکانات و ویژگی‌ها",
    roomsTitle: "اتاق‌های موجود",
    hotelInfoTitle: "معرفی هتل اسپیناس پالاس",
    distanceTitle: "فاصله تا نقاط مهم",
    rulesTitle: "قوانین و مقررات هتل اسپیناس پالاس",
    faqTitle: "سوالات متداول",
    checkInLabel: "ورود",
    checkOutLabel: "خروج",
    searchButton: "مشاهده",
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
    showMore: "نمایش بیشتر",
    showLess: "نمایش کمتر",
    addRoom: "افزودن اتاق",
    mapButton: "مشاهده روی نقشه",
    datePlaceholderStart: "تاریخ رفت",
    datePlaceholderEnd: "تاریخ برگشت",
  },
};

const iconMap = {
  FaCar: <FaCar />,
  FaSwimmingPool: <FaSwimmingPool />,
  FaCartShopping: <FaCartShopping />,
  FaSink: <FaSink />,
};

export default function CardGallery() {
  const [current, setCurrent] = useState(0);
  const [expandedRoomIds, setExpandedRoomIds] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const images = PAGE_DATA.images;
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const toggleExpand = (id) => {
    setExpandedRoomIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id],
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
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

  const startDateInputValue = selectedStartDate || "";
  const endDateInputValue = selectedEndDate || "";

  return (
    <>
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
            <h4>{PAGE_DATA.texts.optionsTitle}</h4>
            <div className="Card">
              {PAGE_DATA.options.map((opt, idx) => (
                <div className="Option" key={idx}>
                  {iconMap[opt.icon]}
                  <p>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Rooms">
            <h4>{PAGE_DATA.texts.roomsTitle}</h4>
            {PAGE_DATA.rooms.map((room) => (
              <div className="Card" key={room.id}>
                <div className="Top">
                  <div className="Title">
                    <p>{room.title}</p>
                    <span>{room.capacity}</span>
                  </div>
                  <div className="AboutRoom">
                    <p>{room.breakfast}</p>
                    <p>
                      {room.nights} شب{" "}
                      <span>{room.price.toLocaleString()}</span> تومان
                    </p>
                    <button>{PAGE_DATA.texts.addRoom}</button>
                  </div>
                </div>
                <div className="RoomOption">
                  <div
                    className={`content ${expandedRoomIds.includes(room.id) ? "expanded" : ""}`}
                  >
                    {room.features.map((f, i) => (
                      <p key={i}>{f}</p>
                    ))}
                  </div>
                  <button
                    className="toggle-btn"
                    onClick={() => toggleExpand(room.id)}
                  >
                    {expandedRoomIds.includes(room.id)
                      ? PAGE_DATA.texts.showLess
                      : PAGE_DATA.texts.showMore}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="HotelInfo">
            <h4>{PAGE_DATA.texts.hotelInfoTitle}</h4>
            <div className="Card">
              <div className={`content ${expanded ? "expanded" : ""}`}>
                {PAGE_DATA.hotelInfoData.map((item, index) =>
                  item.type === "h4" ? (
                    <h4 key={index}>{item.text}</h4>
                  ) : (
                    <p key={index}>{item.text}</p>
                  ),
                )}
              </div>
              <button
                className="toggle-btn"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? PAGE_DATA.texts.showLess : PAGE_DATA.texts.showMore}
              </button>
            </div>
          </div>

          <div className="Distance">
            <h4>{PAGE_DATA.texts.distanceTitle}</h4>
            <div className="Card">
              {PAGE_DATA.distanceData.map((item, index) => (
                <div className="Option" key={index}>
                  <p>{item.title}</p>
                  <p>{item.distance}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="Rules">
            <h4>{PAGE_DATA.texts.rulesTitle}</h4>
            <div className="Card">
              <div className="Time">
                <div className="Value">
                  <p>ساعت ورود</p>
                  <span>
                    {PAGE_DATA.hotelRules.checkIn}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
                <div className="Value">
                  <p>ساعت خروج</p>
                  <span>
                    {PAGE_DATA.hotelRules.checkOut}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
              </div>
              <div className="rule">
                {PAGE_DATA.hotelRules.descriptions.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="FAQSection">
            <div className="top">
              <span>{PAGE_DATA.texts.faqTitle}</span>
            </div>
            <div className="bottom">
              {PAGE_DATA.faqData.map((item, index) => (
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
          {PAGE_DATA.hotels.map((hotel, index) => (
            <div className="Card" key={index}>
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
                      {hotel.rate}/10 <FontAwesomeIcon icon={faFaceSmile} />
                    </p>
                  </div>
                </div>
                <p>{hotel.name}</p>
                <div className="titel">
                  <p>{hotel.priceText}</p>
                  <p>
                    <span>{hotel.price.toLocaleString()}</span> تومان
                  </p>
                </div>
              </div>
              <div className="price">
                <div className="text">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p>{hotel.location}</p>
                </div>
                <button>{PAGE_DATA.texts.mapButton}</button>
              </div>
            </div>
          ))}

          <div className="Card LeftFilterCard">
            <div className="filters" ref={calendarRef}>
              <p>{PAGE_DATA.texts.checkInLabel}</p>
              <input
                type="text"
                id="startDateInput"
                placeholder={PAGE_DATA.texts.datePlaceholderStart}
                value={startDateInputValue}
                readOnly
                onClick={() => openCalendar("start")}
                className={activeInput === "start" ? "active" : ""}
              />
              <p>{PAGE_DATA.texts.checkOutLabel}</p>
              <input
                type="text"
                id="endDateInput"
                placeholder={PAGE_DATA.texts.datePlaceholderEnd}
                value={endDateInputValue}
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
                        ? `${currentJy} ${PAGE_DATA.texts.monthNames[currentJm - 1]}`
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
                        {PAGE_DATA.texts.weekDays.map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                      <div className="calendarDays">{renderCalendar()}</div>
                    </div>
                  )}
                  {currentView === "months" && (
                    <div className="calendarView active">
                      <div className="monthsGrid">
                        {PAGE_DATA.texts.monthNames.map((name, idx) => (
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
                      {PAGE_DATA.texts.closeButton}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="Btn1">{PAGE_DATA.texts.searchButton}</button>
          </div>
        </div>
      </div>
    </>
  );
}
