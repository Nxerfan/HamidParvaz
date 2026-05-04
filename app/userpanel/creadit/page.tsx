"use client";

import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  creditTitle: "اعتبار کاربری",
  creditAmount: "0",
  creditUnit: "تومان",
  increaseBtn: "افزایش اعتبار",
  refundInfo:
    "اعتبار موجود شما پس از ثبت درخواست استرداد از قسمت فوق، حداکثر تا 3 روز کاری به کارت شما بازگردانده می‌شود.",
  historyTitle: "ریز گردش اعتبار کاربری",
  tableHeaders: ["ردیف", "تاریخ و ساعت", "عنوان", "مبلغ", "مانده"],
};

export default function UserCredit() {
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
                <p>{PAGE_DATA.creditTitle}</p>
              </div>
              <div className="Credit">
                <p>
                  <span>{PAGE_DATA.creditAmount}</span>
                  {PAGE_DATA.creditUnit}
                </p>
                <button className="BtnPrimary">{PAGE_DATA.increaseBtn}</button>
                <div
                  className="UlPart"
                  style={{ backgroundColor: "var(--grayBgHover)" }}
                >
                  <ul>
                    <li>{PAGE_DATA.refundInfo}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="Card">
            <div className="UserPanelParts">
              <div className="TopCard">
                <p>{PAGE_DATA.historyTitle}</p>
              </div>
              <div className="table">
                <table>
                  <tr>
                    {PAGE_DATA.tableHeaders.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
