import { useState, useEffect } from "react";
import useFilters from "../../../hooks/useFilters";
import useProducts from "../../../hooks/useProducts";
import type { ProductFilters } from "../../products/types/Product";
import type { FilterConfig } from "../../../hooks/useFilters";

// Reuse the same filter configuration from products
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

export function useProductsPaginated(pageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

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

  // Add page and limit to filters for API call
  const filtersWithPagination = {
    ...filters,
    page: currentPage,
    limit: pageSize,
  };

  // Query hook manages its own loading states and receives applied filters directly
  const { data, pagination, isLoading, isFetching, error, refetch } =
    useProducts(filtersWithPagination);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.tag, filters.status, filters.price]);

  // Reset to page 1 when page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  return {
    data,
    pagination,
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
    // Pagination state
    currentPage,
    setCurrentPage,
  } as const;
}

export default useProductsPaginated;
