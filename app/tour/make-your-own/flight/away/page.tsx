"use client";
import "../../global.css";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlane,
  faBell,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot, faClock } from "@fortawesome/free-solid-svg-icons";
import HeaderMakeYourTour from "../../../../components/(Headers)/HeaderMakeYourTour";

const PAGE_DATA = {
  sidebar: {
    header: "فیلترها",
    resultsCount: "نمایش ۵۰ از ۵۰ نتیجه",
    filters: [
      {
        id: "price",
        title: "قیمت",
        type: "range",
        min: 0,
        max: 1000000,
        unit: "تومان",
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
            title: "زمان حرکت از تهران",
            options: [
              { value: "0-8", label: "۰۰:۰۰ تا ۰۸:۰۰" },
              { value: "8-18", label: "۰۸:۰۰ تا ۱۸:۰۰" },
              { value: "18-24", label: "۱۸:۰۰ تا ۰۰:۰۰" },
            ],
          },
          {
            title: "زمان رسیدن به کیش",
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
          { value: "fly-kish", label: "فلای کیش" },
          { value: "fly-persia", label: "فلای پرشیا" },
          { value: "ava-air", label: "آوا ایر" },
          { value: "erwan", label: "اروان" },
          { value: "mehr", label: "مهر" },
          { value: "caspian", label: "کاسپین" },
          { value: "meraj", label: "معراج" },
          { value: "kish-air", label: "کیش ایر" },
          { value: "aseman", label: "آسمان" },
          { value: "qeshm-air", label: "قشم ایر" },
          { value: "zagros", label: "زاگرس" },
          { value: "ata", label: "آتا" },
          { value: "atlas", label: "اطلس اير" },
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
          { value: "none", label: "بدون بار رایگان" },
        ],
      },
      {
        id: "tags",
        title: "برچسب‌ها",
        type: "checkbox",
        options: [
          { value: "foreign-restriction", label: "محدودیت خرید اتباع" },
        ],
      },
    ],
  },
  mainContent: {
    header: {
      icon: faPlane,
      text: "پرواز رفت خود را انتخاب کنید",
    },
    sorting: {
      baseText: "پرواز رفت و برگشت تهران به مشهد",
      options: ["مدت زمان پرواز", "زمان پرواز", "قیمت", "تعداد توقف ها"],
    },
    flights: [
      {
        id: 1,
        airline: {
          name: "چابهار",
          logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
        },
        departure: { time: "6:00", city: "تهران" },
        arrival: { time: "7:00", city: "مشهد" },
        classType: "اکونومی",
        seatsLeft: "6 صندلی",
        price: "1,802,400",
        details: {
          date: "سه‌شنبه 2 دی ← چهارشنبه 3 دی",
          classCode: "Y",
          originAirport: "تهران، فرودگاه مهرآباد (THR) - ترمینال 1",
          destinationAirport: "کیش، فرودگاه کیش (KIH)",
          totalPrice: "3,161,600",
        },
      },
      {
        id: 2,
        airline: {
          name: "فلای کیش",
          logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
        },
        departure: { time: "10:30", city: "تهران" },
        arrival: { time: "12:00", city: "مشهد" },
        classType: "بیزنس",
        seatsLeft: "2 صندلی",
        price: "2,500,000",
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
        departure: { time: "14:15", city: "تهران" },
        arrival: { time: "15:45", city: "مشهد" },
        classType: "اکونومی",
        seatsLeft: "15 صندلی",
        price: "1,650,000",
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

export default function FlightSelection() {
  const [openFilter, setOpenFilter] = useState(null);
  const [activeSort, setActiveSort] = useState(null);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [priceRange, setPriceRange] = useState({
    min: PAGE_DATA.sidebar.filters[0].min,
    max: PAGE_DATA.sidebar.filters[0].max,
  });

  const handleToggleFilter = (id) => {
    setOpenFilter(openFilter === id ? null : id);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };

  const toPersianNumber = (num) => {
    return num.toLocaleString("fa-IR");
  };

  const renderFilterContent = (filter) => {
    if (filter.type === "range") {
      return (
        <div className="dropdownPanel">
          <div className="priceSliderBox">
            <div className="priceLabels">
              <div className="labelGroup">
                <span>از</span>
                <span className="displayMin">
                  {toPersianNumber(priceRange.min)}
                </span>
                <span>{filter.unit}</span>
              </div>
              <span className="labelSeparator">-</span>
              <div className="labelGroup">
                <span>تا</span>
                <span className="displayMax">
                  {toPersianNumber(priceRange.max)}
                </span>
                <span>{filter.unit}</span>
              </div>
            </div>
            <div className="rangeSliderContainer">
              <div className="sliderTrack"></div>
              <div className="sliderProgress"></div>
              <div className="rangeInputs">
                <input
                  type="range"
                  className="rangeMin"
                  min={filter.min}
                  max={filter.max}
                  value={priceRange.min}
                  step="1000"
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                />
                <input
                  type="range"
                  className="rangeMax"
                  min={filter.min}
                  max={filter.max}
                  value={priceRange.max}
                  step="1000"
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
        <div className="dropdownPanel">
          <div className="checkboxGroup">
            {filter.options.map((opt) => (
              <label key={opt.value} className="checkboxItem">
                <input type="checkbox" name={filter.id} value={opt.value} />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (filter.type === "grouped") {
      return (
        <div className="dropdownPanel">
          {filter.groups.map((group, index) => (
            <div key={index}>
              <div
                className="timeSubSection"
                style={index > 0 ? { paddingTop: "10px" } : {}}
              >
                {index > 0 && <hr className="filterDivider" />}
                <span className="subTitle">{group.title}</span>
                <div className="checkboxGroup">
                  {group.options.map((opt) => (
                    <label key={opt.value} className="checkboxItem">
                      <input
                        type="checkbox"
                        name={group.title}
                        value={opt.value}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const flightCount = PAGE_DATA.mainContent.flights.length;

  return (
    <>
      <HeaderMakeYourTour currentStep={3} />

      <div className="Countainer">
        <div className="Right">
          <div className="sidebarFilters">
            <div className="filterHeader">
              <span>{PAGE_DATA.sidebar.header}</span>
            </div>

            <div className="filterContentArea">
              <span className="resultsCount">
                {PAGE_DATA.sidebar.resultsCount}
              </span>

              {PAGE_DATA.sidebar.filters.map((filter) => (
                <div key={filter.id} className="filterDropdown">
                  <div
                    className={`dropdownTrigger ${openFilter === filter.id ? "open" : ""}`}
                    onClick={() => handleToggleFilter(filter.id)}
                  >
                    <span>{filter.title}</span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{
                        transition: "transform 0.3s",
                        transform:
                          openFilter === filter.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  </div>
                  {openFilter === filter.id && renderFilterContent(filter)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Left">
          <div className="Titel">
            <FontAwesomeIcon icon={PAGE_DATA.mainContent.header.icon} />
            <p>{PAGE_DATA.mainContent.header.text}</p>
          </div>

          <div className="Sorting">
            <p>
              {PAGE_DATA.mainContent.sorting.baseText} : ({flightCount} مورد)
            </p>
            <div className="Card">
              {PAGE_DATA.mainContent.sorting.options.map((opt, index) => (
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

          <div className="Bottom">
            {PAGE_DATA.mainContent.flights.map((flight) => (
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
                        <FontAwesomeIcon icon={faPlane} flip="horizontal" />
                      </div>
                      <div className="Form">
                        <span>{flight.arrival.time}</span>
                        <p>{flight.arrival.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="discriptions">
                    <div
                      className="More"
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
                      <span>{flight.classType}</span>
                      <p>{flight.seatsLeft}</p>
                    </div>
                  </div>
                </div>

                <div className="LeftCard">
                  <div className="Bottom">
                    <p>
                      <span>{flight.price}</span> تومان
                    </p>
                    <Link href="/MakeYourTour(4)" passHref>
                      <button className="BtnPrimary">انتخاب بلیط رفت</button>
                    </Link>
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
                          <p>{flight.details.originAirport}</p>
                          <span>هواپیمای شما</span>
                          <p>{flight.details.destinationAirport}</p>
                        </div>
                      </div>
                    </div>
                    <div className="orw">
                      <div className="top">
                        <p>
                          بزرگسال × 1{" "}
                          <span>{flight.details.totalPrice} تومانء</span>
                        </p>
                        <p>
                          مجموع <span>{flight.details.totalPrice} تومانء</span>
                        </p>
                      </div>
                      <div className="bottom">
                        <button>
                          <FontAwesomeIcon icon={faBell} />
                          ارزان شد خبرم کن
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faBolt} /> ارزان شد رزرو کن
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
