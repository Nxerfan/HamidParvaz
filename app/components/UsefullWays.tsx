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
            <Link href="/flight">خرید بلیط هواپیما</Link>
            <Link href="/hotel">رزرو کردن هتل</Link>
            <Link href="/tour">ثبت نام تور ها</Link>
            <Link href="/rules">شرایط و مقررات</Link>
            <Link href="/blog">وبلاگ </Link>
          </div>

          <div className="items">
            <p>هواپیما داخلی</p>
            <Link href="/flight?from=Tehran&to=Mashhad">بلیط هواپیما تهران مشهد</Link>
            <Link href="/flight?from=Tehran&to=Kish">بلیط هواپیما تهران کیش</Link>
            <Link href="/flight?from=Tehran&to=Isfahan">بلیط هواپیما تهران اصفهان</Link>
            <Link href="/flight?from=Tehran&to=Shiraz">بلیط هواپیما تهران شیراز</Link>
            <Link href="/flight?from=Tehran&to=Ahvaz">بلیط هواپیما تهران اهواز</Link>
          </div>

          <div className="items">
            <p>هتل</p>
            <Link href="/hotel?type=domestic">رزور هتل داخلی</Link>
            <Link href="/hotel?type=international">رزور هتل خارجی</Link>
          </div>

          <div className="items">
            <p>تور</p>
            <Link href="/tour?to=Istanbul">تور استانبول</Link>
            <Link href="/tour?to=Kish">تور کیش</Link>
            <Link href="/tour?to=Malaysia">تور مالزی</Link>
            <Link href="/tour?to=World">تور دوردنیا</Link>
            <Link href="/tour?to=Dubai">تور امارات</Link>
          </div>

          <div className="items">
            <p>هواپیما خارجی</p>
            <Link href="/flight?type=international">بلیط هواپیما خارجی</Link>
            <Link href="/flight?to=Dubai">بلیط هواپیما دبی</Link>
            <Link href="/flight?to=Istanbul">بلیط هواپیما استانبول</Link>
            <Link href="/flight?to=Antalya">بلیط هواپیما آنتالیا</Link>
            <Link href="/flight?to=Baghdad">بلیط هواپیما بغداد</Link>
          </div>

          <div className="items">
            <p>سایر خدمات</p>
            <Link href="/contact-us">تماس با ما</Link>
            <Link href="/blog">وبلاگ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
