"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import SecondHeader from "../../components/(Headers)/SecondHeader";
import { changePassword } from "../../actions/user";
import type { PasswordState } from "../../actions/user";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordState, passwordFormAction, isPending] = useActionState(changePassword, { success: false, message: "" } as PasswordState);

  useEffect(() => {
    if (passwordState.success) {
      setSuccess(true);
      setTimeout(() => router.push("/userpanel"), 2000);
    } else if (passwordState.message) {
      setError(passwordState.message);
    }
  }, [passwordState, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentPassword.trim()) {
      setError("لطفاً رمز عبور فعلی را وارد کنید.");
      return;
    }
    if (newPassword.length < 6) {
      setError("رمز عبور جدید باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("رمز عبور جدید و تکرار آن یکسان نیستند.");
      return;
    }

    const fd = new FormData();
    fd.set("oldPassword", currentPassword);
    fd.set("newPassword", newPassword);
    fd.set("confirmPassword", confirmPassword);
    passwordFormAction(fd);
  };

  return (
    <>
      <SecondHeader />
      <div
        style={{
          maxWidth: 420,
          margin: "60px auto",
          padding: "40px",
          background: "var(--bgWhite, #fff)",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,.08)",
          direction: "rtl",
          fontFamily: "var(--Font, sans-serif)",
        }}
      >
        <h2
          style={{
            marginBottom: 24,
            fontSize: 20,
            fontWeight: "bold",
            color: "var(--textDark, #222)",
          }}
        >
          تغییر رمز عبور
        </h2>

        {success ? (
          <p style={{ color: "green", textAlign: "center" }}>
            رمز عبور با موفقیت تغییر یافت. در حال انتقال...
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
              رمز عبور فعلی <span style={{ color: "red" }}>*</span>
              <input
                type="password"
                name="oldPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="رمز عبور فعلی"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 14,
                  fontFamily: "inherit",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
              رمز عبور جدید <span style={{ color: "red" }}>*</span>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="حداقل ۶ کاراکتر"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 14,
                  fontFamily: "inherit",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
              تکرار رمز عبور جدید <span style={{ color: "red" }}>*</span>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز عبور جدید"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 14,
                  fontFamily: "inherit",
                }}
              />
            </label>

            {error && (
              <p style={{ color: "red", fontSize: 13, margin: 0 }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                padding: "12px",
                background: "var(--gold, #ffcd11)",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
                marginTop: 8,
              }}
            >
              تغییر رمز عبور
            </button>

            <button
              type="button"
              onClick={() => router.push("/userpanel")}
              style={{
                padding: "10px",
                background: "none",
                border: "1px solid #ddd",
                borderRadius: 8,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "var(--textGray, #666)",
              }}
            >
              انصراف
            </button>
          </form>
        )}
      </div>
    </>
  );
}
