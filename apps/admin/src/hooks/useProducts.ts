import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../features/products/types/Product';
import { fetchProducts } from '../services/productsApi';

export function useProducts(filters: Partial<Record<string, any>> = {}) {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async (params = {}) => {
    try {
      if (data === null) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }

      setError(null);
      const res = await fetchProducts(params as any);
      setData(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [data]);

  useEffect(() => {
    load(filters);
  }, [filters, load]);

  const refetch = useCallback(() => load(filters), [load, filters]);

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
  } as const;
}

export default useProducts;
