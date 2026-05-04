"use client";
import "../global.css";
import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import HeaderMakeYourTour from "../../../components/(Headers)/HeaderMakeYourTour";
const PAGE_DATA = {
  icons: {
    map: faMap,
    angleDown: faAngleDown,
    star: faStar,
    location: faLocationDot,
    hotel: faHotel,
    sliders: faSliders,
    smile: faFaceSmile,
  },
  rightSidebar: {
    headerImage: {
      src: "/Media/istockphoto-1306235331-612x612.jpg",
      alt: "تصویر هتل",
    },
    mapLink: {
      href: "/hotelOnMap",
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
        max: 10000000,
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
          { value: "bb", label: "صبحانه (B&B)" },
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
      options: ["امتیاز کاربران", "ستاره", "قیمت"],
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
        score: "6.8/10",
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
        score: "9.2/10",
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
        score: "7.5/10",
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
        score: "8.1/10",
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
        score: "6.4/10",
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
  const [openFilters, setOpenFilters] = useState({});
  const [activeSort, setActiveSort] = useState(null);
  const priceFilter = PAGE_DATA.rightSidebar.filters.find(
    (f) => f.id === "price",
  );
  const [priceRange, setPriceRange] = useState({
    min: priceFilter.min,
    max: priceFilter.max,
  });
  const [checkedOptions, setCheckedOptions] = useState({});

  const toPersianNumber = (num) => {
    return Number(num).toLocaleString("fa-IR");
  };

  const handleToggleFilter = (id) => {
    setOpenFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePriceChange = (type, value) => {
    const val = Number(value);
    if (type === "min") {
      setPriceRange((prev) => ({ ...prev, min: Math.min(val, prev.max) }));
    } else {
      setPriceRange((prev) => ({ ...prev, max: Math.max(val, prev.min) }));
    }
  };

  const handleNumberInput = (type, e) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!raw) return;
    const val = Number(raw);
    if (isNaN(val)) return;
    handlePriceChange(type, val);
    const getProgressPercent = () => {
      const minPercent =
        ((priceRange.min - priceFilter.min) /
          (priceFilter.max - priceFilter.min)) *
        100;

      const maxPercent =
        ((priceRange.max - priceFilter.min) /
          (priceFilter.max - priceFilter.min)) *
        100;

      return { minPercent, maxPercent };
    };
  };

  const handleCheckboxChange = (filterId, value) => {
    setCheckedOptions((prev) => {
      const setForFilter = new Set(prev[filterId] || []);
      if (setForFilter.has(value)) {
        setForFilter.delete(value);
      } else {
        setForFilter.add(value);
      }
      return { ...prev, [filterId]: Array.from(setForFilter) };
    });
  };

  return (
    <>
      <HeaderMakeYourTour currentStep={1} />
      <div className="Countainer">
        <div className="Right">
          <div className="Title">
            <img
              src={PAGE_DATA.rightSidebar.headerImage.src}
              alt={PAGE_DATA.rightSidebar.headerImage.alt}
              className="cover"
            />
            <Link href={PAGE_DATA.rightSidebar.mapLink.href}>
              <span>
                <FontAwesomeIcon
                  icon={PAGE_DATA.icons[PAGE_DATA.rightSidebar.mapLink.icon]}
                />{" "}
                {PAGE_DATA.rightSidebar.mapLink.text}
              </span>
            </Link>
          </div>

          <div className="sidebarFilters">
            <div className="filterHeader">
              <FontAwesomeIcon
                icon={PAGE_DATA.icons.sliders}
                style={{ marginLeft: "10px" }}
              />
              <span>{PAGE_DATA.rightSidebar.filterHeader}</span>
            </div>

            <div className="filterContentArea">
              <span className="resultsCount">
                {PAGE_DATA.rightSidebar.resultsCount}
              </span>

              {PAGE_DATA.rightSidebar.filters.map((filter) => (
                <div key={filter.id} className="filterDropdown">
                  <div
                    className={`dropdownTrigger ${openFilters[filter.id] ? "open" : ""}`}
                    onClick={() => handleToggleFilter(filter.id)}
                  >
                    <span>{filter.title}</span>
                    <FontAwesomeIcon
                      icon={PAGE_DATA.icons.angleDown}
                      style={{
                        transition: "transform 0.3s",
                        transform: openFilters[filter.id]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>

                  {openFilters[filter.id] && (
                    <div className="dropdownPanel">
                      <div className="filterDescription">
                        <p>{filter.description}</p>
                      </div>

                      {filter.type === "range" && (
                        <div className="priceSliderBox">
                          <div className="priceLabels">
                            <div className="labelGroup">
                              <span>{PAGE_DATA.labels.fromLabel}</span>
                              <span className="displayMin">
                                {toPersianNumber(priceRange.min)}
                              </span>
                              <span>{PAGE_DATA.labels.currency}</span>
                            </div>
                            <span className="labelSeparator">-</span>
                            <div className="labelGroup">
                              <span>{PAGE_DATA.labels.toLabel}</span>
                              <span className="displayMax">
                                {toPersianNumber(priceRange.max)}
                              </span>
                              <span>{PAGE_DATA.labels.currency}</span>
                            </div>
                          </div>

                          <div className="rangeSliderContainer">
                            <div className="sliderTrack"></div>

                            <div
                              className="sliderProgress"
                              style={{
                                left: `${
                                  ((priceRange.min - priceFilter.min) /
                                    (priceFilter.max - priceFilter.min)) *
                                  100
                                }%`,
                                right: `${
                                  100 -
                                  ((priceRange.max - priceFilter.min) /
                                    (priceFilter.max - priceFilter.min)) *
                                    100
                                }%`,
                              }}
                            ></div>

                            <div className="rangeInputs">
                              <input
                                type="range"
                                min={priceFilter.min}
                                max={priceFilter.max}
                                step={priceFilter.step}
                                value={priceRange.min}
                                onChange={(e) =>
                                  handlePriceChange(
                                    "min",
                                    Math.min(
                                      Number(e.target.value),
                                      priceRange.max - priceFilter.step,
                                    ),
                                  )
                                }
                              />

                              <input
                                type="range"
                                min={priceFilter.min}
                                max={priceFilter.max}
                                step={priceFilter.step}
                                value={priceRange.max}
                                onChange={(e) =>
                                  handlePriceChange(
                                    "max",
                                    Math.max(
                                      Number(e.target.value),
                                      priceRange.min + priceFilter.step,
                                    ),
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {filter.type === "checkbox" && (
                        <div className="checkboxGroup">
                          <div className="checkboxInfo">
                            <p>{filter.options.length} گزینه موجود</p>
                          </div>
                          {filter.options.map((opt) => (
                            <label key={opt.value} className="checkboxItem">
                              <input
                                type="checkbox"
                                name={filter.id}
                                value={opt.value}
                                checked={(
                                  checkedOptions[filter.id] || []
                                ).includes(opt.value)}
                                onChange={() =>
                                  handleCheckboxChange(filter.id, opt.value)
                                }
                              />
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Left">
          <div className="Titel">
            <FontAwesomeIcon
              icon={PAGE_DATA.icons[PAGE_DATA.leftContent.header.icon]}
            />
            <p>{PAGE_DATA.leftContent.header.text}</p>
          </div>

          <div className="Sorting">
            <p>{PAGE_DATA.leftContent.sorting.countText}</p>
            <div className="Card">
              {PAGE_DATA.leftContent.sorting.options.map((opt, index) => (
                <p
                  key={index}
                  className={activeSort === index ? "active" : ""}
                  onClick={() => setActiveSort(index)}
                >
                  {opt}
                </p>
              ))}
            </div>
          </div>

          {PAGE_DATA.leftContent.hotels.map((hotel) => (
            <div key={hotel.id} className="MediaElementHotel">
              <img src={hotel.image} alt={hotel.name} />
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
                  <Link href={`/hotel/${hotel.id}`}>
                    <button>{PAGE_DATA.leftContent.chooseButtonText}</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
