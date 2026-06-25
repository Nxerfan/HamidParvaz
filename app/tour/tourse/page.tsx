"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faAngleDown,
  faVrCardboard,
  faPlaneDeparture,
  faClock,
  faUtensils,
  faHotel,
  faPlane,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/(Headers)/SecondHeader";
import FilterSidebar from "../../components/(filters)/FilterSidebar";
import FilterAccordion from "../../components/(filters)/FilterAccordion";
import PriceRangeFilter from "../../components/(filters)/PriceRangeFilter";
import CheckboxFilter from "../../components/(filters)/CheckboxFilter";
import "../../components/(filters)/FiltersGlobal.css";
import "./global.css";
import Form from "../../components/(Forms)/FormType3";

interface Tour {
  id: number;
  title: string;
  destination: string;
  agency: string;
  image: string;
  durationNights: number;
  durationDays: number;
  mealPlan: string;
  hotelStars: number;
  price: number;
  originalPrice?: number;
  capacity: number | string;
  isSpecial: boolean;
  badge?: string;
  departureCity: string;
  airline?: string;
  transportIcon?: any;
  services: string[];
}

const toursData: Tour[] = [
  {
    id: 1,
    title: "تور کیش - هتل ترنج درخشان",
    destination: "کیش",
    agency: "آژانس آسمان آبی",
    image: "https://dalahoo.com/mi_ax/original/1400/08/23798.webp",
    durationNights: 3,
    durationDays: 4,
    mealPlan: "صبحانه",
    hotelStars: 5,
    price: 4850000,
    originalPrice: 6500000,
    capacity: 2,
    isSpecial: true,
    badge: "ویژه",
    departureCity: "تهران",
    airline: "پرواز از تهران",
    transportIcon: faPlaneDeparture,
    services: ["ترانسفر فرودگاهی"],
  },
  {
    id: 2,
    title: "تور ترکیه استانبول - هتل گرانت هیوت",
    destination: "استانبول",
    agency: "آژانس پرواز الکترا",
    image: "https://dalahoo.com/mi_ax/original/1397/01/17559.webp",
    durationNights: 5,
    durationDays: 6,
    mealPlan: "صبحانه و ناهار",
    hotelStars: 4,
    price: 28000000,
    capacity: "ظرفیت مناسب",
    isSpecial: false,
    badge: "حرکت زود هنگام",
    departureCity: "تهران",
    airline: "ترکیش ایرلاینز",
    transportIcon: faPlane,
    services: ["ویزا در تور", "لیدر فارسی زبان"],
  },
  {
    id: 3,
    title: "تور دبی - هتل ریمز",
    destination: "دبی",
    agency: "آژانس سفرهای ناب",
    image: "https://dalahoo.com/mi_ax/original/1404/01/30456.webp",
    durationNights: 4,
    durationDays: 5,
    mealPlan: "بدون صبحانه",
    hotelStars: 4,
    price: 18500000,
    capacity: 5,
    isSpecial: false,
    departureCity: "تهران",
    airline: "فلای دبی",
    transportIcon: faPlane,
    services: ["ترانسفر فرودگاهی"],
  },
  {
    id: 4,
    title: "تور مشهد - هتل درویشی",
    destination: "مشهد",
    agency: "آژانس زیارت",
    image: "https://dalahoo.com/mi_ax/original/1404/02/30686.webp",
    durationNights: 2,
    durationDays: 3,
    mealPlan: "یک وعده",
    hotelStars: 3,
    price: 2400000,
    capacity: "ظرفیت مناسب",
    isSpecial: true,
    badge: "ارزان",
    departureCity: "تهران",
    transportIcon: faBus,
    services: [],
  },
];

const starOptions = [3, 4, 5];
const durationOptions = [
  { label: "1 تا 3 شب", min: 1, max: 3 },
  { label: "4 تا 7 شب", min: 4, max: 7 },
  { label: "بیش از 7 شب", min: 8, max: 100 },
];
const serviceOptions = ["ویزا در تور", "ترانسفر فرودگاهی", "لیدر فارسی زبان"];

