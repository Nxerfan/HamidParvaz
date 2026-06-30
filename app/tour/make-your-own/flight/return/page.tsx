"use client";
import "../../global.css";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPlane,
  faBell,
  faBolt,
  faCircleDot,
  faClock,
  faSliders,
  faRotateRight,
  faCheck,
  faStar,
  faLocationDot,
  faHotel,
  faFaceSmile,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import HeaderMakeYourTour from "../../../../components/(Headers)/HeaderMakeYourTour";

interface FilterItem {
  id: string; title: string; type: string;
  min?: number; max?: number; step?: number;
  options?: { value: string; label: string }[];
  groups?: { title: string; options: { value: string; label: string }[] }[];
}

const PAGE_DATA = {
  sidebar: {
    header: "فیلترها",
    filters: [
      {
        id: "price",
        title: "محدوده قیمت (تومان)",
        type: "range",
        min: 0,
        max: 5000000,
        step: 50000,
      },
      {
        id: "class",
        title: "کلاس پروازی",
        type: "checkbox",
        options: [
          { value: "economy", label: "اکونومی" },
          { value: "business", label: "بیزنس" },
        ],
      },
      {
        id: "time",
        title: "زمان پرواز",
        type: "grouped",
        groups: [
          {
            title: "زمان حرکت از مبدأ",
            options: [
              { value: "0-8", label: "۰۰:۰۰ تا ۰۸:۰۰" },
              { value: "8-18", label: "۰۸:۰۰ تا ۱۸:۰۰" },
              { value: "18-24", label: "۱۸:۰۰ تا ۰۰:۰۰" },
            ],
          },
          {
            title: "زمان رسیدن به مقصد",
            options: [
              { value: "0-8", label: "۰۰:۰۰ تا ۰۸:۰۰" },
              { value: "8-18", label: "۰۸:۰۰ تا ۱۸:۰۰" },
              { value: "18-24", label: "۱۸:۰۰ تا ۰۰:۰۰" },
            ],
          },
        ],
      },
      {
        id: "airline",
        title: "شرکت‌های هواپیمایی",
        type: "checkbox",
        options: [
          { value: "چابهار", label: "چابهار" },
          { value: "فلای کیش", label: "فلای کیش" },
          { value: "آسمان", label: "آسمان" },
          { value: "کیش ایر", label: "کیش ایر" },
          { value: "قشم ایر", label: "قشم ایر" },
          { value: "معراج", label: "معراج" },
        ],
      },
      {
        id: "baggage",
        title: "مقدار بار مجاز",
        type: "checkbox",
        options: [
          { value: "20kg", label: "۲۰ کیلوگرم" },
          { value: "25kg", label: "۲۵ کیلوگرم" },
          { value: "30kg", label: "۳۰ کیلوگرم" },
        ],
      },
    ] as FilterItem[],
  },
  mainContent: {
    header: { icon: faPlane, text: "پرواز برگشت خود را انتخاب کنید" },
    sorting: {
      baseText: "پرواز برگشت تهران به مشهد",
      options: ["ارزان‌ترین", "زودترین پرواز", "کوتاه‌ترین مدت"],
    },
    flights: [
      {
        id: 1,
        airline: {
          name: "چابهار",
          logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
        },
        departure: { time: "6:00", city: "تهران", hour: 6 },
        arrival: { time: "7:00", city: "مشهد", hour: 7 },
        classType: "economy",
        classLabel: "اکونومی",
        seatsLeft: "6 صندلی",
        baggage: "20kg",
        price: 1802400,
        priceText: "1,802,400",
        duration: "1:00",
        details: {
          date: "سه‌شنبه 2 دی ← چهارشنبه 3 دی",
          classCode: "Y",
          originAirport: "تهران، فرودگاه مهرآباد (THR) - ترمینال 1",
          destinationAirport: "مشهد، فرودگاه شهید هاشمی‌نژاد (MHD)",
          totalPrice: "3,161,600",
        },
      },
      {
        id: 2,
        airline: {
          name: "فلای کیش",
          logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
        },
        departure: { time: "10:30", city: "تهران", hour: 10 },
        arrival: { time: "12:00", city: "مشهد", hour: 12 },
        classType: "business",
        classLabel: "بیزنس",
        seatsLeft: "2 صندلی",
        baggage: "30kg",
        price: 2500000,
        priceText: "2,500,000",
        duration: "1:30",
        details: {
          date: "سه‌شنبه 2 دی ← چهارشنبه 3 دی",
          classCode: "C",
          originAirport: "تهران، فرودگاه مهرآباد (THR) - ترمینال 2",
          destinationAirport: "مشهد، فرودگاه شهید هاشمی‌نژاد (MHD)",
          totalPrice: "5,000,000",
        },
      },
      {
        id: 3,
        airline: {
          name: "آسمان",
          logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
        },
        departure: { time: "14:15", city: "تهران", hour: 14 },
        arrival: { time: "15:45", city: "مشهد", hour: 15 },
        classType: "economy",
        classLabel: "اکونومی",
        seatsLeft: "15 صندلی",
        baggage: "20kg",
        price: 1650000,
        priceText: "1,650,000",
        duration: "1:30",
        details: {
          date: "سه‌شنبه 2 دی ← چهارشنبه 3 دی",
          classCode: "Y",
          originAirport: "تهران، فرودگاه امام خمینی (IKA)",
          destinationAirport: "مشهد، فرودگاه شهید هاشمی‌نژاد (MHD)",
          totalPrice: "3,300,000",
        },
      },
    ],
  },
};

