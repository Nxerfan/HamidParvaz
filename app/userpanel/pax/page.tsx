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
    titleEdit: "ویرایش مسافر",
    saveBtn: "ثبت",
    cancelBtn: "بازگشت",
    nationalityLabel: "ملیت",
    labels: {
      firstName: "نام",
      lastName: "نام خانوادگی",
      engFirst: "نام به انگلیسی",
      engLast: "نام خانوادگی به انگلیسی",
      nationalId: "شماره ملی",
      birthDate: "تاریخ تولد",
      passportNum: "شماره گذرنامه",
      passportExpiry: "انقضای گذرنامه",
      passportCountry: "کشور صادرکننده پاسپورت",
    },
    placeholders: {
      firstName: "نام",
      lastName: "نام خانوادگی",
      engFirst: "نام به انگلیسی",
      engLast: "نام خانوادگی به انگلیسی",
      nationalId: "شماره ملی",
      passportNum: "شماره گذرنامه",
      passportExpiry: "تاریخ انقضا",
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(defaultForm);
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

  // استایل مودال شبیه عکس ارسالی
  const ModalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر تیتردار شبیه عکس */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-300 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            {editingId ? PAGE_DATA.modal.titleEdit : PAGE_DATA.modal.titleAdd}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* بدنه فرم */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          <div className="space-y-5">
            {/* ردیف اول نام‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {PAGE_DATA.modal.labels.firstName}
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {PAGE_DATA.modal.labels.lastName}
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* ردیف دوم انگلیسی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {PAGE_DATA.modal.labels.engFirst}
                </label>
                <input
                  type="text"
                  value={formData.engFirst}
                  onChange={(e) =>
                    setFormData({ ...formData, engFirst: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-left focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {PAGE_DATA.modal.labels.engLast}
                </label>
                <input
                  type="text"
                  value={formData.engLast}
                  onChange={(e) =>
                    setFormData({ ...formData, engLast: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-left focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* ملیت (شبیه انتخاب سوال) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                {PAGE_DATA.modal.nationalityLabel}
              </label>
              <select
                value={formData.isForeign ? "خارجی" : "ایرانی"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isForeign: e.target.value === "خارجی",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
              >
                {PAGE_DATA.modal.nationalityOptions.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            </div>

            {/* بخش شرطی (مشابه دسته‌بندی‌های عکس) */}
            {!formData.isForeign ? (
              <div className="flex flex-col gap-1 border p-4 rounded-md bg-gray-50">
                <label className="text-sm font-medium text-gray-700">
                  {PAGE_DATA.modal.labels.nationalId}
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) =>
                    setFormData({ ...formData, nationalId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-left focus:outline-none focus:border-blue-500 bg-white text-sm"
                  dir="ltr"
                />
              </div>
            ) : (
              <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
                  >
                    <option value="">انتخاب کشور</option>
                    {PAGE_DATA.modal.foreignCountries.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      {PAGE_DATA.modal.labels.passportNum}
                    </label>
                    <input
                      type="text"
                      value={formData.passportNum}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passportNum: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-left focus:outline-none focus:border-blue-500 bg-white text-sm"
                      dir="ltr"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      {PAGE_DATA.modal.labels.passportExpiry}
                    </label>
                    <input
                      type="date"
                      value={formData.passportExpiry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passportExpiry: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* تاریخ تولد */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                {PAGE_DATA.modal.labels.birthDate}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={formData.birthDay}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDay: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">روز</option>
                  {PAGE_DATA.birth.days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.birthMonth}
                  onChange={(e) =>
                    setFormData({ ...formData, birthMonth: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">ماه</option>
                  {PAGE_DATA.birth.months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.birthYear}
                  onChange={(e) =>
                    setFormData({ ...formData, birthYear: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 bg-white text-sm"
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

        {/* فوتر با دکمه‌های آبی و سفید (مشابه عکس) */}
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex gap-4 justify-end">
          <button
            onClick={closeModal}
            className="px-8 py-2 bg-white border border-gray-400 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
          >
            {PAGE_DATA.modal.cancelBtn}
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-8 py-2 rounded-md font-medium transition-colors text-sm shadow-sm ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
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
                      <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
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
                            <path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
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
