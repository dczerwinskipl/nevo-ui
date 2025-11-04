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
} from "@nevo/design-system";
import { Product } from "../types/Product";
import { getStatusIntent } from "../../../shared/constants/orderStatus";

export interface ProductsTableProps {
  data: Product[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function ProductsTable({
  data,
  isLoading = false,
  isFetching = false,
  error,
  onRetry,
}: ProductsTableProps) {
  const { tokens } = useTheme();

  const columns: TableColumn<Product>[] = [
    {
      key: "id",
      header: "ID",
      accessor: "id",
      align: "left",
    },
    {
      key: "name",
      header: "Nazwa",
      accessor: "name",
    },
    {
      key: "category",
      header: "Kategoria",
      accessor: "category",
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
      key: "tags",
      header: "Tagi",
      accessor: "tags",
      render: (tags: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md border"
              style={{
                borderColor: tokens.border,
                background: tokens.raised,
                color: tokens.muted,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "price",
      header: "Cena",
      accessor: "price",
      render: (value: number) => `${value.toFixed(2)} zł`,
      align: "right",
    },
    {
      key: "stock",
      header: "Magazyn",
      accessor: "stock",
      align: "right",
    },
    {
      key: "updatedAt",
      header: "Ost. modyfikacja",
      accessor: "updatedAt",
      render: (value: string) => new Date(value).toLocaleDateString("pl-PL"),
    },
  ];

  const actions: TableAction<Product>[] = [
    {
      icon: <ViewIcon />,
      label: "Podgląd",
      intent: "neutral",
      variant: "ghost",
      onClick: (product: Product) => console.log("View:", product),
    },
    {
      icon: <EditIcon />,
      label: "Edytuj",
      intent: "neutral",
      variant: "ghost",
      onClick: (product: Product) => console.log("Edit:", product),
    },
    {
      icon: <DeleteIcon />,
      label: "Usuń",
      intent: "error",
      variant: "ghost",
      onClick: (product: Product) => console.log("Delete:", product),
    },
  ];

  return (
    <Card className="p-0 overflow-hidden">
      <Table
        data={data}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        emptyTitle="No products found"
        emptyDescription="Try adjusting your filters or search criteria"
        fetchingMessage="Updating products..."
      />
    </Card>
  );
}
