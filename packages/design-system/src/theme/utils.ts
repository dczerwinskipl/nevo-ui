import type { Tokens, ComponentIntent, ComponentVariant } from './types';

// Color utilities
function lighten(color: string, amount: number) {
  const { r, g, b } = hexToRgb(color);
  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));
  return `rgb(${newR}, ${newG}, ${newB})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

// Helper functions for creating elevation styles using theme tokens
export function cardStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.card, 0.02)} 0%, ${
      tokens.card
    } 100%)`,
    boxShadow: `${tokens.shadow.sm}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function raisedStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.raised, 0.03)} 0%, ${
      tokens.raised
    } 100%)`,
    boxShadow: `${tokens.shadow.md}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function elevatedStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.raised, 0.05)} 0%, ${
      tokens.raised
    } 100%)`,
    boxShadow: `${tokens.shadow.lg}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function concaveStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(145deg, ${tokens.page} 0%, ${tokens.card} 100%)`,
    border: `1px solid ${tokens.border}`,
    boxShadow: `inset 2px 2px 4px ${
      tokens.shadow.sm.split(",")[0]
    }, inset -1px -1px 2px rgba(255,255,255,0.05)`,
  };
}

// Intent variant helpers - transform bg/border/text into different variants
export function getIntentStyle(
  tokens: Tokens,
  intent: ComponentIntent,
  variant: ComponentVariant = "subtle"
) {
  const intentColors = tokens.intent[intent];

  switch (variant) {
    case "solid":
      return {
        background: intentColors.text, // Use text color as solid background
        color: tokens.page, // Contrasting text (page background)
        border: `1px solid ${intentColors.text}`,
      };
    case "outline":
      return {
        background: "transparent",
        color: intentColors.text,
        border: `1px solid ${intentColors.border}`,
      };
    case "ghost":
      return {
        background: "transparent",
        color: intentColors.text,
        border: "1px solid transparent",
      };
    case "subtle":
    default:
      return {
        background: intentColors.bg,
        color: intentColors.text,
        border: `1px solid ${intentColors.border}`,
      };
  }
}