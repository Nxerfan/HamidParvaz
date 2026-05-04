"use client";
import "../../global.css";
import { useState } from "react";
import Link from "next/link";
import HeaderMakeYourTour from "../../../../components/(Headers)/HeaderMakeYourTour";

const PAGE_DATA = {
  hotelInfo: {
    name: "هتل خاور مشهد",
    address:
      "مشهد، خیابان امام رضا، بین امام رضا ۱۴ و ۱۶ (چهارراه دانش)، جنب بانک ملت",
    mainImage:
      "https://img.mstatic.ir/ZAPV_BviraPri7BLnBEnGpOnl4fU_OrEnWrApELUovE/gravity:nowe:1:20/crop:1279:715/resize:fill/width:790/height:443/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsL0ZENUIwNTMzRTQzQTYzMUE3RDcxNjcyMDA4NERBRDg0LmpwZWc.jpg",
    galleryImages: [
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
      "https://img.mstatic.ir/DYt-dVhuTWFcCpiSzXIwqzdaBbypoRhKS0GLdRZ9VzM/gravity:nowe:0:0/crop:714:400/resize:fill/width:129/height:73/gravity:nowe/enlarge:0/czM6Ly9tcmhvdGVsLzk0MUU1NTk5MkJGMzAxQUM2QjNDRjZFOUZGRDVBRDZGLndlYnA.jpg",
    ],
    description:
      "هتل خاور مشهد در خیابان امام رضا و نزدیک حرم امام رضا واقع شده است و گزینه‌ای مقرون به صرفه برای اقامت در بین هتل‌های شهر مشهد می‌باشد. این هتل 2 ستاره دارای 46 اتاق در ساختمانی 5 طبقه است. هتل در سال 1357 ساخته و در سال 1393 بازسازی خود را به اتمام رساند. در زمان سفرتان می‌توانید اتاق‌های دو تخته، سه تخته، و چهار تخته تمیز و روشنی را در این هتل رزرو کنید. رستوران و کافه هتل هم برای صرف غذا و نوشیدنی در دسترس شما می‌باشند. فاصله هتل خاور مشهد تا حرم امام رضا کمتر از 1 کیلومتر است که با حدود 10 دقیقه پیاده‌روی می‌توانید از درب باب‌الرضا وارد حرم شوید. در اطراف محل اقامتتان هم رستوران و کافه‌های متنوعی قرار دارند و برای خرید سوغات در مشهد هم می‌توانید سری به پاساژهای نزدیک هتل خاور مشهد بزنید. از هتل تا ایستگاه مترو و اتوبوس هم تنها 10 دقیقه پیاده راه دارید که برای تردد در مشهد می‌توانید از آن استفاده کنید.",
  },
  roomsSection: {
    title: "اتاق ها",
    rooms: [
      { id: 1, type: "اتاق دوتخته", meal: "بدون وعده غذایی" },
      { id: 2, type: "اتاق دوتخته", meal: "بدون وعده غذایی" },
      { id: 3, type: "اتاق دوتخته", meal: "بدون وعده غذایی" },
      { id: 4, type: "اتاق دوتخته", meal: "بدون وعده غذایی" },
      { id: 5, type: "اتاق دوتخته", meal: "بدون وعده غذایی" },
    ],
    selectBtnText: "انتخاب اتاق",
    selectBtnLink: "/MakeYourTour(3)",
  },
  footerSection: {
    textPre: "برای دیدن امکانات و دسترسی این هتل به",
    linkText: "این صفحه",
    textPost: "مراجعه کنید",
    href: "/choosedHotel",
  },
};

export default function HotelDetailsPage() {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [roomCounts, setRoomCounts] = useState({});

  const handleCounter = (roomId, counterType, action) => {
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

  return (
    <>
      <HeaderMakeYourTour currentStep={1} />
      <div className="Countainer">
        <div className="GridD">
          <div className="Card">
            <div className="Titel">
              <div className="Mohtava">
                <h3>{PAGE_DATA.hotelInfo.name}</h3>
                <p>{PAGE_DATA.hotelInfo.address}</p>
              </div>
              <button>{PAGE_DATA.roomsSection.selectBtnText}</button>
            </div>
            <div className="ImageCountainer">
              <div className="MainImg">
                <img
                  src={PAGE_DATA.hotelInfo.mainImage}
                  alt={PAGE_DATA.hotelInfo.name}
                />
              </div>
              <div className="MoreImg">
                {PAGE_DATA.hotelInfo.galleryImages.map((src, index) => (
                  <img key={index} src={src} alt={`gallery-${index}`} />
                ))}
              </div>
            </div>
            <div className="Titel">
              <div className="Mohtava">
                <h4>درباره هتل</h4>
              </div>
            </div>
            <div className="Disc">
              <p id="discText" className={isDescExpanded ? "expanded" : ""}>
                {PAGE_DATA.hotelInfo.description}
              </p>
              <span
                id="toggleBtn"
                onClick={() => setIsDescExpanded(!isDescExpanded)}
              >
                {isDescExpanded ? "کمتر" : "بیشتر"}
              </span>
            </div>
          </div>

          <div className="Card">
            <div className="Titel">
              <div className="Mohtava">
                <h3>{PAGE_DATA.roomsSection.title}</h3>
              </div>
            </div>

            {PAGE_DATA.roomsSection.rooms.map((room) => {
              const currentCounts = roomCounts[room.id] || {
                rooms: 0,
                extraBeds: 0,
              };
              return (
                <div key={room.id} className="RoomSelect">
                  <div className="RoomSelectRow">
                    <div className="RoomSelectType">
                      <div className="RoomSelectTitle">{room.type}</div>
                      <div className="RoomSelectSubtitle">{room.meal}</div>
                    </div>

                    <div className="RoomSelectCounter">
                      <div className="RoomSelectCounterLabel">تعداد اتاق</div>
                      <div className="RoomSelectCounterBox">
                        <button
                          className="RoomSelectBtn"
                          onClick={() =>
                            handleCounter(room.id, "rooms", "decrease")
                          }
                        >
                          −
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
                          +
                        </button>
                      </div>
                    </div>

                    <div className="RoomSelectCounter">
                      <div className="RoomSelectCounterLabel">تخت اضافه</div>
                      <div className="RoomSelectCounterBox">
                        <button
                          className="RoomSelectBtn"
                          onClick={() =>
                            handleCounter(room.id, "extraBeds", "decrease")
                          }
                        >
                          −
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
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href={PAGE_DATA.roomsSection.selectBtnLink}
              className="RoomSelectSelectBtn"
            >
              {PAGE_DATA.roomsSection.selectBtnText}
            </Link>
          </div>

          <div className="Card">
            <div className="Titel">
              <div className="Footer2">
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
