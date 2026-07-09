"use server";

export interface ProfileState {
  success: boolean;
  message: string;
}

export interface PasswordState {
  success: boolean;
  message: string;
}

export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;

  if (!firstName) {
    return { success: false, message: "نام الزامی است" };
  }

  if (email && !email.includes("@")) {
    return { success: false, message: "فرمت ایمیل نامعتبر است" };
  }

  // Mock: in production, update user in database
  return {
    success: true,
    message: "اطلاعات پروفایل با موفقیت به‌روزرسانی شد",
  };
}

export async function changePassword(
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "تمام فیلدهای رمز عبور الزامی است" };
  }

  // Mock: check old password (default is "admin123")
  if (oldPassword !== "admin123") {
    return { success: false, message: "رمز عبور فعلی نادرست است" };
  }

  if (newPassword.length < 6) {
    return { success: false, message: "رمز عبور جدید باید حداقل ۶ کاراکتر باشد" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "رمز عبور جدید و تکرار آن مطابقت ندارند" };
  }

  // Mock: in production, update password in database
  return {
    success: true,
    message: "رمز عبور با موفقیت تغییر کرد",
  };
}
