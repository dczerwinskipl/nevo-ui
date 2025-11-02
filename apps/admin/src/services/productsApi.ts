import { getMockProducts } from '../features/products/services/mockData';
import type { Product } from '../features/products/types/Product';

export interface ProductsQueryParams {
  search?: string;
  tag?: string;
  price?: number;
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

    if (params.price !== undefined && typeof params.price === 'number' && params.price > 0) {
      const max = params.price;
      if (Number(p.price) > max) return false;
    }

    // tag filtering - check if product has the specified tag
    if (params.tag && params.tag !== '') {
      if (!p.tags.includes(params.tag)) return false;
    }

    return true;
  });

  return new Promise<Product[]>((resolve) => setTimeout(() => resolve(filtered), delay));
}

export default { fetchProducts };
