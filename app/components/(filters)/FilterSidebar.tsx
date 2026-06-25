"use client";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faRotate,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

interface FilterSidebarProps {
  title?: string;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
  clearLabel?: string;
  resultCount?: ReactNode;
  children: ReactNode;
}

function toPersianNumber(num: number | string) {
  return Number(num).toLocaleString("fa-IR");
}

export default function FilterSidebar({
  title = "فیلترها",
  activeFiltersCount = 0,
  onClearFilters,
  clearLabel = "پاک کردن",
  resultCount,
  children,
}: FilterSidebarProps) {
  return (
    <div className="sidebarFilters">
      <div className="filterHeader">
        <div className="filterHeaderLeft">
          <div className="filterHeaderIcon">
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <span>{title}</span>
          {activeFiltersCount > 0 && (
            <span className="filterBadge">
              {toPersianNumber(activeFiltersCount)}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && onClearFilters && (
          <button className="clearFiltersBtn" onClick={onClearFilters}>
            <FontAwesomeIcon icon={faRotate} />
            {clearLabel}
          </button>
        )}
      </div>

      <div className="filterContentArea">
        {resultCount && (
          <span className="resultsCount">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>{resultCount}</span>
          </span>
        )}

        {children}
      </div>
    </div>
  );
}
