"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSearchLogic } from "../../lib/hooks/useSearchLogic";
import { useToast } from "../../lib/hooks/useToast";
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

interface FormErrors {
  destination?: boolean;
  startDate?: boolean;
  endDate?: boolean;
  rooms?: boolean;
  roomDistribution?: boolean;
  [key: string]: boolean | undefined;
}

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
  onSearch: null as ((params: Record<string, unknown>) => void) | null,
};

function autoDistributeBeds(totalBeds: number, numRooms: number): number[] {
  if (numRooms <= 0) return [];
  if (totalBeds < numRooms) return new Array(numRooms).fill(1);
  const base = Math.floor(totalBeds / numRooms);
  const remainder = totalBeds % numRooms;
  const distribution = new Array(numRooms).fill(base);
  for (let i = 0; i < remainder; i++) distribution[i]++;
  return distribution;
}

export default function Form1() {
  const [numRooms, setNumRooms] = useState(1);
  const [isManualDistribution, setIsManualDistribution] = useState(false);
  const [manualDistribution, setManualDistribution] = useState<number[]>([1]);
  const [showRoomEditor, setShowRoomEditor] = useState(false);
  const [tempDistribution, setTempDistribution] = useState<number[]>([]);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  const logic = useSearchLogic({
    destinations: PAGE_DATA.destinations,
    monthNames: PAGE_DATA.monthNames,
    weekDays: PAGE_DATA.weekDays,
    calendarMode: "range",
    initialTripType: "domestic",
    onGuestCountChange: () => setIsManualDistribution(false),
  });

  const {
    tripType,
    handleTripTypeChange,
    calendar,
    guest,
    destination,
    errors,
    setErrors,
    shakeFields,
    triggerErrorShake,
    renderMonthsGrid,
    renderYearsGrid,
    startDateInputValue,
    endDateInputValue,
  } = logic;

  // Destructure calendar (contains refs)
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

  const totalBedsNeeded = guest.adultCount + guest.childCount;

  const bedDistribution = useMemo(() => {
    if (!isManualDistribution) {
      return autoDistributeBeds(totalBedsNeeded, numRooms);
    }
    return manualDistribution;
  }, [totalBedsNeeded, numRooms, isManualDistribution, manualDistribution]);

  const toast = useToast();

  const changeRooms = (delta: number) => {
    const newRooms = Math.max(1, numRooms + delta);
    if (newRooms > guest.adultCount) {
      toast.warning("تعداد اتاق نمی‌تواند بیشتر از تعداد بزرگسالان باشد");
      triggerErrorShake("rooms");
      return;
    }
    setNumRooms(newRooms);
    setIsManualDistribution(false);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!destInput.trim()) newErrors.destination = true;
    if (!selectedStartDate) newErrors.startDate = true;
    if (!selectedEndDate) newErrors.endDate = true;
    if (numRooms > guest.adultCount) newErrors.rooms = true;
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

  const updateTempBed = (idx: number, delta: number) => {
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
    setManualDistribution(tempDistribution);
    setIsManualDistribution(true);
    setShowRoomEditor(false);
  };

  const router = useRouter();

  // Close guest dropdown on outside click
   
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        guest.setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [guest]);

  const handleSearch = () => {
    if (!validateForm()) return;
    const searchParams = new URLSearchParams();
    searchParams.set("type", "hotel");
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
    searchParams.set("rooms", numRooms.toString());
    router.push(`/hotel/hotelse?${searchParams.toString()}`);
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
            </div>

            <div className="BottomHotel">
              <div className="LocationPicker" ref={destDropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.searchIcon}
                    className="inputIcon"
                  />
                  <label className="sr-only" htmlFor="dest-input-1">{PAGE_DATA.destinationPlaceholder}</label>
                  <input
                    type="text"
                    id="dest-input-1"
                    placeholder={PAGE_DATA.destinationPlaceholder}
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
                  <label className="sr-only" htmlFor="startDateInput">{PAGE_DATA.datePlaceholders.start}</label>
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
                  <label className="sr-only" htmlFor="endDateInput">{PAGE_DATA.datePlaceholders.end}</label>
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
                  <FontAwesomeIcon icon={PAGE_DATA.adultIcon} /> {guest.adultCount}{" "}
                  بزرگسال ، <FontAwesomeIcon icon={PAGE_DATA.childIcon} />{" "}
                  {guest.totalChildrenInfants} خردسال
                </button>
                {guest.showGuests && (
                  <div className="GuestDropdown">
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.adultIcon} />
                        <span>بزرگسال</span>
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
                        <button aria-label="افزایش بزرگسال" onClick={() => guest.changeAdult(1)}>
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.childIcon} />
                        <span>کودک</span>
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
                          disabled={guest.totalChildrenInfants >= guest.maxChildrenInfants}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="Namee">
                        <FontAwesomeIcon icon={PAGE_DATA.infantIcon} />
                        <span>نوزاد</span>
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
                          disabled={guest.totalChildrenInfants >= guest.maxChildrenInfants}
                        >
                          <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                        </button>
                      </div>
                    </div>

                    <div className="RoomSelector">
                      <div className="roomHeader">
                        <span>
                          <FontAwesomeIcon icon={PAGE_DATA.roomIcon} /> تعداد
                          اتاق‌ها
                        </span>
                        <div className="roomCounter">
                          <button
                            aria-label="کاهش اتاق"
                            onClick={() => changeRooms(-1)}
                            disabled={numRooms <= 1}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.minusIcon} />
                          </button>
                          <span>{numRooms}</span>
                          <button
                            aria-label="افزایش اتاق"
                            onClick={() => changeRooms(1)}
                            disabled={numRooms >= guest.adultCount}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.plusIcon} />
                          </button>
                        </div>
                      </div>
                      {errors.rooms && (
                        <div className="errorMsg">
                          تعداد اتاق نمی‌تواند بیشتر از تعداد بزرگسالان باشد
                        </div>
                      )}
                      <div className="bedSummary">
                        <FontAwesomeIcon icon={PAGE_DATA.bedIcon} />
                        <span>
                          {bedDistribution
                            .map((_b) => `${_b} تخته`)
                            .join(" و ")}{" "}
                          ({bedDistribution.length} اتاق)
                        </span>
                        <button className="editBtn" aria-label="ویرایش توزیع تخت" onClick={openRoomEditor}>
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
