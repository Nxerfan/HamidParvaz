import Link from "next/link";
import "./globals.css"
export default function UsefulWays() {
  return (
    <section>
      <div className="useFullWays">
        <div className="title">
          <p>مسیرهای پرتردد</p>
          <span>ارزان ترین و سریعترین مسیرها را با بیش از 500 شریک رسمی انتخاب کنید</span>
        </div>

        <div className="content">
          <div className="items">
            <p>شرکت گردشگری حمید پرواز</p>
            <Link href="/Flight.html">خرید بلیط هواپیما</Link>
            <Link href="/Hotel.html">رزرو کردن هتل</Link>
            <Link href="/Tour.html">ثبت نام تور ها</Link>
            <Link href="/rules.html">شرایط و مقررات</Link>
            <Link href="/Blog.html">وبلاگ نیکسا</Link>
          </div>

          <div className="items">
            <p>هواپیما داخلی</p>
            <Link href="/Flight.html?from=Tehran&to=Mashhad">بلیط هواپیما تهران مشهد</Link>
            <Link href="/Flight.html?from=Tehran&to=Kish">بلیط هواپیما تهران کیش</Link>
            <Link href="/Flight.html?from=Tehran&to=Isfahan">بلیط هواپیما تهران اصفهان</Link>
            <Link href="/Flight.html?from=Tehran&to=Shiraz">بلیط هواپیما تهران شیراز</Link>
            <Link href="/Flight.html?from=Tehran&to=Ahvaz">بلیط هواپیما تهران اهواز</Link>
          </div>

          <div className="items">
            <p>هتل</p>
            <Link href="/Hotel.html?type=domestic">رزور هتل داخلی</Link>
            <Link href="/Hotel.html?type=international">رزور هتل خارجی</Link>
          </div>

          <div className="items">
            <p>تور</p>
            <Link href="/Tour.html?to=Istanbul">تور استانبول</Link>
            <Link href="/Tour.html?to=Kish">تور کیش</Link>
            <Link href="/Tour.html?to=Malaysia">تور مالزی</Link>
            <Link href="/Tour.html?to=World">تور دوردنیا</Link>
            <Link href="/Tour.html?to=Dubai">تور امارات</Link>
          </div>

          <div className="items">
            <p>هواپیما خارجی</p>
            <Link href="/Flight.html?type=international">بلیط هواپیما خارجی</Link>
            <Link href="/Flight.html?to=Dubai">بلیط هواپیما دبی</Link>
            <Link href="/Flight.html?to=Istanbul">بلیط هواپیما استانبول</Link>
            <Link href="/Flight.html?to=Antalya">بلیط هواپیما آنتالیا</Link>
            <Link href="/Flight.html?to=Baghdad">بلیط هواپیما بغداد</Link>
          </div>

          <div className="items">
            <p>سایر خدمات</p>
            <Link href="/Contact.html">تماس با ما</Link>
            <Link href="/Blog.html">وبلاگ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
