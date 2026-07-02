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
              <a
                href="tel:+9838118025"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <span>تلفن پشتیبانی: 38118-025</span>
              </a>
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
              <Link href="/tour/make-your-own">
                <p>تور دلخواه خود را بسازید</p>
              </Link>
              <Link href="/reserve/auto-reserve">
                <p>رزرو خودکار</p>
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
            <Link href="/company">
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
              <Link href="/rules">
                <li>شرایط و مقررات</li>
              </Link>
              <Link href="/blog">
                <li>مجله حمید پرواز</li>
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
              <Link href="/">
                <Image
                  src={"/enamad.png"}
                  alt="اینماد"
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/samandehi.png"}
                  alt="ساماندهی نماد"
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/aira.png"}
                  alt="ایرا نماد"
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/CAO.png"}
                  alt="نماد سازمان هواپیمایی "
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/qr.png"}
                  alt="نماد حقوق مسافر "
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/ICHTO.png"}
                  alt="نماد سازمان میراث فرهنگی"
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/taci.svg"}
                  alt="نماد جهانگردی و اتومبیلرانی ایران"
                  width={80}
                  height={80}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="Bottom">
          <p>تمامی حقوق این وب‌سایت محفوظ است.</p>
          <div className="Social">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="SocialLink"
              aria-label="حمید پرواز در اینستاگرام"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span aria-hidden="true">📷</span> اینستاگرام
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="SocialLink"
              aria-label="حمید پرواز در تلگرام"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span aria-hidden="true">✈️</span> تلگرام
            </a>
            <a
              href="mailto:hamidparvazagency@gmail.com"
              className="SocialLink"
              aria-label="ارسال ایمیل به حمید پرواز"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span aria-hidden="true">📧</span> جیمیل
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
