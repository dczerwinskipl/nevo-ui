import React from "react";
import { clsx } from "clsx";

/**
 * Spacing values that map to Tailwind's gap scale
 */
export type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

/**
 * Flex direction including reverse options
 */
export type FlexDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

/**
 * Alignment of items along the cross axis
 */
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Justification of items along the main axis
 */
export type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

/**
 * Wrap behavior for flex items
 */
export type FlexWrap = boolean | "reverse";

/**
 * Props for the Flex component
 */
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the flex container */
  direction?: FlexDirection;
  /** Gap between items using Tailwind spacing scale */
  gap?: FlexGap;
  /** Alignment of items along the cross axis */
  align?: FlexAlign;
  /** Justification of items along the main axis */
  justify?: FlexJustify;
  /** Whether items should wrap, or wrap in reverse */
  wrap?: FlexWrap;
  /** Whether children should grow to fill available space */
  grow?: boolean;
  /** Whether children should shrink */
  shrink?: boolean;
  /** Child elements */
  children: React.ReactNode;
}

// Gap classes mapping - defined outside component
const GAP_CLASSES: Record<FlexGap, string> = {
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

// Direction classes mapping
const DIRECTION_CLASSES: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
} as const;

/**
 * Flex Component
 *
 * A flexible layout component with full control over flexbox properties.
 * Use this for complex layouts that need more control than Stack provides.
 *
 * @example
 * ```tsx
 * // Horizontal layout with space between
 * <Flex justify="between" align="center">
 *   <Typography>Left</Typography>
 *   <Button>Right</Button>
 * </Flex>
 *
 * // Reverse column with wrapping
 * <Flex direction="column-reverse" wrap gap={4}>
 *   <Card>Last</Card>
 *   <Card>Middle</Card>
 *   <Card>First</Card>
 * </Flex>
 *
 * // Evenly spaced items
 * <Flex justify="evenly" align="baseline">
 *   <Icon size="sm" />
 *   <Icon size="md" />
 *   <Icon size="lg" />
 * </Flex>
 * ```
 */
export const Flex: React.FC<FlexProps> = ({
  direction = "row",
  gap = 4,
  align,
  justify,
  wrap,
  grow = false,
  shrink = false,
  className,
  children,
  ...rest
}) => {
  const wrapClass =
    wrap === true
      ? "flex-wrap"
      : wrap === "reverse"
        ? "flex-wrap-reverse"
        : undefined;

  return (
    <div
      className={clsx(
        "flex",
        DIRECTION_CLASSES[direction],
        GAP_CLASSES[gap],
        align && `items-${align}`,
        justify && `justify-${justify}`,
        wrapClass,
        grow && "flex-grow",
        shrink && "flex-shrink-0",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
