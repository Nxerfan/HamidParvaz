"use client";

import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { usePassengersContext } from "../../../lib/PassengerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlus,
  faArrowLeft,
  faAngleDown,
  faTrash,
  faChevronDown,
  faUsers,
  faPlane,
  faCalendarAlt,
  faMoon,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import "../../../reserve/global.css";
import HeaderBuyRoom from "../../../components/(Headers)/HeaderBuyRoom";
import { useToast } from "../../../lib/hooks/useToast";

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
  rules: [
    {
      title: "جریمه کنسلی و قوانین (نوزاد)",
      content:
        "کنسلی بلیط نوزاد تا ۲۴ ساعت قبل از پرواز با کسر ۱۰٪ جریمه قابل انجام است. پس از آن ۵۰٪ مبلغ بلیط کسر می‌شود. استرداد وجه حداکثر ۷۲ ساعت کاری بعد از درخواست به حساب واریز می‌گردد.",
    },
    {
      title: "جریمه کنسلی و قوانین (کودک)",
      content:
        "کنسلی بلیط کودک تا ۴۸ ساعت قبل از پرواز با کسر ۱۵٪ جریمه انجام می‌شود. بین ۴۸ تا ۲۴ ساعت قبل ۳۰٪ و کمتر از ۲۴ ساعت ۶۰٪ جریمه اعمال می‌گردد. تغییر تاریخ با پرداخت ۲۰٪ مبلغ جدید امکان‌پذیر است.",
    },
    {
      title: "جریمه کنسلی و قوانین (بزرگسال)",
      content:
        "قوانین کنسلی بزرگسال به شرح زیر است: کنسلی تا ۷۲ ساعت قبل ۵٪، ۷۲ تا ۴۸ ساعت قبل ۱۵٪، ۴۸ تا ۲۴ ساعت قبل ۳۰٪ و کمتر از ۲۴ ساعت ۷۵٪ جریمه دارد. تغییر تاریخ تا ۴۸ ساعت قبل با ۱۰٪ کارمزد امکان‌پذیر است.",
    },
    {
      title: "قوانین حمل بار",
      content:
        "بار مجاز برای این پرواز ۲۰ کیلوگرم می‌باشد. بار اضافه تا ۵ کیلوگرم با پرداخت ۵۰٪ مبلغ پایه و بیش از آن با محاسبه ۱۰۰٪ مبلغ پایه به ازای هر کیلوگرم امکان‌پذیر است. ابعاد چمدان نباید از ۱۵۸ سانتی‌متر مجموع اضلاع بیشتر باشد.",
    },
  ],
  bill: {
    title: "صورت حساب سفر",
    totalLabel: "مجموع",
    currency: "تومان",
    pricePerPassenger: "9,572,000",
    totalPrice: "9,772,000",
    passengerCountLabel: "مسافر",
  },
  contactInfo: {
    title: "اطلاعات تماس",
    mobilePlaceholder: "0912...",
    phonePlaceholder: "021...",
    emailPlaceholder: "Email@example.com",
  },
  flightSummary: {
    originTime: "6:00",
    originCity: "تهران",
    destTime: "7:00",
    destCity: "تهران",
    rules: "قوانین جریمه و استرداد",
    charter: "چارتری",
  },
  timeoutModal: {
    title: "زمان شما به پایان رسید!",
    text: "برای امنیت تراکنش، مهلت رزرو ۱۰ دقیقه می‌باشد.",
    btnText: "متوجه شدم",
  },
  prevPassengers: "مسافران قبلی",
  continueBtn: "تایید و ادامه",
};

