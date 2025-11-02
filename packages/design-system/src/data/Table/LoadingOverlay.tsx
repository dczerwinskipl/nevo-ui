import React from "react";
import { useTheme } from "../../theme";
import { LoadingOverlayProps } from "./types";

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
  const { tokens } = useTheme();

  return (
    <div className="relative">
      {children}
      <div
        className="absolute flex items-center justify-center backdrop-blur-sm"
        style={{
          backgroundColor: `${tokens.raised}80`,
          top: `${headerOffset}px`,
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg"
          style={{
            background: tokens.raised,
            border: `1px solid ${tokens.border}`,
            color: tokens.text,
          }}
        >
          <div
            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor:
                `${tokens.primary.base} transparent ` +
                `${tokens.primary.base} ${tokens.primary.base}`,
            }}
          />
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};
