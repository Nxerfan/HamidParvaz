import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mockUser = {
      id: "usr_001",
      name: "عرفان صادقی",
      email: "erfan@example.com",
      phone: "09123456789",
      nationality: "ایرانی",
      gender: "آقا",
      avatar: "https://img.icons8.com/?size=100&id=RH2knxpdDpjm&format=png&color=000000",
      score: 2500,
      level: "نقره‌ای",
    };

    return NextResponse.json(mockUser, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات کاربر" },
      { status: 500 },
    );
  }
}
