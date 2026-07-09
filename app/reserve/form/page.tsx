"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlus,
  faArrowLeft,
  faAngleDown,
  faUserClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import HeaderAutoReserve from "../../components/(Headers)/HeaderAutoReserve";
import { useToast } from "../../lib/hooks/useToast";

const PAGE_DATA = {
  passengerCard: {
    title: "ورود اطلاعات مسافران",
    genderOptions: ["آقا", "خانوم"],
    nationalityOptions: [
      { value: "iranian", label: "ایرانی" },
      { value: "foreign", label: "خارجی" },
    ],
    countries: [
      { value: "US", label: "ایالات متحده" },
      { value: "GB", label: "بریتانیا" },
      { value: "DE", label: "آلمان" },
      { value: "FR", label: "فرانسه" },
      { value: "TR", label: "ترکیه" },
      { value: "AE", label: "امارات متحده عربی" },
      { value: "CA", label: "کانادا" },
    ],
    labels: {
      firstName: "نام به انگلیسی",
      lastName: "نام خانوادگی به انگلیسی",
      nationalId: "شماره ملی",
      issuingCountry: "کشور صادرکننده پاسپورت",
      passportNumber: "شماره گذرنامه",
      expiryDate: "تاریخ انقضای گذرنامه",
      birthDate: "تاریخ تولد",
    },
    days: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    months: [
      { value: "1", label: "فروردین" },
      { value: "2", label: "اردیبهشت" },
      { value: "3", label: "خرداد" },
      { value: "4", label: "تیر" },
      { value: "5", label: "مرداد" },
      { value: "6", label: "شهریور" },
      { value: "7", label: "مهر" },
      { value: "8", label: "آبان" },
      { value: "9", label: "آذر" },
      { value: "10", label: "دی" },
      { value: "11", label: "بهمن" },
      { value: "12", label: "اسفند" },
    ],
    miladiMonths: [
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ],
  },
  addPassenger: {
    title: "افزودن مسافر",
    types: [
      { type: "adult", label: "بزرگسال" },
      { type: "child", label: "کودک" },
      { type: "infant", label: "نوزاد" },
    ],
  },
  bill: {
    title: "صورت حساب سفر",
    totalLabel: "مجموع",
    currency: "تومان",
  },
};

