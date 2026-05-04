// components/Sidebar.tsx
import Link from "next/link";
import './globals.css'
  
export default function Sidebar() {
  return (
      <div className="right">
        <div className="MenuHeader">
          <span className="Username"> وزود به حساب کاربری</span>
          <img src="/Media/svgexport-12.svg" alt="" />
        </div>

        <div className="MenuBody">
          <nav className="Nav">
            <Link href="/cancellation.html" className="Item">
              <i className="Icon">🎫</i>
              پیگیری خرید و کنسلی
            </Link>

            <details className="Dropdown">
              <summary className="Item">
                <i className="Icon">📞</i>
                پشتیبانی ۲۴/۷
              </summary>

              <div className="Content">
                <Link href="/AboutUs.html">تماس با ما</Link>
                <Link href="/FAQ.html">سوالات متداول</Link>
              </div>
            </details>

            <details className="Dropdown">
              <summary className="Item">
                <i className="Icon">🧳</i>
                خدمات سفر
              </summary>

              <div className="Content">
                <Link href="/Flight.html">بلیط هواپیما</Link>
                <Link href="/Hotel.Html">رزرو هتل</Link>
                <Link href="/Tour.html">رزرو تور</Link>
              </div>
            </details>

            <Link href="/AboutUs.html" className="Item">
              <i className="Icon">ⓘ</i>
              درباره ما
            </Link>
          </nav>
        </div>
      </div>
  );
}
