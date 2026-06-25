"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faUser,
  faArrowLeft,
  faEye,
  faSpinner,
  faPlus,
  faTimes,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import "../blog/global.css";

const PAGE_DATA = {
  hero: {
    image:
      "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
    tag: "پیشنهاد ویژه",
    title: "راهنمای کامل سفر به استانبول؛ شهری که در دو قاره زندگی می‌کند",
    date: "۲۵ آبان ۱۴۰۲",
    readTime: "۱۰ دقیقه مطالعه",
    author: "سارا احمدی",
    slug: "rahnamai-safar-be-istanbul",
    category: "tour",
    categoryLabel: "تور",
  },
  toolbarTitle: "آخرین مقالات مسافرتی",
  filterButtons: [
    { key: "all", label: "همه" },
    { key: "flight", label: "پرواز" },
    { key: "hotel", label: "هتل" },
    { key: "tour", label: "تور" },
  ],
  initialArticles: [
    {
      id: 1,
      category: "tour",
      image:
        "https://shut.ir/storage/image/2023/7/7/%D8%A8%DA%A9-%DA%AF%D8%B1%D8%A7%D9%86%D8%AF-%D8%B4%D9%87%D8%B1.webp",
      categoryLabel: "تور",
      title: "چرا تور کیش بهترین گزینه برای تعطیلات آخر هفته است؟",
      excerpt:
        "جزیره زیبای کیش با تفریحات متنوع و هتل‌های لوکس، مقصدی محبوب برای مسافران ایرانی است...",
      readTime: "۵ دقیقه",
      author: "علی رضایی",
      slug: "tor-kish-best-weekend",
    },
    {
      id: 2,
      category: "hotel",
      image: "https://img2.taw-bio.ir/2026/456164/1lmpb4k1.jpeg",
      categoryLabel: "هتل",
      title: "معرفی ۵ هتل ۷ ستاره مجلل در دبی",
      excerpt:
        "اگر قصد سفر لوکس به دبی را دارید، اقامت در این هتل‌ها تجربه‌ای فراموش‌نشدنی برایتان خواهد بود...",
      readTime: "۷ دقیقه",
      author: "مریم کریمی",
      slug: "hotel-dubai-7star",
    },
    {
      id: 3,
      category: "flight",
      image: "https://img2.taw-bio.ir/2026/456164/1lmpb4k1.jpeg",
      categoryLabel: "پرواز",
      title: "تکنیک‌های بستن چمدان جهت جلوگیری از اضافه بار",
      excerpt:
        "چگونه وسایل بیشتری را در فضای کمتر بگنجانیم و از پرداخت هزینه اضافه بار پرواز جلوگیری کنیم...",
      readTime: "۴ دقیقه",
      author: "رضا محمدی",
      slug: "flight-baggage-tips",
    },
    {
      id: 4,
      category: "tour",
      image: "https://img2.taw-bio.ir/2026/897706/1lmostri.jpeg",
      categoryLabel: "تور",
      title: "اصفهان، نصف جهان؛ معرفی جاذبه‌های پنهان این شهر تاریخی",
      excerpt:
        "فراتر از میدان نقش جهان، اصفهان جاهای دیدنی زیادی دارد که شاید کمتر به آن‌ها اشاره شده باشد...",
      readTime: "۸ دقیقه",
      author: "زهرا نوری",
      slug: "isfahan-hidden-gems",
    },
    {
      id: 5,
      category: "hotel",
      image: "https://img2.taw-bio.ir/2026/764362/1lmd13k8.jpeg",
      categoryLabel: "هتل",
      title: "تجربه اقامت در بوم‌گردی‌های یزد؛ کویر و تاریخ",
      excerpt:
        "برای بازدید از کویر و آجرهای سرخ یزد، بهترین انتخاب اقامت در هتل‌های سنتی و بوم‌گردی هاست...",
      readTime: "۶ دقیقه",
      author: "امیر حسینی",
      slug: "yazd-traditional-hotels",
    },
    {
      id: 6,
      category: "flight",
      image: "https://img2.taw-bio.ir/2026/764362/1lmd13k8.jpeg",
      categoryLabel: "پرواز",
      title: "تفاوت بلیط سیستمی و چارتر چیست؟ کدام ارزان‌تر است؟",
      excerpt:
        "قبل از خرید بلیط هواپیما، تفاوت‌های این دو نوع بلیط را به خوبی بشناسید تا انتخابی بهتر داشته باشید...",
      readTime: "۵ دقیقه",
      author: "نیلوفر صادقی",
      slug: "system-vs-charter-ticket",
    },
    {
      id: 9,
      slug: "maafiat-maliati-foroughgahi",
      category: "flight",
      categoryLabel: "آموزش مسافرتی",
      image: "https://img2.taw-bio.ir/2026/764362/1lmd13k8.jpeg",
      title: "معافیت مالیاتی فرودگاهی چیست و چگونه باید آن را بازپس بگیریم؟",
      excerpt: "چگونه عوارض خروج از کشور را پس بگیریم؟ تمام مراحل + افراد معاف",
      readTime: "۱۲ دقیقه",
      author: "حسین رحیمی",
    },
  ],
  loadMoreText: "مشاهده مطالب بیشتر",
  loadMoreLoadingText: "در حال بارگذاری...",
  sidebar: {
    searchPlaceholder: "موضوع مورد نظر...",
    searchButton: "جستجو",
    categoriesTitle: "دسته‌بندی‌ها",
    categories: [
      { label: "تورهای مسافرتی", count: "۱۲", href: "#" },
      { label: "راهنمای پرواز", count: "۸", href: "/HowToBuyTicket" },
      { label: "معرفی هتل", count: "۱۵", href: "#" },
      { label: "نامه‌های سفر", count: "۵", href: "#" },
      { label: "ویزا و مجوزها", count: "۳", href: "#" },
    ],
    popularTitle: "محبوب‌ترین مطالب",
    popularPosts: [
      {
        image: "https://img2.taw-bio.ir/2026/393365/1llq5n7s.jpeg",
        title: "بهترین زمان سفر به شیراز چه فصلی است؟",
        views: "۲,۵۰۰ بازدید",
      },
      {
        image: "https://img2.taw-bio.ir/2026/393365/1llq5n7s.jpeg",
        title: "راهنمای دریافت ویزای شینگن",
        views: "۱,۸۰۰ بازدید",
      },
      {
        image: "https://img2.taw-bio.ir/2026/393365/1llq5n7s.jpeg",
        title: "۱۰ سوغاتی خاص از ترکیه",
        views: "۱,۴۰۰ بازدید",
      },
    ],
    newsletterTitle: "عضویت در خبرنامه",
    newsletterText:
      "برترین مقالات سفر و تخفیف‌های ویژه را مستقیما در ایمیل خود دریافت کنید.",
    newsletterPlaceholder: "ایمیل خود را وارد کنید",
    subscribeButton: "عضویت",
  },
};

