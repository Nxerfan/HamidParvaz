"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import "./global.css";
import FilterUserPannel from "../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../components/(Headers)/UserPannelHeader";

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
  greeting: "Hello erfan",
  bonusText: "با تکمیل اطلاعات کاربری خود، ۵۰۰۰ امتیاز دریافت می‌کنید.",
  avatarSrc:
    "https://img.icons8.com/?size=100&id=RH2knxpdDpjm&format=png&color=000000",
  userInfoTitle: "اطلاعات کاربری",
  genderOptions: [
    { label: "آقا", checked: true },
    { label: "خانم", checked: false },
  ],
  nationalityOptions: ["ایرانی", "خارجی"],
  changePassword: {
    text: "تغییر رمز عبور",
    href: "/ForgetPassword.html",
  },
  userFields: [
    { label: "نام فارسی", placeholder: "نام", id: "firstName" },
    {
      label: "نام خانوادگی فارسی",
      placeholder: "نام خانوادگی",
      id: "lastName",
    },
    { label: "نام انگلیسی", placeholder: "نام به انگلیسی", id: "firstNameEn" },
    {
      label: "نام خانوادگی انگلیسی",
      placeholder: "نام خانوادگی به انگلیسی",
      id: "lastNameEn",
    },
  ],
  travelTitle: "اطلاعات مسافرتی",
  nationalId: { label: "شماره ملی", placeholder: "شماره ملی" },
  passportNumber: { label: "شماره گذرنامه", placeholder: "شماره گذرنامه" },
  passportExpiry: {
    label: "تاریخ انقضای گذرنامه",
    placeholder: "انتخاب تاریخ",
  },
  passportCountry: {
    label: "کشور صادرکننده گذرنامه",
    placeholder: "انتخاب کشور",
    options: [
      "ایران",
      "آلمان",
      "ترکیه",
      "فرانسه",
      "ایتالیا",
      "اسپانیا",
      "هلند",
      "سوئد",
      "نروژ",
      "دانمارک",
    ],
  },
  birthDate: {
    label: "تاریخ تولد",
    options: ["روز", "ماه", "سال"],
  },
  contactTitle: "اطلاعات تماس",
  contactFields: [
    { label: "تلفن همراه", placeholder: "تلفن همراه", id: "mobile" },
    { label: "تلفن ثابت", placeholder: "تلفن ثابت", id: "phone" },
    {
      label: "ایمیل (اختیاری)",
      placeholder: " ایمیل",
      id: "email",
      optional: true,
    },
  ],
  additionalTitle: " اطلاعات تکمیلی ",
  orgField: { label: "نام سازمان (اختیاری)", placeholder: " نام سازمان " },
  extraField: { label: "", placeholder: " ایمیل" },
  additionalSelects: [
    "استان محل سکونت (اختیاری)",
    "استان محل سکونت (اختیاری)",
    "هدف استفاده از مِستربلیط (اختیاری)",
  ],
  buttons: {
    cancel: "لغو",
    save: "ذخیره",
  },
  calendar: {
    placeholder: "انتخاب تاریخ",
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
    gregorianMonths: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
  },
};

