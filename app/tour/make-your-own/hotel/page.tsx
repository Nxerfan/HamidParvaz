"use client";
import "../global.css";
import { useState, useMemo } from "react";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faAngleDown,
  faStar,
  faLocationDot,
  faHotel,
  faSliders,
  faFaceSmile,
  faXmark,
  faArrowDownWideShort,
  faArrowUpWideShort,
  faFilter,
  faMagnifyingGlass,
  faBed,
  faUtensils,
  faWifi,
  faDumbbell,
  faSpa,
  faCar,
  faSwimmingPool,
  faMugHot,
  faRotate,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import HeaderMakeYourTour from "../../../components/(Headers)/HeaderMakeYourTour";
import FilterSidebar from "../../../components/(filters)/FilterSidebar";
import FilterAccordion from "../../../components/(filters)/FilterAccordion";
import PriceRangeFilter from "../../../components/(filters)/PriceRangeFilter";
import CheckboxFilter from "../../../components/(filters)/CheckboxFilter";
import Image from "next/image";
import "../../../components/(filters)/FiltersGlobal.css";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const FILTER_ICONS: Record<string, IconDefinition> = {
  breakfast: faMugHot,
  pool: faSwimmingPool,
  parking: faCar,
  wifi: faWifi,
  gym: faDumbbell,
  spa: faSpa,
};

