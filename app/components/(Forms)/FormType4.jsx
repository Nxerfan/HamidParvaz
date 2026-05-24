// HotelSearchForm.js
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLocationDot,
  faClockRotateLeft,
  faXmark,
  faUser,
  faChild,
  faBaby,
  faPlus,
  faMinus,
  faPen,
  faBed,
  faDoorOpen,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "../globals.css";

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
  jMonthLength: function (jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    const isLeap =
      jy % 33 === 1 ||
      jy % 33 === 5 ||
      jy % 33 === 9 ||
      jy % 33 === 13 ||
      jy % 33 === 17 ||
      jy % 33 === 22 ||
      jy % 33 === 26 ||
      jy % 33 === 30;
    return isLeap ? 30 : 29;
  },
};

// دیتای استاتیک
const HOTEL_DATA = {
  destinationPlaceholder: "نام هتل یا شهر",
  searchButtonText: "جستجوی هتل",
  calendarCloseText: "بستن",
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
  noResultText: "نتیجه‌ای یافت نشد",
  recentSearchesTitle: "جستجوهای اخیر",
  popularDestinationsTitle: "شهرهای پررفت‌وآمد",
  searchIcon: faSearch,
  locationIcon: faLocationDot,
  historyIcon: faClockRotateLeft,
  closeIcon: faXmark,
  adultIcon: faUser,
  childIcon: faChild,
  infantIcon: faBaby,
  plusIcon: faPlus,
  minusIcon: faMinus,
  editIcon: faPen,
  bedIcon: faBed,
  roomIcon: faDoorOpen,
  saveIcon: faSave,
  destinations: {
    domestic: [
      { id: 1, name: "تهران", type: "domestic" },
      { id: 2, name: "مشهد", type: "domestic" },
      { id: 3, name: "اصفهان", type: "domestic" },
      { id: 4, name: "شیراز", type: "domestic" },
      { id: 5, name: "تبریز", type: "domestic" },
      { id: 6, name: "کیش", type: "domestic" },
      { id: 7, name: "قم", type: "domestic" },
      { id: 8, name: "اهواز", type: "domestic" },
    ],
    foreign: [
      { id: 9, name: "استانبول", type: "foreign" },
      { id: 10, name: "دبی", type: "foreign" },
      { id: 11, name: "پاریس", type: "foreign" },
      { id: 12, name: "لندن", type: "foreign" },
    ],
  },
  onSearch: null,
};

// تابع توزیع خودکار تخت
function autoDistributeBeds(totalBeds, numRooms) {
  if (numRooms <= 0) return [];
  if (totalBeds < numRooms) return new Array(numRooms).fill(1);
  const base = Math.floor(totalBeds / numRooms);
  const remainder = totalBeds % numRooms;
  const distribution = new Array(numRooms).fill(base);
  for (let i = 0; i < remainder; i++) distribution[i]++;
  return distribution;
}

