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
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

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

const TOUR_DATA = {
  radioOptions: [
    { id: "domestic", label: "داخلی", value: "domestic" },
    { id: "foreign", label: "خارجی", value: "foreign" },
  ],
  destinationPlaceholder: "مقصد (شهر یا هتل)",
  searchButtonText: "جستجوی تور",
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
  popularDestinationsTitle: "مقصدهای پرمسافر",
  searchIcon: faSearch,
  locationIcon: faLocationDot,
  historyIcon: faClockRotateLeft,
  closeIcon: faXmark,
  adultIcon: faUser,
  childIcon: faChild,
  infantIcon: faBaby,
  plusIcon: faPlus,
  minusIcon: faMinus,
  calendarIcon: faCalendarAlt,
  destinations: {
    domestic: [
      { id: 1, name: "مشهد", type: "domestic" },
      { id: 2, name: "کیش", type: "domestic" },
      { id: 3, name: "تهران", type: "domestic" },
      { id: 4, name: "شیراز", type: "domestic" },
      { id: 5, name: "اصفهان", type: "domestic" },
      { id: 6, name: "تبریز", type: "domestic" },
      { id: 7, name: "قشم", type: "domestic" },
      { id: 8, name: "رامسر", type: "domestic" },
    ],
    foreign: [
      { id: 9, name: "استانبول", type: "foreign" },
      { id: 10, name: "دبی", type: "foreign" },
      { id: 11, name: "آنکارا", type: "foreign" },
      { id: 12, name: "باکو", type: "foreign" },
      { id: 13, name: "بغداد", type: "foreign" },
    ],
  },
  onSearch: null,
};

