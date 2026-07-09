"use client";
import { useState } from "react";
import SecondHeader from "../../components/(Headers)/SecondHeader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGraduationCap,
  faHospital,
  faGamepad,
  faArrowLeft,
  faFolderOpen,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./global.css";

interface FormFieldOption {
  value: string;
  text: string;
}

interface FormFieldConfig {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  pattern?: RegExp;
  errorMessage?: string;
  options?: FormFieldOption[];
  rows?: number;
  accept?: string;
}

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  portfolio: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  position?: string;
  resume?: string;
}

const PAGE_DATA = {
  hero: {
    title: "به تیم ما بپیوندید",
    desc: "ما در حمید پرواز به دنبال افراد خلاق و با استعداد هستیم تا در کنار هم تجربه‌های بی‌نظیری خلق کنیم.",
  },
  benefits: [
    {
      icon: faClock,
      title: "ساعت کاری منعطف",
      desc: "تعادل بین کار و زندگی شخصی برای ما مهم است.",
    },
    {
      icon: faGraduationCap,
      title: "یادگیری و توسعه",
      desc: "بودجه آموزشی برای شرکت در دوره‌ها و ورکشاپ‌ها.",
    },
    {
      icon: faHospital,
      title: "بیمه تکمیلی",
      desc: "پوشش کامل بیمه برای شما و اعضای خانواده.",
    },
    {
      icon: faGamepad,
      title: "محیط پویا",
      desc: "فضای کاری دوستانه، اتاق بازی و رویدادهای تیمی.",
    },
  ],
  sections: {
    jobsTitle: "موقعیت‌های شغلی باز",
    formTitle: "فرم ارسال رزومه",
  },
  jobs: [
    {
      title: "کارشناس فروش تورهای خارجی",
      meta: "تهران | تمام وقت | حضوری",
      href: "#ProfileForm",
      applyText: "ارسال رزومه",
    },
    {
      title: "برنامه‌نویس Front-End (React)",
      meta: "تهران | تمام وقت | هیبرید",
      href: "#ProfileForm",
      applyText: "ارسال رزومه",
    },
    {
      title: "کارشناس تولید محتوا و سئو",
      meta: "دورکاری | پروژه‌ای",
      href: "#ProfileForm",
      applyText: "ارسال رزومه",
    },
  ],
  form: {
    fields: {
      fullName: {
        label: "نام و نام خانوادگی",
        type: "text",
        placeholder: "مثال: علی محمدی",
        required: true,
        pattern: /^[\u0600-\u06FF\s]+$/,
        errorMessage: "نام و نام خانوادگی باید فقط شامل حروف فارسی باشد",
      } satisfies FormFieldConfig,
      phone: {
        label: "شماره تماس",
        type: "text",
        placeholder: "مثال: 0912...",
        required: true,
        pattern: /^09\d{9}$/,
        errorMessage:
          "شماره تماس باید با 09 شروع و 11 رقم باشد (مثال: 09123456789)",
      } satisfies FormFieldConfig,
      email: {
        label: "آدرس ایمیل",
        type: "email",
        placeholder: "name@example.com",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "آدرس ایمیل معتبر نیست",
      } satisfies FormFieldConfig,
      position: {
        label: "موقعیت شغلی مورد نظر",
        type: "select",
        options: [
          { value: "", text: "انتخاب کنید..." },
          { value: "sales", text: "کارشناس فروش" },
          { value: "developer", text: "برنامه‌نویس" },
          { value: "content", text: "تولید محتوا" },
          { value: "other", text: "سایر (درخواست عمومی)" },
        ],
        required: true,
        errorMessage: "انتخاب موقعیت شغلی الزامی است",
        placeholder: "",
      } satisfies FormFieldConfig,
      portfolio: {
        label: "لینک نمونه کار (اختیاری)",
        type: "text",
        placeholder: "لینک LinkedIn، GitHub یا Dribbble",
        required: false,
      } satisfies FormFieldConfig,
      description: {
        label: "توضیحات تکمیلی",
        type: "textarea",
        placeholder: "درباره خودتان بنویسید...",
        rows: 4,
        required: false,
      } satisfies FormFieldConfig,
      resume: {
        label: "بارگذاری رزومه (PDF)",
        type: "file",
        accept: ".pdf,.doc,.docx",
        placeholder: "برای انتخاب فایل کلیک کنید یا فایل را اینجا رها کنید",
        required: true,
        errorMessage: "بارگذاری فایل رزومه الزامی است",
      } satisfies FormFieldConfig,
    },
    submitText: "ارسال درخواست",
    successMessage: "درخواست شما با موفقیت ثبت شد",
  },
  icons: {
    arrowLeft: faArrowLeft,
    folderOpen: faFolderOpen,
    checkCircle: faCheckCircle,
  },
};

