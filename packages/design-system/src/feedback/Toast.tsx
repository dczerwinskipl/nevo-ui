import React from "react";
import { clsx } from "clsx";
import {
  useTheme,
  ComponentIntent,
  getIntentStyle,
} from "../theme/ThemeProvider";
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

export interface ToastProps {
  intent?: ComponentIntent;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode | boolean;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const INTENT_ICONS = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  primary: Info,
  neutral: Info,
} as const;

const POSITION_CLASSES = {
  "top-right": "fixed top-4 right-4 z-50",
  "top-left": "fixed top-4 left-4 z-50",
  "bottom-right": "fixed bottom-4 right-4 z-50",
  "bottom-left": "fixed bottom-4 left-4 z-50",
  "top-center": "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
  "bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
} as const;

export function Toast({
  intent = "info",
  title,
  description,
  children,
  dismissible = true,
  onDismiss,
  className,
  icon = true,
  position = "top-right",
}: ToastProps) {
  const { tokens } = useTheme();
  const style = getIntentStyle(tokens, intent, "subtle");

  const IconComponent =
    typeof icon === "boolean" && icon ? INTENT_ICONS[intent] : null;

  return (
    <div
      className={clsx(
        "p-4 rounded-lg shadow-lg border flex gap-3 min-w-80 max-w-md",
        POSITION_CLASSES[position],
        className
      )}
      style={{
        backgroundColor: style.background,
        borderColor: style.border,
        color: style.color,
        boxShadow: tokens.shadow.lg,
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      {(IconComponent || (typeof icon !== "boolean" && icon)) && (
        <div className="flex-shrink-0 mt-0.5">
          {IconComponent ? <IconComponent className="w-5 h-5" /> : icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold mb-1 text-sm">{title}</h4>}
        {description && <p className="text-xs opacity-90">{description}</p>}
        {children && (
          <div className={clsx(title || description ? "mt-2" : "")}>
            {children}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
