"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Passenger } from "../types";
import { loadPassengers, savePassengers, generatePassengerId } from "./passengerStorage";

interface PassengerContextType {
  passengers: Passenger[];
  addPassenger: (passenger: Omit<Passenger, "id">) => void;
  updatePassenger: (id: string, updates: Partial<Passenger>) => void;
  removePassenger: (id: string) => void;
  getPassengerById: (id: string) => Passenger | undefined;
}

const PassengerContext = createContext<PassengerContextType | undefined>(undefined);

export function PassengerProvider({ children }: { children: ReactNode }) {
  const [passengers, setPassengers] = useState<Passenger[]>(() => loadPassengers());

  useEffect(() => {
    savePassengers(passengers);
  }, [passengers]);

  const addPassenger = useCallback((passenger: Omit<Passenger, "id">) => {
    const newPassenger: Passenger = { id: generatePassengerId(), ...passenger };
    setPassengers((prev) => [...prev, newPassenger]);
  }, []);

  const updatePassenger = useCallback((id: string, updates: Partial<Passenger>) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const removePassenger = useCallback((id: string) => {
    setPassengers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getPassengerById = useCallback((id: string) => {
    return passengers.find((p) => p.id === id);
  }, [passengers]);

  return (
    <PassengerContext.Provider
      value={{ passengers, addPassenger, updatePassenger, removePassenger, getPassengerById }}
    >
      {children}
    </PassengerContext.Provider>
  );
}

export function usePassengersContext(): PassengerContextType {
  const context = useContext(PassengerContext);
  if (!context) {
    throw new Error("usePassengersContext must be used within a PassengerProvider");
  }
  return context;
}
