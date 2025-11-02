import { Product, ProductStatus } from '../types/Product';

const PRODUCT_STATUSES: ProductStatus[] = [
  'Zrealizowane',
  'W drodze', 
  'W przygotowaniu',
  'Anulowane'
];

const PRODUCT_TAGS = [
  'audio',
  'premium', 
  'bestseller',
  'nevo',
  'nowość'
] as const;

export function generateMockProducts(count: number = 10): Product[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `PRG-${1000 + i}`,
    name: `Produkt ${i + 1}`,
    status: PRODUCT_STATUSES[i % PRODUCT_STATUSES.length]!,
    tags: [
      PRODUCT_TAGS[i % PRODUCT_TAGS.length]!, 
      PRODUCT_TAGS[(i + 2) % PRODUCT_TAGS.length]!
    ].slice(0, 2),
    price: (199 + i * 15).toFixed(2),
    stock: 50 - i * 2,
    updated: `2025-10-${10 + i}`,
  }));
}

export function getMockProducts(): Product[] {
  return generateMockProducts(10);
}