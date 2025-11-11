import { useState, useCallback } from "react";

/**
 * Hook for managing boolean state (open/closed, visible/hidden, etc.)
 * Common use cases: modals, dropdowns, accordions, sidebars
 *
 * @param initialState - Initial boolean state (default: false)
 * @returns Object with isOpen state and control functions
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDisclosure();
 *
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle Modal</button>
 *     {isOpen && <Modal onClose={close}>Content</Modal>}
 *   </>
 * );
 * ```
 */
export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (value: boolean) => void;
}

export function useDisclosure(initialState = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const set = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, open, close, toggle, set };
}
