import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { ComponentIntent, ComponentSize } from "../theme";
import { ChevronDown } from "lucide-react";

// TODO: TASK-019 - Replace conditional className logic with clsx utility for better readability

// Size classes for consistent select sizing with proper touch targets
const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-2.5 py-2 text-xs min-h-[36px]", // Slightly larger for touch
  sm: "px-3 py-2.5 text-sm min-h-[44px]", // Meeting minimum touch target
  md: "px-3 py-3 text-base min-h-[44px]", // Meeting minimum touch target
  lg: "px-4 py-4 text-lg min-h-[48px]", // Larger touch target
  xl: "px-5 py-5 text-xl min-h-[52px]", // Largest touch target
} as const;

type Option = { label: string; value: string | number };

// Sentinel value for clear option to avoid conflicts with empty string values
const CLEAR_OPTION_VALUE = "__CLEAR_OPTION__" as const;

export interface SelectProps {
  label?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  intent?: ComponentIntent;
  variant?: "outline" | "filled";
  size?: ComponentSize;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  allowClear?: boolean;
  clearLabel?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  intent = "neutral",
  variant = "outline",
  size = "md",
  placeholder = "Select",
  disabled = false,
  helperText,
  className,
  allowClear = true,
  clearLabel = "None",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option | null) => {
    if (option && option.value !== CLEAR_OPTION_VALUE) {
      onChange?.(option.value);
    } else {
      onChange?.("");
    }
    setIsOpen(false);
  };

  const allOptions = allowClear
    ? [{ label: clearLabel, value: CLEAR_OPTION_VALUE }, ...options]
    : options;

  return (
    <div
      className={clsx("relative grid gap-1 text-sm", className)}
      ref={containerRef}
    >
      {label && <span className="text-muted">{label}</span>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={clsx(
          "rounded-lg flex items-center justify-between transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-inset",
          "text-text border",
          SIZE_CLASSES[size],
          // Variant styles
          variant === "filled"
            ? "bg-raised border-border"
            : "bg-card shadow-[inset_2px_2px_4px_var(--shadow-color),inset_-1px_-1px_2px_var(--shadow-highlight)] border-border",
          // Intent styles
          intent === "primary" &&
            "bg-intent-primary-bg border-intent-primary focus:ring-intent-primary",
          intent === "success" &&
            "bg-intent-success-bg border-intent-success focus:ring-intent-success",
          intent === "warning" &&
            "bg-intent-warning-bg border-intent-warning focus:ring-intent-warning",
          intent === "error" &&
            "bg-intent-error-bg border-intent-error focus:ring-intent-error",
          intent === "info" &&
            "bg-intent-info-bg border-intent-info focus:ring-intent-info",
          // Disabled styles
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:scale-[1.01]"
        )}
      >
        <span className={clsx(selectedOption ? "text-text" : "text-muted")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "w-4 h-4 transition-transform duration-200 text-muted",
            {
              "rotate-180": isOpen,
            }
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={clsx(
            "absolute top-full left-0 right-0 z-50 mt-1 rounded-lg shadow-lg border max-h-60 overflow-auto",
            "bg-card border-border"
          )}
        >
          {allOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() =>
                handleSelect(
                  option.value === CLEAR_OPTION_VALUE ? null : option
                )
              }
              className={clsx(
                "w-full text-left px-3 py-2 text-sm transition-colors duration-150",
                "first:rounded-t-lg last:rounded-b-lg",
                "text-text",
                "hover:bg-raised",
                {
                  "font-medium bg-raised": option.value === value,
                  "italic text-opacity-70": option.value === CLEAR_OPTION_VALUE,
                }
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {helperText && (
        <span
          className={clsx(
            "text-xs",
            intent === "primary" && "text-intent-primary-text",
            intent === "success" && "text-intent-success-text",
            intent === "warning" && "text-intent-warning-text",
            intent === "error" && "text-intent-error-text",
            intent === "info" && "text-intent-info-text",
            intent === "neutral" && "text-muted"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
