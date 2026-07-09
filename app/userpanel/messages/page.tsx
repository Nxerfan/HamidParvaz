"use client";

import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
import { useState } from "react";

const PAGE_DATA = {
  title: "صندوق پیام‌ها",
  messages: {
    empty: {
      title: "شما پیامی ندارید.",
    },
    items: [],
  },
};

export default function Page() {
  const [messages] = useState<string[]>(PAGE_DATA.messages.items);

  const hasMessages = messages.length > 0;

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
                {hasMessages ? (
                  messages.map((msg, index) => (
                    <div key={index} className="MessageItem">
                      {msg}
                    </div>
                  ))
                ) : (
                  <div id="content">
                    <div className="empty">
                      <h3>{PAGE_DATA.messages.empty.title}</h3>
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
