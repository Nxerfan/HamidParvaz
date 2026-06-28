"use client";

import "../globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const PAGE_DATA = {
  logo: {
    src: "Media/لوگو حمید پرواز (2).png",
    alt: "Niksa Logo",
    href: "/",
  },
  nav: [
    {
      id: 1,
      title: "خدمات مسافرتی",
      icon: faChevronDown,
      dropdown: [
        { id: 11, label: "رزرو هتل", href: "/hotel" },
        { id: 12, label: "رزرو پرواز", href: "/flight" },
        { id: 13, label: "تور مسافرتی", href: "/tour" },
      ],
    },
    {
      id: 2,
      title: "درباره ما",
      icon: faChevronDown,
      dropdown: [
        { id: 21, label: "تماس با ما", href: "/about-us" },
        { id: 22, label: "همکاری با ما", href: "/cooperation" },
      ],
    },
    {
      id: 3,
      title: "پشتیبانی",
      icon: faChevronDown,
      dropdown: [
        { id: 31, label: "سوالات متداول", href: "/faq" },
        { id: 32, label: "راهنمای رزرو", href: "/guid" },
        { id: 33, label: "قوانین و مقررات", href: "/rules" },
        { id: 34, label: "پیگیری خرید و کنسلی", href: "/cancellation" },
      ],
    },
  ],
  singleLinks: [
    { id: 4, label: "بلاگ", href: "/blog" },
    { id: 5, label: "تماس با ما", href: "/about-us" },
  ],
  auth: {
    login: { label: "ورود", href: "/auth" },
    register: { label: "ثبت نام", href: "/auth?tab=signup" },
  },
};

export default function Header() {
  return (
    <>
      <header>
        <div className="HeaderTop">
          <div className="Container">
            <Link href={PAGE_DATA.logo.href} className="Logo">
              <img src={PAGE_DATA.logo.src} alt={PAGE_DATA.logo.alt} />
            </Link>

            <nav>
              {PAGE_DATA.nav.map((item) => (
                <div key={item.id} className="NavItem">
                  {item.title}{" "}
                  <span className="Arrow">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <div className="Dropdown">
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.id}
                        href={drop.href}
                        className="DropdownItem"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {PAGE_DATA.singleLinks.map((link) => (
                <Link key={link.id} href={link.href} className="NavItem">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="AuthButtons">
              <Link href={PAGE_DATA.auth.login.href}>
                <button className="Btn BtnPrimary"><img src="/person-ثبت نام.svg" alt="" width={20} height={20} /> {PAGE_DATA.auth.login.label}</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="Hero2"></div>
      </header>
    </>
  );
}
