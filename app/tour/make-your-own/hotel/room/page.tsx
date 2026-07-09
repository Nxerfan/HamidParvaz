"use client";
import "../../global.css";
import "../../premium-rooms.css";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faChevronDown,
  faChevronUp,
  faMinus,
  faPlus,
  faArrowLeft,
  faCircleInfo,
  faBed,
  faUtensils,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import HeaderMakeYourTour from "../../../../components/(Headers)/HeaderMakeYourTour";

interface Room {
  id: number;
  type: string;
  meal: string;
  capacity: string;
  bedType: string;
}

const PAGE_DATA = {
  hotelInfo: {
    name: "هتل خاور مشهد",
    stars: 2,
    address:
      "مشهد، خیابان امام رضا، بین امام رضا ۱۴ و ۱۶ (چهارراه دانش)، جنب بانک ملت",
    distanceToHaram: "کمتر از ۱ کیلومتر تا حرم",
    mainImage:
      "https://www.eghamat24.com/app/public/new_images/1122x701/Mashhad-Khavar-19.webp",
    galleryImages: [
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
    ],
    description:
      "هتل خاور مشهد در خیابان امام رضا و نزدیک حرم امام رضا واقع شده است و گزینه‌ای مقرون به صرفه برای اقامت در بین هتل‌های شهر مشهد می‌باشد. این هتل 2 ستاره دارای 46 اتاق در ساختمانی 5 طبقه است. هتل در سال 1357 ساخته و در سال 1393 بازسازی خود را به اتمام رساند. در زمان سفرتان می‌توانید اتاق‌های دو تخته، سه تخته، و چهار تخته تمیز و روشنی را در این هتل رزرو کنید. رستوران و کافه هتل هم برای صرف غذا و نوشیدنی در دسترس شما می‌باشند. فاصله هتل خاور مشهد تا حرم امام رضا کمتر از 1 کیلومتر است که با حدود 10 دقیقه پیاده‌روی می‌توانید از درب باب‌الرضا وارد حرم شوید. در اطراف محل اقامتتان هم رستوران و کافه‌های متنوعی قرار دارند و برای خرید سوغات در مشهد هم می‌توانید سری به پاساژهای نزدیک هتل خاور مشهد بزنید. از هتل تا ایستگاه مترو و اتوبوس هم تنها 10 دقیقه پیاده راه دارید که برای تردد در مشهد می‌توانید از آن استفاده کنید.",
    highlights: [
      { icon: faLocationDot, text: "فاصله تا حرم: کمتر از ۱ کیلومتر" },
      { icon: faBed, text: "۴۶ اتاق در ۵ طبقه" },
      { icon: faUtensils, text: "رستوران و کافه" },
      { icon: faStar, text: "بازسازی شده در سال ۱۳۹۳" },
    ],
  },
  roomsSection: {
    title: "اتاق‌های موجود",
    subtitle: "نوع و تعداد اتاق‌های مورد نظر خود را انتخاب کنید",
    rooms: [
      {
        id: 1,
        type: "اتاق دو تخته",
        meal: "بدون وعده غذایی",
        capacity: "۲ نفر",
        bedType: "یک تخت دو نفره",
      },
      {
        id: 2,
        type: "اتاق دو تخته اکونومی",
        meal: "با صبحانه",
        capacity: "۲ نفر",
        bedType: "دو تخت یک نفره",
      },
      {
        id: 3,
        type: "اتاق سه تخته",
        meal: "بدون وعده غذایی",
        capacity: "۳ نفر",
        bedType: "یک تخت دو نفره + یک تخت یک نفره",
      },
      {
        id: 4,
        type: "اتاق چهار تخته",
        meal: "با صبحانه",
        capacity: "۴ نفر",
        bedType: "چهار تخت یک نفره",
      },
    ],
    selectBtnText: "ادامه و انتخاب اتاق",
    selectBtnLink: "/tour/make-your-own/flight/away",
  },
  footerSection: {
    textPre: "برای دیدن امکانات و دسترسی‌های کامل هتل به",
    linkText: "صفحه اختصاصی هتل",
    textPost: "مراجعه کنید",
    href: "/hotel/hotelch",
  },
};

