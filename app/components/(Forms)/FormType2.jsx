// TravelSearch.js
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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

// ========== توابع تبدیل تاریخ جلالی ==========
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
  jMonthLength: function (jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    const isLeap =
      jy % 33 === 1 ||
      jy % 33 === 5 ||
      jy % 33 === 9 ||
      jy % 33 === 13 ||
      jy % 33 === 17 ||
      jy % 33 === 22 ||
      jy % 33 === 26 ||
      jy % 33 === 30;
    return isLeap ? 30 : 29;
  },
};

// ========== دیتای استاتیک مقاصد ==========
const DESTINATIONS = {
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
};

// ========== کامپوننت اصلی ==========
export default function TravelSearch() {
  const [travelType, setTravelType] = useState("flight"); // "flight", "hotel", "tour"

  return (
    <div className="List2">
      <div className="Form">
        <div className="Top">
          <label className="radioLabel">
            <input
              type="radio"
              name="travelType"
              value="flight"
              checked={travelType === "flight"}
              onChange={() => setTravelType("flight")}
            />
            پرواز
          </label>
          <label className="radioLabel">
            <input
              type="radio"
              name="travelType"
              value="hotel"
              checked={travelType === "hotel"}
              onChange={() => setTravelType("hotel")}
            />
            هتل
          </label>
          <label className="radioLabel">
            <input
              type="radio"
              name="travelType"
              value="tour"
              checked={travelType === "tour"}
              onChange={() => setTravelType("tour")}
            />
            تور
          </label>
        </div>

        {travelType === "flight" && <FlightForm />}
        {travelType === "hotel" && <HotelForm />}
        {travelType === "tour" && <TourForm />}
      </div>
    </div>
  );
}

