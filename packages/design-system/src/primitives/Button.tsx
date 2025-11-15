import React from "react";
import { clsx } from "clsx";
import {
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
  getIntentVariantClasses,
  getVariantBaseClasses,
  getSizeClasses,
} from "../theme";

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
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={clsx(
        // Base styles
        "rounded-lg font-medium transition-all duration-200",
        // Hover effect (scale)
        "hover:scale-105",
        // Disabled states
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        // Focus visible for accessibility
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        // Size classes from theme
        getSizeClasses(size),
        // Variant base classes from theme
        getVariantBaseClasses(variant),
        // Intent + variant combination classes from theme
        getIntentVariantClasses(intent, variant),
        // Custom className override
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
