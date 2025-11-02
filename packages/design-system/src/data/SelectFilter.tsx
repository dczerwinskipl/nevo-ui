import React from "react";
import { Select } from "../primitives/Select";

interface SelectFilterProps<T extends string | number> {
  value: T | "";
  onChange: (value: T | "") => void;
  options: Array<{ label: string; value: T }>;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
}

export function SelectFilter<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  isError,
  size = "sm",
  label,
  error,
}: SelectFilterProps<T>) {
  return (
    <Select
      {...(label && { label })}
      options={options}
      value={value}
      onChange={(v) => onChange(v as T)}
      placeholder={placeholder ?? "Select"}
      disabled={disabled ?? false}
      size={size}
      intent={isError ? "error" : "neutral"}
      {...(error && { helperText: error })}
    />
  );
}

export default SelectFilter;
