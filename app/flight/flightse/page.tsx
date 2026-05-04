"use client";
import { useState } from "react";
import FiltersSidebar, {
  FilterProvider,
  CheckboxFilter,
} from "../../components/(filters)/Filters";
import "./globals.css";
import Header from "../../components/(Headers)/SecondHeader";
import FormType3 from "../../components/(forms)/FormType3";
type Flight = {
  id: number;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  departureCity: string;
  departureAirport: string;
  departureTerminal: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalAirport: string;
  flightClass: string;
  seatsAvailable: number;
  price: string;
  departureDate: string;
  arrivalDate: string;
  rateClass: string;
  adultPrice: string;
  totalPrice: string;
};

const mockFlights: Flight[] = [
  {
    id: 1,
    airline: "چابهار",
    airlineLogo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
    departureTime: "6:00",
    departureCity: "تهران",
    departureAirport: "مهرآباد",
    departureTerminal: "1",
    arrivalTime: "7:00",
    arrivalCity: "کیش",
    arrivalAirport: "کیش",
    flightClass: "اکونومی",
    seatsAvailable: 6,
    price: "1,802,400",
    departureDate: "سه‌شنبه 2 دی",
    arrivalDate: "چهارشنبه 3 دی",
    rateClass: "Y",
    adultPrice: "3,161,600",
    totalPrice: "3,161,600",
  },
  {
    id: 2,
    airline: "چابهار",
    airlineLogo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
    departureTime: "6:00",
    departureCity: "تهران",
    departureAirport: "مهرآباد",
    departureTerminal: "1",
    arrivalTime: "7:00",
    arrivalCity: "کیش",
    arrivalAirport: "کیش",
    flightClass: "اکونومی",
    seatsAvailable: 6,
    price: "1,802,400",
    departureDate: "سه‌شنبه 2 دی",
    arrivalDate: "چهارشنبه 3 دی",
    rateClass: "Y",
    adultPrice: "3,161,600",
    totalPrice: "3,161,600",
  },
  {
    id: 3,
    airline: "چابهار",
    airlineLogo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
    departureTime: "6:00",
    departureCity: "تهران",
    departureAirport: "مهرآباد",
    departureTerminal: "1",
    arrivalTime: "7:00",
    arrivalCity: "کیش",
    arrivalAirport: "کیش",
    flightClass: "اکونومی",
    seatsAvailable: 6,
    price: "1,802,400",
    departureDate: "سه‌شنبه 2 دی",
    arrivalDate: "چهارشنبه 3 دی",
    rateClass: "Y",
    adultPrice: "3,161,600",
    totalPrice: "3,161,600",
  },
];

