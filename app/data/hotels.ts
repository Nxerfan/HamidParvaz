export type Hotel = {
  id: number;
  name: string;
  image: string;
  images?: string[];
  stars: number;
  location: string;
  rating: number;
  pricePerNight: number;
  priceText?: string;
  description: string;
  facilities: string[];
  roomTypes: { name: string; price: number; capacity: string }[];
  checkInStart: number;
  checkInEnd: number;
  checkOutStart: number;
  checkOutEnd: number;
  isCancelable: boolean;
  faq?: { question: string; answer: string }[];
};

export const hotelsDB: Hotel[] = [
  {
    id: 1,
    name: "هتل پارسیان استقلال",
    image: "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
    images: [
      "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
      "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
      "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
    ],
    stars: 5,
    location: "تهران",
    rating: 6.8,
    pricePerNight: 9215000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل پارسیان استقلال یکی از هتل‌های پنج ستاره تهران است که در منطقه سعادت‌آباد واقع شده. این هتل با معماری مدرن و امکانات کامل، گزینه‌ای عالی برای اقامت در تهران می‌باشد.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان", "استخر", "پارکینگ", "ترانسفر رایگان"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 9215000, capacity: "۲ نفر" },
      { name: "اتاق لوکس", price: 12500000, capacity: "۲ نفر" },
      { name: "سوئیت", price: 18500000, capacity: "۴ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: true,
    faq: [
      { question: "ساعت ورود و خروج به هتل چه زمانی است؟", answer: "ساعت ورود (check-in) از ساعت ۱۴:۰۰ به بعد و ساعت خروج (check-out) تا ساعت ۱۲:۰۰ ظهر می‌باشد." },
      { question: "آیا لغو رایگان رزرو هتل امکان‌پذیر است؟", answer: "بله، تا ۲۴ ساعت قبل از ورود، لغو رایگان امکان‌پذیر است." },
    ],
  },
  {
    id: 2,
    name: "هتل اسپیناس پالاس",
    image: "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
    images: [
      "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
    ],
    stars: 5,
    location: "تهران",
    rating: 8.2,
    pricePerNight: 12500000,
    description: "هتل اسپیناس پالاس یکی از مجلل‌ترین هتل‌های تهران با معماری بی‌نظیر و خدمات درجه یک.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان", "استخر", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 12500000, capacity: "۲ نفر" },
      { name: "اتاق لوکس", price: 16500000, capacity: "۲ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 23,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: true,
  },
  {
    id: 20,
    name: "هتل مدینه الرضا",
    image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
    stars: 5,
    location: "مشهد",
    rating: 7.1,
    pricePerNight: 5500000,
    description: "هتل مدینه الرضا در نزدیکی حرم مطهر رضوی واقع شده و دسترسی آسانی به اماکن زیارتی دارد.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 5500000, capacity: "۲ نفر" },
      { name: "اتاق خانوادگی", price: 7800000, capacity: "۴ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: true,
  },
  {
    id: 21,
    name: "هتل قصر طلایی",
    image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Atlantis-Bahamas-Nassau.jpg.webp",
    stars: 4,
    location: "مشهد",
    rating: 7.8,
    pricePerNight: 5700000,
    description: "هتل قصر طلایی مشهد با موقعیت عالی و خدمات مناسب، انتخابی ایده‌آل برای زائران و مسافران.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 5700000, capacity: "۲ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: false,
  },
  {
    id: 40,
    name: "هتل اسپیناس پالاس تهران",
    image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
    stars: 5,
    location: "تهران",
    rating: 6.9,
    pricePerNight: 8000000,
    description: "هتل اسپیناس پالاس در منطقه سعادت‌آباد تهران، با امکانات لوکس و چشم‌انداز عالی.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان", "استخر", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 8000000, capacity: "۲ نفر" },
      { name: "اتاق لوکس", price: 12000000, capacity: "۲ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: true,
  },
  {
    id: 41,
    name: "هتل لاله",
    image: "https://www.eghamat24.com/blog/wp-content/webp-express/webp-images/doc-root/blog/wp-content/uploads/2019/07/Burj-Al-Arab-Dubai.jpg.webp",
    stars: 4,
    location: "تهران",
    rating: 7.2,
    pricePerNight: 8250000,
    description: "هتل لاله تهران با سابقه درخشان و موقعیت مرکزی در خیابان ولیعصر.",
    facilities: ["اینترنت رایگان", "صبحانه رایگان", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 8250000, capacity: "۲ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: true,
  },
  {
    id: 3,
    name: "هتل شایان",
    image: "https://cdn01.booking.ir/2026/1/1ebaa989-fb51-4bfc-9351-2dbad78d63ba.jpg",
    stars: 4,
    location: "تهران، خیابان ولیعصر",
    rating: 7.5,
    pricePerNight: 4350000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل شایان در خیابان ولیعصر تهران با دسترسی آسان به مراکز خرید و تفریحی.",
    facilities: ["اینترنت رایگان", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 4350000, capacity: "۲ نفر" },
    ],
    checkInStart: 13,
    checkInEnd: 17,
    checkOutStart: 7,
    checkOutEnd: 11,
    isCancelable: true,
  },
  {
    id: 4,
    name: "هتل ارم",
    image: "https://cdn01.booking.ir/2026/1/2fbf3184-ce6d-4633-bcd6-d90363462208.jpg",
    stars: 3,
    location: "شیراز، بلوار کریم خان",
    rating: 6.2,
    pricePerNight: 2100000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل ارم شیراز با موقعیت مرکزی و قیمت مناسب، گزینه‌ای عالی برای مسافران.",
    facilities: ["صبحانه رایگان", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 2100000, capacity: "۲ نفر" },
    ],
    checkInStart: 14,
    checkInEnd: 20,
    checkOutStart: 9,
    checkOutEnd: 12,
    isCancelable: true,
  },
  {
    id: 5,
    name: "هتل بزرگ کیش",
    image: "https://cdn01.booking.ir/2026/1/94b031c0-4bce-415d-a7e3-9125de35051b.jpg",
    stars: 5,
    location: "کیش، میدان مرکزی",
    rating: 8.7,
    pricePerNight: 11300000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل بزرگ کیش با امکانات لوکس و استخر، یکی از بهترین هتل‌های جزیره کیش.",
    facilities: ["استخر", "اینترنت رایگان", "پارکینگ", "ترانسفر رایگان"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 11300000, capacity: "۲ نفر" },
      { name: "اتاق لوکس", price: 16500000, capacity: "۲ نفر" },
    ],
    checkInStart: 15,
    checkInEnd: 22,
    checkOutStart: 8,
    checkOutEnd: 12,
    isCancelable: false,
  },
  {
    id: 6,
    name: "هتل پارس",
    image: "https://cdn01.booking.ir/2026/1/b172e304-dd7b-464c-b3c5-6adab2f99c86.jpg",
    stars: 4,
    location: "مشهد، خیابان امام رضا",
    rating: 7.9,
    pricePerNight: 5100000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل پارس مشهد در نزدیکی حرم مطهر رضوی، با خدمات مناسب و قیمت مقرون به صرفه.",
    facilities: ["صبحانه رایگان", "اینترنت رایگان"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 5100000, capacity: "۲ نفر" },
    ],
    checkInStart: 13,
    checkInEnd: 18,
    checkOutStart: 9,
    checkOutEnd: 11,
    isCancelable: true,
  },
  {
    id: 7,
    name: "هتل داریوش کیش",
    image: "https://cdn01.booking.ir/2026/1/b8936505-5ae5-4172-b0f4-122e729e488a.jpg",
    stars: 5,
    location: "کیش، ساحل مرجان",
    rating: 9.2,
    pricePerNight: 12500000,
    priceText: "قیمت 1 شب اتاق 1 تخته",
    description: "هتل داریوش کیش یکی از مجلل‌ترین هتل‌های جزیره با معماری بی‌نظیر و ساحل اختصاصی.",
    facilities: ["صبحانه رایگان", "استخر", "اینترنت رایگان", "پارکینگ"],
    roomTypes: [
      { name: "اتاق استاندارد", price: 12500000, capacity: "۲ نفر" },
      { name: "اتاق لوکس", price: 18500000, capacity: "۲ نفر" },
      { name: "سوئیت", price: 25000000, capacity: "۴ نفر" },
    ],
    checkInStart: 12,
    checkInEnd: 20,
    checkOutStart: 10,
    checkOutEnd: 14,
    isCancelable: false,
  },
];

export function getHotelById(id: number): Hotel | undefined {
  return hotelsDB.find((hotel) => hotel.id === id);
}
