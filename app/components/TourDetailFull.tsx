"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faLocationDot,
  faUtensils,
  faPlaneDeparture,
  faPlaneArrival,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FaCar, FaSwimmingPool, FaSink } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SecondHeader from "./(Headers)/SecondHeader";
import FAQSection from "./FAQSection";
import "../tour/tourch/globals.css";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const TEXTS = {
  optionsTitle: "امکانات و ویژگی‌ها",
  itineraryTitle: "برنامه سفر",
  roomsTitle: "هتل‌های محل اقامت در تور",
  rulesTitle: "قوانین و مقررات تور",
  faqTitle: "سوالات متداول",
  durationLabel: "مدت تور",
  flightTypeLabel: "نوع پرواز",

  passengerLabel: "تعداد مسافران",
  adultLabel: "بزرگسال",
  childLabel: "کودک (۲ تا ۱۲ سال)",
  infantLabel: "نوزاد (۰ تا ۲ سال)",
  searchButton: "رزرو و خرید تور",

  closeButton: "بستن",
  weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  monthNames: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  departureFlight: "پرواز رفت",
  returnFlight: "پرواز برگشت",
};

const iconMap: Record<string, ReactNode> = {
  FaCar: <FaCar />,
  FaSwimmingPool: <FaSwimmingPool />,
  FaCartShopping: <FaCartShopping />,
  FaSink: <FaSink />,
};

export type TourDetailData = {
  images: string[];
  options: { icon: string; label: string }[];
  hotelInfoData: {
    title: string;
    rating: number;
    options: string[];
    description: string;
  }[];
  hotelRules: { checkIn: string; checkOut: string; descriptions: string[] };
  faqData: { question: string; answer: string }[];
  hotels: {
    name: string;
    stars: number;
    rate: number;
    price: number;
    priceText: string;
    location: string;
  }[];
  itineraryData: {
    duration: string;
    days: { day: string; title: string; description: string }[];
  };
  tourData: {
    badges: string[];
    title: string;
    priceLabel: string;
    price: number;
    flights: { departure: string; return: string };
  };
};

