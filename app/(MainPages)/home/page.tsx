import Description from "../../components/Description";
import UsefulWays from "../../components/UsefullWays";

const page = () => {
  return (
    <main>
      <Description />
      <p
        style={{
          fontSize: "12px",
          textAlign: "center",
          width: "100%",
          maxWidth: "1200px",
          justifySelf: "center",
          margin: "30px auto 0",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        شرکت گردشگری حمید پرواز یکی از پیشروترین پلتفرم‌های آنلاین در ارائه
        خدمات سفر است؛ جایی که تلاش کرده‌ایم تجربه‌ای آسان و جامع از رزرو تور،
        بلیط هواپیما و هتل برای شما فراهم کنیم. حمید پرواز با ارائه بسته‌های
        متنوع تورهای داخلی و خارجی و امکان رزرو سریع بلیط هواپیما و هتل، سفر شما
        را از ابتدا تا انتها آسان و لذت‌بخش می‌کند. با جست‌وجوی سریع و مقایسه
        قیمت‌ها، می‌توانید بهترین تورها، بلیط هواپیما و هتل‌های متناسب با نیاز
        خود را از حمید پرواز انتخاب و خریداری کنید.
      </p>
      <UsefulWays />
    </main>
  );
};

export default page;
