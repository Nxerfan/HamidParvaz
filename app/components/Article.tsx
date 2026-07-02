"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faClock,
  faEye,
  faStar,
  faInfoCircle,
  faListUl,
  faSearch,
  faBookOpen,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import "../blog/global.css";
import Image from "next/image";
import SecondHeader from "./(Headers)/SecondHeader";
import type {
  Article,
  ShareLink,
  ContentBlock,
  TocItem,
  RelatedPost,
} from "../types";

const NiksaArticle = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [activeTocId, setActiveTocId] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data: Article[]) => {
        const cleanSlug = slug.trim();
        const found = data.find(
          (a: Article) => a.slug.trim() === cleanSlug,
        );
        if (found) {
          setArticle(found);
        } else {
          setIsNotFound(true);
        }
      })
      .catch(() => setIsNotFound(true));
  }, [slug]);

  useEffect(() => {
    const sections = document.querySelectorAll("h2[id]");
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveTocId(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isNotFound) {
    return (
      <>
        <SecondHeader />
        <main className="not-found-container">
          <div className="not-found-icon">🔍</div>
          <h1 className="not-found-title">
            مقاله‌ای که به دنبالش بودید پیدا نشد!
          </h1>
          <p className="not-found-desc">
            متأسفانه لینکی که وارد کرده‌اید نامعتبر است یا این مقاله حذف شده
            است. اما نگران نباشید، مقالات جذاب دیگری برای شما داریم!
          </p>
          <Link href="/blog" className="not-found-btn">
            بازگشت به مجله گردشگری
          </Link>
        </main>
      </>
    );
  }

  if (!article) {
    return (
      <div
        style={{
          padding: "100px",
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid var(--gold, #ffcd11)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const data = article.fullContent;
  if (!data) return null;

  return (
    <>
      <SecondHeader />
      <main className="article-container">
        <div className="breadcrumbs">
          <Link href="/">
            <FontAwesomeIcon icon={faHome} /> صفحه اصلی
          </Link>
          <span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <Link href="/blog">مجله گردشگری</Link>
          <span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span>{data.category}</span>
        </div>

        <div className="article-header">
          <span className="category-badge">{data.category}</span>
          <h1>{data.title}</h1>
          <div className="article-meta">
            <div className="author-info">
              <Image src={data.author.image} alt="نویسنده" width={40} height={40} style={{ borderRadius: "50%" }} />
              <div>
                <span>{data.author.name}</span>
                <small>{data.author.role}</small>
              </div>
            </div>
            <div className="meta-info">
              <span>
                <FontAwesomeIcon icon={faClock} /> {data.date}
              </span>
              <span>
                <FontAwesomeIcon icon={faEye} /> {data.views} بازدید
              </span>
            </div>
          </div>
        </div>

        <div className="article-grid">
          <article className="content-column">
            <div className="featured-image">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <Image src={data.featuredImage.src} alt={data.featuredImage.alt} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: "cover" }} />
              </div>
              <figcaption className="caption">
                {data.featuredImage.caption}
              </figcaption>
            </div>

            <div className="share-top">
              <span>{data.share.title}</span>
              <div className="social-icons">
                {data.share.links.map((social: ShareLink, index: number) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`social-link ${social.name}`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="highlight-box">
              <h3>
                <FontAwesomeIcon icon={faStar} /> {data.highlight.title}
              </h3>
              <ul>
                {data.highlight.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="article-text">
              {data.articleContent.map((block: ContentBlock, index: number) => {
                if (block.type === "p")
                  return <p key={index}>{block.content}</p>;
                if (block.type === "h2")
                  return (
                    <h2 key={index} id={block.id}>
                      {block.content}
                    </h2>
                  );
                if (block.type === "h3")
                  return <h3 key={index}>{block.content}</h3>;
                if (block.type === "ul")
                  return (
                    <ul key={index}>
                      {block.items!.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                if (block.type === "infoBox")
                  return (
                    <div key={index} className="info-box">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      <span>
                        <strong>نکته مهم: </strong> {block.content}
                      </span>
                    </div>
                  );
                if (block.type === "image" && block.src)
                  return (                      <div key={index} className="in-article-image">
                        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                          <Image src={block.src} alt={block.alt || ""} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: "cover" }} />
                        </div>
                      </div>
                  );
                return null;
              })}
            </div>

            <div className="article-tags">
              <FontAwesomeIcon icon={faTags} />
              <div className="tags-list">
                {data.tags.map((tag: string, index: number) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
          </article>

          <aside className="sidebar-column">
            <div className="widget">
              <div className="widget-header">
                <FontAwesomeIcon icon={faListUl} /> فهرست مطالب
              </div>
              <ul className="toc-list">
                {data.toc.map((item: TocItem, index: number) => (
                  <li key={index}>
                    <a
                      href={`#${item.id}`}
                      className={activeTocId === item.id ? "active" : ""}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="widget">
              <div className="widget-header">
                <FontAwesomeIcon icon={faSearch} /> جستجو
              </div>
              <div className="widget-search">
                <input type="text" placeholder="جستجو در مجله..." />
                <button>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            <div className="widget related-posts">
              <div className="widget-header">
                <FontAwesomeIcon icon={faBookOpen} /> مقالات مرتبط
              </div>
              {data.relatedPosts.length > 0 ? (
                data.relatedPosts.map((post: RelatedPost, index: number) => (
                  <div key={index} className="related-card">
                    <Image src={post.image} alt={post.title} width={80} height={60} style={{ objectFit: "cover", borderRadius: "8px" }} />
                    <div>
                      <Link href={post.href}>{post.title}</Link>
                      <small>
                        <FontAwesomeIcon icon={faClock} /> {post.time}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--textGray)", fontSize: "0.9rem" }}>
                  مقاله مرتبطی یافت نشد.
                </p>
              )}
            </div>

            <div className="widget cta-box">
              <h4>{data.cta.title}</h4>
              <p>{data.cta.text}</p>
              <Link href={data.cta.href} className="btn-cta">
                {data.cta.buttonText}
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default NiksaArticle;
