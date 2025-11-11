/**
 * Centralized Tailwind class mappings for component styling
 *
 * This module provides utility functions to get consistent Tailwind classes
 * for different component intents, variants, and sizes. This prevents duplication
 * across components and ensures consistent styling.
 */

import type { ComponentIntent, ComponentVariant, ComponentSize } from "./types";

/**
 * Intent-specific Tailwind classes for each variant combination
 * These mappings define the visual appearance for all intent+variant combinations
 */
export const INTENT_VARIANT_CLASSES: Record<
  ComponentIntent,
  Record<ComponentVariant, string>
> = {
  primary: {
    solid:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 border-blue-600",
    outline:
      "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950",
    ghost:
      "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950",
    subtle:
      "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900 dark:hover:bg-blue-900",
  },
  success: {
    solid:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 border-green-600",
    outline:
      "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950",
    ghost:
      "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950",
    subtle:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-900 dark:hover:bg-green-900",
  },
  error: {
    solid:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 border-red-600",
    outline:
      "border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950",
    ghost:
      "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950",
    subtle:
      "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:border-red-900 dark:hover:bg-red-900",
  },
  warning: {
    solid:
      "bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 border-yellow-500",
    outline:
      "border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-950",
    ghost:
      "text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950",
    subtle:
      "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900 dark:hover:bg-yellow-900",
  },
  info: {
    solid:
      "bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 border-cyan-600",
    outline:
      "border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-500 dark:text-cyan-400 dark:hover:bg-cyan-950",
    ghost:
      "text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-950",
    subtle:
      "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-900 dark:hover:bg-cyan-900",
  },
  neutral: {
    solid:
      "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 border-gray-600",
    outline:
      "border-gray-400 text-gray-700 hover:bg-gray-50 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    subtle:
      "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700",
  },
} as const;

/**
 * Base variant classes (border, background, shadow behaviors)
 */
export const VARIANT_BASE_CLASSES: Record<ComponentVariant, string> = {
  solid: "shadow-sm",
  outline: "border bg-transparent",
  ghost: "border border-transparent bg-transparent",
  subtle: "border",
} as const;

/**
 * Size classes for interactive components (buttons, inputs, etc.)
 * Includes minimum touch targets for mobile accessibility
 */
export const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-3 py-2 text-xs min-h-[36px]",
  sm: "px-4 py-2.5 text-sm min-h-[44px]",
  md: "px-4 py-3 text-base min-h-[44px]",
  lg: "px-6 py-4 text-lg min-h-[48px]",
  xl: "px-8 py-5 text-xl min-h-[52px]",
} as const;

/**
 * Intent-specific text color classes for Typography and text elements
 * These provide semantic color meanings consistent across the design system
 */
export const INTENT_TEXT_COLORS: Record<ComponentIntent, string> = {
  primary: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-cyan-600 dark:text-cyan-400",
  neutral: "text-gray-600 dark:text-gray-400",
} as const;

/**
 * Get Tailwind classes for a specific intent and variant combination
 *
 * @param intent - The semantic intent (primary, success, error, etc.)
 * @param variant - The visual variant (solid, outline, ghost, subtle)
 * @returns Combined Tailwind class string
 *
 * @example
 * ```tsx
 * const classes = getIntentVariantClasses('primary', 'solid');
 * // Returns: "bg-blue-600 text-white hover:bg-blue-700 ..."
 * ```
 */
export function getIntentVariantClasses(
  intent: ComponentIntent,
  variant: ComponentVariant
): string {
  return INTENT_VARIANT_CLASSES[intent][variant];
}

/**
 * Get base variant classes (without intent-specific colors)
 *
 * @param variant - The visual variant
 * @returns Base Tailwind class string
 *
 * @example
 * ```tsx
 * const classes = getVariantBaseClasses('outline');
 * // Returns: "border bg-transparent"
 * ```
 */
export function getVariantBaseClasses(variant: ComponentVariant): string {
  return VARIANT_BASE_CLASSES[variant];
}

/**
 * Get size classes for interactive components
 *
 * @param size - The component size
 * @returns Size-specific Tailwind class string
 *
 * @example
 * ```tsx
 * const classes = getSizeClasses('md');
 * // Returns: "px-4 py-3 text-base min-h-[44px]"
 * ```
 */
export function getSizeClasses(size: ComponentSize): string {
  return SIZE_CLASSES[size];
}

/**
 * Get intent-specific text color classes
 *
 * @param intent - The semantic intent
 * @returns Intent-specific text color Tailwind classes
 *
 * @example
 * ```tsx
 * const classes = getIntentTextColor('error');
 * // Returns: "text-red-600 dark:text-red-400"
 * ```
 */
export function getIntentTextColor(intent: ComponentIntent): string {
  return INTENT_TEXT_COLORS[intent];
}
