"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCalendar } from "../../lib/useCalendar";
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
  onSearch: null,
};

export default function TourSearchForm({ showOrigin = false }) {
  const [tourType, setTourType] = useState(null);

  // Origin States
  const [originInput, setOriginInput] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [recentOriginSearches, setRecentOriginSearches] = useState([]);
  const originDropdownRef = useRef(null);
  const originInputRef = useRef(null);

  // Destination States
  const [destinationInput, setDestinationInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const destinationInputRef = useRef(null);

  const calendar = useCalendar({ mode: "single" });
  const {
    selectedStartDate: startDate,
    setSelectedStartDate: setStartDate,
    showCalendar,
    setShowCalendar,
    currentJy,
    setCurrentJy,
    currentJm,
    setCurrentJm,
    currentView,
    setCurrentView,
    calendarRef,
    jToday,
    jDateToString,
    stringToJDate,
    selectDate,
    openCalendar,
    closeCalendar,
    handleCalendarTitleClick,
    handlePrevMonth,
    handleNextMonth,
    renderCalendarDays,
  } = calendar;

  const [durationNights, setDurationNights] = useState(5);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const durationRef = useRef(null); // Ref جدید

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);
  const paxRef = useRef(null); // Ref جدید

  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

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

  const changeAdult = (delta) =>
    setAdultCount((prev) => Math.max(1, prev + delta));
  const changeChild = (delta) =>
    setChildCount((prev) => Math.max(0, prev + delta));
  const changeInfant = (delta) =>
    setInfantCount((prev) => Math.max(0, prev + delta));
  const childCountN = childCount + infantCount;

  // Destination Helpers
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

  // Origin Helpers
  const filteredOriginDestinations = () => {
    const all = tourType
      ? TOUR_DATA.destinations[tourType]
      : [...TOUR_DATA.destinations.domestic, ...TOUR_DATA.destinations.foreign];
    if (!originInput.trim()) return all;
    return all.filter((item) => item.name.includes(originInput.trim()));
  };

  const handleSelectOrigin = (dest) => {
    setOriginInput(dest.name);
    setRecentOriginSearches((prev) => {
      const exists = prev.find((i) => i.id === dest.id);
      if (exists)
        return [exists, ...prev.filter((i) => i.id !== dest.id)].slice(0, 5);
      return [dest, ...prev].slice(0, 5);
    });
    setShowOriginDropdown(false);
    setErrors((prev) => ({ ...prev, origin: false }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showOrigin &&
        originDropdownRef.current &&
        !originDropdownRef.current.contains(event.target)
      ) {
        setShowOriginDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (durationRef.current && !durationRef.current.contains(event.target)) {
        setShowDurationDropdown(false);
      }
      if (paxRef.current && !paxRef.current.contains(event.target)) {
        setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOrigin]);

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
    if (showOrigin && !originInput.trim()) newErrors.origin = true;
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
      origin: showOrigin ? originInput : undefined,
      destination: destinationInput,
      startDate: startDate
        ? jDateToString(startDate.jy, startDate.jm, startDate.jd)
        : null,
      durationNights,
      durationText: getDurationText(),
      adults: adultCount,
      children: childCount,
      infants: infantCount,
    };
    if (TOUR_DATA.onSearch) TOUR_DATA.onSearch(params);
  };

  return (
    <div className="List2">
      <div className="Form">
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
                  if (showOrigin) setOriginInput("");
                  setErrors({});
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="BottomHotel">
          {/* فیلد مبدا (شرطی) */}
          {showOrigin && (
            <div className="LocationPicker" ref={originDropdownRef}>
              <div className="inputWithIcon">
                <FontAwesomeIcon
                  icon={TOUR_DATA.originIcon}
                  className="inputIcon"
                />
                <input
                  type="text"
                  placeholder={TOUR_DATA.originPlaceholder}
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  onFocus={() => setShowOriginDropdown(true)}
                  ref={originInputRef}
                  className={`${errors.origin ? "error" : ""} ${shakeFields.origin ? "shake" : ""}`}
                />
                {originInput && (
                  <FontAwesomeIcon
                    icon={TOUR_DATA.closeIcon}
                    className="clearIcon"
                    onClick={() => setOriginInput("")}
                  />
                )}
              </div>
              {showOriginDropdown && (
                <div className="destinationDropdown">
                  {recentOriginSearches.length > 0 && (
                    <div className="dropdownSection">
                      <div className="sectionTitle">
                        <FontAwesomeIcon icon={TOUR_DATA.historyIcon} />
                        <span>{TOUR_DATA.recentSearchesTitle}</span>
                      </div>
                      <ul>
                        {recentOriginSearches.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => handleSelectOrigin(item)}
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
                      {filteredOriginDestinations().map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSelectOrigin(item)}
                        >
                          <FontAwesomeIcon icon={TOUR_DATA.locationIcon} />
                          <span>{item.name}</span>
                        </li>
                      ))}
                      {filteredOriginDestinations().length === 0 && (
                        <li className="noResult">{TOUR_DATA.noResultText}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* فیلد مقصد */}
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
                className={`${errors.destination ? "error" : ""} ${shakeFields.destination ? "shake" : ""}`}
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
                value={
                  startDate
                    ? jDateToString(startDate.jy, startDate.jm, startDate.jd)
                    : ""
                }
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
                    visibility: currentView === "days" ? "visible" : "hidden",
                  }}
                >
                  <button className="calendarNavBtn" onClick={handlePrevMonth}>
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
                  <button className="calendarNavBtn" onClick={handleNextMonth}>
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

          {/* مدت زمان تور */}
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
          <div className="PaxPicker" ref={paxRef}>
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