// ========== فرم پرواز (برگرفته از FormType3) ==========
function FlightForm() {
  const [tripType, setTripType] = useState(null); // domestic/foreign
  const [tripDirection, setTripDirection] = useState("roundTrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  // توابع ساده (برای خلاصه کردن، از منطق کامل پرواز استفاده می‌کنیم اما فقط نمایشی)
  const handleSearch = () => {
    const newErrors = {};
    if (!tripType) newErrors.tripType = true;
    if (!origin) newErrors.origin = true;
    if (!destination) newErrors.destination = true;
    if (!startDate) newErrors.startDate = true;
    if (tripDirection === "roundTrip" && !endDate) newErrors.endDate = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    console.log("Flight Search:", {
      tripType,
      tripDirection,
      origin,
      destination,
      startDate,
      endDate,
      adultCount,
      childCount,
      infantCount,
    });
  };

  return (
    <div
      className="BottomHotel"
      style={{ flexDirection: "column", gap: "15px" }}
    >
      <div className="Top" style={{ borderBottom: "none", paddingBottom: 0 }}>
        {["domestic", "foreign"].map((type) => (
          <label key={type} className="radioLabel">
            <input
              type="radio"
              name="flightType"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
            />
            {type === "domestic" ? "داخلی" : "خارجی"}
          </label>
        ))}
        {tripType && (
          <div className="directionContainer">
            {["oneWay", "roundTrip"].map((dir) => (
              <label key={dir} className="radioLabel">
                <input
                  type="radio"
                  name="direction"
                  value={dir}
                  checked={tripDirection === dir}
                  onChange={() => setTripDirection(dir)}
                />
                {dir === "oneWay" ? "رفت" : "رفت و برگشت"}
              </label>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div className="LocationPicker">
          <input
            type="text"
            placeholder="مبدأ"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={errors.origin ? "error" : ""}
          />
        </div>
        <div className="LocationPicker">
          <input
            type="text"
            placeholder="مقصد"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={errors.destination ? "error" : ""}
          />
        </div>
        <div className="DatePicker">
          <input
            type="text"
            placeholder="تاریخ رفت"
            value={startDate || ""}
            readOnly
            className={errors.startDate ? "error" : ""}
          />
          {tripDirection === "roundTrip" && (
            <input
              type="text"
              placeholder="تاریخ برگشت"
              value={endDate || ""}
              readOnly
              className={errors.endDate ? "error" : ""}
            />
          )}
        </div>
        <div className="PaxPicker">
          <button type="button" onClick={() => {}}>
            <FontAwesomeIcon icon={faUser} /> {adultCount} بزرگسال ،{" "}
            <FontAwesomeIcon icon={faChild} /> {childCount} کودک ،{" "}
            <FontAwesomeIcon icon={faBaby} /> {infantCount} نوزاد
          </button>
        </div>
        <div className="Submit">
          <button onClick={handleSearch}>جستجو</button>
        </div>
      </div>
    </div>
  );
}

// ========== فرم هتل (نسخه کامل با بخش اتاق و تخت) ==========
function HotelForm() {
  // Stateهای هتل (کد کامل از HotelSearchForm قبلی)
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [bedDistribution, setBedDistribution] = useState([1]);
  const [isManualDistribution, setIsManualDistribution] = useState(false);
  const [showRoomEditor, setShowRoomEditor] = useState(false);
  const [tempDistribution, setTempDistribution] = useState([]);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const [showGuests, setShowGuests] = useState(false);

  const totalBedsNeeded = adultCount + childCount;

  useEffect(() => {
    if (!isManualDistribution) {
      const base = Math.floor(totalBedsNeeded / numRooms);
      const rem = totalBedsNeeded % numRooms;
      const newDist = new Array(numRooms).fill(base);
      for (let i = 0; i < rem; i++) newDist[i]++;
      setBedDistribution(newDist);
    } else {
      const currentTotal = bedDistribution.reduce((a, b) => a + b, 0);
      if (
        currentTotal !== totalBedsNeeded ||
        bedDistribution.length !== numRooms
      ) {
        setIsManualDistribution(false);
      }
    }
  }, [totalBedsNeeded, numRooms, isManualDistribution]);

  const changeAdult = (delta) => {
    setAdultCount((prev) => Math.max(1, prev + delta));
    setIsManualDistribution(false);
  };
  const changeChild = (delta) => {
    setChildCount((prev) => Math.max(0, prev + delta));
    setIsManualDistribution(false);
  };
  const changeInfant = (delta) => {
    setInfantCount((prev) => Math.max(0, prev + delta));
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
    if (tempDistribution.reduce((a, b) => a + b, 0) !== totalBedsNeeded) {
      triggerErrorShake("roomDistribution");
      return;
    }
    setBedDistribution(tempDistribution);
    setIsManualDistribution(true);
    setShowRoomEditor(false);
  };
  const handleSearch = () => {
    const newErrors = {};
    if (!destination) newErrors.destination = true;
    if (!checkIn) newErrors.checkIn = true;
    if (!checkOut) newErrors.checkOut = true;
    if (numRooms > totalBedsNeeded) newErrors.rooms = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    console.log("Hotel Search:", {
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      infantCount,
      numRooms,
      bedDistribution,
    });
  };

  return (
    <div className="BottomHotel">
      <div className="LocationPicker">
        <input
          type="text"
          placeholder="نام هتل یا شهر"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className={errors.destination ? "error" : ""}
        />
      </div>
      <div className="DatePicker">
        <input
          type="text"
          placeholder="تاریخ ورود"
          value={checkIn || ""}
          readOnly
          className={errors.checkIn ? "error" : ""}
        />
        <input
          type="text"
          placeholder="تاریخ خروج"
          value={checkOut || ""}
          readOnly
          className={errors.checkOut ? "error" : ""}
        />
      </div>
      <div className="Guests">
        <button type="button" onClick={() => setShowGuests(!showGuests)}>
          <FontAwesomeIcon icon={faUser} /> {adultCount} بزرگسال ،{" "}
          <FontAwesomeIcon icon={faChild} /> {childCount} کودک ،{" "}
          <FontAwesomeIcon icon={faBaby} /> {infantCount} نوزاد
        </button>
        {showGuests && (
          <div className="GuestDropdown">
            <div className="row">
              <div className="Namee">
                <FontAwesomeIcon icon={faUser} />
                <span>بزرگسال</span>
              </div>
              <div className="AdultAndChildCount">
                <button
                  onClick={() => changeAdult(-1)}
                  disabled={adultCount <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{adultCount}</span>
                <button onClick={() => changeAdult(1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="row">
              <div className="Namee">
                <FontAwesomeIcon icon={faChild} />
                <span>کودک</span>
              </div>
              <div className="AdultAndChildCount">
                <button
                  onClick={() => changeChild(-1)}
                  disabled={childCount <= 0}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{childCount}</span>
                <button onClick={() => changeChild(1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="row">
              <div className="Namee">
                <FontAwesomeIcon icon={faBaby} />
                <span>نوزاد</span>
              </div>
              <div className="AdultAndChildCount">
                <button
                  onClick={() => changeInfant(-1)}
                  disabled={infantCount <= 0}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{infantCount}</span>
                <button onClick={() => changeInfant(1)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="RoomSelector">
              <div className="roomHeader">
                <span>
                  <FontAwesomeIcon icon={faDoorOpen} /> تعداد اتاق‌ها
                </span>
                <div className="roomCounter">
                  <button
                    onClick={() => changeRooms(-1)}
                    disabled={numRooms <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{numRooms}</span>
                  <button
                    onClick={() => changeRooms(1)}
                    disabled={numRooms >= totalBedsNeeded}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              {errors.rooms && (
                <div className="errorMsg">
                  تعداد اتاق نمی‌تواند از کل تخت‌ها بیشتر باشد
                </div>
              )}
              <div className="bedSummary">
                <FontAwesomeIcon icon={faBed} />
                <span>
                  {bedDistribution.map((b, idx) => `${b} تخته`).join(" و ")} (
                  {bedDistribution.length} اتاق)
                </span>
                <button className="editBtn" onClick={openRoomEditor}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="Submit">
        <button onClick={handleSearch}>جستجوی هتل</button>
      </div>

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
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{beds} تخت</span>
                  <button
                    onClick={() => updateTempBed(idx, 1)}
                    disabled={
                      tempDistribution.reduce((a, b) => a + b, 0) + 1 >
                      totalBedsNeeded
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            ))}
            <div className="modalActions">
              <button className="saveBtn" onClick={saveRoomDistribution}>
                <FontAwesomeIcon icon={faSave} /> ذخیره
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
    </div>
  );
}

// ========== فرم تور ==========
function TourForm() {
  const [tourType, setTourType] = useState(null); // domestic/foreign
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [durationNights, setDurationNights] = useState(1); // تعداد شب
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState("days");
  const [hoverDate, setHoverDate] = useState(null);

  const today = new Date();
  const jToday = jalaali.toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const jDateToString = (jy, jm, jd) =>
    `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  const stringToJDate = (str) => {
    if (!str) return null;
    const parts = str.split("/");
    return {
      jy: parseInt(parts[0]),
      jm: parseInt(parts[1]),
      jd: parseInt(parts[2]),
    };
  };
  const getDateValue = (jy, jm, jd) => jy * 10000 + jm * 100 + jd;

  const selectDate = (jy, jm, jd) => {
    const dateStr = jDateToString(jy, jm, jd);
    setStartDate(dateStr);
    setShowCalendar(false);
    setErrors((prev) => ({ ...prev, startDate: false }));
  };
  const openCalendar = () => {
    setCurrentJy(jToday.jy);
    setCurrentJm(jToday.jm);
    setCurrentView("days");
    setShowCalendar(true);
  };
  const closeCalendar = () => {
    setShowCalendar(false);
    setHoverDate(null);
  };

  const renderCalendar = () => {
    const daysInMonth = jalaali.jMonthLength(currentJy, currentJm);
    const gDate = jalaali.toGregorian(currentJy, currentJm, 1);
    const startDayOfWeek =
      (new Date(gDate.gy, gDate.gm - 1, gDate.gd).getDay() + 1) % 7;
    let cells = [];
    for (let i = 0; i < startDayOfWeek; i++)
      cells.push(<div key={`e-${i}`} className="calendarDay empty"></div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = jDateToString(currentJy, currentJm, d);
      const isToday =
        currentJy === jToday.jy && currentJm === jToday.jm && d === jToday.jd;
      const isSelected = dateStr === startDate;
      cells.push(
        <div
          key={d}
          className={`calendarDay${isToday ? " today" : ""}${isSelected ? " selected" : ""}`}
          onClick={() => selectDate(currentJy, currentJm, d)}
        >
          {d}
        </div>,
      );
    }
    return cells;
  };
  const handlePrevMonth = () => {
    if (currentJm === 1) {
      setCurrentJy((y) => y - 1);
      setCurrentJm(12);
    } else setCurrentJm((m) => m - 1);
  };
  const handleNextMonth = () => {
    if (currentJm === 12) {
      setCurrentJy((y) => y + 1);
      setCurrentJm(1);
    } else setCurrentJm((m) => m + 1);
  };
  const handleCalendarTitleClick = () => {
    if (currentView === "days") setCurrentView("years");
    else if (currentView === "years") setCurrentView("months");
    else setCurrentView("days");
  };
  const renderMonthsGrid = () => {
    const monthNames = [
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
    ];
    return monthNames.map((name, idx) => (
      <div
        key={idx + 1}
        className={`monthItem${currentJm === idx + 1 ? " selected" : ""}`}
        onClick={() => {
          setCurrentJm(idx + 1);
          setCurrentView("days");
        }}
      >
        {name}
      </div>
    ));
  };
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

  // دراپ‌داون مقصد
  const filteredDestinations = () => {
    const all = [...DESTINATIONS.domestic, ...DESTINATIONS.foreign];
    if (!destination.trim()) return all;
    return all.filter((item) => item.name.includes(destination.trim()));
  };
  const handleSelectDestination = (dest) => {
    setDestination(dest.name);
    setRecentSearches((prev) => {
      const exists = prev.find((i) => i.id === dest.id);
      if (exists)
        return [exists, ...prev.filter((i) => i.id !== dest.id)].slice(0, 5);
      return [dest, ...prev].slice(0, 5);
    });
    setShowDropdown(false);
    setErrors((prev) => ({ ...prev, destination: false }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== inputRef.current
      )
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeDuration = (delta) => {
    setDurationNights((prev) => Math.max(1, prev + delta));
  };
  const changeAdult = (delta) => {
    setAdultCount((prev) => Math.max(1, prev + delta));
  };
  const changeChild = (delta) => {
    setChildCount((prev) => Math.max(0, prev + delta));
  };
  const changeInfant = (delta) => {
    setInfantCount((prev) => Math.max(0, prev + delta));
  };

  const handleSearch = () => {
    const newErrors = {};
    if (!tourType) newErrors.tourType = true;
    if (!destination) newErrors.destination = true;
    if (!startDate) newErrors.startDate = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    console.log("Tour Search:", {
      tourType,
      destination,
      startDate,
      durationNights,
      adultCount,
      childCount,
      infantCount,
    });
  };

  return (
    <div
      className="BottomHotel"
      style={{ flexDirection: "column", gap: "15px" }}
    >
      <div className="Top" style={{ borderBottom: "none", paddingBottom: 0 }}>
        {["domestic", "foreign"].map((type) => (
          <label key={type} className="radioLabel">
            <input
              type="radio"
              name="tourType"
              value={type}
              checked={tourType === type}
              onChange={() => setTourType(type)}
            />
            {type === "domestic" ? "تور داخلی" : "تور خارجی"}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div className="LocationPicker" style={{ flex: 2 }} ref={dropdownRef}>
          <div className="inputWithIcon">
            <FontAwesomeIcon icon={faSearch} className="inputIcon" />
            <input
              type="text"
              placeholder="مقصد (شهر یا هتل)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              ref={inputRef}
              className={errors.destination ? "error" : ""}
            />
            {destination && (
              <FontAwesomeIcon
                icon={faXmark}
                className="clearIcon"
                onClick={() => setDestination("")}
              />
            )}
          </div>
          {showDropdown && (
            <div className="destinationDropdown">
              {recentSearches.length > 0 && (
                <div className="dropdownSection">
                  <div className="sectionTitle">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <span>جستجوهای اخیر</span>
                  </div>
                  <ul>
                    {recentSearches.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectDestination(item)}
                      >
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="dropdownSection">
                <div className="sectionTitle">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>شهرهای پرسفر</span>
                </div>
                <ul>
                  {filteredDestinations().map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelectDestination(item)}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                  {filteredDestinations().length === 0 && (
                    <li className="noResult">نتیجه‌ای یافت نشد</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div
          className="DatePicker"
          style={{ flex: 1, position: "relative" }}
          ref={calendarRef}
        >
          <input
            type="text"
            placeholder="تاریخ حرکت"
            value={startDate || ""}
            readOnly
            onClick={openCalendar}
            className={errors.startDate ? "error" : ""}
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
                    ? `${currentJy} ${["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"][currentJm - 1]}`
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
                    {"ش ی د س چ پ ج".split(" ").map((d, i) => (
                      <div key={i}>{d}</div>
                    ))}
                  </div>
                  <div className="calendarDays">{renderCalendar()}</div>
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
                  بستن
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="PaxPicker" style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--grayBg)",
              borderRadius: "8px",
              padding: "0 10px",
              height: "50px",
            }}
          >
            <span>مدت تور:</span>
            <button
              onClick={() => changeDuration(-1)}
              disabled={durationNights <= 1}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{durationNights} شب</span>
            <button onClick={() => changeDuration(1)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="PaxPicker" style={{ flex: 2 }}>
          <button type="button" onClick={() => {}}>
            <FontAwesomeIcon icon={faUser} /> {adultCount} بزرگسال ،{" "}
            <FontAwesomeIcon icon={faChild} /> {childCount} کودک ،{" "}
            <FontAwesomeIcon icon={faBaby} /> {infantCount} نوزاد
          </button>
        </div>

        <div className="Submit">
          <button onClick={handleSearch}>جستجوی تور</button>
        </div>
      </div>
    </div>
  );
}
