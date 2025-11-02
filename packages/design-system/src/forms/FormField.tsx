import React from "react";
import { clsx } from "clsx";
import { useTheme, ComponentIntent } from "../theme/ThemeProvider";

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  intent?: ComponentIntent;
}

export function FormField({
  label,
  error,
  hint,
  required = false,
  children,
  className,
  intent = "neutral",
}: FormFieldProps) {
  const { tokens } = useTheme();

  return (
    <div className={clsx("space-y-1", className)}>
      {label && (
        <label
          className="block text-sm font-medium"
          style={{
            color: error ? tokens.intent.error.text : tokens.text,
          }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: tokens.intent.error.text }}>
              *
            </span>
          )}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-xs" style={{ color: tokens.muted }}>
          {hint}
        </p>
      )}

      {error && (
        <p className="text-xs" style={{ color: tokens.intent.error.text }}>
          {error}
        </p>
      )}
    </div>
  );
}
