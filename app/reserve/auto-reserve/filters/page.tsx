"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../../global.css";
import HeaderAutoReserve from "../../../components/(Headers)/HeaderAutoReserve";

const PAGE_DATA = {
  title: "تعیین شرایط بلیط",
  filterIntro: "در این بخش، شرایط مورد نظر خود را تعیین کنید:",
  priceAccordion: {
    options: [
      {
        id: "suggested",
        priceDisplay: "9,572,000 تومانء",
        label: "سطح پیشنهادی",
        desc: "قیمت اکثر پروازها از این مبلغ کمتر است",
      },
      {
        id: "moreSuccess",
        priceDisplay: "5,519,000 تومانء",
        label: "موفقیت بیشتر",
        desc: "حداکثر قیمت بلیط‌های غیر بیزینس این مسیر",
      },
      {
        id: "custom",
        priceDisplay: "مبلغ دلخواه من",
        label: null,
        desc: "بلیط‌های تا مبلغ دلخواه شما را خرید خواهیم کرد.",
      },
    ],
  },
  timeAccordion: {
    options: [
      { text: "2 ساعت قبل از پرواز", success: false },
      { text: "2.5 ساعت قبل از پرواز", success: false },
      { text: "3 ساعت قبل از پرواز", success: true },
      { text: "3.5 ساعت قبل از پرواز", success: false },
      { text: "4 ساعت قبل از پرواز", success: false },
      { text: "4.5 ساعت قبل از پرواز", success: false },
      { text: "5 ساعت قبل از پرواز", success: false },
    ],
  },
  keepGoing: {
    title: "موجود شد رزرو کن - هواپیما",
    route: "تهران به کیش",
    date: "شنبه 11 بهمن",
    btnText: "ادامه و تعیین شرایط",
    href: "/reserve/form",
  },
};

const NiksaChooseFilter = () => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState(
    PAGE_DATA.priceAccordion.options[0],
  );
  const [selectedTime, setSelectedTime] = useState(
    PAGE_DATA.timeAccordion.options[2].text,
  );

  // هندل کلیک SeeMore قیمت (فقط هدر)
  const handlePriceClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".Opt") || target.closest("input")) return;
    setIsPriceOpen((prev) => !prev);
  };

  // انتخاب گزینه قیمت
  const handleSelectPrice = (option: any) => {
    setSelectedPriceOption(option);
  };

  // هندل کلیک SeeMore زمان (فقط هدر)
  const handleTimeClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("li")) return;
    setIsTimeOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderAutoReserve currentStep={2}/>
      <div className="Countainer">
        <div className="ChooseOpt">
          <div className="Card">
            <div className="Titel">
              <p>{PAGE_DATA.title}</p>
            </div>
            <div className="ChooseFilter">
              <p>{PAGE_DATA.filterIntro}</p>

              {/* اکوردیون قیمت */}
              <div
                className={`SeeMore ${isPriceOpen ? "active" : ""}`}
                onClick={handlePriceClick}
              >
                <div className="ContentIn">
                  <div className="R">
                    <p>{selectedPriceOption.priceDisplay}</p>
                    {selectedPriceOption.label && (
                      <span>{selectedPriceOption.label}</span>
                    )}
                  </div>
                  <div className="L">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                </div>

                <div className="MoreDetails">
                  <div className="Cards">
                    {PAGE_DATA.priceAccordion.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`Opt ${selectedPriceOption.id === opt.id ? "selected" : ""}`}
                        onClick={() => handleSelectPrice(opt)}
                      >
                        <div className="R">
                          <p>{opt.priceDisplay}</p>
                          {opt.label && <span>{opt.label}</span>}
                        </div>
                        <div className="L">
                          <p>{opt.desc}</p>
                        </div>
                        {selectedPriceOption.id === opt.id &&
                          opt.id === "custom" && (
                            <div className="custom-input">
                              <input
                                type="text"
                                placeholder="مبلغ دلخواه را وارد کنید"
                              />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* اکوردیون زمان */}
              <div
                className={`SeeMore ${isTimeOpen ? "active" : ""}`}
                onClick={handleTimeClick}
              >
                <div className="ContentIn">
                  <div className="R">
                    <p>جستجو و خرید بلیط تا {selectedTime}</p>
                  </div>
                  <div className="L">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                </div>

                <div className="MoreDetails">
                  <ul style={{ listStyleType: "none" }}>
                    {PAGE_DATA.timeAccordion.options.map((item) => (
                      <li
                        key={item.text}
                        className={selectedTime === item.text ? "selected" : ""}
                        onClick={() => setSelectedTime(item.text)}
                      >
                        {item.text}
                        {item.success && <span>احتمال موفقیت بیشتر</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش KeepGoing */}
        <div className="KeepGoing">
          <div className="Card">
            <p>{PAGE_DATA.keepGoing.title}</p>
            <div className="Content">
              <p>{PAGE_DATA.keepGoing.route}</p>
              <p>{PAGE_DATA.keepGoing.date}</p>
            </div>
          </div>
          <Link href={PAGE_DATA.keepGoing.href}>
            <button>{PAGE_DATA.keepGoing.btnText}</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NiksaChooseFilter;