export default function ProfileManagement() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [nationality, setNationality] = useState("ایرانی");
  const isGregorian = nationality === "خارجی";
  const formRef = useRef(null);

  const [passportExpiryDate, setPassportExpiryDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(1403);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const calendarRef = useRef(null);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const currentGregYear = new Date().getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const shamsiYears = Array.from({ length: 121 }, (_, i) => (jToday.jy - i).toString());
  const gregorianYears = Array.from({ length: 121 }, (_, i) => (currentGregYear - i).toString());

  const radius = 45;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progressPercent / 100) * circumference;

  const calculateProgress = () => {
    if (!formRef.current) return;
    const fields = formRef.current.querySelectorAll(
      'input[type="text"]:not([placeholder*="اختیاری"]), select',
    );
    let filled = 0;
    fields.forEach((f) => {
      const val = f.value.trim();
      if (val && !["روز", "ماه", "سال"].includes(val)) filled++;
    });
    const percent = (filled / fields.length) * 100;
    setProgressPercent(percent);
  };

  useEffect(() => {
    calculateProgress();
  }, []);

  useEffect(() => {
    setPassportExpiryDate(null);
    setShowCalendar(false);
    const now = new Date();
    if (isGregorian) {
      setCurrentYear(now.getFullYear());
      setCurrentMonth(now.getMonth() + 1);
    } else {
      const j = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
      setCurrentYear(j.jy);
      setCurrentMonth(j.jm);
    }
  }, [isGregorian]);

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

  const selectDate = useCallback(
    (jy, jm, jd) => {
      const dateStr = jDateToString(jy, jm, jd);
      setPassportExpiryDate(dateStr);
      setShowCalendar(false);
      setActiveInput(null);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.passportExpiry;
        return newErrors;
      });
      setShakeFields((prev) => {
        const newShake = { ...prev };
        delete newShake.passportExpiry;
        return newShake;
      });
    },
    [jDateToString],
  );

  const openCalendar = useCallback(
    (inputType) => {
      let targetDate = passportExpiryDate
        ? stringToJDate(passportExpiryDate)
        : null;
      if (!targetDate) {
        if (isGregorian) {
          const now = new Date();
          targetDate = { jy: now.getFullYear(), jm: now.getMonth() + 1, jd: now.getDate() };
        } else {
          targetDate = jToday;
        }
      }
      setActiveInput(inputType);
      setCurrentYear(targetDate.jy);
      setCurrentMonth(targetDate.jm);
      setCurrentView("days");
      setShowCalendar(true);
      setHoverDate(null);
    },
    [passportExpiryDate, jToday, stringToJDate, isGregorian],
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
        e.target.id !== "expiryDateInput"
      ) {
        closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCalendar]);

  const renderCalendar = useCallback(() => {
    let daysInMonth;
    let startDayOfWeek;

    if (isGregorian) {
      daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      const firstDay = new Date(currentYear, currentMonth - 1, 1);
      startDayOfWeek = (firstDay.getDay() + 1) % 7;
    } else {
      daysInMonth = jalaali.jMonthLength(currentYear, currentMonth);
      const gDate = jalaali.toGregorian(currentYear, currentMonth, 1);
      const dateObj = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
      startDayOfWeek = (dateObj.getDay() + 1) % 7;
    }

    const cells = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendarDay empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = jDateToString(currentYear, currentMonth, day);
      let isToday;
      if (isGregorian) {
        const now = new Date();
        isToday =
          currentYear === now.getFullYear() &&
          currentMonth === now.getMonth() + 1 &&
          day === now.getDate();
      } else {
        isToday =
          currentYear === jToday.jy &&
          currentMonth === jToday.jm &&
          day === jToday.jd;
      }
      const isSelected = dateStr === passportExpiryDate;

      const dayClass = `calendarDay${isToday ? " today" : ""}${
        isSelected ? " selected" : ""
      }`;

      cells.push(
        <div
          key={day}
          className={dayClass}
          data-date={`${currentYear}-${currentMonth}-${day}`}
          onClick={() => selectDate(currentYear, currentMonth, day)}
        >
          {day}
        </div>,
      );
    }
    return cells;
  }, [
    currentYear,
    currentMonth,
    isGregorian,
    passportExpiryDate,
    jToday,
    jDateToString,
    selectDate,
  ]);

  const handleCalendarTitleClick = () => {
    if (currentView === "days") setCurrentView("years");
    else if (currentView === "years") setCurrentView("months");
    else setCurrentView("days");
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 1) {
        setCurrentYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 12) {
        setCurrentYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const triggerErrorShake = (field) => {
    setShakeFields((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShakeFields((prev) => {
        const newShake = { ...prev };
        delete newShake[field];
        return newShake;
      });
    }, 500);
  };

  const handleSave = () => {
    const newErrors = {};

    const firstNameInput = document.getElementById("firstName");
    const mobileInput = document.getElementById("mobile");
    if (!firstNameInput?.value.trim()) newErrors.firstName = true;
    if (!mobileInput?.value.trim()) newErrors.mobile = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach((field) => triggerErrorShake(field));
      return;
    }

    setErrors({});
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log("Profile save data:", {
      ...data,
      passportExpiry: passportExpiryDate,
    });
  };

  return (
    <>
      <UserPannelHeader />
      <div className="containerr">
        <div className="right">
          <FilterUserPannel />
        </div>

        <div className="left">
          <div className="Card">
            <div className="ProfileHeader">
              <div className="ProgressWrap">
                <svg className="ProgressSvg" width="100" height="100">
                  <circle className="ProgressBg" r="45" cx="50" cy="50" />
                  <circle
                    className="ProgressBar"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: `${circumference} ${circumference}`,
                      strokeDashoffset: offset,
                    }}
                  />
                </svg>
                <div className="Avatar">
                  <img src={PAGE_DATA.avatarSrc} alt="User" />
                </div>
              </div>
              <div className="UserId">{PAGE_DATA.greeting}</div>
              <p className="BonusText">{PAGE_DATA.bonusText}</p>
            </div>

            <form ref={formRef} onChange={calculateProgress} id="ProfileForm">
              <div className="SectionHead">
                <span className="SectionTitle">{PAGE_DATA.userInfoTitle}</span>
                <div className="HeadOptions">
                  {PAGE_DATA.genderOptions.map((g, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name="Gender"
                        defaultChecked={g.checked}
                      />{" "}
                      {g.label}
                    </label>
                  ))}
                  <span className="Divider">|</span>
                  <select
                    className="MiniSelect"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    {PAGE_DATA.nationalityOptions.map((n, i) => (
                      <option key={i} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Link href={PAGE_DATA.changePassword.href} className="Link">
                    {PAGE_DATA.changePassword.text}
                  </Link>
                </div>
              </div>

              <div className="Grid2">
                {PAGE_DATA.userFields.map((field) => (
                  <div className="Field" key={field.id}>
                    <label>{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      id={field.id}
                      className={`${errors[field.id] ? "error" : ""} ${
                        shakeFields[field.id] ? "shake" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="SectionHead Mt30">
                <span className="SectionTitle">{PAGE_DATA.travelTitle}</span>
              </div>
              <div className="Grid2">
                <div className="Field">
                  <label>
                    {nationality === "خارجی"
                      ? PAGE_DATA.passportNumber.label
                      : PAGE_DATA.nationalId.label}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      nationality === "خارجی"
                        ? PAGE_DATA.passportNumber.placeholder
                        : PAGE_DATA.nationalId.placeholder
                    }
                  />
                </div>
                <div className="Field">
                  <label>{PAGE_DATA.birthDate.label}</label>
                  <div className="Grid3">
                    <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                      <option>روز</option>
                      {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                      <option>ماه</option>
                      {(isGregorian ? PAGE_DATA.calendar.gregorianMonths : PAGE_DATA.calendar.monthNames).map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                      <option>سال</option>
                      {(isGregorian ? gregorianYears : shamsiYears).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {nationality === "خارجی" && (
                <div className="Grid2">
                  <div className="Field">
                    <label>{PAGE_DATA.passportExpiry.label}</label>
                    <div ref={calendarRef}>
                      <input
                        type="text"
                        id="expiryDateInput"
                        placeholder={PAGE_DATA.calendar.placeholder}
                        value={passportExpiryDate || ""}
                        readOnly
                        onClick={() => openCalendar("expiry")}
                        className={`${errors.passportExpiry ? "error" : ""} ${
                          shakeFields.passportExpiry ? "shake" : ""
                        }`}
                      />
                      {showCalendar && (
                        <div
                          className="calendarPopup show"
                          onMouseLeave={() => setHoverDate(null)}
                        >
                          <div
                            className="calendarHeader"
                            style={{
                              visibility:
                                currentView === "days" ? "visible" : "hidden",
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
                                ? `${currentYear} ${isGregorian ? PAGE_DATA.calendar.gregorianMonths[currentMonth - 1] : PAGE_DATA.calendar.monthNames[currentMonth - 1]}`
                                : currentView === "months"
                                  ? `${currentYear} - ${isGregorian ? "Select Month" : "انتخاب ماه"}`
                                  : isGregorian ? "Select Year" : "انتخاب سال"}
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
                                {PAGE_DATA.calendar.weekDays.map((d, i) => (
                                  <div key={i}>{d}</div>
                                ))}
                              </div>
                              <div className="calendarDays">
                                {renderCalendar()}
                              </div>
                            </div>
                          )}
                          {currentView === "months" && (
                            <div className="calendarView active">
                              <div className="monthsGrid">
                                {(isGregorian ? PAGE_DATA.calendar.gregorianMonths : PAGE_DATA.calendar.monthNames).map(
                                  (name, idx) => (
                                    <div
                                      key={idx}
                                      className={`monthItem ${
                                        currentMonth === idx + 1 ? "selected" : ""
                                      }`}
                                      onClick={() => {
                                        setCurrentMonth(idx + 1);
                                        setCurrentView("days");
                                      }}
                                    >
                                      {name}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                          {currentView === "years" && (
                            <div className="calendarView active">
                              <div className="yearsWrapper">
                                <div className="yearsGrid">
                                  {Array.from(
                                    { length: isGregorian ? 100 : jToday.jy - 1300 + 1 },
                                    (_, i) => (isGregorian ? new Date().getFullYear() : jToday.jy) - i,
                                  ).map((y) => (
                                    <div
                                      key={y}
                                      className={`yearItem ${
                                        y === currentYear ? "selected" : ""
                                      }`}
                                      onClick={() => {
                                        setCurrentYear(y);
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
                            <button
                              className="btnClose"
                              onClick={closeCalendar}
                            >
                              {PAGE_DATA.calendar.closeButton}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="Field">
                    <label>{PAGE_DATA.passportCountry.label}</label>
                    <select>
                      <option value="" disabled selected>
                        {PAGE_DATA.passportCountry.placeholder}
                      </option>
                      {PAGE_DATA.passportCountry.options.map((country, idx) => (
                        <option key={idx} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="SectionHead Mt30">
                <span className="SectionTitle">{PAGE_DATA.contactTitle}</span>
              </div>
              {PAGE_DATA.contactFields.map((field) => (
                <div className="Field" key={field.id}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    id={field.id}
                    className={`${errors[field.id] ? "error" : ""} ${
                      shakeFields[field.id] ? "shake" : ""
                    }`}
                  />
                </div>
              ))}

              <div className="SectionHead Mt30">
                <span className="SectionTitle">
                  {PAGE_DATA.additionalTitle}
                </span>
              </div>
              <div className="Field">
                <label>{PAGE_DATA.orgField.label}</label>
                <input
                  type="text"
                  placeholder={PAGE_DATA.orgField.placeholder}
                />
              </div>
              <div className="Field">
                <label>{PAGE_DATA.extraField.label}</label>
                <input
                  type="text"
                  placeholder={PAGE_DATA.extraField.placeholder}
                />
              </div>
              <div className="Field">
                <div className="Grid3">
                  {PAGE_DATA.additionalSelects.map((opt, idx) => (
                    <select key={idx}>
                      <option>{opt}</option>
                    </select>
                  ))}
                </div>
              </div>
            </form>

            <div className="submit">
              <button>{PAGE_DATA.buttons.cancel}</button>
              <button onClick={handleSave}>{PAGE_DATA.buttons.save}</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error {
          border: 1px solid #e53935 !important;
          box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.2) !important;
          background-color: #fff5f5 !important;
        }
        .shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
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
