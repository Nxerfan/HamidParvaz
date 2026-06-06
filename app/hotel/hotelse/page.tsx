"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faAngleDown,
  faStar,
  faLocationDot,
  faFaceSmile,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/(Headers)/SecondHeader";
import Form from "../../components/(Forms)/FormType1";
import "../globals.css";


interface Hotel {
  id: number;
  name: string;
  image: string;
  stars: number;
  location: string;
  rating: number;
  pricePerNight: number;
  facilities: string[];
  roomType: "standard" | "luxury";
  checkInStartHour: number;
  checkInEndHour: number;
  checkOutStartHour: number;
  checkOutEndHour: number;
  brand: string;
  isCancelable: boolean;
}

const hotelsData: Hotel[] = [
  {
    id: 1,
    name: "هتل پارسیان استقلال",
    image:
      "https://cdn01.booking.ir/2026/1/1744b4b9-4c86-472d-a449-ca65210242e9.jpg",
    stars: 5,
    location: "محله آرارات",
    rating: 6.8,
    pricePerNight: 9215000,
    facilities: ["ترانسفر رایگان", "استخر", "اینترنت رایگان"],
    roomType: "standard",
    checkInStartHour: 14,
    checkInEndHour: 18,
    checkOutStartHour: 8,
    checkOutEndHour: 12,
    brand: "هتل پارسیان",
    isCancelable: true,
  },
  {
    id: 2,
    name: "هتل داریوش کیش",
    image:
      "https://cdn01.booking.ir/2026/1/b8936505-5ae5-4172-b0f4-122e729e488a.jpg",
    stars: 5,
    location: "کیش، ساحل مرجان",
    rating: 9.2,
    pricePerNight: 12500000,
    facilities: ["صبحانه رایگان", "استخر", "اینترنت رایگان", "پارکینگ"],
    roomType: "luxury",
    checkInStartHour: 12,
    checkInEndHour: 20,
    checkOutStartHour: 10,
    checkOutEndHour: 14,
    brand: "هتل داریوش",
    isCancelable: false,
  },
  {
    id: 3,
    name: "هتل شایان",
    image:
      "https://cdn01.booking.ir/2026/1/1ebaa989-fb51-4bfc-9351-2dbad78d63ba.jpg",
    stars: 4,
    location: "تهران، خیابان ولیعصر",
    rating: 7.5,
    pricePerNight: 4350000,
    facilities: ["اینترنت رایگان", "پارکینگ"],
    roomType: "standard",
    checkInStartHour: 13,
    checkInEndHour: 17,
    checkOutStartHour: 7,
    checkOutEndHour: 11,
    brand: "هتل شایان",
    isCancelable: true,
  },
  {
    id: 4,
    name: "هتل ارم",
    image:
      "https://cdn01.booking.ir/2026/1/2fbf3184-ce6d-4633-bcd6-d90363462208.jpg",
    stars: 3,
    location: "شیراز، بلوار کریم خان",
    rating: 6.2,
    pricePerNight: 2100000,
    facilities: ["صبحانه رایگان", "پارکینگ"],
    roomType: "standard",
    checkInStartHour: 14,
    checkInEndHour: 20,
    checkOutStartHour: 9,
    checkOutEndHour: 12,
    brand: "هتل ارم",
    isCancelable: true,
  },
  {
    id: 5,
    name: "هتل بزرگ کیش",
    image:
      "https://cdn01.booking.ir/2026/1/94b031c0-4bce-415d-a7e3-9125de35051b.jpg",
    stars: 5,
    location: "کیش، میدان مرکزی",
    rating: 8.7,
    pricePerNight: 11300000,
    facilities: ["استخر", "اینترنت رایگان", "پارکینگ", "ترانسفر رایگان"],
    roomType: "luxury",
    checkInStartHour: 15,
    checkInEndHour: 22,
    checkOutStartHour: 8,
    checkOutEndHour: 12,
    brand: "هتل بزرگ کیش",
    isCancelable: false,
  },
  {
    id: 6,
    name: "هتل پارس",
    image:
      "https://cdn01.booking.ir/2026/1/b172e304-dd7b-464c-b3c5-6adab2f99c86.jpg",
    stars: 4,
    location: "مشهد، خیابان امام رضا",
    rating: 7.9,
    pricePerNight: 5100000,
    facilities: ["صبحانه رایگان", "اینترنت رایگان"],
    roomType: "standard",
    checkInStartHour: 13,
    checkInEndHour: 18,
    checkOutStartHour: 9,
    checkOutEndHour: 11,
    brand: "هتل پارس",
    isCancelable: true,
  },
];
const allBrands = Array.from(new Set(hotelsData.map((h) => h.brand))).sort();
const allFacilitiesOptions = [
  "صبحانه رایگان",
  "استخر",
  "پارکینگ",
  "اینترنت رایگان",
  "ترانسفر رایگان",
];


function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
}

