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
}

export function SelectFilter<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  isError,
  size = "sm",
}: SelectFilterProps<T>) {
  return (
    <Select
      options={options as any}
      value={value as any}
      onChange={(v) => onChange(v as T)}
      placeholder={placeholder ?? "Select"}
      disabled={disabled ?? false}
      size={size as any}
    />
  );
}

export default SelectFilter;