const SELECTED_HOTEL = {
  id: 3,
  image:
    "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
  name: "هتل شایان",
  stars: 4,
  location: "خیابان احمدآباد",
  options: ["صبحانه رایگان"],
  score: 7.5,
  price: 4800000,
  priceLabel: "قیمت 1 شب اتاق 1 تخته",
  priceValue: "۴,۸۰۰,۰۰۰",
};

export default function FlightAwaySelection() {
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState(0);
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: PAGE_DATA.sidebar.filters[0]!.min ?? 0,
    max: PAGE_DATA.sidebar.filters[0]!.max ?? 0,
  });
  const [checkedOptions, setCheckedOptions] = useState<
    Record<string, string[]>
  >({});
  const [showFlightList, setShowFlightList] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [selectedHotel] = useState<any>(SELECTED_HOTEL);
  const [isAutoSelecting, setIsAutoSelecting] = useState(true);

  const toPersianNumber = (num: number | string) =>
    Number(num).toLocaleString("fa-IR");

  const handleToggleFilter = (id: string) =>
    setOpenFilter(openFilter === id ? null : id);

  const handlePriceChange = (type: "min" | "max", value: string | number) => {
    const val = Number(value);
    if (type === "min") {
      setPriceRange((prev) => ({
        ...prev,
        min: Math.min(val, prev.max - 50000),
      }));
    } else {
      setPriceRange((prev) => ({
        ...prev,
        max: Math.max(val, prev.min + 50000),
      }));
    }
  };

  const handleCheckboxChange = (filterId: string, value: string) => {
    setCheckedOptions((prev) => {
      const setForFilter = new Set(prev[filterId] || []);
      if (setForFilter.has(value)) setForFilter.delete(value);
      else setForFilter.add(value);
      return { ...prev, [filterId]: Array.from(setForFilter) };
    });
  };

  const handleResetFilters = () => {
    setPriceRange({
      min: PAGE_DATA.sidebar.filters[0]!.min ?? 0,
      max: PAGE_DATA.sidebar.filters[0]!.max ?? 0,
    });
    setCheckedOptions({});
    setActiveSort(0);
  };

  const activeFilterCount =
    Object.values(checkedOptions).reduce((sum, arr) => sum + arr.length, 0) +
    (priceRange.min > (PAGE_DATA.sidebar.filters[0]!.min ?? 0) ||
    priceRange.max < (PAGE_DATA.sidebar.filters[0]!.max ?? 0)
      ? 1
      : 0);

  const filteredFlights = useMemo(() => {
    let result = [...PAGE_DATA.mainContent.flights];
    result = result.filter(
      (f) => f.price >= priceRange.min && f.price <= priceRange.max,
    );

    const selectedClasses = checkedOptions["class"] || [];
    if (selectedClasses.length > 0)
      result = result.filter((f) => selectedClasses.includes(f.classType));

    const selectedDepTimes = checkedOptions["time"] || [];
    if (selectedDepTimes.length > 0) {
      result = result.filter((f) =>
        selectedDepTimes.some((range) => {
          if (range === "0-8")
            return f.departure.hour >= 0 && f.departure.hour < 8;
          if (range === "8-18")
            return f.departure.hour >= 8 && f.departure.hour < 18;
          if (range === "18-24")
            return f.departure.hour >= 18 && f.departure.hour <= 24;
          return false;
        }),
      );
    }

    const selectedAirlines = checkedOptions["airline"] || [];
    if (selectedAirlines.length > 0)
      result = result.filter((f) => selectedAirlines.includes(f.airline.name));

    const selectedBaggage = checkedOptions["baggage"] || [];
    if (selectedBaggage.length > 0)
      result = result.filter((f) => selectedBaggage.includes(f.baggage));

    const sortType = PAGE_DATA.mainContent.sorting.options[activeSort];
    if (sortType === "ارزان‌ترین") result.sort((a, b) => a.price - b.price);
    else if (sortType === "زودترین پرواز")
      result.sort((a, b) => a.departure.hour - b.departure.hour);
    else if (sortType === "کوتاه‌ترین مدت")
      result.sort(
        (a, b) =>
          a.arrival.hour -
          a.departure.hour -
          (b.arrival.hour - b.departure.hour),
      );

    return result;
  }, [priceRange, checkedOptions, activeSort]);

  const priceFilter = PAGE_DATA.sidebar.filters[0]!;
  const pfMin = priceFilter.min ?? 0;
  const pfMax = priceFilter.max ?? 0;
  const minPercent =
    ((priceRange.min - pfMin) / (pfMax - pfMin)) *
    100;
  const maxPercent =
    ((priceRange.max - pfMin) / (pfMax - pfMin)) *
    100;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const minPriceFlights = PAGE_DATA.mainContent.flights.filter(
        (flight) => flight.price >= 1000000,
      );
      if (minPriceFlights.length > 0) {
        const cheapestFlight = [...minPriceFlights].sort(
          (a, b) => a.price - b.price,
        )[0];
        setSelectedFlight(cheapestFlight);
        setShowFlightList(false);
        setIsAutoSelecting(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const AutoSelectingUI = () => (
    <div className="AutoSelectingCard">
      <div className="AutoSelectingPlane">
        <div className="PlaneTrack">
          <FontAwesomeIcon
            icon={faPlane}
            className="PlaneIcon"
            flip="horizontal"
          />
        </div>
      </div>
      <div className="AutoSelectingContent">
        <h3>در حال انتخاب بهترین پرواز برای شما</h3>
        <div className="AutoSelectingDots">
          <span className="dot" style={{ animationDelay: "0s" }}></span>
          <span className="dot" style={{ animationDelay: "0.2s" }}></span>
          <span className="dot" style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
      <div className="AutoSelectingProgress">
        <div className="ProgressBar"></div>
      </div>
      <div className="AutoSelectingHint">
        <FontAwesomeIcon icon={faStar} />
        <span>
          کم‌یاب‌ترین و بهترین پرواز با توجه به قیمت و امکانات برای شما انتخاب
          می‌شود
        </span>
      </div>
    </div>
  );

  const HotelSummaryCard = () => (
    <div className="HotelSummaryCard">
      <div className="HotelSummaryBadge">
        <FontAwesomeIcon icon={faHotel} />
        <span>هتل منتخب شما</span>
      </div>
      <img
        src={selectedHotel.image}
        alt={selectedHotel.name}
        className="HotelSummaryImage"
      />
      <div className="HotelSummaryInfo">
        <div className="HotelSummaryNameRow">
          <h4 className="HotelSummaryName">{selectedHotel.name}</h4>
          <div className="HotelSummaryStars">
            {[...Array(selectedHotel.stars)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
            <span>{selectedHotel.stars} ستاره</span>
          </div>
        </div>
        <div className="HotelSummaryLocation">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{selectedHotel.location}</span>
        </div>
        <div className="HotelSummaryMeta">
          {selectedHotel.options.map((opt: string, i: number) => (
            <span key={i} className="HotelSummaryOption">
              {opt}
            </span>
          ))}
          <div className="HotelSummaryScore">
            <FontAwesomeIcon icon={faFaceSmile} />
            <span>{selectedHotel.score}</span>
          </div>
        </div>
      </div>
      <div className="HotelSummaryPrice">
        <p className="HotelSummaryPriceLabel">{selectedHotel.priceLabel}</p>
        <p className="HotelSummaryPriceValue">
          {selectedHotel.priceValue}
          <span className="HotelSummaryPriceUnit"> تومان</span>
        </p>
      </div>
      <div className="HotelSummaryActions">
        <button
          className="HotelSummaryViewBtn"
          onClick={() => (window.location.href = "/tour/make-your-own/hotel")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          مشاهده هتل
        </button>
        <button
          className="HotelSummaryChangeBtn"
          onClick={() => (window.location.href = "/tour/make-your-own/hotel")}
        >
          <FontAwesomeIcon icon={faRotateRight} />
          تغییر هتل
        </button>
      </div>
    </div>
  );

  const SelectedFlightCard = () => (
    <div className="SelectedFlightCard">
      <div className="SelectedFlightHeader">
        <h3>پرواز برگشت انتخاب شده شما</h3>
        <button
          className="ChangeSelectionBtn"
          onClick={() => {
            setSelectedFlight(null);
            setShowFlightList(true);
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} /> تغییر پرواز
        </button>
      </div>
      <div className="SelectedFlightContent">
        <div className="SelectedFlightInfo">
          <div className="SelectedFlightMain">
            <div className="FlightIcon">
              <img
                src={selectedFlight.airline.logo}
                alt={selectedFlight.airline.name}
              />
              <span>{selectedFlight.airline.name}</span>
            </div>
            <div className="FlightTime">
              <div className="Form">
                <span>{selectedFlight.departure.time}</span>
                <p>{selectedFlight.departure.city}</p>
              </div>
              <div className="i">
                <FontAwesomeIcon icon={faCircleDot} />
                <hr className="line-divider" />
                <FontAwesomeIcon
                  icon={faPlane}
                  className="fa-flip-horizontal"
                />
              </div>
              <div className="Form">
                <span>{selectedFlight.arrival.time}</span>
                <p>{selectedFlight.arrival.city}</p>
              </div>
            </div>
          </div>
          <div className="FlightDetails">
            <div className="Class">
              <span>{selectedFlight.classLabel}</span>
              <p>{selectedFlight.seatsLeft}</p>
            </div>
            <div className="Bottom">
              <p>
                <span>{selectedFlight.priceText}</span> تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilterContent = (filter: FilterItem) => {
    if (filter.type === "range") {
      return (
        <div className="dropdownPanel open">
          <div className="priceSliderBox">
            <div className="priceLabels">
              <div className="labelGroup">
                <span>از</span>
                <span className="displayMin">
                  {toPersianNumber(priceRange.min)}
                </span>
                <span>تومان</span>
              </div>
              <span className="labelSeparator">—</span>
              <div className="labelGroup">
                <span>تا</span>
                <span className="displayMax">
                  {toPersianNumber(priceRange.max)}
                </span>
                <span>تومان</span>
              </div>
            </div>
            <div className="rangeSliderContainer">
              <div className="sliderTrack" />
              <div
                className="sliderProgress"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />
              <div className="rangeInputs">
                <input
                  type="range"
                  className="rangeMin"
                  min={filter.min}
                  max={filter.max}
                  value={priceRange.min}
                  step={filter.step}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                />
                <input
                  type="range"
                  className="rangeMax"
                  min={filter.min}
                  max={filter.max}
                  value={priceRange.max}
                  step={filter.step}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (filter.type === "checkbox") {
      return (
        <div className="dropdownPanel open">
          <div className="checkboxGroup">
            {filter.options!.map((opt: any) => (
              <label key={opt.value} className="checkboxItem">
                <input
                  type="checkbox"
                  checked={(checkedOptions[filter.id] || []).includes(
                    opt.value,
                  )}
                  onChange={() => handleCheckboxChange(filter.id, opt.value)}
                />
                <span className="checkmark" />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (filter.type === "grouped") {
      return (
        <div className="dropdownPanel open">
          {filter.groups!.map((group: any, index: number) => (
            <div key={index} className="timeSubSection">
              {index > 0 && <hr className="filterDivider" />}
              <span className="subTitle">{group.title}</span>
              <div className="checkboxGroup">
                {group.options.map((opt: any) => (
                  <label key={opt.value} className="checkboxItem">
                    <input
                      type="checkbox"
                      checked={(checkedOptions[filter.id] || []).includes(
                        opt.value,
                      )}
                      onChange={() =>
                        handleCheckboxChange(filter.id, opt.value)
                      }
                    />
                    <span className="checkmark" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <HeaderMakeYourTour currentStep={3} />
      <div className="Countainer flightSelectionPage">
        <div className="Right flightSidebar">
          <div className="sidebarFilters">
            <div className="filterHeader">
              <div className="filterHeaderLeft">
                <FontAwesomeIcon icon={faSliders} />
                <span>{PAGE_DATA.sidebar.header}</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  className="resetFiltersBtn"
                  onClick={handleResetFilters}
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                  <span>حذف</span>
                  <span className="filterBadge">{activeFilterCount}</span>
                </button>
              )}
            </div>

            <div className="filterContentArea">
              <span className="resultsCount">
                <FontAwesomeIcon icon={faCheck} style={{ marginLeft: 6 }} />
                {filteredFlights.length} پرواز یافت شد
              </span>

              {PAGE_DATA.sidebar.filters.map((filter) => (
                <div
                  key={filter.id}
                  className={`filterItem ${openFilter === filter.id ? "open" : ""}`}
                >
                  <div
                    className="dropdownTrigger"
                    onClick={() => handleToggleFilter(filter.id)}
                  >
                    <div className="triggerLeft">
                      <span>{filter.title}</span>
                      {checkedOptions[filter.id]?.length > 0 && (
                        <span className="filterCountBadge">
                          {checkedOptions[filter.id].length}
                        </span>
                      )}
                    </div>
                    <FontAwesomeIcon
                      icon={openFilter === filter.id ? faAngleUp : faAngleDown}
                    />
                  </div>
                  {openFilter === filter.id && renderFilterContent(filter)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Left flightContent">
          {selectedHotel ? <HotelSummaryCard /> : null}

          <div className="flightTopBar">
            <div className="topRight">
              <div className="headerIcon">
                <FontAwesomeIcon icon={PAGE_DATA.mainContent.header.icon} />
              </div>
              <p>{PAGE_DATA.mainContent.header.text}</p>
            </div>
            {!showFlightList && (
              <div className="sortingBar">
                <span className="sortCount">
                  {PAGE_DATA.mainContent.sorting.baseText} : (
                  {filteredFlights.length} مورد)
                </span>
                <div className="sortOptions">
                  {PAGE_DATA.mainContent.sorting.options.map((opt, index) => (
                    <button
                      key={index}
                      className={`sortBtn ${activeSort === index ? "active" : ""}`}
                      onClick={() => setActiveSort(index)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flightList Bottom">
            {isAutoSelecting ? <AutoSelectingUI /> : null}

            {!isAutoSelecting && !showFlightList && selectedFlight ? (
              <>
                <SelectedFlightCard />
                <button
                  className="NextStepBtn"
                  onClick={() => router.push("/tour/make-your-own/passenger-info")}
                >
                  اطلاعات مسافر
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </>
            ) : null}

            {showFlightList &&
              (filteredFlights.length === 0 ? (
                <div className="noResults">
                  <div className="noResultsIcon">
                    <FontAwesomeIcon icon={faPlane} />
                  </div>
                  <p className="noResultsTitle">پروازی یافت نشد!</p>
                  <p className="noResultsDesc">
                    لطفاً فیلترهای خود را تغییر دهید.
                  </p>
                  <button className="noResultsBtn" onClick={handleResetFilters}>
                    حذف همه فیلترها
                  </button>
                </div>
              ) : (
                filteredFlights.map((flight) => (
                  <div key={flight.id} className="Cards">
                    <div className="RightCard">
                      <div className="About">
                        <div className="Icon">
                          <img
                            src={flight.airline.logo}
                            alt={flight.airline.name}
                          />
                          <span>{flight.airline.name}</span>
                        </div>
                        <div className="Time">
                          <div className="Form">
                            <span>{flight.departure.time}</span>
                            <p>{flight.departure.city}</p>
                          </div>
                          <div className="i">
                            <FontAwesomeIcon icon={faCircleDot} />
                            <hr className="line-divider" />
                            <hr className="line-divider" />
                            <FontAwesomeIcon
                              icon={faPlane}
                              className="fa-flip-horizontal"
                            />
                          </div>
                          <div className="Form">
                            <span>{flight.arrival.time}</span>
                            <p>{flight.arrival.city}</p>
                          </div>
                        </div>
                      </div>
                      <div className="discriptions">
                        <div
                          className={`More ${expandedFlight === flight.id ? "active" : ""}`}
                          onClick={() =>
                            setExpandedFlight(
                              expandedFlight === flight.id ? null : flight.id,
                            )
                          }
                        >
                          <span>
                            جزئیات <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </div>
                        <div className="Avablity">
                          <span>{flight.classLabel}</span>
                          <p>{flight.seatsLeft}</p>
                        </div>
                      </div>
                    </div>
                    <div className="LeftCard">
                      <div className="Bottom">
                        <p>
                          <span>{flight.priceText}</span> تومان
                        </p>
                        <button
                          className="BtnPrimary"
                          onClick={() => {
                            setSelectedFlight(flight);
                            setShowFlightList(false);
                          }}
                        >
                          انتخاب بلیط رفت
                        </button>
                      </div>
                    </div>
                    <div
                      className={`FlightDetails ${expandedFlight === flight.id ? "active" : ""}`}
                    >
                      <div className="DetailsContent">
                        <div className="row">
                          <div className="title">
                            <p>
                              {flight.details.date} <span></span> کلاس نرخی{" "}
                              {flight.details.classCode}
                            </p>
                          </div>
                          <div className="contet">
                            <div className="right">
                              <p>ساعت ورود به فرودگاه:</p>
                              <span>
                                ساعت حرکت <FontAwesomeIcon icon={faClock} />:
                              </span>
                              <p>ساعت رسیدن به مقصد:</p>
                            </div>
                            <div className="left">
                              <p>{flight.departure.time} — {flight.details.originAirport}</p>
                              <span>هواپیمای شما</span>
                              <p>{flight.arrival.time} — {flight.details.destinationAirport}</p>
                            </div>
                          </div>
                        </div>
                        <div className="orw">
                          <div className="top">
                            <p>
                              بزرگسال × 1{" "}
                              <span>{flight.details.totalPrice} تومان</span>
                            </p>
                            <p>
                              مجموع{" "}
                              <span>{flight.details.totalPrice} تومان</span>
                            </p>
                          </div>
                          <div className="bottom">
                            <button>
                              <FontAwesomeIcon icon={faBell} /> ارزان شد خبرم کن
                            </button>
                            <button>
                              <FontAwesomeIcon icon={faBolt} /> ارزان شد رزرو کن
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
