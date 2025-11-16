import { productHandlers } from "./api/products";
import { orderHandlers } from "./api/orders";

export const handlers = [...productHandlers, ...orderHandlers];
