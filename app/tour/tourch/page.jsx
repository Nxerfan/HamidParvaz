import TourDetailFull from "../../components/TourDetailFull";

const PAGE_DATA = {
  images: [
    "https://img2.taw-bio.ir/2026/498727/1lhvp9pu.jpeg",
    "https://img2.taw-bio.ir/2026/590491/1lmpae32.jpeg",
    "https://img2.taw-bio.ir/2026/384071/1lmoq4r2.jpeg",
    "https://img2.taw-bio.ir/2026/902637/1lmpar8p.jpeg",
    "https://img2.taw-bio.ir/2026/902637/1lmpar8p.jpeg",
  ],
  options: [
    { icon: "FaCar", label: "بلیط هواپیما" },
    { icon: "FaSwimmingPool", label: "رزرو هتل" },
    { icon: "FaCartShopping", label: "لیدر فارسی‌زبان" },
    { icon: "FaSink", label: "اخذ ویزا" },
  ],
  hotelInfoData: [
    {
      title: "هتل گرند جواهر استانبول (Grand Cevahir)",
      rating: 5,
      options: ["نزدیک مرکز خرید", "رستوران ایرانی"],
      description:
        "این هتل در قلب منطقه شیشلی قرار دارد و دسترسی عالی به مراکز خرید دارد.",
    },
  ],
  hotelRules: {
    checkIn: "5 روز و 4 شب",
    checkOut: "ترکیش ایرلاینز",
    descriptions: [
      "شرایط و مقررات کنسلی این هتل مطابق مقررات تامین‌کننده می‌باشد.",
      "مسئولیت نداشتن مدارک هویتی معتبر و پاسپورت با ۷ ماه اعتبار به عهده مسافر است.",
    ],
  },
  faqData: [
    {
      question: "آیا ویزا در قیمت تور لحاظ شده است؟",
      answer:
        "بله، برای این تور اخذ ویزا به صورت رایگان انجام می‌شود و نیاز به دعوت‌نامه ندارید.",
    },
    {
      question: "ساعت ورود و خروج هتل‌ها چگونه است؟",
      answer:
        "ساعت ورود به هتل‌ها معمولا ۱۴:۰۰ و ساعت تخلیه اتاق ۱۲:۰۰ می‌باشد.",
    },
  ],
  hotels: [
    {
      name: "هتل پارسیان استقلال",
      stars: 5,
      rate: 6.8,
      price: 9215000,
      priceText: "قیمت 1 شب اتاق 1 تخته",
      location:
        "سعادت آباد، انتهای بزرگراه یادگار امام، میدان بهرود، هتل اسپیناس پالاس",
    },
  ],
  itineraryData: {
    duration: "۵ روز و ۴ شب",
    days: [
      {
        day: "روز اول",
        title: "ورود و استقرار در هتل",
        description:
          "حرکت از تهران، ورود به فرودگاه استانبول، ترانسفر به هتل و استراحت. گشت شبانه در خیابان استقلال.",
      },
      {
        day: "روز دوم",
        title: "گشت شهر اروپایی",
        description:
          "صبحانه، حرکت به سمت میدان تکسیم و خیابان استقلال. بازدید از مسجد ایاصوفیا و ایا صوفیه.",
      },
      {
        day: "روز سوم",
        title: "گشت شهر آسیایی",
        description:
          "عبور از پل باغچه، بازدید از برج maiden و کوه پیرلوتی. بازدید از کاخ دلمه باغچه.",
      },
      {
        day: "روز چهارم",
        title: "خرید و تفریح",
        description:
          "گشت رایگان و بازدید از مراکز خرید معتبر استانبول مثل جواهر و فوروم.",
      },
      {
        day: "روز پنجم",
        title: "بازگشت",
        description:
          "صبحانه، تخلیه اتاق، ترانسفر به فرودگاه و پرواز به سمت تهران.",
      },
    ],
  },
  tourData: {
    badges: ["تور لحظه آخری", "چارتری"],
    title: "تور استانبول هوایی",
    priceLabel: "شروع قیمت از نفر",
    price: 28500000,
    flights: {
      departure: "۱۴۰۳/۰۵/۱۰ ساعت ۰۸:۰۰",
      return: "۱۴۰۳/۰۵/۱۴ ساعت ۲۲:۰۰",
    },
  },
};

export default function CardGallery() {
  return <TourDetailFull data={PAGE_DATA} />;
}
