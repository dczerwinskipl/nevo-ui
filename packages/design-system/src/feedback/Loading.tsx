import React from "react";
import { clsx } from "clsx";
import { useTheme } from "../theme";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
}

const SIZE_CLASSES = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
} as const;

const TEXT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export function Loading({
  size = "md",
  text,
  className,
  variant = "spinner",
}: LoadingProps) {
  const { tokens } = useTheme();

  const renderSpinner = () => (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-transparent",
        SIZE_CLASSES[size]
      )}
      style={{
        borderTopColor: tokens.primary.base,
        borderRightColor: tokens.primary.base,
      }}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={clsx(
            "rounded-full animate-pulse",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{
            backgroundColor: tokens.primary.base,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={clsx("rounded-full animate-pulse", SIZE_CLASSES[size])}
      style={{ backgroundColor: tokens.primary.base }}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "spinner":
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        text ? "flex-col gap-2" : "",
        className
      )}
    >
      {renderLoader()}
      {text && (
        <span
          className={TEXT_SIZE_CLASSES[size]}
          style={{ color: tokens.muted }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
