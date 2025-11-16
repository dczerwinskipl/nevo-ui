import { useState, useEffect } from "react";
import useOrders from "../../../hooks/useOrders";
import type { OrderFilters } from "../types/Order";

export function useOrdersCursor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtersWithPagination: Record<string, string | number> = {
    page: currentPage,
    limit: 10,
  };

  if (search) {
    filtersWithPagination.search = search;
  }
  if (status) {
    filtersWithPagination.status = status;
  }

  const { data, hasNext, page, limit, isLoading, isFetching, error, refetch } =
    useOrders(filtersWithPagination);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

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
    search,
    setSearch,
    status,
    setStatus,
  } as const;
}

export default useOrdersCursor;
