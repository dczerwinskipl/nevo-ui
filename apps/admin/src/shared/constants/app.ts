// Application-wide routes
export const ROUTES = {
  DASHBOARD: "dashboard",
  PRODUCTS: "products",
  PRODUCTS_PAGINATED: "products-paginated",
  ORDERS: "orders",
  ORDERS_CURSOR: "orders-cursor",
  USERS: "users",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

// Common application constants
export const APP_CONFIG = {
  NAME: "nEvo Ecommerce Admin",
  VERSION: "1.0.0",
  DEFAULT_PAGE_SIZE: 25,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;
