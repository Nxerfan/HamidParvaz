"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
import {
  faCoins,
  faAngleLeft,
  faChevronRight,
  faChevronLeft,
  faLayerGroup,
  faPlaneDeparture,
  faTicketAlt,
  faGraduationCap,
  faBookOpen,
  faConciergeBell,
  faGamepad,
  faEllipsisH,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import "../global.css";

const PAGE_DATA = {
  username: "عرفان صادقی",
  topCardTitle: "جوایز کلاب حمید پرواز",
  scoreText: "امتیاز کاربری شما",
  historyItems: [
    { href: "/userpanel/club/history", text: "تاریخچه‌ی امتیازات" },
    { href: "/userpanel/club/used-score", text: "کدهای تخفیف دریافت شده" },
  ],
  sliderOptions: [
    { id: "all", icon: faLayerGroup, text: "همه" },
    { id: "travel", icon: faPlaneDeparture, text: "سفر" },
    { id: "lottery", icon: faTicketAlt, text: "قرعه‌کشی" },
    { id: "education", icon: faGraduationCap, text: "آموزشی" },
    { id: "courses", icon: faBookOpen, text: "دوره‌ها" },
    { id: "services", icon: faConciergeBell, text: "خدمات" },
    { id: "fun", icon: faGamepad, text: "تفریح" },
    { id: "other", icon: faEllipsisH, text: "سایر" },
    { id: "food", icon: faUtensils, text: "رستوران" },
  ],
  rewards: [
    {
      id: 1,
      category: "travel",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      title: "۲۰ هزار تومان تخفیف | سفر با اتوبوس",
      date: "29 / اسفند / 1404",
      points: 3500,
      pointsText: "امتیاز مورد نیاز",
      buttonText: "جزئیات بیشتر",
    },
    {
      id: 2,
      category: "food",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      title: "پیشنهاد ویژه رستوران",
      date: "15 / اسفند / 1404",
      points: 1500,
      pointsText: "امتیاز مورد نیاز",
      buttonText: "جزئیات بیشتر",
    },
    {
      id: 3,
      category: "lottery",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      title: "قرعه‌کشی جام حذفی",
      date: "01 / فروردین / 1405",
      points: 5000,
      pointsText: "امتیاز مورد نیاز",
      buttonText: "جزئیات بیشتر",
    },
    {
      id: 4,
      category: "travel",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      title: "بلیط هواپیما تهران-کیش",
      date: "10 / اردیبهشت / 1405",
      points: 10000,
      pointsText: "امتیاز مورد نیاز",
      buttonText: "جزئیات بیشتر",
    },
  ],
  emptyMessage: "درحال حاضر جایزه ای در این بخش وجود ندارد",
  editLabel: "Edit profile",
  editIcon: "✎",
  score: 0,
  clubLevelHref: "/userpanel/club/level",
};

export default function Page() {
  const [activeOption, setActiveOption] = useState(
    PAGE_DATA.sliderOptions[0].id,
  );
  const trackRef = useRef(null);

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleSelectOption = (id) => {
    setActiveOption(id);
  };

  const filteredRewards =
    activeOption === "all"
      ? PAGE_DATA.rewards
      : PAGE_DATA.rewards.filter((reward) => reward.category === activeOption);

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
                <p>{PAGE_DATA.topCardTitle}</p>
              </div>
              <div className="Scores">
                <div
                  className="Score"
                  onClick={() =>
                    (window.location.href = PAGE_DATA.clubLevelHref)
                  }
                >
                  <p>
                    <span>{PAGE_DATA.score}</span> {PAGE_DATA.scoreText}
                  </p>
                  <div className="Coins">
                    <FontAwesomeIcon icon={faCoins} />
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </div>
                </div>
                <div className="Histoty">
                  {PAGE_DATA.historyItems.map((hist, index) => (
                    <Link href={hist.href} key={index}>
                      <p>{hist.text}</p>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="sliderContainer">
                <button className="sliderBtn next" onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>

                <div className="Options" id="options-track" ref={trackRef}>
                  {PAGE_DATA.sliderOptions.map((opt, index) => (
                    <div
                      key={index}
                      className={`option ${opt.id === activeOption ? "active" : ""}`}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <FontAwesomeIcon icon={opt.icon} />
                      <p>{opt.text}</p>
                    </div>
                  ))}
                </div>

                <button className="sliderBtn prev" onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </div>

              <div className="Options">
                {filteredRewards.length > 0 ? (
                  filteredRewards.map((reward, index) => (
                    <div className="Option" key={reward.id || index}>
                      <div className="R">
                        <img src={reward.image} alt="image" />
                        <p>{reward.title}</p>
                        <span>{reward.date}</span>
                      </div>
                      <div className="L">
                        <p>
                          <FontAwesomeIcon icon={faCoins} />
                          {reward.pointsText}
                        </p>
                        <span>{reward.points}</span>
                        <button>
                          <p>{reward.buttonText}</p>
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "40px 0",
                      color: "var(--textGray)",
                    }}
                  >
                    {PAGE_DATA.emptyMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
