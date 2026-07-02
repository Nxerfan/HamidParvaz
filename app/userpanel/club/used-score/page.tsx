"use client";

import { useState, useEffect } from "react";

import "../../global.css";
import FilterUserPannel from "../../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../../components/(Headers)/UserPannelHeader";
import { useCalendar } from "../../../lib/useCalendar";

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

  const calendar = useCalendar({ mode: "range" });

  const { selectedStartDate, selectedEndDate, showCalendar, activeInput, currentJy, currentJm, currentView, calendarRef, jDateToString, jToday, selectDate, openCalendar, closeCalendar, handleCalendarTitleClick, handlePrevMonth, handleNextMonth, renderCalendarDays, setCurrentJy, setCurrentJm, setCurrentView, setHoverDate } = calendar;

  useEffect(() => {
    if (selectedStartDate) {
      setFromDate(jDateToString(selectedStartDate.jy, selectedStartDate.jm, selectedStartDate.jd));
    }
    if (selectedEndDate) {
      setToDate(jDateToString(selectedEndDate.jy, selectedEndDate.jm, selectedEndDate.jd));
    }
  }, [selectedStartDate, selectedEndDate, jDateToString]);

  const handleSearch = () => {
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
                            <div className="calendarDays">{renderCalendarDays()}</div>
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
          color: #5c4b00;
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
          color: #5c4b00 !important;
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
          color: #5c4b00;
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
          color: #5c4b00;
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