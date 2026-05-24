"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faPlane,
  faClock,
  faAngleDown,
  faBell,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/(Headers)/SecondHeader";
import Form from "../../components/(Forms)/FormType3";
import "./globals.css";

interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  price: number;
  flightClass: "economy" | "business";
  baggage: string;
  departureHour: number;
  arrivalHour: number;
  seats: number;
  tags: string[];
  classRate: string;
}


const flightsData: Flight[] = [
  {
    id: 1,
    airline: "چابهار",
    airlineCode: "IRU",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
    departureTime: "06:00",
    arrivalTime: "07:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1802400,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 6,
    arrivalHour: 7,
    seats: 6,
    tags: [],
    classRate: "Y",
  },
  {
    id: 2,
    airline: "فلای کیش",
    airlineCode: "KIS",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=KIS",
    departureTime: "09:30",
    arrivalTime: "10:45",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2100000,
    flightClass: "economy",
    baggage: "25kg",
    departureHour: 9,
    arrivalHour: 10,
    seats: 12,
    tags: [],
    classRate: "M",
  },
  {
    id: 3,
    airline: "کیش ایر",
    airlineCode: "KIA",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=KIA",
    departureTime: "14:15",
    arrivalTime: "15:30",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1950000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 14,
    arrivalHour: 15,
    seats: 8,
    tags: [],
    classRate: "Y",
  },
  {
    id: 4,
    airline: "آتا",
    airlineCode: "ATA",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ATA",
    departureTime: "20:45",
    arrivalTime: "22:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2500000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 20,
    arrivalHour: 22,
    seats: 4,
    tags: [],
    classRate: "C",
  },
  {
    id: 5,
    airline: "آسمان",
    airlineCode: "ASM",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ASM",
    departureTime: "07:20",
    arrivalTime: "08:35",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1680000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 7,
    arrivalHour: 8,
    seats: 10,
    tags: ["foreign-restriction"],
    classRate: "Y",
  },
  {
    id: 6,
    airline: "قشم ایر",
    airlineCode: "QES",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=QES",
    departureTime: "12:00",
    arrivalTime: "13:15",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2200000,
    flightClass: "economy",
    baggage: "25kg",
    departureHour: 12,
    arrivalHour: 13,
    seats: 7,
    tags: [],
    classRate: "M",
  },
  {
    id: 7,
    airline: "معراج",
    airlineCode: "MRJ",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=MRJ",
    departureTime: "16:30",
    arrivalTime: "17:45",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2300000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 16,
    arrivalHour: 17,
    seats: 5,
    tags: [],
    classRate: "C",
  },
  {
    id: 8,
    airline: "زاگرس",
    airlineCode: "ZAG",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ZAG",
    departureTime: "22:10",
    arrivalTime: "23:25",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1450000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 22,
    arrivalHour: 23,
    seats: 9,
    tags: [],
    classRate: "Y",
  },
  {
    id: 9,
    airline: "مهر",
    airlineCode: "MEH",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=MEH",
    departureTime: "05:00",
    arrivalTime: "06:15",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 2900000,
    flightClass: "business",
    baggage: "30kg",
    departureHour: 5,
    arrivalHour: 6,
    seats: 2,
    tags: [],
    classRate: "J",
  },
  {
    id: 10,
    airline: "اطلس ایر",
    airlineCode: "ATL",
    logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ATL",
    departureTime: "11:45",
    arrivalTime: "13:00",
    origin: "تهران",
    originCode: "THR",
    destination: "کیش",
    destinationCode: "KIH",
    price: 1980000,
    flightClass: "economy",
    baggage: "20kg",
    departureHour: 11,
    arrivalHour: 13,
    seats: 11,
    tags: [],
    classRate: "Y",
  },
];

const allAirlines = Array.from(new Set(flightsData.map((f) => f.airline))).sort();
const allBaggageOptions = Array.from(new Set(flightsData.map((f) => f.baggage))).sort();

