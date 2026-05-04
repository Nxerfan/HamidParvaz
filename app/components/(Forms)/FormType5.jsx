"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import "../globals.css";
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
  radioOptions: [
    { id: "domestic", label: "داخلی", value: "domestic" },
    { id: "foreign", label: "خارجی", value: "foreign" },
  ],
  destinationPlaceholder: "شهر مقصد",
  datePlaceholders: {
    start: "ورود",
    end: "خروج",
  },
  adultLabel: "بزرگسال",
  childLabel: "کودک",
  infantLabel: "نوزاد",
  searchButtonText: "جستجو",
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
  popularDestinationsTitle: "شهرهای پرسفر",
  searchIcon: faSearch,
  locationIcon: faLocationDot,
  historyIcon: faClockRotateLeft,
  closeIcon: faXmark,
  adultIcon: faUser,
  childIcon: faChild,
  infantIcon: faBaby,
  plusIcon: faPlus,
  minusIcon: faMinus,
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
      { id: 13, name: "رم", type: "foreign" },
      { id: 14, name: "بارسلونا", type: "foreign" },
    ],
  },
  onSearch: null,
};

export default function Form1() {
  const [tripType, setTripType] = useState("domestic");
  const [destinationInput, setDestinationInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const destinationInputRef = useRef(null);

  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const maxChildrenInfants = 3 * adultCount;
  const totalChildrenInfants = childCount + infantCount;

  const changeAdult = (delta) => {
    setAdultCount((prev) => {
      const newAdult = Math.max(1, prev + delta);
      if (newAdult < prev) {
        const newMax = 3 * newAdult;
        if (totalChildrenInfants > newMax) {
          let newInfant = infantCount;
          let newChild = childCount;
          const excess = totalChildrenInfants - newMax;
          if (newInfant > 0) {
            const reduceInfant = Math.min(newInfant, excess);
            newInfant -= reduceInfant;
            const remainingExcess = excess - reduceInfant;
            if (remainingExcess > 0) newChild -= remainingExcess;
          } else {
            newChild -= excess;
          }
          setInfantCount(newInfant);
          setChildCount(newChild);
        }
      }
      return newAdult;
    });
  };

  const incrementChild = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setChildCount((prev) => prev + 1);
    }
  };
  const decrementChild = () => {
    setChildCount((prev) => Math.max(0, prev - 1));
  };
  const incrementInfant = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setInfantCount((prev) => prev + 1);
    }
  };
  const decrementInfant = () => {
    setInfantCount((prev) => Math.max(0, prev - 1));
  };

  const handleTripTypeChange = (value) => {
    setTripType(value);
    setDestinationInput("");
  };

  const filteredDestinations = () => {
    const list = PAGE_DATA.destinations[tripType];
    if (!destinationInput.trim()) return list;
    return list.filter((item) => item.name.includes(destinationInput.trim()));
  };

  const filteredRecent = () => {
    if (!destinationInput.trim()) return recentSearches;
    return recentSearches.filter((item) =>
      item.name.includes(destinationInput.trim()),
    );
  };

  const handleSelectDestination = (dest) => {
    setDestinationInput(dest.name);
    setRecentSearches((prev) => {
      const exists = prev.find((item) => item.id === dest.id);
      if (exists) {
        return [exists, ...prev.filter((item) => item.id !== dest.id)].slice(
          0,
          5,
        );
      } else {
        return [dest, ...prev].slice(0, 5);
      }
    });
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== destinationInputRef.current
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const getDateValue = useCallback((jy, jm, jd) => {
    return jy * 10000 + jm * 100 + jd;
  }, []);

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

  const renderMonthsGrid = () => {
    return PAGE_DATA.monthNames.map((name, index) => {
      const month = index + 1;
      const isSelected = month === currentJm;
      return (
        <div
          key={month}
          className={`monthItem${isSelected ? " selected" : ""}`}
          onClick={() => {
            setCurrentJm(month);
            setCurrentView("days");
          }}
        >
          {name}
        </div>
      );
    });
  };

  const renderYearsGrid = () => {
    const startYear = 1300;
    const endYear = jToday.jy;
    const years = [];
    for (let y = endYear; y >= startYear; y--) {
      years.push(
        <div
          key={y}
          className={`yearItem${y === currentJy ? " selected" : ""}`}
          onClick={() => {
            setCurrentJy(y);
            setCurrentView("months");
          }}
        >
          {y}
        </div>,
      );
    }
    return years;
  };

  const startDateInputValue = selectedStartDate || "";
  const endDateInputValue = selectedEndDate || "";

  const handleSearch = () => {
    const params = {
      tripType,
      destination: destinationInput,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      adultCount,
      childCount,
      infantCount,
    };
    console.log("Search params:", params);
    if (PAGE_DATA.onSearch) PAGE_DATA.onSearch(params);
  };

  return (
    <>
      <section>
        <div className="List">
          <div className="Form">
            <div className="Top">
              {PAGE_DATA.radioOptions.map((opt) => (
                <label key={opt.id} className="radioLabel">
                  <input
                    type="radio"
                    name="tripType"
                    value={opt.value}
                    checked={tripType === opt.value}
                    onChange={() => handleTripTypeChange(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <div className="BottomHotel">
              <div className="LocationPicker" ref={dropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.searchIcon}
                    className="inputIcon"
                  />
                  <input
                    type="text"
                    placeholder={PAGE_DATA.destinationPlaceholder}
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    onFocus={handleInputFocus}
                    ref={destinationInputRef}
                  />
                  {destinationInput && (
                    <FontAwesomeIcon
                      icon={PAGE_DATA.closeIcon}
                      className="clearIcon"
                      onClick={() => setDestinationInput("")}
                    />
                  )}
                </div>
                {showDropdown && (
                  <div className="destinationDropdown">
                    {filteredRecent().length > 0 && (
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.historyIcon} />
                          <span>{PAGE_DATA.recentSearchesTitle}</span>
                        </div>
                        <ul>
                          {filteredRecent().map((item) => (
                            <li
                              key={item.id}
                              onClick={() => handleSelectDestination(item)}
                            >
                              <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                              <span>{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="dropdownSection">
                      <div className="sectionTitle">
                        <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                        <span>{PAGE_DATA.popularDestinationsTitle}</span>
                      </div>
                      <ul>
                        {filteredDestinations().map((item) => (
                          <li
                            key={item.id}
                            onClick={() => handleSelectDestination(item)}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {filteredDestinations().length === 0 && (
                          <li className="noResult">{PAGE_DATA.noResultText}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="DatePicker">
                <div className="dateInputWrapper" ref={calendarRef}>
                  <input
                    type="text"
                    id="startDateInput"
                    placeholder={PAGE_DATA.datePlaceholders.start}
                    value={startDateInputValue}
                    readOnly
                    onClick={() => openCalendar("start")}
                    className={activeInput === "start" ? "active" : ""}
                  />
                  <input
                    type="text"
                    id="endDateInput"
                    placeholder={PAGE_DATA.datePlaceholders.end}
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
                            ? `${currentJy} ${PAGE_DATA.monthNames[currentJm - 1]}`
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
                            {PAGE_DATA.weekDays.map((d, i) => (
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
                          {PAGE_DATA.calendarCloseText}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="Guests">
                <button
                  type="button"
                  onClick={() => setShowGuests(!showGuests)}
                >
                  <FontAwesomeIcon icon={PAGE_DATA.adultIcon} /> {adultCount}{" "}
                  بزرگسال ، <FontAwesomeIcon icon={PAGE_DATA.childIcon} />{" "}
                  {totalChildrenInfants} خردسال
                </button>
                {showGuests && (
                  <div className="GuestDropdown">
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.adultIcon} />
                        <span>{PAGE_DATA.adultLabel}</span>
                      </div>
                      <div className="AdultAndChildCount">
                        <button
                          onClick={() => changeAdult(-1)}
                          disabled={adultCount <= 1}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{adultCount}</span>
                        <button onClick={() => changeAdult(1)}>
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.childIcon} />
                        <span>{PAGE_DATA.childLabel}</span>
                      </div>
                      <div className="AdultAndChildCount">
                        <button
                          onClick={decrementChild}
                          disabled={childCount <= 0}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{childCount}</span>
                        <button
                          onClick={incrementChild}
                          disabled={totalChildrenInfants >= maxChildrenInfants}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.infantIcon} />
                        <span>{PAGE_DATA.infantLabel}</span>
                      </div>
                      <div className="AdultAndChildCount">
                        <button
                          onClick={decrementInfant}
                          disabled={infantCount <= 0}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{infantCount}</span>
                        <button
                          onClick={incrementInfant}
                          disabled={totalChildrenInfants >= maxChildrenInfants}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="Submit">
                <button type="button" onClick={handleSearch}>
                  {PAGE_DATA.searchButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
