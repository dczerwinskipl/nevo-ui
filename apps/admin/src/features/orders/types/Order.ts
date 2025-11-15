export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  items: number;
  createdAt: string;
  updatedAt: string;
}

export type OrderFilters = {
  search?: string;
  status?: string;
};

export default Order;
