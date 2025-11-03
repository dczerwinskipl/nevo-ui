import { apiClient } from '../shared/api/client';
import type { Product } from '../features/products/types/Product';

export interface ProductsQueryParams {
  search?: string;
  maxPrice?: number;
  status?: string;
  tag?: string;
  sortBy?: keyof Product;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  data: Product[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// New HTTP-based API client function (replaces simple in-memory filtering)
// MSW will intercept these calls in development/preview environments
export async function fetchProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>('/products', { 
    params: {
      ...params,
      page: params.page || 1,
      limit: params.limit || 10
    } 
  });
  return response.data;
}

export default { fetchProducts };
