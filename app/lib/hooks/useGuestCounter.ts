"use client";

import { useState } from "react";

export interface UseGuestCounterConfig {
  /** Use complex mode with cascading reductions when adult count decreases. Default: true */
  complexMode?: boolean;
  /** Callback when any guest count changes */
  onCountChange?: () => void;
}

export interface UseGuestCounterReturn {
  adultCount: number;
  childCount: number;
  infantCount: number;
  showGuests: boolean;
  setShowGuests: React.Dispatch<React.SetStateAction<boolean>>;
  maxChildrenInfants: number;
  totalChildrenInfants: number;
  changeAdult: (delta: number) => void;
  incrementChild: () => void;
  decrementChild: () => void;
  incrementInfant: () => void;
  decrementInfant: () => void;
  setAdultCount: React.Dispatch<React.SetStateAction<number>>;
  setChildCount: React.Dispatch<React.SetStateAction<number>>;
  setInfantCount: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Encapsulates guest counting logic (adult, child, infant) with two modes:
 * - complexMode (default): When adult count decreases, child/infant counts
 *   are automatically reduced to stay within the 3:1 ratio limit.
 * - simpleMode: Adult count is changed independently without cascading effects.
 */
export function useGuestCounter(
  config: UseGuestCounterConfig = {},
): UseGuestCounterReturn {
  const { complexMode = true, onCountChange } = config;

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  const maxChildrenInfants = 3 * adultCount;
  const totalChildrenInfants = childCount + infantCount;

  const changeAdult = (delta: number) => {
    if (complexMode) {
      setAdultCount((prev) => {
        const newAdult = Math.max(1, prev + delta);
        if (newAdult < prev) {
          const newMax = 3 * newAdult;
          if (totalChildrenInfants > newMax) {
            const excess = totalChildrenInfants - newMax;
            let newInfant = infantCount;
            let newChild = childCount;
            if (newInfant > 0) {
              const reduceInfant = Math.min(newInfant, excess);
              newInfant -= reduceInfant;
              const remainingExcess = excess - reduceInfant;
              if (remainingExcess > 0) newChild -= remainingExcess;
            } else {
              newChild -= excess;
            }
            setInfantCount(newInfant);
            setChildCount(newChild);
          }
        }
        return newAdult;
      });
    } else {
      setAdultCount((prev) => Math.max(1, prev + delta));
    }
    onCountChange?.();
  };

  const incrementChild = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setChildCount((prev) => prev + 1);
      onCountChange?.();
    }
  };

  const decrementChild = () => {
    setChildCount((prev) => Math.max(0, prev - 1));
    onCountChange?.();
  };

  const incrementInfant = () => {
    if (totalChildrenInfants < maxChildrenInfants) {
      setInfantCount((prev) => prev + 1);
      onCountChange?.();
    }
  };

  const decrementInfant = () => {
    setInfantCount((prev) => Math.max(0, prev - 1));
    onCountChange?.();
  };

  return {
    adultCount,
    childCount,
    infantCount,
    showGuests,
    setShowGuests,
    maxChildrenInfants,
    totalChildrenInfants,
    changeAdult,
    incrementChild,
    decrementChild,
    incrementInfant,
    decrementInfant,
    setAdultCount,
    setChildCount,
    setInfantCount,
  };
}
