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
 * Using config-based Tailwind classes that reference CSS variables from theme tokens
 */
export const INTENT_VARIANT_CLASSES: Record<
  ComponentIntent,
  Record<ComponentVariant, string>
> = {
  primary: {
    solid: "bg-primary text-white hover:bg-primary-hover border-primary",
    outline:
      "border-intent-primary text-intent-primary-text hover:bg-intent-primary-bg",
    ghost: "text-intent-primary-text hover:bg-intent-primary-bg",
    subtle:
      "bg-intent-primary-bg text-intent-primary-text border-intent-primary hover:bg-intent-primary-bg/80",
  },
  success: {
    solid:
      "bg-state-success text-white hover:bg-state-success/90 border-state-success",
    outline:
      "border-intent-success text-intent-success-text hover:bg-intent-success-bg",
    ghost: "text-intent-success-text hover:bg-intent-success-bg",
    subtle:
      "bg-intent-success-bg text-intent-success-text border-intent-success hover:bg-intent-success-bg/80",
  },
  error: {
    solid:
      "bg-state-error text-white hover:bg-state-error/90 border-state-error",
    outline:
      "border-intent-error text-intent-error-text hover:bg-intent-error-bg",
    ghost: "text-intent-error-text hover:bg-intent-error-bg",
    subtle:
      "bg-intent-error-bg text-intent-error-text border-intent-error hover:bg-intent-error-bg/80",
  },
  warning: {
    solid:
      "bg-state-warning text-white hover:bg-state-warning/90 border-state-warning",
    outline:
      "border-intent-warning text-intent-warning-text hover:bg-intent-warning-bg",
    ghost: "text-intent-warning-text hover:bg-intent-warning-bg",
    subtle:
      "bg-intent-warning-bg text-intent-warning-text border-intent-warning hover:bg-intent-warning-bg/80",
  },
  info: {
    solid: "bg-state-info text-white hover:bg-state-info/90 border-state-info",
    outline: "border-intent-info text-intent-info-text hover:bg-intent-info-bg",
    ghost: "text-intent-info-text hover:bg-intent-info-bg",
    subtle:
      "bg-intent-info-bg text-intent-info-text border-intent-info hover:bg-intent-info-bg/80",
  },
  neutral: {
    solid: "bg-raised text-text hover:bg-raised/90 border-border",
    outline: "border-border text-text hover:bg-raised",
    ghost: "text-text hover:bg-raised",
    subtle: "bg-card text-text border-border hover:bg-raised",
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
 * Using config-based Tailwind classes that reference CSS variables from theme tokens
 */
export const INTENT_TEXT_COLORS: Record<ComponentIntent, string> = {
  primary: "text-intent-primary-text",
  success: "text-intent-success-text",
  warning: "text-intent-warning-text",
  error: "text-intent-error-text",
  info: "text-intent-info-text",
  neutral: "text-muted",
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

/**
 * ============================================================================
 * TOKEN-DRIVEN UTILITY FUNCTIONS
 * ============================================================================
 * These utilities generate Tailwind classes using config-based classes
 * from tailwind.config.cjs that reference CSS variables from tokens.ts.
 * This ensures a single source of truth for all colors and prevents duplication.
 */

/**
 * Get text color class using config-based Tailwind classes
 *
 * @param intent - Optional semantic intent for colored text
 * @param muted - Whether to use muted text color
 * @returns Tailwind class string
 *
 * @example
 * ```tsx
 * <span className={getTextColor()}>Normal text</span>
 * <span className={getTextColor(undefined, true)}>Muted text</span>
 * <span className={getTextColor('primary')}>Primary colored text</span>
 * ```
 */
export function getTextColor(intent?: ComponentIntent, muted = false): string {
  if (muted) return "text-muted";
  if (!intent || intent === "neutral") return "text-text";
  return INTENT_TEXT_COLORS[intent];
}

/**
 * Get background color class using config-based Tailwind classes
 *
 * @param intent - Optional semantic intent for colored background
 * @param raised - Whether to use raised surface color
 * @returns Tailwind class string
 *
 * @example
 * ```tsx
 * <div className={getBgColor()}>Base background</div>
 * <div className={getBgColor(undefined, true)}>Raised surface</div>
 * <div className={getBgColor('primary')}>Primary background</div>
 * ```
 */
export function getBgColor(intent?: ComponentIntent, raised = false): string {
  if (raised && (!intent || intent === "neutral")) return "bg-raised";
  if (!intent || intent === "neutral") return "bg-card";

  const intentBgMap: Record<Exclude<ComponentIntent, "neutral">, string> = {
    primary: "bg-intent-primary-bg",
    success: "bg-intent-success-bg",
    error: "bg-intent-error-bg",
    warning: "bg-intent-warning-bg",
    info: "bg-intent-info-bg",
  };

  return intentBgMap[intent];
}

/**
 * Get border color class using config-based Tailwind classes
 *
 * @param intent - Optional semantic intent for colored border
 * @param side - Optional side for border (top, bottom, left, right, all)
 * @returns Tailwind class string
 *
 * @example
 * ```tsx
 * <div className={getBorderColor()}>All borders</div>
 * <div className={getBorderColor(undefined, 'bottom')}>Bottom border only</div>
 * <div className={getBorderColor('error')}>Error colored border</div>
 * ```
 */
export function getBorderColor(
  intent?: ComponentIntent,
  side?: "top" | "bottom" | "left" | "right"
): string {
  const borderSide = side ? `border-${side}` : "border";

  if (!intent || intent === "neutral") {
    return `${borderSide} border-border`;
  }

  const intentBorderMap: Record<Exclude<ComponentIntent, "neutral">, string> = {
    primary: "border-intent-primary",
    success: "border-intent-success",
    error: "border-intent-error",
    warning: "border-intent-warning",
    info: "border-intent-info",
  };

  return `${borderSide} ${intentBorderMap[intent]}`;
}

/**
 * Get primary brand color class using config-based Tailwind classes
 * Useful for loading spinners, active states, etc.
 *
 * @param property - CSS property to apply color to (text, bg, border)
 * @returns Tailwind class string
 *
 * @example
 * ```tsx
 * <div className={getPrimaryColor('bg')}>Primary background</div>
 * <span className={getPrimaryColor('text')}>Primary text</span>
 * <div className={getPrimaryColor('border')}>Primary border</div>
 * ```
 */
export function getPrimaryColor(
  property: "text" | "bg" | "border" = "text"
): string {
  const propertyMap = {
    text: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
  };

  return propertyMap[property];
}

/**
 * ============================================================================
 * LEGACY UTILITIES (Maintained for backward compatibility)
 * ============================================================================
 * These are simpler versions without intent support.
 * Prefer using the token-driven functions above for new code.
 */

/**
 * Common color classes using config-based Tailwind classes
 * Use these instead of inline styles to maintain theme-awareness
 */
export const CSS_VAR_CLASSES = {
  // Text colors
  text: "text-text",
  textMuted: "text-muted",

  // Background colors
  bg: "bg-card",
  bgRaised: "bg-raised",
  bgHover: "hover:bg-raised",

  // Borders
  border: "border-border",
  borderB: "border-b border-border",
  borderT: "border-t border-border",

  // Combined common patterns
  raisedWithBorder: "bg-raised border border-border",

  // Loading/skeleton states
  pulse: "animate-pulse bg-raised",

  // Overlay/backdrop (keeping arbitrary value for backdrop-blur)
  backdrop: "bg-page/80 backdrop-blur-sm",
} as const;

/**
 * @deprecated Use getTextColor() instead for intent support
 */
export function getTextColorClass(muted = false): string {
  return getTextColor(undefined, muted);
}

/**
 * @deprecated Use getBgColor() instead for intent support
 */
export function getBgColorClass(raised = false): string {
  return getBgColor(undefined, raised);
}

/**
 * @deprecated Use getBorderColor() instead for intent support
 */
export function getBorderClass(
  side?: "top" | "bottom" | "left" | "right"
): string {
  return getBorderColor(undefined, side);
}

/**
 * Get combined classes for common patterns
 * This reduces duplication across components
 *
 * @example
 * ```tsx
 * // Table header
 * <thead className={clsx(getBgColor(undefined, true), getBorderColor(undefined, 'bottom'))}>
 *
 * // Card with border
 * <div className={getCommonPattern('raisedWithBorder')}>
 * ```
 */
export function getCommonPattern(
  pattern: "raisedWithBorder" | "pulse" | "backdrop"
): string {
  switch (pattern) {
    case "raisedWithBorder":
      return CSS_VAR_CLASSES.raisedWithBorder;
    case "pulse":
      return CSS_VAR_CLASSES.pulse;
    case "backdrop":
      return CSS_VAR_CLASSES.backdrop;
  }
}

/**
 * =========================================================================
 * INTERACTION & ANIMATION UTILITIES
 * ============================================================================
 * Common patterns for transitions, animations, and interactive states
 */

/**
 * Common transition classes
 * Use for smooth transitions on interactive elements
 */
export const TRANSITION_CLASSES = {
  /** Standard transition for most interactive elements */
  base: "transition-all duration-200",
  /** Fast transition for quick feedback */
  fast: "transition-all duration-150",
  /** Slow transition for complex animations */
  slow: "transition-all duration-300",
} as const;

/**
 * Interactive element classes
 * Common patterns for buttons, clickable cards, etc.
 */
export const INTERACTIVE_CLASSES = {
  /** Standard interactive button with scale effect */
  button: "transition-all duration-200 hover:scale-105 touch-manipulation",
  /** Subtle scale for cards and larger elements */
  card: "transition-all duration-200 hover:scale-[1.02] touch-manipulation",
  /** Interactive element with glow effect */
  glow: "transition-all duration-200 hover:shadow-md",
} as const;

/**
 * Accessibility touch target classes
 * Ensures WCAG 2.1 AA compliance (minimum 44x44px)
 */
export const TOUCH_TARGET_CLASSES = {
  /** Standard touch target (44x44px) */
  standard: "min-h-[44px] min-w-[44px]",
  /** Small touch target (40x40px) - use with caution */
  small: "min-h-[40px] min-w-[40px]",
  /** Large touch target (48x48px) */
  large: "min-h-[48px] min-w-[48px]",
} as const;

export type TransitionSpeed = keyof typeof TRANSITION_CLASSES;
export type InteractionStyle = keyof typeof INTERACTIVE_CLASSES;
export type TouchTargetSize = keyof typeof TOUCH_TARGET_CLASSES;

/**
 * Get transition classes for animations
 *
 * @param speed - The transition speed
 * @returns Transition Tailwind class string
 *
 * @example
 * ```tsx
 * <div className={getTransitionClasses('base')}>
 * ```
 */
export function getTransitionClasses(speed: TransitionSpeed = "base"): string {
  return TRANSITION_CLASSES[speed];
}

/**
 * Get interactive element classes
 *
 * @param style - The interaction style
 * @returns Interactive Tailwind class string
 *
 * @example
 * ```tsx
 * // Button with scale effect
 * <button className={clsx('px-4 py-2', getInteractiveClasses('button'))}>
 *
 * // Card with subtle scale
 * <div className={clsx('p-4', getInteractiveClasses('card'))}>
 * ```
 */
export function getInteractiveClasses(
  style: InteractionStyle = "button"
): string {
  return INTERACTIVE_CLASSES[style];
}

/**
 * Get touch target classes for accessibility
 *
 * @param size - The touch target size
 * @returns Touch target Tailwind class string
 *
 * @example
 * ```tsx
 * // Icon button with proper touch target
 * <button className={clsx('p-2', getTouchTargetClasses('standard'))}>
 * ```
 */
export function getTouchTargetClasses(
  size: TouchTargetSize = "standard"
): string {
  return TOUCH_TARGET_CLASSES[size];
}

/**
 * =========================================================================
 * SHADOW UTILITIES
 * ============================================================================
 */

/**
 * Shadow depth classes using theme shadow color
 * Provides consistent shadow styling across components
 */
export const SHADOW_CLASSES = {
  /** Subtle shadow for default/inactive states */
  sm: "shadow-[0_1px_3px_var(--shadow-color)]",
  /** Medium shadow for slightly elevated elements */
  md: "shadow-[0_2px_6px_var(--shadow-color)]",
  /** Large shadow for active/focused states */
  lg: "shadow-[0_4px_8px_var(--shadow-color),0_2px_4px_var(--shadow-color)]",
  /** Extra large shadow for modals and overlays */
  xl: "shadow-[0_10px_30px_var(--shadow-color),0_6px_10px_var(--shadow-color)]",
} as const;

export type ShadowSize = keyof typeof SHADOW_CLASSES;

/**
 * Get shadow classes for consistent elevation styling
 *
 * @param size - The shadow depth size
 * @returns Shadow Tailwind class string
 *
 * @example
 * ```tsx
 * // Default shadow
 * <div className={getShadowClasses('sm')}>
 *
 * // Active state shadow
 * <button className={clsx('...', isActive && getShadowClasses('lg'))}>
 * ```
 */
export function getShadowClasses(size: ShadowSize): string {
  return SHADOW_CLASSES[size];
}
