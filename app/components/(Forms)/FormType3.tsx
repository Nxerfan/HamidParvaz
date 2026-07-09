"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchLogic } from "../../lib/hooks/useSearchLogic";
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

const TOUR_DATA = {
  radioOptions: [
    { id: "domestic", label: "داخلی", value: "domestic" },
    { id: "foreign", label: "خارجی", value: "foreign" },
  ],
  originPlaceholder: "مبدا (شهر یا فرودگاه)",
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
  originIcon: faSearch,
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
  onSearch: null as ((params: Record<string, unknown>) => void) | null,
};

interface TourSearchFormProps {
  showOrigin?: boolean;
}

export default function TourSearchForm({
  showOrigin = false,
}: TourSearchFormProps) {
  const logic = useSearchLogic({
    destinations: TOUR_DATA.destinations,
    monthNames: TOUR_DATA.monthNames,
    weekDays: TOUR_DATA.weekDays,
    calendarMode: "single",
    hasOrigin: showOrigin,
    complexGuestMode: false,
    initialTripType: "",
  });

  const {
    tripType,
    handleTripTypeChange,
    calendar,
    guest,
    destination,
    origin,
    errors,
    shakeFields,
    renderMonthsGrid,
    renderYearsGrid,
    startDateInputValue,
  } = logic;

  const {
    calendarRef,
    showCalendar,
    currentView,
    currentJy,
    currentJm,
    selectedStartDate,
    openCalendar,
    closeCalendar,
    setShowCalendar,
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
    setShowDropdown: setOriginShowDropdown = () => {},
    dropdownRef: originDropdownRef = null,
    inputRef: originInputRef = null,
    filteredItems: originFilteredItems = [],
    recentSearches: originRecentSearches = [],
    handleSelect: originHandleSelect = () => {},
    handleInputFocus: originHandleInputFocus = () => {},
    clearInput: originClearInput = () => {},
  } = origin ?? {};

  // Destructure destination (contains refs)
  const {
    input: destInput,
    setInput: setDestInput,
    showDropdown: destShowDropdown,
    setShowDropdown: setDestShowDropdown,
    dropdownRef: destDropdownRef,
    inputRef: destInputRef,
    filteredItems: destFilteredItems,
    recentSearches: destRecentSearches,
    handleSelect: destHandleSelect,
    handleInputFocus: destHandleInputFocus,
    clearInput: destClearInput,
  } = destination;

  const [durationNights, setDurationNights] = useState(5);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const durationRef = useRef<HTMLDivElement>(null);
  const paxRef = useRef<HTMLDivElement>(null);

  const changeDuration = (delta: number) => {
    const newVal = durationNights + delta;
    if (newVal >= 1 && newVal <= 30) {
      setDurationNights(newVal);
    }
  };

  const getDurationText = (): string => {
    const days = durationNights + 1;
    return `${days} روز و ${durationNights} شب`;
  };

  const childCountN = guest.childCount + guest.infantCount;

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean | undefined> = {};
    if (!tripType) newErrors.tourType = true;
    if (showOrigin && origin && !originInput.trim()) newErrors.origin = true;
    if (!destInput.trim()) newErrors.destination = true;
    if (!selectedStartDate) newErrors.startDate = true;

    if (Object.keys(newErrors).length) {
      logic.setErrors(newErrors);
      Object.keys(newErrors).forEach((f) => logic.triggerErrorShake(f));
      return false;
    }
    return true;
  };

  const router = useRouter();

  const handleSearch = () => {
    if (!validateForm()) return;
    const searchParams = new URLSearchParams();
    searchParams.set("type", "tour");
    searchParams.set("tourType", tripType);
    if (showOrigin && origin) {
      searchParams.set("origin", originInput);
    }
    searchParams.set("destination", destInput);
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
    searchParams.set("durationNights", durationNights.toString());
    searchParams.set("adults", guest.adultCount.toString());
    searchParams.set("children", guest.childCount.toString());
    searchParams.set("infants", guest.infantCount.toString());
    router.push(`/tour/tourse?${searchParams.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOrigin &&
        origin &&
        originDropdownRef?.current &&
        !originDropdownRef.current.contains(event.target as Node)
      ) {
        setOriginShowDropdown(false);
      }
      if (
        destDropdownRef.current &&
        !destDropdownRef.current.contains(event.target as Node)
      ) {
        setDestShowDropdown(false);
      }
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
      if (
        durationRef.current &&
        !durationRef.current.contains(event.target as Node)
      ) {
        setShowDurationDropdown(false);
      }
      if (paxRef.current && !paxRef.current.contains(event.target as Node)) {
        guest.setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOrigin, calendarRef, destDropdownRef, guest, origin, originDropdownRef, setDestShowDropdown, setOriginShowDropdown, setShowCalendar]);

  return (
    <div className="List2">
      <div className="Form">
        <div className="Top">
          <fieldset>
            <legend className="sr-only">نوع سفر</legend>
            {TOUR_DATA.radioOptions.map((opt) => (
              <label key={opt.id} className="radioLabel">
                <input
                  type="radio"
                  name="tourType"
                  value={opt.value}
                  checked={tripType === opt.value}
                  onChange={() => {
                    handleTripTypeChange(opt.value);
                  }}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="BottomHotel">
          {showOrigin && origin && (
            <div className="LocationPicker" ref={originDropdownRef}>
              <div className="inputWithIcon">
                <FontAwesomeIcon
                  icon={TOUR_DATA.originIcon}
                  className="inputIcon"
                />
                <label className="sr-only" htmlFor="origin-input-3">
                  {TOUR_DATA.originPlaceholder}
                </label>
                <input
                  type="text"
                  id="origin-input-3"
                  placeholder={TOUR_DATA.originPlaceholder}
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  onFocus={originHandleInputFocus}
                  ref={originInputRef}
                  className={`${errors.origin ? "error" : ""} ${shakeFields.origin ? "shake" : ""}`}
                />
                {originInput && (
                  <FontAwesomeIcon
                    icon={TOUR_DATA.closeIcon}
                    className="clearIcon"
                    onClick={originClearInput}
                  />
                )}
              </div>
              {originShowDropdown && (
                <div className="destinationDropdown">
                  {originRecentSearches.length > 0 && (
                    <div className="dropdownSection">
                      <div className="sectionTitle">
                        <FontAwesomeIcon icon={TOUR_DATA.historyIcon} />
                        <span>{TOUR_DATA.recentSearchesTitle}</span>
                      </div>
                      <ul>
                        {originRecentSearches.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => originHandleSelect(item)}
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
                      {originFilteredItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => originHandleSelect(item)}
                        >
                          <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                          <span>{item.name}</span>
                        </li>
                      ))}
                      {originFilteredItems.length === 0 && (
                        <li className="noResult">{TOUR_DATA.noResultText}</li>
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
                icon={TOUR_DATA.searchIcon}
                className="inputIcon"
              />
              <label className="sr-only" htmlFor="dest-input-3">
                {TOUR_DATA.destinationPlaceholder}
              </label>
              <input
                type="text"
                id="dest-input-3"
                placeholder={TOUR_DATA.destinationPlaceholder}
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                onFocus={destHandleInputFocus}
                ref={destInputRef}
                className={`${errors.destination ? "error" : ""} ${shakeFields.destination ? "shake" : ""}`}
              />
              {destInput && (
                <FontAwesomeIcon
                  icon={TOUR_DATA.closeIcon}
                  className="clearIcon"
                  onClick={destClearInput}
                />
              )}
            </div>
            {destShowDropdown && (
              <div className="destinationDropdown">
                {destRecentSearches.length > 0 && (
                  <div className="dropdownSection">
                    <div className="sectionTitle">
                      <FontAwesomeIcon icon={TOUR_DATA.historyIcon} />
                      <span>{TOUR_DATA.recentSearchesTitle}</span>
                    </div>
                    <ul>
                      {destRecentSearches.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => destHandleSelect(item)}
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
                    {destFilteredItems.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => destHandleSelect(item)}
                      >
                        <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                    {destFilteredItems.length === 0 && (
                      <li className="noResult">{TOUR_DATA.noResultText}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="DatePicker">
            <div className="dateInputWrapper" ref={calendarRef}>
              <label className="sr-only" htmlFor="date-input-3">
                تاریخ حرکت
              </label>
              <input
                type="text"
                id="date-input-3"
                placeholder="تاریخ حرکت"
                value={startDateInputValue}
                readOnly
                onClick={() => openCalendar("start")}
                className={`${errors.startDate ? "error" : ""} ${shakeFields.startDate ? "shake" : ""}`}
              />
            </div>
            {showCalendar && (
              <div className="calendarPopup show">
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
                      ? `${currentJy} ${TOUR_DATA.monthNames[currentJm - 1]}`
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
                      {TOUR_DATA.weekDays.map((d, i) => (
                        <div key={i}>{d}</div>
                      ))}
                    </div>
                    <div className="calendarDays">{renderCalendarDays()}</div>
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

          <div className="DurationPicker" ref={durationRef}>
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
                      aria-label="کاهش مدت اقامت"
                      onClick={() => changeDuration(-1)}
                      disabled={durationNights <= 1}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{durationNights}</span>
                    <button
                      aria-label="افزایش مدت اقامت"
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

          <div className="PaxPicker" ref={paxRef}>
            <button
              type="button"
              aria-label="انتخاب مسافران"
              aria-expanded={guest.showGuests}
              onClick={() => guest.setShowGuests(!guest.showGuests)}
            >
              <FontAwesomeIcon icon={TOUR_DATA.adultIcon} /> {guest.adultCount}{" "}
              بزرگسال ، <FontAwesomeIcon icon={TOUR_DATA.childIcon} />{" "}
              {childCountN} کودک
            </button>
            {guest.showGuests && (
              <div className="GuestDropdown">
                <div className="row">
                  <div className="Namee">
                    <FontAwesomeIcon icon={TOUR_DATA.adultIcon} />
                    <span>بزرگسال</span>
                  </div>
                  <div className="AdultAndChildCount">
                    <button
                      aria-label="کاهش بزرگسال"
                      onClick={() => guest.changeAdult(-1)}
                      disabled={guest.adultCount <= 1}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{guest.adultCount}</span>
                    <button
                      aria-label="افزایش بزرگسال"
                      onClick={() => guest.changeAdult(1)}
                    >
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
                      aria-label="کاهش کودک"
                      onClick={() =>
                        guest.setChildCount((prev) => Math.max(0, prev - 1))
                      }
                      disabled={guest.childCount <= 0}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{guest.childCount}</span>
                    <button
                      aria-label="افزایش کودک"
                      onClick={() => guest.setChildCount((prev) => prev + 1)}
                    >
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
                      aria-label="کاهش نوزاد"
                      onClick={() =>
                        guest.setInfantCount((prev) => Math.max(0, prev - 1))
                      }
                      disabled={guest.infantCount <= 0}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.minusIcon} />
                    </button>
                    <span>{guest.infantCount}</span>
                    <button
                      aria-label="افزایش نوزاد"
                      onClick={() => guest.setInfantCount((prev) => prev + 1)}
                    >
                      <FontAwesomeIcon icon={TOUR_DATA.plusIcon} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="Submit">
            <button onClick={handleSearch}>{TOUR_DATA.searchButtonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
