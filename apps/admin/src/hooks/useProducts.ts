import { useQuery } from '@tanstack/react-query';
import type { Product, ProductFilters } from '../features/products/types/Product';
import { fetchProducts, type ProductsQueryParams } from '../services/productsApi';

// API simulation delay constant
const API_SIMULATION_DELAY_MS = 2000;

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
    apiParams.price = filters.price;
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
    queryFn: async () => {
      const result = await fetchProducts(apiParams, API_SIMULATION_DELAY_MS);
      return result;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
  } as const;
}

export default useProducts;
