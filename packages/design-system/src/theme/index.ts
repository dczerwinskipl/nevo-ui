// Export all theme-related exports from a single entry point
export type {
  Tokens,
  ComponentIntent,
  ComponentVariant,
  ComponentSize,
} from "./types";
export { ThemeProvider, useTheme } from "./ThemeProvider";

// Legacy inline style utilities (deprecated - prefer token-driven utilities below)
export {
  cardStyle,
  raisedStyle,
  elevatedStyle,
  concaveStyle,
  getIntentStyle,
} from "./utils";

export { tokens } from "./tokens";

// Token-driven class name utilities (recommended)
export {
  INTENT_VARIANT_CLASSES,
  VARIANT_BASE_CLASSES,
  SIZE_CLASSES,
  INTENT_TEXT_COLORS,
  CSS_VAR_CLASSES,
  getIntentVariantClasses,
  getVariantBaseClasses,
  getSizeClasses,
  getIntentTextColor,
  // Token-driven utilities with intent support
  getTextColor,
  getBgColor,
  getBorderColor,
  getPrimaryColor,
  // Legacy utilities (deprecated)
  getTextColorClass,
  getBgColorClass,
  getBorderClass,
  getCommonPattern,
} from "./classNames";

export {
  generateCSSVariables,
  INTENT_TEXT_CSS_VARS,
  INTENT_BG_CSS_VARS,
  INTENT_BORDER_CSS_VARS,
  getIntentTextCSSVar,
  getIntentBgCSSVar,
  getIntentBorderCSSVar,
} from "./cssVariables";
