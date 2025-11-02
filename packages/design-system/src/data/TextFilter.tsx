import React from "react";
import { Input } from "../primitives/Input";

interface TextFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  size?: "sm" | "md" | "lg";
}

export const TextFilter: React.FC<TextFilterProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  isError,
  size = "sm",
}) => {
  return (
    <Input
      size={size}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={isError}
    />
  );
};

export default TextFilter;
