import { NextRequest, NextResponse } from "next/server";
import type { Flight } from "../../../types/index";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "شناسه پرواز نامعتبر است" },
        { status: 400 },
      );
    }

    const flight = flightsDB.find((f) => f.id === numericId);

    if (!flight) {
      return NextResponse.json(
        { error: "پرواز مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json<Flight>(flight, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات پرواز" },
      { status: 500 },
    );
  }
}
