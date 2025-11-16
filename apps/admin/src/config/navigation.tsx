import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import type { NavigationItem } from "@nevo/design-system";

/**
 * Admin application navigation structure
 *
 * This configuration defines the sidebar navigation for the admin app.
 * Each item can have:
 * - key: Route key for navigation
 * - label: Display text
 * - icon: Optional Lucide icon component
 * - children: Optional nested navigation items
 */
export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    key: "products",
    label: "Products",
    icon: <Package className="w-4 h-4" />,
    children: [{ key: "products", label: "Product List" }],
  },
  {
    key: "orders",
    label: "Orders",
    icon: <ShoppingCart className="w-4 h-4" />,
    children: [{ key: "orders", label: "Order List" }],
  },
  {
    key: "users",
    label: "Users",
    icon: <Users className="w-4 h-4" />,
  },
];
