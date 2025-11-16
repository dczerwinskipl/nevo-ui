import React from "react";
import { Typography } from "@nevo/design-system";
import { OrdersTable } from "../components/OrdersTable";
import { OrdersFilters } from "../components/OrdersFilters";
import { useOrderFilters } from "../hooks/useOrderFilters";

export function OrdersList() {
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
        <Typography type="section-title">Orders</Typography>
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
    </div>
  );
}
