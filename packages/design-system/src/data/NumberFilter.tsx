import React from "react";
import { Input } from "../primitives/Input";

interface NumberFilterProps {
  value: number | "";
  onChange: (value: number | "") => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  isError?: boolean;
  size?: "sm" | "md" | "lg";
}

export const NumberFilter: React.FC<NumberFilterProps> = ({
  value,
  onChange,
  placeholder,
  min,
  max,
  disabled,
  isError,
  size = "sm",
}) => {
  return (
    <Input
      type="number"
      size={size}
      value={value === "" ? "" : String(value)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value === "" ? "" : Number(e.target.value);
        if (v === "" || Number.isFinite(v)) onChange(v as number | "");
      }}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={isError}
      min={min}
      max={max}
    />
  );
};

export default NumberFilter;
