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
  faPen,
  faBed,
  faDoorOpen,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const PAGE_DATA = {
  radioOptions: [
    { id: "domestic", label: "داخلی", value: "domestic" },
    { id: "foreign", label: "خارجی", value: "foreign" },
  ],
  destinationPlaceholder: "هتل یا شهر مقصد",
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
      { id: 13, name: "رم", type: "foreign" },
      { id: 14, name: "بارسلونا", type: "foreign" },
    ],
  },
  onSearch: null,
};

// تابع کمکی توزیع خودکار تخت
function autoDistributeBeds(totalBeds, numRooms) {
  if (numRooms <= 0) return [];
  if (totalBeds < numRooms) return new Array(numRooms).fill(1);
  const base = Math.floor(totalBeds / numRooms);
  const remainder = totalBeds % numRooms;
  const distribution = new Array(numRooms).fill(base);
  for (let i = 0; i < remainder; i++) distribution[i]++;
  return distribution;
}

export default function Form1() {
  const [tripType, setTripType] = useState("domestic");
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

  // State های اتاق و تخت
  const [numRooms, setNumRooms] = useState(1);
  const [bedDistribution, setBedDistribution] = useState([1]);
  const [isManualDistribution, setIsManualDistribution] = useState(false);
  const [showRoomEditor, setShowRoomEditor] = useState(false);
  const [tempDistribution, setTempDistribution] = useState([]);

  // خطاها و شیک
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  const maxChildrenInfants = 3 * adultCount;
  const totalChildrenInfants = childCount + infantCount;
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
    setIsManualDistribution(false);
  };

  const incrementChild = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setChildCount((prev) => prev + 1);
      setIsManualDistribution(false);
    }
  };
  const decrementChild = () => {
    setChildCount((prev) => Math.max(0, prev - 1));
    setIsManualDistribution(false);
  };
  const incrementInfant = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setInfantCount((prev) => prev + 1);
      setIsManualDistribution(false);
    }
  };
  const decrementInfant = () => {
    setInfantCount((prev) => Math.max(0, prev - 1));
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

  const handleTripTypeChange = (value) => {
    setTripType(value);
    setDestinationInput("");
    setErrors({});
    setShakeFields({});
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
    setErrors((prev) => ({ ...prev, destination: false }));
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

  // توابع اعتبارسنجی و شیک
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

  const validateForm = () => {
    const newErrors = {};
    if (!destinationInput.trim()) newErrors.destination = true;
    if (!selectedStartDate) newErrors.startDate = true;
    if (!selectedEndDate) newErrors.endDate = true;
    if (numRooms > totalBedsNeeded) newErrors.rooms = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach((f) => triggerErrorShake(f));
      return false;
    }
    return true;
  };

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
    const total = tempDistribution.reduce((a, b) => a + b, 0);
    if (total !== totalBedsNeeded) {
      triggerErrorShake("roomDistribution");
      return;
    }
    setBedDistribution(tempDistribution);
    setIsManualDistribution(true);
    setShowRoomEditor(false);
  };

  const handleSearch = () => {
    if (!validateForm()) return;
    const params = {
      tripType,
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
      rooms: numRooms,
      bedDistribution,
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

              <div className="DatePicker">
                <div className="dateInputWrapper" ref={calendarRef}>
                  <input
                    type="text"
                    id="startDateInput"
                    placeholder={PAGE_DATA.datePlaceholders.start}
                    value={startDateInputValue}
                    readOnly
                    onClick={() => openCalendar("start")}
                    className={`${activeInput === "start" ? "active" : ""} ${
                      errors.startDate ? "error" : ""
                    } ${shakeFields.startDate ? "shake" : ""}`}
                  />
                  <input
                    type="text"
                    id="endDateInput"
                    placeholder={PAGE_DATA.datePlaceholders.end}
                    value={endDateInputValue}
                    readOnly
                    onClick={() => openCalendar("end")}
                    className={`${activeInput === "end" ? "active" : ""} ${
                      errors.endDate ? "error" : ""
                    } ${shakeFields.endDate ? "shake" : ""}`}
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

                    {/* بخش اتاق و تخت */}
                    <div className="RoomSelector">
                      <div className="roomHeader">
                        <span>
                          <FontAwesomeIcon icon={PAGE_DATA.roomIcon} /> تعداد
                          اتاق‌ها
                        </span>
                        <div className="roomCounter">
                          <button
                            onClick={() => changeRooms(-1)}
                            disabled={numRooms <= 1}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                          </button>
                          <span>{numRooms}</span>
                          <button
                            onClick={() => changeRooms(1)}
                            disabled={numRooms >= totalBedsNeeded}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                          </button>
                        </div>
                      </div>
                      {errors.rooms && (
                        <div className="errorMsg">
                          تعداد اتاق نمی‌تواند از کل تخت‌ها بیشتر باشد
                        </div>
                      )}
                      <div className="bedSummary">
                        <FontAwesomeIcon icon={PAGE_DATA.bedIcon} />
                        <span>
                          {bedDistribution
                            .map((b, idx) => `${b} تخته`)
                            .join(" و ")}{" "}
                          ({bedDistribution.length} اتاق)
                        </span>
                        <button className="editBtn" onClick={openRoomEditor}>
                          <FontAwesomeIcon icon={PAGE_DATA.editIcon} />
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

      {/* مودال ویرایش توزیع تخت */}
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
                    <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                  </button>
                  <span>{beds} تخت</span>
                  <button
                    onClick={() => updateTempBed(idx, 1)}
                    disabled={
                      tempDistribution.reduce((a, b) => a + b, 0) + 1 >
                      totalBedsNeeded
                    }
                  >
                    <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                  </button>
                </div>
              </div>
            ))}
            <div className="modalActions">
              <button className="saveBtn" onClick={saveRoomDistribution}>
                <FontAwesomeIcon icon={PAGE_DATA.saveIcon} /> ذخیره
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
    </>
  );
}
