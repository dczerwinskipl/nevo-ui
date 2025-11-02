import React from "react";
import {
  useTheme,
  getIntentStyle,
  ComponentIntent,
  ComponentVariant,
} from "../theme/ThemeProvider";

export type BadgeIntent = ComponentIntent;
export type BadgeVariant = ComponentVariant;

export interface BadgeProps {
  intent?: BadgeIntent;
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  intent = "neutral",
  variant = "subtle",
  children,
}) => {
  const { tokens } = useTheme();
  const style = getIntentStyle(tokens, intent, variant);

  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-medium inline-block"
      style={{
        background: style.background,
        border: style.border,
        color: style.color,
      }}
    >
      {children}
    </span>
  );
};
