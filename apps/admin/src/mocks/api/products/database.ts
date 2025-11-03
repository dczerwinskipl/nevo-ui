import { faker } from '@faker-js/faker';
import { createInMemoryDatabase, BaseEntity, PaginatedResponse } from '../../shared/InMemoryDatabase';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  status: 'active' | 'inactive' | 'draft';
  category: string;
  sku: string;
  stock: number;
  tags: string[];
}

export interface ProductFilters {
  page: number;
  limit: number;
  search?: string | null;
  status?: string | null;
  tag?: string | null;
  maxPrice?: number | null;
}

// Re-export for convenience
export type { PaginatedResponse };

function generateProduct(): Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Automotive', 'Health'];
  const statuses: Product['status'][] = ['active', 'inactive', 'draft'];
  const tags = ['bestseller', 'new', 'sale', 'premium', 'eco-friendly', 'limited'];
  
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 2000, dec: 2 })),
    status: faker.helpers.arrayElement(statuses),
    category: faker.helpers.arrayElement(categories),
    sku: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
    stock: faker.number.int({ min: 0, max: 100 }),
    tags: faker.helpers.arrayElements(tags, { min: 1, max: 3 })
  };
}

function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  let filtered = products;

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }

  // Apply status filter
  if (filters.status) {
    filtered = filtered.filter(product => product.status === filters.status);
  }

  // Apply tag filter
  if (filters.tag) {
    filtered = filtered.filter(product => product.tags.includes(filters.tag!));
  }

  // Apply max price filter
  if (filters.maxPrice && filters.maxPrice > 0) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice!);
  }

  return filtered;
}

export function createProductDatabase() {
  // Generate initial data
  const products = Array.from({ length: 50 }, () => {
    const productData = generateProduct();
    const createdDate = faker.date.past({ years: 2 });
    const updatedDate = faker.date.between({ from: createdDate, to: new Date() });
    
    return {
      ...productData,
      id: faker.string.uuid(),
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString()
    } as Product;
  });

  const database = createInMemoryDatabase<Product, ProductFilters>({
    filterEntities: filterProducts,
    generateId: () => faker.string.uuid(),
    initialData: products
  });

  return {
    getProducts: database.getEntities,
    getProduct: database.getEntity,
    createProduct: database.createEntity,
    updateProduct: database.updateEntity,
    deleteProduct: database.deleteEntity,
    seed: database.seed
  };
}