// گزینه‌های دسته‌بندی برای فرم
const CATEGORY_OPTIONS = [
  { key: "tour", label: "تور" },
  { key: "hotel", label: "هتل" },
  { key: "flight", label: "پرواز" },
];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [articles, setArticles] = useState(PAGE_DATA.initialArticles);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [email, setEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // فیلدهای فرم مقاله جدید
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("tour");
  const [newImage, setNewImage] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newReadTime, setNewReadTime] = useState("");

  const filteredArticles = articles.filter(
    (article) => activeFilter === "all" || article.category === activeFilter,
  );

  const handleFilter = (key: string) => setActiveFilter(key);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 1000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("با تشکر! ایمیل شما با موفقیت در خبرنامه ثبت شد.");
      setEmail("");
    }
  };

  const addArticle = () => {
    if (!newTitle.trim()) {
      alert("لطفاً عنوان مقاله را وارد کنید.");
      return;
    }

    // تولید slug از عنوان
    let slug = newTitle
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
      .replace(/-+/g, "-");

    if (!slug) {
      slug = "post-" + Date.now();
    }

    // پیدا کردن label دسته‌بندی
    const selectedCategory = CATEGORY_OPTIONS.find(
      (c) => c.key === newCategory,
    );

    const newArticle = {
      id: Date.now(),
      category: newCategory,
      image:
        newImage.trim() || `https://picsum.photos/seed/${Date.now()}/600/400`,
      categoryLabel: selectedCategory?.label || "تور",
      title: newTitle,
      excerpt: newExcerpt.trim() || "خلاصه مقاله جدید توسط شما...",
      readTime: newReadTime.trim() || "۵ دقیقه",
      author: newAuthor.trim() || "کاربر مهمان",
      slug,
    };

    setArticles((prev) => [newArticle, ...prev]);
    setShowAddForm(false);

    // ریست کردن فرم
    setNewTitle("");
    setNewExcerpt("");
    setNewCategory("tour");
    setNewImage("");
    setNewAuthor("");
    setNewReadTime("");
  };

  const addButtonStyle: React.CSSProperties = {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.2s",
  };

  const popupOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(4px)",
    padding: "20px",
  };

  const popupContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "550px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    position: "relative",
    animation: "fadeIn 0.3s ease",
    fontFamily: "inherit",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const textAreaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#374151",
  };

  const formGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  };

  return (
    <>
      <main className="blog-container">
        {/* ===== Hero قابل کلیک ===== */}
        <Link href={`/blog/${PAGE_DATA.hero.slug}`} className="blog-hero-link">
          <section className="blog-hero">
            <img src={PAGE_DATA.hero.image} alt="سفر به استانبول" />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-tag">{PAGE_DATA.hero.tag}</span>
              <h1 className="hero-title">{PAGE_DATA.hero.title}</h1>
              <div className="hero-meta">
                <span>
                  <FontAwesomeIcon icon={faCalendar} /> {PAGE_DATA.hero.date}
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} /> {PAGE_DATA.hero.readTime}
                </span>
                <span>
                  <FontAwesomeIcon icon={faUser} /> {PAGE_DATA.hero.author}
                </span>
              </div>
            </div>
          </section>
        </Link>

        <section className="blog-toolbar">
          <h2 className="toolbar-title">{PAGE_DATA.toolbarTitle}</h2>
          <div className="filter-buttons">
            {PAGE_DATA.filterButtons.map((btn) => (
              <button
                key={btn.key}
                className={`filter-btn ${activeFilter === btn.key ? "active" : ""}`}
                onClick={() => handleFilter(btn.key)}
              >
                {btn.label}
              </button>
            ))}

            <button
              style={addButtonStyle}
              onClick={() => setShowAddForm(true)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#059669")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#10b981")
              }
            >
              <FontAwesomeIcon icon={faPlus} /> مقاله جدید
            </button>
          </div>
        </section>

        {/* ===== کارت‌های مقاله (کاملاً قابل کلیک) ===== */}
        <section className="articles-grid" id="articlesGrid">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="article-card-link"
            >
              <article
                className="article-card"
                data-category={article.category}
              >
                <div className="card-image-wrapper">
                  <span className="card-category">{article.categoryLabel}</span>
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-excerpt">{article.excerpt}</p>
                  <div className="card-footer">
                    <span>
                      <FontAwesomeIcon icon={faClock} /> {article.readTime}
                    </span>
                    <span className="read-more">
                      ادامه مطلب <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <div className="load-more-container">
          <button
            className="btn-load-more"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />{" "}
                {PAGE_DATA.loadMoreLoadingText}
              </>
            ) : (
              PAGE_DATA.loadMoreText
            )}
          </button>
        </div>

        {/* ===== سایدبار (بدون برچسب‌ها) ===== */}
        <aside className="sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">جستجو در بلاگ</h3>
            <div className="newsletter-form">
              <input
                type="text"
                placeholder={PAGE_DATA.sidebar.searchPlaceholder}
                className="newsletter-input"
              />
              <button className="btn-newsletter">
                {PAGE_DATA.sidebar.searchButton}
              </button>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">
              {PAGE_DATA.sidebar.categoriesTitle}
            </h3>
            <ul className="category-list">
              {PAGE_DATA.sidebar.categories.map((cat, i) => (
                <li key={i}>
                  <Link href={cat.href}>
                    {cat.label}{" "}
                    <span className="category-count">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">{PAGE_DATA.sidebar.popularTitle}</h3>
            {PAGE_DATA.sidebar.popularPosts.map((p, i) => (
              <div key={i} className="popular-post">
                <img src={p.image} alt="مقاله" />
                <div className="popular-post-info">
                  <h4>{p.title}</h4>
                  <span>
                    <FontAwesomeIcon icon={faEye} /> {p.views}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">
              {PAGE_DATA.sidebar.newsletterTitle}
            </h3>
            <p className="newsletter-text">
              {PAGE_DATA.sidebar.newsletterText}
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={PAGE_DATA.sidebar.newsletterPlaceholder}
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter">
                {PAGE_DATA.sidebar.subscribeButton}
              </button>
            </form>
          </div>

          {/* ❌ بخش برچسب‌ها از اینجا حذف شد و فقط در صفحه مقاله نمایش داده می‌شود */}
        </aside>

        {/* ===== پاپ‌آپ فرم مقاله جدید (کامل) ===== */}
        {showAddForm && (
          <div style={popupOverlayStyle} onClick={() => setShowAddForm(false)}>
            <div style={popupContentStyle} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowAddForm(false)}
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  fontSize: "18px",
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "20px",
                  fontSize: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
                اضافه کردن مقاله جدید
              </h3>

              <label style={labelStyle}>عنوان مقاله *</label>
              <input
                type="text"
                placeholder="مثلاً: راهنمای سفر به شیراز"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={inputStyle}
              />

              <label style={labelStyle}>خلاصه مقاله</label>
              <textarea
                placeholder="خلاصه‌ای کوتاه از محتوای مقاله..."
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                style={textAreaStyle}
              />

              <div style={formGridStyle}>
                <div>
                  <label style={labelStyle}>دسته‌بندی *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>زمان مطالعه</label>
                  <input
                    type="text"
                    placeholder="مثلاً: ۷ دقیقه"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <label style={labelStyle}>نام نویسنده</label>
              <input
                type="text"
                placeholder="نام نویسنده مقاله"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                style={inputStyle}
              />

              <label style={labelStyle}>
                <FontAwesomeIcon icon={faImage} style={{ marginLeft: "6px" }} />
                آدرس تصویر (URL)
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                style={inputStyle}
                dir="ltr"
              />

              {newImage && (
                <div
                  style={{
                    marginBottom: "15px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <img
                    src={newImage}
                    alt="پیش‌نمایش"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => setShowAddForm(false)}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                    color: "#4b5563",
                    fontFamily: "inherit",
                  }}
                >
                  انصراف
                </button>
                <button
                  onClick={addArticle}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#3b82f6",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                >
                  ذخیره مقاله
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Blog;