export default function TourSearchForm() {
  const [tourType, setTourType] = useState(null);

  const [destinationInput, setDestinationInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const destinationInputRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const calendarRef = useRef(null);

  const [durationNights, setDurationNights] = useState(5);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

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

  const selectDate = (jy, jm, jd) => {
    const dateStr = jDateToString(jy, jm, jd);
    setStartDate(dateStr);
    setShowCalendar(false);
    setErrors((prev) => ({ ...prev, startDate: false }));
  };

  const openCalendar = () => {
    setCurrentJy(startDate ? stringToJDate(startDate).jy : jToday.jy);
    setCurrentJm(startDate ? stringToJDate(startDate).jm : jToday.jm);
    setCurrentView("days");
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

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
      const isSelected = dateStr === startDate;
      cells.push(
        <div
          key={d}
          className={`calendarDay${isToday ? " today" : ""}${isSelected ? " selected" : ""}`}
          onClick={() => selectDate(currentJy, currentJm, d)}
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
    TOUR_DATA.monthNames.map((n, idx) => (
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

  const changeDuration = (delta) => {
    const newVal = durationNights + delta;
    if (newVal >= 1 && newVal <= 30) {
      setDurationNights(newVal);
    }
  };
  const getDurationText = () => {
    const days = durationNights + 1;
    return `${days} روز و ${durationNights} شب`;
  };

  const changeAdult = (delta) => {
    setAdultCount((prev) => Math.max(1, prev + delta));
  };
  const changeChild = (delta) => {
    setChildCount((prev) => Math.max(0, prev + delta));
  };
  const changeInfant = (delta) => {
    setInfantCount((prev) => Math.max(0, prev + delta));
  };
  const childCountN = childCount + infantCount; 
  const filteredDestinations = () => {
    const all = tourType
      ? TOUR_DATA.destinations[tourType]
      : [...TOUR_DATA.destinations.domestic, ...TOUR_DATA.destinations.foreign];
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
    if (!tourType) newErrors.tourType = true;
    if (!destinationInput.trim()) newErrors.destination = true;
    if (!startDate) newErrors.startDate = true;
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
      tourType,
      destination: destinationInput,
      startDate,
      durationNights,
      durationText: getDurationText(),
      adults: adultCount,
      children: childCount,
      infants: infantCount,
    };
    console.log("Tour Search Params:", params);
    if (TOUR_DATA.onSearch) TOUR_DATA.onSearch(params);
  };

  return (
    <div className="List2">
      <div className="Form">
        {/* ردیف بالا: نوع تور (داخلی/خارجی) */}
        <div className="Top">
          {TOUR_DATA.radioOptions.map((opt) => (
            <label key={opt.id} className="radioLabel">
              <input
                type="radio"
                name="tourType"
                value={opt.value}
                checked={tourType === opt.value}
                onChange={() => {
                  setTourType(opt.value);
                  setDestinationInput("");
                  setErrors({});
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* ردیف پایین: مقصد، تاریخ حرکت، مدت زمان، مسافران، جستجو */}
        <div className="BottomHotel">
          {/* مقصد */}
          <div className="LocationPicker" ref={dropdownRef}>
            <div className="inputWithIcon">
              <FontAwesomeIcon
                icon={TOUR_DATA.searchIcon}
                className="inputIcon"
              />
              <input
                type="text"
                placeholder={TOUR_DATA.destinationPlaceholder}
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                ref={destinationInputRef}
                className={errors.destination ? "error" : ""}
              />
              {destinationInput && (
                <FontAwesomeIcon
                  icon={TOUR_DATA.closeIcon}
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
                      <FontAwesomeIcon icon={TOUR_DATA.historyIcon} />
                      <span>{TOUR_DATA.recentSearchesTitle}</span>
                    </div>
                    <ul>
                      {recentSearches.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSelectDestination(item)}
                        >
                          <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="dropdownSection">
                  <div className="sectionTitle">
                    <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                    <span>{TOUR_DATA.popularDestinationsTitle}</span>
                  </div>
                  <ul>
                    {filteredDestinations().map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectDestination(item)}
                      >
                        <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                    {filteredDestinations().length === 0 && (
                      <li className="noResult">{TOUR_DATA.noResultText}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* تاریخ حرکت */}
          <div className="DatePicker">
            <div className="dateInputWrapper" ref={calendarRef}>
              <input
                type="text"
                placeholder="تاریخ حرکت"
                value={startDate || ""}
                readOnly
                onClick={openCalendar}
                className={`${errors.startDate ? "error" : ""} ${shakeFields.startDate ? "shake" : ""}`}
              />
            </div>
            {showCalendar && (
              <div className="calendarPopup show">
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
                      ? `${currentJy} ${TOUR_DATA.monthNames[currentJm - 1]}`
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
                      {TOUR_DATA.weekDays.map((d, i) => (
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
                    {TOUR_DATA.calendarCloseText}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* مدت زمان تور */}
          <div className="DurationPicker">
            <button
              type="button"
              onClick={() => setShowDurationDropdown(!showDurationDropdown)}
            >
              <span>{getDurationText()}</span>
              <FontAwesomeIcon icon={TOUR_DATA.calendarIcon} />
            </button>
            {showDurationDropdown && (
              <div className="DurationDropdown">
                <div className="durationRow">
                  <span>مدت اقامت (شب)</span>
                  <div className="durationControls">
                    <button
                      onClick={() => changeDuration(-1)}
                      disabled={durationNights <= 1}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{durationNights}</span>
                    <button
                      onClick={() => changeDuration(1)}
                      disabled={durationNights >= 30}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
                <div className="durationText">{getDurationText()}</div>
              </div>
            )}
          </div>

          {/* تعداد مسافران */}
          <div className="PaxPicker">
            <button type="button" onClick={() => setShowGuests(!showGuests)}>
              <FontAwesomeIcon icon={TOUR_DATA.adultIcon} /> {adultCount}{" "}
              بزرگسال ، <FontAwesomeIcon icon={TOUR_DATA.childIcon} />{" "}
              {childCountN} کودک
            </button>
            {showGuests && (
              <div className="GuestDropdown">
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={TOUR_DATA.adultIcon} />
                    <span>بزرگسال</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeAdult(-1)}
                      disabled={adultCount <= 1}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{adultCount}</span>
                    <button onClick={() => changeAdult(1)}>
                      <FontAwesomeIcon icon={TOUR_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={TOUR_DATA.childIcon} />
                    <span>کودک</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeChild(-1)}
                      disabled={childCount <= 0}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{childCount}</span>
                    <button onClick={() => changeChild(1)}>
                      <FontAwesomeIcon icon={TOUR_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={TOUR_DATA.infantIcon} />
                    <span>نوزاد</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      onClick={() => changeInfant(-1)}
                      disabled={infantCount <= 0}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{infantCount}</span>
                    <button onClick={() => changeInfant(1)}>
                      <FontAwesomeIcon icon={TOUR_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* دکمه جستجو */}
          <div className="Submit">
            <button onClick={handleSearch}>{TOUR_DATA.searchButtonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
