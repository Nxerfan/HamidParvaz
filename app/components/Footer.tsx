import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./globals.css";

export default function Footer() {
  return (
    <footer>
      <div className="Container">
        {/* Top Row: Contact + OrgBox */}
        <div className="TopRow">
          <div className="Contact">
            <div className="Top">
              <a
                href="tel:+9838118025"
                className="contactItem"
                aria-label="تماس با پشتیبانی"
              >
                <FontAwesomeIcon icon={faPhone} />
                <span>پشتیبانی: 38118-025</span>
              </a>
              <a
                href="mailto:hamidparvazagency@gmail.com"
                className="contactItem"
                aria-label="ارسال ایمیل"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hamidparvazagency@gmail.com</span>
              </a>
            </div>

            <div className="buttom">
              <Link href="/flight">بلیط هواپیما</Link>
              <Link href="/hotel">رزرو هتل</Link>
              <Link href="/tour">مشاهده تورها</Link>
              <Link href="/tour/make-your-own">تور دلخواه خود را بسازید</Link>
              <Link href="/reserve/auto-reserve">رزرو خودکار</Link>
            </div>

            <div className="canccel">
              <Link href="/cancellation">
                <FontAwesomeIcon icon={faAngleLeft} />
                پیگیری و کنسلی بلیط
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

        {/* Links Row */}
        <div className="LinksRow">
          <div className="Links">
            <h4>راهنمایی و پشتیبانی</h4>
            <ul>
              <li><Link href="/faq">پرسش‌های متداول</Link></li>
              <li><Link href="/rules">شرایط و مقررات</Link></li>
              <li><Link href="/blog">مجله حمید پرواز</Link></li>
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
                  alt="نماد سازمان هواپیمایی"
                  width={80}
                  height={80}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/qr.png"}
                  alt="نماد حقوق مسافر"
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

        {/* Bottom Bar */}
        <div className="Bottom">
          <p className="copyright">
            &copy; تمامی حقوق این وب‌سایت محفوظ است.
          </p>
          <div className="Social">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="SocialLink"
              aria-label="حمید پرواز در اینستاگرام"
            >
              <FontAwesomeIcon icon={faInstagram} />
              <span>اینستاگرام</span>
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="SocialLink"
              aria-label="حمید پرواز در تلگرام"
            >
              <FontAwesomeIcon icon={faTelegramPlane} />
              <span>تلگرام</span>
            </a>
            <a
              href="mailto:hamidparvazagency@gmail.com"
              className="SocialLink"
              aria-label="ارسال ایمیل به حمید پرواز"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>جیمیل</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