export default function TourDetailFull({ data }: { data: TourDetailData }) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const images = data.images;
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const maxChildrenInfants = 3 * adults;
  const totalChildrenInfants = children + infants;

  const handleIncrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults") setAdults((prev) => prev + 1);
    if (type === "children") {
      if (totalChildrenInfants < maxChildrenInfants)
        setChildren((prev) => prev + 1);
    }
    if (type === "infants") {
      if (totalChildrenInfants < maxChildrenInfants)
        setInfants((prev) => prev + 1);
    }
  };

  const handleDecrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults") {
      setAdults((prev) => {
        const newAdult = Math.max(0, prev - 1);
        if (newAdult < prev) {
          const newMax = 3 * newAdult;
          if (totalChildrenInfants > newMax) {
            let newInfant = infants;
            let newChild = children;
            const excess = totalChildrenInfants - newMax;
            if (newInfant > 0) {
              const reduceInfant = Math.min(newInfant, excess);
              newInfant -= reduceInfant;
              const remainingExcess = excess - reduceInfant;
              if (remainingExcess > 0) newChild -= remainingExcess;
            } else {
              newChild -= excess;
            }
            setInfants(newInfant);
            setChildren(newChild);
          }
        }
        return newAdult;
      });
    }
    if (type === "children" && children > 0) setChildren((prev) => prev - 1);
    if (type === "infants" && infants > 0) setInfants((prev) => prev - 1);
  };





  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("tourName", data.tourData.title);
    searchParams.set("adults", adults.toString());
    searchParams.set("children", children.toString());
    searchParams.set("infants", infants.toString());
    searchParams.set("price", data.tourData.price.toString());
    router.push(`/tour/reserve/form?${searchParams.toString()}`);
  };

  return (
    <>
      <SecondHeader />
      <div className="container26">
        <div className="right">
          <div className="Card">
            <div className="MainImg" style={{ position: "relative" }}>
              <Image
                src={images[current]}
                width={790}
                height={430}
                alt="main"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <button onClick={prevImage} className="nav prev">
                ‹
              </button>
              <button onClick={nextImage} className="nav next">
                ›
              </button>
            </div>

            <div className="MoreImg">
              {images.map((img, idx) => (
                <div key={idx} onClick={() => setCurrent(idx)}>
                  <Image src={img} width={129} height={73} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="Options">
            <h4>{TEXTS.optionsTitle}</h4>
            <div className="Card">
              {data.options.map((opt, idx) => (
                <div className="Option" key={idx}>
                  {iconMap[opt.icon]}
                  <p>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ItinerarySection">
            <h4>
              {TEXTS.itineraryTitle} ({data.itineraryData.duration})
            </h4>
            <div className="Card ItineraryCard">
              {data.itineraryData.days.map((day, index) => (
                <div className="DayItem" key={index}>
                  <div className="DayMarker">{day.day}</div>
                  <div className="DayContent">
                    <h5>{day.title}</h5>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="Rooms">
            <h4>{TEXTS.roomsTitle}</h4>
            {data.hotelInfoData.map((hotel, index) => (
              <div className="Card HotelListItem" key={index}>
                <div className="Top">
                  <div className="Title">
                    <p>
                      {hotel.title} <FontAwesomeIcon icon={faStar} />{" "}
                      {hotel.rating}
                    </p>
                  </div>
                </div>
                <div className="HotelDetails">
                  <div className="Options Mini">
                    {hotel.options.map((option, i) => (
                      <div className="Option" key={i}>
                        <FontAwesomeIcon
                          icon={i === 0 ? faLocationDot : faUtensils}
                        />{" "}
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="Desc">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="Rules">
            <h4>{TEXTS.rulesTitle}</h4>
            <div className="Card">
              <div className="Time">
                <div className="Value">
                  <p>{TEXTS.durationLabel}</p>
                  <span>
                    {data.hotelRules.checkIn}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
                <div className="Value">
                  <p>{TEXTS.flightTypeLabel}</p>
                  <span>
                    {data.hotelRules.checkOut}
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                </div>
              </div>
              <div className="rule">
                {data.hotelRules.descriptions.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          </div>

          <FAQSection title={TEXTS.faqTitle} faqData={data.faqData} />
        </div>

        <div className="left">
          <div className="Card">
            <div className="rating">
              <div className="Stars">
                <div className="Wth">
                  {data.tourData.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`Badge ${
                        i === 0 ? "TourBadge" : "CharterBadge"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <p>{data.tourData.title}</p>
              <div className="titel">
                <p>{data.tourData.priceLabel}</p>
                <p>
                  <span>{data.tourData.price.toLocaleString()}</span> تومان
                </p>
              </div>
            </div>

            <div className="price">
              <div className="text">
                <FontAwesomeIcon icon={faPlaneDeparture} />
                <p>
                  {TEXTS.departureFlight}: {data.tourData.flights.departure}
                </p>
              </div>
              <div className="text">
                <FontAwesomeIcon icon={faPlaneArrival} />
                <p>
                  {TEXTS.returnFlight}: {data.tourData.flights.return}
                </p>
              </div>
            </div>
          </div>

          <div className="Card LeftFilterCard">
              <div className="PassengerFilter">
                <p>{TEXTS.passengerLabel}</p>
                <div className="PassengerControl">
                  <div className="ControlGroup">
                    <label>{TEXTS.adultLabel}</label>
                    <div className="Counter">
                      <button
                        className="Minus"
                        onClick={() => handleDecrement("adults")}
                        disabled={adults <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{adults}</span>
                      <button
                        className="Plus"
                        onClick={() => handleIncrement("adults")}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="ControlGroup">
                    <label>{TEXTS.childLabel}</label>
                    <div className="Counter">
                      <button
                        className="Minus"
                        onClick={() => handleDecrement("children")}
                        disabled={children <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{children}</span>
                      <button
                        className="Plus"
                        onClick={() => handleIncrement("children")}
                        disabled={totalChildrenInfants >= maxChildrenInfants}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="ControlGroup">
                    <label>{TEXTS.infantLabel}</label>
                    <div className="Counter">
                      <button
                        className="Minus"
                        onClick={() => handleDecrement("infants")}
                        disabled={infants <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{infants}</span>
                      <button
                        className="Plus"
                        onClick={() => handleIncrement("infants")}
                        disabled={totalChildrenInfants >= maxChildrenInfants}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="Btn1" onClick={handleSearch}>
                {TEXTS.searchButton}
              </button>
            </div>
        </div>
      </div>

    </>
  );
}
