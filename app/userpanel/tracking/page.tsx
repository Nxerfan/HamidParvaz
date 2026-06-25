"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  empty: {
    message: "هنوز موردی برای رهگیری اضافه نکرده‌اید.",
    small:
      "شما می‌توانید برای هر مسیر یا بلیط مشخص، ارزان‌تر شدن قیمت و افزایش ظرفیت آن را رهگیری کنید.",
    icon: faBolt,
  },
};

export default function AutoReserveCard() {
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
              <div id="content">
                <div className="empty">
                  <div className="empty-icon">
                    {" "}
                    <FontAwesomeIcon
                      icon={PAGE_DATA.empty.icon}
                      className="svg-inline--fa fa-wallet mr-icon-svg"
                      style={{ color: "var(--blue-400)" }}
                    />
                  </div>
                  <p>{PAGE_DATA.empty.message}</p>
                  <small>{PAGE_DATA.empty.small}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
