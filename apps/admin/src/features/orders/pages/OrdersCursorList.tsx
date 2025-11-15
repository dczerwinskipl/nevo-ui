import React from "react";
import { Typography } from "@nevo/design-system";
import { OrdersTable } from "../components/OrdersTable";
import { OrdersFilters } from "../components/OrdersFilters";
import { useOrderFilters } from "../hooks/useOrderFilters";

export function OrdersCursorList() {
  const {
    data,
    hasNext,
    page,
    limit,
    isLoading,
    isFetching,
    error,
    refetch,
    currentPage,
    setCurrentPage,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    config,
  } = useOrderFilters();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Typography type="section-title">
            Orders (Cursor Pagination)
          </Typography>
          <Typography type="caption" className="text-muted mt-1">
            Cursor-style pagination with hasNext only - efficient for large
            datasets
          </Typography>
        </div>
      </div>

      {/* Filters using design system component */}
      <OrdersFilters
        filters={pendingFilters}
        config={config}
        onUpdateFilter={updateFilter}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        isLoading={isLoading}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasAppliedFilters}
      />

      {/* Orders table with cursor pagination */}
      <OrdersTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={refetch}
        pagination={{
          currentPage,
          onPageChange: setCurrentPage,
          mode: "cursor",
          hasNext,
          disabled: isFetching,
        }}
      />

      {/* Info box explaining cursor pagination */}
      <div className="mt-4 p-4 bg-card border border-border rounded-lg">
        <Typography type="subtitle" className="mb-2">
          About Cursor Pagination
        </Typography>
        <Typography type="body" className="text-muted">
          This page demonstrates cursor-style pagination where the backend
          fetches <strong>N+1</strong> records (e.g., 11 items when limit is
          10). If more items are returned than requested, we know there's a next
          page. This approach is more efficient for large datasets because it
          doesn't require counting total records.
        </Typography>
      </div>
    </div>
  );
}
