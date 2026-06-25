"use client";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faStar,
  faLocationDot,
  faFaceSmile,
  faClock,
  faBan,
  faCheck,
  faWifi,
  faCar,
  faSwimmingPool,
  faUtensils,
  faParking,
} from "@fortawesome/free-solid-svg-icons";

export interface HotelDetail {
  id: number;
  name: string;
  image: string;
  stars: number;
  location: string;
  rating: number;
  pricePerNight: number;
  facilities: string[];
  roomType?: "standard" | "luxury";
  checkInStartHour?: number;
  checkInEndHour?: number;
  checkOutStartHour?: number;
  checkOutEndHour?: number;
  brand?: string;
  isCancelable?: boolean;
}

interface Props {
  hotel: HotelDetail | null;
  onClose: () => void;
  onSelectRoom?: (hotelId: number) => void;
}

const facilityIcons: Record<string, any> = {
  "اینترنت رایگان": faWifi,
  "ترانسفر رایگان": faCar,
  استخر: faSwimmingPool,
  "صبحانه رایگان": faUtensils,
  پارکینگ: faParking,
};

export default function HotelDetailModal({
  hotel,
  onClose,
  onSelectRoom,
}: Props) {
  useEffect(() => {
    if (hotel) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hotel]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!hotel) return null;

  return (
    <div className="hotelModalOverlay" onClick={onClose}>
      <div className="hotelModal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="بستن">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="modalHero">
          <img src={hotel.image} alt={hotel.name} />
          <div className="modalHeroOverlay">
            <h2>{hotel.name}</h2>
            <div className="modalMeta">
              <span>
                {Array(hotel.stars)
                  .fill(0)
                  .map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
              </span>
              <span>
                <FontAwesomeIcon icon={faLocationDot} /> {hotel.location}
              </span>
              <span>
                {hotel.rating}/10 <FontAwesomeIcon icon={faFaceSmile} />
              </span>
            </div>
          </div>
        </div>

        <div className="modalBody">
          <div className="modalSection">
            <h3>درباره هتل</h3>
            <p>
              هتل {hotel.name} با {hotel.stars} ستاره در موقعیت {hotel.location}{" "}
              قرار دارد.
              {hotel.brand && (
                <>
                  {" "}
                  این هتل از گروه <strong>{hotel.brand}</strong> بوده
                </>
              )}
              {hotel.roomType && (
                <>
                  {" "}
                  و اتاق‌های{" "}
                  <strong>
                    {hotel.roomType === "luxury" ? "لوکس" : "استاندارد"}
                  </strong>{" "}
                  ارائه می‌دهد.
                </>
              )}
            </p>
          </div>

          {hotel.facilities?.length > 0 && (
            <div className="modalSection">
              <h3>امکانات هتل</h3>
              <div className="facilitiesGrid">
                {hotel.facilities.map((fac) => (
                  <div key={fac} className="facilityItem">
                    <FontAwesomeIcon icon={facilityIcons[fac] || faCheck} />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hotel.checkInStartHour !== undefined && (
            <div className="modalSection">
              <h3>قوانین ورود و خروج</h3>
              <div className="timeRules">
                <div className="timeRule">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <strong>ساعت ورود</strong>
                    <span>
                      {hotel.checkInStartHour}:00 تا {hotel.checkInEndHour}:00
                    </span>
                  </div>
                </div>
                <div className="timeRule">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <strong>ساعت خروج</strong>
                    <span>
                      {hotel.checkOutStartHour}:00 تا {hotel.checkOutEndHour}:00
                    </span>
                  </div>
                </div>
                {hotel.isCancelable !== undefined && (
                  <div className="timeRule">
                    {hotel.isCancelable ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#22c55e" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBan}
                        style={{ color: "#ef4444" }}
                      />
                    )}
                    <div>
                      <strong>قانون کنسلی</strong>
                      <span>
                        {hotel.isCancelable
                          ? "قابل کنسلی رایگان"
                          : "غیرقابل کنسلی"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="modalFooter">
            <div className="modalPrice">
              <small>قیمت هر شب</small>
              <strong>
                {hotel.pricePerNight.toLocaleString("fa-IR")} تومان
              </strong>
            </div>
            <button
              className="selectRoomBtn"
              onClick={() => onSelectRoom?.(hotel.id)}
            >
              انتخاب و رزرو اتاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
