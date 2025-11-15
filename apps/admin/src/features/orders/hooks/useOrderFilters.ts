import { useState, useEffect } from "react";
import useFilters from "../../../hooks/useFilters";
import useOrders from "../../../hooks/useOrders";
import type { OrderFilters } from "../types/Order";
import type { FilterConfig } from "../../../hooks/useFilters";

// Filter configuration with options
const orderFilterConfig: FilterConfig<OrderFilters> = {
  search: {
    name: "search",
    label: "Search Orders",
    type: "text",
    placeholder: "Order number, customer, email...",
  },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "All Statuses",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
};

export function useOrderFilters() {
  const [currentPage, setCurrentPage] = useState(1);

  // Define initial values
  const initial: OrderFilters = {
    search: "",
    status: "",
  };

  const {
    filters: appliedFilters,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
  } = useFilters(initial, orderFilterConfig);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters.search, appliedFilters.status]);

  // Transform filters for API (cursor pagination)
  const filtersWithPagination = {
    page: currentPage,
    limit: 10,
    ...(appliedFilters.search && { search: appliedFilters.search }),
    ...(appliedFilters.status && { status: appliedFilters.status }),
  };

  const { data, hasNext, page, limit, isLoading, isFetching, error, refetch } =
    useOrders(filtersWithPagination);

  return {
    data,
    hasNext,
    page,
    limit,
    error,
    refetch,
    isLoading,
    isFetching,
    currentPage,
    setCurrentPage,
    // Filter state
    pendingFilters,
    appliedFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    config: orderFilterConfig,
  };
}
