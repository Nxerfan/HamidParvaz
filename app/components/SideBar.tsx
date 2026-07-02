// components/Sidebar.tsx
import Image from "next/image";
import Link from "next/link";
import './globals.css'
  
export default function Sidebar() {
  return (
      <div className="right">
        <div className="MenuHeader">
          <span className="Username"> وزود به حساب کاربری</span>
          <Image src="/Media/svgexport-12.svg" alt="نمایش منو" width={24} height={24} role="presentation" />
        </div>

        <div className="MenuBody">
          <nav className="Nav">
            <Link href="/cancellation" className="Item">
              <i className="Icon" aria-hidden="true">🎫</i>
              پیگیری خرید و کنسلی
            </Link>

            <details className="Dropdown">
              <summary className="Item">
                <i className="Icon" aria-hidden="true">📞</i>
                پشتیبانی ۲۴/۷
              </summary>

              <div className="Content">
                <Link href="/about-us">تماس با ما</Link>
                <Link href="/faq">سوالات متداول</Link>
              </div>
            </details>

            <details className="Dropdown">
              <summary className="Item">
                <i className="Icon" aria-hidden="true">🧳</i>
                خدمات سفر
              </summary>

              <div className="Content">
                <Link href="/flight">بلیط هواپیما</Link>
                <Link href="/hotel">رزرو هتل</Link>
                <Link href="/tour">رزرو تور</Link>
              </div>
            </details>

            <Link href="/about-us" className="Item">
              <i className="Icon" aria-hidden="true">ⓘ</i>
              درباره ما
            </Link>
          </nav>
        </div>
      </div>
  );
}
