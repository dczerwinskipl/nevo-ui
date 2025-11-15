import { useRef, useEffect } from "react";

/**
 * Hook for detecting clicks outside of a referenced element
 * Useful for dropdowns, modals, popovers, etc.
 *
 * @param handler - Callback function to execute when outside click is detected
 * @param enabled - Whether the listener is active (default: true)
 * @returns Ref to attach to the element
 *
 * @example
 * ```tsx
 * function Dropdown({ onClose }: { onClose: () => void }) {
 *   const ref = useClickOutside<HTMLDivElement>(onClose);
 *
 *   return (
 *     <div ref={ref}>
 *       Dropdown content
 *     </div>
 *   );
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}
