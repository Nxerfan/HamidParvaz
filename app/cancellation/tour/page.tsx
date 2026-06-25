import "../global.css";
import SecondHeader from "../../components/(Headers)/SecondHeader";

const PAGE_DATA = {
  hero: {
    title: "پیگیری و کنسلی رزرو تور",
    description: "وضعیت رزرو تور خود را بررسی کنید یا درخواست کنسلی ثبت کنید.",
  },
  search: {
    fields: [
      {
        label: "شماره موبایل یا ایمیل",
        placeholder: "مثال: 09121234567",
        type: "text",
      },
      {
        label: "کد رزرو تور / شماره پیگیری",
        placeholder: "مثال: TR-45892",
        type: "text",
      },
    ],
    buttonText: "جستجو",
  },
  sectionTitle: "جزئیات رزرو شما",
  booking: {
    typeBadge: "تور کیش ۵ روزه",
    bookingLabel: "شماره رزرو:",
    bookingID: "TR-45892",
    status: "تایید شده",
    statusClass: "success",
    route: {
      from: {
        Time: "۱۴۰۳/۰۱/۱۰",
        InOrOut: "شروع تور",
      },
      to: {
        Time: "۱۴۰۳/۰۱/۱۵",
        InOrOut: "پایان تور",
      },
    },
    passengerLabel: "نام مسافر: علی علوی",
    passengers: "۱ بزرگسال",
    tourLabel: "نوع تور:",
    tour: "تور لوکس کیش",
    actions: [
      { text: "دانلود واچر", className: "BtnSecondary" },
      { text: "درخواست کنسلی", className: "BtnDanger" },
      { text: "پشتیبانی", className: "BtnSecondary" },
    ],
  },
  policy: {
    title: "قوانین کنسلی تور",
    items: [
      "لغو رزرو تا ۷ روز قبل از شروع تور بدون جریمه انجام می‌شود.",
      "لغو رزرو کمتر از ۷ روز قبل از شروع تور شامل جریمه ۳۰٪ کل هزینه خواهد بود.",
      "مبلغ استرداد حداکثر تا ۷۲ ساعت کاری به حساب مسافر واریز می‌گردد.",
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
                  <strong>{PAGE_DATA.booking.route.from.Time}</strong>
                  <span>{PAGE_DATA.booking.route.from.InOrOut}</span>
                </div>
                <div className="Line"></div>
                <div className="Point">
                  <strong>{PAGE_DATA.booking.route.to.Time}</strong>
                  <span>{PAGE_DATA.booking.route.to.InOrOut}</span>
                </div>
              </div>

              <div className="PassengerInfo">
                <span>
                  {PAGE_DATA.booking.passengerLabel}{" "}
                  <strong>{PAGE_DATA.booking.passengers}</strong>
                </span>
                <span>
                  {PAGE_DATA.booking.tourLabel}{" "}
                  <strong>{PAGE_DATA.booking.tour}</strong>
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
