import React from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "./Layout";
import { ProductsList } from "../features/products";
import { OrdersList } from "../features/orders";

// Simple placeholder components for routes that don't exist yet
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p className="text-gray-600">Dashboard functionality coming soon...</p>
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <ProductsList />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/orders",
        element: <OrdersList />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
];