const PAGE_DATA = {
  icons: {
    map: faMap,
    angleDown: faAngleDown,
    star: faStar,
    location: faLocationDot,
    hotel: faHotel,
    sliders: faSliders,
    smile: faFaceSmile,
  } as Record<string, IconDefinition>,
  rightSidebar: {
    headerImage: {
      src: "/istockphoto-1306235331-612x612.jpg",
      alt: "تصویر هتل",
    },
    mapLink: {
      href: "/hotel-on-map",
      text: "مشاهده هتل‌ها روی نقشه",
      icon: "map",
    },
    filterHeader: "فیلترها",
    resultsCount: "نمایش ۵۰ از ۵۰ نتیجه",
    filters: [
      {
        id: "price",
        title: "محدوده قیمت (تومان)",
        type: "range",
        min: 0,
        max: 15000000,
        step: 100000,
        description:
          "محدوده قیمت مدنظر خود را با کشیدن اسلایدر یا وارد کردن عدد انتخاب کنید.",
      },
      {
        id: "stars",
        title: "درجه هتل",
        type: "checkbox",
        description:
          "تعداد ستاره‌های موردنظر را انتخاب کنید تا نتایج فیلتر شوند.",
        options: [
          { value: "5", label: "۵ ستاره" },
          { value: "4", label: "۴ ستاره" },
          { value: "3", label: "۳ ستاره" },
          { value: "2", label: "۲ ستاره" },
          { value: "1", label: "۱ ستاره" },
        ],
      },
      {
        id: "roomType",
        title: "نوع اتاق",
        type: "checkbox",
        description: "نوع اتاق مدنظر خود را انتخاب کنید.",
        options: [
          { value: "single", label: "تک تخته" },
          { value: "double", label: "دو تخته" },
          { value: "triple", label: "سه تخته" },
          { value: "suite", label: "سوئیت" },
        ],
      },
      {
        id: "facilities",
        title: "امکانات رفاهی",
        type: "checkbox",
        description: "امکاناتی که برای اقامت خود لازم دارید را انتخاب کنید.",
        options: [
          { value: "breakfast", label: "صبحانه رایگان" },
          { value: "pool", label: "استخر" },
          { value: "parking", label: "پارکینگ" },
          { value: "wifi", label: "اینترنت رایگان" },
          { value: "gym", label: "سالن بدنسازی" },
          { value: "spa", label: "اسپا و ماساژ" },
        ],
      },
      {
        id: "boarding",
        title: "نوع پذیرایی",
        type: "checkbox",
        description: "نوع پذیرایی موردنظر را انتخاب کنید.",
        options: [
          { value: "bb", label: "صبحانه (B & B)" },
          { value: "hb", label: "صبحانه و شام (Half Board)" },
          { value: "fb", label: "کامل (Full Board)" },
          { value: "allinclusive", label: "آل اینکلوسیو" },
        ],
      },
    ],
  },
  leftContent: {
    header: {
      icon: "hotel",
      text: "هتل مورد نظر خود را انتخاب کنید",
    },
    sorting: {
      countText: "مشهد: 116 اقامتگاه پیدا شد",
      options: [
        { id: "score", label: "امتیاز کاربران", icon: faFaceSmile },
        { id: "stars", label: "ستاره", icon: faStar },
        { id: "price_asc", label: "ارزان‌ترین", icon: faArrowDownWideShort },
        { id: "price_desc", label: "گران‌ترین", icon: faArrowUpWideShort },
      ],
    },
    hotels: [
      {
        id: 1,
        image:
          "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
        name: "هتل پارسیان استقلال",
        stars: 5,
        location: "محله آرارات",
        options: ["ترانسفر رایگان", "صبحانه"],
        score: 6.8,
        price: 9215000,
        roomType: ["single", "double"],
        facilities: ["breakfast", "wifi", "parking", "gym"],
        boarding: "bb",
        priceSection: {
          label: "قیمت 1 شب اتاق 1 تخته",
          value: "9,215,000",
          unit: "تومان",
        },
      },
      {
        id: 2,
        image:
          "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
        name: "هتل درویشی",
        stars: 5,
        location: "بلوار وکیل‌آباد",
        options: ["استخر", "پارکینگ"],
        score: 9.2,
        price: 12500000,
        roomType: ["double", "suite"],
        facilities: ["pool", "parking", "wifi", "spa", "gym"],
        boarding: "hb",
        priceSection: {
          label: "قیمت 1 شب اتاق 2 تخته",
          value: "12,500,000",
          unit: "تومان",
        },
      },
      {
        id: 3,
        image:
          "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
        name: "هتل شایان",
        stars: 4,
        location: "خیابان احمدآباد",
        options: ["صبحانه رایگان"],
        score: 7.5,
        price: 4800000,
        roomType: ["single", "double"],
        facilities: ["breakfast", "wifi"],
        boarding: "bb",
        priceSection: {
          label: "قیمت 1 شب اتاق 1 تخته",
          value: "4,800,000",
          unit: "تومان",
        },
      },
      {
        id: 4,
        image:
          "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
        name: "هتل ارم",
        stars: 3,
        location: "نزدیک حرم",
        options: ["اینترنت رایگان"],
        score: 8.1,
        price: 3200000,
        roomType: ["double", "triple"],
        facilities: ["wifi", "parking"],
        boarding: "bb",
        priceSection: {
          label: "قیمت 1 شب اتاق 2 تخته",
          value: "3,200,000",
          unit: "تومان",
        },
      },
      {
        id: 5,
        image:
          "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
        name: "هتل قصر الضیافة",
        stars: 2,
        location: "خواجه ربیع",
        options: ["پارکینگ"],
        score: 6.4,
        price: 1850000,
        roomType: ["single"],
        facilities: ["parking", "wifi"],
        boarding: "bb",
        priceSection: {
          label: "قیمت 1 شب اتاق 1 تخته",
          value: "1,850,000",
          unit: "تومان",
        },
      },
    ],
    chooseButtonText: "انتخاب اتاق",
  },
  labels: {
    fromLabel: "از",
    toLabel: "تا",
    currency: "تومان",
    starSuffix: "ستاره",
    selectRoom: "انتخاب اتاق",
  },
};

