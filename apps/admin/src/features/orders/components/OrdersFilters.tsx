import React from "react";
import { Card, Filters } from "@nevo/design-system";
import type { OrderFilters } from "../types/Order";
import type { FilterConfig } from "../../../hooks/useFilters";

export interface OrdersFiltersProps {
  filters: OrderFilters;
  config: FilterConfig<OrderFilters>;
  onUpdateFilter: <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K]
  ) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isDirty?: boolean;
  hasAppliedFilters?: boolean;
}

export function OrdersFilters({
  filters,
  config,
  onUpdateFilter,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
  isFetching = false,
  isDirty = false,
  hasAppliedFilters = false,
}: OrdersFiltersProps) {
  return (
    <Card>
      <Filters<OrderFilters>
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

export default OrdersFilters;
