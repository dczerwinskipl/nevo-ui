import React from "react";
import { Button } from "../primitives/Button";

interface FilterActionsProps {
  onApply: () => void;
  onClear: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  applyLabel?: string;
  clearLabel?: string;
}

export const FilterActions: React.FC<FilterActionsProps> = ({
  onApply,
  onClear,
  isLoading = false,
  disabled = false,
  applyLabel = "Apply",
  clearLabel = "Clear",
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        intent="primary"
        size="sm"
        onClick={onApply}
        disabled={disabled || isLoading}
        className="flex items-center justify-center"
      >
        {/* Show a small spinner when loading, avoid changing text */}
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          applyLabel
        )}
      </Button>

      <Button
        intent="neutral"
        variant="ghost"
        size="sm"
        onClick={onClear}
        disabled={disabled}
      >
        {clearLabel}
      </Button>
    </div>
  );
};

export default FilterActions;
