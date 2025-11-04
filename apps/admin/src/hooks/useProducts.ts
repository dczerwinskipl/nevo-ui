import { useQuery } from '@tanstack/react-query';
import type { Product, ProductFilters } from '../features/products/types/Product';
import { fetchProducts, type ProductsQueryParams, type ProductsResponse } from '../services/productsApi';

export function useProducts(filters: ProductFilters = {}) {
  // Transform ProductFilters to ProductsQueryParams
  const apiParams: ProductsQueryParams = {};
  
  if (filters.search) {
    apiParams.search = filters.search;
  }
  if (filters.tag) {
    apiParams.tag = filters.tag;
  }
  if (filters.price !== undefined) {
    apiParams.maxPrice = filters.price;
  }
  if (filters.status) {
    apiParams.status = filters.status;
  }

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', apiParams],
    queryFn: () => fetchProducts(apiParams),
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  return {
    data: data?.data ?? [],
    pagination: {
      totalCount: data?.totalCount ?? 0,
      page: data?.page ?? 1,
      limit: data?.limit ?? 10,
      totalPages: data?.totalPages ?? 0
    },
    isLoading,
    isFetching,
    error,
    refetch,
  } as const;
}

export default useProducts;
