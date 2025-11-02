import React from "react";
import { clsx } from "clsx";
import { useTheme } from "../theme/ThemeProvider";
import { AlertCircle } from "lucide-react";

export interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: "text-xs",
  md: "text-sm",
} as const;

export function FormError({
  children,
  className,
  showIcon = true,
  size = "sm",
}: FormErrorProps) {
  const { tokens } = useTheme();

  if (!children) return null;

  return (
    <div
      className={clsx("flex items-start gap-1", SIZE_CLASSES[size], className)}
      style={{ color: tokens.intent.error.text }}
    >
      {showIcon && (
        <AlertCircle
          className={clsx(
            "flex-shrink-0 mt-0.5",
            size === "sm" ? "w-3 h-3" : "w-4 h-4"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
