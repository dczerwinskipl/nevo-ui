import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { TableColumn, TableAction } from "./types";
import { Eye, Edit, Trash2, Package, MoreVertical } from "lucide-react";
import { Badge } from "../../primitives/Badge";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "discontinued";
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1299.99,
    stock: 42,
    status: "active",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 29.99,
    stock: 150,
    status: "active",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 89.99,
    stock: 0,
    status: "inactive",
  },
  {
    id: 4,
    name: "USB-C Hub",
    category: "Electronics",
    price: 49.99,
    stock: 89,
    status: "active",
  },
  {
    id: 5,
    name: 'Monitor 27"',
    category: "Electronics",
    price: 399.99,
    stock: 23,
    status: "discontinued",
  },
];

const columns: TableColumn<Product>[] = [
  {
    key: "name",
    header: "Product Name",
    accessor: "name",
    sortable: true,
  },
  {
    key: "category",
    header: "Category",
    accessor: "category",
    sortable: true,
  },
  {
    key: "price",
    header: "Price",
    accessor: "price",
    align: "right",
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    key: "stock",
    header: "Stock",
    accessor: "stock",
    align: "right",
    render: (value) => {
      if (value === 0) {
        return <Badge intent="error">Out of Stock</Badge>;
      } else if (value < 30) {
        return <Badge intent="warning">{value}</Badge>;
      }
      return <Badge intent="success">{value}</Badge>;
    },
  },
  {
    key: "status",
    header: "Status",
    accessor: "status",
    render: (value) => {
      const intentMap = {
        active: "success" as const,
        inactive: "warning" as const,
        discontinued: "error" as const,
      };
      return (
        <Badge intent={intentMap[value as keyof typeof intentMap]}>
          {value}
        </Badge>
      );
    },
  },
];

const actions: TableAction<Product>[] = [
  {
    icon: <Eye className="w-4 h-4" />,
    label: "View",
    intent: "primary",
    onClick: (row) => {
      // View action
      alert(`View: ${row.name}`);
    },
  },
  {
    icon: <Edit className="w-4 h-4" />,
    label: "Edit",
    intent: "neutral",
    onClick: (row) => {
      // Edit action
      alert(`Edit: ${row.name}`);
    },
  },
  {
    icon: <Trash2 className="w-4 h-4" />,
    label: "Delete",
    intent: "error",
    onClick: (row) => {
      // Delete action
      alert(`Delete: ${row.name}`);
    },
  },
];

const meta: Meta<typeof Table<Product>> = {
  title: "Data/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic Table component with built-in loading, empty, and error states. Supports data persistence during loading for smooth UX during filter operations.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table<Product>>;

export const Default: Story = {
  args: {
    data: sampleProducts,
    columns,
  },
};

export const WithActions: Story = {
  args: {
    data: sampleProducts,
    columns,
    actions,
  },
};

export const WithRowClick: Story = {
  args: {
    data: sampleProducts,
    columns,
    onRowClick: (row) => {
      alert(`Clicked on ${row.name}`);
    },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    isLoading: true,
    skeletonRows: 5,
  },
};

export const LoadingWithSnapshot: Story = {
  render: function LoadingWithSnapshotTable() {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div>
        <button
          onClick={handleRefresh}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Simulate Loading
        </button>
        <Table
          data={sampleProducts}
          columns={columns}
          actions={actions}
          isLoading={isLoading}
          fetchingMessage="Refreshing data..."
        />
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    isLoading: false,
    emptyTitle: "No products found",
    emptyDescription: "Get started by adding your first product.",
    emptyIcon: <Package className="w-12 h-12" />,
  },
};

export const ErrorState: Story = {
  args: {
    data: [],
    columns,
    error: { message: "Failed to fetch products" } as Error,
    onRetry: () => {
      alert("Retrying...");
    },
  },
};

export const CustomEmptyState: Story = {
  args: {
    data: [],
    columns,
    emptyTitle: "Your product catalog is empty",
    emptyDescription:
      "Start building your inventory by adding products to your catalog.",
    emptyIcon: <Package className="w-16 h-16" />,
  },
};

export const SmallDataset: Story = {
  args: {
    data: sampleProducts.slice(0, 2),
    columns,
    actions,
  },
};

export const LargeDataset: Story = {
  render: () => {
    const categories = ["Electronics", "Accessories", "Furniture"];
    const statuses: Array<"active" | "inactive" | "discontinued"> = [
      "active",
      "inactive",
      "discontinued",
    ];

    const largeDataset: Product[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      category: categories[i % 3] || "Electronics",
      price: Math.random() * 1000,
      stock: Math.floor(Math.random() * 200),
      status: statuses[i % 3] || "active",
    }));

    return (
      <Table
        data={largeDataset}
        columns={columns}
        actions={actions}
        keyExtractor={(row) => row.id.toString()}
      />
    );
  },
};

export const MinimalColumns: Story = {
  args: {
    data: sampleProducts,
    columns: [
      { key: "name", header: "Name", accessor: "name" },
      {
        key: "price",
        header: "Price",
        accessor: "price",
        align: "right" as const,
        render: (value) => `$${value.toFixed(2)}`,
      },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    data: sampleProducts,
    columns,
    actions: [
      {
        icon: <MoreVertical className="w-4 h-4" />,
        label: "More",
        intent: "neutral",
        onClick: (row) => {
          // More actions
          alert(`More actions for ${row.name}`);
        },
      },
    ],
  },
};

export const InteractiveStates: Story = {
  render: function InteractiveStatesTable() {
    type StateType = "default" | "loading" | "empty" | "error";
    const [state, setState] = useState<StateType>("default");
    const [data, setData] = useState<Product[]>(sampleProducts);

    const handleStateChange = (newState: StateType) => {
      setState(newState);
      switch (newState) {
        case "loading":
          setTimeout(() => setState("default"), 2000);
          break;
        case "empty":
          setData([]);
          break;
        case "default":
          setData(sampleProducts);
          break;
      }
    };

    return (
      <div>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => handleStateChange("default")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Default
          </button>
          <button
            onClick={() => handleStateChange("loading")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Loading
          </button>
          <button
            onClick={() => handleStateChange("empty")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Empty
          </button>
          <button
            onClick={() => handleStateChange("error")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Error
          </button>
        </div>
        <Table
          data={data}
          columns={columns}
          actions={actions}
          isLoading={state === "loading"}
          error={
            state === "error"
              ? ({ message: "Network error" } as Error)
              : undefined
          }
          onRetry={() => handleStateChange("default")}
          emptyIcon={<Package className="w-12 h-12" />}
        />
      </div>
    );
  },
};

export const CustomActionsHeader: Story = {
  args: {
    data: sampleProducts,
    columns,
    actions,
    actionsHeaderText: "Operations",
  },
};

export const AlignmentVariations: Story = {
  args: {
    data: sampleProducts,
    columns: [
      {
        key: "name",
        header: "Product (Left)",
        accessor: "name",
        align: "left" as const,
      },
      {
        key: "category",
        header: "Category (Center)",
        accessor: "category",
        align: "center" as const,
      },
      {
        key: "price",
        header: "Price (Right)",
        accessor: "price",
        align: "right" as const,
        render: (value) => `$${value.toFixed(2)}`,
      },
    ],
  },
};
