"use client";

import { useState, useRef } from "react";
import { useCalendar, type UseCalendarReturn } from "../useCalendar";
import {
  useGuestCounter,
  type UseGuestCounterReturn,
} from "./useGuestCounter";
import {
  useDestinationDropdown,
  type Destination,
  type UseDestinationDropdownReturn,
} from "./useDestinationDropdown";

export type { Destination };

export interface FormErrors {
  [key: string]: boolean | undefined;
}

export interface ShakeFields {
  [key: string]: boolean | undefined;
}

export interface UseSearchLogicConfig {
  /** Destinations grouped by type (e.g., { domestic: [...], foreign: [...] }) */
  destinations: Record<string, Destination[]>;
  /** Month names in Persian (12 months) */
  monthNames: string[];
  /** Week day abbreviations (7 days) */
  weekDays: string[];
  /** Calendar mode: 'single' for tour search, 'range' for hotel/flight. Default: 'range' */
  calendarMode?: "single" | "range";
  /** Enable trip type radio (domestic/foreign). Default: true */
  hasTripType?: boolean;
  /** Enable trip direction toggle (one-way/round-trip). Default: false */
  hasTripDirection?: boolean;
  /** Enable origin field. Default: false */
  hasOrigin?: boolean;
  /** Guest counter complex mode (cascading reductions). Default: true */
  complexGuestMode?: boolean;
  /** Initial trip type value. Default: 'domestic' */
  initialTripType?: string;
  /** Callback when guest counts change (e.g., to reset room distribution) */
  onGuestCountChange?: () => void;
}

export interface UseSearchLogicReturn {
  // Trip type
  tripType: string;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
  handleTripTypeChange: (value: string) => void;

  // Trip direction
  tripDirection: string;
  setTripDirection: React.Dispatch<React.SetStateAction<string>>;
  handleDirectionChange: (value: string) => void;

  // Calendar (full useCalendar return)
  calendar: UseCalendarReturn;

  // Guest counter (full useGuestCounter return)
  guest: UseGuestCounterReturn;

  // Destination dropdown
  destination: UseDestinationDropdownReturn;

  // Origin dropdown (null if hasOrigin is false)
  origin: UseDestinationDropdownReturn | null;

  // Validation
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  shakeFields: ShakeFields;
  setShakeFields: React.Dispatch<React.SetStateAction<ShakeFields>>;
  triggerErrorShake: (field: string) => void;

  // Calendar rendering helpers
  renderMonthsGrid: () => React.ReactNode[];
  renderYearsGrid: () => React.ReactNode[];
  startDateInputValue: string;
  endDateInputValue: string;
}

/**
 * Main orchestrator hook that composes useCalendar, useGuestCounter,
 * and useDestinationDropdown with trip type management, validation helpers,
 * and calendar grid rendering. Each form component calls this hook with
 * its specific configuration and uses the returned state/handlers in JSX.
 */
