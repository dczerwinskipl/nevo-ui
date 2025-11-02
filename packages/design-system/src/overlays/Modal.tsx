import React from "react";
import { useTheme, elevatedStyle } from "../theme";

export const Modal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => {
  const { tokens } = useTheme();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close modal overlay"
      />
      <div
        className="relative w-full max-w-xl rounded-2xl p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          ...elevatedStyle(tokens),
          boxShadow: `${
            elevatedStyle(tokens).boxShadow
          }, 0 10px 20px rgba(0,0,0,.35)`,
        }}
      >
        <div className="flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg"
            aria-label="Close modal"
            type="button"
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
