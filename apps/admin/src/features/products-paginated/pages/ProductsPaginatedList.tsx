import React, { useState } from "react";
import { Typography } from "@nevo/design-system";
import { useProductsPaginated } from "../hooks/useProductsPaginated";
import { ProductsActions } from "../../products/components/ProductsActions";
import { ProductsFilters } from "../../products/components/ProductsFilters";
import { ProductsTable } from "../../products/components/ProductsTable";

export function ProductsPaginatedList() {
  const [pageSize, setPageSize] = useState(10);

  // Container component uses the hook and manages all state
  const {
    data,
    pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    config,
    currentPage,
    setCurrentPage,
  } = useProductsPaginated(pageSize);

  const handleAdd = () => console.log("Add product");
  const handleExport = () => console.log("Export");
  const handleSettings = () => console.log("Settings");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Typography type="section-title">
            Products (Paginated - Page-based Mode)
          </Typography>
          <Typography type="caption" className="text-muted mt-1">
            Traditional pagination with page numbers and total count
          </Typography>
        </div>
        <ProductsActions
          onAdd={handleAdd}
          onExport={handleExport}
          onSettings={handleSettings}
        />
      </div>

      {/* Pass filter state and handlers as props */}
      <ProductsFilters
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

      {/* Pass data, state, and pagination as props */}
      <ProductsTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={refetch}
        pagination={{
          currentPage,
          onPageChange: setCurrentPage,
          mode: "pages",
          totalPages: pagination.totalPages,
          totalItems: pagination.totalCount,
          pageSize,
          disabled: isFetching,
          pageSizeOptions: [10, 20, 50],
          onPageSizeChange: (newSize: number) => {
            setPageSize(newSize);
            setCurrentPage(1); // Reset to page 1 when changing page size
          },
        }}
      />
    </div>
  );
}
