import React from "react";
import { Input } from "../primitives/Input";

interface NumberFilterProps {
  value: number | undefined;
  onChange: (value?: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  isError?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
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
  label,
  error,
}) => {
  return (
    <Input
      {...(label && { label })}
      type="number"
      size={size}
      value={value !== undefined ? String(value) : ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value === "" ? undefined : Number(e.target.value);
        onChange(v);
      }}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={isError}
      intent={isError ? "error" : "neutral"}
      {...(error && { helperText: error })}
      min={min}
      max={max}
    />
  );
};

export default NumberFilter;
