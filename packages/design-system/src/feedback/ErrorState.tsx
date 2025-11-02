import React from 'react';
import { useTheme } from '../theme';
import { Button } from '../primitives/Button';

export interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

/**
 * ErrorState component displays error information with optional retry action.
 * Used across the application for consistent error handling UX.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const { tokens } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      style={{ color: tokens.muted }}
    >
      <div className="mb-4 text-4xl">⚠️</div>
      <h3 className="text-lg font-medium mb-2" style={{ color: tokens.text }}>
        Something went wrong
      </h3>
      <p className="text-sm mb-4 max-w-md">{error.message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" intent="neutral">
          Try again
        </Button>
      )}
    </div>
  );
};
