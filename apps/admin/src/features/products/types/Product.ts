export type ProductStatus =
  | 'completed'
  | 'in_transit'
  | 'preparing'
  | 'cancelled'
  | string;

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
  tags: string[];
  price: string; // formatted price as string (e.g. "199.00")
  stock: number;
  updated: string; // ISO date or human readable
}

export interface ProductFilters {
  search: string;
  category: string;
  price: number | '';
  status: string;
}

export default Product;
