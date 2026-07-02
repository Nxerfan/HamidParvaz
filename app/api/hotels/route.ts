import { NextRequest, NextResponse } from "next/server";
import { hotelsDB } from "../../data/hotels";
import type { Hotel } from "../../data/hotels";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const stars = searchParams.get("stars");
    const isCancelable = searchParams.get("isCancelable");

    let results: Hotel[] = [...hotelsDB];

    if (location) {
      results = results.filter((hotel) =>
        hotel.location.includes(location),
      );
    }
    if (minPrice) {
      results = results.filter(
        (hotel) => hotel.pricePerNight >= Number(minPrice),
      );
    }
    if (maxPrice) {
      results = results.filter(
        (hotel) => hotel.pricePerNight <= Number(maxPrice),
      );
    }
    if (stars) {
      results = results.filter((hotel) => hotel.stars === Number(stars));
    }
    if (isCancelable === "true") {
      results = results.filter((hotel) => hotel.isCancelable);
    }

    return NextResponse.json<Hotel[]>(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت لیست هتل‌ها" },
      { status: 500 },
    );
  }
}
