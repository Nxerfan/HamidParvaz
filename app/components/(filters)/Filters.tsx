"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";


interface FilterState {
  priceRange: { min: number; max: number };
  sortBy: string;
  notifyOnPriceChange: boolean;
  selectedOptions: {
    [key: string]: string[];
  };
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  updateSelectedOptions: (key: string, values: string[]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 1000000 },
    sortBy: "",
    notifyOnPriceChange: false,
    selectedOptions: {},
  });

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const updateSelectedOptions = (key: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      selectedOptions: {
        ...prev.selectedOptions,
        [key]: values,
      },
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 1000000 },
      sortBy: "",
      notifyOnPriceChange: false,
      selectedOptions: {},
    });
  };

  return (
    <FilterContext.Provider
      value={{ filters, updateFilters, updateSelectedOptions, resetFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}

function PriceRangeFilter() {
  const { filters, updateFilters } = useFilters();
  const [localMin, setLocalMin] = useState(filters.priceRange.min);
  const [localMax, setLocalMax] = useState(filters.priceRange.max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= localMax) {
      setLocalMin(value);
      updateFilters({ priceRange: { min: value, max: localMax } });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= localMin) {
      setLocalMax(value);
      updateFilters({ priceRange: { min: localMin, max: value } });
    }
  };

  const formatNumber = (num: number) => num.toLocaleString("fa-IR");

  const progressLeft = (localMin / 1000000) * 100;
  const progressRight = 100 - (localMax / 1000000) * 100;

  return (
    <div className="priceSliderBox">
      <div className="priceLabels">
        <div className="labelGroup">
          <span>از</span>
          <span className="displayMin">{formatNumber(localMin)}</span>
          <span>تومان</span>
        </div>
        <span className="labelSeparator">-</span>
        <div className="labelGroup">
          <span>تا</span>
          <span className="displayMax">{formatNumber(localMax)}</span>
          <span>تومان</span>
        </div>
      </div>
      <div className="rangeSliderContainer">
        <div className="sliderTrack"></div>
        <div
          className="sliderProgress"
          style={{
            left: `${progressLeft}%`,
            right: `${progressRight}%`,
          }}
        ></div>
        <div className="rangeInputs">
          <input
            type="range"
            className="rangeMin"
            min="0"
            max="1000000"
            step="10000"
            value={localMin}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="rangeMax"
            min="0"
            max="1000000"
            step="10000"
            value={localMax}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
}

interface CheckboxFilterProps {
  filterKey: string;
  options: { value: string; label: string }[];
}

function CheckboxFilter({ filterKey, options }: CheckboxFilterProps) {
  const { filters, updateSelectedOptions } = useFilters();
  const selectedValues = filters.selectedOptions[filterKey] || [];

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      updateSelectedOptions(
        filterKey,
        selectedValues.filter((v) => v !== value)
      );
    } else {
      updateSelectedOptions(filterKey, [...selectedValues, value]);
    }
  };

  return (
    <div className="checkboxGroup">
      {options.map((option) => (
        <label key={option.value} className="checkboxItem">
          <input
            type="checkbox"
            name={filterKey}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleToggle(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

interface FilterAccordionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function FilterAccordion({ id, title, children }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filterDropdown">
      <div
        className="dropdownTrigger"
        onClick={() => {
          console.log('clicked', id);
          setIsOpen(prev => !prev);
        }}
      >
        <span>{title}</span>
        <i className="fa-solid fa-angle-down"></i>
      </div>

      <div className={`dropdownPanel ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

interface FiltersProps {
  title: string;
  resultCount: { shown: number; total: number };
  sortOptions: { value: string; label: string }[];
  filterSections: {
    id: string;
    title: string;
    type: "checkbox" | "price" | "custom";
    options?: { value: string; label: string }[];
    customContent?: ReactNode;
  }[];
  showNotification?: boolean;
}

export default function FiltersSidebar({
  title,
  resultCount,
  sortOptions,
  filterSections,
  showNotification = true,
}: FiltersProps) {
  const { filters, updateFilters } = useFilters();

  return (
    <div className="Right">
      <div className="Title">
        <span>{title}</span>
      </div>

      {showNotification && (
        <div className="NotifMe">
          <div className="Bell">
            <i className="fa-solid fa-bell"></i>
            <span>ارزان شد خبرم کن</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={filters.notifyOnPriceChange}
              onChange={(e) =>
                updateFilters({ notifyOnPriceChange: e.target.checked })
              }
            />
            <span className="slider"></span>
          </label>
        </div>
      )}

      <div className="Sort">
        <span>مرتب‌سازی بر اساس</span>
        <div className="Choosen">
          {sortOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="Radio"
                checked={filters.sortBy === option.value}
                onChange={() => updateFilters({ sortBy: option.value })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="sidebarFilters">
        <div className="filterHeader">
          <span>فیلترها</span>
        </div>

        <div className="filterContentArea">
          <span className="resultsCount">
            نمایش {resultCount.shown} از {resultCount.total} نتیجه
          </span>

          <FilterAccordion id="filter" title="قیمت">
            <PriceRangeFilter />
          </FilterAccordion>

          {filterSections.map((section) => (
            <FilterAccordion
              key={section.id}
              id={section.id}
              title={section.title}
            >
              {section.type === "checkbox" && section.options && (
                <CheckboxFilter
                  filterKey={section.id}
                  options={section.options}
                />
              )}
              {section.type === "custom" && section.customContent}
            </FilterAccordion>
          ))}
        </div>
      </div>
    </div>
  );
}
export { CheckboxFilter };
