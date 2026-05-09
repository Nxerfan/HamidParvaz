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

const PAGE_DATA = {
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
  const tabParam = searchParams.get("tab");
  const allowedTabs = ["login", "signup", "forgot"];
  const initialTab = allowedTabs.includes(tabParam) ? tabParam : "login";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    login: { username: "", password: "" },
    signup: { username: "", phone: "", password: "", confirmPassword: "" },
    forgot: { phone: "" },
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    login: { password: false },
    signup: { password: false, confirmPassword: false },
  });

  const handleInputChange = (e, tab) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [name]: value },
    }));
  };

  const togglePasswordVisibility = (tab, fieldName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [fieldName]: !prev[tab][fieldName],
      },
    }));
  };

  const handleSubmit = (e, tab) => {
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

    console.log(`Submitting ${tab} form:`, data);
    alert("درخواست شما با موفقیت ثبت شد");
  };

  const renderForm = (tab) => {
    const form = PAGE_DATA.forms[tab];
    return (
      <form className="auth-form" onSubmit={(e) => handleSubmit(e, tab)}>
        {form.fields.map((field) => {
          const isPasswordField = field.isPassword;
          const inputType = isPasswordField
            ? passwordVisibility[tab]?.[field.name]
              ? "text"
              : "password"
            : field.type;
          return (
            <div key={field.name} className="input-group">
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
                    field.name === "password" ||
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
