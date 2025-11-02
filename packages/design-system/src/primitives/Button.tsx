import React from "react";
import { clsx } from "clsx";
import {
  useTheme,
  getIntentStyle,
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
} from "../theme";

// TODO: TASK-020 - Move sizeClasses map outside component to prevent recreation on each render

// Extracted constants - no recreation on each render
// Ensure minimum 44px touch targets for mobile accessibility
const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-3 py-2 text-xs min-h-[36px]", // Slightly larger for touch
  sm: "px-4 py-2.5 text-sm min-h-[44px]", // Meeting minimum touch target
  md: "px-4 py-3 text-base min-h-[44px]", // Meeting minimum touch target
  lg: "px-6 py-4 text-lg min-h-[48px]", // Larger touch target
  xl: "px-8 py-5 text-xl min-h-[52px]", // Largest touch target
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  size?: ComponentSize;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  intent = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...rest
}) => {
  const { tokens } = useTheme();
  const style = getIntentStyle(tokens, intent, variant);

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        SIZE_CLASSES[size],
        className
      )}
      style={{
        background: style.background,
        color: style.color,
        border: style.border,
        boxShadow: variant === "solid" ? tokens.shadow.sm : "none",
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
