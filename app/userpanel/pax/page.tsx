"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";

const PAGE_DATA = {
  title: "مدیریت مسافران",
  addText: "افزودن مسافر",
  deleteAllText: "حذف همه مسافران",
  searchPlaceholder: "جستجو نام مسافر",
  editText: "ویرایش",
  deleteText: "حذف",
  modal: {
    titleAdd: "افزودن مسافر جدید",
    titleEdit: "ویرایش اطلاعات مسافر",
    saveBtn: "ذخیره تغییرات",
    cancelBtn: "انصراف",
    nationalityLabel: "ملیت مسافر",
    sectionPersonal: "اطلاعات شخصی",
    sectionIdentity: "اطلاعات هویتی",
    sectionBirth: "تاریخ تولد",
    labels: {
      firstName: "نام",
      lastName: "نام خانوادگی",
      engFirst: "نام (انگلیسی)",
      engLast: "نام خانوادگی (انگلیسی)",
      nationalId: "کد ملی",
      birthDate: "تاریخ تولد",
      passportNum: "شماره گذرنامه",
      passportExpiry: "انقضای گذرنامه",
      passportCountry: "کشور صادرکننده",
    },
    placeholders: {
      firstName: "مثلاً: علی",
      lastName: "مثلاً: محمدی",
      engFirst: "Ali",
      engLast: "Mohammadi",
      nationalId: "۰۰۱۲۳۴۵۶۷۸",
      passportNum: "A12345678",
    },
    nationalityOptions: ["ایرانی", "خارجی"],
    foreignCountries: [
      "ترکیه",
      "امارات متحده عربی",
      "قطر",
      "آلمان",
      "فرانسه",
      "انگلستان",
    ],
  },
  birth: {
    days: Array.from({ length: 31 }, (_, i) =>
      (i + 1).toString().padStart(2, "0"),
    ),
    months: Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, "0"),
    ),
    years: Array.from({ length: 121 }, (_, i) => (1420 - i).toString()),
  },
};

const defaultForm = {
  firstName: "",
  lastName: "",
  engFirst: "",
  engLast: "",
  nationalId: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  isForeign: false,
  passportNum: "",
  passportExpiry: "",
  passportCountry: "",
};

const initialPassengers = [
  {
    id: "1",
    firstName: "امیر",
    lastName: "صادقی",
    engFirst: "Amir",
    engLast: "Sadeghi",
    nationalId: "۱۲۳۴۵۶۷۸۹۰",
    birthDay: "۱۵",
    birthMonth: "۰۵",
    birthYear: "۱۳۷۰",
    isForeign: false,
  },
];

