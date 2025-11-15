import React from "react";
import { clsx } from "clsx";
import { getElevationClasses } from "../theme";

export const Modal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => {
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
        className={clsx(
          "relative w-full max-w-xl rounded-2xl p-4",
          "bg-raised border border-border",
          getElevationClasses("raised")
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-text">
            {title}
          </h2>
          <button
            onClick={onClose}
            className={clsx(
              "px-2 py-1 rounded-lg border",
              "bg-raised border-border",
              "text-text hover:bg-card",
              "transition-colors duration-150"
            )}
            aria-label="Close modal"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};
