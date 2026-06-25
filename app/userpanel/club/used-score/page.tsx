"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import "../../global.css";
import FilterUserPannel from "../../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../../components/(Headers)/UserPannelHeader";

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
  title: "کدهای تخفیف دریافت شده",
  dateLabel: "تاریخ دریافت:",
  fromPlaceholder: "از تاریخ",
  toPlaceholder: "تاریخ تا",
  typeLabel: "نوع امتیاز:",
  typePlaceholder: "همه",
  typeOptions: [
    { value: "received", text: "دریافت شده" },
    { value: "deducted", text: "کسر شده" },
  ],
  buttonText: "جستجو",
  tableHeaders: ["ردیف", "عنوان", "کد فعال‌سازی", "تاریخ خرید"],
  calendarCloseText: "بستن",
  weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  monthNames: [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
  ],
};

export default function Page() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [scoreType, setScoreType] = useState("");

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const calendarRef = useRef(null);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const jDateToString = useCallback((jy, jm, jd) => {
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  }, []);

  const stringToJDate = useCallback((str) => {
    if (!str) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    return { jy: parseInt(parts[0]), jm: parseInt(parts[1]), jd: parseInt(parts[2]) };
  }, []);

  const getDateValue = useCallback((jy, jm, jd) => jy * 10000 + jm * 100 + jd, []);

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
    [selectedStartDate, selectedEndDate, stringToJDate, getDateValue]
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
    [selectedStartDate, selectedEndDate, hoverDate, stringToJDate, getDateValue]
  );

  const selectDate = useCallback(
    (jy, jm, jd) => {
      const dateStr = jDateToString(jy, jm, jd);
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(dateStr);
        setSelectedEndDate(null);
        setFromDate(dateStr);
        setToDate("");
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
          setFromDate(dateStr);
          setToDate(selectedStartDate);
        } else {
          setSelectedEndDate(dateStr);
          setToDate(dateStr);
        }
        setShowCalendar(false);
        setActiveInput(null);
        setHoverDate(null);
      }
    },
    [selectedStartDate, selectedEndDate, jDateToString, stringToJDate, getDateValue]
  );

  const openCalendar = useCallback(
    (inputType) => {
      let targetDate;
      if (inputType === "start") {
        targetDate = selectedStartDate ? stringToJDate(selectedStartDate) : null;
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
    [selectedStartDate, selectedEndDate, jToday, stringToJDate]
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
        </div>
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
    console.log({ fromDate, toDate, scoreType });
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
            <div className="UserPanelParts">
              <div className="TopCard">
                <p>{PAGE_DATA.title}</p>
              </div>
              <div className="Time">
                <div className="R">
                  <p>{PAGE_DATA.dateLabel}</p>
                  <div className="DatePicker" ref={calendarRef}>
                    <input
                      type="text"
                      id="startDateInput"
                      placeholder={PAGE_DATA.fromPlaceholder}
                      value={fromDate}
                      readOnly
                      onClick={() => openCalendar("start")}
                      className={activeInput === "start" ? "active" : ""}
                    />
                    <input
                      type="text"
                      id="endDateInput"
                      placeholder={PAGE_DATA.toPlaceholder}
                      value={toDate}
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
                          <button className="calendarNavBtn" onClick={handleNextMonth}>
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
                          <button className="calendarNavBtn" onClick={handlePrevMonth}>
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
                            <div className="monthsGrid">
                              {PAGE_DATA.monthNames.map((name, idx) => (
                                <div
                                  key={idx}
                                  className={`monthItem ${
                                    currentJm === idx + 1 ? "selected" : ""
                                  }`}
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
                                  (_, i) => jToday.jy - i
                                ).map((y) => (
                                  <div
                                    key={y}
                                    className={`yearItem ${
                                      y === currentJy ? "selected" : ""
                                    }`}
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
                            {PAGE_DATA.calendarCloseText}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="L">
                  <p>{PAGE_DATA.typeLabel}</p>
                  <div className="DatePicker">
                    <select
                      value={scoreType}
                      onChange={(e) => setScoreType(e.target.value)}
                    >
                      <option value="" disabled selected>
                        {PAGE_DATA.typePlaceholder}
                      </option>
                      {PAGE_DATA.typeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button className="BtnPrimary" onClick={handleSearch}>
                {PAGE_DATA.buttonText}
              </button>
              <div className="table">
                <table>
                  <tr>
                    {PAGE_DATA.tableHeaders.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </table>
              </div>
            </div>
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