const NiksaPassengerInfo = () => {
  const router = useRouter();
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const toast = useToast();
  const uid = useId();

  const [passengers, setPassengers] = useState([
    {
      id: `${uid}-adult-0`,
      type: "adult",
      typeLabel: "بزرگسال",
      gender: "آقا",
      nationality: "iranian",
      issuingCountry: "",
    },
  ]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const showTimeoutModal = timeLeft <= 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddPassenger = (pType: string, pLabel: string) => {
    const adultCount = passengers.filter((p) => p.type === "adult").length;
    const nonAdultCount = passengers.filter((p) => p.type !== "adult").length;

    if (pType === "adult") {
      addNew(pType, pLabel);
    } else {
      // قانون جدید: به ازای هر بزرگسال ۳ همراه (کودک یا نوزاد)
      if (nonAdultCount >= adultCount * 3) {
        toast.warning(
          `به ازای هر بزرگسال حداکثر ۳ همراه مجاز است. شما در حال حاضر ${adultCount} بزرگسال و ${nonAdultCount} همراه دارید. ابتدا بزرگسال جدید اضافه کنید.`,
        );
        return;
      }
      addNew(pType, pLabel);
    }
  };

  const addNew = (type: string, label: string) => {
    setPassengers((prev) => [
      ...prev,
      {
        id: `${uid}-${type}-${prev.length}`,
        type: type,
        typeLabel: label,
        gender: "آقا",
        nationality: "iranian",
        issuingCountry: "",
      },
    ]);
  };

  const updatePassenger = (id: string, field: string, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <HeaderAutoReserve currentStep={3}/>

      {showTimeoutModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center",
              direction: "rtl",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ color: "#d32f2f", marginBottom: "15px" }}>
              زمان شما به پایان رسید!
            </h2>
            <p style={{ color: "#555" }}>
              برای امنیت تراکنش، مهلت رزرو ۱۰ دقیقه می‌باشد.
            </p>
            <button
              onClick={() => router.push("/")}
              style={{
                marginTop: "25px",
                padding: "12px 30px",
                backgroundColor: "#1a73e8",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="Right">
          {passengers.map((passenger, index) => {
            const months =
              passenger.nationality === "foreign"
                ? PAGE_DATA.passengerCard.miladiMonths
                : PAGE_DATA.passengerCard.months;

            return (
            <div className="Card" key={passenger.id}>
              <div className="TopCard">
                <p>{PAGE_DATA.passengerCard.title}</p>
                <div className="Clock">
                  <p>{formatTime(timeLeft)}</p>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>

              <div className="bottomCard">
                <div className="gender">
                  <div className="nationality">
                    <p>
                      {index + 1}. {passenger.typeLabel}
                    </p>
                    <div className="gender-radios">
                      {PAGE_DATA.passengerCard.genderOptions.map((g, idx) => (
                        <label key={idx}>
                          <input
                            type="radio"
                            name={`gender-${passenger.id}`}
                            checked={passenger.gender === g}
                            onChange={() =>
                              updatePassenger(passenger.id, "gender", g)
                            }
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                    <select
                      value={passenger.nationality}
                      onChange={(e) =>
                        updatePassenger(
                          passenger.id,
                          "nationality",
                          e.target.value,
                        )
                      }
                    >
                      {PAGE_DATA.passengerCard.nationalityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="addNew">
                    <FontAwesomeIcon icon={faUserClock} />
                    <p>مسافران قبلی</p>
                    {index > 0 && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          marginRight: "15px",
                          color: "#ff4d4d",
                          cursor: "pointer",
                        }}
                        onClick={() => removePassenger(passenger.id)}
                      />
                    )}
                  </div>
                </div>

                <div className="OtherInoformation">
                  <div className="top">
                    <label>
                      {PAGE_DATA.passengerCard.labels.firstName}
                      <input type="text" placeholder="First Name" />
                    </label>
                    <label>
                      {PAGE_DATA.passengerCard.labels.lastName}
                      <input type="text" placeholder="Last Name" />
                    </label>
                  </div>

                  <div className="bottom">
                    {passenger.nationality === "iranian" ? (
                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.nationalId}
                        <input type="text" placeholder="شماره ملی" />
                      </label>
                    ) : (
                      <label className="CountrySelectors" style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.issuingCountry}
                        <select
                          value={passenger.issuingCountry}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "issuingCountry",
                              e.target.value,
                            )
                          }
                        >
                          <option value="">انتخاب کشور...</option>
                          {PAGE_DATA.passengerCard.countries.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}

                    <label style={{ flex: 1 }}>
                      {PAGE_DATA.passengerCard.labels.birthDate}
                      <div className="dateSelectors">
                        <select>
                          <option value="">روز</option>
                          {PAGE_DATA.passengerCard.days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <select>
                          <option value="">ماه</option>
                          {months.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <input type="number" placeholder="سال" />
                      </div>
                    </label>
                  </div>

                  {passenger.nationality === "foreign" && (
                    <div className="bottom" style={{ marginTop: "10px" }}>
                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.passportNumber}
                        <input type="text" placeholder="Passport Number" />
                      </label>

                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.expiryDate}
                        <div className="dateSelectors">
                          <select>
                            <option value="">روز</option>
                            {PAGE_DATA.passengerCard.days.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <select>
                            <option value="">ماه</option>
                            {months.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          <input type="number" placeholder="سال" />
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
          })}

          <div className="AddMember">
            <p>{PAGE_DATA.addPassenger.title}</p>
            <div className="AddOptions">
              {PAGE_DATA.addPassenger.types.map((t, index) => {
                const adultCount = passengers.filter(
                  (p) => p.type === "adult",
                ).length;
                const nonAdultCount = passengers.filter(
                  (p) => p.type !== "adult",
                ).length;
                const isDisabled =
                  t.type !== "adult" && nonAdultCount >= adultCount * 3;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAddPassenger(t.type, t.label)}
                    style={{
                      opacity: isDisabled ? 0.5 : 1,
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="Card">
            <div className="TopCard">
              <p>اطلاعات تماس</p>
            </div>
            <div className="bottomCard">
              <div className="OtherInoformation">
                <div className="top">
                  <label>
                    تلفن همراه <input type="text" placeholder="0912..." />
                  </label>
                  <label>
                    تلفن ثابت <input type="text" placeholder="021..." />
                  </label>
                </div>
                <div className="bottom">
                  <label>
                    ایمیل <input type="text" placeholder="Email@example.com" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="card2">
            <div className="T" onClick={() => setIsBillOpen(!isBillOpen)}>
              <span>{PAGE_DATA.bill.title}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className={`SeeMore ${isBillOpen ? "active" : ""}`}>
              <div className="MoreDetails" style={{ padding: "15px" }}>
                <div className="Spand">
                  <div className="items">
                    <p>{passengers.length} مسافر</p>
                    <p>9,572,000</p>
                  </div>
                  <div className="items">
                    <p>مجموع</p>
                    <p>
                      9,772,000 <span>{PAGE_DATA.bill.currency}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/reserve/prepay">
              <button>
                تایید و ادامه <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NiksaPassengerInfo;
