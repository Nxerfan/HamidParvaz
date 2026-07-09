"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface TourData {
  id: number;
  slug: string;
  title: string;
  destination: string;
  hotelStars: number;
  price: number;
  image: string;
  description?: string;
}

interface HotelListItem {
  id: number;
  name: string;
  stars: number;
  rate: number;
  price: number;
  priceText: string;
  location: string;
  image: string;
  description?: string;
  hotelStars: number;
  slug: string;
}

export default function HotelListPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hotels, setHotels] = useState<HotelListItem[]>([]);

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data: TourData[]) => {
        setHotels(
          data.map((tour) => ({
            id: tour.id,
            name: tour.title,
            stars: tour.hotelStars,
            rate: 8.5,
            price: tour.price / 10000,
            priceText: "قیمت 1 شب اتاق 1 تخشت",
            location: tour.destination,
            image: tour.image,
            description: tour.description,
            hotelStars: tour.hotelStars,
            slug: tour.slug,
          })),
        );
      })
      .catch(() => setHotels([]));
  }, []);

  return (
    <div className="container26">
      <div className="right">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="Card"
            onClick={() => router.push(`/hotel/hotelch?id=${hotel.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="rating">
              <div className="Stars">
                <div className="Wth">
                  {Array(hotel.stars)
                    .fill(0)
                    .map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  <span>{hotel.stars} ستاره</span>
                </div>
                <div className="Rate">
                  <p>
                    {hotel.rate}/10 😎
                  </p>
                </div>
              </div>
              <h3>{hotel.name}</h3>
              <div className="titel">
                <p>{hotel.priceText}</p>
                <p>
                  <span>{hotel.price.toLocaleString()}</span> تومان
                </p>
              </div>
            </div>
            <div className="price">
              <div className="text">
                <p>{hotel.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="left">
        <button
          className="Btn1"
          onClick={() => setExpanded("details")}
        >
          دیدن جزئیات هتل
        </button>
      </div>
      {expanded === "details" && (
        <div className="modal">
          <button
            className="close-btn"
            onClick={() => setExpanded(null)}
          >
            ×
          </button>
          <h2>جزئیات هتل</h2>
          <p>این بخش محتوای خاص دکمه &apos;دیدن جزئیات هتل&apos; را نمایش می&apos;دهد.</p>
          <p>این دکمه قابل کلیک نیست و فقط دارای محتوای خاص خود است.</p>
        </div>
      )}
    </div>
  );
}
