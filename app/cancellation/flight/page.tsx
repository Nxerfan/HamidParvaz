import "../global.css";
import SecondHeader from "../../components/(Headers)/SecondHeader";

const PAGE_DATA = {
  hero: {
    title: "پیگیری و استرداد رزرو بلیط",
    description: "وضعیت بلیت خود را بررسی کنید یا درخواست کنسلی ثبت کنید.",
  },
  search: {
    fields: [
      {
        label: "شماره موبایل یا ایمیل",
        placeholder: "مثال: 09121234567",
        type: "text",
      },
      {
        label: "کد پیگیری / شماره سریال بلیت",
        placeholder: "مثال: NX-45892",
        type: "text",
      },
    ],
    buttonText: "جستجوی رزرو",
  },
  sectionTitle: "جزئیات رزرو شما",
  booking: {
    typeBadge: "پرواز داخلی",
    bookingLabel: "شماره رزرو:",
    bookingID: "NX-45892",
    status: "تایید شده",
    statusClass: "success",
    route: {
      from: {
        city: "تهران (THR)",
        time: "۱۴۰۲/۱۲/۰۵ - ۱۰:۳۰",
      },
      to: {
        city: "کیش (KIH)",
        time: "۱۴۰۲/۱۲/۰۵ - ۱۲:۱۵",
      },
    },
    passengerLabel: "مسافران:",
    passengers: "۱ بزرگسال",
    airlineLabel: "ایرلاین:",
    airline: "ماهان",
    actions: [
      { text: "دانلود بلیت", className: "BtnSecondary" },
      { text: "درخواست کنسلی", className: "BtnDanger" },
      { text: "پشتیبانی", className: "BtnSecondary" },
    ],
  },
  policy: {
    title: "قوانین استرداد",
    items: [
      "هزینه کنسلی بر اساس قوانین تامین‌کننده محاسبه می‌شود.",
      "مبلغ بین ۲۴ تا ۷۲ ساعت کاری واریز می‌شود.",
      "بلیط‌های چارتری غیرقابل کنسلی آنلاین هستند.",
    ],
  },
};

export default function TrackPage() {
  return (
    <>
      <SecondHeader />
      <div className="TrackContainer">
        <div className="TrackHero">
          <h1>{PAGE_DATA.hero.title}</h1>
          <p>{PAGE_DATA.hero.description}</p>
        </div>

        <div className="SearchCard">
          <div className="Grid2">
            {PAGE_DATA.search.fields.map((field, index) => (
              <div key={index} className="Field">
                <label>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} />
              </div>
            ))}
          </div>

          <div className="SubmitArea">
            <button className="SubmitBtn">{PAGE_DATA.search.buttonText}</button>
          </div>
        </div>

        <h2 className="SectionTitle">{PAGE_DATA.sectionTitle}</h2>

        <div className="BookingResultCard">
          <div className="ResultHeader">
            <div className="TypeBadge">{PAGE_DATA.booking.typeBadge}</div>
            <div className="BookingID">
              {PAGE_DATA.booking.bookingLabel}{" "}
              <span>{PAGE_DATA.booking.bookingID}</span>
            </div>
            <div className={`StatusBadge ${PAGE_DATA.booking.statusClass}`}>
              {PAGE_DATA.booking.status}
            </div>
          </div>

          <div className="ResultBody">
            <div className="TravelInfo">
              <div className="Route">
                <div className="Point">
                  <strong>{PAGE_DATA.booking.route.from.city}</strong>
                  <span>{PAGE_DATA.booking.route.from.time}</span>
                </div>
                <div className="Line"></div>
                <div className="Point">
                  <strong>{PAGE_DATA.booking.route.to.city}</strong>
                  <span>{PAGE_DATA.booking.route.to.time}</span>
                </div>
              </div>

              <div className="PassengerInfo">
                <span>
                  {PAGE_DATA.booking.passengerLabel}{" "}
                  <strong>{PAGE_DATA.booking.passengers}</strong>
                </span>
                <span>
                  {PAGE_DATA.booking.airlineLabel}{" "}
                  <strong>{PAGE_DATA.booking.airline}</strong>
                </span>
              </div>
            </div>

            <div className="ActionButtons">
              {PAGE_DATA.booking.actions.map((action, index) => (
                <button key={index} className={action.className}>
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="PolicyCard">
          <div className="SectionTitle">{PAGE_DATA.policy.title}</div>
          <div className="PolicyContent">
            <ul>
              {PAGE_DATA.policy.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
