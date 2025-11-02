import React from "react";
import { useTheme, elevatedStyle } from "../theme/ThemeProvider";

export const Modal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => {
  const { tokens } = useTheme();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-xl rounded-2xl p-4"
        style={{
          ...elevatedStyle(tokens),
          boxShadow: `${
            elevatedStyle(tokens).boxShadow
          }, 0 10px 20px rgba(0,0,0,.35)`,
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg"
            style={{
              background: tokens.raised,
              border: `1px solid ${tokens.border}`,
            }}
          >
            ✕
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};