export default function FlightResultsPage() {
  // Filters state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const globalMin = 0;
  const globalMax = 3000000;

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedDepTimes, setSelectedDepTimes] = useState<string[]>([]);
  const [selectedArrTimes, setSelectedArrTimes] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"time" | "price" | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeDetailId, setActiveDetailId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [expandSeeMore, setExpandSeeMore] = useState(false);

  // Filter & sort logic
  const filteredFlights = flightsData
    .filter((flight) => {
      if (flight.price < minPrice || flight.price > maxPrice) return false;
      if (selectedClasses.length && !selectedClasses.includes(flight.flightClass)) return false;
      if (selectedDepTimes.length) {
        let match = false;
        for (const range of selectedDepTimes) {
          if (range === "0-8" && flight.departureHour >= 0 && flight.departureHour < 8) match = true;
          if (range === "8-18" && flight.departureHour >= 8 && flight.departureHour < 18) match = true;
          if (range === "18-24" && flight.departureHour >= 18 && flight.departureHour <= 24) match = true;
        }
        if (!match) return false;
      }
      if (selectedArrTimes.length) {
        let match = false;
        for (const range of selectedArrTimes) {
          if (range === "0-8" && flight.arrivalHour >= 0 && flight.arrivalHour < 8) match = true;
          if (range === "8-18" && flight.arrivalHour >= 8 && flight.arrivalHour < 18) match = true;
          if (range === "18-24" && flight.arrivalHour >= 18 && flight.arrivalHour <= 24) match = true;
        }
        if (!match) return false;
      }
      if (selectedAirlines.length && !selectedAirlines.includes(flight.airline)) return false;
      if (selectedBaggage.length && !selectedBaggage.includes(flight.baggage)) return false;
      if (selectedTags.length) {
        let hasTag = false;
        for (const tag of selectedTags) {
          if (flight.tags.includes(tag)) hasTag = true;
        }
        if (!hasTag) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "time") return a.departureHour - b.departureHour;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  // Handlers
  const toggleDropdown = (name: string) => setOpenDropdown((prev) => (prev === name ? null : name));
  const handleClassChange = (val: string) =>
    setSelectedClasses((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleDepTimeChange = (val: string) =>
    setSelectedDepTimes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleArrTimeChange = (val: string) =>
    setSelectedArrTimes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleAirlineChange = (val: string) =>
    setSelectedAirlines((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleBaggageChange = (val: string) =>
    setSelectedBaggage((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleTagChange = (val: string) =>
    setSelectedTags((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= maxPrice) setMinPrice(val);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= minPrice) setMaxPrice(val);
  };

  // Price slider progress bar
  const minPercent = ((minPrice - globalMin) / (globalMax - globalMin)) * 100;
  const maxPercent = ((maxPrice - globalMin) / (globalMax - globalMin)) * 100;
  const progressLeft = minPercent;
  const progressWidth = maxPercent - minPercent;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filterDropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Mock cheap days
  const cheapDays = Array(14).fill({ day: "سه‌شنبه 10/2", price: "1,082,000" });

  return (
    <>
      <Header />
      <main className="flight-results-page">
        <Form initialMode="flight" />

        <section>
          <div className="Countainer">

            <div className="Right">
              <div className="Title">
                <span>بلیط هواپیما تهران به کیش</span>
              </div>

              <div className="NotifMe">
                <div className="Bell">
                  <FontAwesomeIcon icon={faBell} />
                  <span>ارزان شد خبرم کن</span>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="Sort">
                <span>مرتب‌سازی بر اساس</span>
                <div className="Choosen">
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => setSortBy("time")}
                      checked={sortBy === "time"}
                    />
                    زود‌ترین زمان
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => setSortBy("price")}
                      checked={sortBy === "price"}
                    />
                    کمترین قیمت
                  </label>
                </div>
              </div>

              <div className="sidebarFilters">
                <div className="filterHeader">
                  <span>فیلترها</span>
                </div>
                <div className="filterContentArea">
                  <span className="resultsCount">
                    نمایش {filteredFlights.length} از {flightsData.length} نتیجه
                  </span>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("price")}>
                      <span>قیمت</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "price" && (
                      <div className="dropdownPanel open">
                        <div className="priceSliderBox">
                          <div className="priceLabels">
                            <div className="labelGroup">
                              <span>از</span>
                              <span className="displayMin">{minPrice.toLocaleString("fa-IR")}</span>
                              <span>تومان</span>
                            </div>
                            <span className="labelSeparator">-</span>
                            <div className="labelGroup">
                              <span>تا</span>
                              <span className="displayMax">{maxPrice.toLocaleString("fa-IR")}</span>
                              <span>تومان</span>
                            </div>
                          </div>
                          <div className="rangeSliderContainer">
                            <div className="sliderTrack"></div>
                            <div
                              className="sliderProgress"
                              style={{
                                left: `${progressLeft}%`,
                                width: `${progressWidth}%`,
                              }}
                            ></div>
                            <div className="rangeInputs">
                              <input
                                type="range"
                                className="rangeMin"
                                min={globalMin}
                                max={globalMax}
                                value={minPrice}
                                onChange={handleMinChange}
                                step={10000}
                              />
                              <input
                                type="range"
                                className="rangeMax"
                                min={globalMin}
                                max={globalMax}
                                value={maxPrice}
                                onChange={handleMaxChange}
                                step={10000}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("class")}>
                      <span>کلاس پروازی</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "class" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          <label className="checkboxItem">
                            <input
                              type="checkbox"
                              onChange={() => handleClassChange("economy")}
                              checked={selectedClasses.includes("economy")}
                            />
                            <span>اکونومی</span>
                          </label>
                          <label className="checkboxItem">
                            <input
                              type="checkbox"
                              onChange={() => handleClassChange("business")}
                              checked={selectedClasses.includes("business")}
                            />
                            <span>بیزنس</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("time")}>
                      <span>زمان پرواز</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "time" && (
                      <div className="dropdownPanel open">
                        <div className="timeSubSection">
                          <span className="subTitle">زمان حرکت از تهران</span>
                          <div className="checkboxGroup">
                            {[
                              { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                              { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                              { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                            ].map((item) => (
                              <label key={item.value} className="checkboxItem">
                                <input
                                  type="checkbox"
                                  onChange={() => handleDepTimeChange(item.value)}
                                  checked={selectedDepTimes.includes(item.value)}
                                />
                                <span>{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <hr className="filterDivider" />
                        <div className="timeSubSection" style={{ paddingTop: 10 }}>
                          <span>زمان رسیدن به کیش</span>
                          <div className="checkboxGroup">
                            {[
                              { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                              { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                              { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                            ].map((item) => (
                              <label key={item.value} className="checkboxItem">
                                <input
                                  type="checkbox"
                                  onChange={() => handleArrTimeChange(item.value)}
                                  checked={selectedArrTimes.includes(item.value)}
                                />
                                <span>{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("airline")}>
                      <span>شرکت‌های هواپیمایی</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "airline" && (
                      <div className="dropdownPanel open" id="airlineContent">
                        <div className="checkboxGroup">
                          {allAirlines.map((airline) => (
                            <label key={airline} className="checkboxItem">
                              <input
                                type="checkbox"
                                onChange={() => handleAirlineChange(airline)}
                                checked={selectedAirlines.includes(airline)}
                              />
                              <span>{airline}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("baggage")}>
                      <span>مقدار بار مجاز</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "baggage" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          {allBaggageOptions.map((bag) => (
                            <label key={bag} className="checkboxItem">
                              <input
                                type="checkbox"
                                onChange={() => handleBaggageChange(bag)}
                                checked={selectedBaggage.includes(bag)}
                              />
                              <span>{bag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("tags")}>
                      <span>برچسب‌ها</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "tags" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          <label className="checkboxItem">
                            <input
                              type="checkbox"
                              onChange={() => handleTagChange("foreign-restriction")}
                              checked={selectedTags.includes("foreign-restriction")}
                            />
                            <span>محدودیت خرید اتباع</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>


            <div className="Left">
              <div className="Top">
                <div className="Title">ارزان‌ترین قیمت در هر روز</div>
                <div className="Price">
                  {cheapDays.map((item, idx) => (
                    <div className="Cards" key={idx}>
                      <span>{item.day}</span>
                      <p>{item.price} تومان</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Bottom">
                {filteredFlights.map((flight) => (
                  <div className="Cards" key={flight.id}>
                    <div className="RightCard">
                      <div className="About">
                        <div className="Icon">
                          <img src={flight.logo} alt={flight.airline} />
                          <span>{flight.airline}</span>
                        </div>
                        <div className="Time">
                          <div className="Form">
                            <span>{flight.departureTime}</span>
                            <p>{flight.origin}</p>
                          </div>
                          <div className="i">
                            <FontAwesomeIcon icon={faCircleDot} />
                            <hr className="line-divider" />
                            <hr className="line-divider" />
                            <hr className="line-divider" />
                            <hr className="line-divider" />
                            <hr className="line-divider" />

                            <FontAwesomeIcon icon={faPlane} className="fa-flip-horizontal" />
                          </div>
                          <div className="Form">
                            <span>{flight.arrivalTime}</span>
                            <p>{flight.destination}</p>
                          </div>
                        </div>
                      </div>
                      <div className="discriptions">
                        <div
                          className={`More ${activeDetailId === flight.id ? "active" : ""}`}
                          onClick={() =>
                            setActiveDetailId(activeDetailId === flight.id ? null : flight.id)
                          }
                        >
                          <span>
                            جزئیات <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </div>
                        <div className="Avablity">
                          <span>{flight.flightClass === "economy" ? "اکونومی" : "بیزنس"}</span>
                          <p>{flight.seats} صندلی</p>
                        </div>
                      </div>
                    </div>
                    <div className="LeftCard">
                      <div className="Top">
                        <FontAwesomeIcon icon={faBell} />
                      </div>
                      <div className="Bottom">
                        <p>
                          <span>{flight.price.toLocaleString("fa-IR")}</span> تومان
                        </p>
                        <Link href="/BuyTicketStep(1).html">
                          <button className="BtnPrimary">رزرو آنلاین</button>
                        </Link>
                      </div>
                    </div>
                    <div className={`FlightDetails ${activeDetailId === flight.id ? "active" : ""}`}>
                      <div className="DetailsContent">
                        <div className="row">
                          <div className="title">
                            <p>
                              سه‌شنبه 2 دی ← چهارشنبه 3 دی <span></span> کلاس نرخی {flight.classRate}
                            </p>
                          </div>
                          <div className="contet">
                            <div className="right">
                              <p>ساعت ورود به فرودگاه: </p>
                              <span>
                                ساعت حرکت <FontAwesomeIcon icon={faClock} />:
                              </span>
                              <p>ساعت رسیدن به مقصد:</p>
                            </div>
                            <div className="left">
                              <p>
                                {flight.origin}، فرودگاه مهرآباد ({flight.originCode}) - ترمینال 1
                              </p>
                              <span>هواپیمای شما</span>
                              <p>
                                {flight.destination}، فرودگاه کیش ({flight.destinationCode})
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="orw">
                          <div className="top">
                            <p>
                              بزرگسال × 1{" "}
                              <span>{flight.price.toLocaleString("fa-IR")} تومان</span>
                            </p>
                            <p>
                              مجموع <span>{flight.price.toLocaleString("fa-IR")} تومان</span>
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
                ))}


                <div className="GetLater">
                  <div className="Titel">
                    <div className="About">
                      <div className="Logo">
                        <svg
                          height="64px"
                          width="64px"
                          version="1.1"
                          viewBox="-51.2 -51.2 614.4 614.4"
                          fill="#ffffff"
                        >
                          <rect
                            x="-51.2"
                            y="-51.2"
                            width="614.4"
                            height="614.4"
                            rx="307.2"
                            fill="#ffc800"
                            strokeWidth="0"
                          ></rect>
                          <path
                            style={{ fill: "#f5f0de" }}
                            d="M330.08,267.413h-93.758l-55.104,91.322h40.588l-31.221,124.946l140.197-158.768h-41.265 L330.08,267.413z"
                          ></path>
                          <g>
                            <path
                              style={{ fill: "#cea500" }}
                              d="M190.579,499.533c-2.508,0-5.036-0.594-7.371-1.821c-6.468-3.402-9.773-10.784-8.002-17.873 l26.3-105.249H181.22c-5.718,0-10.994-3.08-13.804-8.059c-2.811-4.979-2.723-11.087,0.231-15.984l55.104-91.322 c2.871-4.756,8.02-7.661,13.574-7.661h93.758c5.921,0,11.349,3.3,14.074,8.557s2.292,11.594-1.121,16.434l-22.933,32.508h10.683 c6.233,0,11.888,3.652,14.449,9.335c2.563,5.681,1.558,12.338-2.566,17.009L202.471,494.175 C199.377,497.673,195.013,499.533,190.579,499.533z M209.299,342.884h12.507c4.881,0,9.489,2.248,12.495,6.095 c3.004,3.847,4.068,8.865,2.885,13.6l-15.467,61.893l73.917-83.708h-6.119c-5.921,0-11.349-3.3-14.074-8.557 c-2.725-5.257-2.292-11.594,1.121-16.434l22.933-32.508h-54.226L209.299,342.884z"
                            ></path>
                            <path
                              style={{ fill: "#cea500" }}
                              d="M461.81,196.058c4.535-13.926,6.828-28.428,6.828-43.299c0-77.36-62.937-140.297-140.297-140.297 c-46.791,0-90.137,23.266-116.108,61.526c-3.305-0.975-6.647-1.794-10.015-2.494c-0.246-0.051-0.495-0.098-0.74-0.147 c-1.764-0.355-3.535-0.672-5.315-0.951c-0.239-0.038-0.479-0.081-0.718-0.116c-1.975-0.298-3.957-0.553-5.949-0.758 c-0.22-0.022-0.442-0.038-0.663-0.059c-1.71-0.166-3.426-0.295-5.147-0.393c-0.488-0.029-0.976-0.055-1.466-0.078 c-1.948-0.089-3.901-0.149-5.862-0.149c-70.072,0-127.079,57.008-127.079,127.079c0,0.197,0,0.393,0.002,0.59 C19.383,211.869,0,242.942,0,277.184c0,49.995,40.672,90.668,90.667,90.668h22.632c8.754,0,15.852-7.097,15.852-15.852 s-7.099-15.852-15.852-15.852H90.667c-32.513,0-58.962-26.451-58.962-58.964c0-24.913,15.773-47.249,39.25-55.578 c6.853-2.432,11.173-9.213,10.478-16.451c-0.3-3.144-0.453-6.251-0.453-9.234c0-52.59,42.785-95.375,95.375-95.375 c1.625,0,3.239,0.043,4.844,0.124c0.311,0.016,0.618,0.049,0.927,0.068c1.306,0.078,2.609,0.166,3.901,0.298 c0.241,0.024,0.479,0.062,0.72,0.089c1.36,0.147,2.715,0.312,4.058,0.517c0.163,0.025,0.323,0.059,0.485,0.084 c1.416,0.224,2.823,0.469,4.218,0.755c0.114,0.024,0.228,0.054,0.342,0.078c1.436,0.3,2.863,0.626,4.275,0.989 c0.09,0.024,0.178,0.051,0.268,0.075c1.433,0.374,2.857,0.775,4.263,1.213c0.067,0.021,0.133,0.046,0.2,0.067 c38.71,12.149,66.871,48.356,66.871,91.02c0,8.755,7.099,15.852,15.852,15.852s15.852-7.097,15.852-15.852 c0-46.119-24.699-86.572-61.561-108.843c20.367-26.797,52.222-42.912,86.468-42.912c59.877,0,108.592,48.714,108.592,108.592 c0,15.906-3.384,31.261-10.057,45.639c-1.963,4.228-1.964,9.106-0.006,13.335c1.958,4.229,5.678,7.382,10.171,8.62 c25.467,7.021,43.254,30.39,43.254,56.832c0,32.513-26.453,58.964-58.964,58.964h-35.851c-8.754,0-15.852,7.097-15.852,15.852 s7.099,15.852,15.852,15.852h35.851c49.995,0,90.668-40.674,90.668-90.668C512,242.457,492.044,211.174,461.81,196.058z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="Content">
                        <p>
                          موجود شد رزرو کن! <span>(جدید)</span>
                        </p>
                        <p>در لحظه موجود شدن ظرفیت خالی، رزرو خودکار انجام می‌شود.</p>
                      </div>
                    </div>
                    <div className="Button">
                      <button onClick={() => setShowPopup(true)}>ادامه رزرو</button>
                    </div>
                  </div>
                  <div
                    className="GetLaterCardAdditional"
                    style={{
                      marginTop: "20px",
                      background: "#fff",
                      borderRadius: "12px",
                      padding: "16px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                          بلیط را برای بعد ذخیره کن
                        </p>
                        <p style={{ fontSize: "12px", color: "#666" }}>
                          قیمت‌ها را رصد کن و در زمان مناسب بخر
                        </p>
                      </div>
                      <button
                        style={{
                          background: "#ffc800",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPopup(true)}
                      >
                        رزرو خودکار
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {showPopup && (
          <div
            className="popup show"
            onClick={(e) =>
              e.target === e.currentTarget && setShowPopup(false)
            }
          >
            <div className="popupContent">
              <div className="Titel">
                <div className="Close">
                  <span
                    className="close"
                    onClick={() => setShowPopup(false)}
                  >
                    ×
                  </span>
                </div>
                <div className="Content">
                  <p>فعالسازی رزرو خودکار</p>
                </div>
                <div className="Empty"></div>
              </div>
              <div className="Flight">
                <p>پرواز تهران به کیش</p>
                <p>شنبه 11 بهمن</p>
              </div>
              <div className="AboutIt">
                <p>جستجو و خرید این بلیط رو به رزرو خودکار بسپار!</p>
                <p>
                  رزرو خودکار به طور مداوم به جای شما بلیط‌ها را بررسی کرده و به محض پیدا
                  شدن بلیط دلخواه، خرید را انجام خواهد داد.
                </p>
                <div className={`SeeMore ${expandSeeMore ? "active" : ""}`}>
                  <div
                    className="ContentIn"
                    onClick={() => setExpandSeeMore(!expandSeeMore)}
                  >
                    <div className="R">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.92 6.085h.001a.749.749 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 0 1 1.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 0 0-.26.16.952.952 0 0 0-.276.245.75.75 0 0 1-1.248-.832c.184-.264.42-.489.692-.661.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 0 0 .277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 0 0-.262-.525A1.27 1.27 0 0 0 8 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 0 0-.34.398ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                      </svg>
                      <p>رزرو خودکار چطور کار می‌کند؟</p>
                    </div>
                    <div className="L">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                  </div>
                  {expandSeeMore && (
                    <div className="MoreDetails">
                      <ul>
                        <li>مشخصات بلیط مورد نظرت رو وارد کن</li>
                        <li>کیف پول مستربلیط رو به مقدار مورد نیاز شارژ کن</li>
                        <li>در لحظه موجود شدن، بلیط برای شما صادر میشه</li>
                        <li>بلیط پیدا نشد، کل هزینه برگشت داده می‌شه!</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="Chance">
                <div className="smartIndicator">
                  <div className="bar">
                    <div className="pointer" style={{ left: "78%" }}></div>
                  </div>
                  <div className="labels">
                    <span>ریسکی</span>
                    <span>متعادل</span>
                    <span>مطمئن</span>
                  </div>
                  <div className="idea high">
                    شانس پیدا شدن این هواپیما بالا و امیدوارکننده است.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </>
  );
}