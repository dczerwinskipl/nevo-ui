import React from "react";
import {
  useTheme,
  Card,
  Table,
  TableColumn,
  TableAction,
  Badge,
} from "@nevo/design-system";
import { Product } from "../types/Product";
import { getStatusIntent } from "../../../shared/constants/orderStatus";

export interface ProductsTableProps {
  data: Product[];
}

export function ProductsTable({ data }: ProductsTableProps) {
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
      render: (value: string) => `${value} zł`,
      align: "right",
    },
    {
      key: "stock",
      header: "Magazyn",
      accessor: "stock",
      align: "right",
    },
    {
      key: "updated",
      header: "Ost. modyfikacja",
      accessor: "updated",
    },
  ];

  const actions: TableAction<Product>[] = [
    {
      icon: <span>👁</span>,
      label: "Podgląd",
      intent: "neutral",
      variant: "ghost",
      onClick: (product: Product) => console.log("View:", product),
    },
    {
      icon: <span>✏️</span>,
      label: "Edytuj",
      intent: "neutral",
      variant: "ghost",
      onClick: (product: Product) => console.log("Edit:", product),
    },
    {
      icon: <span>🗑</span>,
      label: "Usuń",
      intent: "error",
      variant: "ghost",
      onClick: (product: Product) => console.log("Delete:", product),
    },
  ];

  return (
    <Card className="p-0 overflow-hidden">
      <Table data={data} columns={columns} actions={actions} />
    </Card>
  );
}
