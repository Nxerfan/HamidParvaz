import { NextRequest, NextResponse } from "next/server";
import type { Flight } from "../../types/index";

export const dynamic = "force-dynamic";

const flightsDB: Flight[] = [
  {
    id: 1,
    airline: "ایران ایر",
    flightNumber: "IR-101",
    origin: "تهران",
    destination: "استانبول",
    departureTime: "08:30",
    arrivalTime: "11:45",
    date: "1405/04/10",
    price: 8500000,
    capacity: 180,
    type: "foreign",
  },
  {
    id: 2,
    airline: "ماهان",
    flightNumber: "W5-061",
    origin: "تهران",
    destination: "دبی",
    departureTime: "14:00",
    arrivalTime: "16:30",
    date: "1405/04/10",
    price: 12000000,
    capacity: 150,
    type: "foreign",
  },
  {
    id: 3,
    airline: "ترکیش",
    flightNumber: "TK-872",
    origin: "تهران",
    destination: "استانبول",
    departureTime: "22:15",
    arrivalTime: "00:30",
    date: "1405/04/10",
    price: 9200000,
    capacity: 200,
    type: "foreign",
  },
  {
    id: 4,
    airline: "آسمان",
    flightNumber: "EP-320",
    origin: "تهران",
    destination: "مشهد",
    departureTime: "06:00",
    arrivalTime: "07:15",
    date: "1405/04/10",
    price: 2800000,
    capacity: 120,
    type: "domestic",
  },
  {
    id: 5,
    airline: "کیش ایر",
    flightNumber: "Y9-530",
    origin: "تهران",
    destination: "کیش",
    departureTime: "10:30",
    arrivalTime: "12:30",
    date: "1405/04/10",
    price: 3500000,
    capacity: 140,
    type: "domestic",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let results: Flight[] = [...flightsDB];

    if (type) {
      results = results.filter((f) => f.type === type);
    }
    if (origin) {
      results = results.filter((f) => f.origin.includes(origin));
    }
    if (destination) {
      results = results.filter((f) => f.destination.includes(destination));
    }
    if (minPrice) {
      results = results.filter((f) => f.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((f) => f.price <= Number(maxPrice));
    }

    return NextResponse.json<Flight[]>(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت لیست پروازها" },
      { status: 500 },
    );
  }
}
