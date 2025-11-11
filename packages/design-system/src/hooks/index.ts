/**
 * @module hooks
 *
 * Reusable React hooks for the nEvo design system.
 * These hooks provide common functionality for state management,
 * user interactions, responsive design, and data handling.
 */

export { useDisclosure } from "./useDisclosure";
export type { UseDisclosureReturn } from "./useDisclosure";

export { useKeyPress, useKeyPressMap } from "./useKeyPress";

export { useClickOutside } from "./useClickOutside";

export { useDataSnapshot, usePrevious } from "./useDataSnapshot";

export { useBreakpoint, useWindowSize, BREAKPOINTS } from "./useBreakpoint";
export type { Breakpoint } from "./useBreakpoint";

export { usePagination } from "./usePagination";
export type { PaginationConfig, PaginationState } from "./usePagination";
