import React from "react";
import { Button } from "../primitives/Button";
import { Spinner } from "../primitives/Spinner";

interface FilterActionsProps {
  onApply: () => void;
  onClear: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  clearDisabled?: boolean;
  applyLabel?: string;
  clearLabel?: string;
}

export const FilterActions: React.FC<FilterActionsProps> = ({
  onApply,
  onClear,
  isLoading = false,
  disabled = false,
  clearDisabled = false,
  applyLabel = "Apply",
  clearLabel = "Clear",
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        intent="primary"
        size="sm"
        onClick={onApply}
        disabled={disabled}
        className="flex items-center justify-center"
      >
        {/* Show a small spinner when loading, avoid changing text */}
        {isLoading ? <Spinner size="sm" /> : applyLabel}
      </Button>

      <Button
        intent="neutral"
        variant="ghost"
        size="sm"
        onClick={onClear}
        disabled={clearDisabled}
      >
        {clearLabel}
      </Button>
    </div>
  );
};

export default FilterActions;
