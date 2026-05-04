"use client";
import { useState } from "react";
import FiltersSidebar, {
  FilterProvider,
  CheckboxFilter,
} from "../../components/(filters)/Filters";
import "../globals.css";
import Header from "../../components/(Headers)/SecondHeader";
import FormType3 from "../../components/(forms)/FormType3";

export default function HotelResultPage() {
  type Tour = {
    id: number;
    title: string;
    destination: string;
    image: string;
    badge?: string;
    agency: string;
    flightFrom?: string;
    duration: string;
    meals: string;
    stars: number;
    capacity?: number;
    price?: string;
    originalPrice?: string;
    PorShode?:number;
  };
  const mockTours: Tour[] = [
    {
      id: 1,
      title: "تور استانبول ویژه تابستان",
      destination: "استانبول",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9M1CPPBnA9KXnIHSImn0mOnvvgxItn5IrQ&s",
      badge: "اقتصادی",
      agency: "آژانس پارس گشت",
      flightFrom: "تهران",
      duration: "5 شب و 6 روز",
      meals: "صبحانه و ناهار",
      stars: 4,
      capacity: 20,
      PorShode:18,
      price: "12,500,000",
      originalPrice: "15,000,000",
    },
    {
      id: 2,
      title: "تور دبی با پرواز امارات",
      destination: "دبی",
      badge: "ویژه",
      image:
        "https://www.eligasht.com/Blog/wp-content/uploads/2019/08/%D8%A7%D9%85%D8%A7%D8%B1%D8%A7%D8%AA.jpg",
      agency: "آژانس آسمان آبی",
      flightFrom: "تهران",
      duration: "4 شب و 5 روز",
      meals: "صبحانه",
      stars: 5,
      capacity:20,
      PorShode:0,
      price: "18,000,000",
    },
    {
      id: 3,
      title: "تور پاریس نوروز 1405",
      destination: "پاریس",
      badge: "عیدی",
      image:
        "https://safarmarket.com/data/uploaded_files/2022-05/2a3a36b7d3963169.jpg",
      agency: "آژانس آسمان آبی",
      flightFrom: "تهران",
      duration: "5 شب و 6 روز",
      meals: "صبحانه و ناهار",
      stars: 5,
      capacity: 15,
      PorShode:15,
      price: "122,000,000",
    },
    {
      id: 4,
      title: "تور بانکوک ویژه تابستان",
      destination: "بانکوک",
      image: "https://ramaparvaz.com/wp-content/uploads/2024/01/bankok-77.jpg",
      agency: "آژانس پارس گشت",
      flightFrom: "تهران",
      duration: "5 شب و 6 روز",
      meals: "صبحانه و ناهار",
      stars: 4,
      capacity: 20,
      PorShode:16,
      price: "98,000,000",
    },
  ];

  const tourSortOptions = [
    { value: "earliest", label: "زودترین تاریخ" },
    { value: "cheapest", label: "کمترین قیمت" },
    { value: "longest", label: "طولانی‌ترین تور" },
  ];
  const tourFilterSections: {
    id: string;
    title: string;
    type: "checkbox" | "custom";
    options?: { value: string; label: string }[];
    customContent?: React.ReactNode;
  }[] = [
    {
      id: "tourType",
      title: "نوع تور",
      type: "checkbox",
      options: [
        { value: "domestic", label: "داخلی" },
        { value: "international", label: "خارجی" },
      ],
    },
    {
      id: "tourDuration",
      title: "مدت تور",
      type: "custom",
      customContent: (
        <div>
          <CheckboxFilter
            filterKey="tourDuration"
            options={[
              { value: "1-3", label: "۱ تا ۳ روز" },
              { value: "4-7", label: "۴ تا ۷ روز" },
              { value: "8-14", label: "۸ تا ۱۴ روز" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "tourOperators",
      title: "شرکت برگزارکننده",
      type: "checkbox",
      options: [
        { value: "travel-co", label: "شرکت سفر" },
        { value: "holiday-inc", label: "هالیدی اینک" },
        { value: "explore-world", label: "اکسپلور ورلد" },
      ],
    },
    {
      id: "priceRange",
      title: "بازه قیمت",
      type: "custom",
      customContent: (
        <div>
          <CheckboxFilter
            filterKey="priceRange"
            options={[
              { value: "0-500", label: "۰ تا ۵۰۰ هزار تومان" },
              { value: "500-1000", label: "۵۰۰ هزار تا ۱ میلیون" },
              { value: "1000+", label: "بیش از ۱ میلیون" },
            ]}
          />
        </div>
      ),
    },
  ];
  const colors = [
    "tomato",
    "green",
    "var(--gold)",
    "var(--goldDark)",
    "var(--goldText)",
  ];
  return (
    <>
      <Header />
      <FormType3 />
      <FilterProvider>
        <div className="Countainer" style={{ display: "flex", gap: "20px" }}>
          {/* Sidebar filters */}
          <FiltersSidebar
            title="تور تهران به کیش"
            resultCount={{ shown: mockTours.length, total: mockTours.length }}
            sortOptions={tourSortOptions}
            filterSections={tourFilterSections}
            showNotification={true}
          />
          <div className="Left">
            {/* Tour cards */}
            {mockTours.map((tour) => (
              <div className="TourCard" key={tour.id}>
                <div className="TourImage">
                  {tour.badge && (
                    <span
                      className="Badge"
                      style={{
                        backgroundColor:
                          colors[Math.floor(Math.random() * colors.length)],
                      }}
                    >
                      {tour.badge}
                    </span>
                  )}
                  <img src={tour.image} alt={tour.title} />
                </div>
                <div className="TourContent">
                  <div>
                    <div className="TourHeader">
                      <div>
                        <h3 className="TourTitle">{tour.title}</h3>
                        <div className="TourAgency">
                          {tour.flightFrom && (
                            <i className="fa-solid fa-plane-departure"></i>
                          )}{" "}
                          {tour.flightFrom} | {tour.agency}
                        </div>
                      </div>
                    </div>
                    <div className="TourMeta">
                      <div className="MetaItem">
                        <i className="fa-regular fa-clock"></i> {tour.duration}
                      </div>
                      <div className="MetaItem">
                        <i className="fa-solid fa-utensils"></i> {tour.meals}
                      </div>
                      <div className="MetaItem">
                        <i className="fa-solid fa-hotel"></i> {tour.stars} ستاره
                      </div>
                    </div>
                  </div>
                  <div className="TourFooter">
                    <div className="Capacity">
                      <strong style={{paddingLeft:"10px"}}>ظرفیت:</strong>
                      {typeof tour.capacity === "number" ? (
                        <span>{tour.PorShode} نفر از</span>
                      ) : null}{" "}
                      <span>{tour.capacity} نفر </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="PriceBox">
                        {tour.originalPrice && (
                          <span className="PriceLabel">
                            {tour.originalPrice}
                          </span>
                        )}
                        <span className="PriceValue">
                          {tour.price} <span className="Currency">تومان</span>
                        </span>
                      </div>
                      <button className="BtnBook">رزرو تور</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FilterProvider>
    </>
  );
}
