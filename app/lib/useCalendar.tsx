"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  toJalaali,
  toGregorian,
  jMonthLength,
} from "./jalaali";
import type { JalaaliDate } from "./jalaali";

export type CalendarMode = "single" | "range";
export type ActiveInput = "start" | "end" | null;

export interface UseCalendarOptions {
  mode?: CalendarMode;
  initialStartDate?: JalaaliDate | null;
  initialEndDate?: JalaaliDate | null;
}

export interface UseCalendarReturn {
  selectedStartDate: JalaaliDate | null;
  selectedEndDate: JalaaliDate | null;
  showCalendar: boolean;
  activeInput: ActiveInput;
  hoverDate: JalaaliDate | null;
  currentJy: number;
  currentJm: number;
  currentView: "days" | "months" | "years";
  calendarRef: React.RefObject<HTMLDivElement | null>;
  jToday: JalaaliDate;
  jDateToString: (jy: number, jm: number, jd: number) => string;
  stringToJDate: (str: string | null) => JalaaliDate | null;
  getDateValue: (jy: number, jm: number, jd: number) => number;
  isDateInRange: (jy: number, jm: number, jd: number) => boolean;
  isDateInHoverRange: (jy: number, jm: number, jd: number) => boolean;
  selectDate: (jy: number, jm: number, jd: number) => void;
  openCalendar: (inputType: "start" | "end") => void;
  closeCalendar: () => void;
  handleCalendarTitleClick: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  setCurrentJy: React.Dispatch<React.SetStateAction<number>>;
  setCurrentJm: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView: React.Dispatch<React.SetStateAction<"days" | "months" | "years">>;
  setHoverDate: React.Dispatch<React.SetStateAction<JalaaliDate | null>>;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput>>;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<JalaaliDate | null>>;
  setSelectedEndDate: React.Dispatch<React.SetStateAction<JalaaliDate | null>>;
  renderCalendarDays: () => React.ReactNode[];
}

