/**
 * CSS Variables System for Theme-Aware Styling
 *
 * This module generates CSS variables from theme tokens, enabling:
 * 1. Theme-aware config-based Tailwind classes (e.g., `bg-primary`, `text-intent-primary-text`)
 * 2. Dynamic theme switching without page reload
 * 3. Integration with existing ThemeProvider
 *
 * @example
 * ```tsx
 * // In ThemeProvider, inject CSS variables
 * <style dangerouslySetInnerHTML={{ __html: generateCSSVariables(tokens) }} />
 *
 * // In components, use config-based Tailwind classes
 * <div className="bg-intent-primary-bg text-intent-primary-text">
 *   Primary content
 * </div>
 * ```
 */

import type { Tokens, ComponentIntent } from "./types";

/**
 * Generates CSS variables string from theme tokens
 * Injects variables into :root for global access
 */
export function generateCSSVariables(tokens: Tokens): string {
  return `
    :root {
      /* Surface elevation scale */
      --color-surface-50: ${tokens.surface[50]};
      --color-surface-100: ${tokens.surface[100]};
      --color-surface-200: ${tokens.surface[200]};
      --color-surface-300: ${tokens.surface[300]};
      --color-surface-400: ${tokens.surface[400]};
      --color-surface-500: ${tokens.surface[500]};
      --color-surface-600: ${tokens.surface[600]};
      --color-surface-700: ${tokens.surface[700]};
      --color-surface-800: ${tokens.surface[800]};
      --color-surface-900: ${tokens.surface[900]};

      /* Legacy base colors (backward compatibility) */
      --color-page: ${tokens.page};
      --color-card: ${tokens.card};
      --color-raised: ${tokens.raised};
      --color-text: ${tokens.text};
      --color-muted: ${tokens.muted};
      --color-border: ${tokens.border};
      
      /* Primary colors */
      --color-primary-base: ${tokens.primary.base};
      --color-primary-hover: ${tokens.primary.hover};
      
      /* Shadow - legacy */
      --shadow-color: ${tokens.shadow.color};
      --shadow-highlight: ${tokens.shadow.highlight};
      
      /* Shadow - dedicated levels for different elevations */
      --shadow-inset: ${tokens.shadow.inset || tokens.shadow.color};
      --shadow-card: ${tokens.shadow.card || tokens.shadow.color};
      --shadow-elevated: ${tokens.shadow.elevated || tokens.shadow.color};
      --shadow-raised: ${tokens.shadow.raised || tokens.shadow.color};
      
      /* Intent colors - Primary */
      --color-intent-primary-bg: ${tokens.intent.primary.bg};
      --color-intent-primary-border: ${tokens.intent.primary.border};
      --color-intent-primary-text: ${tokens.intent.primary.text};
      
      /* Intent colors - Success */
      --color-intent-success-bg: ${tokens.intent.success.bg};
      --color-intent-success-border: ${tokens.intent.success.border};
      --color-intent-success-text: ${tokens.intent.success.text};
      
      /* Intent colors - Warning */
      --color-intent-warning-bg: ${tokens.intent.warning.bg};
      --color-intent-warning-border: ${tokens.intent.warning.border};
      --color-intent-warning-text: ${tokens.intent.warning.text};
      
      /* Intent colors - Error */
      --color-intent-error-bg: ${tokens.intent.error.bg};
      --color-intent-error-border: ${tokens.intent.error.border};
      --color-intent-error-text: ${tokens.intent.error.text};
      
      /* Intent colors - Info */
      --color-intent-info-bg: ${tokens.intent.info.bg};
      --color-intent-info-border: ${tokens.intent.info.border};
      --color-intent-info-text: ${tokens.intent.info.text};
      
      /* Intent colors - Neutral */
      --color-intent-neutral-bg: ${tokens.intent.neutral.bg};
      --color-intent-neutral-border: ${tokens.intent.neutral.border};
      --color-intent-neutral-text: ${tokens.intent.neutral.text};
      
      /* State colors */
      --color-state-success: ${tokens.states.success};
      --color-state-warning: ${tokens.states.warning};
      --color-state-error: ${tokens.states.error};
      --color-state-info: ${tokens.states.info};
      --color-state-disabled: ${tokens.states.disabled};
      --color-state-loading: ${tokens.states.loading};
    }
  `.trim();
}

/**
 * CSS Variable names for intent text colors
 * Use these with Tailwind's arbitrary value syntax
 */
export const INTENT_TEXT_CSS_VARS: Record<ComponentIntent, string> = {
  primary: "var(--color-intent-primary-text)",
  success: "var(--color-intent-success-text)",
  warning: "var(--color-intent-warning-text)",
  error: "var(--color-intent-error-text)",
  info: "var(--color-intent-info-text)",
  neutral: "var(--color-intent-neutral-text)",
} as const;

/**
 * CSS Variable names for intent background colors
 */
export const INTENT_BG_CSS_VARS: Record<ComponentIntent, string> = {
  primary: "var(--color-intent-primary-bg)",
  success: "var(--color-intent-success-bg)",
  warning: "var(--color-intent-warning-bg)",
  error: "var(--color-intent-error-bg)",
  info: "var(--color-intent-info-bg)",
  neutral: "var(--color-intent-neutral-bg)",
} as const;

/**
 * CSS Variable names for intent border colors
 */
export const INTENT_BORDER_CSS_VARS: Record<ComponentIntent, string> = {
  primary: "var(--color-intent-primary-border)",
  success: "var(--color-intent-success-border)",
  warning: "var(--color-intent-warning-border)",
  error: "var(--color-intent-error-border)",
  info: "var(--color-intent-info-border)",
  neutral: "var(--color-intent-neutral-border)",
} as const;

/**
 * Helper function to get intent text color CSS variable
 * Use with Tailwind: `text-[${getIntentTextCSSVar('primary')}]`
 */
export function getIntentTextCSSVar(intent: ComponentIntent): string {
  return INTENT_TEXT_CSS_VARS[intent];
}

/**
 * Helper function to get intent background color CSS variable
 */
export function getIntentBgCSSVar(intent: ComponentIntent): string {
  return INTENT_BG_CSS_VARS[intent];
}

/**
 * Helper function to get intent border color CSS variable
 */
export function getIntentBorderCSSVar(intent: ComponentIntent): string {
  return INTENT_BORDER_CSS_VARS[intent];
}
