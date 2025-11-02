import React from "react";
import { clsx } from "clsx";
import {
  useTheme,
  getIntentStyle,
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
  Tokens,
  concaveStyle,
} from "../theme";

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
  const { tokens } = useTheme();

  // Get intent colors for validation states
  const intentColors = intent !== "neutral" ? tokens.intent[intent] : null;

  const baseStyle =
    variant === "filled"
      ? {
          background: tokens.raised,
          border: `1px solid ${tokens.border}`,
          boxShadow: "",
        }
      : concaveStyle(tokens);

  const focusRingColor = intentColors?.border || tokens.intent.primary.border;
  const borderColor = intentColors?.border || tokens.border;

  return (
    <label className={clsx("grid gap-1 text-sm", className)}>
      {label && <span style={{ color: tokens.muted }}>{label}</span>}
      <div
        className={clsx(
          "flex items-center gap-2 rounded-lg transition-all duration-200 group",
          SIZE_CLASSES[size]
        )}
        style={
          {
            ...baseStyle,
            borderColor: borderColor,
            color: tokens.text,
          } as React.CSSProperties
        }
      >
        {left}
        <input
          {...rest}
          className={clsx(INPUT_RESET_CLASSES, "focus:border-opacity-100")}
          style={{
            color: tokens.text,
            ...getInputResetStyles(rest.type),
            ...rest.style,
          }}
          onFocus={(e) => {
            // Change parent border color on focus
            const parent = e.target.parentElement;
            if (parent) {
              parent.style.borderColor = focusRingColor;
              parent.style.boxShadow = `inset 2px 2px 4px ${tokens.intent.primary.bg}, inset -1px -1px 2px ${tokens.shadow.highlight}`;
            }
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            // Restore original border color on blur
            const parent = e.target.parentElement;
            if (parent) {
              parent.style.borderColor = borderColor;
              parent.style.boxShadow = baseStyle.boxShadow || "";
            }
            rest.onBlur?.(e);
          }}
        />
      </div>
      {helperText && (
        <span
          className="text-xs"
          style={{
            color: intentColors?.text || tokens.muted,
          }}
        >
          {helperText}
        </span>
      )}
    </label>
  );
};
