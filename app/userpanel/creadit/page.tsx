"use client";

import { useState } from "react";
import "../global.css";
import FilterUserPannel from "../../components/(filters)/FilterUserPannel";
import UserPannelHeader from "../../components/(Headers)/UserPannelHeader";
const PAGE_DATA = {
  creditTitle: "اعتبار کاربری",
  creditAmount: "0",
  creditUnit: "تومان",
  increaseBtn: "افزایش اعتبار",
  withdrawBtn: "برداشت   پول",
  refundInfo:
    "اعتبار موجود شما پس از ثبت درخواست استرداد از قسمت فوق، حداکثر تا 3 روز کاری به کارت شما بازگردانده می‌شود.",
  historyTitle: "ریز گردش اعتبار کاربری",
  tableHeaders: ["ردیف", "تاریخ و ساعت", "عنوان", "مبلغ", "مانده"],
};

export default function UserCredit() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifySelf: "center",
                  }}
                >
                  <button className="BtnPrimary">
                    {PAGE_DATA.increaseBtn}
                  </button>
                  <button
                    className="BtnPrimary"
                    style={{
                      background: "var(--textDark)",
                      color: "#fff",
                      border: "2px solid var(--textDark)",
                    }}
                    onClick={() => setShowWithdrawModal(true)}
                  >
                    {PAGE_DATA.withdrawBtn}
                  </button>
                </div>
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

      {showWithdrawModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
          onClick={() => setShowWithdrawModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "420px",
              width: "90%",
              textAlign: "center",
              fontFamily: "var(--Font)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "var(--textDark)",
                marginBottom: "12px",
              }}
            >
              درخواست برداشت وجه
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--textGray)",
                marginBottom: "24px",
              }}
            >
              آیا از برداشت تمام موجودی کیف پول خود اطمینان دارید؟
            </p>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                className="BtnPrimary"
                onClick={() => {
                  setShowWithdrawModal(false);
                }}
              >
                تایید و برداشت
              </button>
              <button
                className="BtnPrimary2"
                onClick={() => setShowWithdrawModal(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
