"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FilterCheckboxItemProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon?: IconDefinition;
}

export default function FilterCheckboxItem({
  value,
  label,
  checked,
  onChange,
  icon,
}: FilterCheckboxItemProps) {
  return (
    <label className="checkboxItem" onClick={() => onChange(value)}>
      <div className={`customCheckbox ${checked ? "checked" : ""}`}>
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        style={{ display: "none" }}
      />
      {icon && (
        <span className="checkboxIcon">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span>{label}</span>
    </label>
  );
}
