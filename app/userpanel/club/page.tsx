"use client";
import { useState, useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../global.css";

const PAGE_DATA = {
  username: "عرفان صادقی ",
  topCardTitle: "جوایز کلاب حمید پرواز ",
  scoreText: "امتیاز کاربری شما ",
  historyItems: [
    { href: "/userpanel/club/history ", text: "تاریخچه‌ی امتیازات " },
    { href: "/userpanel/club/used-score ", text: "کدهای تخفیف دریافت شده " },
  ],
  sliderOptions: [
    { id: "all ", icon: faLayerGroup, text: "همه " },
    { id: "travel ", icon: faPlaneDeparture, text: "سفر " },
    { id: "lottery ", icon: faTicketAlt, text: "قرعه‌کشی " },
    { id: "education ", icon: faGraduationCap, text: "آموزشی " },
    { id: "courses ", icon: faBookOpen, text: "دوره‌ها " },
    { id: "services ", icon: faConciergeBell, text: "خدمات " },
    { id: "fun ", icon: faGamepad, text: "تفریح " },
    { id: "other ", icon: faEllipsisH, text: "سایر " },
    { id: "food ", icon: faUtensils, text: "رستوران " },
  ],
  rewards: [
    {
      id: 1,
      category: "travel ",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg ",
      title: "۲۰ هزار تومان تخفیف | سفر با اتوبوس ",
      date: "29 / اسفند / 1404 ",
      points: 3500,
      pointsText: "امتیاز مورد نیاز ",
      buttonText: "جزئیات بیشتر ",
      description:
        "با استفاده از این جایزه می‌توانید ۲۰ هزار تومان تخفیف روی بلیط اتوبوس دریافت کنید. این کد تخفیف برای تمامی مسیرهای داخلی قابل استفاده است و تا ۳ ماه پس از دریافت اعتبار دارد. ",
      terms: [
        "حداقل خرید بلیط ۱۰۰ هزار تومان ",
        "قابل استفاده فقط برای یک بار ",
        "غیرقابل انتقال به غیر ",
      ],
    },
    {
      id: 2,
      category: "food ",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg ",
      title: "پیشنهاد ویژه رستوران ",
      date: "15 / اسفند / 1404 ",
      points: 1500,
      pointsText: "امتیاز مورد نیاز ",
      buttonText: "جزئیات بیشتر ",
      description:
        "پیشنهاد ویژه رستوران شامل یک وعده غذایی رایگان در رستوران‌های طرف قرارداد می‌باشد. ",
      terms: [
        "فقط در رستوران‌های طرف قرارداد ",
        "حداکثر تا سقف ۲۰۰ هزار تومان ",
      ],
    },
    {
      id: 3,
      category: "lottery ",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg ",
      title: "قرعه‌کشی جام حذفی ",
      date: "01 / فروردین / 1405 ",
      points: 5000,
      pointsText: "امتیاز مورد نیاز ",
      buttonText: "جزئیات بیشتر ",
      description:
        "با شرکت در قرعه‌کشی جام حذفی، شانس خود را برای برنده شدن بلیط VIP مسابقه امتحان کنید. ",
      terms: [
        "تاریخ قرعه‌کشی: ۱۵ فروردین ",
        "هر کاربر فقط یک بار می‌تواند شرکت کند ",
      ],
    },
    {
      id: 4,
      category: "travel ",
      image:
        "http://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg ",
      title: "بلیط هواپیما تهران-کیش ",
      date: "10 / اردیبهشت / 1405 ",
      points: 10000,
      pointsText: "امتیاز مورد نیاز ",
      buttonText: "جزئیات بیشتر ",
      description:
        "یک بلیط رفت و برگشت هواپیما از تهران به کیش به همراه اقامت ۳ شب در هتل ۴ ستاره. ",
      terms: [
        "اعتبار تا پایان تابستان ",
        "شامل صبحانه رایگان ",
        "امکان کنسلی تا ۴۸ ساعت قبل ",
      ],
    },
  ],
  emptyMessage: "درحال حاضر جایزه ای در این بخش وجود ندارد ",
  editLabel: "Edit profile ",
  editIcon: "✎ ",
  score: 0,
  clubLevelHref: "/userpanel/club/level ",
};

interface RewardItem {
  id: number;
  category: string;
  image: string;
  title: string;
  date: string;
  points: number;
  pointsText: string;
  buttonText: string;
  description: string;
  terms: string[];
}

export default function Page() {
  const [activeOption, setActiveOption] = useState(
    PAGE_DATA.sliderOptions[0].id,
  );
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement | null>(null);

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

  const handleSelectOption = (id: string) => {
    setActiveOption(id);
  };

  const openModal = (reward: RewardItem) => {
    setSelectedReward(reward);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedReward(null);
    document.body.style.overflow = "auto";
  };

  const filteredRewards =
    activeOption === "all"
      ? PAGE_DATA.rewards
      : PAGE_DATA.rewards.filter((reward) => reward.category === activeOption);

  return (
    <>
      <UserPannelHeader />
      <div className="containerr ">
        <div className="right ">
          <FilterUserPannel />
        </div>
        <div className="left ">
          <div className="Card ">
            <div className="UserPanelParts ">
              <div className="TopCard ">
                <p>{PAGE_DATA.topCardTitle}</p>
              </div>
              <div className="Scores ">
                <div
                  className="Score "
                  onClick={() =>
                    router.push(PAGE_DATA.clubLevelHref.trim())
                  }
                >
                  <p>
                    <span>{PAGE_DATA.score}</span> {PAGE_DATA.scoreText}
                  </p>
                  <div className="Coins ">
                    <FontAwesomeIcon icon={faCoins} />
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </div>
                </div>
                <div className="Histoty ">
                  {PAGE_DATA.historyItems.map((hist, index) => (
                    <Link href={hist.href} key={index}>
                      <p>{hist.text}</p>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="sliderContainer ">
                <button className="sliderBtn next " onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <div className="Options " id="options-track " ref={trackRef}>
                  {PAGE_DATA.sliderOptions.map((opt, index) => (
                    <div
                      key={index}
                      className={`option ${opt.id === activeOption ? "active " : " "}`}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <FontAwesomeIcon icon={opt.icon} />
                      <p>{opt.text}</p>
                    </div>
                  ))}
                </div>
                <button className="sliderBtn prev " onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </div>

              <div className="Options ">
                {filteredRewards.length > 0 ? (
                  filteredRewards.map((reward, index) => (
                    <div className="Option " key={reward.id || index}>
                      <div className="R ">
                        <div style={{ position: "relative", width: "100%", height: "120px" }}>
                          <Image src={reward.image} alt="image " fill sizes="200px" style={{ objectFit: "cover", borderRadius: "8px" }} />
                        </div>
                        <p>{reward.title}</p>
                        <span>{reward.date}</span>
                      </div>
                      <div className="L ">
                        <p>
                          <FontAwesomeIcon icon={faCoins} />
                          {reward.pointsText}
                        </p>
                        <span>{reward.points}</span>
                        <button onClick={() => openModal(reward)}>
                          <p>{reward.buttonText}</p>
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      width: "100% ",
                      textAlign: "center",
                      padding: "40px 0 ",
                      color: "var(--textGray) ",
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

      {/* Modal / Popup */}
      {selectedReward && (
        <div
          className="reward-modal-overlay "
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100% ",
            height: "100% ",
            backgroundColor: "rgba(0, 0, 0, 0.6) ",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px ",
            direction: "rtl",
          }}
        >
          <div
            className="reward-modal "
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff ",
              borderRadius: "16px ",
              maxWidth: "600px ",
              width: "100% ",
              maxHeight: "90vh ",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2) ",
              animation: "modalFadeIn 0.3s ease-out ",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "12px ",
                left: "12px ",
                background: "rgba(255, 255, 255, 0.9) ",
                border: "none",
                width: "36px ",
                height: "36px ",
                borderRadius: "50% ",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15) ",
              }}
            >
              <FontAwesomeIcon icon={faTimes} style={{ color: "#333 " }} />
            </button>

            {/* Modal Image */}
            <div
              style={{
                width: "100% ",
                height: "220px ",
                overflow: "hidden",
                borderRadius: "16px 16px 0 0 ",
              }}
            >              <Image
                src={selectedReward.image}
                alt={selectedReward.title}
                fill
                sizes="600px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Modal Content */}
            <div style={{ padding: "24px " }}>
              <h2
                style={{
                  fontSize: "20px ",
                  fontWeight: 700,
                  marginBottom: "12px ",
                  color: "#222 ",
                }}
              >
                {selectedReward.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px ",
                  marginBottom: "16px ",
                  color: "#666 ",
                  fontSize: "14px ",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{selectedReward.date}</span>
              </div>

              {/* Points Badge */}
              <div
                style={{
                  display: "inline-flex ",
                  alignItems: "center",
                  gap: "8px ",
                  backgroundColor: "#fff8e1 ",
                  color: "#f59e0b ",
                  padding: "8px 16px ",
                  borderRadius: "24px ",
                  marginBottom: "20px ",
                  fontWeight: 600,
                }}
              >
                <FontAwesomeIcon icon={faCoins} />
                <span>{selectedReward.points}</span>
                <span style={{ color: "#666 ", fontWeight: 400 }}>
                  {selectedReward.pointsText}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "20px " }}>
                <h3
                  style={{
                    fontSize: "16px ",
                    fontWeight: 600,
                    marginBottom: "8px ",
                    color: "#333 ",
                  }}
                >
                  توضیحات
                </h3>
                <p
                  style={{
                    color: "#555 ",
                    lineHeight: 1.8,
                    fontSize: "14px ",
                  }}
                >
                  {selectedReward.description ||
                    "توضیحاتی برای این جایزه ثبت نشده است. "}
                </p>
              </div>

              {/* Terms */}
              {selectedReward.terms && selectedReward.terms.length > 0 && (
                <div style={{ marginBottom: "24px " }}>
                  <h3
                    style={{
                      fontSize: "16px ",
                      fontWeight: 600,
                      marginBottom: "8px ",
                      color: "#333 ",
                    }}
                  >
                    شرایط استفاده
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {selectedReward.terms.map((term, i) => (
                      <li
                        key={i}
                        style={{
                          padding: "6px 0 ",
                          color: "#555 ",
                          fontSize: "14px ",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px ",
                        }}
                      >
                        <span style={{ color: "#10b981 " }}>✓</span>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <button
                style={{
                  width: "100% ",
                  padding: "14px ",
                  backgroundColor: "#2563eb ",
                  color: "#fff ",
                  border: "none",
                  borderRadius: "12px ",
                  fontSize: "16px ",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s ",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1d4ed8 ")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2563eb ")
                }
              >
                دریافت جایزه
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