export default function PassengerManagement() {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultForm);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = "auto";
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const filteredPassengers = passengers.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const openAdd = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  const openEdit = (passenger: any) => {
    setEditingId(passenger.id);
    setFormData({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      engFirst: passenger.engFirst,
      engLast: passenger.engLast,
      nationalId: passenger.nationalId || "",
      birthDay: passenger.birthDay,
      birthMonth: passenger.birthMonth,
      birthYear: passenger.birthYear,
      isForeign: passenger.isForeign || false,
      passportNum: passenger.passportNum || "",
      passportExpiry: passenger.passportExpiry || "",
      passportCountry: passenger.passportCountry || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setEditingId(null);
      setFormData(defaultForm);
    }, 250);
  };

  const handleSave = () => {
    const requiredFilled =
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.engFirst.trim() &&
      formData.engLast.trim() &&
      formData.birthDay &&
      formData.birthMonth &&
      formData.birthYear;
    const foreignValid = formData.isForeign
      ? formData.passportCountry &&
        formData.passportNum.trim() &&
        formData.passportExpiry
      : formData.nationalId.trim();

    if (!requiredFilled || !foreignValid) return;

    const newPassenger = {
      id: editingId || Date.now().toString(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      engFirst: formData.engFirst.trim(),
      engLast: formData.engLast.trim(),
      nationalId: formData.isForeign ? "" : formData.nationalId.trim(),
      birthDay: formData.birthDay,
      birthMonth: formData.birthMonth,
      birthYear: formData.birthYear,
      isForeign: formData.isForeign,
      passportNum: formData.isForeign ? formData.passportNum.trim() : "",
      passportExpiry: formData.isForeign ? formData.passportExpiry : "",
      passportCountry: formData.isForeign ? formData.passportCountry : "",
    };

    if (editingId) {
      setPassengers((prev) =>
        prev.map((p) => (p.id === editingId ? newPassenger : p)),
      );
    } else {
      setPassengers((prev) => [...prev, newPassenger]);
    }
    closeModal();
  };

  const deletePassenger = (id: string) =>
    setPassengers((prev) => prev.filter((p) => p.id !== id));
  const deleteAll = () => setPassengers([]);

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.engFirst.trim() &&
    formData.engLast.trim() &&
    formData.birthDay &&
    formData.birthMonth &&
    formData.birthYear &&
    (formData.isForeign
      ? formData.passportCountry &&
        formData.passportNum.trim() &&
        formData.passportExpiry
      : formData.nationalId.trim());

  // ========== استایل‌های inline لوکس ==========
  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    background:
      "linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.85) 100%)",
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    padding: "20px",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const modalStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "680px",
    maxHeight: "92vh",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: "28px",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 80px rgba(206, 165, 0, 0.15)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transform: isVisible
      ? "scale(1) translateY(0)"
      : "scale(0.92) translateY(20px)",
    opacity: isVisible ? 1 : 0,
    transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily:
      "'Vazirmatn', 'Segoe UI', Tahoma, -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    background:
      "linear-gradient(135deg, #cea500 0%, #ffcd11 50%, #ffd700 100%)",
    padding: "28px 32px",
    position: "relative",
    overflow: "hidden",
  };

  const headerPatternStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
    pointerEvents: "none",
  };

  const headerContentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const headerTitleWrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const headerIconStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  };

  const headerTitleStyle: React.CSSProperties = {
    color: "#5c4b00",
    fontSize: "20px",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.3px",
  };

  const headerSubtitleStyle: React.CSSProperties = {
    color: "rgba(62, 46, 0, 0.75)",
    fontSize: "13px",
    marginTop: "4px",
    fontWeight: 400,
  };

  const closeBtnStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  };

  const bodyStyle: React.CSSProperties = {
    padding: "28px 32px",
    overflowY: "auto",
    flex: 1,
    background: "#fff",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "24px",
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  };

  const sectionIconStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cea500",
    fontSize: "15px",
  };

  const     sectionTitleStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#5c4b00",
    margin: 0,
    letterSpacing: "-0.2px",
  };

  const sectionDividerStyle: React.CSSProperties = {
    flex: 1,
    height: "1px",
    background: "linear-gradient(to left, transparent, #e2e8f0, transparent)",
  };

  const grid2Style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: "14px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#5c4b00",
    marginBottom: "7px",
    letterSpacing: "-0.1px",
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: "relative",
  };

  const inputIconStyle: React.CSSProperties = {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "14px",
    pointerEvents: "none",
    transition: "color 0.2s",
  };

  const inputBaseStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px 12px 14px",
    paddingRight: "42px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#333",
    background: "#f8fafc",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const inputBaseLtrStyle: React.CSSProperties = {
    ...inputBaseStyle,
    textAlign: "left",
    direction: "ltr",
  };

  const selectBaseStyle: React.CSSProperties = {
    ...inputBaseStyle,
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left 12px center",
    backgroundSize: "16px",
    paddingLeft: "38px",
  };

  const nationalityToggleStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    padding: "5px",
    background: "#f1f5f9",
    borderRadius: "14px",
    marginBottom: "14px",
  };

  const toggleOptionStyle = (active: boolean): React.CSSProperties => ({
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: active
      ? "linear-gradient(135deg, #ffcd11 0%, #cea500 100%)"
      : "transparent",
    color: active ? "#5c4b00" : "#64748b",
    fontSize: "13.5px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: active ? "0 4px 12px rgba(206, 165, 0, 0.35)" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "inherit",
  });

  const conditionalBoxStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #fffdf5 0%, #fff8e1 100%)",
    border: "1.5px solid #ffcd11",
    borderRadius: "16px",
    padding: "18px",
    marginTop: "14px",
  };

  const birthGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: "10px",
  };

  const footerStyle: React.CSSProperties = {
    padding: "20px 32px",
    background: "linear-gradient(180deg, #fffdf5 0%, #fff8e1 100%)",
    borderTop: "1px solid #ffcd11",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const cancelBtnStyle: React.CSSProperties = {
    padding: "12px 26px",
    background: "#fff",
    border: "1.5px solid #cea500",
    borderRadius: "12px",
    color: "#5c4b00",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const saveBtnStyle = (valid: boolean): React.CSSProperties => ({
    padding: "12px 30px",
    background: valid
      ? "linear-gradient(135deg, #ffcd11 0%, #cea500 50%, #b89400 100%)"
      : "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
    border: "none",
    borderRadius: "12px",
    color: valid ? "#5c4b00" : "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: valid ? "pointer" : "not-allowed",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    boxShadow: valid
      ? "0 8px 20px rgba(206, 165, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
      : "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    letterSpacing: "-0.2px",
  });

  // آیکون‌های SVG به صورت کامپوننت
  const Icon = ({ path, size = 16 }: { path: string; size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );

  const ICONS = {
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    idCard:
      "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z M6 10h4 M6 14h4 M14 10h4 M14 14h4",
    calendar:
      "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    globe:
      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    close: "M18 6L6 18 M6 6l12 12",
    check: "M20 6L9 17l-5-5",
    plane:
      "M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
    flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
    x: "M18 6L6 18 M6 6l12 12",
  };

  const ModalContent = (
    <div style={backdropStyle} onClick={closeModal} role="presentation">
      <style>{`
        @keyframes modalShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .lux-input:focus {
          border-color: #cea500 !important;
          background: #fff !important;
          box-shadow: 0 0 0 4px rgba(206, 165, 0, 0.12) !important;
        }
        .lux-input:focus + .lux-icon,
        .lux-input-wrap:focus-within .lux-icon {
          color: #cea500 !important;
        }
        .lux-cancel:hover {
          background: #fff8e1 !important;
          border-color: #cea500 !important;
          transform: translateY(-1px);
        }
        .lux-save:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(206, 165, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }
        .lux-close:hover {
          background: rgba(206, 165, 0, 0.28) !important;
          transform: rotate(90deg);
        }
        .lux-body::-webkit-scrollbar { width: 8px; }
        .lux-body::-webkit-scrollbar-track { background: transparent; }
        .lux-body::-webkit-scrollbar-thumb {
          background: #cea500;
          border-radius: 10px;
        }
        .lux-body::-webkit-scrollbar-thumb:hover { background: #b89400; }
      `}</style>

      <div style={modalStyle} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="paxModalTitle">
        {/* ===== هدر ===== */}
        <div style={headerStyle}>
          <div style={headerPatternStyle}></div>
          <div style={headerContentStyle}>
            <div style={headerTitleWrapStyle}>
              <div style={headerIconStyle}>
                <Icon path={ICONS.user} size={22} />
              </div>
              <div>
                <h3 style={headerTitleStyle} id="paxModalTitle">
                  {editingId
                    ? PAGE_DATA.modal.titleEdit
                    : PAGE_DATA.modal.titleAdd}
                </h3>
                <p style={headerSubtitleStyle}>
                  {editingId
                    ? "اطلاعات مسافر را ویرایش کنید"
                    : "مشخصات مسافر جدید را وارد نمایید"}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              style={closeBtnStyle}
              className="lux-close"
              aria-label="بستن"
            >
              <Icon path={ICONS.close} size={18} />
            </button>
          </div>
        </div>

        {/* ===== بدنه ===== */}
        <div style={bodyStyle} className="lux-body">
          {/* بخش ۱: اطلاعات شخصی */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>
                <Icon path={ICONS.user} size={15} />
              </div>
              <h4 style={sectionTitleStyle}>
                {PAGE_DATA.modal.sectionPersonal}
              </h4>
              <div style={sectionDividerStyle}></div>
            </div>

            <div style={grid2Style}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  {PAGE_DATA.modal.labels.firstName}
                </label>
                <div style={inputWrapperStyle} className="lux-input-wrap">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder={PAGE_DATA.modal.placeholders.firstName}
                    style={inputBaseStyle}
                    className="lux-input"
                  />
                  <span style={inputIconStyle} className="lux-icon">
                    <Icon path={ICONS.user} size={14} />
                  </span>
                </div>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  {PAGE_DATA.modal.labels.lastName}
                </label>
                <div style={inputWrapperStyle} className="lux-input-wrap">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder={PAGE_DATA.modal.placeholders.lastName}
                    style={inputBaseStyle}
                    className="lux-input"
                  />
                  <span style={inputIconStyle} className="lux-icon">
                    <Icon path={ICONS.user} size={14} />
                  </span>
                </div>
              </div>
            </div>

            <div style={grid2Style}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  {PAGE_DATA.modal.labels.engFirst}
                </label>
                <div style={inputWrapperStyle} className="lux-input-wrap">
                  <input
                    type="text"
                    value={formData.engFirst}
                    onChange={(e) =>
                      setFormData({ ...formData, engFirst: e.target.value })
                    }
                    placeholder={PAGE_DATA.modal.placeholders.engFirst}
                    style={inputBaseLtrStyle}
                    className="lux-input"
                    dir="ltr"
                  />
                  <span style={inputIconStyle} className="lux-icon">
                    <Icon path="M4 7V4h16v3 M9 20h6 M12 4v16" size={14} />
                  </span>
                </div>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  {PAGE_DATA.modal.labels.engLast}
                </label>
                <div style={inputWrapperStyle} className="lux-input-wrap">
                  <input
                    type="text"
                    value={formData.engLast}
                    onChange={(e) =>
                      setFormData({ ...formData, engLast: e.target.value })
                    }
                    placeholder={PAGE_DATA.modal.placeholders.engLast}
                    style={inputBaseLtrStyle}
                    className="lux-input"
                    dir="ltr"
                  />
                  <span style={inputIconStyle} className="lux-icon">
                    <Icon path="M4 7V4h16v3 M9 20h6 M12 4v16" size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* بخش ۲: اطلاعات هویتی */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>
                <Icon path={ICONS.idCard} size={15} />
              </div>
              <h4 style={sectionTitleStyle}>
                {PAGE_DATA.modal.sectionIdentity}
              </h4>
              <div style={sectionDividerStyle}></div>
            </div>

            <label style={labelStyle}>{PAGE_DATA.modal.nationalityLabel}</label>
            <div style={nationalityToggleStyle}>
              <button
                type="button"
                style={toggleOptionStyle(!formData.isForeign)}
                onClick={() => setFormData({ ...formData, isForeign: false })}
              >
                <Icon path={ICONS.flag} size={15} />
                ایرانی
              </button>
              <button
                type="button"
                style={toggleOptionStyle(formData.isForeign)}
                onClick={() => setFormData({ ...formData, isForeign: true })}
              >
                <Icon path={ICONS.globe} size={15} />
                خارجی
              </button>
            </div>

            {!formData.isForeign ? (
              <div style={conditionalBoxStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>
                    {PAGE_DATA.modal.labels.nationalId}
                  </label>
                  <div style={inputWrapperStyle} className="lux-input-wrap">
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) =>
                        setFormData({ ...formData, nationalId: e.target.value })
                      }
                      placeholder={PAGE_DATA.modal.placeholders.nationalId}
                      style={inputBaseLtrStyle}
                      className="lux-input"
                      dir="ltr"
                    />
                    <span style={inputIconStyle} className="lux-icon">
                      <Icon path={ICONS.idCard} size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={conditionalBoxStyle}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>
                    {PAGE_DATA.modal.labels.passportCountry}
                  </label>
                  <select
                    value={formData.passportCountry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passportCountry: e.target.value,
                      })
                    }
                    style={selectBaseStyle}
                    className="lux-input"
                  >
                    <option value="">انتخاب کشور...</option>
                    {PAGE_DATA.modal.foreignCountries.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={grid2Style}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>
                      {PAGE_DATA.modal.labels.passportNum}
                    </label>
                    <div style={inputWrapperStyle} className="lux-input-wrap">
                      <input
                        type="text"
                        value={formData.passportNum}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passportNum: e.target.value,
                          })
                        }
                        placeholder={PAGE_DATA.modal.placeholders.passportNum}
                        style={inputBaseLtrStyle}
                        className="lux-input"
                        dir="ltr"
                      />
                      <span style={inputIconStyle} className="lux-icon">
                        <Icon path={ICONS.plane} size={14} />
                      </span>
                    </div>
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>
                      {PAGE_DATA.modal.labels.passportExpiry}
                    </label>
                    <div style={inputWrapperStyle} className="lux-input-wrap">
                      <input
                        type="date"
                        value={formData.passportExpiry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passportExpiry: e.target.value,
                          })
                        }
                        style={inputBaseStyle}
                        className="lux-input"
                      />
                      <span style={inputIconStyle} className="lux-icon">
                        <Icon path={ICONS.calendar} size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* بخش ۳: تاریخ تولد */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>
                <Icon path={ICONS.calendar} size={15} />
              </div>
              <h4 style={sectionTitleStyle}>{PAGE_DATA.modal.sectionBirth}</h4>
              <div style={sectionDividerStyle}></div>
            </div>

            <div style={birthGridStyle}>
              <div>
                <label style={labelStyle}>روز</label>
                <select
                  value={formData.birthDay}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDay: e.target.value })
                  }
                  style={selectBaseStyle}
                  className="lux-input"
                >
                  <option value="">روز</option>
                  {PAGE_DATA.birth.days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>ماه</label>
                <select
                  value={formData.birthMonth}
                  onChange={(e) =>
                    setFormData({ ...formData, birthMonth: e.target.value })
                  }
                  style={selectBaseStyle}
                  className="lux-input"
                >
                  <option value="">ماه</option>
                  {PAGE_DATA.birth.months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>سال</label>
                <select
                  value={formData.birthYear}
                  onChange={(e) =>
                    setFormData({ ...formData, birthYear: e.target.value })
                  }
                  style={selectBaseStyle}
                  className="lux-input"
                >
                  <option value="">سال</option>
                  {PAGE_DATA.birth.years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ===== فوتر ===== */}
        <div style={footerStyle}>
          <button
            onClick={closeModal}
            style={cancelBtnStyle}
            className="lux-cancel"
          >
            <Icon path={ICONS.x} size={15} />
            {PAGE_DATA.modal.cancelBtn}
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            style={saveBtnStyle(!!isFormValid)}
            className="lux-save"
          >
            <Icon path={ICONS.check} size={16} />
            {PAGE_DATA.modal.saveBtn}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <UserPannelHeader />
      <div className="containerr">
        <div className="right">
          <FilterUserPannel />
        </div>
        <div className="left">
          <div className="Card">
            <div className="UserPanelParts">
              <div className="TopCard">
                <p>{PAGE_DATA.title}</p>
                <div className="AddOrDelete">
                  <button onClick={openAdd} className="BtnPrimary2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M4 9.5a5 5 0 1 1 7.916 4.062 7.973 7.973 0 0 1 5.018 7.166.75.75 0 1 1-1.499.044 6.469 6.469 0 0 0-12.932 0 .75.75 0 0 1-1.499-.044 7.972 7.972 0 0 1 5.059-7.181A4.994 4.994 0 0 1 4 9.5ZM9 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm10.25-5a.75.75 0 0 1 .75.75V4h2.25a.75.75 0 0 1 0 1.5H20v2.25a.75.75 0 0 1-1.5 0V5.5h-2.25a.75.75 0 0 1 0-1.5h2.25V1.75a.75.75 0 0 1 .75-.75Z"></path>
                    </svg>
                    {PAGE_DATA.addText}
                  </button>
                  <button onClick={deleteAll} className="BtnPrimary2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25 ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
                      <path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
                    </svg>
                    {PAGE_DATA.deleteAllText}
                  </button>
                </div>
              </div>
              <div className="UserFamily">
                <input
                  type="text"
                  placeholder={PAGE_DATA.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="Familys">
                  {filteredPassengers.map((passenger) => (
                    <div className="User" key={passenger.id}>
                      <div className="R">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                        >
                          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm.847-8.145a2.502 2.502 0 1 0-1.694 0C5.471 8.261 4 9.775 4 11c0 .395.145.995 1 .995h6c.855 0 1-.6 1-.995 0-1.224-1.47-2.74-3.153-3.145Z"></path>
                        </svg>
                        <p>
                          {passenger.firstName} {passenger.lastName}
                        </p>
                      </div>
                      <div className="L">
                        <button
                          onClick={() => openEdit(passenger)}
                          className="BtnPrimary2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path>
                          </svg>
                          {PAGE_DATA.editText}
                        </button>
                        <button
                          onClick={() => deletePassenger(passenger.id)}
                          className="BtnPrimary2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25 ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
                            <path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
                          </svg>
                          {PAGE_DATA.deleteText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mounted && isModalOpen && createPortal(ModalContent, document.body)}
    </>
  );
}
