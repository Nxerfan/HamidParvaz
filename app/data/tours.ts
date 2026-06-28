export type Tour = {
  id: number;
  slug: string;
  title: string;
  destination: string;
  agency: string;
  image: string;
  images?: string[];
  durationNights: number;
  durationDays: number;
  mealPlan: string;
  hotelStars: number;
  price: number;
  originalPrice?: number;
  capacity: number | string;
  isSpecial: boolean;
  badge?: string;
  departureCity: string;
  airline?: string;
  services: string[];
  location?: string;
  date?: string;
  description?: string;
  eventSlug?: string;
};

export const toursDB: Tour[] = [
  {
    id: 1,
    slug: "istanbul-tour",
    title: "تور استانبول",
    destination: "استانبول",
    agency: "آژانس پرواز الکترا",
    image: "https://www.aysham.com/1035680961931001B",
    images: [
      "https://img2.taw-bio.ir/2026/498727/1lhvp9pu.jpeg",
      "https://img2.taw-bio.ir/2026/590491/1lmpae32.jpeg",
      "https://img2.taw-bio.ir/2026/384071/1lmoq4r2.jpeg",
      "https://img2.taw-bio.ir/2026/902637/1lmpar8p.jpeg",
    ],
    durationNights: 4,
    durationDays: 5,
    mealPlan: "صبحانه",
    hotelStars: 4,
    price: 22500000,
    originalPrice: 28000000,
    capacity: 8,
    isSpecial: true,
    badge: "ویژه",
    departureCity: "تهران",
    airline: "پرواز ترکیش",
    services: ["ویزا در تور", "لیدر فارسی زبان"],
    location: "از تهران به استانبول",
    date: "10 فروردین",
    description: "اقامت در هتل 4 ستاره با صبحانه و گشت شهری رایگان",
  },
  {
    id: 2,
    slug: "kish-tour",
    title: "تور کیش - هتل ترنج درخشان",
    destination: "کیش",
    agency: "آژانس آسمان آبی",
    image: "https://cdn.tabnak.ir/files/fa/news/1404/12/6/2244665_751.jpg",
    durationNights: 3,
    durationDays: 4,
    mealPlan: "صبحانه",
    hotelStars: 5,
    price: 9850000,
    originalPrice: 6500000,
    capacity: 2,
    isSpecial: true,
    badge: "لحظه آخری",
    departureCity: "شیراز",
    airline: "پرواز ماهان",
    services: ["ترانسفر فرودگاهی"],
    location: "از شیراز به کیش",
    date: "15 فروردین",
    description: "پرواز رفت و برگشت + اقامت هتل 5 ستاره ترنج",
  },
  {
    id: 3,
    slug: "thailand-tour",
    title: "تور تایلند (بانکوک + پوکت)",
    destination: "تایلند",
    agency: "آژانس سفرهای ناب",
    image: "https://farjamparvaz.net/wp-content/uploads/2025/10/13.jpg",
    durationNights: 7,
    durationDays: 8,
    mealPlan: "صبحانه و ناهار",
    hotelStars: 5,
    price: 68000000,
    capacity: "ظرفیت مناسب",
    isSpecial: false,
    badge: "تور خارجی",
    departureCity: "تهران",
    airline: "قطر ایرویز",
    services: ["ویزا در تور", "لیدر فارسی زبان", "ترانسفر فرودگاهی"],
    location: "از تهران",
    date: "25 فروردین",
    description: "تور خارجی ویژه با دو مقصد و خدمات فول پکیج",
  },
  {
    id: 4,
    slug: "dubai-tour",
    title: "تور دبی - هتل ریمز",
    destination: "دبی",
    agency: "آژانس سفرهای ناب",
    image: "https://dalahoo.com/mi_ax/original/1404/01/30456.webp",
    durationNights: 4,
    durationDays: 5,
    mealPlan: "بدون صبحانه",
    hotelStars: 4,
    price: 18500000,
    capacity: 5,
    isSpecial: false,
    departureCity: "تهران",
    airline: "فلای دبی",
    services: ["ترانسفر فرودگاهی"],
  },
  {
    id: 5,
    slug: "mashhad-tour",
    title: "تور مشهد - هتل درویشی",
    destination: "مشهد",
    agency: "آژانس زیارت",
    image: "https://dalahoo.com/mi_ax/original/1404/02/30686.webp",
    durationNights: 2,
    durationDays: 3,
    mealPlan: "یک وعده",
    hotelStars: 3,
    price: 2400000,
    capacity: "ظرفیت مناسب",
    isSpecial: true,
    badge: "ارزان",
    departureCity: "تهران",
    services: [],
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return toursDB.find((tour) => tour.slug === slug);
}

export function getTourById(id: number): Tour | undefined {
  return toursDB.find((tour) => tour.id === id);
}

export function getToursByDestination(destination: string): Tour[] {
  return toursDB.filter((tour) =>
    tour.destination.includes(destination)
  );
}
