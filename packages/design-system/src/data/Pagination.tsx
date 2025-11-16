import React, { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../primitives/Button";
import { Typography } from "../primitives/Typography";
import { Select } from "../primitives/Select";

export type PaginationMode = "pages" | "cursor";

export interface PaginationProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Pagination mode
   * - 'pages': Shows page numbers, requires totalPages
   * - 'cursor': Shows only prev/next, requires hasNext
   * @default 'pages'
   */
  mode?: PaginationMode;

  /**
   * Total number of pages (required for 'pages' mode)
   */
  totalPages?: number;

  /**
   * Whether there is a next page (required for 'cursor' mode)
   */
  hasNext?: boolean;

  /**
   * Total number of items (optional, for displaying "X-Y of Z" text)
   */
  totalItems?: number;

  /**
   * Number of items per page (for calculating range text)
   */
  pageSize?: number;

  /**
   * Text to display before total count
   * @default 'Showing'
   */
  totalText?: string;

  /**
   * Text for previous button aria-label
   * @default 'Go to previous page'
   */
  previousLabel?: string;

  /**
   * Text for next button aria-label
   * @default 'Go to next page'
   */
  nextLabel?: string;

  /**
   * Maximum number of page buttons to show
   * @default 5
   */
  maxPageButtons?: number;

  /**
   * Whether pagination is disabled (during loading)
   */
  disabled?: boolean;

  /**
   * Available page size options for the selector
   * If provided, renders a page size selector
   * @example [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void;

  /**
   * Label for page size selector
   * @default 'Items per page:'
   */
  pageSizeLabel?: string;
}

/**
 * Pagination component for navigating through large datasets.
 * Supports two modes:
 * - 'pages': Traditional pagination with page numbers and total count
 * - 'cursor': Cursor-style pagination with only prev/next buttons
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  mode = "pages",
  totalPages,
  hasNext,
  totalItems,
  pageSize,
  totalText = "Showing",
  previousLabel = "Go to previous page",
  nextLabel = "Go to next page",
  maxPageButtons = 5,
  disabled = false,
  pageSizeOptions,
  onPageSizeChange,
  pageSizeLabel = "Items per page:",
}) => {
  const hasPrevious = currentPage > 1;

  // For pages mode, next is disabled when we reach totalPages
  // For cursor mode, next is disabled when hasNext is false
  const hasNextPage =
    mode === "pages" ? currentPage < (totalPages || 0) : hasNext;

  const handlePrevious = useCallback(() => {
    if (hasPrevious && !disabled) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, hasPrevious, disabled, onPageChange]);

  const handleNext = useCallback(() => {
    if (hasNextPage && !disabled) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, hasNextPage, disabled, onPageChange]);

  const handlePageClick = useCallback(
    (page: number) => {
      if (!disabled && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, disabled, onPageChange]
  );

  // Calculate which page buttons to show
  const getPageNumbers = (): number[] => {
    if (!totalPages) return [];

    const pages: number[] = [];
    const maxButtons = Math.min(maxPageButtons, totalPages);

    // Calculate start and end of page range
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Calculate range text for pages mode
  const getRangeText = (): string | null => {
    if (!totalItems || !pageSize) return null;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    return `${totalText} ${start}-${end} of ${totalItems}`;
  };

  const pageNumbers = mode === "pages" ? getPageNumbers() : [];
  const rangeText = mode === "pages" ? getRangeText() : null;

  const handlePageSizeChange = useCallback(
    (value: string | number) => {
      if (onPageSizeChange) {
        onPageSizeChange(Number(value));
      }
    },
    [onPageSizeChange]
  );

  return (
    <nav
      className="flex items-center justify-between mt-4"
      aria-label="Pagination navigation"
    >
      {/* Left side: Range text or page indicator + page size selector */}
      <div className="flex items-center gap-4">
        <div>
          {mode === "pages" && rangeText && (
            <Typography type="caption" className="text-muted">
              {rangeText}
            </Typography>
          )}
          {mode === "cursor" && (
            <Typography type="caption" className="text-muted">
              Page {currentPage}
            </Typography>
          )}
        </div>

        {/* Page size selector - optional */}
        {pageSizeOptions && onPageSizeChange && pageSize && (
          <div className="flex items-center gap-2">
            <Typography type="caption" className="text-muted">
              {pageSizeLabel}
            </Typography>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              disabled={disabled}
              options={pageSizeOptions.map((size) => ({
                value: size,
                label: String(size),
              }))}
              className="w-20"
            />
          </div>
        )}
      </div>

      {/* Right side: Navigation buttons */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          onClick={handlePrevious}
          disabled={!hasPrevious || disabled}
          variant="outline"
          size="sm"
          aria-label={previousLabel}
          aria-disabled={!hasPrevious || disabled}
        >
          <ChevronLeft size={16} />
        </Button>

        {/* Page number buttons (pages mode only) */}
        {mode === "pages" &&
          pageNumbers.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={disabled}
              intent={page === currentPage ? "primary" : "neutral"}
              variant={page === currentPage ? "solid" : "outline"}
              size="sm"
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          ))}

        {/* Next button */}
        <Button
          onClick={handleNext}
          disabled={!hasNextPage || disabled}
          variant="outline"
          size="sm"
          aria-label={nextLabel}
          aria-disabled={!hasNextPage || disabled}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </nav>
  );
};
