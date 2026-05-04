import Link from "next/link";
import {
  faPlane,
  faHotel,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./global.css";
import SecondHeader from "../components/(Headers)/SecondHeader";

const PAGE_DATA = {
  header: {
    title: "مدیریت رزروها",
    description: "لطفاً سرویسی را که می‌خواهید لغو کنید انتخاب نمایید",
  },
  cards: [
    {
      href: "/cancellation/flight",
      icon: faPlane,
      title: "لغو بلیط هواپیما",
      description: "برای استرداد یا لغو پرواز خود از طریق این بخش اقدام کنید.",
      buttonText: "انتخاب گزینه",
    },
    {
      href: "/cancellation/hotel",
      icon: faHotel,
      title: "لغو رزرو هتل",
      description: "مدیریت رزروهای اقامتی و کنسل کردن اتاق‌های هتل.",
      buttonText: "انتخاب گزینه",
    },
    {
      href: "/cancellation/tour",
      icon: faMapMarkerAlt,
      title: "لغو تور گردشگری",
      description: "لغو تورهای گروهی و تفریحی و پیگیری استرداد هزینه.",
      buttonText: "انتخاب گزینه",
    },
  ],
};

export default function CancellationPage() {
  return (
    <>
      <SecondHeader />
      <div className="mainContainer">
        <div className="headerSection">
          <h1>{PAGE_DATA.header.title}</h1>
          <p>{PAGE_DATA.header.description}</p>
        </div>

        <main className="gridLayout">
          {PAGE_DATA.cards.map((card, index) => (
            <div key={index} className="cardWrapper">
              <Link href={card.href} className="cardLink" tabIndex={0}>
                <div className="cardComponent">
                  <div className="iconBox">
                    <FontAwesomeIcon icon={card.icon} />
                  </div>
                  <div className="contentBox">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                  </div>
                  <div className="btnAction">{card.buttonText}</div>
                </div>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
