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
  originPlaceholder: "شهر مبدا",
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
  originIcon: faSearch,
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

  const calendar = useCalendar({ mode: "range" });
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    hoverDate,
    setHoverDate,
    activeInput,
    setActiveInput,
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
    isDateInRange,
    isDateInHoverRange,
  } = calendar;

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

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
    setOriginInput(""); // پاک کردن مبدا با تغییر نوع سفر
  };

  // Destination Functions
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

  // Origin Functions
  const filteredOriginDestinations = () => {
    const list = PAGE_DATA.destinations[tripType];
    if (!originInput.trim()) return list;
    return list.filter((item) => item.name.includes(originInput.trim()));
  };

  const filteredOriginRecent = () => {
    if (!originInput.trim()) return recentOriginSearches;
    return recentOriginSearches.filter((item) =>
      item.name.includes(originInput.trim()),
    );
  };

  const handleSelectOrigin = (dest) => {
    setOriginInput(dest.name);
    setRecentOriginSearches((prev) => {
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
    setShowOriginDropdown(false);
  };

  const handleOriginInputFocus = () => {
    setShowOriginDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Destination Dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== destinationInputRef.current
      ) {
        setShowDropdown(false);
      }
      // Close Origin Dropdown
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

  const handleSearch = () => {
    const params = {
      tripType,
      origin: originInput,
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
              {/* Origin Picker */}
              <div className="LocationPicker" ref={originDropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.originIcon}
                    className="inputIcon"
                  />
                  <input
                    type="text"
                    placeholder={PAGE_DATA.originPlaceholder}
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    onFocus={handleOriginInputFocus}
                    ref={originInputRef}
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
                    {filteredOriginRecent().length > 0 && (
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.historyIcon} />
                          <span>{PAGE_DATA.recentSearchesTitle}</span>
                        </div>
                        <ul>
                          {filteredOriginRecent().map((item) => (
                            <li
                              key={item.id}
                              onClick={() => handleSelectOrigin(item)}
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
                        {filteredOriginDestinations().map((item) => (
                          <li
                            key={item.id}
                            onClick={() => handleSelectOrigin(item)}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {filteredOriginDestinations().length === 0 && (
                          <li className="noResult">{PAGE_DATA.noResultText}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Destination Picker */}
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
