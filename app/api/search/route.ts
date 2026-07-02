import { NextRequest, NextResponse } from "next/server";
import { toursDB } from "../../data/tours";
import { hotelsDB } from "../../data/hotels";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "flight" | "hotel" | "tour" | null;
    const q = searchParams.get("q") || "";
    const destination = searchParams.get("destination") || "";
    const origin = searchParams.get("origin") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (!type && !q && !destination) {
      return NextResponse.json(
        { error: "حداقل یکی از پارامترهای type، q یا destination الزامی است" },
        { status: 400 },
      );
    }

    const results: unknown[] = [];

    if (type === "tour" || !type) {
      let tours = [...toursDB];
      if (destination) tours = tours.filter((t) => t.destination.includes(destination));
      if (origin) tours = tours.filter((t) => t.departureCity?.includes(origin));
      if (minPrice) tours = tours.filter((t) => t.price >= Number(minPrice));
      if (maxPrice) tours = tours.filter((t) => t.price <= Number(maxPrice));
      if (q) tours = tours.filter((t) => t.title.includes(q) || t.destination.includes(q));
      if (type === "tour") return NextResponse.json(tours, { status: 200 });
      results.push(...tours.map((t) => ({ ...t, _type: "tour" as const })));
    }

    if (type === "hotel" || !type) {
      let hotels = [...hotelsDB];
      if (destination) hotels = hotels.filter((h) => h.location.includes(destination));
      if (minPrice) hotels = hotels.filter((h) => h.pricePerNight >= Number(minPrice));
      if (maxPrice) hotels = hotels.filter((h) => h.pricePerNight <= Number(maxPrice));
      if (q) hotels = hotels.filter((h) => h.name.includes(q) || h.location.includes(q));
      if (type === "hotel") return NextResponse.json(hotels, { status: 200 });
      results.push(...hotels.map((h) => ({ ...h, _type: "hotel" as const })));
    }

    if (type === "flight" || !type) {
      // Mock flights since there's no flights data file
      const mockFlights = [
        { id: 1, airline: "ایران ایر", origin: "تهران", destination: "استانبول", price: 8500000, _type: "flight" as const },
        { id: 2, airline: "ماهان", origin: "تهران", destination: "دبی", price: 12000000, _type: "flight" as const },
        { id: 3, airline: "ترکیش", origin: "تهران", destination: "استانبول", price: 9200000, _type: "flight" as const },
      ];
      let flights = [...mockFlights];
      if (destination) flights = flights.filter((f) => f.destination.includes(destination));
      if (origin) flights = flights.filter((f) => f.origin.includes(origin));
      if (minPrice) flights = flights.filter((f) => f.price >= Number(minPrice));
      if (maxPrice) flights = flights.filter((f) => f.price <= Number(maxPrice));
      if (type === "flight") return NextResponse.json(flights, { status: 200 });
      results.push(...flights);
    }

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در جستجو" },
      { status: 500 },
    );
  }
}
