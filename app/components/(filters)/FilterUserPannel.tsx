"use client";

import "../globals.css";
import Link from "next/link";
import { useAuth } from "../../lib/AuthContext";

interface TopCard {
  type: string;
  href: string;
  chevron: string;
  title: string;
  stats: string;
  badge?: string;
}

interface SubLink {
  href: string;
  label: string;
}

interface NavItem {
  type: "link" | "dropdown";
  href?: string;
  icon: string;
  label: string;
  subLinks?: SubLink[];
  specialClass?: string;
}

const PAGE_DATA = {
  header: {
    username: "عرفان صادقی",
    editBtnLabel: "✎",
  },
  topCards: [
    {
      type: "club",
      href: "/userpanel/club",
      chevron: "‹",
      title: " کلاب ما",
      stats: "سطح برنزی | ۰ امتیاز",
      badge: "🏆",
    },
    {
      type: "wallet",
      href: "/userpanel/creadit",
      chevron: "‹",
      title: " کیف پول",
      stats: " موجودی | ۰ تومان",
    },
  ] satisfies TopCard[],
  navItems: [
    {
      type: "link",
      href: "/cancellation",
      icon: "🎫",
      label: "پیگیری خرید و کنسلی",
    },
    {
      type: "link",
      href: "/userpanel/auto-reserve",
      icon: "⚡",
      label: "مدیریت رزرو خودکار",
    },
    {
      type: "link",
      href: "/userpanel/tracking",
      icon: "🔔",
      label: "مدیریت رهگیری",
    },
    {
      type: "link",
      href: "/userpanel/creadit",
      icon: "💳",
      label: "اعتبار کاربری",
    },
    {
      type: "dropdown",
      icon: "📞",
      label: "پشتیبانی ۲۴/۷",
      subLinks: [
        { href: "/about-us", label: "تماس با ما" },
        { href: "/about-us", label: "سوالات متداول" },
      ],
    },
    {
      type: "dropdown",
      icon: "🧳",
      label: "خدمات سفر",
      subLinks: [
        { href: "/flight", label: "بلیط هواپیما" },
        { href: "/hotel", label: "رزرو هتل" },
        { href: "/tour", label: "رزرو تور" },
      ],
    },
    {
      type: "link",
      href: "/userpanel/pax",
      icon: "👥",
      label: "مدیریت مسافران",
    },
    { type: "link", href: "/flight-info", icon: "✈️", label: "اطلاعات پرواز" },
    {
      type: "link",
      href: "/userpanel/tel-robat",
      icon: "🤖",
      label: "ربات ما",
    },
    {
      type: "link",
      href: "/userpanel/gift-card",
      icon: "%",
      label: "سفر کارت‌ها",
    },
    {
      type: "link",
      href: "/userpanel/messages",
      icon: "✉️",
      label: "صندوق پیام",
    },
    { type: "link", href: "/about-us", icon: "ⓘ", label: "درباره ما" },
    {
      type: "link",
      href: "/",
      icon: "↪",
      label: "خروج",
      specialClass: "Logout",
    },
  ] satisfies NavItem[],
};

export default function UserMenu() {
  const { user, logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      <div className="MenuHeader">
        <button className="EditBtn" aria-label="ویرایش پروفایل">
          <Link href={"/userpanel"} style={{textDecoration:"none"}}>{PAGE_DATA.header.editBtnLabel}</Link>
        </button>
        <span className="Username">{user?.name || PAGE_DATA.header.username}</span>
      </div>

      <div className="MenuBody">
        {PAGE_DATA.topCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={card.type === "club" ? "ClubCard" : "WalletCard"}
          >
            <span className="Chevron">{card.chevron}</span>

            <div className={card.type === "club" ? "ClubInfo" : "WalletInfo"}>
              <span className={card.type === "club" ? "ClubName" : "Wallet"}>
                {card.title}
              </span>
              {card.type === "club" ? (
                <span className="ClubStats">{card.stats}</span>
              ) : (
                <div className="Badge">
                  <span className="WalletStats">{card.stats}</span>
                </div>
              )}
            </div>

            {card.type === "club" && <div className="Badge">{card.badge}</div>}
          </Link>
        ))}

        <nav className="Nav">
          {PAGE_DATA.navItems.map((item, index) => {
            if (item.type === "link") {
              if (item.specialClass === "Logout") {
                return (
                  <a
                    key={index}
                    href="#"
                    onClick={handleLogout}
                    className="Item Logout"
                  >
                    <i className="Icon">{item.icon}</i>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={index}
                  href={item.href!}
                  className={`Item ${item.specialClass || ""}`}
                >
                  <i className="Icon">{item.icon}</i>
                  {item.label}
                </Link>
              );
            }

            if (item.type === "dropdown") {
              return (
                <details key={index} className="Dropdown">
                  <summary className="Item">
                    <i className="Icon">{item.icon}</i>
                    {item.label}
                  </summary>

                  <div className="Content">
                    {item.subLinks!.map((sub, subIndex) => (
                      <Link key={subIndex} href={sub.href}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }
            return null;
          })}
        </nav>
      </div>
    </>
  );
}
