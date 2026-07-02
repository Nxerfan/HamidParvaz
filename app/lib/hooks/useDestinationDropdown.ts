"use client";

import { useState, useRef, useEffect } from "react";

export interface Destination {
  id: number;
  name: string;
  type: string;
}

export interface UseDestinationDropdownConfig {
  /** All available destinations to show */
  allDestinations: Destination[];
  /** Value to filter out from the list (e.g., the other input's value) */
  filterOutValue?: string;
  /** Max recent searches to keep. Default: 5 */
  maxRecentSearches?: number;
}

export interface UseDestinationDropdownReturn {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  recentSearches: Destination[];
  setRecentSearches: React.Dispatch<React.SetStateAction<Destination[]>>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  filteredItems: Destination[];
  filteredRecent: Destination[];
  handleSelect: (dest: Destination) => void;
  handleInputFocus: () => void;
  clearInput: () => void;
}

/**
 * Encapsulates a single destination/origin search dropdown with:
 * - Text input with filtering
 * - Recent searches (persisted in state, max 5)
 * - Click-outside-to-close behavior
 * - Optional exclusion of another input's value (filterOutValue)
 */
export function useDestinationDropdown(
  config: UseDestinationDropdownConfig,
): UseDestinationDropdownReturn {
  const { allDestinations, filterOutValue, maxRecentSearches = 5 } = config;

  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Destination[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = allDestinations.filter((item) => {
    if (input.trim() && !item.name.includes(input.trim())) return false;
    if (filterOutValue && item.name === filterOutValue) return false;
    return true;
  });

  const filteredRecent = recentSearches.filter((item) => {
    if (input.trim() && !item.name.includes(input.trim())) return false;
    if (filterOutValue && item.name === filterOutValue) return false;
    return true;
  });

  const handleSelect = (dest: Destination) => {
    setInput(dest.name);
    setRecentSearches((prev) => {
      const exists = prev.find((item) => item.id === dest.id);
      if (exists) {
        return [exists, ...prev.filter((item) => item.id !== dest.id)].slice(
          0,
          maxRecentSearches,
        );
      }
      return [dest, ...prev].slice(0, maxRecentSearches);
    });
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const clearInput = () => {
    setInput("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target !== inputRef.current
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    input,
    setInput,
    showDropdown,
    setShowDropdown,
    recentSearches,
    setRecentSearches,
    dropdownRef,
    inputRef,
    filteredItems,
    filteredRecent,
    handleSelect,
    handleInputFocus,
    clearInput,
  };
}
