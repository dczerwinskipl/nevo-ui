import React from "react";
import { clsx } from "clsx";
import {
  ComponentIntent,
  ComponentVariant,
  getIntentVariantClasses,
  getVariantBaseClasses,
} from "../theme";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The semantic intent/purpose of the badge */
  intent?: ComponentIntent;
  /** The visual style variant */
  variant?: ComponentVariant;
  /** Optional icon to display before the text */
  icon?: React.ReactNode;
  /** Display a dot indicator instead of an icon */
  dot?: boolean;
  /** Child content to display in the badge */
  children?: React.ReactNode;
}

/**
 * Badge component for displaying status, labels, and tags
 * 
 * @example
 * ```tsx
 * <Badge intent="success">Active</Badge>
 * <Badge intent="error" variant="outline">Error</Badge>
 * <Badge intent="info" dot>New</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  intent = "neutral",
  variant = "subtle",
  icon,
  dot,
  className,
  children,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        // Base styles
        "inline-flex items-center gap-1 rounded-full text-xs font-medium px-2.5 py-1",
        // Variant base classes from theme
        getVariantBaseClasses(variant),
        // Intent + variant combination classes from theme
        getIntentVariantClasses(intent, variant),
        // Custom className override
        className
      )}
      {...rest}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {icon && <span className="inline-flex" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
};
