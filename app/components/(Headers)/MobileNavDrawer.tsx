"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../lib/AuthContext";

interface NavItem {
  label: string;
  icon?: string;
  iconSrc?: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "خدمات مسافرتی",
    iconSrc: "/traveler-خدمات مسافرتی.svg",
    children: [
      { label: "رزرو هتل", href: "/hotel" },
      { label: "رزرو پرواز", href: "/flight" },
      { label: "تور مسافرتی", href: "/tour" },
      { label: "تور دلخواه خود را بسازید", href: "/tour/make-your-own" },
      { label: "هتل روی نقشه", href: "/hotel-on-map" },
      { label: "اطلاعات پرواز", href: "/flight-info" },
    ],
  },
  {
    label: "درباره ما",
    iconSrc: "/user_groups-درباره ما.svg",
    children: [
      { label: "درباره شرکت", href: "/company" },
      { label: "تماس با ما", href: "/about-us" },
      { label: "همکاری با ما", href: "/cooperation" },
    ],
  },
  {
    label: "پشتیبانی",
    iconSrc: "/hotline-پشتیبانی.svg",
    children: [
      { label: "سوالات متداول", href: "/faq" },
      { label: "راهنمای رزرو", href: "/guid" },
      { label: "قوانین و مقررات", href: "/rules" },
      { label: "پیگیری خرید و کنسلی", href: "/cancellation" },
    ],
  },
  { label: "بلاگ", iconSrc: "/blogloving-وبلاگ.svg", href: "/blog" },
  { label: "تماس با ما", href: "/about-us", icon: "envelope" },
];

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const { user, isAuthenticated, loading } = useAuth();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setExpandedItem(null);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
      >
        <span className={`hamburgerLine ${isOpen ? "active" : ""}`} />
        <span className={`hamburgerLine ${isOpen ? "active" : ""}`} />
        <span className={`hamburgerLine ${isOpen ? "active" : ""}`} />
      </button>

      {/* Overlay + Drawer */}
      {isOpen && (
        <div
          className="mobileNavOverlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`mobileNavDrawer ${isOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="منوی ناوبری">
        {/* Drawer Header */}
        <div className="mobileNavHeader">
          <Link href="/" className="mobileNavLogo" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.webp"
              alt="لوگوی سایت"
              width={200}
              height={75}
            />
          </Link>
          <button
            className="mobileNavClose"
            onClick={() => { setIsOpen(false); setExpandedItem(null); }}
            aria-label="بستن منو"
          >
            ✕
          </button>
        </div>

        {/* Drawer Nav - Grid */}
        <nav className="mobileNavGrid">
          {NAV_ITEMS.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItem === index;
            const delay = `${0.06 * index}s`;

            // Direct link card
            if (!hasChildren) {
              return (
                <Link
                  key={index}
                  href={item.href || "#"}
                  className="mobileNavGridCard"
                  style={{ animationDelay: delay }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mobileNavGridIcon">
                    {item.iconSrc && (
                      <Image src={item.iconSrc} alt="" width={22} height={22} />
                    )}
                    {item.icon === "envelope" && (
                      <FontAwesomeIcon icon={faEnvelope} style={{ width: 18, height: 18 }} />
                    )}
                  </span>
                  <span className="mobileNavGridLabel">{item.label}</span>
                </Link>
              );
            }

            // Expandable card
            return (
              <div
                key={index}
                className={`mobileNavGridCard hasSub ${isExpanded ? "isExpanded" : ""}`}
                style={{ animationDelay: delay }}
              >
                <button
                  className="mobileNavGridBtn"
                  onClick={() => setExpandedItem(isExpanded ? null : index)}
                  aria-expanded={isExpanded}
                >
                  <span className="mobileNavGridIcon">
                    {item.iconSrc && (
                      <Image src={item.iconSrc} alt="" width={22} height={22} />
                    )}
                  </span>
                  <span className="mobileNavGridLabel">{item.label}</span>
                  <span className={`mobileNavGridArrow ${isExpanded ? "rotated" : ""}`}>
                    ▾
                  </span>
                </button>
                <div className={`mobileNavGridSub ${isExpanded ? "expanded" : ""}`}>
                  {item.children!.map((child, childIdx) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="mobileNavGridSubItem"
                      style={{ animationDelay: `${0.04 * childIdx}s` }}
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Auth Button at Bottom */}
        <div className="mobileNavFooter">
          {loading ? (
            <div style={{ height: 48, borderRadius: 14, background: "rgba(0,0,0,0.04)" }} />
          ) : isAuthenticated && user ? (
            <Link href="/userpanel" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
              <button className="mobileNavAuthBtn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--goldDark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--textDark)",
                }}>
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
                {user.name || user.email}
              </button>
            </Link>
          ) : (
            <Link href="/auth" onClick={() => setIsOpen(false)}>
              <button className="mobileNavAuthBtn">
                <Image
                  src="/person-ثبت نام.svg"
                  alt=""
                  width={18}
                  height={18}
                />
                ورود
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
