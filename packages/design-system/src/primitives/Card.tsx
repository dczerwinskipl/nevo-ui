import React from "react";
import { clsx } from "clsx";

export type CardVariant = "default" | "bordered" | "elevated" | "flat";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default:
    "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm",
  bordered:
    "bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600",
  elevated:
    "bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800",
  flat: "bg-gray-50 dark:bg-gray-800",
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The visual style variant of the card */
  variant?: CardVariant;
  /** Whether the card has hover effects */
  hoverable?: boolean;
  /** Whether the card is clickable (adds cursor pointer and keyboard support) */
  clickable?: boolean;
  /** Loading state - shows spinner overlay */
  loading?: boolean;
  /** Child content */
  children?: React.ReactNode;
}

/**
 * Card component - Container for grouping related content
 *
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Content</CardBody>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      hoverable = false,
      clickable = false,
      loading = false,
      onClick,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        // Trigger onClick handler for keyboard events
        const syntheticEvent = {
          ...e,
          currentTarget: e.currentTarget,
          target: e.target,
        } as unknown as React.MouseEvent<HTMLDivElement>;
        onClick(syntheticEvent);
      }
    };

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          // Base styles
          "rounded-xl p-6 relative",
          // Variant styles
          VARIANT_CLASSES[variant],
          // Interactive states
          {
            "cursor-pointer": clickable,
            "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5":
              hoverable,
            "opacity-60 pointer-events-none": loading,
          },
          // Custom className
          className
        )}
        onClick={clickable ? onClick : undefined}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-xl z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400" />
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader - Header section of a card
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "mb-4 pb-4 border-b border-gray-200 dark:border-gray-700",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

CardHeader.displayName = "CardHeader";

/**
 * CardBody - Main content section of a card
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx("text-gray-700 dark:text-gray-300", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

CardBody.displayName = "CardBody";

/**
 * CardFooter - Footer section of a card
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = "CardFooter";
