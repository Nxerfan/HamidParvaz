export type Article = {
  id: number;
  slug: string;
  category: "tour" | "hotel" | "flight";
  categoryLabel: string;
  image: string;
  title: string;
  excerpt: string;
  readTime: string;
  // محتوای کامل صفحه تک مقاله
  fullContent: {
    category: string;
    title: string;
    author: { image: string; name: string; role: string };
    date: string;
    views: string;
    featuredImage: { src: string; alt: string; caption: string };
    share: { title: string; links: any[] };
    highlight: { title: string; items: string[] };
    articleContent: any[];           // همان آرایه‌ای که قبلاً داشتی
    tags: string[];
    toc: { id: string; title: string }[];
    relatedPosts: any[];
    cta: any;
  };
};

// دیتابیس اولیه
export let articlesDB: Article[] = [
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
        caption: "معافیت مالیاتی یکی از مهم‌ترین مواردی است که مسافران باید بدانند.",
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
      articleContent: [ /* دقیقاً همان آرایه articleContent که قبلاً داشتی */ ],
      tags: ["آموزش سفر", "عوارض خروج", "مسافرت خارجی", "قوانین فرودگاه"],
      toc: [
        { id: "section-1", title: "عوارض خروج از کشور چیست؟" },
        { id: "section-2", title: "چه کسانی معاف هستند؟" },
        { id: "section-3", title: "مراحل بازپس‌گیری عوارض" },
      ],
      relatedPosts: [ /* همان آرایه قبلی */ ],
      cta: { title: "سفر بعدی‌تان را رزرو کنید!", text: "...", buttonText: "مشاهده بلیط‌ها", href: "/Flight" },
    },
  },
  // بقیه مقالات لیستت رو اینجا اضافه کن (مثل قبلی‌ها)
  // ... 
];

export const saveArticles = (articles: Article[]) => {
  localStorage.setItem("articlesDB", JSON.stringify(articles));
};

export const loadArticles = (): Article[] => {
  const saved = localStorage.getItem("articlesDB");
  if (saved) return JSON.parse(saved);
  return articlesDB;
};