"use client";
import { useState } from "react";
import FiltersSidebar, {
  FilterProvider,
  CheckboxFilter,
} from "../../components/(filters)/Filters";
import "../globals.css";
import Header from "../../components/(Headers)/SecondHeader";
import Form from "../../components/(forms)/FormType4";

export default function HotelResultPage() {
  type Hotel = {
    id: number;
    name: string;
    image: string;
    stars: number;
    location: string;
    transfer: boolean;
    breackfast: boolean;
    launch: boolean;
    score: number;
    price: string;
  };

  const mockHotels: Hotel[] = [
    {
      id: 1,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: true,
      breackfast: false,
      launch: true,
      score: 6.8,
      price: "9,215,000",
    },
    {
      id: 2,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
    {
      id: 3,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
    {
      id: 4,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
    {
      id: 2,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
    {
      id: 5,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
    {
      id: 6,
      name: "هتل پارسیان استقلال",
      image:
        "https://img.mstatic.ir/KxN0ytL9WwJPugzyoXEDDpysgZVOuu1lfo_DNH95seY/gravity:nowe:177:70/crop:1650:923/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzFjYjg4NWJiYTFmMjRlNzFiM2Q4YTliYmE5YmY0Mzhl.jpg",
      stars: 5,
      location: "محله آرارات",
      transfer: false,
      breackfast: true,
      launch: true,
      score: 7.2,
      price: "8,500,000",
    },
  ];

  const hotelSortOptions = [
    { value: "lowestPrice", label: "کمترین قیمت" },
    { value: "highestRating", label: "بیشترین امتیاز" },
  ];

  const hotelFilterSections: {
    id: string;
    title: string;
    type: "checkbox" | "custom";
    options?: { value: string; label: string }[];
    customContent?: React.ReactNode;
  }[] = [
    {
      id: "roomType",
      title: "نوع اتاق",
      type: "checkbox",
      options: [
        { value: "single", label: "یک نفره" },
        { value: "double", label: "دو نفره" },
        { value: "suite", label: "سوئیت" },
      ],
    },
    {
      id: "priceRange",
      title: "محدوده قیمت",
      type: "custom",
      customContent: (
        <div>
          <CheckboxFilter
            filterKey="priceRange"
            options={[
              { value: "0-500", label: "۰ تا ۵۰۰ هزار تومان" },
              { value: "500-1000", label: "۵۰۰ تا ۱۰۰۰ هزار تومان" },
              { value: "1000+", label: "بیشتر از ۱ میلیون تومان" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "stars",
      title: "رده ستاره",
      type: "checkbox",
      options: [
        { value: "3", label: "۳ ستاره" },
        { value: "4", label: "۴ ستاره" },
        { value: "5", label: "۵ ستاره" },
      ],
    },
    {
      id: "amenities",
      title: "امکانات",
      type: "checkbox",
      options: [
        { value: "wifi", label: "Wi-Fi" },
        { value: "pool", label: "استخر" },
        { value: "parking", label: "پارکینگ" },
        { value: "breakfast", label: "صبحانه رایگان" },
      ],
    },
  ];

  return (
    <>
      <Header />
      <Form />
      <FilterProvider>
        <div className="Countainer" style={{ display: "flex", gap: "20px" }}>
          <FiltersSidebar
            title="هتل‌های تهران"
            resultCount={{ shown: mockHotels.length, total: mockHotels.length }}
            sortOptions={hotelSortOptions}
            filterSections={hotelFilterSections}
            showNotification={true}
          />
          <div className="Left">
            {mockHotels.map((hotel) => (
              <div className="MediaElementHotel" key={hotel.id}>
                <img src={hotel.image} alt={hotel.name} />
                <div className="Down">
                  <p>{hotel.name}</p>
                  <div className="rating">
                    <div className="Stars">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#ffcd11" }}
                          key={i}
                        ></i>
                      ))}
                      <span>{hotel.stars}ستاره</span>
                      <p>
                        <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                        {hotel.location}
                      </p>
                    </div>
                    <div className="AdditionalOptions">
                      {hotel.transfer && <span>ترانسفر رایگان </span>}
                      {hotel.breackfast && <span>صبحانه </span>}
                      {hotel.launch && <span>ناهار </span>}
                    </div>
                    <div className="SmilyFace">
                      <p>
                        {hotel.score}/10{" "}
                        <i className="fa-regular fa-face-smile"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <div className="titel">
                    <p>قیمت 1 شب اتاق 1 تخته</p>
                  </div>
                  <div className="Choose">
                    <p>
                      <span>{hotel.price}</span> تومان
                    </p>
                    <button>انتخاب اتاق</button>
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
