import { apiClient } from "../shared/api/client";
import type { Order } from "../features/orders/types/Order";

export interface OrdersQueryParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface OrdersCursorResponse {
  data: Order[];
  page: number;
  limit: number;
  hasNext: boolean;
}

// HTTP-based API client function for cursor pagination
// MSW will intercept these calls in development/preview environments
export async function fetchOrders(
  params: OrdersQueryParams = {}
): Promise<OrdersCursorResponse> {
  const response = await apiClient.get<OrdersCursorResponse>("/orders", {
    params: {
      ...params,
      page: params.page || 1,
      limit: params.limit || 10,
    },
  });
  return response.data;
}

export default { fetchOrders };
