import { useQuery } from "@tanstack/react-query";
import type { Order, OrderFilters } from "../features/orders/types/Order";
import {
  fetchOrders,
  type OrdersQueryParams,
  type OrdersCursorResponse,
} from "../services/ordersApi";

export interface OrderFiltersWithPagination extends OrderFilters {
  page?: number;
  limit?: number;
}

export function useOrders(filters: OrderFiltersWithPagination = {}) {
  // Transform OrderFilters to OrdersQueryParams
  const apiParams: OrdersQueryParams = {};

  if (filters.search) {
    apiParams.search = filters.search;
  }
  if (filters.status) {
    apiParams.status = filters.status;
  }
  if (filters.page !== undefined) {
    apiParams.page = filters.page;
  }
  if (filters.limit !== undefined) {
    apiParams.limit = filters.limit;
  }

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["orders", apiParams],
    queryFn: () => fetchOrders(apiParams),
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  return {
    data: data?.data ?? [],
    hasNext: data?.hasNext ?? false,
    page: data?.page ?? 1,
    limit: data?.limit ?? 10,
    isLoading,
    isFetching,
    error,
    refetch,
  } as const;
}

export default useOrders;
