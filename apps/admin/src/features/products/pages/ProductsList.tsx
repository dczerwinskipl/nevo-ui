import React from "react";
import { Pagination, Typography } from "@nevo/design-system";
import { ProductsActions } from "../components/ProductsActions";
import { ProductsFilters } from "../components/ProductsFilters";
import { ProductsTable } from "../components/ProductsTable";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductsList() {
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
  } = useProductFilters();

  const handleAdd = () => console.log("Add product");
  const handleExport = () => console.log("Export");
  const handleSettings = () => console.log("Settings");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography type="section-title">Produkty</Typography>
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

      {/* Pass data and state as props */}
      <ProductsTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={refetch}
      />

      {/* 
        TODO: Fix pagination total count
        Current: data.length represents filtered results only
        Solution: API should return { data: Product[], totalCount: number } 
        where totalCount is the total number of products before filtering
      */}
      <Pagination total={pagination.totalCount} pageSize={pagination.limit} />
    </div>
  );
}
