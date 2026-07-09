"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import HeaderAutoReserve from "../../components/(Headers)/HeaderAutoReserve";
import "../global.css";

const PAGE_DATA = {
  title: "تعیین بلیط‌های دلخواه ",
  date: "شنبه 11 بهمن ",
  tabs: {
    flights: "پرواز دلخواه ",
    times: "زمان دلخواه ",
  },
  flightsSection: {
    label: "انتخاب پروازهای دلخواه (شنبه 11 بهمن): ",
    all: {
      label: "انتخاب همه ",
      sub: "احتمال موفقیت بیشتر ",
    },
    options: [
      {
        id: "f1",
                time: "پرواز ساعت 17:45 ",
                airline: "فلای کیش ",
                logo: "/airlines/KIS.svg",
      },
      {
        id: "f2",
                time: "پرواز ساعت 17:45 ",
                airline: "فلای کیش ",
                logo: "/airlines/KIS.svg",
      },
      {
        id: "f3",
                time: "پرواز ساعت 17:45 ",
                airline: "فلای کیش ",
                logo: "/airlines/KIS.svg",
      },
      {
        id: "f4",
                time: "پرواز ساعت 17:45 ",
                airline: "فلای کیش ",
                logo: "/airlines/KIS.svg",
      },
    ],
  },
  timesSection: {
    label: "انتخاب بازه زمانی دلخواه (شنبه 11 بهمن): ",
    all: {
      label: "انتخاب همه ",
      sub: "احتمال موفقیت بیشتر ",
    },
    options: [
      {
        id: "dawn",
        period: "بامداد ",
        range: "۰ الی ۶ ",
        icon: faMoon,
      },
      {
        id: "morning",
        period: "قبل از ظهر ",
        range: "۶ الی ۱۲ ",
        icon: faSun,
      },
      {
        id: "afternoon",
        period: "بعد از ظهر ",
        range: "۱۲ الی ۱۸ ",
        icon: faSun,
      },
      {
        id: "night",
        period: "شب ",
        range: "۱۸ الی ۲۴ ",
        icon: faMoon,
      },
    ],
  },
  keepGoing: {
    title: "موجود شد رزرو کن - هواپیما ",
    route: "تهران به کیش ",
    date: "شنبه 11 بهمن ",
    btnText: "ادامه و تعیین شرایط ",
    href: "/reserve/auto-reserve/filters",
  },
};

