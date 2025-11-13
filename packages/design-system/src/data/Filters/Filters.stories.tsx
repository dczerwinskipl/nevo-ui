import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Filters } from "./Filters";
import { FilterConfig, FilterValue } from "../types";
import { Card } from "../../primitives/Card";

interface ProductFilters extends Record<string, FilterValue> {
  search: string;
  category: string;
  status: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

const productFilterConfig: FilterConfig<ProductFilters> = {
  search: {
    name: "search",
    label: "Search",
    type: "text",
    placeholder: "Search products...",
  },
  category: {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Accessories", value: "accessories" },
      { label: "Furniture", value: "furniture" },
      { label: "Clothing", value: "clothing" },
    ],
  },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Discontinued", value: "discontinued" },
    ],
  },
  minPrice: {
    name: "minPrice",
    label: "Min Price",
    type: "number",
    placeholder: "Min",
    min: 0,
  },
  maxPrice: {
    name: "maxPrice",
    label: "Max Price",
    type: "number",
    placeholder: "Max",
    min: 0,
  },
};

const meta: Meta<typeof Filters<ProductFilters>> = {
  title: "Data/Filters",
  component: Filters,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Filters component provides a flexible filtering interface with support for text, select, and number inputs. Manages filter state and provides apply/clear actions.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Filters<ProductFilters>>;

export const Default: Story = {
  render: function DefaultFilters() {
    const [filters, setFilters] = useState<Partial<ProductFilters>>({});
    const [applied, setApplied] = useState<Partial<ProductFilters>>({});
    const [isFetching, setIsFetching] = useState(false);

    const onUpdateFilter = <K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      setTimeout(() => setIsFetching(false), 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <Filters
        filters={filters}
        config={productFilterConfig}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasApplied}
      />
    );
  },
};

export const WithPrefilledValues: Story = {
  render: function PrefilledFilters() {
    const [filters, setFilters] = useState<Partial<ProductFilters>>({
      search: "laptop",
      category: "electronics",
      status: "active",
    });
    const [applied, setApplied] = useState(filters);
    const [isFetching, setIsFetching] = useState(false);

    const onUpdateFilter = <K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      setTimeout(() => setIsFetching(false), 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <Filters
        filters={filters}
        config={productFilterConfig}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasApplied}
      />
    );
  },
};

export const WithPriceRange: Story = {
  render: function PriceRangeFilters() {
    const [filters, setFilters] = useState<Partial<ProductFilters>>({
      minPrice: 100,
      maxPrice: 500,
    });
    const [applied, setApplied] = useState(filters);
    const [isFetching, setIsFetching] = useState(false);

    const onUpdateFilter = <K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      setTimeout(() => setIsFetching(false), 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <Filters
        filters={filters}
        config={productFilterConfig}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasApplied}
      />
    );
  },
};

export const CustomLabels: Story = {
  render: function CustomLabelsFilters() {
    const [filters, setFilters] = useState<Partial<ProductFilters>>({});
    const [applied, setApplied] = useState<Partial<ProductFilters>>({});
    const [isFetching, setIsFetching] = useState(false);

    const onUpdateFilter = <K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      setTimeout(() => setIsFetching(false), 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <Filters
        filters={filters}
        config={productFilterConfig}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasApplied}
        applyLabel="Search Products"
        clearLabel="Reset Filters"
      />
    );
  },
};

export const MinimalFilters: Story = {
  render: function MinimalFilters() {
    interface SimpleFilters extends Record<string, FilterValue> {
      search: string;
      status: string;
    }

    const simpleConfig: FilterConfig<SimpleFilters> = {
      search: {
        name: "search",
        label: "Search",
        type: "text",
        placeholder: "Search...",
      },
      status: {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "All",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
    };

    const [filters, setFilters] = useState<Partial<SimpleFilters>>({});
    const [applied, setApplied] = useState<Partial<SimpleFilters>>({});
    const [isFetching, setIsFetching] = useState(false);

    const onUpdateFilter = <K extends keyof SimpleFilters>(
      key: K,
      value: SimpleFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      setTimeout(() => setIsFetching(false), 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <Filters
        filters={filters}
        config={simpleConfig}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasApplied}
      />
    );
  },
};

export const Interactive: Story = {
  render: function InteractiveFilters() {
    const [filters, setFilters] = useState<Partial<ProductFilters>>({});
    const [applied, setApplied] = useState<Partial<ProductFilters>>({});
    const [isFetching, setIsFetching] = useState(false);
    const [results, setResults] = useState<number>(0);

    const onUpdateFilter = <K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onApplyFilters = () => {
      setIsFetching(true);
      setApplied(filters);
      // Simulate API call
      setTimeout(() => {
        setIsFetching(false);
        setResults(Math.floor(Math.random() * 100) + 1);
      }, 1000);
    };

    const onClearFilters = () => {
      setFilters({});
      setApplied({});
      setResults(0);
    };

    const isDirty = JSON.stringify(filters) !== JSON.stringify(applied);
    const hasApplied = Object.keys(applied).length > 0;

    return (
      <div>
        <Filters
          filters={filters}
          config={productFilterConfig}
          onUpdateFilter={onUpdateFilter}
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
          isFetching={isFetching}
          isDirty={isDirty}
          hasAppliedFilters={hasApplied}
        />
        {hasApplied && (
          <Card className="mt-4 p-4 bg-intent-info-bg border-intent-info">
            <p className="text-sm">
              Found <strong>{results}</strong> products matching your filters
            </p>
          </Card>
        )}
      </div>
    );
  },
};
