import { NextRequest, NextResponse } from "next/server";
import { getTourById } from "../../../data/tours";
import type { Tour } from "../../../data/tours";

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
        { error: "شناسه تور نامعتبر است" },
        { status: 400 },
      );
    }

    const tour = getTourById(numericId);

    if (!tour) {
      return NextResponse.json(
        { error: "تور مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json<Tour>(tour, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات تور" },
      { status: 500 },
    );
  }
}
