"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faBolt } from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  title: "مدیریت رزرو خودکار",
  wallet: {
    creditTitle: "اعتبار کاربری",
    creditAmount: "0",
    buttonText: "افزایش و استرداد اعتبار",
    icon: faWallet,
  },
  infos: [
    "رزرو خودکار به‌طور مداوم ظرفیت و قیمت سرویس‌ها را بررسی می‌کند و اگر سرویسی مطابق با شرایطی که تعیین کرده‌اید موجود شود، خرید بلیط انجام می‌شود.",
    "رهگیری ظرفیت تا زمانی که تعیین کرده‌اید ادامه پیدا می‌کند و بعد از این زمان، جستجو متوقف خواهد شد.",
    "اعتبار موجود در حساب کاربری شما همواره قابل استفاده و قابل استرداد خواهد بود، اما در صورتی که رزرو خودکار فعالی داشته باشید و اعتبار لازم در حساب شما موجود نباشد، رزرو خودکار شما ناموفق خواهد شد.",
  ],
  cancelInfo: [
    "به منظور انصراف از رزرو خودکار، گزینه حذف رزرو را روی کارت پرواز مورد نظر انتخاب کنید..",
  ],
  tabs: [
    { key: "current", label: "جاری" },
    { key: "past", label: "گذشته" },
  ],
  emptyState: {
    message: "هنوز موردی برای رزرو خودکار اضافه نکرده‌اید.",
    small:
      "شما می‌توانید به‌ازای سفرهای تکمیل‌شده، برای خرید آتی از ظرفیت رزرو خودکار استفاده کنید.",
    icon: faBolt,
  },
  pastReservations: [
    {
      id: "1",
      title: "رزرو پرواز تهران – استانبول",
      date: "تاریخ: ۱۴۰۲/۰۵/۱۰",
      status: "انجام‌شده",
      classStatus: "success",
    },
    {
      id: "2",
      title: "رزرو پرواز مشهد – دبی",
      date: "تاریخ: ۱۴۰۲/۰۶/۲۲",
      status: "ناموفق",
      classStatus: "failed",
    },
    {
      id: "3",
      title: "رزرو پرواز شیراز – تهران",
      date: "تاریخ: ۱۴۰۲/۰۷/۰۱",
      status: "انجام‌شده",
      classStatus: "success",
    },
  ],
};

export default function AutoReserveManagement() {
  const [activeTab, setActiveTab] = useState("current");

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
              </div>
              <div className="Wallet">
                <div className="Flex">
                  <div className="Icon">
                    <FontAwesomeIcon
                      icon={PAGE_DATA.wallet.icon}
                      className="svg-inline--fa fa-wallet mr-icon-svg"
                      style={{ color: "var(gold)" }}
                    />
                  </div>
                  <p>
                    {PAGE_DATA.wallet.creditTitle}
                    <span>{PAGE_DATA.wallet.creditAmount}</span>
                  </p>
                </div>
                <span></span>
                <button>{PAGE_DATA.wallet.buttonText}</button>
              </div>
              <div className="UlPart">
                <ul>
                  {PAGE_DATA.infos.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
              <div className="UlPart">
                <ul>
                  {PAGE_DATA.cancelInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="Card">
            <div className="UserPanelParts">
              <div className="tabs">
                {PAGE_DATA.tabs.map((tab) => (
                  <div
                    key={tab.key}
                    className={`tab ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              <div id="content">
                <div
                  className="tab-content current-content"
                  style={{
                    display: activeTab === "current" ? "block" : "none",
                  }}
                >
                  <div className="empty">
                    <div className="empty-icon">
                      <FontAwesomeIcon
                        icon={PAGE_DATA.emptyState.icon}
                        className="svg-inline--fa fa-wallet mr-icon-svg"
                        style={{ color: "var(--blue-400)" }}
                      />
                    </div>
                    <p>{PAGE_DATA.emptyState.message}</p>
                    <small>{PAGE_DATA.emptyState.small}</small>
                  </div>
                </div>

                <div
                  className="tab-content past-content"
                  style={{ display: activeTab === "past" ? "block" : "none" }}
                >
                  <div className="items">
                    {PAGE_DATA.pastReservations.map((item) => (
                      <div key={item.id} className="item past-item">
                        <h4>{item.title}</h4>
                        <p>{item.date}</p>
                        <span className={`status ${item.classStatus}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
