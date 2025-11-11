import React from "react";
import { clsx } from "clsx";

/**
 * Spacing values that map to Tailwind's gap scale
 */
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

/**
 * Number of columns in the grid
 */
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto";

/**
 * Number of rows in the grid
 */
export type GridRows = number | "auto";

/**
 * Alignment of items within their grid cells (vertical)
 */
export type GridAlignItems = "start" | "center" | "end" | "stretch";

/**
 * Justification of items within their grid cells (horizontal)
 */
export type GridJustifyItems = "start" | "center" | "end" | "stretch";

/**
 * Props for the Grid component
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the grid */
  cols?: GridCols;
  /** Gap between items using Tailwind spacing scale */
  gap?: GridGap;
  /** Number of rows in the grid (auto or specific number) */
  rows?: GridRows;
  /** Vertical alignment of items within their cells */
  alignItems?: GridAlignItems;
  /** Horizontal alignment of items within their cells */
  justifyItems?: GridJustifyItems;
  /** Child elements */
  children: React.ReactNode;
}

// Gap classes mapping
const GAP_CLASSES: Record<GridGap, string> = {
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

// Column classes mapping
const COLS_CLASSES: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
  auto: "grid-cols-auto",
} as const;

/**
 * Grid Component
 *
 * A CSS Grid layout component for creating grid-based layouts.
 * Perfect for card grids, image galleries, and structured layouts.
 *
 * @example
 * ```tsx
 * // 3-column grid
 * <Grid cols={3} gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 *   <Card>Item 4</Card>
 * </Grid>
 *
 * // Responsive grid with centered items
 * <Grid cols={4} gap={6} alignItems="center" justifyItems="center">
 *   <Icon />
 *   <Icon />
 *   <Icon />
 *   <Icon />
 * </Grid>
 *
 * // Auto-fit grid
 * <Grid cols="auto" gap={4}>
 *   <Badge>Auto</Badge>
 *   <Badge>Sized</Badge>
 *   <Badge>Items</Badge>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap = 4,
  rows,
  alignItems,
  justifyItems,
  className,
  children,
  ...rest
}) => {
  const rowsClass = rows
    ? typeof rows === "number"
      ? `grid-rows-${rows}`
      : "auto-rows-auto"
    : undefined;

  return (
    <div
      className={clsx(
        "grid",
        COLS_CLASSES[cols],
        GAP_CLASSES[gap],
        rowsClass,
        alignItems && `items-${alignItems}`,
        justifyItems && `justify-items-${justifyItems}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
