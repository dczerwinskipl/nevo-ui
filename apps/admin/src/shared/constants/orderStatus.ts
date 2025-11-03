import type { BadgeIntent } from "@nevo/design-system";

/**
 * Maps business order statuses to semantic intent colors
 */
export const ORDER_STATUS_INTENT_MAP: Record<string, BadgeIntent> = {
  'active': 'success',
  'inactive': 'error', 
  'draft': 'warning'
} as const;

/**
 * Transforms business status to semantic intent for UI components
 */
export function getStatusIntent(status: string): BadgeIntent {
  return ORDER_STATUS_INTENT_MAP[status] || 'warning';
}

/**
 * All possible order statuses used in the system
 */
export const ORDER_STATUSES = Object.keys(ORDER_STATUS_INTENT_MAP);