const NiksaPassengerInfo = () => {
  const router = useRouter();
  const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [activeRuleIndex, setActiveRuleIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [contactMobile, setContactMobile] = useState("");
  const nextPassengerId = useRef(1);
  const toast = useToast();

  const {
    passengers: savedPassengers,
    addPassenger,
    updatePassenger: updateSavedPassenger,
    getPassengerById,
    removePassenger: removeSavedPassenger,
  } = usePassengersContext();
  const [selectedSavedIds, setSelectedSavedIds] = useState<
    Record<number, string>
  >({});

  const [passengers, setPassengers] = useState([
    {
      id: 0,
      type: "adult",
      typeLabel: "بزرگسال",
      gender: "آقا",
      nationality: "iranian",
      issuingCountry: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      passportNumber: "",
      expiryDay: "",
      expiryMonth: "",
      expiryYear: "",
    },
  ]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const id = setTimeout(() => setShowTimeoutModal(true), 0);
      return () => clearTimeout(id);
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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
    const id = nextPassengerId.current++;
    setPassengers((prev) => [
      ...prev,
      {
        id,
        type: type,
        typeLabel: label,
        gender: "آقا",
        nationality: "iranian",
        issuingCountry: "",
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        passportNumber: "",
        expiryDay: "",
        expiryMonth: "",
        expiryYear: "",
      },
    ]);
  };

  const updatePassenger = (id: number, field: string, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSelectSavedPassenger = (formId: number, savedId: string) => {
    if (selectedSavedIds[formId] === savedId) {
      setSelectedSavedIds((prev) => ({ ...prev, [formId]: "" }));
      updatePassenger(formId, "firstName", "");
      updatePassenger(formId, "lastName", "");
      updatePassenger(formId, "nationalId", "");
      updatePassenger(formId, "gender", "آقا");
      return;
    }
    setSelectedSavedIds((prev) => ({ ...prev, [formId]: savedId }));
    if (!savedId) {
      updatePassenger(formId, "firstName", "");
      updatePassenger(formId, "lastName", "");
      updatePassenger(formId, "nationalId", "");
      updatePassenger(formId, "gender", "آقا");
      return;
    }
    const saved = getPassengerById(savedId);
    if (saved) {
      updatePassenger(formId, "firstName", saved.firstName);
      updatePassenger(formId, "lastName", saved.lastName);
      updatePassenger(formId, "nationalId", saved.nationalId);
      updatePassenger(
        formId,
        "gender",
        saved.gender === "male" ? "آقا" : "خانوم",
      );
    }
  };

  const handleSubmitAndSave = () => {
    const hasErrors = passengers.some((p) => {
      if (!p.firstName.trim() || !p.lastName.trim()) return true;
      if (p.nationality === "iranian" && !p.nationalId.trim()) return true;
      if (p.nationality === "foreign" && !p.passportNumber.trim()) return true;
      if (!p.birthDay || !p.birthMonth || !p.birthYear) return true;
      return false;
    });
    if (hasErrors) {
      toast.warning("لطفاً تمام فیلدهای اجباری را پر کنید");
      return;
    }
    if (!contactMobile.trim()) {
      toast.warning("لطفاً شماره موبایل را وارد کنید");
      return;
    }
    passengers.forEach((p) => {
      if (p.firstName && p.lastName) {
        const existing = p.nationalId
          ? savedPassengers.find((sp) => sp.nationalId === p.nationalId)
          : undefined;
        const passengerData = {
          firstName: p.firstName,
          lastName: p.lastName,
          nationalId: p.nationalId,
          birthDate:
            p.birthYear && p.birthMonth && p.birthDay
              ? `${p.birthYear}-${p.birthMonth}-${p.birthDay}`
              : "",
          gender: p.gender === "آقا" ? ("male" as const) : ("female" as const),
          passportNumber: p.passportNumber || undefined,
        };
        if (existing) {
          updateSavedPassenger(existing.id, passengerData);
        } else {
          addPassenger(passengerData);
        }
      }
    });
    const params = new URLSearchParams();
    params.set('passengers', passengers.length.toString());
    params.set('origin', PAGE_DATA.flightInfo.originCity);
    params.set('destination', PAGE_DATA.flightInfo.destinationCity);
    const flightPrice = 1500000 * passengers.length;
    params.set('price', flightPrice.toString());
    router.push(`/flight/reserve/prepay?${params.toString()}`);
  };

  return (
    <>
      <HeaderBuyRoom currentStep={1} />

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
            <p style={{ color: "#555" }}>{PAGE_DATA.timeoutModal.text}</p>
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
              {PAGE_DATA.timeoutModal.btnText}
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
                        {PAGE_DATA.passengerCard.nationalityOptions.map(
                          (opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="addNew">
                      <div className="prevPassengersSection">
                        <p style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px", color: "var(--textDark)" }}>
                          {PAGE_DATA.prevPassengers}
                        </p>
                        {savedPassengers.length === 0 ? (
                          <p style={{ fontSize: "12px", color: "var(--textGray)", fontStyle: "italic" }}>
                            هنوز مسافری ذخیره نشده است
                          </p>
                        ) : (
                          <div className="prevPassengersList">
                            {savedPassengers.map((sp) => (
                              <div
                                key={sp.id}
                                className={`prevPassengerCard ${selectedSavedIds[passenger.id] === sp.id ? "selected" : ""}`}
                                onClick={() => handleSelectSavedPassenger(passenger.id, sp.id)}
                              >
                                <div className="prevPassengerInfo">
                                  <span className="prevPassengerName">{sp.firstName} {sp.lastName}</span>
                                  <span className="prevPassengerId">{sp.nationalId || "—"}</span>
                                </div>
                                <button
                                  className="prevPassengerDelete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('آیا از حذف این مسافر اطمینان دارید؟')) {
                                      removeSavedPassenger(sp.id);
                                    }
                                  }}
                                  title="حذف مسافر"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {index > 0 && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            marginRight: "10px",
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
                        {PAGE_DATA.passengerCard.labels.firstName}{" "}
                        <span style={{ color: "red" }}>*</span>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={passenger.firstName || ""}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "firstName",
                              e.target.value,
                            )
                          }
                        />
                      </label>
                      <label>
                        {PAGE_DATA.passengerCard.labels.lastName}{" "}
                        <span style={{ color: "red" }}>*</span>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={passenger.lastName || ""}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "lastName",
                              e.target.value,
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="bottom">
                      {passenger.nationality === "iranian" ? (
                        <label style={{ flex: 1 }}>
                          {PAGE_DATA.passengerCard.labels.nationalId}{" "}
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            placeholder="شماره ملی"
                            value={passenger.nationalId || ""}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "nationalId",
                                e.target.value,
                              )
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
                        {PAGE_DATA.passengerCard.labels.birthDate}{" "}
                        <span style={{ color: "red" }}>*</span>
                        <div className="dateSelectors">
                          <select
                            value={passenger.birthDay || ""}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "birthDay",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">روز</option>
                            {PAGE_DATA.passengerCard.days.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <select
                            value={passenger.birthMonth || ""}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "birthMonth",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">ماه</option>
                            {months.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder="سال"
                            value={passenger.birthYear || ""}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "birthYear",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </label>
                    </div>

                    {passenger.nationality === "foreign" && (
                      <div className="bottom" style={{ marginTop: "10px" }}>
                        <label style={{ flex: 1 }}>
                          {PAGE_DATA.passengerCard.labels.passportNumber}{" "}
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            placeholder="Passport Number"
                            value={passenger.passportNumber || ""}
                            onChange={(e) =>
                              updatePassenger(
                                passenger.id,
                                "passportNumber",
                                e.target.value,
                              )
                            }
                          />
                        </label>

                        <label style={{ flex: 1 }}>
                          {PAGE_DATA.passengerCard.labels.expiryDate}
                          <div className="dateSelectors">
                            <select
                              value={passenger.expiryDay || ""}
                              onChange={(e) =>
                                updatePassenger(
                                  passenger.id,
                                  "expiryDay",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">روز</option>
                              {PAGE_DATA.passengerCard.days.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <select
                              value={passenger.expiryMonth || ""}
                              onChange={(e) =>
                                updatePassenger(
                                  passenger.id,
                                  "expiryMonth",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">ماه</option>
                              {months.map((m) => (
                                <option key={m.value} value={m.value}>
                                  {m.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              placeholder="سال"
                              value={passenger.expiryYear || ""}
                              onChange={(e) =>
                                updatePassenger(
                                  passenger.id,
                                  "expiryYear",
                                  e.target.value,
                                )
                              }
                            />
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
              <p>{PAGE_DATA.contactInfo.title}</p>
            </div>
            <div className="bottomCard">
              <div className="OtherInoformation">
                <div className="top">
                  <label>
                    تلفن همراه <span style={{ color: "red" }}>*</span>{" "}
                    <input
                      type="text"
                      placeholder={PAGE_DATA.contactInfo.mobilePlaceholder}
                      value={contactMobile}
                      onChange={(e) => setContactMobile(e.target.value)}
                    />
                  </label>
                  <label>
                    تلفن ثابت{" "}
                    <input
                      type="text"
                      placeholder={PAGE_DATA.contactInfo.phonePlaceholder}
                    />
                  </label>
                </div>
                <div className="bottom">
                  <label>
                    ایمیل{" "}
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
            <div className="bottom rules-wrapper">
              <div
                className="rules-toggle"
                onClick={() => setIsRulesOpen(!isRulesOpen)}
              >
                <span>{PAGE_DATA.flightInfo.penaltyText}</span>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`chevron ${isRulesOpen ? "open" : ""}`}
                />
              </div>
              <div className="Avablity">
                <span>{PAGE_DATA.flightInfo.charterBadge}</span>
              </div>
              <div className={`rules-panel ${isRulesOpen ? "active" : ""}`}>
                {PAGE_DATA.rules.map((rule, idx) => (
                  <div key={idx} className="rule-item">
                    <div
                      className={`rule-header ${activeRuleIndex === idx ? "active" : ""}`}
                      onClick={() =>
                        setActiveRuleIndex(activeRuleIndex === idx ? null : idx)
                      }
                    >
                      <span>{rule.title}</span>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    <div
                      className={`rule-body ${activeRuleIndex === idx ? "active" : ""}`}
                    >
                      <p>{rule.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="invoiceContainer">
            <div className="invoiceHeader" onClick={() => setIsInvoiceExpanded(!isInvoiceExpanded)}>
              <div className="invoiceHeaderRight">
                <span className="invoiceHeaderTitle">{PAGE_DATA.bill.title}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`invoiceChevron ${isInvoiceExpanded ? "open" : ""}`} />
              </div>
              <span className="invoiceHeaderPrice">{PAGE_DATA.bill.totalPrice} تومان</span>
            </div>
            <div className={`invoiceBody ${isInvoiceExpanded ? "open" : ""}`}>
              <div className="invoiceBodyInner">
                <div className="invoiceRow">
                  <span className="invoiceRowLabel"><FontAwesomeIcon icon={faUsers} /> تعداد مسافران</span>
                  <span className="invoiceRowValue">{passengers.length} نفر</span>
                </div>
                <div className="invoiceRow">
                  <span className="invoiceRowLabel"><FontAwesomeIcon icon={faPlane} /> مسیر پرواز</span>
                  <span className="invoiceRowValue">{PAGE_DATA.flightInfo.originCity} ← {PAGE_DATA.flightInfo.destinationCity}</span>
                </div>
                <div className="invoiceRow">
                  <span className="invoiceRowLabel"><FontAwesomeIcon icon={faCalendarAlt} /> تاریخ حرکت</span>
                  <span className="invoiceRowValue">{PAGE_DATA.flightSummary.rules}</span>
                </div>
                <div className="invoiceRow">
                  <span className="invoiceRowLabel"><FontAwesomeIcon icon={faMoon} /> نوع بلیط</span>
                  <span className="invoiceRowValue">{PAGE_DATA.flightSummary.charter}</span>
                </div>
                <div className="invoiceDivider" />
                <div className="invoiceTotalRow">
                  <span className="invoiceRowLabel"><FontAwesomeIcon icon={faGem} /> قیمت کل</span>
                  <span className="invoiceRowValue">{PAGE_DATA.bill.totalPrice} تومان</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSubmitAndSave}>
            {PAGE_DATA.continueBtn} <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NiksaPassengerInfo;