export default function HotelDetailsPage() {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [roomCounts, setRoomCounts] = useState<
    Record<string, { rooms: number; extraBeds: number }>
  >({});
  const [activeImage, setActiveImage] = useState(0);
  const [showRoomList, setShowRoomList] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(() => {
    if (PAGE_DATA.roomsSection.rooms.length > 0) {
      return PAGE_DATA.roomsSection.rooms[0];
    }
    return null;
  });

  const handleCounter = (
    roomId: number,
    counterType: "rooms" | "extraBeds",
    action: "increase" | "decrease",
  ) => {
    setRoomCounts((prev) => {
      const roomState = prev[roomId] || { rooms: 0, extraBeds: 0 };
      const currentValue = roomState[counterType];
      const newValue =
        action === "increase"
          ? currentValue + 1
          : Math.max(0, currentValue - 1);
      return {
        ...prev,
        [roomId]: {
          ...roomState,
          [counterType]: newValue,
        },
      };
    });
  };

  const totalSelectedRooms = Object.values(roomCounts).reduce(
    (sum, r) => sum + r.rooms,
    0,
  );
  const totalSelectedExtraBeds = Object.values(roomCounts).reduce(
    (sum, r) => sum + r.extraBeds,
    0,
  );

  return (
    <>
      <HeaderMakeYourTour currentStep={2} />
      <div className="Countainer">
        <div className="GridD">
          {/* ===== کارت اطلاعات هتل ===== */}
          <div className="Card hotelInfoCard">
            <div className="hotelInfoHeader">
              <div className="hotelInfoMain">
                <div className="hotelInfoText">
                  <div className="hotelNameRow">
                    <h3>{PAGE_DATA.hotelInfo.name}</h3>
                    <div className="starsBadge">
                      {[...Array(PAGE_DATA.hotelInfo.stars)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} />
                      ))}
                    </div>
                  </div>
                  <p className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {PAGE_DATA.hotelInfo.address}
                  </p>
                </div>
                <Link
                  href={PAGE_DATA.roomsSection.selectBtnLink}
                  className="quickBookBtn"
                >
                  <span>{PAGE_DATA.roomsSection.selectBtnText}</span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
              </div>

              <div className="hotelHighlights">
                {PAGE_DATA.hotelInfo.highlights.map((item, i) => (
                  <div className="highlightItem" key={i}>
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* گالری تصاویر */}
            <div className="ImageCountainer">
              <div className="MainImg" onClick={() => setActiveImage((prev) => (prev + 1) % (PAGE_DATA.hotelInfo.galleryImages.length + 1))}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={activeImage === 0 ? PAGE_DATA.hotelInfo.mainImage : PAGE_DATA.hotelInfo.galleryImages[activeImage - 1]}
                    alt={PAGE_DATA.hotelInfo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    unoptimized
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="mainImgBadge">
                  <span>{activeImage === 0 ? "تصویر اصلی" : `${activeImage} / ${PAGE_DATA.hotelInfo.galleryImages.length}`}</span>
                </div>
              </div>
              <div className="MoreImg">
                <div
                  className={`galleryThumb ${activeImage === 0 ? "active" : ""}`}
                  onClick={() => setActiveImage(0)}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={PAGE_DATA.hotelInfo.mainImage} alt="main" fill sizes="120px" unoptimized style={{ objectFit: "cover" }} />
                  </div>
                  <div className="galleryOverlay">
                    <span>اصلی</span>
                  </div>
                </div>
                {PAGE_DATA.hotelInfo.galleryImages.map((src, index) => (
                  <div
                    key={index}
                    className={`galleryThumb ${activeImage === index + 1 ? "active" : ""}`}
                    onClick={() => setActiveImage(index + 1)}
                  >
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image src={src} alt={`gallery-${index}`} fill sizes="120px" unoptimized style={{ objectFit: "cover" }} />
                    </div>
                    <div className="galleryOverlay">
                      <span>{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* توضیحات هتل */}
            <div className="aboutSection">
              <div className="aboutTitle">
                <div className="titleIcon">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div>
                <h4>درباره هتل</h4>
              </div>
              <div className="Disc">
                <p className={isDescExpanded ? "expanded" : ""}>
                  {PAGE_DATA.hotelInfo.description}
                </p>
                <button
                  className="toggleDescBtn"
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                >
                  <span>{isDescExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}</span>
                  <FontAwesomeIcon
                    icon={isDescExpanded ? faChevronUp : faChevronDown}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ===== کارت اتاق‌ها ===== */}
          <div className="Card roomsCard">
            <div className="roomsHeader">
              <div className="roomsHeaderMain">
                <h3>{PAGE_DATA.roomsSection.title}</h3>
                <p>{PAGE_DATA.roomsSection.subtitle}</p>
              </div>
              {(totalSelectedRooms > 0 || totalSelectedExtraBeds > 0) && (
                <div className="selectionSummary">
                  <div className="summaryItem">
                    <span className="summaryCount">{totalSelectedRooms}</span>
                    <span className="summaryLabel">اتاق</span>
                  </div>
                  <div className="summaryDivider" />
                  <div className="summaryItem">
                    <span className="summaryCount">
                      {totalSelectedExtraBeds}
                    </span>
                    <span className="summaryLabel">تخت اضافه</span>
                  </div>
                </div>
              )}
            </div>

            <div className="roomsContent">
              {showRoomList ? (
                PAGE_DATA.roomsSection.rooms.map((room) => {
                  const currentCounts = roomCounts[room.id] || {
                    rooms: 0,
                    extraBeds: 0,
                  };
                  return (
                    <div
                      key={room.id}
                      className={`RoomSelect ${currentCounts.rooms > 0 ? "selected" : ""}`}
                    >
                      <div className="RoomSelectRow">
                        <div className="RoomSelectType">
                          <div className="RoomSelectIcon">
                            <FontAwesomeIcon icon={faBed} />
                          </div>
                          <div className="RoomSelectInfo">
                            <div className="RoomSelectTitle">{room.type}</div>
                            <div className="RoomSelectSubtitle">
                              <span className="mealTag">
                                <FontAwesomeIcon icon={faUtensils} />
                                {room.meal}
                              </span>
                            </div>
                            <div className="RoomSelectMeta">
                              <span>ظرفیت: {room.capacity}</span>
                              <span>•</span>
                              <span>{room.bedType}</span>
                            </div>
                          </div>
                        </div>

                        <div className="RoomSelectCounters">
                          <div className="RoomSelectCounter">
                            <div className="RoomSelectCounterLabel">
                              تعداد اتاق
                            </div>
                            <div className="RoomSelectCounterBox">
                              <button
                                className={`RoomSelectBtn ${currentCounts.rooms === 0 ? "disabled" : ""}`}
                                onClick={() =>
                                  handleCounter(room.id, "rooms", "decrease")
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span className="RoomSelectValue">
                                {currentCounts.rooms}
                              </span>
                              <button
                                className="RoomSelectBtn"
                                onClick={() =>
                                  handleCounter(room.id, "rooms", "increase")
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>

                          <div className="RoomSelectCounter">
                            <div className="RoomSelectCounterLabel">
                              تخت اضافه
                            </div>
                            <div className="RoomSelectCounterBox">
                              <button
                                className={`RoomSelectBtn ${currentCounts.extraBeds === 0 ? "disabled" : ""}`}
                                onClick={() =>
                                  handleCounter(room.id, "extraBeds", "decrease")
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span className="RoomSelectValue">
                                {currentCounts.extraBeds}
                              </span>
                              <button
                                className="RoomSelectBtn"
                                onClick={() =>
                                  handleCounter(room.id, "extraBeds", "increase")
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : selectedRoom && (
                <div className="SelectedRoomCard">
                  <div className="SelectedRoomHeader">
                    <h3>اتاق انتخاب شده شما</h3>
                    <button
                      className="ChangeSelectionBtn"
                      onClick={() => {
                        setSelectedRoom(null);
                        setShowRoomList(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faRotateRight} /> تغییر اتاق
                    </button>
                  </div>

                  <div className="SelectedRoomContent">
                    <div className="SelectedRoomInfo">
                      <div className="SelectedRoomType">
                        <div className="SelectedRoomIcon">
                          <FontAwesomeIcon icon={faBed} />
                        </div>
                        <div className="SelectedRoomDetails">
                          <h4>{selectedRoom.type}</h4>
                          <div className="SelectedRoomMeta">
                            <span className="mealTag">
                              <FontAwesomeIcon icon={faUtensils} />
                              {selectedRoom.meal}
                            </span>
                            <span>•</span>
                            <span>ظرفیت: {selectedRoom.capacity}</span>
                            <span>•</span>
                            <span>{selectedRoom.bedType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {totalSelectedRooms > 0 && (
                    <div className="SelectedRoomSummary">
                      <div className="SummaryItem">
                        <span className="SummaryCount">{totalSelectedRooms}</span>
                        <span className="SummaryLabel">اتاق انتخاب شده</span>
                      </div>
                      <div className="SummaryDivider" />
                      <div className="SummaryItem">
                        <span className="SummaryCount">
                          {totalSelectedExtraBeds}
                        </span>
                        <span className="SummaryLabel">تخت اضافه انتخاب شده</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {showRoomList && (
              <Link
                href={PAGE_DATA.roomsSection.selectBtnLink}
                className={`RoomSelectSelectBtn ${totalSelectedRooms === 0 ? "disabled" : ""}`}
              >
                <span className="btnText">
                  {PAGE_DATA.roomsSection.selectBtnText}
                </span>
                <span className="btnCount">
                  {totalSelectedRooms} اتاق انتخاب شد
                </span>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
            )}
          </div>

          {/* ===== کارت فوتر ===== */}
          <div className="Card footerCard">
            <div className="Titel">
              <div className="Footer2">
                <FontAwesomeIcon icon={faCircleInfo} />
                <h3>
                  {PAGE_DATA.footerSection.textPre}{" "}
                  <Link href={PAGE_DATA.footerSection.href}>
                    {PAGE_DATA.footerSection.linkText}
                  </Link>{" "}
                  {PAGE_DATA.footerSection.textPost}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
