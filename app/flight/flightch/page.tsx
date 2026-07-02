"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlus,
  faUserClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./globals.css";
import HeaderAutoReserve from "../../components/(Headers)/HeaderAutoReserve";
import { useToast } from "../../lib/hooks/useToast";

interface PassengerData {
  id: number;
  type: string;
  typeLabel: string;
  gender: string;
  nationality: string;
  issuingCountry: string;
}

const PAGE_DATA = {
  timeoutModal: {
    title: "زمان شما به پایان رسید!",
    message: "برای امنیت تراکنش، مهلت رزرو ۱۰ دقیقه می‌باشد.",
    buttonText: "متوجه شدم",
  },
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
    placeholders: {
      firstName: "First Name",
      lastName: "Last Name",
      nationalId: "شماره ملی",
      passportNumber: "Passport Number",
      issuingCountry: "انتخاب کشور...",
      year: "سال",
      day: "روز",
      month: "ماه",
    },
    previousPassengersLabel: "مسافران قبلی",
  },
  addPassenger: {
    title: "افزودن مسافر",
    types: [
      { type: "adult", label: "بزرگسال" },
      { type: "child", label: "کودک" },
      { type: "infant", label: "نوزاد" },
    ],
    alertMessage:
      "به ازای هر بزرگسال حداکثر ۳ همراه مجاز است. شما در حال حاضر {adultCount} بزرگسال و {nonAdultCount} همراه دارید. ابتدا بزرگسال جدید اضافه کنید.",
  },
  contactInfo: {
    title: "اطلاعات تماس",
    mobileLabel: "تلفن همراه",
    mobilePlaceholder: "0912...",
    phoneLabel: "تلفن ثابت",
    phonePlaceholder: "021...",
    emailLabel: "ایمیل",
    emailPlaceholder: "Email@example.com",
  },
  flightInfo: {
    originCity: "تهران",
    destinationCity: "تهران",
    departureTime: "6:00",
    arrivalTime: "7:00",
    penaltyText: "قوانین جریمه و استرداد",
    charterBadge: "چارتری",
    dotCount: 28,
    airplaneIcon: "✈",
  },
  billCard: {
    title: "صورتحساب",
  },
  confirmButton: {
    text: "تایید و ادامه",
    arrow: "←",
  },
  timeFormat: {
    label: "زمان باقیمانده",
  },
};