const NiksaChooseOpt = () => {
  const [activeTab, setActiveTab] = useState<"flights" | "times">("flights");
  const [selectedFlights, setSelectedFlights] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const allFlightsRef = useRef<HTMLInputElement>(null);
  const allTimesRef = useRef<HTMLInputElement>(null);

  // مدیریت انتخاب همه پروازها
  const toggleAllFlights = () => {
    const total = PAGE_DATA.flightsSection.options.length;
    if (selectedFlights.length === total) {
      setSelectedFlights([]);
    } else {
      setSelectedFlights(PAGE_DATA.flightsSection.options.map((opt) => opt.id));
    }
  };

  // مدیریت انتخاب تک پرواز
  const toggleFlight = (id: string) => {
    setSelectedFlights((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // مدیریت انتخاب همه زمان‌ها
  const toggleAllTimes = () => {
    const total = PAGE_DATA.timesSection.options.length;
    if (selectedTimes.length === total) {
      setSelectedTimes([]);
    } else {
      setSelectedTimes(PAGE_DATA.timesSection.options.map((opt) => opt.id));
    }
  };

  // مدیریت انتخاب تک زمان
  const toggleTime = (id: string) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // به‌روزرسانی حالت indeterminate برای پروازها
  useEffect(() => {
    const allF = allFlightsRef.current;
    if (allF) {
      const total = PAGE_DATA.flightsSection.options.length;
      const selectedCount = selectedFlights.length;
      allF.checked = selectedCount === total;
      allF.indeterminate = selectedCount > 0 && selectedCount < total;
    }
  }, [selectedFlights]);

  // به‌روزرسانی حالت indeterminate برای زمان‌ها
  useEffect(() => {
    const allT = allTimesRef.current;
    if (allT) {
      const total = PAGE_DATA.timesSection.options.length;
      const selectedCount = selectedTimes.length;
      allT.checked = selectedCount === total;
      allT.indeterminate = selectedCount > 0 && selectedCount < total;
    }
  }, [selectedTimes]);

  return (
    <>
      <HeaderAutoReserve currentStep={1} />
      <div className="Countainer">
        <div className="ChooseOpt">
          <div className="Card">
            <div className="Titel">
              <p>{PAGE_DATA.title}</p>
            </div>

            <div className="Plans">
              <span
                className={`option ${activeTab === "flights" ? "active" : ""}`}
                onClick={() => setActiveTab("flights")}
              >
                {PAGE_DATA.tabs.flights}
              </span>
              <span
                className={`option ${activeTab === "times" ? "active" : ""}`}
                onClick={() => setActiveTab("times")}
              >
                {PAGE_DATA.tabs.times}
              </span>
            </div>

            <div className="OptionsContent">
              {/* بخش پروازها */}
              <div
                className={`flights ${activeTab === "flights" ? "active" : ""}`}
              >
                <p>{PAGE_DATA.flightsSection.label}</p>
                <div className="Cards">
                  {/* انتخاب همه پروازها - کلیک روی کل کارت */}
                  <div className="Opt clickable" onClick={toggleAllFlights}>
                    <div className="R">
                      <p>{PAGE_DATA.flightsSection.all.label}</p>
                      <span>{PAGE_DATA.flightsSection.all.sub}</span>
                    </div>
                    <div className="L">
                      <input
                        type="checkbox"
                        id="AllCheckedFlights"
                        ref={allFlightsRef}
                        readOnly
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* لیست پروازها - کلیک روی کل کارت */}
                  {PAGE_DATA.flightsSection.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`Opt clickable ${
                        selectedFlights.includes(opt.id) ? "selected" : ""
                      }`}
                      onClick={() => toggleFlight(opt.id)}
                    >
                      <div className="R">
                        <div className="pic">                           <Image src={opt.logo} alt="logo" width={32} height={32} />
                        </div>
                        <div className="Content">
                          <p>{opt.time}</p>
                          <p>{opt.airline}</p>
                        </div>
                      </div>
                      <div className="L">
                        <input
                          type="checkbox"
                          className="optCheckbox"
                          checked={selectedFlights.includes(opt.id)}
                          readOnly
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* بخش زمان‌ها */}
              <div className={`times ${activeTab === "times" ? "active" : ""}`}>
                <p>{PAGE_DATA.timesSection.label}</p>
                <div className="Cards">
                  {/* انتخاب همه زمان‌ها - کلیک روی کل کارت */}
                  <div className="Opt clickable" onClick={toggleAllTimes}>
                    <div className="R">
                      <p>{PAGE_DATA.timesSection.all.label}</p>
                      <span>{PAGE_DATA.timesSection.all.sub}</span>
                    </div>
                    <div className="L">
                      <input
                        type="checkbox"
                        id="AllCheckedTime"
                        ref={allTimesRef}
                        readOnly
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* لیست زمان‌ها - کلیک روی کل کارت */}
                  {PAGE_DATA.timesSection.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`Opt clickable ${
                        selectedTimes.includes(opt.id) ? "selected" : ""
                      }`}
                      onClick={() => toggleTime(opt.id)}
                    >
                      <div className="R">
                        <div className="pic">
                          <FontAwesomeIcon
                            icon={opt.icon}
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="Content">
                          <p>{opt.period}</p>
                          <p>{opt.range}</p>
                        </div>
                      </div>
                      <div className="L">
                        <input
                          type="checkbox"
                          className="optCheckbox"
                          checked={selectedTimes.includes(opt.id)}
                          readOnly
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  ))}
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

export default NiksaChooseOpt;
