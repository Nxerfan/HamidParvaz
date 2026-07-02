"use server";

import { cookies } from "next/headers";
import type { User } from "../types/index";

export interface AuthState {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

function generateToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "ایمیل و رمز عبور الزامی است" };
  }

  const isEmail = email.includes("@");
  const isPhone = /^09\d{9}$/.test(email);
  if (!isEmail && !isPhone) {
    return { success: false, message: "فرمت ایمیل یا شماره موبایل نامعتبر است" };
  }

  const token = generateToken();
  const user: User = {
    id: `usr_${Date.now()}`,
    name: isEmail ? email.split("@")[0] : email,
    email: isEmail ? email : "",
    phone: isPhone ? email : "",
  };

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true, message: "ورود موفقیت‌آمیز بود", user, token };
}

export async function register(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !password) {
    return { success: false, message: "نام، ایمیل و رمز عبور الزامی است" };
  }

  if (!email.includes("@") && !/^09\d{9}$/.test(email)) {
    return { success: false, message: "فرمت ایمیل یا شماره موبایل نامعتبر است" };
  }

  if (password.length < 6) {
    return { success: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" };
  }

  const token = generateToken();
  const user: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    phone: phone || "",
  };

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true, message: "ثبت‌نام موفقیت‌آمیز بود", user, token };
}

export async function logout(): Promise<AuthState> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return { success: true, message: "خروج موفقیت‌آمیز بود" };
}
