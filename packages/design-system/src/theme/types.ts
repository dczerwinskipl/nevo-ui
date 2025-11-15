// Intent and variant types
export type ComponentIntent =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type ComponentVariant = "solid" | "outline" | "ghost" | "subtle";
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

// Simplified tokens structure - only core design system values
export type Tokens = {
  // Surface elevation scale (like Material Design)
  // Lower numbers = deeper/darker, higher numbers = elevated/lighter
  surface: {
    50: string; // Deepest - page background
    100: string; // Very low elevation
    200: string; // Low elevation - default cards
    300: string; // Medium-low elevation
    400: string; // Medium elevation
    500: string; // Medium-high elevation - elevated cards
    600: string; // High elevation
    700: string; // Very high elevation - raised elements (headers, toolbars)
    800: string; // Highest elevation
    900: string; // Peak elevation
  };

  // Legacy aliases for backward compatibility (will be deprecated)
  page: string; // = surface.50
  card: string; // = surface.200
  raised: string; // = surface.700

  // Gradients for depth and elevation (auto-generated from surface scale)
  gradients: {
    card: string; // gradient for card backgrounds
    raised: string; // gradient for raised elements (headers, highlighted sections)
    input: string; // gradient for input backgrounds (inset effect)
  };

  // Text colors
  text: string; // primary text
  muted: string; // secondary text
  border: string; // borders and dividers

  // Primary brand colors
  primary: {
    base: string; // #6d6aff
    gradient: string; // linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)
    hover: string; // #8a5cff
  };

  // Shadow colors for elevation functions
  shadow: {
    color: string; // main shadow color (legacy)
    highlight: string; // inner highlight color for elevation effects
    // Dedicated shadow colors for different elevation levels
    inset?: string; // shadow for inset/recessed elements
    card?: string; // shadow for default cards
    elevated?: string; // shadow for medium elevation
    raised?: string; // shadow for highest elevation
  };

  // Intent-based semantic colors - core design tokens only
  intent: {
    primary: { bg: string; border: string; text: string };
    success: { bg: string; border: string; text: string };
    warning: { bg: string; border: string; text: string };
    error: { bg: string; border: string; text: string };
    info: { bg: string; border: string; text: string };
    neutral: { bg: string; border: string; text: string };
  };

  // Semantic state colors - simplified
  states: {
    success: string;
    warning: string;
    error: string;
    info: string;
    disabled: string;
    loading: string;
  };
};
