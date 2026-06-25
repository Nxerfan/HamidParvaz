"use client";

import { useState } from "react";
import Link from "next/link";
import "./global.css";

const PAGE_DATA = {
  airports: [
    { value: "", label: "همه فرودگاه‌ها" },
    { value: "فرودگاه امام", label: "فرودگاه امام" },
    { value: "فرودگاه مهرآباد", label: "فرودگاه مهرآباد" },
    { value: "فرودگاه مشهد", label: "فرودگاه مشهد" },
    { value: "فرودگاه بندرعباس", label: "فرودگاه بندرعباس" },
  ],
  airportTypes: [
    { value: "", label: "همه" },
    { value: "internal", label: "داخلی" },
    { value: "foreign", label: "خارجی" },
  ],
  airportNames: [
    { name: "فرودگاه مهرآباد", type: "internal" },
    { name: "فرودگاه مشهد", type: "internal" },
    { name: "فرودگاه شیراز", type: "internal" },
    { name: "فرودگاه تبریز", type: "internal" },
    { name: "فرودگاه اصفهان", type: "internal" },
    { name: "فرودگاه زاهدان", type: "internal" },
    { name: "فرودگاه دبی", type: "foreign" },
    { name: "فرودگاه استانبول", type: "foreign" },
    { name: "فرودگاه لندن", type: "foreign" },
  ],
};

export default function FlightAirports() {
  const [selectedAirport, setSelectedAirport] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredAirports = PAGE_DATA.airportNames.filter((item) => {
    const matchAirport =
      selectedAirport === "" || item.name === selectedAirport;
    const matchType = selectedType === "" || item.type === selectedType;
    return matchAirport && matchType;
  });

  return (
    <>
      <div className="List3">
        <div className="Form">
          <div className="BottomHotel">
            <div className="AirportChooser">
              <select
                name="Airport"
                value={selectedAirport}
                onChange={(e) => setSelectedAirport(e.target.value)}
              >
                {PAGE_DATA.airports.map((airport) => (
                  <option key={airport.value} value={airport.value}>
                    {airport.label}
                  </option>
                ))}
              </select>
              <select
                name="AirportType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {PAGE_DATA.airportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="FlightDeateils">
        <div className="FlightAirport">
          {filteredAirports.map((item, idx) => (
            <Link
              href={`/flight/flightse?airport=${encodeURIComponent(item.name)}`}
              key={idx}
            >
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
        <div className="Stats">
          <p></p>
        </div>
      </div>
    </>
  );
}
