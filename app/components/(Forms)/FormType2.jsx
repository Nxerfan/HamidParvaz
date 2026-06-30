"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCalendar } from "../../lib/useCalendar";
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
  onSearch: null,
};

export default function FormType3() {
  // تغییر 1: مقدار پیش‌فرض null است تا هیچ‌کدام در ابتدا انتخاب‌نشده باشند
  const [tripType, setTripType] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const originInputRef = useRef(null);
  const originDropdownRef = useRef(null);
  const [originError, setOriginError] = useState("");

  const filteredOrigins = () => {
    // تغییر 2: اگر نوع سفر انتخاب نشده، ترکیبی از هر دو لیست نمایش داده می‌شود
    let list = tripType
      ? PAGE_DATA.destinations[tripType]
      : [...PAGE_DATA.destinations.domestic, ...PAGE_DATA.destinations.foreign];

    let filtered = list;
    if (originInput.trim()) {
      filtered = filtered.filter((item) =>
        item.name.includes(originInput.trim()),
      );
    }
    // حذف شهر مقصد انتخاب‌شده از لیست پیشنهادات مبدا
    if (destinationInput.trim()) {
      filtered = filtered.filter(
        (item) => item.name !== destinationInput.trim(),
      );
    }
    return filtered;
  };

  const handleSelectOrigin = (dest) => {
    setOriginInput(dest.name);
    setTripType(dest.type); // تغییر 3: انتخاب خودکار نوع سفر بر اساس شهر انتخابی
    setShowOriginDropdown(false);
    setOriginError("");
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.origin;
      return newErrors;
    });
    setShakeFields((prev) => {
      const newShake = { ...prev };
      delete newShake.origin;
      return newShake;
    });
  };

  const [destinationInput, setDestinationInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const destinationInputRef = useRef(null);

  const calendar = useCalendar({ mode: "range" });
  const {
    selectedStartDate,
    selectedEndDate,
    showCalendar,
    activeInput,
    hoverDate,
    currentJy,
    currentJm,
    currentView,
    calendarRef,
    jToday,
    jDateToString,
    stringToJDate,
    getDateValue,
    isDateInRange,
    isDateInHoverRange,
    selectDate,
    openCalendar,
    closeCalendar,
    handleCalendarTitleClick,
    handlePrevMonth,
    handleNextMonth,
    setCurrentJy,
    setCurrentJm,
    setCurrentView,
    setHoverDate,
    setShowCalendar,
    setActiveInput,
    setSelectedStartDate,
    setSelectedEndDate,
    renderCalendarDays,
  } = calendar;

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  const [tripDirection, setTripDirection] = useState("roundTrip");

  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

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
    setOriginInput("");
    setTripDirection("roundTrip");
    setErrors({});
    setShakeFields({});
  };

  const handleDirectionChange = (value) => {
    setTripDirection(value);
    if (value === "oneWay") {
      setSelectedEndDate(null);
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.tripDirection;
      if (value === "oneWay") {
        delete newErrors.endDate;
      }
      return newErrors;
    });
    setShakeFields((prev) => {
      const newShake = { ...prev };
      delete newShake.tripDirection;
      return newShake;
    });
  };

  const filteredDestinations = () => {
    // تغییر 2: اگر نوع سفر انتخاب نشده، ترکیبی از هر دو لیست نمایش داده می‌شود
    let list = tripType
      ? PAGE_DATA.destinations[tripType]
      : [...PAGE_DATA.destinations.domestic, ...PAGE_DATA.destinations.foreign];

    let filtered = list;
    if (destinationInput.trim()) {
      filtered = filtered.filter((item) =>
        item.name.includes(destinationInput.trim()),
      );
    }
    // حذف شهر مبدا انتخاب‌شده از لیست پیشنهادات مقصد
    if (originInput.trim()) {
      filtered = filtered.filter((item) => item.name !== originInput.trim());
    }
    return filtered;
  };

  const filteredRecent = () => {
    let filtered = recentSearches;
    if (destinationInput.trim()) {
      filtered = filtered.filter((item) =>
        item.name.includes(destinationInput.trim()),
      );
    }
    // حذف شهر مبدا انتخاب‌شده از لیست جستجوهای اخیر مقصد
    if (originInput.trim()) {
      filtered = filtered.filter((item) => item.name !== originInput.trim());
    }
    return filtered;
  };

  const handleSelectDestination = (dest) => {
    setDestinationInput(dest.name);
    setTripType(dest.type); // تغییر 3: انتخاب خودکار نوع سفر بر اساس شهر انتخابی
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
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.destination;
      return newErrors;
    });
    setShakeFields((prev) => {
      const newShake = { ...prev };
      delete newShake.destination;
      return newShake;
    });
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
      if (
        originDropdownRef.current &&
        !originDropdownRef.current.contains(event.target) &&
        event.target !== originInputRef.current
      ) {
        setShowOriginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const startDateInputValue = selectedStartDate
    ? jDateToString(
        selectedStartDate.jy,
        selectedStartDate.jm,
        selectedStartDate.jd,
      )
    : "";
  const endDateInputValue = selectedEndDate
    ? jDateToString(selectedEndDate.jy, selectedEndDate.jm, selectedEndDate.jd)
    : "";

  const isFormValid = () => {
    const required =
      !!tripType &&
      !!tripDirection &&
      destinationInput.trim() !== "" &&
      !!selectedStartDate;
    if (tripDirection === "roundTrip") {
      return required && !!selectedEndDate;
    }
    return required;
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

  const handleSearch = () => {
    const newErrors = {};
    if (!tripType) newErrors.tripType = true;
    if (!tripDirection) newErrors.tripDirection = true;
    if (!destinationInput.trim()) newErrors.destination = true;
    if (!selectedStartDate) newErrors.startDate = true;
    if (tripDirection === "roundTrip" && !selectedEndDate)
      newErrors.endDate = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach((field) => triggerErrorShake(field));
      return;
    }

    setErrors({});
    const params = {
      tripType,
      tripDirection,
      destination: destinationInput,
      startDate: selectedStartDate
        ? jDateToString(
            selectedStartDate.jy,
            selectedStartDate.jm,
            selectedStartDate.jd,
          )
        : null,
      endDate: selectedEndDate
        ? jDateToString(
            selectedEndDate.jy,
            selectedEndDate.jm,
            selectedEndDate.jd,
          )
        : null,
      adultCount,
      childCount,
      infantCount,
    };
    if (PAGE_DATA.onSearch) PAGE_DATA.onSearch(params);
  };

  const getDatePlaceholder = (type) => {
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
              {tripType && (
                <div className="directionContainer">
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
                </div>
              )}
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
                    placeholder="شهر مقصد"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    onFocus={handleInputFocus}
                    ref={destinationInputRef}
                    className={errors.destination ? "error" : ""}
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

              <div className="LocationPicker" ref={originDropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.searchIcon}
                    className="inputIcon"
                  />
                  <input
                    type="text"
                    placeholder="شهر مبدا"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    onFocus={() => setShowOriginDropdown(true)}
                    ref={originInputRef}
                    className={errors.origin ? "error" : ""}
                  />
                  {originInput && (
                    <FontAwesomeIcon
                      icon={PAGE_DATA.closeIcon}
                      className="clearIcon"
                      onClick={() => setOriginInput("")}
                    />
                  )}
                </div>
                {showOriginDropdown && (
                  <div className="destinationDropdown">
                    <div className="dropdownSection">
                      <div className="sectionTitle">
                        <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                        <span>شهرهای مبدا</span>
                      </div>
                      <ul>
                        {filteredOrigins().map((item) => (
                          <li
                            key={item.id}
                            onClick={() => handleSelectOrigin(item)}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {filteredOrigins().length === 0 && (
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
                    placeholder={getDatePlaceholder("start")}
                    value={startDateInputValue}
                    readOnly
                    onClick={() => openCalendar("start")}
                    className={`${activeInput === "start" ? "active" : ""} ${errors.startDate ? "error" : ""} ${shakeFields.startDate ? "shake" : ""}`}
                  />
                  {tripDirection === "roundTrip" && (
                    <input
                      type="text"
                      id="endDateInput"
                      placeholder={getDatePlaceholder("end")}
                      value={endDateInputValue}
                      readOnly
                      onClick={() => openCalendar("end")}
                      className={`${activeInput === "end" ? "active" : ""} ${errors.endDate ? "error" : ""} ${shakeFields.endDate ? "shake" : ""}`}
                    />
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
