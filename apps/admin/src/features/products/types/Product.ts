export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  category: string;
  sku: string;
  stock: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProductFilters = {
  search?: string;
  tag?: string;
  price?: number;
  status?: string;
};

export default Product;
