import { useEffect } from "react";

/**
 * Hook for handling keyboard events
 * Useful for escape key handling, keyboard shortcuts, etc.
 * 
 * @param key - The keyboard key to listen for (e.g., 'Escape', 'Enter')
 * @param handler - Callback function to execute when key is pressed
 * @param enabled - Whether the listener is active (default: true)
 * 
 * @example
 * ```tsx
 * function Modal({ onClose }: { onClose: () => void }) {
 *   useKeyPress('Escape', onClose);
 *   
 *   return <div>Modal content</div>;
 * }
 * ```
 */
export function useKeyPress(
  key: string,
  handler: (event: KeyboardEvent) => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [key, handler, enabled]);
}

/**
 * Hook for handling multiple keyboard shortcuts
 * 
 * @param handlers - Map of key to handler function
 * @param enabled - Whether the listeners are active (default: true)
 * 
 * @example
 * ```tsx
 * useKeyPressMap({
 *   'Escape': handleEscape,
 *   'Enter': handleSubmit,
 *   'Tab': handleTab,
 * });
 * ```
 */
export function useKeyPressMap(
  handlers: Record<string, (event: KeyboardEvent) => void>,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const handler = handlers[event.key];
      if (handler) {
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlers, enabled]);
}