export default function HotelResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- دریافت اطلاعات جستجو از URL (که توسط کامپوننت Form ارسال شده) ---
  const destination = searchParams.get("destination") || "";
  const checkInDate = searchParams.get("checkIn") || "";
  const checkOutDate = searchParams.get("checkOut") || "";
  const roomCount = parseInt(searchParams.get("rooms") || "1", 10);
  const adultCount = parseInt(searchParams.get("adults") || "2", 10);
  const childCount = parseInt(searchParams.get("children") || "0", 10);

  // --- State فیلترها و مرتب‌سازی (بدون تغییر) ---
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(13000000);
  const globalMinPrice = 0;
  const globalMaxPrice = 13000000;

  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedCheckInTimes, setSelectedCheckInTimes] = useState<string[]>([]);
  const [selectedCheckOutTimes, setSelectedCheckOutTimes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"time" | "price" | null>(null);

  // --- State UI ---
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [priceRangeProgress, setPriceRangeProgress] = useState({ left: 0, width: 100 });

  const nights = calculateNights(checkInDate, checkOutDate);

  useEffect(() => {
    const left = ((minPrice - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100;
    const right = ((maxPrice - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100;
    setPriceRangeProgress({ left, width: right - left });
  }, [minPrice, maxPrice]);

  const filteredHotels = hotelsData
    .filter((hotel) => {
      if (hotel.pricePerNight < minPrice || hotel.pricePerNight > maxPrice) return false;
      if (selectedRoomTypes.length && !selectedRoomTypes.includes(hotel.roomType)) return false;
      if (selectedCheckInTimes.length) {
        let match = false;
        for (const range of selectedCheckInTimes) {
          const [start, end] = range.split("-").map(Number);
          if (
            hotel.checkInStartHour >= start &&
            hotel.checkInStartHour < end &&
            hotel.checkInEndHour >= start &&
            hotel.checkInEndHour <= end
          )
            match = true;
        }
        if (!match) return false;
      }
      if (selectedCheckOutTimes.length) {
        let match = false;
        for (const range of selectedCheckOutTimes) {
          const [start, end] = range.split("-").map(Number);
          if (
            hotel.checkOutStartHour >= start &&
            hotel.checkOutStartHour < end &&
            hotel.checkOutEndHour <= end
          )
            match = true;
        }
        if (!match) return false;
      }
      if (selectedBrands.length && !selectedBrands.includes(hotel.brand)) return false;
      if (selectedFacilities.length) {
        let hasAll = true;
        for (const fac of selectedFacilities) {
          if (!hotel.facilities.includes(fac)) {
            hasAll = false;
            break;
          }
        }
        if (!hasAll) return false;
      }
      if (selectedTags.length) {
        if (selectedTags.includes("قابل کنسلی") && !hotel.isCancelable) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "time") return a.checkInStartHour - b.checkInStartHour;
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      return 0;
    });

  const toggleDropdown = (name: string) => setOpenDropdown((prev) => (prev === name ? null : name));
  const handleRoomTypeChange = (val: string) =>
    setSelectedRoomTypes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleCheckInChange = (val: string) =>
    setSelectedCheckInTimes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleCheckOutChange = (val: string) =>
    setSelectedCheckOutTimes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleBrandChange = (val: string) =>
    setSelectedBrands((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  const handleFacilityChange = (val: string) =>
    setSelectedFacilities((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
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

  const selectRoom = (hotelId: number) => {
    const query = new URLSearchParams({
      hotelId: hotelId.toString(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      rooms: roomCount.toString(),
      adults: adultCount.toString(),
      children: childCount.toString(),
    }).toString();
    router.push(`/choosedHotel.html?${query}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filterDropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // --- عنوان پویا برای بخش قیمت ---
  const getPriceTitle = () => {
    if (roomCount > 1) return `قیمت هر شب (${roomCount} اتاق)`;
    if (nights > 1) return `قیمت هر شب (${nights} شب)`;
    return "قیمت 1 شب اتاق 1 تخته";
  };

  return (
    <>
      <Header />
      {/* فقط کامپوننت Form (بدون فرم تکراری) */}
      <Form />
      <main className="hotel-results-page">
        <section>
          <div className="Countainer">
            {/* قسمت فیلترها (راست) - بدون تغییر */}
            <div className="Right">
              <div className="Title">
                <img src="/Media/istockphoto-1306235331-612x612.jpg" alt="hotel cover" className="cover" />
                <Link href="hotelOnMap.html">
                  <span>
                    <FontAwesomeIcon icon={faMap} /> مشاهده هتل‌ها روی نقشه
                  </span>
                </Link>
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
                    نمایش {filteredHotels.length} از {hotelsData.length} نتیجه
                  </span>

                  {/* --- فیلتر قیمت --- */}
                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("price")}>
                      <span>قیمت هر شب</span>
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
                                left: `${priceRangeProgress.left}%`,
                                width: `${priceRangeProgress.width}%`,
                              }}
                            ></div>
                            <div className="rangeInputs">
                              <input
                                type="range"
                                className="rangeMin"
                                min={globalMinPrice}
                                max={globalMaxPrice}
                                value={minPrice}
                                onChange={handleMinChange}
                                step={100000}
                              />
                              <input
                                type="range"
                                className="rangeMax"
                                min={globalMinPrice}
                                max={globalMaxPrice}
                                value={maxPrice}
                                onChange={handleMaxChange}
                                step={100000}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- فیلتر نوع اتاق --- */}
                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("room")}>
                      <span>نوع اتاق</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "room" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          <label className="checkboxItem">
                            <input
                              type="checkbox"
                              onChange={() => handleRoomTypeChange("standard")}
                              checked={selectedRoomTypes.includes("standard")}
                            />
                            <span>استاندارد</span>
                          </label>
                          <label className="checkboxItem">
                            <input
                              type="checkbox"
                              onChange={() => handleRoomTypeChange("luxury")}
                              checked={selectedRoomTypes.includes("luxury")}
                            />
                            <span>لوکس</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- فیلتر زمان ورود/خروج --- */}
                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("time")}>
                      <span>زمان ورود و خروج</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "time" && (
                      <div className="dropdownPanel open">
                        <div className="timeSubSection">
                          <span className="subTitle">زمان ورود (Check-in)</span>
                          <div className="checkboxGroup">
                            {[
                              { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                              { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                              { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                            ].map((item) => (
                              <label key={item.value} className="checkboxItem">
                                <input
                                  type="checkbox"
                                  onChange={() => handleCheckInChange(item.value)}
                                  checked={selectedCheckInTimes.includes(item.value)}
                                />
                                <span>{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <hr className="filterDivider" />
                        <div className="timeSubSection" style={{ paddingTop: 10 }}>
                          <span>زمان خروج (Check-out)</span>
                          <div className="checkboxGroup">
                            {[
                              { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
                              { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
                              { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
                            ].map((item) => (
                              <label key={item.value} className="checkboxItem">
                                <input
                                  type="checkbox"
                                  onChange={() => handleCheckOutChange(item.value)}
                                  checked={selectedCheckOutTimes.includes(item.value)}
                                />
                                <span>{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- فیلتر برند هتل --- */}
                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("brand")}>
                      <span>برند هتل</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "brand" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          {allBrands.map((brand) => (
                            <label key={brand} className="checkboxItem">
                              <input
                                type="checkbox"
                                onChange={() => handleBrandChange(brand)}
                                checked={selectedBrands.includes(brand)}
                              />
                              <span>{brand}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- فیلتر امکانات --- */}
                  <div className="filterDropdown">
                    <div className="dropdownTrigger" onClick={() => toggleDropdown("facilities")}>
                      <span>امکانات</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    {openDropdown === "facilities" && (
                      <div className="dropdownPanel open">
                        <div className="checkboxGroup">
                          {allFacilitiesOptions.map((fac) => (
                            <label key={fac} className="checkboxItem">
                              <input
                                type="checkbox"
                                onChange={() => handleFacilityChange(fac)}
                                checked={selectedFacilities.includes(fac)}
                              />
                              <span>{fac}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- فیلتر برچسب‌ها --- */}
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
                              onChange={() => handleTagChange("قابل کنسلی")}
                              checked={selectedTags.includes("قابل کنسلی")}
                            />
                            <span>قابل کنسلی</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* قسمت نتایج هتل‌ها (چپ) */}
            <div className="Left">
              {filteredHotels.map((hotel) => {
                const pricePerNightTotal = hotel.pricePerNight * roomCount;
                const totalStayPrice = pricePerNightTotal * nights;

                return (
                  <div className="MediaElementHotel" key={hotel.id}>
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="Down">
                      <p>{hotel.name}</p>
                      <div className="rating">
                        <div className="Stars">
                          {Array(hotel.stars)
                            .fill(0)
                            .map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ffcd11" }} />
                            ))}
                          <span>{hotel.stars} ستاره</span>
                          <p>
                            <FontAwesomeIcon icon={faLocationDot} /> {hotel.location}
                          </p>
                        </div>
                        <div className="AdditionalOptions">
                          {hotel.facilities.slice(0, 2).map((fac) => (
                            <span key={fac}>{fac}</span>
                          ))}
                        </div>
                        <div className="SmilyFace">
                          <p>
                            {hotel.rating}/10 <FontAwesomeIcon icon={faFaceSmile} />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <div className="titel">
                        <p>{getPriceTitle()}</p>
                      </div>
                      <div className="Choose">
                        <p>
                          <span>{pricePerNightTotal.toLocaleString("fa-IR")}</span> تومان
                        </p>
                        {nights > 1 && (
                          <small>
                            مجموع {nights} شب: {totalStayPrice.toLocaleString("fa-IR")} تومان
                          </small>
                        )}
                        <button onClick={() => selectRoom(hotel.id)}>انتخاب اتاق</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}