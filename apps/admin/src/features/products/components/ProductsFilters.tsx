import React from "react";
import { Card, Filters } from "@nevo/design-system";
import type { ProductFilters } from "../types/Product";
import type { FilterConfig } from "../../../hooks/useFilters";

export interface ProductsFiltersProps {
  filters: ProductFilters;
  config: FilterConfig<ProductFilters>;
  onUpdateFilter: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isDirty?: boolean;
  hasAppliedFilters?: boolean;
}

export function ProductsFilters({
  filters,
  config,
  onUpdateFilter,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
  isFetching = false,
  isDirty = false,
  hasAppliedFilters = false,
}: ProductsFiltersProps) {
  return (
    <Card>
      <Filters<ProductFilters>
        filters={filters}
        config={config}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isLoading={isLoading}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasAppliedFilters}
        applyLabel="Apply"
        clearLabel="Clear"
      />
    </Card>
  );
}

export default ProductsFilters;
