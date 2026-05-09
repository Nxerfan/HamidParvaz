// 📁 app/data/articles.ts

export type Article = {
  id: number;
  slug: string;
  category: "tour" | "hotel" | "flight";
  categoryLabel: string;
  image: string;
  title: string;
  excerpt: string;
  readTime: string;
  fullContent: {
    category: string;
    title: string;
    author: { image: string; name: string; role: string };
    date: string;
    views: string;
    featuredImage: { src: string; alt: string; caption: string };
    share: { title: string; links: any[] };
    highlight: { title: string; items: string[] };
    articleContent: any[];
    tags: string[];
    toc: { id: string; title: string }[];
    relatedPosts: any[];
    cta: any;
  };
};

// دیتابیس استاتیک اصلی (هم برای سرور هم برای کلاینت)
export const articlesDB: Article[] = [
  {
    id: 999,
    slug: "maafiat-maliati-foroughgahi",
    category: "flight",
    categoryLabel: "آموزش مسافرتی",
    image: "https://picsum.photos/seed/airport/400/300",
    title: "معافیت مالیاتی فرودگاهی چیست و چگونه باید آن را بازپس بگیریم؟",
    excerpt: "چگونه عوارض خروج از کشور را پس بگیریم؟ تمام مراحل + افراد معاف",
    readTime: "۱۲ دقیقه",
    fullContent: {
      category: "آموزش مسافرتی",
      title: "معافیت مالیاتی فرودگاهی چیست و چگونه باید آن را بازپس بگیریم؟",
      author: {
        image: "https://picsum.photos/seed/author/50/50",
        name: "سارا احمدی",
        role: "کارشناس فروش حمید پرواز",
      },
      date: "۲۵ آبان ۱۴۰۲",
      views: "۳,۲۰۰",
      featuredImage: {
        src: "https://picsum.photos/seed/airport/800/450",
        alt: "معافیت مالیاتی فرودگاهی",
        caption:
          "معافیت مالیاتی یکی از مهم‌ترین مواردی است که مسافران باید بدانند.",
      },
      share: { title: "اشتراک‌گذاری:", links: [] },
      highlight: {
        title: "خلاصه مقاله در ۳۰ ثانیه",
        items: [
          "تمام مسافران خروجی کشور در فرودگاه‌های ایران باید مالیات پرداخت کنند.",
          "برای بازپس‌گیری این پول باید تا ۶ ماه اقدام کنید.",
          "پرداخت این مالیات به صورت آنلاین در فرودگاه انجام می‌شود.",
          "افراد زیر ۲ سال، مسافران کاری و ... معاف هستند.",
        ],
      },
      articleContent: [],
      tags: ["آموزش سفر", "عوارض خروج", "مسافرت خارجی", "قوانین فرودگاه"],
      toc: [
        { id: "section-1", title: "عوارض خروج از کشور چیست؟" },
        { id: "section-2", title: "چه کسانی معاف هستند؟" },
        { id: "section-3", title: "مراحل بازپس‌گیری عوارض" },
      ],
      relatedPosts: [],
      cta: {
        title: "سفر بعدی‌تان را رزرو کنید!",
        text: "",
        buttonText: "مشاهده بلیط‌ها",
        href: "/Flight",
      },
    },
  }, // داخل articlesDB بعد از مقاله‌ی موجود
  {
    id: 1000,
    slug: "hotel-dubai-7star",
    category: "hotel",
    categoryLabel: "هتل",
    image: "https://picsum.photos/seed/dubai/400/300",
    title: "هتل ۷ ستاره دبی",
    excerpt: "هتل‌های لوکس دبی را بشناسید",
    readTime: "۵ دقیقه",
    fullContent: {
      // ... یک محتوای ساده برای این مقاله وارد کنید
      category: "هتل",
      title: "هتل ۷ ستاره دبی",
      author: { image: "", name: "نویسنده", role: "کارشناس" },
      date: "۱۴۰۲",
      views: "۱۰۰۰",
      featuredImage: { src: "", alt: "", caption: "" },
      share: { title: "", links: [] },
      highlight: { title: "", items: [] },
      articleContent: [],
      tags: [],
      toc: [],
      relatedPosts: [],
      cta: { title: "", text: "", buttonText: "", href: "/" },
    },
  },
  // سایر مقالات خود را اینجا اضافه کنید...
];

// ✅ تابع بارگذاری امن برای استفاده هم در سرور و هم در مرورگر
export const loadArticles = (): Article[] => {
  // اگر در محیط سرور هستیم (مانند build time یا generateStaticParams)
  if (typeof window === "undefined") {
    return articlesDB; // برگرداندن دیتای استاتیک بدون خطا
  }

  // در مرورگر: ابتدا از localStorage بخوان
  const saved = localStorage.getItem("articlesDB");
  if (saved) {
    return JSON.parse(saved);
  }
  return articlesDB;
};

// ✅ تابع ذخیره‌سازی امن (فقط در مرورگر اجرا شود)
export const saveArticles = (articles: Article[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("articlesDB", JSON.stringify(articles));
  }
};

// ✅ (اختیاری) تابع مخصوص استفاده در generateStaticParams
export const getStaticArticles = (): Article[] => articlesDB;
