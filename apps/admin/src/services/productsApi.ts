import { getMockProducts } from '../features/products/services/mockData';
import type { Product } from '../features/products/types/Product';

export interface ProductsQueryParams {
  search?: string;
  category?: string;
  price?: number | '';
  status?: string;
}

// Simple in-memory filterer using existing mock data.
// Simulates network latency with a Promise + setTimeout.
export async function fetchProducts(params: ProductsQueryParams = {}, delay = 300): Promise<Product[]> {
  const all = getMockProducts();

  const filtered = all.filter((p) => {
    if (params.search && params.search.trim() !== '') {
      const s = params.search.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.id.toLowerCase().includes(s)) return false;
    }

    if (params.status && params.status !== '') {
      if (p.status.toLowerCase() !== String(params.status).toLowerCase()) return false;
    }

    if (params.price !== undefined && params.price !== '' && typeof params.price === 'number') {
      const max = params.price as number;
      if (Number(p.price) > max) return false;
    }

    // category not present in mock product schema; keep placeholder for mapping
    if (params.category && params.category !== '') {
      // If category filtering is required, implement mapping in app-level code.
    }

    return true;
  });

  return new Promise<Product[]>((resolve) => setTimeout(() => resolve(filtered), delay));
}

export default { fetchProducts };
