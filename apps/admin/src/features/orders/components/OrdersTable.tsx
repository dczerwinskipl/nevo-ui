import React from "react";
import {
  useTheme,
  Card,
  Table,
  TableColumn,
  TableAction,
  Badge,
  ViewIcon,
  EditIcon,
  DeleteIcon,
  type TablePaginationConfig,
} from "@nevo/design-system";
import { Order } from "../types/Order";
import { getStatusIntent } from "../../../shared/constants/orderStatus";

export interface OrdersTableProps {
  data: Order[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  pagination?: TablePaginationConfig;
}

export function OrdersTable({
  data,
  isLoading = false,
  isFetching = false,
  error,
  onRetry,
  pagination,
}: OrdersTableProps) {
  const { tokens } = useTheme();

  const columns: TableColumn<Order>[] = [
    {
      key: "orderNumber",
      header: "Order #",
      accessor: "orderNumber",
      align: "left",
    },
    {
      key: "customer",
      header: "Customer",
      accessor: "customer",
    },
    {
      key: "email",
      header: "Email",
      accessor: "email",
    },
    {
      key: "status",
      header: "Status",
      accessor: "status",
      render: (value: string) => (
        <Badge intent={getStatusIntent(value)}>{value}</Badge>
      ),
    },
    {
      key: "items",
      header: "Items",
      accessor: "items",
      align: "right",
    },
    {
      key: "total",
      header: "Total",
      accessor: "total",
      render: (value: number) => `$${value.toFixed(2)}`,
      align: "right",
    },
    {
      key: "createdAt",
      header: "Created",
      accessor: "createdAt",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions: TableAction<Order>[] = [
    {
      icon: <ViewIcon />,
      label: "View order details",
      onClick: (order) => console.log("View order:", order.id),
    },
    {
      icon: <EditIcon />,
      label: "Edit order",
      onClick: (order) => console.log("Edit order:", order.id),
    },
    {
      icon: <DeleteIcon />,
      label: "Delete order",
      intent: "error",
      onClick: (order) => console.log("Delete order:", order.id),
    },
  ];

  return (
    <Card>
      <Table
        data={data}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        emptyTitle="No orders found"
        emptyDescription="Try adjusting your filters or search criteria"
        fetchingMessage="Updating orders..."
        {...(pagination && { pagination })}
      />
    </Card>
  );
}
