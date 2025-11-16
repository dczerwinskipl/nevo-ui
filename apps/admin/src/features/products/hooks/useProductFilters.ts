import useFilters from "../../../hooks/useFilters";
import useProducts from "../../../hooks/useProducts";
import type { ProductFilters } from "../types/Product";
import type { FilterConfig } from "../../../hooks/useFilters";

// Filter configuration with options - properly typed for intellisense
const productFilterConfig: FilterConfig<ProductFilters> = {
  search: {
    name: "search",
    label: "Search Products",
    type: "text",
    placeholder: "Name, SKU, description...",
  },
  tag: {
    name: "tag",
    label: "Tag",
    type: "select",
    placeholder: "All Tags",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Premium", value: "premium" },
      { label: "Sale", value: "sale" },
      { label: "New", value: "new" },
    ],
  },
  price: {
    name: "price",
    label: "Maximum Price",
    type: "number",
    placeholder: "Maximum price",
    min: 0,
  },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "All Statuses",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
};

export function useProductFilters(pagination?: {
  page?: number;
  limit?: number;
}) {
  // Define proper initial values that match form expectations
  const initial: ProductFilters = {
    search: "",
    tag: "",
    status: "",
  };

  const {
    filters,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
  } = useFilters(initial, productFilterConfig);

  // Combine filters with pagination params
  const filtersWithPagination = { ...filters, ...pagination };

  // Query hook manages its own loading states and receives applied filters directly
  const {
    data,
    pagination: paginationData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useProducts(filtersWithPagination);

  return {
    data,
    pagination: paginationData,
    error,
    refetch,
    // Filter state and actions
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    // Loading states come from query, not filters
    isLoading,
    isFetching,
    // Config with options
    config: productFilterConfig,
  } as const;
}

export default useProductFilters;