const NiksaPassengerInfo = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(600);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const toast = useToast();

  const [passengers, setPassengers] = useState<PassengerData[]>([
    {
      id: Date.now(),
      type: "adult",
      typeLabel: "بزرگسال",
      gender: "آقا",
      nationality: "iranian",
      issuingCountry: "",
    },
  ]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimeoutModal(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
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
      if (nonAdultCount >= adultCount * 3) {
        toast.warning(
          PAGE_DATA.addPassenger.alertMessage
            .replace("{adultCount}", adultCount.toString())
            .replace("{nonAdultCount}", nonAdultCount.toString()),
        );
        return;
      }
      addNew(pType, pLabel);
    }
  };

  const addNew = (type: string, label: string) => {
    setPassengers([
      ...passengers,
      {
        id: Date.now() + Math.random(),
        type: type,
        typeLabel: label,
        gender: "آقا",
        nationality: "iranian",
        issuingCountry: "",
      },
    ]);
  };

  const updatePassenger = (id: number, field: keyof PassengerData, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <HeaderAutoReserve currentStep={3} />

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
              {PAGE_DATA.timeoutModal.title}
            </h2>
            <p style={{ color: "#555" }}>{PAGE_DATA.timeoutModal.message}</p>
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
              {PAGE_DATA.timeoutModal.buttonText}
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="Right">
          {passengers.map((passenger, index) => (
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
                    <p>{PAGE_DATA.passengerCard.previousPassengersLabel}</p>
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
                      <input
                        type="text"
                        placeholder={
                          PAGE_DATA.passengerCard.placeholders.firstName
                        }
                      />
                    </label>
                    <label>
                      {PAGE_DATA.passengerCard.labels.lastName}
                      <input
                        type="text"
                        placeholder={
                          PAGE_DATA.passengerCard.placeholders.lastName
                        }
                      />
                    </label>
                  </div>

                  <div className="bottom">
                    {passenger.nationality === "iranian" ? (
                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.nationalId}
                        <input
                          type="text"
                          placeholder={
                            PAGE_DATA.passengerCard.placeholders.nationalId
                          }
                        />
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
                          <option value="">
                            {PAGE_DATA.passengerCard.placeholders
                              .issuingCountry || "انتخاب کشور..."}
                          </option>
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
                          <option value="">
                            {PAGE_DATA.passengerCard.placeholders.day}
                          </option>
                          {PAGE_DATA.passengerCard.days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <select>
                          <option value="">
                            {PAGE_DATA.passengerCard.placeholders.month}
                          </option>
                          {PAGE_DATA.passengerCard.months.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder={
                            PAGE_DATA.passengerCard.placeholders.year
                          }
                        />
                      </div>
                    </label>
                  </div>

                  {passenger.nationality === "foreign" && (
                    <div className="bottom" style={{ marginTop: "10px" }}>
                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.passportNumber}
                        <input
                          type="text"
                          placeholder={
                            PAGE_DATA.passengerCard.placeholders.passportNumber
                          }
                        />
                      </label>

                      <label style={{ flex: 1 }}>
                        {PAGE_DATA.passengerCard.labels.expiryDate}
                        <div className="dateSelectors">
                          <select>
                            <option value="">
                              {PAGE_DATA.passengerCard.placeholders.day}
                            </option>
                            {PAGE_DATA.passengerCard.days.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <select>
                            <option value="">
                              {PAGE_DATA.passengerCard.placeholders.month}
                            </option>
                            {PAGE_DATA.passengerCard.months.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder={
                              PAGE_DATA.passengerCard.placeholders.year
                            }
                          />
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

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
              <p>{PAGE_DATA.contactInfo.title}</p>
            </div>
            <div className="bottomCard">
              <div className="OtherInoformation">
                <div className="top">
                  <label>
                    {PAGE_DATA.contactInfo.mobileLabel}
                    <input
                      type="text"
                      placeholder={PAGE_DATA.contactInfo.mobilePlaceholder}
                    />
                  </label>
                  <label>
                    {PAGE_DATA.contactInfo.phoneLabel}
                    <input
                      type="text"
                      placeholder={PAGE_DATA.contactInfo.phonePlaceholder}
                    />
                  </label>
                </div>
                <div className="bottom">
                  <label>
                    {PAGE_DATA.contactInfo.emailLabel}
                    <input
                      type="text"
                      placeholder={PAGE_DATA.contactInfo.emailPlaceholder}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left">
          <div className="card1">
            <div className="top">
              <div className="Time">
                <div className="Form">
                  <span>{PAGE_DATA.flightInfo.departureTime}</span>
                  <p>{PAGE_DATA.flightInfo.originCity}</p>
                </div>
                <div className="i">
                  {Array.from({ length: PAGE_DATA.flightInfo.dotCount }).map(
                    (_, idx) => (
                      <span key={idx}>•</span>
                    ),
                  )}
                  <span>{PAGE_DATA.flightInfo.airplaneIcon}</span>
                </div>
                <div className="Form">
                  <span>{PAGE_DATA.flightInfo.arrivalTime}</span>
                  <p>{PAGE_DATA.flightInfo.destinationCity}</p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <p>{PAGE_DATA.flightInfo.penaltyText}</p>
              <div className="Avablity">
                <span>{PAGE_DATA.flightInfo.charterBadge}</span>
              </div>
            </div>
          </div>
          <div className="card2">
            <span>{PAGE_DATA.billCard.title}</span>
          </div>
          <button>
            {PAGE_DATA.confirmButton.text}{" "}
            <span>{PAGE_DATA.confirmButton.arrow}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NiksaPassengerInfo;
