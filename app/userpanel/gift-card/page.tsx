"use client";

import "../global.css";
import { useState } from "react";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  title: "مدیریت رزرو خودکار",
  autoReserve: {
    empty: {
      icon: "⚡",
      title: "سفر کارت فعالی وجود ندارد.",
    },
    cards: [],
  },
};

export default function Page() {
  const [cards] = useState<string[]>(PAGE_DATA.autoReserve.cards);

  const hasCards = cards.length > 0;

  return (
    <>
      <UserPannelHeader />
      <div className="containerr">
        <div className="right">
          <FilterUserPannel />
        </div>

        <div className="left">
          <div className="Card">
            <div className="UserPanelParts">
              <div className="TopCard">
                <p>{PAGE_DATA.title}</p>
              </div>

              <div className="Content" id="autoReserveCard">
                {hasCards ? (
                  cards.map((item, index) => (
                    <div key={index} className="ReserveItem">
                      {item}
                    </div>
                  ))
                ) : (
                  <div id="content">
                    <div className="empty">
                      <div className="empty-icon">
                        {PAGE_DATA.autoReserve.empty.icon}
                      </div>
                      <p>{PAGE_DATA.autoReserve.empty.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
