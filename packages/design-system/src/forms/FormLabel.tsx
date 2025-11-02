import React from "react";
import { clsx } from "clsx";
import { useTheme, ComponentIntent } from "../theme/ThemeProvider";

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  intent?: ComponentIntent;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export function FormLabel({
  htmlFor,
  required = false,
  children,
  className,
  intent = "neutral",
  size = "md",
}: FormLabelProps) {
  const { tokens } = useTheme();

  const intentColor =
    intent === "error" ? tokens.intent.error.text : tokens.text;

  return (
    <label
      htmlFor={htmlFor}
      className={clsx("block font-medium", SIZE_CLASSES[size], className)}
      style={{ color: intentColor }}
    >
      {children}
      {required && (
        <span className="ml-1" style={{ color: tokens.intent.error.text }}>
          *
        </span>
      )}
    </label>
  );
}
