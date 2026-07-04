"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    ],
  },
  {
    label: "درباره ما",
    iconSrc: "/user_groups-درباره ما.svg",
    children: [
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
              src="/hamidParvaz.png"
              alt="لوگوی سایت"
              width={800}
              height={300}
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

        {/* Drawer Nav */}
        <nav className="mobileNavList">
          {NAV_ITEMS.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItem === index;

            if (!hasChildren) {
              return (
                <Link
                  key={index}
                  href={item.href || "#"}
                  className="mobileNavItem"
                  onClick={() => setIsOpen(false)}
                >
                  {item.iconSrc && (
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  {item.icon === "envelope" && (
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ width: 18, height: 18 }}
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <div key={index} className="mobileNavGroup">
                <button
                  className="mobileNavItem mobileNavToggle"
                  onClick={() =>
                    setExpandedItem(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                >
                  {item.iconSrc && (
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  <span>{item.label}</span>
                  <span
                    className={`mobileNavArrow ${isExpanded ? "rotated" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`mobileNavSubItems ${isExpanded ? "expanded" : ""}`}
                >
                  {item.children!.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className="mobileNavSubItem"
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
        </div>
      </div>
    </>
  );
}
