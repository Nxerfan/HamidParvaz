import type { Passenger } from "../types";

export function loadPassengers(): Passenger[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("passengers");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePassengers(passengers: Passenger[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("passengers", JSON.stringify(passengers));
  } catch {
    // localStorage might be full
  }
}

export function generatePassengerId(): string {
  return `pax_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
