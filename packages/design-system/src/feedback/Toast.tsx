import React from "react";
import { clsx } from "clsx";
import { ComponentIntent, getIntentVariantClasses } from "../theme";
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
  const IconComponent =
    typeof icon === "boolean" && icon ? INTENT_ICONS[intent] : null;

  return (
    <div
      className={clsx(
        "p-4 rounded-lg shadow-lg flex gap-3 min-w-80 max-w-md",
        getIntentVariantClasses(intent, "subtle"),
        POSITION_CLASSES[position],
        className
      )}
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
          className={clsx(
            "flex-shrink-0 p-1 rounded transition-colors",
            "hover:bg-raised/50"
          )}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
