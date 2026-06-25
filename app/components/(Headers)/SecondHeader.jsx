import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function Header() {
  return (
    <header>
      <div className="HeaderTop2">
        <div className="Container">
          <Link href="/" className="Logo">
            <Image
              src="/hamidParvaz.png"
              alt="لوگوی سایت "
              width={800}
              height={300}
            />
          </Link>

          <nav>
            <div className="NavItem">
              خدمات مسافرتی <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/hotel" className="DropdownItem">
                  رزرو هتل
                </Link>
                <Link href="/flight " className="DropdownItem">
                  رزرو پرواز
                </Link>
                <Link href="/tour" className="DropdownItem">
                  تور مسافرتی
                </Link>
              </div>
            </div>

            <div className="NavItem">
              درباره ما <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/about-us" className="DropdownItem">
                  تماس با ما
                </Link>
                <Link href="/cooperation" className="DropdownItem">
                  همکاری با ما
                </Link>
              </div>
            </div>

            <div className="NavItem">
              پشتیبانی <span className="Arrow">▾</span>
              <div className="Dropdown">
                <Link href="/faq" className="DropdownItem">
                  سوالات متداول
                </Link>
                <Link href="/guid" className="DropdownItem">
                  راهنمای رزرو
                </Link>
                <Link href="/rules" className="DropdownItem">
                  قوانین و مقررات
                </Link>
                <Link href="/cancellation" className="DropdownItem">
                  پیگیری خرید و کنسلی
                </Link>
              </div>
            </div>

            <Link href="/blog" className="NavItem">
              بلاگ
            </Link>
            <Link href="/about-us" className="NavItem">
              تماس با ما
            </Link>
          </nav>

          <div className="AuthButtons">
            <Link href="/auth">
              <button className="Btn BtnOutline">ورود</button>
            </Link>
            <Link href="/auth?tab=signup">
              <button className="Btn BtnPrimary">ثبت نام</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