export default function TourResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationQuery = searchParams.get("destination") || "";
  const dateQuery = searchParams.get("date") || "";
  const personsQuery = searchParams.get("persons") || "";

  const [destination, setDestination] = useState(destinationQuery);
  const [travelDate, setTravelDate] = useState(dateQuery);
  const [persons, setPersons] = useState(personsQuery);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000000);
  const globalMinPrice = 0;
  const globalMaxPrice = 30000000;

  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedHotelStars, setSelectedHotelStars] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "date_asc">("price_asc");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [priceRangeProgress, setPriceRangeProgress] = useState({ left: 0, width: 100 });

  useEffect(() => {
    const left = ((minPrice - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100;
    const right = ((maxPrice - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100;
    setPriceRangeProgress({ left, width: right - left });
  }, [minPrice, maxPrice]);

  const filteredTours = useMemo(() => {
    let results = toursData.filter((tour) => {
      if (tour.price < minPrice || tour.price > maxPrice) return false;

      if (selectedDurations.length) {
        let match = false;
        for (const dur of selectedDurations) {
          const range = durationOptions.find((d) => d.label === dur);
          if (range && tour.durationNights >= range.min && tour.durationNights <= range.max) {
            match = true;
            break;
          }
        }
        if (!match) return false;
      }

      if (selectedHotelStars.length && !selectedHotelStars.includes(tour.hotelStars)) return false;

      if (selectedServices.length) {
        let hasAll = true;
        for (const service of selectedServices) {
          if (!tour.services.includes(service)) {
            hasAll = false;
            break;
          }
        }
        if (!hasAll) return false;
      }

      if (destination && !tour.destination.includes(destination) && !tour.title.includes(destination))
        return false;

      return true;
    });

    if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
    if (sortBy === "date_asc") {
      results.sort((a, b) => a.id - b.id);
    }

    return results;
  }, [minPrice, maxPrice, selectedDurations, selectedHotelStars, selectedServices, sortBy, destination]);

  const toggleDropdown = (name: string) => setOpenDropdown((prev) => (prev === name ? null : name));

  const handleDurationChange = (label: string) => {
    setSelectedDurations((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  const handleStarChange = (star: number) => {
    setSelectedHotelStars((prev) => (prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]));
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= maxPrice) setMinPrice(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= minPrice) setMaxPrice(val);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filterDropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <Header />
      <Form showOrigin={true} />
      <main className="tour-results-page">
        <section>
          <div className="Container">
            <div className="Right">
              <div className="Title">
                <img src="istockphoto-1306235331-612x612.jpg" alt="تور" className="cover" />
                <Link href="/GetTour.html" className="ExperienceTrigger">
                  <div className="ContentWrapper">
                    <div className="IconBadge">
                      <FontAwesomeIcon icon={faVrCardboard} />
                    </div>
                    <div className="TextBlock">
                      <span className="TitleText">تور مجازی و گالری تصاویر</span>
                      <span className="DescText">قبل از خرید، مقصد را ببینید</span>
                    </div>
                  </div>
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
                      onChange={() => setSortBy("price_asc")}
                      checked={sortBy === "price_asc"}
                    />
                    ارزان‌ترین قیمت
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => setSortBy("date_asc")}
                      checked={sortBy === "date_asc"}
                    />
                    زودترین تاریخ
                  </label>
                </div>
              </div>

              <FilterSidebar
                resultCount={`نمایش ${filteredTours.length} از ${toursData.length} نتیجه`}
              >
                <FilterAccordion
                  title="قیمت"
                  isOpen={openDropdown === "price"}
                  onToggle={() => toggleDropdown("price")}
                  hasActive={minPrice > globalMinPrice || maxPrice < globalMaxPrice}
                  selectedSummary={
                    minPrice > globalMinPrice || maxPrice < globalMaxPrice
                      ? `${(minPrice).toLocaleString("fa-IR")} تا ${(maxPrice).toLocaleString("fa-IR")} تومان`
                      : undefined
                  }
                >
                  <PriceRangeFilter
                    min={minPrice}
                    max={maxPrice}
                    globalMin={globalMinPrice}
                    globalMax={globalMaxPrice}
                    step={100000}
                    onMinChange={(val) => { if (val <= maxPrice) setMinPrice(val); }}
                    onMaxChange={(val) => { if (val >= minPrice) setMaxPrice(val); }}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="مدت تور"
                  isOpen={openDropdown === "duration"}
                  onToggle={() => toggleDropdown("duration")}
                  hasActive={selectedDurations.length > 0}
                  activeCount={selectedDurations.length}
                  selectedSummary={
                    selectedDurations.length > 0 ? selectedDurations.join("، ") : undefined
                  }
                >
                  <CheckboxFilter
                    options={durationOptions.map((d) => ({ value: d.label, label: d.label }))}
                    selectedValues={selectedDurations}
                    onChange={handleDurationChange}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="ستاره هتل"
                  isOpen={openDropdown === "stars"}
                  onToggle={() => toggleDropdown("stars")}
                  hasActive={selectedHotelStars.length > 0}
                  activeCount={selectedHotelStars.length}
                  selectedSummary={
                    selectedHotelStars.length > 0
                      ? selectedHotelStars.map((s) => `${s} ستاره`).join("، ")
                      : undefined
                  }
                >
                  <CheckboxFilter
                    options={starOptions.map((s) => ({ value: String(s), label: `${s} ستاره` }))}
                    selectedValues={selectedHotelStars.map(String)}
                    onChange={(val) => handleStarChange(Number(val))}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="خدمات ویژه تور"
                  isOpen={openDropdown === "services"}
                  onToggle={() => toggleDropdown("services")}
                  hasActive={selectedServices.length > 0}
                  activeCount={selectedServices.length}
                  selectedSummary={
                    selectedServices.length > 0 ? selectedServices.join("، ") : undefined
                  }
                >
                  <CheckboxFilter
                    options={serviceOptions.map((s) => ({ value: s, label: s }))}
                    selectedValues={selectedServices}
                    onChange={handleServiceChange}
                  />
                </FilterAccordion>
              </FilterSidebar>
            </div>

            <div className="Left">
              <div className="SortBar">
                <span>نتایج یافت شده: {filteredTours.length} تور</span>
                <div>
                  <span className="SortLabel">مرتب‌سازی: </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{
                      border: "1px solid #ddd",
                      padding: "5px",
                      borderRadius: "4px",
                      fontFamily: "var(--font)",
                    }}
                  >
                    <option value="price_asc">ارزان‌ترین</option>
                    <option value="price_desc">گران‌ترین</option>
                    <option value="date_asc">زودترین تاریخ</option>
                  </select>
                </div>
              </div>

              {filteredTours.map((tour) => (
                <div className="TourCard" key={tour.id}>
                  <div className="TourImage">
                    {tour.badge && <span className={`Badge ${tour.isSpecial ? "Special" : ""}`}>{tour.badge}</span>}
                    <img src={tour.image} alt={tour.title} />
                  </div>
                  <div className="TourContent">
                    <div>
                      <div className="TourHeader">
                        <div>
                          <h3 className="TourTitle">{tour.title}</h3>
                          <div className="TourAgency">
                            <FontAwesomeIcon icon={tour.transportIcon || faPlaneDeparture} />
                            {tour.airline ? ` ${tour.airline} | ` : " "}
                            آژانس {tour.agency}
                          </div>
                        </div>
                      </div>
                      <div className="TourMeta">
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faClock} /> {tour.durationNights} شب و {tour.durationDays} روز
                        </div>
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faUtensils} /> {tour.mealPlan}
                        </div>
                        <div className="MetaItem">
                          <FontAwesomeIcon icon={faHotel} /> {tour.hotelStars} ستاره
                        </div>
                      </div>
                    </div>
                    <div className="TourFooter">
                      <div className="Capacity">
                        {typeof tour.capacity === "number" ? (
                          <>
                            <span>{tour.capacity}</span> صندلی باقی‌مانده
                          </>
                        ) : (
                          tour.capacity
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="PriceBox">
                          {tour.originalPrice && (
                            <span className="PriceLabel">{tour.originalPrice.toLocaleString("fa-IR")}</span>
                          )}
                          <span className="PriceValue">
                            {tour.price.toLocaleString("fa-IR")} <span className="Currency">تومان</span>
                          </span>
                        </div>
                        <Link href="/tour/choosed">
                          <button className="BtnBook">رزرو تور</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}