export default function HotelSearchForm() {
  // مقصد
  const [destinationInput, setDestinationInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const destinationInputRef = useRef(null);

  // تاریخ
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateInput, setActiveDateInput] = useState(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const [hoverDate, setHoverDate] = useState(null);
  const calendarRef = useRef(null);

  // مسافران
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  // اتاق و تخت
  const [numRooms, setNumRooms] = useState(1);
  const [bedDistribution, setBedDistribution] = useState([1]);
  const [isManualDistribution, setIsManualDistribution] = useState(false);
  const [showRoomEditor, setShowRoomEditor] = useState(false);
  const [tempDistribution, setTempDistribution] = useState([]);

  // خطاها
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  const totalBedsNeeded = adultCount + childCount; // نوزاد تخت نمی‌خواهد

  // بروزرسانی خودکار توزیع تخت
  useEffect(() => {
    if (!isManualDistribution) {
      setBedDistribution(autoDistributeBeds(totalBedsNeeded, numRooms));
    } else {
      const currentTotal = bedDistribution.reduce((a, b) => a + b, 0);
      if (
        currentTotal !== totalBedsNeeded ||
        bedDistribution.length !== numRooms
      ) {
        setIsManualDistribution(false);
        setBedDistribution(autoDistributeBeds(totalBedsNeeded, numRooms));
      }
    }
  }, [totalBedsNeeded, numRooms, isManualDistribution]);

  // توابع تغییر افراد
  const changeAdult = (delta) => {
    setAdultCount((prev) => Math.max(1, prev + delta));
    setIsManualDistribution(false);
  };
  const changeChild = (delta) => {
    setChildCount((prev) => Math.max(0, prev + delta));
    setIsManualDistribution(false);
  };
  const changeInfant = (delta) => {
    setInfantCount((prev) => Math.max(0, prev + delta));
    setIsManualDistribution(false);
  };
  const changeRooms = (delta) => {
    const newRooms = Math.max(1, numRooms + delta);
    if (newRooms > totalBedsNeeded) {
      triggerErrorShake("rooms");
      return;
    }
    setNumRooms(newRooms);
    setIsManualDistribution(false);
  };

  // توابع تاریخ (خلاصه شده، مشابه قبل)
  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const jDateToString = (jy, jm, jd) =>
    `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  const stringToJDate = (str) => {
    if (!str) return null;
    const parts = str.split("/");
    return {
      jy: parseInt(parts[0]),
      jm: parseInt(parts[1]),
      jd: parseInt(parts[2]),
    };
  };
  const getDateValue = (jy, jm, jd) => jy * 10000 + jm * 100 + jd;

  const selectDate = (jy, jm, jd) => {
    const dateStr = jDateToString(jy, jm, jd);
    if (activeDateInput === "in") {
      setCheckIn(dateStr);
      if (
        checkOut &&
        getDateValue(jy, jm, jd) >=
          getDateValue(...Object.values(stringToJDate(checkOut)))
      )
        setCheckOut(null);
      setActiveDateInput("out");
      setShowCalendar(true);
    } else if (activeDateInput === "out") {
      if (
        checkIn &&
        getDateValue(jy, jm, jd) <=
          getDateValue(...Object.values(stringToJDate(checkIn)))
      ) {
        triggerErrorShake("checkOut");
        return;
      }
      setCheckOut(dateStr);
      setShowCalendar(false);
      setActiveDateInput(null);
    } else {
      setCheckIn(dateStr);
      setCheckOut(null);
      setActiveDateInput("out");
      setShowCalendar(true);
    }
    setCurrentJy(jy);
    setCurrentJm(jm);
    setErrors((prev) => ({ ...prev, checkIn: false, checkOut: false }));
  };

  const openCalendar = (type) => {
    let target =
      type === "in"
        ? checkIn
          ? stringToJDate(checkIn)
          : jToday
        : checkOut
          ? stringToJDate(checkOut)
          : checkIn
            ? stringToJDate(checkIn)
            : jToday;
    setActiveDateInput(type);
    setCurrentJy(target.jy);
    setCurrentJm(target.jm);
    setCurrentView("days");
    setShowCalendar(true);
  };
  const closeCalendar = () => {
    setShowCalendar(false);
    setActiveDateInput(null);
    setHoverDate(null);
  };

  // رندر تقویم (ساده شده)
  const renderCalendar = () => {
    const daysInMonth = jalaali.jMonthLength(currentJy, currentJm);
    const gDate = jalaali.toGregorian(currentJy, currentJm, 1);
    const startDayOfWeek =
      (new Date(gDate.gy, gDate.gm - 1, gDate.gd).getDay() + 1) % 7;
    let cells = [];
    for (let i = 0; i < startDayOfWeek; i++)
      cells.push(<div key={`e-${i}`} className="calendarDay empty"></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = jDateToString(currentJy, currentJm, d);
      const isToday =
        currentJy === jToday.jy && currentJm === jToday.jm && d === jToday.jd;
      const isSelected = dateStr === checkIn || dateStr === checkOut;
      let inRange = false,
        hoverRange = false;
      if (checkIn && checkOut) {
        const start = stringToJDate(checkIn),
          end = stringToJDate(checkOut);
        const val = getDateValue(currentJy, currentJm, d);
        inRange =
          val > getDateValue(start.jy, start.jm, start.jd) &&
          val < getDateValue(end.jy, end.jm, end.jd);
      } else if (
        checkIn &&
        !checkOut &&
        activeDateInput === "out" &&
        hoverDate
      ) {
        const start = stringToJDate(checkIn),
          end = hoverDate;
        const val = getDateValue(currentJy, currentJm, d);
        hoverRange =
          val > getDateValue(start.jy, start.jm, start.jd) &&
          val < getDateValue(end.jy, end.jm, end.jd);
      }
      cells.push(
        <div
          key={d}
          className={`calendarDay${isToday ? " today" : ""}${isSelected ? " selected" : ""}${inRange ? " in-range" : ""}${hoverRange ? " hover-range" : ""}`}
          onClick={() => selectDate(currentJy, currentJm, d)}
          onMouseEnter={() => {
            if (checkIn && !checkOut && activeDateInput === "out")
              setHoverDate({ jy: currentJy, jm: currentJm, jd: d });
          }}
        >
          {d}
        </div>,
      );
    }
    return cells;
  };
  const handlePrevMonth = () => {
    if (currentJm === 1) {
      setCurrentJy((y) => y - 1);
      setCurrentJm(12);
    } else setCurrentJm((m) => m - 1);
  };
  const handleNextMonth = () => {
    if (currentJm === 12) {
      setCurrentJy((y) => y + 1);
      setCurrentJm(1);
    } else setCurrentJm((m) => m + 1);
  };
  const handleCalendarTitleClick = () => {
    if (currentView === "days") setCurrentView("years");
    else if (currentView === "years") setCurrentView("months");
    else setCurrentView("days");
  };
  const renderMonthsGrid = () =>
    HOTEL_DATA.monthNames.map((n, idx) => (
      <div
        key={idx + 1}
        className={`monthItem${currentJm === idx + 1 ? " selected" : ""}`}
        onClick={() => {
          setCurrentJm(idx + 1);
          setCurrentView("days");
        }}
      >
        {n}
      </div>
    ));
  const renderYearsGrid = () => {
    let years = [];
    for (let y = jToday.jy; y >= 1300; y--)
      years.push(
        <div
          key={y}
          className={`yearItem${currentJy === y ? " selected" : ""}`}
          onClick={() => {
            setCurrentJy(y);
            setCurrentView("months");
          }}
        >
          {y}
        </div>,
      );
    return years;
  };

  // ویرایش دستی تخت‌ها
  const openRoomEditor = () => {
    setTempDistribution([...bedDistribution]);
    setShowRoomEditor(true);
  };
  const updateTempBed = (idx, delta) => {
    const newDist = [...tempDistribution];
    const newVal = newDist[idx] + delta;
    if (newVal < 1) return;
    const totalOther = newDist.reduce((a, b, i) => a + (i === idx ? 0 : b), 0);
    if (totalOther + newVal > totalBedsNeeded) return;
    newDist[idx] = newVal;
    setTempDistribution(newDist);
  };
  const saveRoomDistribution = () => {
    if (tempDistribution.reduce((a, b) => a + b, 0) !== totalBedsNeeded) {
      triggerErrorShake("roomDistribution");
      return;
    }
    setBedDistribution(tempDistribution);
    setIsManualDistribution(true);
    setShowRoomEditor(false);
  };

  // اعتبارسنجی نهایی
  const triggerErrorShake = (field) => {
    setShakeFields((prev) => ({ ...prev, [field]: true }));
    setTimeout(
      () =>
        setShakeFields((prev) => {
          const newShake = { ...prev };
          delete newShake[field];
          return newShake;
        }),
      500,
    );
  };
  const validateForm = () => {
    const newErrors = {};
    if (!destinationInput.trim()) newErrors.destination = true;
    if (!checkIn) newErrors.checkIn = true;
    if (!checkOut) newErrors.checkOut = true;
    if (numRooms > totalBedsNeeded) newErrors.rooms = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach((f) => triggerErrorShake(f));
      return false;
    }
    return true;
  };
  const handleSearch = () => {
    if (!validateForm()) return;
    const params = {
      destination: destinationInput,
      checkIn,
      checkOut,
      adults: adultCount,
      children: childCount,
      infants: infantCount,
      rooms: numRooms,
      bedDistribution,
    };
    console.log("Hotel Search:", params);
    if (HOTEL_DATA.onSearch) HOTEL_DATA.onSearch(params);
  };

  // رندر dropdown مقصد
  const filteredDestinations = () => {
    const all = [
      ...HOTEL_DATA.destinations.domestic,
      ...HOTEL_DATA.destinations.foreign,
    ];
    if (!destinationInput.trim()) return all;
    return all.filter((item) => item.name.includes(destinationInput.trim()));
  };
  const handleSelectDestination = (dest) => {
    setDestinationInput(dest.name);
    setRecentSearches((prev) => {
      const exists = prev.find((i) => i.id === dest.id);
      if (exists)
        return [exists, ...prev.filter((i) => i.id !== dest.id)].slice(0, 5);
      return [dest, ...prev].slice(0, 5);
    });
    setShowDropdown(false);
    setErrors((prev) => ({ ...prev, destination: false }));
  };

  return (
    <div className="List2">
      <div className="Form">
        <div className="BottomHotel">
          {/* Location Picker */}
          <div className="LocationPicker" ref={dropdownRef}>
            <div className="inputWithIcon">
              <FontAwesomeIcon
                icon={HOTEL_DATA.searchIcon}
                className="inputIcon"
              />
              <input
                type="text"
                placeholder={HOTEL_DATA.destinationPlaceholder}
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                ref={destinationInputRef}
                className={errors.destination ? "error" : ""}
              />
              {destinationInput && (
                <FontAwesomeIcon
                  icon={HOTEL_DATA.closeIcon}
                  className="clearIcon"
                  onClick={() => setDestinationInput("")}
                />
              )}
            </div>
            {showDropdown && (
              <div className="destinationDropdown">
                {recentSearches.length > 0 && (
                  <div className="dropdownSection">
                    <div className="sectionTitle">
                      <FontAwesomeIcon icon={HOTEL_DATA.historyIcon} />
                      <span>{HOTEL_DATA.recentSearchesTitle}</span>
                    </div>
                    <ul>
                      {recentSearches.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSelectDestination(item)}
                        >
                          <FontAwesomeIcon icon={HOTEL_DATA.locationIcon} />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="dropdownSection">
                  <div className="sectionTitle">
                    <FontAwesomeIcon icon={HOTEL_DATA.locationIcon} />
                    <span>{HOTEL_DATA.popularDestinationsTitle}</span>
                  </div>
                  <ul>
                    {filteredDestinations().map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectDestination(item)}
                      >
                        <FontAwesomeIcon icon={HOTEL_DATA.locationIcon} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                    {filteredDestinations().length === 0 && (
                      <li className="noResult">{HOTEL_DATA.noResultText}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div className="DatePicker">
            <div className="dateInputWrapper" ref={calendarRef}>
              <input
                type="text"
                placeholder="تاریخ ورود"
                value={checkIn || ""}
                readOnly
                onClick={() => openCalendar("in")}
                className={`${activeDateInput === "in" ? "active" : ""} ${errors.checkIn ? "error" : ""} ${shakeFields.checkIn ? "shake" : ""}`}
              />
              <input
                type="text"
                placeholder="تاریخ خروج"
                value={checkOut || ""}
                readOnly
                onClick={() => openCalendar("out")}
                className={`${activeDateInput === "out" ? "active" : ""} ${errors.checkOut ? "error" : ""} ${shakeFields.checkOut ? "shake" : ""}`}
              />
            </div>
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
                  <button className="calendarNavBtn" onClick={handleNextMonth}>
                    &gt;
                  </button>
                  <span
                    className="calendarTitle"
                    onClick={handleCalendarTitleClick}
                  >
                    {currentView === "days"
                      ? `${currentJy} ${HOTEL_DATA.monthNames[currentJm - 1]}`
                      : currentView === "months"
                        ? `${currentJy} - انتخاب ماه`
                        : "انتخاب سال"}
                  </span>
                  <button className="calendarNavBtn" onClick={handlePrevMonth}>
                    &lt;
                  </button>
                </div>
                {currentView === "days" && (
                  <div className="calendarView active">
                    <div className="calendarWeekdays">
                      {HOTEL_DATA.weekDays.map((d, i) => (
                        <div key={i}>{d}</div>
                      ))}
                    </div>
                    <div className="calendarDays">{renderCalendar()}</div>
                  </div>
                )}
                {currentView === "months" && (
                  <div className="calendarView active">
                    <div className="monthsGrid">{renderMonthsGrid()}</div>
                  </div>
                )}
                {currentView === "years" && (
                  <div className="calendarView active">
                    <div className="yearsWrapper">
                      <div className="yearsGrid">{renderYearsGrid()}</div>
                    </div>
                  </div>
                )}
                <div className="calendarFooter">
                  <button className="btnClose" onClick={closeCalendar}>
                    {HOTEL_DATA.calendarCloseText}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PaxPicker + RoomSelector یکپارچه */}
          <div className="PaxPicker">
            <button type="button" onClick={() => setShowGuests(!showGuests)}>
              <FontAwesomeIcon icon={HOTEL_DATA.adultIcon} /> {adultCount}{" "}
              بزرگسال ، <FontAwesomeIcon icon={HOTEL_DATA.childIcon} />{" "}
              {childCount} کودک ،{" "}
              <FontAwesomeIcon icon={HOTEL_DATA.infantIcon} /> {infantCount}{" "}
              نوزاد
            </button>
            {showGuests && (
              <div className="GuestDropdown">
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={HOTEL_DATA.adultIcon} />
                    <span>بزرگسال</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeAdult(-1)}
                      disabled={adultCount <= 1}
                    >
                      <FontAwesomeIcon icon={HOTEL_DATA.minusIcon} />
                    </button>
                    <span>{adultCount}</span>
                    <button onClick={() => changeAdult(1)}>
                      <FontAwesomeIcon icon={HOTEL_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={HOTEL_DATA.childIcon} />
                    <span>کودک</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeChild(-1)}
                      disabled={childCount <= 0}
                    >
                      <FontAwesomeIcon icon={HOTEL_DATA.minusIcon} />
                    </button>
                    <span>{childCount}</span>
                    <button onClick={() => changeChild(1)}>
                      <FontAwesomeIcon icon={HOTEL_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={HOTEL_DATA.infantIcon} />
                    <span>نوزاد</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeInfant(-1)}
                      disabled={infantCount <= 0}
                    >
                      <FontAwesomeIcon icon={HOTEL_DATA.minusIcon} />
                    </button>
                    <span>{infantCount}</span>
                    <button onClick={() => changeInfant(1)}>
                      <FontAwesomeIcon icon={HOTEL_DATA.plusIcon} />
                    </button>
                  </div>
                </div>

                {/* بخش اتاق و تخت (زیربخش) */}
                <div className="RoomSelector">
                  <div className="roomHeader">
                    <span>
                      <FontAwesomeIcon icon={HOTEL_DATA.roomIcon} /> تعداد
                      اتاق‌ها
                    </span>
                    <div className="roomCounter">
                      <button
                        onClick={() => changeRooms(-1)}
                        disabled={numRooms <= 1}
                      >
                        <FontAwesomeIcon icon={HOTEL_DATA.minusIcon} />
                      </button>
                      <span>{numRooms}</span>
                      <button
                        onClick={() => changeRooms(1)}
                        disabled={numRooms >= totalBedsNeeded}
                      >
                        <FontAwesomeIcon icon={HOTEL_DATA.plusIcon} />
                      </button>
                    </div>
                  </div>
                  {errors.rooms && (
                    <div className="errorMsg">
                      تعداد اتاق نمی‌تواند از کل تخت‌ها بیشتر باشد
                    </div>
                  )}
                  <div className="bedSummary">
                    <FontAwesomeIcon icon={HOTEL_DATA.bedIcon} />
                    <span>
                      {bedDistribution.map((b, idx) => `${b} تخته`).join(" و ")}{" "}
                      ({bedDistribution.length} اتاق)
                    </span>
                    <button className="editBtn" onClick={openRoomEditor}>
                      <FontAwesomeIcon icon={HOTEL_DATA.editIcon} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* دکمه جستجو */}
          <div className="Submit">
            <button onClick={handleSearch}>
              {HOTEL_DATA.searchButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* مودال ویرایش تخت */}
      {showRoomEditor && (
        <div className="modalOverlay" onClick={() => setShowRoomEditor(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>توزیع تخت در اتاق‌ها</h3>
            <p>کل تخت‌های مورد نیاز: {totalBedsNeeded} تخت</p>
            {tempDistribution.map((beds, idx) => (
              <div key={idx} className="roomEditorRow">
                <span>اتاق {idx + 1}</span>
                <div className="bedCounter">
                  <button
                    onClick={() => updateTempBed(idx, -1)}
                    disabled={beds <= 1}
                  >
                    <FontAwesomeIcon icon={HOTEL_DATA.minusIcon} />
                  </button>
                  <span>{beds} تخت</span>
                  <button
                    onClick={() => updateTempBed(idx, 1)}
                    disabled={
                      tempDistribution.reduce((a, b) => a + b, 0) + 1 >
                      totalBedsNeeded
                    }
                  >
                    <FontAwesomeIcon icon={HOTEL_DATA.plusIcon} />
                  </button>
                </div>
              </div>
            ))}
            <div className="modalActions">
              <button className="saveBtn" onClick={saveRoomDistribution}>
                <FontAwesomeIcon icon={HOTEL_DATA.saveIcon} /> ذخیره
              </button>
              <button
                className="cancelBtn"
                onClick={() => setShowRoomEditor(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
