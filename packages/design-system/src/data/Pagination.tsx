import React from "react";
import { useTheme, raisedStyle } from "../theme";

export const Pagination: React.FC<{ total: number; pageSize: number }> = ({
  total,
  pageSize,
}) => {
  const { tokens } = useTheme();
  const pages = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm" style={{ color: tokens.muted }}>
        Łącznie {total} pozycji
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(pages, 5) }).map((_, i) => (
          <button
            key={i}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              ...(i === 0
                ? {
                    background: tokens.primary.gradient,
                    color: "white",
                    boxShadow: `0 1px 3px ${tokens.shadow.color}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    border: `1px solid ${tokens.primary.base}30`,
                  }
                : raisedStyle(tokens)),
              color: i === 0 ? "white" : tokens.text,
            }}
          >
            {i + 1}
          </button>
        ))}
        <span className="text-sm ml-2" style={{ color: tokens.muted }}>
          ...
        </span>
      </div>
    </div>
  );
};
