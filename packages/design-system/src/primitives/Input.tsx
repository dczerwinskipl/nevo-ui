import React, { useState } from "react";
import { clsx } from "clsx";
import { ComponentIntent, ComponentSize } from "../theme";

// TODO: TASK-019 - Replace string interpolation with clsx utility for better className merging

// Size classes for consistent input sizing with proper touch targets
const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-2.5 py-2 text-xs min-h-[36px]", // Slightly larger for touch
  sm: "px-3 py-2.5 text-sm min-h-[44px]", // Meeting minimum touch target
  md: "px-3 py-3 text-base min-h-[44px]", // Meeting minimum touch target
  lg: "px-4 py-4 text-lg min-h-[48px]", // Larger touch target
  xl: "px-5 py-5 text-xl min-h-[52px]", // Largest touch target
} as const;

// Input styling constants to disable browser defaults
const INPUT_RESET_CLASSES =
  "flex-1 bg-transparent outline-none placeholder:opacity-60 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const getInputResetStyles = (type?: string): React.CSSProperties => ({
  // Hide number input spinners for all browsers
  WebkitAppearance: type === "number" ? "none" : undefined,
  MozAppearance: type === "number" ? "textfield" : undefined,
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  left?: React.ReactNode;
  intent?: ComponentIntent;
  variant?: "outline" | "filled";
  size?: ComponentSize;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  left,
  intent = "neutral",
  variant = "outline",
  size = "md",
  helperText,
  className = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className={clsx("grid gap-1 text-sm", className)}>
      {label && <span className="text-muted">{label}</span>}
      <div
        className={clsx(
          "flex items-center gap-2 rounded-lg transition-all duration-200 group border",
          "text-text",
          SIZE_CLASSES[size],
          // Variant styles
          variant === "filled"
            ? "bg-raised border-border"
            : "bg-card shadow-[inset_2px_2px_4px_var(--shadow-color),inset_-1px_-1px_2px_var(--shadow-highlight)] border-border",
          // Intent styles
          intent === "primary" && "bg-intent-primary-bg border-intent-primary",
          intent === "success" && "bg-intent-success-bg border-intent-success",
          intent === "warning" && "bg-intent-warning-bg border-intent-warning",
          intent === "error" && "bg-intent-error-bg border-intent-error",
          intent === "info" && "bg-intent-info-bg border-intent-info",
          // Focus state
          isFocused &&
            "shadow-[inset_2px_2px_4px_var(--color-intent-primary-bg),inset_-1px_-1px_2px_var(--shadow-highlight)]"
        )}
      >
        {left}
        <input
          {...rest}
          className={clsx(
            INPUT_RESET_CLASSES,
            "focus:border-opacity-100 text-text"
          )}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          style={getInputResetStyles(rest.type)}
        />
      </div>
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
    </label>
  );
};
