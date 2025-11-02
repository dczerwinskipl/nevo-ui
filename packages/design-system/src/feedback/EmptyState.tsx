import React from "react";
import { useTheme } from "../theme";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * EmptyState component displays when no data is available.
 * Used across the application for consistent empty state UX.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
}) => {
  const { tokens } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      style={{ color: tokens.muted }}
    >
      {icon && <div className="mb-4 text-4xl opacity-50">{icon}</div>}
      <h3 className="text-lg font-medium mb-2" style={{ color: tokens.text }}>
        {title}
      </h3>
      <p className="text-sm max-w-md">{description}</p>
    </div>
  );
};
