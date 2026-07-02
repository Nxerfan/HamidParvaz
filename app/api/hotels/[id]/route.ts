import { NextRequest, NextResponse } from "next/server";
import { getHotelById } from "../../../data/hotels";
import type { Hotel } from "../../../data/hotels";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "شناسه هتل نامعتبر است" },
        { status: 400 },
      );
    }

    const hotel = getHotelById(numericId);

    if (!hotel) {
      return NextResponse.json(
        { error: "هتل مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json<Hotel>(hotel, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات هتل" },
      { status: 500 },
    );
  }
}
