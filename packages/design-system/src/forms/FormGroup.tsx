import React from 'react';
import { clsx } from 'clsx';

export interface FormGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  spacing?: 'sm' | 'md' | 'lg';
}

const SPACING_CLASSES = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
} as const;

export function FormGroup({
  title,
  description,
  children,
  className,
  direction = 'vertical',
  spacing = 'md',
}: FormGroupProps) {
  return (
    <div className={clsx('form-group', className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div
        className={clsx(
          direction === 'horizontal' ? 'flex' : 'flex flex-col',
          SPACING_CLASSES[spacing],
        )}
      >
        {children}
      </div>
    </div>
  );
}
