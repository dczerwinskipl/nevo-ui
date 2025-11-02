import React from "react";
import { clsx } from "clsx";
import {
  useTheme,
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
  getIntentStyle,
  Tokens,
  concaveStyle,
} from "../theme/ThemeProvider";
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
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  intent = "neutral",
  variant = "outline",
  size = "md",
  placeholder = "Wybierz",
  disabled = false,
  helperText,
  className,
}) => {
  const { tokens } = useTheme();
  const intentColors = getIntentStyle(tokens, intent, "subtle");

  const selectedOption = options.find((opt) => opt.value === value);

  // Get base style based on variant
  const baseStyle =
    variant === "filled"
      ? { background: tokens.raised, border: `1px solid ${tokens.border}` }
      : concaveStyle(tokens);

  return (
    <label className={clsx("grid gap-1 text-sm", className)}>
      {label && <span style={{ color: tokens.muted }}>{label}</span>}
      <div
        className={clsx(
          "rounded-lg flex items-center justify-between transition-all duration-200",
          SIZE_CLASSES[size],
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:scale-[1.01]"
        )}
        style={{
          ...baseStyle,
          color: tokens.text,
          ...(intent !== "neutral" && {
            borderColor: intentColors.border,
            backgroundColor: intentColors.background,
          }),
        }}
      >
        <span style={{ color: selectedOption ? tokens.text : tokens.muted }}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className="w-4 h-4" style={{ color: tokens.muted }} />
      </div>
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
    </label>
  );
};
