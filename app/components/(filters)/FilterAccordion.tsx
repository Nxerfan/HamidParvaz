"use client";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface FilterAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasActive?: boolean;
  activeCount?: number;
  description?: string;
  selectedSummary?: string;
  children: ReactNode;
}

export default function FilterAccordion({
  title,
  isOpen,
  onToggle,
  hasActive,
  activeCount,
  description,
  selectedSummary,
  children,
}: FilterAccordionProps) {
  return (
    <div className={`filterDropdown ${hasActive ? "has-active" : ""}`}>
      <div
        className={`dropdownTrigger ${isOpen ? "open" : ""}`}
        onClick={onToggle}
      >
        <span>
          {title}
          {activeCount !== undefined && activeCount > 0 && (
            <span className="filterCount">({activeCount})</span>
          )}
        </span>
        <div className={`triggerArrow ${isOpen ? "open" : ""}`}>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>

      {!isOpen && hasActive && selectedSummary && (
        <div className="filterSelectedSummary">
          <span>{selectedSummary}</span>
        </div>
      )}

      {isOpen && (
        <div className="dropdownPanel open">
          {description && (
            <div className="filterDescription">
              <p>{description}</p>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
