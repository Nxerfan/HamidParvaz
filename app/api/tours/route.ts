import { NextRequest, NextResponse } from "next/server";
import { toursDB } from "../../data/tours";
import type { Tour } from "../../data/tours";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const departureCity = searchParams.get("departureCity");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const isSpecial = searchParams.get("isSpecial");

    let results: Tour[] = [...toursDB];

    if (destination) {
      results = results.filter((tour) =>
        tour.destination.includes(destination),
      );
    }
    if (departureCity) {
      results = results.filter((tour) =>
        tour.departureCity?.includes(departureCity),
      );
    }
    if (minPrice) {
      results = results.filter((tour) => tour.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((tour) => tour.price <= Number(maxPrice));
    }
    if (isSpecial === "true") {
      results = results.filter((tour) => tour.isSpecial);
    }

    return NextResponse.json<Tour[]>(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت لیست تورها" },
      { status: 500 },
    );
  }
}
