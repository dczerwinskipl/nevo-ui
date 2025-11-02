import React from 'react';
import { clsx } from 'clsx';
import { useTheme, ComponentIntent } from '../theme';

export interface ProgressProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  intent?: ComponentIntent;
  showLabel?: boolean;
  label?: string;
  className?: string;
  variant?: 'bar' | 'circle';
}

const SIZE_CLASSES = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const;

const CIRCLE_SIZE_CLASSES = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
} as const;

export function Progress({
  value,
  max = 100,
  size = 'md',
  intent = 'primary',
  showLabel = false,
  label,
  className,
  variant = 'bar',
}: ProgressProps) {
  const { tokens } = useTheme();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const intentColor = tokens.intent[intent];

  if (variant === 'circle') {
    const radius = size === 'sm' ? 20 : size === 'md' ? 28 : 36;
    const strokeWidth = size === 'sm' ? 3 : size === 'md' ? 4 : 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div
        className={clsx(
          'relative inline-flex items-center justify-center',
          className,
        )}
      >
        <svg
          className={CIRCLE_SIZE_CLASSES[size]}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={tokens.border}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={intentColor.text}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={clsx(
              'font-medium',
              size === 'sm'
                ? 'text-xs'
                : size === 'md'
                  ? 'text-sm'
                  : 'text-base',
            )}
            style={{ color: tokens.text }}
          >
            {showLabel && label ? label : `${Math.round(percentage)}%`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span
              className="text-sm font-medium"
              style={{ color: tokens.text }}
            >
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm" style={{ color: tokens.muted }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={clsx(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          SIZE_CLASSES[size],
        )}
        style={{ backgroundColor: tokens.border }}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: intentColor.text,
          }}
        />
      </div>
    </div>
  );
}
