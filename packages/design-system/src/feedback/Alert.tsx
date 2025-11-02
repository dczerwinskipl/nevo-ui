import React from 'react';
import { clsx } from 'clsx';
import {
  useTheme,
  ComponentIntent,
  getIntentStyle,
} from '../theme';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface AlertProps {
  intent?: ComponentIntent;
  variant?: 'subtle' | 'solid' | 'outline';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode | boolean;
}

const INTENT_ICONS = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  primary: Info,
  neutral: Info,
} as const;

export function Alert({
  intent = 'info',
  variant = 'subtle',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  icon = true,
}: AlertProps) {
  const { tokens } = useTheme();
  const style = getIntentStyle(tokens, intent, variant);

  const IconComponent =
    typeof icon === 'boolean' && icon ? INTENT_ICONS[intent] : null;

  return (
    <div
      className={clsx('p-4 rounded-lg flex gap-3', className)}
      style={{
        backgroundColor: style.background,
        borderColor: style.border,
        color: style.color,
        borderWidth: variant === 'outline' ? '1px' : '0',
        borderStyle: 'solid',
      }}
      role="alert"
    >
      {/* Icon */}
      {(IconComponent || (typeof icon !== 'boolean' && icon)) && (
        <div className="flex-shrink-0">
          {IconComponent ? <IconComponent className="w-5 h-5" /> : icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className={clsx(title ? 'text-sm' : '')}>{children}</div>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
