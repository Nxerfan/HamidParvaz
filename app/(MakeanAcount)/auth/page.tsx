"use client";
import "../global.css";
import { useState, useEffect, Suspense } from "react";
import { useActionState } from "react";

import { useSearchParams } from "next/navigation";
import { login, register } from "../../actions/auth";
import type { AuthState } from "../../actions/auth";
import { useToast } from "../../lib/hooks/useToast";
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateEmailOrPhone = (value: string) => {
    if (!value.trim()) return "ایمیل یا شماره موبایل الزامی است";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^09\d{9}$/.test(value);
    if (!isEmail && !isPhone) return "ایمیل یا شماره موبایل معتبر نیست";
    return "";
  };

  const validateUsername = (value: string) => {
    if (!value.trim()) return "نام و نام خانوادگی را وارد کنید";
    if (value.trim().length < 3) return "نام باید حداقل ۳ کاراکتر باشد";
    return "";
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) return "شماره موبایل الزامی است";
    if (!/^09\d{9}$/.test(value)) return "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "رمز عبور الزامی است";
    if (value.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    return "";
  };

  const validateConfirmPassword = (value: string, password: string) => {
    if (!value) return "تکرار رمز عبور الزامی است";
    if (value !== password) return "رمز عبور و تکرار آن مطابقت ندارند";
    return "";
  };

  const validateField = (name: string, value: string, tab: string) => {
    if (name === "username") {
      if (tab === "login") return validateEmailOrPhone(value);
      return validateUsername(value);
    }
    if (name === "phone") return validatePhone(value);
    if (name === "password") return validatePassword(value);
    if (name === "confirmPassword") return validateConfirmPassword(value, formData[tab].password);
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [name]: value },
    }));
    const error = validateField(name, value, tab);
    setFieldErrors((prev) => ({
      ...prev,
      [`${tab}.${name}`]: error,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, tab: string) => {
    const { name, value } = e.target;
    const error = validateField(name, value, tab);
    setFieldErrors((prev) => ({
      ...prev,
      [`${tab}.${name}`]: error,
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

  const toast = useToast();
  const [loginState, loginFormAction, isLoginPending] = useActionState(login, { success: false, message: "" } as AuthState);
  const [registerState, registerFormAction, isRegisterPending] = useActionState(register, { success: false, message: "" } as AuthState);

  const validateAllFields = (tab: string): boolean => {
    const data = formData[tab];
    const form = PAGE_DATA.forms[tab];
    const newErrors: Record<string, string> = {};
    let hasError = false;
    for (const field of form.fields) {
      const error = validateField(field.name, data[field.name] || "", tab);
      newErrors[`${tab}.${field.name}`] = error;
      if (error) hasError = true;
    }
    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
    return !hasError;
  };

  const hasCurrentTabErrors = (): boolean => {
    const form = PAGE_DATA.forms[activeTab];
    return form.fields.some((f) => fieldErrors[`${activeTab}.${f.name}`]);
  };

  const handleSubmit = (e: React.FormEvent, tab: string) => {
    e.preventDefault();
    const isValid = validateAllFields(tab);
    if (!isValid) return;

    const data = formData[tab];

    if (tab === "signup") {
      const fd = new FormData();
      fd.set("name", data.username);
      fd.set("email", data.phone);
      fd.set("password", data.password);
      fd.set("phone", data.phone);
      registerFormAction(fd);
      return;
    }

    if (tab === "login") {
      const fd = new FormData();
      fd.set("email", data.username);
      fd.set("password", data.password);
      loginFormAction(fd);
      return;
    }

    if (tab === "forgot") {
      toast.success("کد بازیابی ارسال شد");
    }
  };

  // Show server action feedback — use refs for toast to avoid infinite re-renders
  useEffect(() => {
    if (loginState.message) {
      loginState.success ? toast.success(loginState.message) : toast.error(loginState.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);
  useEffect(() => {
    if (registerState.message) {
      registerState.success ? toast.success(registerState.message) : toast.error(registerState.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerState]);

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
          const error = fieldErrors[`${tab}.${field.name}`];
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
                    onBlur={(e) => handleBlur(e, tab)}
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
                      borderColor: error ? "#d32f2f" : undefined,
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
        <button type="submit" className="auth-submit" disabled={isLoginPending || isRegisterPending || hasCurrentTabErrors()}>
            {isLoginPending || isRegisterPending ? "در حال پردازش..." : form.submitText}
          </button>

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
