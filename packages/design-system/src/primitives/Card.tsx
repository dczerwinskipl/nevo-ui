import React from "react";
import { clsx } from "clsx";
import { useTheme, cardStyle } from "../theme/ThemeProvider";

// TODO: TASK-019 - Replace string interpolation with clsx utility for better className merging

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  const { tokens } = useTheme();
  return (
    <div
      {...rest}
      className={clsx("rounded-xl p-4 relative", className)}
      style={{
        ...cardStyle(tokens),
        color: tokens.text,
      }}
    >
      <div className="relative">{children}</div>
    </div>
  );
};