export function useSearchLogic(
  config: UseSearchLogicConfig,
): UseSearchLogicReturn {
  const {
    destinations,
    monthNames,
    calendarMode = "range",
    hasTripDirection = false,
    hasOrigin = false,
    complexGuestMode = true,
    initialTripType = "domestic",
    onGuestCountChange,
  } = config;

  // Trip type
  const [tripType, setTripType] = useState(initialTripType);

  // Trip direction
  const [tripDirection, setTripDirection] = useState("roundTrip");

  // Calendar
  const calendar = useCalendar({ mode: calendarMode });

  // Guest counter
  const guest = useGuestCounter({
    complexMode: complexGuestMode,
    onCountChange: onGuestCountChange,
  });

  // Base destinations (all or filtered by trip type)
  const baseDestinations = tripType
    ? destinations[tripType] ?? []
    : Object.values(destinations).flat();

  // Refs to break circular dependency between origin ↔ destination filtering.
  // Each dropdown needs the other's input to exclude matching cities.
  // We store the current inputs in refs so the filtering computation
  // can read the other dropdown's value without a render-time dependency.
  const destInputRef = useRef("");
  const originInputRef = useRef("");

  // Origin dropdown (always create the hook call to preserve hook order)
  // Excludes the current destination input value from its list
  const originDropdown = useDestinationDropdown({
    allDestinations: baseDestinations.filter(
      (d) => !destInputRef.current || d.name !== destInputRef.current,
    ),
  });

  // Destination dropdown (always create the hook call to preserve hook order)
  // Excludes the current origin input value from its list
  const destination = useDestinationDropdown({
    allDestinations: baseDestinations.filter(
      (d) => !originInputRef.current || d.name !== originInputRef.current,
    ),
  });

  // Sync refs with current input values so filtering is always up to date.
  // This runs on every render after both hooks have been called.
  destInputRef.current = destination.input;
  originInputRef.current = originDropdown.input;

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakeFields, setShakeFields] = useState<ShakeFields>({});

  // Trip type change handler
  const handleTripTypeChange = (value: string) => {
    setTripType(value);
    destination.setInput("");
    destination.setShowDropdown(false);
    if (hasOrigin && originDropdown) {
      originDropdown.setInput("");
      originDropdown.setShowDropdown(false);
    }
    if (hasTripDirection) {
      setTripDirection("roundTrip");
    }
    setErrors({});
    setShakeFields({});
  };

  // Trip direction change handler
  const handleDirectionChange = (value: string) => {
    setTripDirection(value);
    if (value === "oneWay") {
      calendar.setSelectedEndDate(null);
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.tripDirection;
      if (value === "oneWay") {
        delete newErrors.endDate;
      }
      return newErrors;
    });
    setShakeFields((prev) => {
      const newShake = { ...prev };
      delete newShake.tripDirection;
      return newShake;
    });
  };

  // Error shake trigger
  const triggerErrorShake = (field: string) => {
    setShakeFields((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShakeFields((prev) => {
        const newShake = { ...prev };
        delete newShake[field];
        return newShake;
      });
    }, 500);
  };

  // Calendar grid: months
  const renderMonthsGrid = () => {
    return monthNames.map((name, index) => {
      const month = index + 1;
      const isSelected = month === calendar.currentJm;
      return (
        <div
          key={month}
          className={`monthItem${isSelected ? " selected" : ""}`}
          onClick={() => {
            calendar.setCurrentJm(month);
            calendar.setCurrentView("days");
          }}
        >
          {name}
        </div>
      );
    });
  };

  // Calendar grid: years
  const renderYearsGrid = () => {
    const startYear = 1300;
    const endYear = calendar.jToday.jy;
    const years = [];
    for (let y = endYear; y >= startYear; y--) {
      years.push(
        <div
          key={y}
          className={`yearItem${y === calendar.currentJy ? " selected" : ""}`}
          onClick={() => {
            calendar.setCurrentJy(y);
            calendar.setCurrentView("months");
          }}
        >
          {y}
        </div>,
      );
    }
    return years;
  };

  // Date input values
  const startDateInputValue = calendar.selectedStartDate
    ? calendar.jDateToString(
        calendar.selectedStartDate.jy,
        calendar.selectedStartDate.jm,
        calendar.selectedStartDate.jd,
      )
    : "";
  const endDateInputValue = calendar.selectedEndDate
    ? calendar.jDateToString(
        calendar.selectedEndDate.jy,
        calendar.selectedEndDate.jm,
        calendar.selectedEndDate.jd,
      )
    : "";

  // Expose origin only if hasOrigin is true
  const origin = hasOrigin ? originDropdown : null;

  return {
    tripType,
    setTripType,
    handleTripTypeChange,

    tripDirection,
    setTripDirection,
    handleDirectionChange,

    calendar,
    guest,

    destination,
    origin,

    errors,
    setErrors,
    shakeFields,
    setShakeFields,
    triggerErrorShake,

    renderMonthsGrid,
    renderYearsGrid,
    startDateInputValue,
    endDateInputValue,
  };
}
