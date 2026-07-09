import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MobileNavDrawer from "./MobileNavDrawer";
import "../globals.css";

interface HeaderProps {
  banner?: string;
  bannerMobile?: string;
  dark?: boolean;
}

export default function Header({
  banner = "",
  bannerMobile = "",
  dark = false,
}: HeaderProps) {
  return (
    <header className={dark ? "HeaderDark" : ""}>
      <div className="HeaderTop">
        <div className="Container">
          <Link href="/" className="Logo">
            <Image
              src="/hamidParvaz.png"
              alt="لوگوی سایت"
              width={90}
              height={34}
            />
          </Link>

          <nav>
            <div className="NavItem">
              <Image
                src="/traveler-خدمات مسافرتی.svg"
                alt=""
                width={20}
                height={20}
                role="presentation"
              />{" "}
              خدمات مسافرتی{" "}
              <span className="Arrow" aria-hidden="true">
                ▾
              </span>
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
                <Link href="/tour/make-your-own" className="DropdownItem">
                  تور دلخواه خود را بسازید
                </Link>
              </div>
            </div>

            <div className="NavItem">
              <Image
                src="/user_groups-درباره ما.svg"
                alt=""
                width={20}
                height={20}
                role="presentation"
              />{" "}
              درباره ما{" "}
              <span className="Arrow" aria-hidden="true">
                ▾
              </span>
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
              <Image
                src="/hotline-پشتیبانی.svg"
                alt=""
                width={20}
                height={20}
                role="presentation"
              />{" "}
              پشتیبانی{" "}
              <span className="Arrow" aria-hidden="true">
                ▾
              </span>
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
              <Image
                src="/blogloving-وبلاگ.svg"
                alt=""
                width={20}
                height={20}
                role="presentation"
              />{" "}
              بلاگ
            </Link>
            <Link href="/about-us" className="NavItem">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ width: 18, height: 18 }}
              />{" "}
              تماس با ما
            </Link>
          </nav>

          <div className="AuthButtons">
            <Link href="/auth">
              <button className="Btn BtnPrimary">
                <Image
                  src="/person-ثبت نام.svg"
                  alt=""
                  width={20}
                  height={20}
                  role="presentation"
                />{" "}
                ورود
              </button>
            </Link>
          </div>

          <MobileNavDrawer />
        </div>
      </div>

      {banner && (
        <div
          className="Hero Hero--desktop"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
      {bannerMobile && (
        <div
          className="Hero Hero--mobile"
          style={{
            backgroundImage: `url(${bannerMobile})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
      {!banner && !bannerMobile && <div className="Hero"></div>}
    </header>
  );
}
