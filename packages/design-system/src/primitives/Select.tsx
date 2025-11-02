import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import {
  useTheme,
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
  getIntentStyle,
  Tokens,
  concaveStyle,
} from "../theme";
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
  const { tokens } = useTheme();
  const intentColors = getIntentStyle(tokens, intent, "subtle");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Get base style based on variant
  const baseStyle =
    variant === "filled"
      ? { background: tokens.raised, border: `1px solid ${tokens.border}` }
      : concaveStyle(tokens);

  const focusRingColor = intentColors?.border || "rgba(109,106,255,0.3)";

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
      {label && <span style={{ color: tokens.muted }}>{label}</span>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={clsx(
          "rounded-lg flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-inset",
          SIZE_CLASSES[size],
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:scale-[1.01]"
        )}
        style={
          {
            ...baseStyle,
            color: tokens.text,
            "--tw-ring-color": focusRingColor,
            ...(intent !== "neutral" && {
              borderColor: intentColors.border,
              backgroundColor: intentColors.background,
            }),
          } as React.CSSProperties & { "--tw-ring-color": string }
        }
      >
        <span style={{ color: selectedOption ? tokens.text : tokens.muted }}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={clsx("w-4 h-4 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
          style={{ color: tokens.muted }}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg shadow-lg border max-h-60 overflow-auto"
          style={{
            backgroundColor: tokens.card,
            borderColor: tokens.border,
          }}
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
                "w-full text-left px-3 py-2 text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg",
                {
                  "font-medium": option.value === value,
                  "italic text-opacity-70": option.value === CLEAR_OPTION_VALUE,
                }
              )}
              style={{
                color: tokens.text,
                backgroundColor:
                  option.value === value ? tokens.raised : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.raised;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  option.value === value ? tokens.raised : "transparent";
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {helperText && (
        <span
          className="text-xs"
          style={{
            color: intent !== "neutral" ? intentColors.color : tokens.muted,
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
