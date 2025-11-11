import React from "react";
import { clsx } from "clsx";

/**
 * Spacing values that map to Tailwind's gap scale
 */
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

/**
 * Direction of the stack layout
 */
export type StackDirection = "row" | "column";

/**
 * Alignment of items along the cross axis
 */
export type StackAlign = "start" | "center" | "end" | "stretch";

/**
 * Justification of items along the main axis
 */
export type StackJustify = "start" | "center" | "end" | "between" | "around";

/**
 * Props for the Stack component
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack (row or column) */
  direction?: StackDirection;
  /** Gap between items using Tailwind spacing scale */
  gap?: StackGap;
  /** Alignment of items along the cross axis */
  align?: StackAlign;
  /** Justification of items along the main axis */
  justify?: StackJustify;
  /** Whether items should wrap */
  wrap?: boolean;
  /** Child elements */
  children: React.ReactNode;
}

// Gap classes mapping - defined outside component to prevent recreation
const GAP_CLASSES: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
} as const;

/**
 * Stack Component
 *
 * A flexible layout component for creating vertical or horizontal stacks
 * of elements with consistent spacing.
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack gap={4}>
 *   <Button>First</Button>
 *   <Button>Second</Button>
 * </Stack>
 *
 * // Horizontal stack with wrapping
 * <Stack direction="row" gap={2} wrap>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 * </Stack>
 *
 * // Centered stack
 * <Stack align="center" justify="center" gap={4}>
 *   <Icon />
 *   <Typography>Centered content</Typography>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = ({
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        GAP_CLASSES[gap],
        align && `items-${align}`,
        justify && `justify-${justify}`,
        wrap && "flex-wrap",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
