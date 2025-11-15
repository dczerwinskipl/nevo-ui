import React from "react";
import { clsx } from "clsx";
import { LoadingOverlayProps } from "./types";
import { getBgColor, getBorderColor, getTextColor } from "../../theme";

/**
 * LoadingOverlay component displays a loading indicator over existing content.
 * Used when refreshing data while preserving the current view.
 * Positioned to avoid covering table headers.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message,
  children,
  headerOffset = 50, // Default offset to avoid covering headers, but configurable
}) => {
  return (
    <div className="relative">
      {children}
      <div
        className={clsx(
          "absolute flex items-center justify-center",
          "backdrop-blur-sm bg-[color-mix(in_srgb,_var(--color-raised)_80%,_transparent)]"
        )}
        style={{
          top: `${headerOffset}px`,
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <div
          className={clsx(
            "flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg",
            getBgColor(undefined, true),
            getBorderColor(),
            getTextColor()
          )}
        >
          <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-primary" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};
