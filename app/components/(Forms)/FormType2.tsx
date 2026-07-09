"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchLogic } from "../../lib/hooks/useSearchLogic";
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

const PAGE_DATA = {
  radioOptions: [
    { id: "domestic", label: "داخلی", value: "domestic" },
    { id: "foreign", label: "خارجی", value: "foreign" },
  ],
  tripDirectionOptions: [
    { id: "oneWay", label: "رفت", value: "oneWay" },
    { id: "roundTrip", label: "رفت و برگشت", value: "roundTrip" },
  ],
  destinationPlaceholder: "شهر مقصد",
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
  onSearch: null as ((params: Record<string, unknown>) => void) | null,
};

export default function FormType3() {
  const logic = useSearchLogic({
    destinations: PAGE_DATA.destinations,
    monthNames: PAGE_DATA.monthNames,
    weekDays: PAGE_DATA.weekDays,
    calendarMode: "range",
    hasTripDirection: true,
    hasOrigin: true,
    initialTripType: "",
  });

  const {
    tripType,
    handleTripTypeChange,
    tripDirection,
    handleDirectionChange,
    calendar,
    guest,
    destination,
    origin,
    errors,
    shakeFields,
    renderMonthsGrid,
    renderYearsGrid,
    startDateInputValue,
    endDateInputValue,
  } = logic;

  const {
    calendarRef,
    activeInput,
    showCalendar,
    currentView,
    currentJy,
    currentJm,
    selectedStartDate,
    selectedEndDate,
    openCalendar,
    closeCalendar,
    setHoverDate,
    handleCalendarTitleClick,
    handlePrevMonth,
    handleNextMonth,
    renderCalendarDays,
    jDateToString,
  } = calendar;

  // Destructure origin (contains refs) – defaults for when origin is null
  const {
    input: originInput = "",
    setInput: setOriginInput = () => {},
    showDropdown: originShowDropdown = false,
    dropdownRef: originDropdownRef = null,
    inputRef: originInputRef = null,
    filteredItems: originFilteredItems = [],
    handleSelect: originHandleSelect = () => {},
    handleInputFocus: originHandleInputFocus = () => {},
    clearInput: originClearInput = () => {},
  } = origin ?? {};

  // Destructure destination (contains refs)
  const {
    input: destInput,
    setInput: setDestInput,
    showDropdown: destShowDropdown,
    dropdownRef: destDropdownRef,
    inputRef: destInputRef,
    filteredItems: destFilteredItems,
    filteredRecent: destFilteredRecent,
    handleSelect: destHandleSelect,
    handleInputFocus: destHandleInputFocus,
    clearInput: destClearInput,
  } = destination;

  // Guest has no refs – safe to use as-is
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close guest dropdown on outside click

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target as Node)
      ) {
        guest.setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [guest]);

  const handleSearch = () => {
    const newErrors: Record<string, boolean | undefined> = {};
    if (!tripType) newErrors.tripType = true;
    if (!tripDirection) newErrors.tripDirection = true;
    if (!destInput.trim()) newErrors.destination = true;
    if (!selectedStartDate) newErrors.startDate = true;
    if (tripDirection === "roundTrip" && !selectedEndDate)
      newErrors.endDate = true;

    if (Object.keys(newErrors).length > 0) {
      logic.setErrors(newErrors);
      Object.keys(newErrors).forEach((field) => logic.triggerErrorShake(field));
      return;
    }

    logic.setErrors({});
    const searchParams = new URLSearchParams();
    searchParams.set("type", "flight");
    searchParams.set("tripType", tripType);
    searchParams.set("tripDirection", tripDirection);
    searchParams.set("destination", destInput);
    if (origin !== null) {
      searchParams.set("origin", originInput);
    }
    if (selectedStartDate) {
      searchParams.set(
        "startDate",
        jDateToString(
          selectedStartDate.jy,
          selectedStartDate.jm,
          selectedStartDate.jd,
        ),
      );
    }
    if (selectedEndDate) {
      searchParams.set(
        "endDate",
        jDateToString(
          selectedEndDate.jy,
          selectedEndDate.jm,
          selectedEndDate.jd,
        ),
      );
    }
    searchParams.set("adults", guest.adultCount.toString());
    searchParams.set("children", guest.childCount.toString());
    searchParams.set("infants", guest.infantCount.toString());
    router.push(`/flight/flightse?${searchParams.toString()}`);
  };

  const getDatePlaceholder = (type: string): string => {
    if (!tripDirection) return type === "start" ? "تاریخ رفت" : "تاریخ برگشت";
    if (tripDirection === "oneWay") return "تاریخ رفت";
    return type === "start" ? "تاریخ رفت" : "تاریخ برگشت";
  };

  return (
    <>
      <section>
        <div className="List">
          <div className="Form">
            <div className="Top">
              <fieldset>
                <legend className="sr-only">نوع سفر</legend>
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
              </fieldset>
              {tripType && (
                <div className="directionContainer">
                  <fieldset>
                    <legend className="sr-only">جهت سفر</legend>
                    {PAGE_DATA.tripDirectionOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`radioLabel ${errors.tripDirection ? "error" : ""} ${shakeFields.tripDirection ? "shake" : ""}`}
                      >
                        <input
                          type="radio"
                          name="tripDirection"
                          value={opt.value}
                          checked={tripDirection === opt.value}
                          onChange={() => handleDirectionChange(opt.value)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </fieldset>
                </div>
              )}
            </div>

            <div className="BottomHotel">
              {origin !== null && (
                <div className="LocationPicker" ref={originDropdownRef}>
                  <div className="inputWithIcon">
                    <FontAwesomeIcon
                      icon={PAGE_DATA.searchIcon}
                      className="inputIcon"
                    />
                    <label className="sr-only" htmlFor="origin-input-2">
                      شهر مبدا
                    </label>
                    <input
                      type="text"
                      id="origin-input-2"
                      placeholder="شهر مبدا"
                      value={originInput}
                      onChange={(e) => setOriginInput(e.target.value)}
                      onFocus={originHandleInputFocus}
                      ref={originInputRef}
                      className={errors.origin ? "error" : ""}
                    />
                    {originInput && (
                      <FontAwesomeIcon
                        icon={PAGE_DATA.closeIcon}
                        className="clearIcon"
                        onClick={originClearInput}
                      />
                    )}
                  </div>
                  {originShowDropdown && (
                    <div className="destinationDropdown">
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                          <span>شهرهای مبدا</span>
                        </div>
                        <ul>
                          {originFilteredItems.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => originHandleSelect(item)}
                            >
                              <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                              <span>{item.name}</span>
                            </li>
                          ))}
                          {originFilteredItems.length === 0 && (
                            <li className="noResult">
                              {PAGE_DATA.noResultText}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="LocationPicker" ref={destDropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.searchIcon}
                    className="inputIcon"
                  />
                  <label className="sr-only" htmlFor="dest-input-2">
                    شهر مقصد
                  </label>
                  <input
                    type="text"
                    id="dest-input-2"
                    placeholder="شهر مقصد"
                    value={destInput}
                    onChange={(e) => setDestInput(e.target.value)}
                    onFocus={destHandleInputFocus}
                    ref={destInputRef}
                    className={errors.destination ? "error" : ""}
                  />
                  {destInput && (
                    <FontAwesomeIcon
                      icon={PAGE_DATA.closeIcon}
                      className="clearIcon"
                      onClick={destClearInput}
                    />
                  )}
                </div>
                {destShowDropdown && (
                  <div className="destinationDropdown">
                    {destFilteredRecent.length > 0 && (
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.historyIcon} />
                          <span>{PAGE_DATA.recentSearchesTitle}</span>
                        </div>
                        <ul>
                          {destFilteredRecent.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => destHandleSelect(item)}
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
                        {destFilteredItems.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => destHandleSelect(item)}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {destFilteredItems.length === 0 && (
                          <li className="noResult">{PAGE_DATA.noResultText}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="DatePicker">
                <div className="dateInputWrapper" ref={calendarRef}>
                  <label className="sr-only" htmlFor="startDateInput">
                    {getDatePlaceholder("start")}
                  </label>
                  <input
                    type="text"
                    id="startDateInput"
                    placeholder={getDatePlaceholder("start")}
                    value={startDateInputValue}
                    readOnly
                    onClick={() => openCalendar("start")}
                    className={`${activeInput === "start" ? "active" : ""} ${errors.startDate ? "error" : ""} ${shakeFields.startDate ? "shake" : ""}`}
                  />
                  {tripDirection === "roundTrip" && (
                    <>
                      <label className="sr-only" htmlFor="endDateInput">
                        {getDatePlaceholder("end")}
                      </label>
                      <input
                        type="text"
                        id="endDateInput"
                        placeholder={getDatePlaceholder("end")}
                        value={endDateInputValue}
                        readOnly
                        onClick={() => openCalendar("end")}
                        className={`${activeInput === "end" ? "active" : ""} ${errors.endDate ? "error" : ""} ${shakeFields.endDate ? "shake" : ""}`}
                      />
                    </>
                  )}
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
                          aria-label="ماه بعد"
                          onClick={handlePrevMonth}
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
                          aria-label="ماه قبل"
                          onClick={handleNextMonth}
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
                          <div className="calendarDays">
                            {renderCalendarDays()}
                          </div>
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

              <div className="Guests" ref={guestDropdownRef}>
                <button
                  type="button"
                  aria-label="انتخاب مسافران"
                  aria-expanded={guest.showGuests}
                  onClick={() => guest.setShowGuests(!guest.showGuests)}
                >
                  <FontAwesomeIcon icon={PAGE_DATA.adultIcon} />{" "}
                  {guest.adultCount} بزرگسال ،{" "}
                  <FontAwesomeIcon icon={PAGE_DATA.childIcon} />{" "}
                  {guest.totalChildrenInfants} خردسال
                </button>
                {guest.showGuests && (
                  <div className="GuestDropdown">
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.adultIcon} />
                        <span>{PAGE_DATA.adultLabel}</span>
                      </div>
                      <div className="AdultAndChildCount">
                        <button
                          aria-label="کاهش بزرگسال"
                          onClick={() => guest.changeAdult(-1)}
                          disabled={guest.adultCount <= 1}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{guest.adultCount}</span>
                        <button
                          aria-label="افزایش بزرگسال"
                          onClick={() => guest.changeAdult(1)}
                        >
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
                          aria-label="کاهش کودک"
                          onClick={guest.decrementChild}
                          disabled={guest.childCount <= 0}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{guest.childCount}</span>
                        <button
                          aria-label="افزایش کودک"
                          onClick={guest.incrementChild}
                          disabled={
                            guest.totalChildrenInfants >=
                            guest.maxChildrenInfants
                          }
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
                          aria-label="کاهش نوزاد"
                          onClick={guest.decrementInfant}
                          disabled={guest.infantCount <= 0}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                        </button>
                        <span>{guest.infantCount}</span>
                        <button
                          aria-label="افزایش نوزاد"
                          onClick={guest.incrementInfant}
                          disabled={
                            guest.totalChildrenInfants >=
                            guest.maxChildrenInfants
                          }
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
