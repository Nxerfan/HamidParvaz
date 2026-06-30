"use client";
import "../global.css";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhoneAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const PAGE_DATA: {
  forms: Record<string, {
    title: string;
    fields: { name: string; type: string; placeholder: string; icon: string; isPassword?: boolean }[];
    submitText: string;
    forgotPasswordText?: string;
    noAccountText?: string;
    goToSignupText?: string;
    hasAccountText?: string;
    goToLoginText?: string;
    backToLoginText?: string;
  }>;
  icons: Record<string, IconDefinition>;
  passwordRegex: RegExp;
  passwordError: string;
} = {
  forms: {
    login: {
      title: "ورود به حساب کاربری",
      fields: [
        {
          name: "username",
          type: "text",
          placeholder: "نام کاربری یا ایمیل",
          icon: "user",
        },
        {
          name: "password",
          type: "password",
          placeholder: "رمز عبور",
          icon: "lock",
          isPassword: true,
        },
      ],
      submitText: "ورود",
      forgotPasswordText: "رمز عبور خود را فراموش کرده‌اید؟",
      noAccountText: "حساب کاربری ندارید؟",
      goToSignupText: "ثبت‌نام کنید",
    },
    signup: {
      title: "ایجاد حساب کاربری",
      fields: [
        {
          name: "username",
          type: "text",
          placeholder: "نام کاربری",
          icon: "user",
        },
        {
          name: "phone",
          type: "tel",
          placeholder: "شماره تلفن",
          icon: "phone",
        },
        {
          name: "password",
          type: "password",
          placeholder: "رمز عبور",
          icon: "lock",
          isPassword: true,
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "تکرار رمز عبور",
          icon: "lock",
          isPassword: true,
        },
      ],
      submitText: "ثبت‌نام",
      hasAccountText: "قبلاً ثبت‌نام کرده‌اید؟",
      goToLoginText: "وارد شوید",
    },
    forgot: {
      title: "بازیابی رمز عبور",
      fields: [
        {
          name: "phone",
          type: "tel",
          placeholder: "شماره تلفن ثبت‌شده",
          icon: "phone",
        },
      ],
      submitText: "ارسال کد بازیابی",
      backToLoginText: "بازگشت به ورود",
    },
  },
  icons: {
    user: faUser,
    lock: faLock,
    phone: faPhoneAlt,
    eye: faEye,
    eyeSlash: faEyeSlash,
  },
  passwordRegex: /^[a-zA-Z0-9!@#$%^&*()\-_=+\[\]{};:,.\/?<>\\|~]{8,}$/,
  passwordError:
    "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف انگلیسی، اعداد یا نمادهای مجاز باشد",
};

// کامپوننت اصلی که توی Suspense قرار می‌گیره
function AuthContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "login";
  const allowedTabs = ["login", "signup", "forgot"];
  const initialTab = allowedTabs.includes(tabParam) ? tabParam : "login";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({
    login: { username: "", password: "" },
    signup: { username: "", phone: "", password: "", confirmPassword: "" },
    forgot: { phone: "" },
  });
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, Record<string, boolean>>>({
    login: { password: false },
    signup: { password: false, confirmPassword: false },
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validatePhone = (value: string) => {
    if (!/^09\d{10}$/.test(value)) {
      return "شماره موبایل باید 12 رقم و شروع شود با 09";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    const lengthOk = value.length >= 6 && value.length <= 20;
    const charsOk = /^[a-zA-Z0-9!@#$%^&*()\-_=+\[\]{};:,.\/?<>\\|~]+$/.test(
      value,
    );
    if (!lengthOk || !charsOk) {
      return "رمز عبور باید بین ۶ تا ۲۰ کاراکتر باشد و فقط شامل حروف، اعداد و نمادهای مجاز باشد";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [name]: value },
    }));
    let error = "";
    if (name === "phone") {
      error = validatePhone(value);
    } else if (name === "password" || name === "confirmPassword") {
      error = validatePassword(value);
      if (name === "confirmPassword" && tab === "signup") {
        const passwordValue = formData[tab].password;
        if (value !== passwordValue) {
          error = "رمز عبور و تکرار آن مطابقت ندارند";
        }
      }
    }
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const togglePasswordVisibility = (tab: string, fieldName: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [fieldName]: !prev[tab][fieldName],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent, tab: string) => {
    e.preventDefault();
    const data = formData[tab];

    if (tab === "signup") {
      if (data.password !== data.confirmPassword) {
        alert("رمز عبور و تکرار آن مطابقت ندارند");
        return;
      }
      if (!PAGE_DATA.passwordRegex.test(data.password)) {
        alert(PAGE_DATA.passwordError);
        return;
      }
    }

    if (tab === "login" || tab === "forgot") {
      const passwordField =
        tab === "login" ? data.password : (data.password ?? "");
      if (tab === "login" && !PAGE_DATA.passwordRegex.test(passwordField)) {
        alert(PAGE_DATA.passwordError);
        return;
      }
    }

    alert("درخواست شما با موفقیت ثبت شد");
  };

  const renderForm = (tab: string) => {
    const form = PAGE_DATA.forms[tab];
    return (
      <form className="auth-form" onSubmit={(e) => handleSubmit(e, tab)}>
        {form.fields.map((field: { name: string; type: string; placeholder: string; icon: string; isPassword?: boolean }) => {
          const isPasswordField = field.isPassword;
          const inputType = isPasswordField
            ? passwordVisibility[tab]?.[field.name]
              ? "text"
              : "password"
            : field.type;
          const error = fieldErrors[field.name];
          return (
            <div key={field.name} className="field-container">
              <div className="input-group">
                <div className="input-icon">
                  <FontAwesomeIcon icon={PAGE_DATA.icons[field.icon]} />
                </div>
                <div className="input-wrapper">
                  <input
                    type={inputType}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[tab][field.name] || ""}
                    onChange={(e) => handleInputChange(e, tab)}
                    required
                    pattern={
                      field.name === "phone"
                        ? "^09\\d{9}$"
                        : field.name === "password" ||
                            field.name === "confirmPassword"
                          ? PAGE_DATA.passwordRegex.source
                          : undefined
                    }
                    title={
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? PAGE_DATA.passwordError
                        : undefined
                    }
                    autoComplete={
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? "new-password"
                        : field.name === "username"
                          ? "username"
                          : field.name === "phone"
                            ? "tel"
                            : "off"
                    }
                    style={{
                      borderColor: error ? "red" : undefined,
                    }}
                  />
                  {isPasswordField && (
                    <button
                      type="button"
                      className="eye-toggle"
                      onClick={() => togglePasswordVisibility(tab, field.name)}
                      tabIndex={-1}
                    >
                      <FontAwesomeIcon
                        icon={
                          passwordVisibility[tab]?.[field.name]
                            ? PAGE_DATA.icons.eyeSlash
                            : PAGE_DATA.icons.eye
                        }
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Error message is now OUTSIDE the input-group and input-wrapper */}
              {error && (
                <div
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginTop: "4px",
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          );
        })}
        <Link href="/userpanel">
          <button type="submit" className="auth-submit">
            {form.submitText}
          </button>
        </Link>

        {tab === "login" && (
          <div className="auth-links">
            <button
              type="button"
              className="text-link"
              onClick={() => setActiveTab("forgot")}
            >
              {form.forgotPasswordText}
            </button>
            <div className="link-row">
              <span>{form.noAccountText}</span>
              <button
                type="button"
                className="text-link"
                onClick={() => setActiveTab("signup")}
              >
                {form.goToSignupText}
              </button>
            </div>
          </div>
        )}
        {tab === "signup" && (
          <div className="auth-links link-row">
            <span>{form.hasAccountText}</span>
            <button
              type="button"
              className="text-link"
              onClick={() => setActiveTab("login")}
            >
              {form.goToLoginText}
            </button>
          </div>
        )}
        {tab === "forgot" && (
          <button
            type="button"
            className="text-link back-link"
            onClick={() => setActiveTab("login")}
          >
            {form.backToLoginText}
          </button>
        )}
      </form>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">{PAGE_DATA.forms[activeTab].title}</h1>
        <div className="auth-form-container">{renderForm(activeTab)}</div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="auth-container">
          <div className="auth-card">
            <h1 className="auth-logo">در حال بارگذاری...</h1>
          </div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