export function useCalendar(
  options: UseCalendarOptions = {},
): UseCalendarReturn {
  const { mode = "range", initialStartDate = null, initialEndDate = null } = options;

  const [selectedStartDate, setSelectedStartDate] = useState<JalaaliDate | null>(initialStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<JalaaliDate | null>(initialEndDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);
  const [hoverDate, setHoverDate] = useState<JalaaliDate | null>(null);
  const [currentJy, setCurrentJy] = useState(1403);
  const [currentJm, setCurrentJm] = useState(1);
  const [currentView, setCurrentView] = useState<"days" | "months" | "years">("days");
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const today = new Date();
  const jToday = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const jDateToString = useCallback(
    (jy: number, jm: number, jd: number): string => {
      return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
    },
    [],
  );

  const stringToJDate = useCallback(
    (str: string | null): JalaaliDate | null => {
      if (!str) return null;
      const parts = str.split("/");
      if (parts.length !== 3) return null;
      return {
        jy: parseInt(parts[0]!, 10),
        jm: parseInt(parts[1]!, 10),
        jd: parseInt(parts[2]!, 10),
      };
    },
    [],
  );

  const getDateValue = useCallback(
    (jy: number, jm: number, jd: number): number =>
      jy * 10000 + jm * 100 + jd,
    [],
  );

  const isDateInRange = useCallback(
    (jy: number, jm: number, jd: number): boolean => {
      if (!selectedStartDate || !selectedEndDate) return false;
      const val = getDateValue(jy, jm, jd);
      const startVal = getDateValue(
        selectedStartDate.jy,
        selectedStartDate.jm,
        selectedStartDate.jd,
      );
      const endVal = getDateValue(
        selectedEndDate.jy,
        selectedEndDate.jm,
        selectedEndDate.jd,
      );
      return val > startVal && val < endVal;
    },
    [selectedStartDate, selectedEndDate, getDateValue],
  );

  const isDateInHoverRange = useCallback(
    (jy: number, jm: number, jd: number): boolean => {
      if (!selectedStartDate || selectedEndDate || !hoverDate) return false;
      const val = getDateValue(jy, jm, jd);
      const startVal = getDateValue(
        selectedStartDate.jy,
        selectedStartDate.jm,
        selectedStartDate.jd,
      );
      const endVal = getDateValue(hoverDate.jy, hoverDate.jm, hoverDate.jd);
      return val > startVal && val < endVal;
    },
    [selectedStartDate, selectedEndDate, hoverDate, getDateValue],
  );

  const selectDate = useCallback(
    (jy: number, jm: number, jd: number): void => {
      if (mode === "single") {
        const dateObj: JalaaliDate = { jy, jm, jd };
        setSelectedStartDate(dateObj);
        setSelectedEndDate(null);
        setShowCalendar(false);
        setActiveInput(null);
        setHoverDate(null);
        return;
      }

      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate({ jy, jm, jd });
        setSelectedEndDate(null);
        setActiveInput("end");
        setHoverDate(null);
        setShowCalendar(true);
        setCurrentJy(jy);
        setCurrentJm(jm);
        setCurrentView("days");
      } else {
        const currentVal = getDateValue(jy, jm, jd);
        const startVal = getDateValue(
          selectedStartDate.jy,
          selectedStartDate.jm,
          selectedStartDate.jd,
        );
        if (currentVal < startVal) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate({ jy, jm, jd });
        } else {
          setSelectedEndDate({ jy, jm, jd });
        }
        setShowCalendar(false);
        setActiveInput(null);
        setHoverDate(null);
      }
    },
    [
      mode,
      selectedStartDate,
      selectedEndDate,
      getDateValue,
    ],
  );

  const openCalendar = useCallback(
    (inputType: "start" | "end"): void => {
      let targetDate: JalaaliDate;
      if (inputType === "start") {
        targetDate = selectedStartDate ?? jToday;
      } else {
        targetDate = selectedEndDate ?? selectedStartDate ?? jToday;
      }
      setActiveInput(inputType);
      setCurrentJy(targetDate.jy);
      setCurrentJm(targetDate.jm);
      setCurrentView("days");
      setShowCalendar(true);
      setHoverDate(null);
    },
    [selectedStartDate, selectedEndDate, jToday],
  );

  const closeCalendar = useCallback((): void => {
    setShowCalendar(false);
    setActiveInput(null);
    setHoverDate(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        (e.target as HTMLElement).id !== "startDateInput" &&
        (e.target as HTMLElement).id !== "endDateInput"
      ) {
        closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCalendar]);

  const renderCalendarDays = useCallback((): React.ReactNode[] => {
    const daysInMonth = jMonthLength(currentJy, currentJm);
    const gDate = toGregorian(currentJy, currentJm, 1);
    const dateObj = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    const startDayOfWeek = (dateObj.getDay() + 1) % 7;

    const cells: React.ReactNode[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendarDay empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        currentJy === jToday.jy &&
        currentJm === jToday.jm &&
        day === jToday.jd;

      const startStr =
        selectedStartDate &&
        selectedStartDate.jy === currentJy &&
        selectedStartDate.jm === currentJm &&
        selectedStartDate.jd === day;

      const endStr =
        selectedEndDate &&
        selectedEndDate.jy === currentJy &&
        selectedEndDate.jm === currentJm &&
        selectedEndDate.jd === day;

      const isSelected = !!(startStr || endStr);
      const inRange = isDateInRange(currentJy, currentJm, day);
      const inHoverRange = isDateInHoverRange(currentJy, currentJm, day);

      const dayClass = `calendarDay${isToday ? " today" : ""}${isSelected ? " selected" : ""}${inRange ? " in-range" : ""}${inHoverRange ? " hover-range" : ""}`;

      cells.push(
        <div
          key={day}
          className={dayClass}
          data-date={`${currentJy}-${currentJm}-${day}`}
          onClick={() => selectDate(currentJy, currentJm, day)}
          onMouseEnter={() => {
            if (selectedStartDate && !selectedEndDate) {
              setHoverDate({ jy: currentJy, jm: currentJm, jd: day });
            }
          }}
        >
          {day}
        </div>,
      );
    }

    return cells;
  }, [
    currentJy,
    currentJm,
    selectedStartDate,
    selectedEndDate,
    jToday,
    isDateInRange,
    isDateInHoverRange,
    selectDate,
  ]);

  const handleCalendarTitleClick = useCallback((): void => {
    if (currentView === "days") setCurrentView("years");
    else if (currentView === "years") setCurrentView("months");
    else setCurrentView("days");
  }, [currentView]);

  const handlePrevMonth = useCallback((): void => {
    setCurrentJm((prev) => {
      if (prev === 1) {
        setCurrentJy((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  }, []);

  const handleNextMonth = useCallback((): void => {
    setCurrentJm((prev) => {
      if (prev === 12) {
        setCurrentJy((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  }, []);

  return {
    selectedStartDate,
    selectedEndDate,
    showCalendar,
    activeInput,
    hoverDate,
    currentJy,
    currentJm,
    currentView,
    calendarRef,
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
    setCurrentJy,
    setCurrentJm,
    setCurrentView,
    setHoverDate,
    setShowCalendar,
    setActiveInput,
    setSelectedStartDate,
    setSelectedEndDate,
    renderCalendarDays,
  };
}
