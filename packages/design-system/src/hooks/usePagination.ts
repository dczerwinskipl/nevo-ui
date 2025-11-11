import { useState, useCallback, useMemo } from "react";

/**
 * Configuration for pagination
 */
export interface PaginationConfig {
  /** Total number of items */
  totalItems: number;
  /** Items per page (default: 10) */
  itemsPerPage?: number;
  /** Initial page (default: 1) */
  initialPage?: number;
}

/**
 * Return type for usePagination hook
 */
export interface PaginationState {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Items per page */
  itemsPerPage: number;
  /** Total number of items */
  totalItems: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Start index for current page (0-indexed) */
  startIndex: number;
  /** End index for current page (0-indexed) */
  endIndex: number;
  /** Go to specific page */
  goToPage: (page: number) => void;
  /** Go to next page */
  nextPage: () => void;
  /** Go to previous page */
  previousPage: () => void;
  /** Reset to first page */
  reset: () => void;
}

/**
 * Hook for managing pagination state
 *
 * @param config - Pagination configuration
 * @returns Pagination state and control functions
 *
 * @example
 * ```tsx
 * function DataTable({ items }: { items: Item[] }) {
 *   const pagination = usePagination({
 *     totalItems: items.length,
 *     itemsPerPage: 10,
 *   });
 *
 *   const displayItems = items.slice(
 *     pagination.startIndex,
 *     pagination.endIndex + 1
 *   );
 *
 *   return (
 *     <>
 *       <Table data={displayItems} />
 *       <Pagination {...pagination} />
 *     </>
 *   );
 * }
 * ```
 */
export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: PaginationConfig): PaginationState {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + itemsPerPage - 1, totalItems - 1),
    [startIndex, itemsPerPage, totalItems]
  );

  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages]
  );

  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    previousPage,
    reset,
  };
}
