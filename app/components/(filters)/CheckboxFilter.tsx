"use client";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import FilterCheckboxItem from "./FilterCheckboxItem";

interface CheckboxOption {
  value: string;
  label: string;
  icon?: IconDefinition;
}

interface CheckboxFilterProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  showCount?: boolean;
}

export default function CheckboxFilter({
  options,
  selectedValues,
  onChange,
  showCount,
}: CheckboxFilterProps) {
  return (
    <div className="checkboxGroup">
      {showCount && (
        <div className="checkboxInfo">
          <p>{options.length} گزینه موجود</p>
        </div>
      )}
      {options.map((opt) => (
        <FilterCheckboxItem
          key={opt.value}
          value={opt.value}
          label={opt.label}
          checked={selectedValues.includes(opt.value)}
          onChange={onChange}
          icon={opt.icon}
        />
      ))}
    </div>
  );
}