export default function CooperationPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    phone: "",
    email: "",
    position: "",
    portfolio: "",
    description: "",
  });
  const [fileName, setFileName] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumeFile(file);
      setFileName(file.name);
      setFileSelected(true);
      setErrors((prev) => ({ ...prev, resume: undefined }));
    } else {
      setResumeFile(null);
      setFileName("");
      setFileSelected(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const fields = PAGE_DATA.form.fields;

    if (fields.fullName.required) {
      if (!formValues.fullName.trim()) {
        newErrors.fullName = fields.fullName.errorMessage;
      } else if (
        fields.fullName.pattern &&
        !fields.fullName.pattern.test(formValues.fullName.trim())
      ) {
        newErrors.fullName = fields.fullName.errorMessage;
      }
    }

    if (fields.phone.required) {
      if (!formValues.phone.trim()) {
        newErrors.phone = fields.phone.errorMessage;
      } else if (
        fields.phone.pattern &&
        !fields.phone.pattern.test(formValues.phone.trim())
      ) {
        newErrors.phone = fields.phone.errorMessage;
      }
    }

    if (fields.email.required) {
      if (!formValues.email.trim()) {
        newErrors.email = fields.email.errorMessage;
      } else if (
        fields.email.pattern &&
        !fields.email.pattern.test(formValues.email.trim())
      ) {
        newErrors.email = fields.email.errorMessage;
      }
    }

    if (fields.position.required && !formValues.position) {
      newErrors.position = fields.position.errorMessage;
    }

    if (fields.resume.required && !resumeFile) {
      newErrors.resume = fields.resume.errorMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowSuccess(true);
  };

  const closeModal = () => {
    setShowSuccess(false);
    setFormValues({
      fullName: "",
      phone: "",
      email: "",
      position: "",
      portfolio: "",
      description: "",
    });
    setResumeFile(null);
    setFileName("");
    setFileSelected(false);
    setErrors({});
    const fileInput = document.getElementById("resumeFile") as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const getInputStyle = (fieldName: string): React.CSSProperties => ({
    borderColor: errors[fieldName as keyof FormErrors] ? "red" : undefined,
    boxShadow: errors[fieldName as keyof FormErrors] ? "0 0 0 2px rgba(255,0,0,0.2)" : undefined,
  });

  return (
    <>
    <SecondHeader />
      <div className="MainContent">
        <div className="CoopHero">
          <h1>{PAGE_DATA.hero.title}</h1>
          <p>{PAGE_DATA.hero.desc}</p>
        </div>

        <div className="BenefitsGrid">
          {PAGE_DATA.benefits.map((benefit, index) => (
            <div key={index} className="BenefitCard">
              <span className="BenefitIcon">
                <FontAwesomeIcon icon={benefit.icon} />
              </span>
              <span className="BenefitTitle">{benefit.title}</span>
              <span className="BenefitDesc">{benefit.desc}</span>
            </div>
          ))}
        </div>

        <h2 className="SectionTitle">{PAGE_DATA.sections.jobsTitle}</h2>
        <div className="JobsList">
          {PAGE_DATA.jobs.map((job, index) => (
            <div key={index} className="JobItem">
              <div className="JobInfo">
                <h3>{job.title}</h3>
                <span className="JobMeta">{job.meta}</span>
              </div>
              <Link href={job.href} className="ApplyLink">
                {job.applyText}{" "}
                <FontAwesomeIcon icon={PAGE_DATA.icons.arrowLeft} />
              </Link>
            </div>
          ))}
        </div>

        <h2 className="SectionTitle">{PAGE_DATA.sections.formTitle}</h2>
        <div className="FormCard" id="ProfileForm">
          <form onSubmit={handleSubmit} noValidate>
            <div className="Grid2">
              <div className="Field">
                <label>{PAGE_DATA.form.fields.fullName.label}</label>
                <input
                  type={PAGE_DATA.form.fields.fullName.type}
                  name="fullName"
                  placeholder={PAGE_DATA.form.fields.fullName.placeholder}
                  value={formValues.fullName}
                  onChange={handleInputChange}
                  required={PAGE_DATA.form.fields.fullName.required}
                  style={getInputStyle("fullName")}
                />
                {errors.fullName && (
                  <span className="FieldError">{errors.fullName}</span>
                )}
              </div>
              <div className="Field">
                <label>{PAGE_DATA.form.fields.phone.label}</label>
                <input
                  type={PAGE_DATA.form.fields.phone.type}
                  name="phone"
                  placeholder={PAGE_DATA.form.fields.phone.placeholder}
                  value={formValues.phone}
                  onChange={handleInputChange}
                  required={PAGE_DATA.form.fields.phone.required}
                  style={getInputStyle("phone")}
                />
                {errors.phone && (
                  <span className="FieldError">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="Grid2">
              <div className="Field">
                <label>{PAGE_DATA.form.fields.email.label}</label>
                <input
                  type={PAGE_DATA.form.fields.email.type}
                  name="email"
                  placeholder={PAGE_DATA.form.fields.email.placeholder}
                  value={formValues.email}
                  onChange={handleInputChange}
                  required={PAGE_DATA.form.fields.email.required}
                  style={getInputStyle("email")}
                />
                {errors.email && (
                  <span className="FieldError">{errors.email}</span>
                )}
              </div>
              <div className="Field">
                <label>{PAGE_DATA.form.fields.position.label}</label>
                <select
                  name="position"
                  value={formValues.position}
                  onChange={handleInputChange}
                  required={PAGE_DATA.form.fields.position.required}
                  style={getInputStyle("position")}
                >
                  {PAGE_DATA.form.fields.position.options!.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <span className="FieldError">{errors.position}</span>
                )}
              </div>
            </div>

            <div className="Field">
              <label>{PAGE_DATA.form.fields.portfolio.label}</label>
              <input
                type={PAGE_DATA.form.fields.portfolio.type}
                name="portfolio"
                placeholder={PAGE_DATA.form.fields.portfolio.placeholder}
                value={formValues.portfolio}
                onChange={handleInputChange}
                required={PAGE_DATA.form.fields.portfolio.required}
              />
            </div>

            <div className="Field">
              <label>{PAGE_DATA.form.fields.description.label}</label>
              <textarea
                rows={PAGE_DATA.form.fields.description.rows}
                name="description"
                placeholder={PAGE_DATA.form.fields.description.placeholder}
                value={formValues.description}
                onChange={handleInputChange}
                required={PAGE_DATA.form.fields.description.required}
              ></textarea>
            </div>

            <div className="Field">
              <label>{PAGE_DATA.form.fields.resume.label}</label>
              <label
                className="FileUpload"
                style={
                  errors.resume
                    ? {
                        borderColor: "red",
                        boxShadow: "0 0 0 2px rgba(255,0,0,0.2)",
                      }
                    : {}
                }
              >
                <input
                  type={PAGE_DATA.form.fields.resume.type}
                  hidden
                  accept={PAGE_DATA.form.fields.resume.accept}
                  id="resumeFile"
                  onChange={handleFileChange}
                  required={PAGE_DATA.form.fields.resume.required}
                />
                <span
                  id="fileName"
                  style={{ color: fileSelected ? "green" : "inherit" }}
                >
                  {fileSelected ? (
                    <>✅ فایل انتخاب شد: {fileName}</>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={PAGE_DATA.icons.folderOpen} />{" "}
                      {PAGE_DATA.form.fields.resume.placeholder}
                    </>
                  )}
                </span>
              </label>
              {errors.resume && (
                <span className="FieldError">{errors.resume}</span>
              )}
            </div>

            <div className="SubmitArea">
              <button type="submit" className="SubmitBtn">
                {PAGE_DATA.form.submitText}
              </button>
            </div>
          </form>
        </div>

        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                maxWidth: "400px",
                width: "90%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={PAGE_DATA.icons.checkCircle}
                style={{
                  fontSize: "3rem",
                  color: "#4CAF50",
                  marginBottom: "1rem",
                }}
              />
              <h3 style={{ margin: "0 0 0.5rem" }}>
                {PAGE_DATA.form.successMessage}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  marginTop: "1rem",
                  padding: "0.6rem 2rem",
                  background: "#ffcd11",
                  color: "#5c4b00",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--Font)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                تایید
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
