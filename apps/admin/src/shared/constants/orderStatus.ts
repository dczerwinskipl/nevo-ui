import type { ComponentIntent } from "@nevo/design-system";

/**
 * All possible order statuses in the system
 */
export const ORDER_STATUSES = ["active", "inactive", "draft"] as const;

/**
 * Type-safe order status literal
 */
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * Maps business order statuses to semantic intent colors
 */
export const ORDER_STATUS_INTENT_MAP: Record<OrderStatus, ComponentIntent> = {
  active: "success",
  inactive: "error",
  draft: "warning",
} as const;

/**
 * Transforms business status to semantic intent for UI components
 *
 * @param status - The order status to transform
 * @returns The corresponding semantic intent, or "neutral" for unknown statuses
 *
 * @example
 * ```ts
 * getStatusIntent('active') // 'success'
 * getStatusIntent('inactive') // 'error'
 * getStatusIntent('unknown') // 'neutral' (fallback)
 * ```
 */
export function getStatusIntent(status: string): ComponentIntent {
  if (status in ORDER_STATUS_INTENT_MAP) {
    return ORDER_STATUS_INTENT_MAP[status as OrderStatus];
  }
  // Fallback to neutral for unknown statuses instead of warning
  return "neutral";
}
