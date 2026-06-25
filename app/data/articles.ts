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
      articleContent: [
        { type: "h2", id: "section-1", content: "عوارض خروج از کشور چیست؟" },
        {
          type: "p",
          content:
            "عوارض خروج از کشور مبلغی است که هر مسافر ایرانی هنگام خروج از مرزهای هوایی، زمینی و دریایی باید پرداخت کند. این مبلغ بسته به نوع سفر و تعداد دفعات خروج در سال متغیر است.",
        },
        { type: "h2", id: "section-2", content: "چه کسانی معاف هستند؟" },
        {
          type: "ul",
          items: [
            "کودکان زیر ۲ سال",
            "مسافران کاری با ارائه مدارک",
            "دیپلمات‌ها و مامورین سازمان ملل",
            "زائران عتبات عالیات در ایام خاص",
          ],
        },
        { type: "h2", id: "section-3", content: "مراحل بازپس‌گیری عوارض" },
        {
          type: "p",
          content:
            "در صورتی که مشمول معافیت هستید اما اشتباهاً عوارض را پرداخت کرده‌اید، می‌توانید تا ۶ ماه پس از سفر با مراجعه به سامانه مربوطه و بارگذاری مدارک، درخواست استرداد وجه دهید.",
        },
        {
          type: "infoBox",
          content:
            "حتماً رسید پرداخت الکترونیکی عوارض را تا پایان سفر نزد خود نگه دارید.",
        },
      ],
      tags: ["آموزش سفر", "عوارض خروج", "مسافرت خارجی", "قوانین فرودگاه"],
      toc: [
        { id: "section-1", title: "عوارض خروج از کشور چیست؟" },
        { id: "section-2", title: "چه کسانی معاف هستند؟" },
        { id: "section-3", title: "مراحل بازپس‌گیری عوارض" },
      ],
      relatedPosts: [],
      cta: {
        title: "سفر بعدی‌تان را رزرو کنید!",
        text: "بهترین قیمت‌ها برای بلیط هواپیما و رزرو هتل",
        buttonText: "مشاهده بلیط‌ها",
        href: "/Flight",
      },
    },
  },
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
      category: "هتل",
      title: "هتل ۷ ستاره دبی",
      author: {
        image: "https://picsum.photos/seed/author2/50/50",
        name: "نویسنده",
        role: "کارشناس هتل",
      },
      date: "۱۴۰۲",
      views: "۱۰۰۰",
      featuredImage: {
        src: "https://picsum.photos/seed/dubai/800/450",
        alt: "هتل دبی",
        caption: "لوکس‌ترین هتل جهان",
      },
      share: { title: "اشتراک‌گذاری:", links: [] },
      highlight: {
        title: "چرا این هتل خاص است؟",
        items: ["خدمات فوق لوکس", "معماری بی‌نظیر", "رستوران‌های بین‌المللی"],
      },
      articleContent: [
        { type: "h2", id: "intro", content: "معرفی هتل ۷ ستاره" },
        {
          type: "p",
          content:
            "هتل برج العرب دبی به عنوان یکی از لوکس‌ترین هتل‌های جهان شناخته می‌شود که تجربه‌ای بی‌نظیر از اقامت را به شما هدیه می‌دهد.",
        },
      ],
      tags: ["هتل", "دبی", "لوکس"],
      toc: [{ id: "intro", title: "معرفی هتل ۷ ستاره" }],
      relatedPosts: [],
      cta: {
        title: "رزرو هتل",
        text: "همین الان رزرو کنید",
        buttonText: "رزرو",
        href: "/Hotel",
      },
    },
  },
];

export const loadArticles = (): Article[] => {
  if (typeof window === "undefined") {
    return articlesDB;
  }
  const saved = localStorage.getItem("articlesDB");
  if (saved) {
    return JSON.parse(saved);
  }
  return articlesDB;
};

export const saveArticles = (articles: Article[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("articlesDB", JSON.stringify(articles));
  }
};

export const getStaticArticles = (): Article[] => articlesDB;
