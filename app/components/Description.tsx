import "./globals.css";
import Image from "next/image";
export default function Description() {
  return (
    <section>
      <div className="description">
        <div className="title">
          <span>شرکت حمید پرواز سامانه خرید بلیط سفر و اقامتگاه</span>
        </div>

        <div className="cards">
          <div className="item">
            <Image
              src="/svgviewer-png-output.png"
              alt=""
              width={64}
              height={64}
            />

            <h4>موجودی کامل</h4>
            <span>
              با ارائه حداکثری موجودی، برنامه‌ریزی سفر را برای هر زمان و مقصدی
              ممکن کرده‌ایم!
            </span>
          </div>

          <div className="item">
            <Image
              src="/svgviewer-png-output (1).png"
              alt=""
              width={64}
              height={64}
            />

            <h4>تجربه دلچسب خرید</h4>
            <span>دغدغه ما در طراحی، سادگی و خرید آسان است!</span>
          </div>

          <div className="item">
            <Image
              src="/svgviewer-png-output (2).png"
              alt=""
              width={64}
              height={64}
            />

            <h4>مشاور در مدیریت هزینه</h4>
            <span>
              با ارائه قابلیت‌های هوشمند کمک می‌کنیم تا سفری به‌صرفه داشته
              باشید!
            </span>
          </div>

          <div className="item">
            <Image
              src="/svgviewer-png-output (3).png"
              alt=""
              width={64}
              height={64}
            />

            <h4>پشتیبان سفر</h4>
            <span>از لحظه تصمیم تا پایان سفر کنار شما هستیم!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
