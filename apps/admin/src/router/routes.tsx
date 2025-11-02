import React from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "./Layout";
import { ProductsList } from "../features/products";
import { ROUTES } from "../shared/constants";

// Simple placeholder components for routes that don't exist yet
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p className="text-gray-600">Dashboard functionality coming soon...</p>
  </div>
);

const Orders = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Orders</h1>
    <p className="text-gray-600">Orders management coming soon...</p>
  </div>
);

const Users = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Users</h1>
    <p className="text-gray-600">User management coming soon...</p>
  </div>
);

const ProductDetail = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
    <p className="text-gray-600">Product detail page coming soon...</p>
  </div>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductsList />,
      },
      {
        path: `${ROUTES.PRODUCTS}/:id`,
        element: <ProductDetail />,
      },
      {
        path: ROUTES.ORDERS,
        element: <Orders />,
      },
      {
        path: ROUTES.USERS,
        element: <Users />,
      },
    ],
  },
];
