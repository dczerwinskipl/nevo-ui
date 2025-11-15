import React from "react";
import { clsx } from "clsx";
import { ComponentIntent, getIntentTextCSSVar } from "../theme";

// Extracted constants - no recreation on each render
const SIZE_CLASSES = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const;

const WEIGHT_CLASSES = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export type TypographyType =
  | "page-title" // Main page heading (h1)
  | "section-title" // Section headings (h2)
  | "card-title" // Card/component titles (h3)
  | "subtitle" // Subtitles and subheadings (h4)
  | "body" // Main body text (p)
  | "label" // Form labels (label)
  | "caption" // Small descriptive text (span)
  | "button" // Button text (span)
  | "error" // Error messages (span)
  | "success"; // Success messages (span);

export interface TypographyProps {
  type?: TypographyType;
  intent?: ComponentIntent;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "div";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Override props for customization (use sparingly)
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

// Predefined type styles that ensure consistency
const typeStyles = {
  "page-title": {
    as: "h1" as const,
    size: "3xl" as const,
    weight: "bold" as const,
    intent: undefined,
  },
  "section-title": {
    as: "h2" as const,
    size: "xl" as const,
    weight: "semibold" as const,
    intent: undefined,
  },
  "card-title": {
    as: "h3" as const,
    size: "lg" as const,
    weight: "semibold" as const,
    intent: undefined,
  },
  subtitle: {
    as: "h4" as const,
    size: "md" as const,
    weight: "medium" as const,
    intent: "neutral" as ComponentIntent,
  },
  body: {
    as: "p" as const,
    size: "md" as const,
    weight: "normal" as const,
    intent: undefined,
  },
  label: {
    as: "label" as const,
    size: "sm" as const,
    weight: "medium" as const,
    intent: "neutral" as ComponentIntent,
  },
  caption: {
    as: "span" as const,
    size: "sm" as const,
    weight: "normal" as const,
    intent: "neutral" as ComponentIntent,
  },
  button: {
    as: "span" as const,
    size: "md" as const,
    weight: "medium" as const,
    intent: undefined,
  },
  error: {
    as: "span" as const,
    size: "sm" as const,
    weight: "normal" as const,
    intent: "error" as ComponentIntent,
  },
  success: {
    as: "span" as const,
    size: "sm" as const,
    weight: "normal" as const,
    intent: "success" as ComponentIntent,
  },
};

export const Typography: React.FC<TypographyProps> = ({
  type = "body",
  intent,
  as,
  align = "left",
  children,
  className = "",
  style,
  size,
  weight,
  ...rest
}) => {
  // Get predefined style for the type
  const typeStyle = typeStyles[type];

  // Use overrides if provided, otherwise use type defaults
  const As = as || typeStyle.as;
  const finalSize = size || typeStyle.size;
  const finalWeight = weight || typeStyle.weight;
  const finalIntent = intent || typeStyle.intent;

  return (
    <As
      {...rest}
      className={clsx(
        // Base typography styles
        "m-0", // Reset default margins
        "text-text", // Default text color using config-based class
        // Size and weight
        SIZE_CLASSES[finalSize],
        WEIGHT_CLASSES[finalWeight],
        ALIGN_CLASSES[align],
        // Custom className
        className
      )}
      style={{
        // Intent color using CSS variable (theme-aware)
        ...(finalIntent ? { color: getIntentTextCSSVar(finalIntent) } : {}),
        // Merge with any custom styles
        ...style,
      }}
    >
      {children}
    </As>
  );
};
