"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterUserPannel from "../../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../../components/(Headers)/UserPannelHeader";
import {
  faCheckCircle,
  faMedal,
  faCrown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import "../../global.css";

const PAGE_DATA = {
  scoreTitle: "امتیاز",
  badgesHeader: "نشان های شما",
  statusBadge: "سطح فعلی: کاربر عادی",
  checkIcon: faCheckCircle,
  lockIcon: faLock,
  medalIcon: faMedal,
  badges: [
    { key: "base", icon: faMedal, name: "پایه", status: "active" },
    { key: "silver", icon: faMedal, name: "نقره‌ای", status: "locked" },
    { key: "gold", icon: faMedal, name: "طلایی", status: "locked" },
    { key: "vip", icon: faCrown, name: "VIP", status: "locked" },
  ],
  levels: {
    base: {
      title: "امکانات پایه",
      features: ["پشتیبانی ۷/۲۴", "تأمین بلیط در هنگام خرید بلیط ناموفق"],
      badgeName: "پایه",
      promoTitle: "6 بلیط مانده تا سطح بعدی",
      promoDesc: "شما در 90 روز گذشته 0 بلیط خریداری کرده اید",
      promoAction: "برای رفتن به سطح بعدی (نقره‌ای) به <b>6</b> بلیط نیازمندید",
      className: "",
    },
    silver: {
      title: "سطح نقره‌ای",
      features: [
        "پشتیبانی ۷/۲۴ (با اولویت)",
        "تأمین بلیط در هنگام خرید بلیط ناموفق",
        "۵٪ تخفیف در خرید بلیط",
        "دسترسی زودتر به فروش ویژه",
      ],
      badgeName: "نقره‌ای",
      promoTitle: "سطح قفل شده",
      promoDesc: "برای باز کردن قفل این سطح باید سطح پایه را تکمیل کنید",
      promoAction: "تعداد بلیط مورد نیاز: <b>6</b>",
      className: "silver-mode",
    },
    gold: {
      title: "سطح طلایی",
      features: [
        "پشتیبانی اختصاصی تلفنی",
        "تأمین بلیط با تضمین ۱۰۰٪",
        "۱۰٪ تخفیف در تمام سرویس‌ها",
      ],
      badgeName: "طلایی",
      promoTitle: "سطح قفل شده",
      promoDesc: "این سطح برای اعضای طلایی محفوظ است",
      promoAction: "الزام: تکمیل سطح نقره‌ای",
      className: "gold-mode",
    },
    vip: {
      title: "سطح VIP",
      features: ["پشتیبانی شخصی مدیران", "۲۰٪ تخفیف", "خدمات CIP فرودگاه"],
      badgeName: "VIP",
      promoTitle: "بالاترین سطح",
      promoDesc: "تجربه متفاوت از سفر",
      promoAction: "فقط برای اعضای ویژه",
      className: "vip-mode",
    },
  } as Record<string, { title: string; features: string[]; badgeName: string; promoTitle: string; promoDesc: string; promoAction: string; className: string }>,
};

export default function Page() {
  const [selectedLevel, setSelectedLevel] = useState("base");
  const data = PAGE_DATA.levels[selectedLevel];

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
                <p>{PAGE_DATA.scoreTitle}</p>
              </div>

              <div className="MembershipContainer">
                <div className="MembershipInfo" id="info-content">
                  <h2>{data.title}</h2>
                  <ul className="animate-content">
                    {data.features.map((feat, index) => (
                      <li key={index}>
                        <FontAwesomeIcon icon={PAGE_DATA.checkIcon} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`PromoCard ${data.className}`}
                  id="promo-content"
                >
                  <div className="animate-content">
                    <div className="PromoHeader">
                      <span className="Badge">{data.badgeName}</span>
                      <FontAwesomeIcon icon={PAGE_DATA.medalIcon} />
                    </div>
                    <div className="PromoBody">
                      <h3>{data.promoTitle}</h3>
                      <span>{data.promoDesc}</span>
                    </div>
                    <div className="PromoBody">
                      <p
                        dangerouslySetInnerHTML={{ __html: data.promoAction }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Card">
            <div className="UserPanelParts">
              <div className="BadgesSection">
                <div className="BadgesHeader">
                  <h3>{PAGE_DATA.badgesHeader}</h3>
                  <span className="StatusBadge">{PAGE_DATA.statusBadge}</span>
                </div>

                <div className="BadgesGrid">
                  {PAGE_DATA.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`BadgeItem ${badge.status} ${selectedLevel === badge.key ? "selected" : ""}`}
                      onClick={() => setSelectedLevel(badge.key)}
                    >
                      <FontAwesomeIcon
                        icon={badge.icon}
                        className="BadgeIcon"
                      />
                      <span className="BadgeName">{badge.name}</span>
                      <div className="LockIcon">
                        <FontAwesomeIcon icon={PAGE_DATA.lockIcon} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
