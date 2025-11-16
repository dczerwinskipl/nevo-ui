import React, { useState } from "react";
import { Typography } from "@nevo/design-system";
import { ProductsActions } from "../components/ProductsActions";
import { ProductsFilters } from "../components/ProductsFilters";
import { ProductsTable } from "../components/ProductsTable";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductsList() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
  } = useProductFilters({ page: currentPage, limit: pageSize });

  const handleAdd = () => console.log("Add product");
  const handleExport = () => console.log("Export");
  const handleSettings = () => console.log("Settings");

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to page 1 when changing page size
  };

  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to page 1 when applying filters
    applyFilters();
  };

  const handleClearFilters = () => {
    setCurrentPage(1); // Reset to page 1 when clearing filters
    clearFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography type="section-title">Products</Typography>
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
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
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
          onPageChange: handlePageChange,
          mode: "pages",
          totalPages: pagination.totalPages,
          totalItems: pagination.totalCount,
          pageSize,
          disabled: isFetching,
          pageSizeOptions: [10, 20, 50],
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </div>
  );
}