export default function FlightPage() {
  const [flights] = useState<Flight[]>(mockFlights);
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleDetails = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const flightSortOptions = [
    { value: "earliest", label: "زود‌ترین زمان" },
    { value: "cheapest", label: "کمترین قیمت" },
  ];

  const flightFilterSections: {
    id: string;
    title: string;
    type: "checkbox" | "custom";
    options?: { value: string; label: string }[];
    customContent?: React.ReactNode;
  }[] = [
    {
      id: "flightClass",
      title: "کلاس پروازی",
      type: "checkbox",
      options: [
        { value: "economy", label: "اکونومی" },
        { value: "business", label: "بیزنس" },
      ],
    },
    {
      id: "departureTime",
      title: "زمان پرواز",
      type: "custom",
      customContent: (
        <div>
          <CheckboxFilter
            filterKey="departureTime"
            options={[
              { value: "0-8", label: "۰۰:۰۰ تا ۰۸:۰۰" },
              { value: "8-18", label: "۰۸:۰۰ تا ۱۸:۰۰" },
              { value: "18-24", label: "۱۸:۰۰ تا ۰۰:۰۰" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "airlines",
      title: "شرکت‌های هواپیمایی",
      type: "checkbox",
      options: [
        { value: "fly-kish", label: "فلای کیش" },
        { value: "fly-persia", label: "فلای پرشیا" },
        { value: "ava-air", label: "آوا ایر" },
      ],
    },
  ];

  return (
    <>
      <Header />
      <FormType3 />
      <FilterProvider>
        <div className="Countainer" style={{ display: "flex", gap: "20px" }}>
          <FiltersSidebar
            title="بلیط هواپیما تهران به کیش"
            resultCount={{ shown: flights.length, total: flights.length }}
            sortOptions={flightSortOptions}
            filterSections={flightFilterSections}
            showNotification={true}
          />

          <div className="Left">
            <div className="Top">
              <div className="Title">ارزان‌ترین قیمت در هر روز</div>
              <div className="Price">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div className="Cards" key={i}>
                    <span>سه‌شنبه 10/2</span>
                    <p>1082 تومان</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="Bottom">
              {flights.map((flight) => {
                const isOpen = openId === flight.id;
                return (
                  <div className="Cards" key={flight.id}>
                    {/* RightCard */}
                    <div className="RightCard">
                      <div className="About">
                        <div className="Icon">
                          <img src={flight.airlineLogo} alt="Airline" />
                          <span>{flight.airline}</span>
                        </div>
                        <div className="Time">
                          <div className="Form">
                            <span>{flight.departureTime}</span>
                            <p>{flight.departureCity}</p>
                          </div>
                          <div className="i">
                            <i className="fa-regular fa-circle-dot"></i>
                            <hr className="line-divider" />
                            <i className="fas fa-plane fa-flip-horizontal"></i>
                          </div>
                          <div className="Form">
                            <span>{flight.arrivalTime}</span>
                            <p>{flight.arrivalCity}</p>
                          </div>
                        </div>
                      </div>

                      <div className="discriptions">
                        <div
                          className="More"
                          onClick={() => toggleDetails(flight.id)}
                        >
                          <span>
                            جزئیات <i className="fa-solid fa-angle-down"></i>
                          </span>
                        </div>
                        <div className="Avablity">
                          <span>{flight.flightClass}</span>
                          <p>{flight.seatsAvailable} صندلی</p>
                        </div>
                      </div>
                    </div>

                    <div className="LeftCard">
                      <div className="Top">
                        <i className="fa-solid fa-bell"></i>
                      </div>
                      <div className="Bottom">
                        <p>
                          <span>{flight.price}</span> تومان
                        </p>
                        <button className="BtnPrimary">رزرو آنلاین</button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="FlightDetails active">
                        <div className="DetailsContent">
                          <div className="row">
                            <div className="title">
                              <p>
                                {flight.departureDate} ← {flight.arrivalDate}{" "}
                                کلاس نرخی {flight.rateClass}
                              </p>
                            </div>
                            <div className="contet">
                              <div className="right">
                                <p>ساعت ورود به فرودگاه:</p>
                                <span>
                                  ساعت حرکت{" "}
                                  <i className="fa-regular fa-clock"></i>:
                                </span>
                                <p>ساعت رسیدن به مقصد:</p>
                              </div>
                              <div className="left">
                                <p>
                                  {flight.departureCity}، فرودگاه{" "}
                                  {flight.departureAirport.toUpperCase()} -
                                  ترمینال {flight.departureTerminal}
                                </p>
                                <span>
                                  {flight.departureTime} - هواپیمای شما
                                </span>
                                <p>
                                  {flight.arrivalTime} - {flight.arrivalCity}،
                                  فرودگاه {flight.arrivalAirport.toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="orw">
                            <div className="top">
                              <p>
                                بزرگسال × 1{" "}
                                <span>{flight.adultPrice} تومان</span>
                              </p>
                              <p>
                                مجموع <span>{flight.totalPrice} تومان</span>
                              </p>
                            </div>
                            <div className="bottom">
                              <button>
                                <i className="fa-solid fa-bell"></i> ارزان شد
                                خبرم کن
                              </button>
                              <button>
                                <i className="fas fa-bolt"></i> ارزان شد رزرو کن
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FilterProvider>
    </>
  );
}
