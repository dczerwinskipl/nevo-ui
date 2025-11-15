import { faker } from "@faker-js/faker";
import {
  Order,
  OrderFilters,
  OrderStatus,
} from "../../../features/orders/types/Order";

export interface CursorPaginationFilters {
  page: number;
  limit: number;
  search?: string | null;
  status?: string | null;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  hasNext: boolean;
}

function generateOrder(): Omit<Order, "id" | "createdAt" | "updatedAt"> {
  const statuses: OrderStatus[] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const itemCount = faker.number.int({ min: 1, max: 10 });
  const itemPrice = faker.number.float({
    min: 10,
    max: 200,
    fractionDigits: 2,
  });

  return {
    orderNumber: `ORD-${faker.string.alphanumeric({ length: 8, casing: "upper" })}`,
    customer: faker.person.fullName(),
    email: faker.internet.email(),
    total: itemCount * itemPrice,
    status: faker.helpers.arrayElement(statuses),
    items: itemCount,
  };
}

function filterOrders(
  orders: Order[],
  filters: CursorPaginationFilters
): Order[] {
  let filtered = [...orders];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((order) => order.status === filters.status);
  }

  return filtered;
}

// Generate initial orders
const orders = Array.from({ length: 100 }, () => {
  const orderData = generateOrder();
  const createdDate = faker.date.past({ years: 1 });
  const updatedDate = faker.date.between({ from: createdDate, to: new Date() });

  return {
    ...orderData,
    id: faker.string.uuid(),
    createdAt: createdDate.toISOString(),
    updatedAt: updatedDate.toISOString(),
  } as Order;
});

// Sort by createdAt descending (newest first)
orders.sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

export function getOrdersCursor(
  filters: CursorPaginationFilters
): CursorPaginatedResponse<Order> {
  const filteredOrders = filterOrders(orders, filters);

  const startIndex = (filters.page - 1) * filters.limit;

  // N+1 fetch pattern: fetch one extra item to determine hasNext
  const endIndex = startIndex + filters.limit + 1;
  const fetchedData = filteredOrders.slice(startIndex, endIndex);

  // If we got more items than limit, there's a next page
  const hasNext = fetchedData.length > filters.limit;

  // Return only the requested number of items
  const data = fetchedData.slice(0, filters.limit);

  return {
    data,
    page: filters.page,
    limit: filters.limit,
    hasNext,
  };
}

export function getOrder(id: string): Order | null {
  return orders.find((order) => order.id === id) || null;
}
