"use client";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  globalMin: number;
  globalMax: number;
  step: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  formatPrice?: (value: number) => string;
  currency?: string;
  fromLabel?: string;
  toLabel?: string;
}

function defaultFormatPrice(value: number): string {
  return Number(value).toLocaleString("fa-IR");
}

export default function PriceRangeFilter({
  min,
  max,
  globalMin,
  globalMax,
  step,
  onMinChange,
  onMaxChange,
  formatPrice = defaultFormatPrice,
  currency = "تومان",
  fromLabel = "از",
  toLabel = "تا",
}: PriceRangeFilterProps) {
  const minPercent =
    ((min - globalMin) / (globalMax - globalMin)) * 100;
  const maxPercent =
    ((max - globalMin) / (globalMax - globalMin)) * 100;

  return (
    <div className="priceSliderBox">
      <div className="priceLabels">
        <div className="labelGroup">
          <span>{fromLabel}</span>
          <span className="displayMin">{formatPrice(min)}</span>
          <span>{currency}</span>
        </div>
        <span className="labelSeparator">-</span>
        <div className="labelGroup">
          <span>{toLabel}</span>
          <span className="displayMax">{formatPrice(max)}</span>
          <span>{currency}</span>
        </div>
      </div>

      <div className="rangeSliderContainer">
        <div className="sliderTrack" />
        <div
          className="sliderProgress"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <div className="rangeInputs">
          <input
            type="range"
            className="rangeMin"
            min={globalMin}
            max={globalMax}
            step={step}
            value={min}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= max) onMinChange(val);
            }}
          />
          <input
            type="range"
            className="rangeMax"
            min={globalMin}
            max={globalMax}
            step={step}
            value={max}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= min) onMaxChange(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
