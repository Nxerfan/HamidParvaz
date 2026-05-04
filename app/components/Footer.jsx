import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function Footer() {
  return (
    <footer>
      <div className="Container">
        <div className="TopRow">
          <div className="Contact">
            <div className="Top">
              <span>تلفن پشتیبانی: 38118-025</span>
              <span>ایمیل پشتیبانی: hamidparvazagency@gmail.com </span>
            </div>

            <div className="buttom">
              <Link href="/flight">
                <p>بلیط هواپیما</p>
              </Link>
              <Link href="/hotel">
                <p>رزرو هتل</p>
              </Link>
              <Link href="/tour">
                <p>مشاهده ی تورها</p>
              </Link>
            </div>

            <div className="canccel">
              <Link href="/cancellation">
                <p>پیگیری و کنسلی بلیط</p>
              </Link>
            </div>
          </div>

          <div className="OrgBox">
            <h3>راهکارهای سازمانی</h3>
            <p>
              خدمات اختصاصی برای سازمان‌ها و شرکت‌ها جهت مدیریت سفرهای کاری.
            </p>
            <Link href="/cooperation">
              <button>فعال‌سازی پنل سازمانی</button>
            </Link>
          </div>
        </div>

        <div className="LinksRow">
          <div className="Links">
            <h4>راهنمایی و پشتیبانی</h4>
            <ul>
              <Link href="/faq">
                <li>پرسش‌های متداول</li>
              </Link>
              <Link href="">
                <li>null</li>
              </Link>
              <Link href="/rules">
                <li>شرایط و مقررات</li>
              </Link>
              <Link href="/blog">
                <li>مجله مستر بلیط</li>
              </Link>
              <Link href="">
                <li>null</li>
              </Link>
            </ul>
          </div>

          <div className="Description">
            <div className="Text">
              <h4>لبخند بزن و سفر کن!</h4>
              <p>
                حمید پرواز سامانه آنلاین خرید بلیط هواپیما، چارتری و رزرو هتل و
                تور است؛ راهی سریع و آسان برای برنامه‌ریزی سفرهایتان! تنها با
                چند کلیک می‌توانید بلیط خود را به هر مقصدی که بخواهید تهیه کرده،
                صورتحسابتان را آنلاین پرداخت کنید و بی‌دغدغه آماده سفر خود
                باشید.
              </p>
            </div>

            <div className="Logos">
              <Image src={null} alt="لوگو های شما" width={80} height={80} />
              <Image src={null} alt="لوگو های شما" width={80} height={80} />
              <Image src={null} alt="لوگو های شما" width={80} height={80} />
              <Image src={null} alt="لوگو های شما" width={80} height={80} />
              <Image src={null} alt="لوگو های شما" width={80} height={80} />
            </div>
          </div>
        </div>

        <div className="Bottom">
          <p>تمامی حقوق این وب‌سایت محفوظ است.</p>
          <div className="Social">
            <span role="img" aria-label="instagram">
              📷 اینستاگرام
            </span>
            <span role="img" aria-label="telegram">
              ✈️ تلگرام
            </span>
            <span role="img" aria-label="gmail">
              📧 جیمیل
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
