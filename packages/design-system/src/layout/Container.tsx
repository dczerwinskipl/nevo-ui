import React from "react";
import { clsx } from "clsx";

/**
 * Container size options mapping to max-width values
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl" | "full";

/**
 * Padding size using Tailwind spacing scale
 */
export type ContainerPadding = 0 | 2 | 4 | 6 | 8;

/**
 * Props for the Container component
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  size?: ContainerSize;
  /** Padding around the container content */
  padding?: ContainerPadding;
  /** Whether to center the container horizontally */
  center?: boolean;
  /** Child elements */
  children: React.ReactNode;
}

// Size classes mapping to Tailwind max-width
const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-sm", // 640px
  md: "max-w-md", // 768px
  lg: "max-w-lg", // 1024px
  xl: "max-w-xl", // 1280px
  "2xl": "max-w-2xl", // 1536px
  "4xl": "max-w-4xl", // 2xl
  "7xl": "max-w-7xl", // 7xl
  full: "max-w-full", // 100%
} as const;

// Padding classes mapping
const PADDING_CLASSES: Record<ContainerPadding, string> = {
  0: "px-0",
  2: "px-2",
  4: "px-4",
  6: "px-6",
  8: "px-8",
} as const;

/**
 * Container Component
 *
 * A container component with max-width constraints and responsive padding.
 * Use this to constrain content width and maintain consistent page margins.
 *
 * @example
 * ```tsx
 * // Centered container with medium width
 * <Container size="md" center padding={6}>
 *   <Typography type="page-title">Welcome</Typography>
 *   <Typography type="body">Content goes here...</Typography>
 * </Container>
 *
 * // Full-width container with padding
 * <Container size="full" padding={4}>
 *   <Grid cols={3} gap={4}>
 *     <Card>1</Card>
 *     <Card>2</Card>
 *     <Card>3</Card>
 *   </Grid>
 * </Container>
 *
 * // Small centered container
 * <Container size="sm" center padding={8}>
 *   <Card>Narrow content</Card>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  size = "7xl",
  padding = 4,
  center = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        SIZE_CLASSES[size],
        PADDING_CLASSES[padding],
        center && "mx-auto",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
