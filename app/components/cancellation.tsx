import Link from "next/link";

interface HotelTrackingProps {
  title: string;
  subtitle: string;
  sectionTitle: string;
  policyTitle: string;
  policyItems: string[];
}

export default function HotelTracking({
  title,
  subtitle,
  sectionTitle,
  policyTitle,
  policyItems,
}: HotelTrackingProps) {
  return (
    <div className="TrackContainer">
      {/* Hero */}
      <div className="TrackHero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {/* Search */}
      <div className="SearchCard">
        <div className="Grid2">
          <div className="Field">
            <label>شماره موبایل یا ایمیل</label>
            <input type="text" placeholder="مثال: 09121234567" />
          </div>
          <div className="Field">
            <label>  شماره پیگیری</label>
            <input type="text" placeholder="مثال: HT-45892" />
          </div>
        </div>

        <div className="SubmitArea">
          <button className="SubmitBtn">جستجوی رزرو</button>
        </div>
      </div>

      {/* Section title */}
      <div className="SectionTitle">{sectionTitle}</div>

      {/* Result (static sample) */}
      <div className="BookingResultCard">
        <div className="ResultHeader">
          <div className="BookingID">
            شماره رزرو: <span>HT-45892</span>
          </div>
          <div className="StatusBadge success">تایید شده</div>
        </div>

        <div className="ResultBody">
          <div className="TravelInfo">
            <div className="Route">
              <div className="Point">
                <strong>۱۴۰۳/۰۱/۱۰</strong>
                <span>ورود (Check-in)</span>
              </div>
              <div className="Line" />
              <div className="Point">
                <strong>۱۴۰۳/۰۱/۱۵</strong>
                <span>خروج (Check-out)</span>
              </div>
            </div>

            <div className="PassengerInfo">
              <span>
                نام مسافر: <strong>علی علوی</strong>
              </span>
              <span>
                تعداد نفرات: <strong>۲ نفر</strong>
              </span>
              <span>
                نوع اتاق: <strong>سوئیت رویال</strong>
              </span>
            </div>
          </div>

          <div className="ActionButtons">
            <Link href="/voucher/HT-45892" className="BtnSecondary">
              دانلود واچر
            </Link>
            <Link href="/cancel/HT-45892" className="BtnDanger">
              درخواست کنسلی
            </Link>
          </div>
        </div>
      </div>

      {/* Policy */}
      <div className="PolicyCard">
        <div className="SectionTitle">{policyTitle}</div>
        <div className="PolicyContent">
          <ul>
            {policyItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
