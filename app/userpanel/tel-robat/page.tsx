"use client";

import "../global.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  title: "ربات حمید پرواز",
  description:
    "با ربات حمید پرواز تمامی فایل‌های بلیط‌های خریداری شده شما، به طور خودکار در ربات پیام‌رسان تلگرام و بله ارسال خواهد شد.",
  messengerLinks: [
    { id: 1, title: "تلگرام", href: "#" },
    { id: 2, title: "بله", href: "#" },
  ],
  howToUse: {
    intro: "چگونه از ربات تلگرام حمید پرواز استفاده کنید؟",
    botLinkText: "Bot Telegram Link",
    botLinkHref: "#",
    steps: [
      "این لینک شما را به تلگرام خواهد برد.",
      "از بخش پایین چت، بر روی دکمه استارت کلیک کنید.",
      "شما با موفقیت عضو ربات حمید پرواز خواهید شد.",
    ],
  },
  activeUsers: {
    title: "اعضای فعال",
    empty: {
      icon: "🤖",
      title: "هنوز عضوی اضافه نکرده‌اید!",
      desc: "از لینک‌های موجود برای عضویت استفاده کنید.",
    },
    users: [],
  },
};

export default function Page() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    setUsers(PAGE_DATA.activeUsers.users);
  }, []);

  const hasUsers = users.length > 0;

  return (
    <>
      <UserPannelHeader />
      <div className="containerr">
        <div className="right">
          <FilterUserPannel />
        </div>

        <div className="left">
          <div className="Split">
            <div className="R">
              <div className="Card">
                <div className="UserPanelParts">
                  <h2>{PAGE_DATA.title}</h2>

                  <p>
                    {PAGE_DATA.description}{" "}
                    {PAGE_DATA.messengerLinks.map((item, index) => (
                      <span key={item.id}>
                        <Link href={item.href}>{item.title}</Link>
                        {index !== PAGE_DATA.messengerLinks.length - 1 && " و "}
                      </span>
                    ))}
                  </p>

                  <div className="HowToUse">
                    <div className="Steps">
                      <label>
                        <FontAwesomeIcon icon={faTelegram} size="lg" />
                      </label>
                      <span></span>
                    </div>

                    <div className="Discription">
                      <ul>
                        <li>{PAGE_DATA.howToUse.intro}</li>

                        <li>
                          ۱. بر روی لینک روبرو کلیک کنید:
                          <span>
                            <Link href={PAGE_DATA.howToUse.botLinkHref}>
                              {PAGE_DATA.howToUse.botLinkText}
                            </Link>
                            <button type="button">
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                          </span>
                        </li>

                        {PAGE_DATA.howToUse.steps.map((step, index) => (
                          <li key={index}>
                            {index + 2}. {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="L">
              <div className="Card">
                <div className="UserPanelParts">
                  <div className="TopCard">
                    <p>{PAGE_DATA.activeUsers.title}</p>
                  </div>

                  <div className="Users">
                    {hasUsers ? (
                      users.map((user, index) => (
                        <div key={index} className="UserItem">
                          {user}
                        </div>
                      ))
                    ) : (
                      <div id="content">
                        <div className="empty">
                          <div className="empty-icon">
                            {PAGE_DATA.activeUsers.empty.icon}
                          </div>
                          <p>{PAGE_DATA.activeUsers.empty.title}</p>
                          <small>{PAGE_DATA.activeUsers.empty.desc}</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
