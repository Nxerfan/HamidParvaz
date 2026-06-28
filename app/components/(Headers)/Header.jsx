import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../globals.css";

export default function Header({ banner = "" }) {
  return (
    <header>
      <div className="HeaderTop">
        <div className="Container">
          <Link href="/" className="Logo">
              <Image src="/hamidParvaz.png" alt="لوگوی سایت " width={800} height={300} />
          </Link>

          <nav>
            <div className="NavItem">
              <Image src="/traveler-خدمات مسافرتی.svg" alt="" width={20} height={20} /> خدمات مسافرتی <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/hotel" className="DropdownItem">رزرو هتل</Link>
                <Link href="/flight " className="DropdownItem">رزرو پرواز</Link>
                <Link href="/tour" className="DropdownItem">تور مسافرتی</Link>
              </div>
            </div>

            <div className="NavItem">
              <Image src="/user_groups-درباره ما.svg" alt="" width={20} height={20} /> درباره ما <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/about-us" className="DropdownItem">تماس با ما</Link>
                <Link href="/cooperation" className="DropdownItem">همکاری با ما</Link>
              </div>
            </div>

            <div className="NavItem">
              <Image src="/hotline-پشتیبانی.svg" alt="" width={20} height={20} /> پشتیبانی <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/faq" className="DropdownItem">سوالات متداول</Link>
                <Link href="/guid" className="DropdownItem">راهنمای رزرو</Link>
                <Link href="/rules" className="DropdownItem">قوانین و مقررات</Link>
                <Link href="/cancellation" className="DropdownItem">پیگیری خرید و کنسلی</Link>
              </div>
            </div>

            <Link href="/blog" className="NavItem"><Image src="/blogloving-وبلاگ.svg" alt="" width={20} height={20} /> بلاگ</Link>
            <Link href="/about-us" className="NavItem"><FontAwesomeIcon icon={faEnvelope} style={{ width: 18, height: 18 }} /> تماس با ما</Link>
          </nav>

          <div className="AuthButtons">
            <Link href="/auth">
              <button className="Btn BtnPrimary"><Image src="/person-ثبت نام.svg" alt="" width={20} height={20} /> ورود</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="Hero" style={banner ? { backgroundImage: `url(${banner})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : undefined}>
      </div>
    </header>
  );
}
