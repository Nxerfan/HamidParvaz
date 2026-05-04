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
} from "@fortawesome/free-solid-svg-icons";
import "../blog/global.css";

const PAGE_DATA = {
  hero: {
    image: "https://picsum.photos/seed/travelhero/1200/600",
    tag: "پیشنهاد ویژه",
    title: "راهنمای کامل سفر به استانبول؛ شهری که در دو قاره زندگی می‌کند",
    date: "۲۵ آبان ۱۴۰۲",
    readTime: "۱۰ دقیقه مطالعه",
    author: "سارا احمدی",
    slug: "rahnamai-safar-be-istanbul",
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
      image: "https://picsum.photos/seed/kish/400/300",
      categoryLabel: "تور",
      title: "چرا تور کیش بهترین گزینه برای تعطیلات آخر هفته است؟",
      excerpt:
        "جزیره زیبای کیش با تفریحات متنوع و هتل‌های لوکس، مقصدی محبوب برای مسافران ایرانی است...",
      readTime: "۵ دقیقه",
      slug: "tor-kish-best-weekend",
    },
    {
      id: 2,
      category: "hotel",
      image: "https://picsum.photos/seed/dubaihotel/400/300",
      categoryLabel: "هتل",
      title: "معرفی ۵ هتل ۷ ستاره مجلل در دبی",
      excerpt:
        "اگر قصد سفر لوکس به دبی را دارید، اقامت در این هتل‌ها تجربه‌ای فراموش‌نشدنی برایتان خواهد بود...",
      readTime: "۷ دقیقه",
      slug: "hotel-dubai-7star",
    },
    {
      id: 3,
      category: "flight",
      image: "https://picsum.photos/seed/flighttips/400/300",
      categoryLabel: "پرواز",
      title: "تکنیک‌های بستن چمدان جهت جلوگیری از اضافه بار",
      excerpt:
        "چگونه وسایل بیشتری را در فضای کمتر بگنجانیم و از پرداخت هزینه اضافه بار پرواز جلوگیری کنیم...",
      readTime: "۴ دقیقه",
      slug: "flight-baggage-tips",
    },
    {
      id: 4,
      category: "tour",
      image: "https://picsum.photos/seed/isfahan/400/300",
      categoryLabel: "تور",
      title: "اصفهان، نصف جهان؛ معرفی جاذبه‌های پنهان این شهر تاریخی",
      excerpt:
        "فراتر از میدان نقش جهان، اصفهان جاهای دیدنی زیادی دارد که شاید کمتر به آن‌ها اشاره شده باشد...",
      readTime: "۸ دقیقه",
      slug: "isfahan-hidden-gems",
    },
    {
      id: 5,
      category: "hotel",
      image: "https://picsum.photos/seed/yazdhotel/400/300",
      categoryLabel: "هتل",
      title: "تجربه اقامت در بوم‌گردی‌های یزد؛ کویر و تاریخ",
      excerpt:
        "برای بازدید از کویر و آجرهای سرخ یزد، بهترین انتخاب اقامت در هتل‌های سنتی و بوم‌گردی هاست...",
      readTime: "۶ دقیقه",
      slug: "yazd-traditional-hotels",
    },
    {
      id: 6,
      category: "flight",
      image: "https://picsum.photos/seed/charter/400/300",
      categoryLabel: "پرواز",
      title: "تفاوت بلیط سیستمی و چارتر چیست؟ کدام ارزان‌تر است؟",
      excerpt:
        "قبل از خرید بلیط هواپیما، تفاوت‌های این دو نوع بلیط را به خوبی بشناسید تا انتخابی بهتر داشته باشید...",
      readTime: "۵ دقیقه",
      slug: "system-vs-charter-ticket",
    },
    {
      id: 9,
      slug: "maafiat-maliati-foroughgahi",
      category: "flight",
      categoryLabel: "آموزش مسافرتی",
      image: "https://picsum.photos/seed/airport/400/300",
      title: "معافیت مالیاتی فرودگاهی چیست و چگونه باید آن را بازپس بگیریم؟",
      excerpt: "چگونه عوارض خروج از کشور را پس بگیریم؟ تمام مراحل + افراد معاف",
      readTime: "۱۲ دقیقه",
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
        image: "https://picsum.photos/seed/popular1/100/100",
        title: "بهترین زمان سفر به شیراز چه فصلی است؟",
        views: "۲,۵۰۰ بازدید",
      },
      {
        image: "https://picsum.photos/seed/popular2/100/100",
        title: "راهنمای دریافت ویزای شینگن",
        views: "۱,۸۰۰ بازدید",
      },
      {
        image: "https://picsum.photos/seed/popular3/100/100",
        title: "۱۰ سوغاتی خاص از ترکیه",
        views: "۱,۴۰۰ بازدید",
      },
    ],
    newsletterTitle: "عضویت در خبرنامه",
    newsletterText:
      "برترین مقالات سفر و تخفیف‌های ویژه را مستقیما در ایمیل خود دریافت کنید.",
    newsletterPlaceholder: "ایمیل خود را وارد کنید",
    subscribeButton: "عضویت",
    tagsTitle: "برچسب‌ها",
    tags: ["سفر نوروزی", "تور ارزان", "سفر خارجی", "بلیط هواپیما"],
  },
};

const NiksaBlog = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [articles, setArticles] = useState(PAGE_DATA.initialArticles);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [email, setEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");

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
    if (!newTitle.trim()) return;

    // ساخت اسلاگ: تبدیل فاصله به خط تیره و حذف کاراکترهای اضافه
    let slug = newTitle
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // اگر عنوان فارسی باشد، اسلاگ خالی می‌شود، پس یک آیدی عددی جایگزین می‌کنیم
    if (!slug) {
      slug = "post-" + Date.now();
    }

    const newArticle = {
      id: Date.now(),
      category: "tour",
      image: "https://picsum.photos/seed/newarticle/" + Date.now(),
      categoryLabel: "تور",
      title: newTitle,
      excerpt: newExcerpt || "خلاصه مقاله جدید توسط شما...",
      readTime: "۵ دقیقه",
      author: "کاربر مهمان", 
      slug,
    };

    setArticles((prev) => [newArticle, ...prev]);
    setShowAddForm(false);
    setNewTitle("");
    setNewExcerpt("");
  };

  // Inline Styles for Popup and Button
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
  };

  const popupContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
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
  };

  const textAreaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  };

  return (
    <>
      <main className="blog-container">
        {/* بخش هیرو */}
        <section className="blog-hero">
          <img src={PAGE_DATA.hero.image} alt="سفر به ترکیه" />
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

        {/* نوار ابزار */}
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
            {/* دکمه مقاله جدید با Inline Style */}
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

        {/* شبکه مقالات */}
        <section className="articles-grid" id="articlesGrid">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
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
                  <Link href={`/blog/${article.slug}`} className="read-more">
                    ادامه مطلب <FontAwesomeIcon icon={faArrowLeft} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* دکمه لود بیشتر */}
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

        {/* سایدبار */}
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

          <div className="sidebar-widget">
            <h3 className="widget-title">{PAGE_DATA.sidebar.tagsTitle}</h3>
            <div className="tags-cloud">
              {PAGE_DATA.sidebar.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* پاپ‌آپ مقاله جدید با Inline Style */}
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
                اضافه کردن مقاله جدید
              </h3>

              <input
                type="text"
                placeholder="عنوان مقاله"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="خلاصه مقاله"
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                style={textAreaStyle}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
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

export default NiksaBlog;
