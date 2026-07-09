"use server";

export interface NewsletterState {
  success: boolean;
  message: string;
}

export interface ContactState {
  success: boolean;
  message: string;
}

export async function subscribeNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, message: "ایمیل الزامی است" };
  }

  if (!email.includes("@")) {
    return { success: false, message: "فرمت ایمیل نامعتبر است" };
  }

  // Mock: in production, save to newsletter subscribers
  return {
    success: true,
    message: "عضویت شما در خبرنامه با موفقیت ثبت شد",
  };
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "نام، ایمیل و پیام الزامی است" };
  }

  if (!email.includes("@")) {
    return { success: false, message: "فرمت ایمیل نامعتبر است" };
  }

  // Mock: in production, save to database and/or send email
  return {
    success: true,
    message: "پیام شما با موفقیت ارسال شد",
  };
}
