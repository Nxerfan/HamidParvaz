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

  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close guest dropdown on outside click
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        guest.setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const newErrors: Record<string, boolean | undefined> = {};
    if (!tripType) newErrors.tripType = true;
    if (!tripDirection) newErrors.tripDirection = true;
    if (!destination.input.trim()) newErrors.destination = true;
    if (!calendar.selectedStartDate) newErrors.startDate = true;
    if (tripDirection === "roundTrip" && !calendar.selectedEndDate)
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
    searchParams.set("destination", destination.input);
    if (origin) {
      searchParams.set("origin", origin.input);
    }
    if (calendar.selectedStartDate) {
      searchParams.set(
        "startDate",
        calendar.jDateToString(
          calendar.selectedStartDate.jy,
          calendar.selectedStartDate.jm,
          calendar.selectedStartDate.jd,
        ),
      );
    }
    if (calendar.selectedEndDate) {
      searchParams.set(
        "endDate",
        calendar.jDateToString(
          calendar.selectedEndDate.jy,
          calendar.selectedEndDate.jm,
          calendar.selectedEndDate.jd,
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
              {origin && (
                <div className="LocationPicker" ref={origin.dropdownRef}>
                  <div className="inputWithIcon">
                    <FontAwesomeIcon
                      icon={PAGE_DATA.searchIcon}
                      className="inputIcon"
                    />
                    <label className="sr-only" htmlFor="origin-input-2">شهر مبدا</label>
                    <input
                      type="text"
                      id="origin-input-2"
                      placeholder="شهر مبدا"
                      value={origin.input}
                      onChange={(e) => origin.setInput(e.target.value)}
                      onFocus={origin.handleInputFocus}
                      ref={origin.inputRef}
                      className={errors.origin ? "error" : ""}
                    />
                    {origin.input && (
                      <FontAwesomeIcon
                        icon={PAGE_DATA.closeIcon}
                        className="clearIcon"
                        onClick={origin.clearInput}
                      />
                    )}
                  </div>
                  {origin.showDropdown && (
                    <div className="destinationDropdown">
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                          <span>شهرهای مبدا</span>
                        </div>
                        <ul>
                          {origin.filteredItems.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => origin.handleSelect(item)}
                            >
                              <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                              <span>{item.name}</span>
                            </li>
                          ))}
                          {origin.filteredItems.length === 0 && (
                            <li className="noResult">{PAGE_DATA.noResultText}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="LocationPicker" ref={destination.dropdownRef}>
                <div className="inputWithIcon">
                  <FontAwesomeIcon
                    icon={PAGE_DATA.searchIcon}
                    className="inputIcon"
                  />
                  <label className="sr-only" htmlFor="dest-input-2">شهر مقصد</label>
                  <input
                    type="text"
                    id="dest-input-2"
                    placeholder="شهر مقصد"
                    value={destination.input}
                    onChange={(e) => destination.setInput(e.target.value)}
                    onFocus={destination.handleInputFocus}
                    ref={destination.inputRef}
                    className={errors.destination ? "error" : ""}
                  />
                  {destination.input && (
                    <FontAwesomeIcon
                      icon={PAGE_DATA.closeIcon}
                      className="clearIcon"
                      onClick={destination.clearInput}
                    />
                  )}
                </div>
                {destination.showDropdown && (
                  <div className="destinationDropdown">
                    {destination.filteredRecent.length > 0 && (
                      <div className="dropdownSection">
                        <div className="sectionTitle">
                          <FontAwesomeIcon icon={PAGE_DATA.historyIcon} />
                          <span>{PAGE_DATA.recentSearchesTitle}</span>
                        </div>
                        <ul>
                          {destination.filteredRecent.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => destination.handleSelect(item)}
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
                        {destination.filteredItems.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => destination.handleSelect(item)}
                          >
                            <FontAwesomeIcon icon={PAGE_DATA.locationIcon} />
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {destination.filteredItems.length === 0 && (
                          <li className="noResult">{PAGE_DATA.noResultText}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="DatePicker">
                <div className="dateInputWrapper" ref={calendar.calendarRef}>
                  <label className="sr-only" htmlFor="startDateInput">{getDatePlaceholder("start")}</label>
                  <input
                    type="text"
                    id="startDateInput"
                    placeholder={getDatePlaceholder("start")}
                    value={startDateInputValue}
                    readOnly
                    onClick={() => calendar.openCalendar("start")}
                    className={`${calendar.activeInput === "start" ? "active" : ""} ${errors.startDate ? "error" : ""} ${shakeFields.startDate ? "shake" : ""}`}
                  />
                  {tripDirection === "roundTrip" && (
                    <>
                      <label className="sr-only" htmlFor="endDateInput">{getDatePlaceholder("end")}</label>
                      <input
                        type="text"
                        id="endDateInput"
                        placeholder={getDatePlaceholder("end")}
                        value={endDateInputValue}
                        readOnly
                        onClick={() => calendar.openCalendar("end")}
                        className={`${calendar.activeInput === "end" ? "active" : ""} ${errors.endDate ? "error" : ""} ${shakeFields.endDate ? "shake" : ""}`}
                      />
                    </>
                  )}
                  {calendar.showCalendar && (
                    <div
                      className="calendarPopup show"
                      onMouseLeave={() => calendar.setHoverDate(null)}
                    >
                      <div
                        className="calendarHeader"
                        style={{
                          visibility:
                            calendar.currentView === "days" ? "visible" : "hidden",
                        }}
                      >
                        <button
                          className="calendarNavBtn"
                          aria-label="ماه بعد"
                          onClick={calendar.handlePrevMonth}
                        >
                          &gt;
                        </button>
                        <span
                          className="calendarTitle"
                          onClick={calendar.handleCalendarTitleClick}
                        >
                          {calendar.currentView === "days"
                            ? `${calendar.currentJy} ${PAGE_DATA.monthNames[calendar.currentJm - 1]}`
                            : calendar.currentView === "months"
                              ? `${calendar.currentJy} - انتخاب ماه`
                              : "انتخاب سال"}
                        </span>
                        <button
                          className="calendarNavBtn"
                          aria-label="ماه قبل"
                          onClick={calendar.handleNextMonth}
                        >
                          &lt;
                        </button>
                      </div>

                      {calendar.currentView === "days" && (
                        <div className="calendarView active">
                          <div className="calendarWeekdays">
                            {PAGE_DATA.weekDays.map((d, i) => (
                              <div key={i}>{d}</div>
                            ))}
                          </div>
                          <div className="calendarDays">
                            {calendar.renderCalendarDays()}
                          </div>
                        </div>
                      )}

                      {calendar.currentView === "months" && (
                        <div className="calendarView active">
                          <div className="monthsGrid">{renderMonthsGrid()}</div>
                        </div>
                      )}

                      {calendar.currentView === "years" && (
                        <div className="calendarView active">
                          <div className="yearsWrapper">
                            <div className="yearsGrid">{renderYearsGrid()}</div>
                          </div>
                        </div>
                      )}

                      <div className="calendarFooter">
                        <button className="btnClose" onClick={calendar.closeCalendar}>
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
                        <button aria-label="افزایش بزرگسال" onClick={() => guest.changeAdult(1)}>
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
                          disabled={guest.totalChildrenInfants >= guest.maxChildrenInfants}
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
                          disabled={guest.totalChildrenInfants >= guest.maxChildrenInfants}
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
