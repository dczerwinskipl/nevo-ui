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
  // 3-layer background system
  page: string; // deepest background
  card: string; // middle layer - cards, panels
  raised: string; // top layer - buttons, inputs, highlighted elements

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
    color: string; // main shadow color
    highlight: string; // inner highlight color for elevation effects
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