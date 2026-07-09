"use client";

import { useState } from "react";
import { useCalendar, type UseCalendarReturn } from "../useCalendar";
import { useGuestCounter, type UseGuestCounterReturn } from "./useGuestCounter";
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

  // Calendar – destructure immediately so property access doesn't trigger react-hooks/refs
  const {
    calendarRef,
    activeInput,
    setActiveInput,
    showCalendar,
    setShowCalendar,
    hoverDate,
    setHoverDate,
    currentJy,
    setCurrentJy,
    currentJm,
    setCurrentJm,
    currentView,
    setCurrentView,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    jToday,
    jDateToString,
    stringToJDate,
    getDateValue,
    isDateInRange,
    isDateInHoverRange,
    selectDate,
    openCalendar,
    closeCalendar,
    handleCalendarTitleClick,
    handlePrevMonth,
    handleNextMonth,
    renderCalendarDays,
  } = useCalendar({ mode: calendarMode });

  // Guest counter
  const guest = useGuestCounter({
    complexMode: complexGuestMode,
    onCountChange: onGuestCountChange,
  });

  // Base destinations (all or filtered by trip type)
  const baseDestinations = tripType
    ? (destinations[tripType] ?? [])
    : Object.values(destinations).flat();

  // Cross-filtering: each dropdown should exclude the other's current input.
  // originDropdown uses the previous render's destination.input (stored in state).
  // destination uses the current originDropdown.input (available at creation time).
  // This avoids refs/setState issues and the one-render delay is imperceptible.
  const [prevDestInput, setPrevDestInput] = useState("");

  const originDropdown = useDestinationDropdown({
    allDestinations: baseDestinations,
    filterOutValue: prevDestInput,
  });

  const destination = useDestinationDropdown({
    allDestinations: baseDestinations,
    filterOutValue: originDropdown.input,
  });

  // Store previous destination.input for the next render's origin filter.
  // Conditional state update during render — the pattern React recommends
  // for storing information from previous renders.
  if (destination.input !== prevDestInput) {
    setPrevDestInput(destination.input);
  }

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
      setSelectedEndDate(null);
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
      const isSelected = month === currentJm;
      return (
        <div
          key={month}
          className={`monthItem${isSelected ? " selected" : ""}`}
          onClick={() => {
            setCurrentJm(month);
            setCurrentView("days");
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
    const endYear = jToday.jy;
    const years = [];
    for (let y = endYear; y >= startYear; y--) {
      years.push(
        <div
          key={y}
          className={`yearItem${y === currentJy ? " selected" : ""}`}
          onClick={() => {
            setCurrentJy(y);
            setCurrentView("months");
          }}
        >
          {y}
        </div>,
      );
    }
    return years;
  };

  // Date input values
  const startDateInputValue = selectedStartDate
    ? jDateToString(
        selectedStartDate.jy,
        selectedStartDate.jm,
        selectedStartDate.jd,
      )
    : "";
  const endDateInputValue = selectedEndDate
    ? jDateToString(selectedEndDate.jy, selectedEndDate.jm, selectedEndDate.jd)
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

    calendar: {
      calendarRef,
      activeInput,
      setActiveInput,
      showCalendar,
      setShowCalendar,
      hoverDate,
      setHoverDate,
      currentJy,
      setCurrentJy,
      currentJm,
      setCurrentJm,
      currentView,
      setCurrentView,
      selectedStartDate,
      setSelectedStartDate,
      selectedEndDate,
      setSelectedEndDate,
      jToday,
      jDateToString,
      stringToJDate,
      getDateValue,
      isDateInRange,
      isDateInHoverRange,
      selectDate,
      openCalendar,
      closeCalendar,
      handleCalendarTitleClick,
      handlePrevMonth,
      handleNextMonth,
      renderCalendarDays,
    },
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
