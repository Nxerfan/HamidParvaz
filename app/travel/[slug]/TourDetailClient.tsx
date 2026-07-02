"use client";
import { useEffect, useState } from "react";
import TourDetailFull, { TourDetailData } from "../../components/TourDetailFull";

interface Tour {
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
}

const FALLBACK_IMG = "https://img2.taw-bio.ir/2026/498727/1lhvp9pu.jpeg";

function mapTourToDetailData(tour: Tour): TourDetailData {
  const mainImage = tour.image || FALLBACK_IMG;
  return {
    images: tour.images && tour.images.length > 0 ? tour.images : [mainImage, mainImage, mainImage, mainImage, mainImage],
    options: [
      { icon: "FaCar", label: "بلیط هواپیما" },
      { icon: "FaSwimmingPool", label: "رزرو هتل" },
      { icon: "FaCartShopping", label: tour.airline || "لیدر فارسی‌زبان" },
      { icon: "FaSink", label: "اخذ ویزا" },
    ],
    hotelInfoData: [
      {
        title: `هتل ${tour.destination}`,
        rating: tour.hotelStars,
        options: [tour.mealPlan, "سرویس رفت و برگشت"],
        description: `اقامت در هتل ${tour.hotelStars} ستاره با امکانات کامل`,
      },
    ],
    hotelRules: {
      checkIn: `${tour.durationNights} شب و ${tour.durationDays} روز`,
      checkOut: tour.airline || "هواپیمایی اختصاصی",
      descriptions: [
        "شرایط و مقررات کنسلی این تور مطابق مقررات تامین‌کننده می‌باشد.",
        "مسئولیت نداشتن مدارک هویتی معتبر و پاسپورت با ۷ ماه اعتبار به عهده مسافر است.",
      ],
    },
    faqData: [
      {
        question: "آیا ویزا در قیمت تور لحاظ شده است؟",
        answer: tour.services.includes("ویزا در تور")
          ? "بله، برای این تور اخذ ویزا به صورت رایگان انجام می‌شود."
          : "ویزا در این تور شامل قیمت نمی‌شود و باید جداگانه اقدام کنید.",
      },
      {
        question: "امکان لغو تور تا چه زمانی وجود دارد؟",
        answer: "لغو تور تا ۱۵ روز قبل از شروع، با کسر ۱۰٪ هزینه انجام می‌پذیرد.",
      },
    ],
    hotels: [
      {
        name: `هتل ${tour.destination}`,
        stars: tour.hotelStars,
        rate: tour.hotelStars + 1.8,
        price: Math.round(tour.price / tour.durationNights),
        priceText: "قیمت هر شب",
        location: `مرکز شهر ${tour.destination}`,
      },
    ],
    itineraryData: {
      duration: `${tour.durationNights} شب و ${tour.durationDays} روز`,
      days: [
        {
          day: "روز اول",
          title: `ورود به ${tour.destination}`,
          description: `ورود به ${tour.destination}، ترانسفر به هتل و استراحت.`,
        },
        {
          day: "روز دوم",
          title: "گشت و بازدید",
          description: "بازدید از مراکز دیدنی و جاذبه‌های گردشگری.",
        },
        {
          day: `روز ${tour.durationDays}`,
          title: "بازگشت",
          description: "صبحانه، تخلیه اتاق، ترانسفر به فرودگاه و پرواز به سمت تهران.",
        },
      ],
    },
    tourData: {
      badges: [tour.isSpecial ? "تور ویژه" : "تور", ...(tour.badge ? [tour.badge] : [])],
      title: tour.title,
      priceLabel: "شروع قیمت از نفر",
      price: tour.price,
      flights: {
        departure: `${tour.date || "تاریخ"} ساعت ۰۸:۰۰`,
        return: `پس از ${tour.durationNights} شب ساعت ۲۲:۰۰`,
      },
    },
  };
}

export default function TourDetailClient({ slug }: { slug: string }) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tours?destination=`)
      .then((res) => res.json())
      .then((data: Tour[]) => {
        const found = data.find((t) => t.slug === slug);
        setTour(found || null);
        setLoading(false);
      })
      .catch(() => {
        setTour(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "60vh", gap: "1rem" }}>
        <h2>تور مورد نظر یافت نشد</h2>
        <a href="/tour" style={{ color: "var(--gold, #d4a843)" }}>بازگشت به لیست تورها</a>
      </div>
    );
  }

  return <TourDetailFull data={mapTourToDetailData(tour)} />;
}