export default function HotelList() {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    price: true,
  });
  const [activeSort, setActiveSort] = useState<string | null>("score");
  const [showHotelList, setShowHotelList] = useState(false);
  interface HotelOption {
    id: number;
    image: string;
    name: string;
    stars: number;
    location: string;
    options: string[];
    score: number;
    price: number;
    roomType: string[];
    facilities: string[];
    boarding: string;
    priceSection: { label: string; value: string; unit: string };
  }

  const [selectedHotel, setSelectedHotel] = useState<HotelOption | null>(null);
  const [isAutoSelecting, setIsAutoSelecting] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const min3StarHotels = PAGE_DATA.leftContent.hotels.filter(hotel => hotel.stars >= 3);
      if (min3StarHotels.length > 0) {
        const cheapestHotel = min3StarHotels.sort((a, b) => a.price - b.price)[0];
        setSelectedHotel(cheapestHotel);
        setShowHotelList(false);
        setIsAutoSelecting(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const priceFilter = PAGE_DATA.rightSidebar.filters.find(
    (f) => f.id === "price",
  )!;

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: priceFilter.min ?? 0,
    max: priceFilter.max ?? 0,
  });

  const [checkedOptions, setCheckedOptions] = useState<
    Record<string, string[]>
  >({});

  const toPersianNumber = (num: number | string) => {
    return Number(num).toLocaleString("fa-IR");
  };

  const handleToggleFilter = (id: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const step = priceFilter.step ?? 50000;
    if (type === "min") {
      setPriceRange((prev) => ({
        ...prev,
        min: Math.min(value, prev.max - step),
      }));
    } else {
      setPriceRange((prev) => ({
        ...prev,
        max: Math.max(value, prev.min + step),
      }));
    }
  };

  const handleCheckboxChange = (filterId: string, value: string) => {
    setCheckedOptions((prev) => {
      const current = prev[filterId] || [];
      const setForFilter = new Set(current);
      if (setForFilter.has(value)) {
        setForFilter.delete(value);
      } else {
        setForFilter.add(value);
      }
      return { ...prev, [filterId]: Array.from(setForFilter) };
    });
  };

  const pfMin = priceFilter.min ?? 0;
  const pfMax = priceFilter.max ?? 0;

  const clearAllFilters = () => {
    setPriceRange({ min: pfMin, max: pfMax });
    setCheckedOptions({});
  };

  // شمارش تعداد فیلترهای فعال
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (priceRange.min > pfMin || priceRange.max < pfMax)
      count++;
    Object.values(checkedOptions).forEach((arr) => {
      if (arr.length > 0) count++;
    });
    return count;
  }, [priceRange, checkedOptions, priceFilter]);

  // فیلترینگ واقعی هتل‌ها
  const filteredHotels = useMemo(() => {
    return PAGE_DATA.leftContent.hotels.filter((hotel) => {
      // فیلتر قیمت
      if (hotel.price < priceRange.min || hotel.price > priceRange.max)
        return false;

      // فیلتر ستاره
      const selectedStars = checkedOptions.stars || [];
      if (
        selectedStars.length > 0 &&
        !selectedStars.includes(String(hotel.stars))
      )
        return false;

      // فیلتر نوع اتاق
      const selectedRoomTypes = checkedOptions.roomType || [];
      if (selectedRoomTypes.length > 0) {
        const hasMatch = selectedRoomTypes.some((rt) =>
          hotel.roomType?.includes(rt),
        );
        if (!hasMatch) return false;
      }

      // فیلتر امکانات رفاهی
      const selectedFacilities = checkedOptions.facilities || [];
      if (selectedFacilities.length > 0) {
        const hasAll = selectedFacilities.every((f) =>
          hotel.facilities?.includes(f),
        );
        if (!hasAll) return false;
      }

      // فیلتر نوع پذیرایی
      const selectedBoarding = checkedOptions.boarding || [];
      if (
        selectedBoarding.length > 0 &&
        !selectedBoarding.includes(hotel.boarding)
      )
        return false;

      return true;
    });
  }, [priceRange, checkedOptions]);

  // مرتب‌سازی واقعی هتل‌ها
  const sortedHotels = useMemo(() => {
    const hotels = [...filteredHotels];
    switch (activeSort) {
      case "score":
        return hotels.sort((a, b) => b.score - a.score);
      case "stars":
        return hotels.sort((a, b) => b.stars - a.stars);
      case "price_asc":
        return hotels.sort((a, b) => a.price - b.price);
      case "price_desc":
        return hotels.sort((a, b) => b.price - a.price);
      default:
        return hotels;
    }
  }, [filteredHotels, activeSort]);

  const getProgressPercent = () => {
    const minPercent =
      ((priceRange.min - pfMin) /
        (pfMax - pfMin)) *
      100;
    const maxPercent =
      ((priceRange.max - pfMin) /
        (pfMax - pfMin)) *
      100;
    return { minPercent, maxPercent };
  };

  const AutoSelectingUI = () => (
    <div className="AutoSelectingCard">
      <div className="AutoSelectingPlane">
        <div className="PlaneTrack">
          <FontAwesomeIcon icon={faHotel} className="HotelBounceIcon" />
        </div>
      </div>
      <div className="AutoSelectingContent">
        <h3>در حال انتخاب بهترین هتل برای شما</h3>
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
        <span>بهترین هتل با توجه به امتیاز، امکانات و قیمت برای شما انتخاب می‌شود</span>
      </div>
    </div>
  );

  return (
    <>
      <HeaderMakeYourTour currentStep={1} />
      <div className="Countainer hotel-list-page">
        {/* ============ سایدبار راست (فیلترها) ============ */}
        <div className="Right">
          <div className="Title">
            <div style={{ position: "relative", width: "100%", height: "200px" }}>
              <Image
                src={PAGE_DATA.rightSidebar.headerImage.src}
                alt={PAGE_DATA.rightSidebar.headerImage.alt}
                fill
                sizes="100vw"
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="TitleOverlay">
              <div className="TitleInfo">
                <FontAwesomeIcon icon={faHotel} />
                <span>اقامتگاه‌های مشهد</span>
              </div>
              <Link
                href={PAGE_DATA.rightSidebar.mapLink.href}
                className="MapLinkBtn"
              >
                <FontAwesomeIcon icon={faMap} />
                <span>{PAGE_DATA.rightSidebar.mapLink.text}</span>
              </Link>
            </div>
          </div>

          <FilterSidebar
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearAllFilters}
            resultCount={`${toPersianNumber(sortedHotels.length)} هتل از ${toPersianNumber(PAGE_DATA.leftContent.hotels.length)} نتیجه`}
          >
            {PAGE_DATA.rightSidebar.filters.map((filter) => {
              const isOpen = openFilters[filter.id];
              const hasValue =
                filter.id === "price"
                  ? priceRange.min > pfMin ||
                    priceRange.max < pfMax
                  : (checkedOptions[filter.id] || []).length > 0;

              const getSelectedSummary = () => {
                if (filter.id === "price") {
                  return `${toPersianNumber(priceRange.min)} تا ${toPersianNumber(priceRange.max)} ${PAGE_DATA.labels.currency}`;
                }
                const selected = checkedOptions[filter.id] || [];
                if (selected.length === 0) return "";
                return selected
                  .map((v) => {
                    const opt = filter.options?.find((o) => o.value === v);
                    return opt ? opt.label : v;
                  })
                  .join("، ");
              };

              return (
                <FilterAccordion
                  key={filter.id}
                  title={filter.title}
                  isOpen={isOpen}
                  onToggle={() => handleToggleFilter(filter.id)}
                  hasActive={hasValue}
                  activeCount={filter.id !== "price" ? (checkedOptions[filter.id] || []).length : undefined}
                  description={filter.description}
                  selectedSummary={getSelectedSummary()}
                >
                  {filter.type === "range" && (
                    <PriceRangeFilter
                      min={priceRange.min}
                      max={priceRange.max}
                      globalMin={pfMin}
                      globalMax={pfMax}
                      step={priceFilter.step ?? 0}
                      onMinChange={(val) => handlePriceChange("min", val)}
                      onMaxChange={(val) => handlePriceChange("max", val)}
                      formatPrice={toPersianNumber}
                      currency={PAGE_DATA.labels.currency}
                      fromLabel={PAGE_DATA.labels.fromLabel}
                      toLabel={PAGE_DATA.labels.toLabel}
                    />
                  )}

                  {filter.type === "checkbox" && (
                    <CheckboxFilter
                      options={filter.options!.map(opt => ({
                        value: opt.value,
                        label: opt.label,
                        icon: FILTER_ICONS[opt.value],
                      }))}
                      selectedValues={checkedOptions[filter.id] || []}
                      onChange={(val) => handleCheckboxChange(filter.id, val)}
                      showCount
                    />
                  )}
                </FilterAccordion>
              );
            })}
          </FilterSidebar>
        </div>

        {/* ============ محتوای چپ (هتل‌ها) ============ */}
        <div className="Left">
          <div className="flightTopBar">
            <div className="topRight">
              <div className="headerIcon">
                <FontAwesomeIcon
                  icon={PAGE_DATA.icons[PAGE_DATA.leftContent.header.icon]}
                />
              </div>
              <div>
                <p style={{ margin: 0 }}>{PAGE_DATA.leftContent.header.text}</p>
                <span className="sortCount" style={{ fontSize: 13, fontWeight: 500 }}>
                  {toPersianNumber(sortedHotels.length)} اقامتگاه یافت شد
                </span>
              </div>
            </div>
            {!isAutoSelecting && (
              <div className="sortingBar">
                <div className="sortOptions">
                  {PAGE_DATA.leftContent.sorting.options.map((opt) => (
                    <button
                      key={opt.id}
                      className={`sortBtn ${activeSort === opt.id ? "active" : ""}`}
                      onClick={() => setActiveSort(opt.id)}
                    >
                      <FontAwesomeIcon icon={opt.icon} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isAutoSelecting ? <AutoSelectingUI /> : null}

          {!isAutoSelecting && showHotelList ? (
            sortedHotels.length > 0 ? (
              sortedHotels.map((hotel) => (
                <div key={hotel.id} className="MediaElementHotel">
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                    <Image src={hotel.image} alt={hotel.name} fill sizes="(max-width: 768px) 100vw, 400px" unoptimized style={{ objectFit: "cover" }} />
                  </div>
                  <div className="Down">
                    <p>{hotel.name}</p>
                    <div className="rating">
                      <div className="Stars">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={PAGE_DATA.icons.star}
                            style={{ color: "#ffcd11" }}
                          />
                        ))}
                        <span>
                          {toPersianNumber(hotel.stars)}
                          {PAGE_DATA.labels.starSuffix}
                        </span>
                        <p>
                          <FontAwesomeIcon icon={PAGE_DATA.icons.location} />{" "}
                          {hotel.location}
                        </p>
                      </div>
                      <div className="AdditionalOptions">
                        {hotel.options.map((opt, i) => (
                          <span key={i}>{opt}</span>
                        ))}
                      </div>
                      <div className="SmilyFace">
                        <p>
                          {hotel.score}{" "}
                          <FontAwesomeIcon icon={PAGE_DATA.icons.smile} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="titel">
                      <p>{hotel.priceSection.label}</p>
                    </div>
                    <div className="Choose">
                      <p>
                        <span>{hotel.priceSection.value}</span>
                        {hotel.priceSection.unit}
                      </p>
                      <button
                        className="SelectHotelBtn"
                        onClick={() => {
                          setSelectedHotel(hotel);
                          setShowHotelList(false);
                        }}
                      >
                        انتخاب هتل
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="EmptyState">
                <div className="EmptyIcon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <h3>هیچ هتلی با این فیلترها یافت نشد</h3>
                <p>لطفاً فیلترهای خود را تغییر دهید یا آنها را پاک کنید</p>
                <button className="EmptyResetBtn" onClick={clearAllFilters}>
                  <FontAwesomeIcon icon={faRotate} />
                  پاک کردن همه فیلترها
                </button>
              </div>
            )
          ) : null}
          {!isAutoSelecting && !showHotelList && selectedHotel ? (
            <div className="SelectedHotelCard">
              <div className="SelectedHotelHeader">
                <h3>هتل انتخاب شده شما</h3>
                <button className="ChangeSelectionBtn" onClick={() => setShowHotelList(true)}>
                  <FontAwesomeIcon icon={faRotate} /> تغییر هتل
                </button>
              </div>
              <div className="SelectedHotelContent">
                <div className="SelectedHotelImage" style={{ position: "relative" }}>
                  <Image src={selectedHotel.image} alt={selectedHotel.name} fill sizes="160px" unoptimized style={{ objectFit: "cover", borderRadius: "12px" }} />
                </div>
                <div className="SelectedHotelInfo">
                  <div className="SelectedHotelNameStars">
                    <h4>{selectedHotel.name}</h4>
                    <div className="SelectedHotelStars">
                      {[...Array(selectedHotel.stars)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={PAGE_DATA.icons.star}
                          style={{ color: "#ffcd11" }}
                        />
                      ))}
                      <span>{toPersianNumber(selectedHotel.stars)} ستاره</span>
                    </div>
                  </div>
                  <div className="SelectedHotelLocation">
                    <FontAwesomeIcon icon={PAGE_DATA.icons.location} />
                    <span>{selectedHotel.location}</span>
                  </div>
                  <div className="SelectedHotelOptions">
                    {selectedHotel.options.map((opt, i) => (
                      <span key={i}>{opt}</span>
                    ))}
                  </div>
                  <div className="SelectedHotelRating">
                    <FontAwesomeIcon icon={PAGE_DATA.icons.smile} />
                    <span>{selectedHotel.score}</span>
                  </div>
                </div>
                <div className="SelectedHotelPrice">
                  <p>{selectedHotel.priceSection.label}</p>
                  <div>
                    <span>{selectedHotel.priceSection.value}</span>
                    {selectedHotel.priceSection.unit}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {selectedHotel && (
            <Link href="/tour/make-your-own/hotel/room">
              <button className="ContinueBtn">
                ادامه و انتخاب اتاق
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}