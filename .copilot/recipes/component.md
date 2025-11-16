# Recipe: Creating a New Component

This recipe guides you through creating a new component in the Nevo UI Design System.

## Overview

Follow this systematic approach to ensure consistency, accessibility, and quality.

## Steps

### 1. Plan the Component

**Define Requirements:**

- What problem does this component solve?
- What are the use cases?
- What variants/states are needed?
- What are the accessibility requirements?
- **Can it be simplified?** - Keep it as simple as possible

**Check for Existing Solutions:**

- Search the design system for similar components
- Check if composition of existing primitives would work
- Review Radix UI, Headless UI for patterns
- **Check feedback components** - Use EmptyState, ErrorState, Loading instead of custom implementations

**Identify Complex Logic:**

- Will this component need complex state management?
- Can logic be extracted to a custom hook?
- Can subcomponents be extracted to separate files?

### 2. Component Structure

**File Location:**

```
packages/design-system/src/
  ├── primitives/     # Base UI elements (Button, Input, Card)
  ├── forms/          # Form-specific components
  ├── feedback/       # User feedback (Alert, Toast, Loading)
  ├── navigation/     # Navigation components
  ├── data/           # Data display (Table, Pagination)
  └── overlays/       # Modal, Dropdown, Popover
```

**Create Component Files:**

```
ComponentName/
  ├── ComponentName.tsx       # Main component (<200 lines)
  ├── ComponentName.test.tsx  # Tests
  ├── ComponentName.stories.tsx # Storybook stories
  ├── types.ts                # TypeScript types
  └── index.ts                # Public exports
```

**If component grows beyond 150-200 lines**, extract subcomponents:

```
ComponentName/
  ├── ComponentName.tsx       # Main orchestrator
  ├── SubComponent1.tsx       # Extracted subcomponent
  ├── SubComponent2.tsx       # Extracted subcomponent
  ├── types.ts
  ├── index.ts
  ├── ComponentName.test.tsx
  └── ComponentName.stories.tsx
```

**Example - Table with Subcomponents**:

```
Table/
  ├── Table.tsx              # Main component (150 lines)
  ├── TableHeader.tsx        # Header rendering
  ├── TableRow.tsx           # Row rendering
  ├── TableActions.tsx       # Action buttons
  ├── TableSkeleton.tsx      # Loading state
  ├── LoadingOverlay.tsx     # Overlay
  ├── types.ts
  └── index.ts
```

### 3. Component Implementation

**Keep It Simple:**

- Each component should have ONE clear responsibility
- Extract complex logic to custom hooks
- Extract subcomponents when file exceeds ~150 lines
- Reuse feedback components (EmptyState, ErrorState, Loading)

**Basic Template:**

```tsx
// ComponentName.tsx
import React from "react";
import { cn } from "../../primitives/utils";
import type { ComponentNameProps } from "./types";

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "base-classes",
        variant === "primary" && "primary-classes",
        variant === "neutral" && "neutral-classes",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = "ComponentName";
```

**Types File:**

```tsx
// types.ts
import type { ComponentPropsWithoutRef } from "react";

export interface ComponentNameProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: "default" | "primary" | "neutral";

  /**
   * Size of the component
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Additional content or configuration
   */
  // ... other props
}
```

**Exports:**

```tsx
// index.ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./types";
```

### 4. Styling with Tailwind

**Tailwind First - Always**:

- Use Tailwind utility classes for all styling
- Avoid inline styles unless absolutely necessary (dynamic values)
- Theme tokens should contain Tailwind classes, not CSS values

**Follow Design Tokens:**

```tsx
// ✅ Good - Tailwind classes
className={cn(
  // Layout
  'flex items-center gap-2',

  // Colors from theme (Tailwind classes)
  'bg-background-primary text-content-primary',

  // Interactive states
  'hover:bg-background-secondary',
  'focus-visible:ring-2 focus-visible:ring-primary-500',
  'disabled:opacity-50 disabled:cursor-not-allowed',

  // Transitions
  'transition-colors duration-200',

  // User className last
  className
)}

// ❌ Bad - inline styles
style={{
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#ffffff',
  color: '#111827'
}}
```

**When Inline Styles Are Acceptable**:

```tsx
// ✅ OK - dynamic value from props
<div
  className="bg-primary-500 h-2 rounded transition-all"
  style={{ width: `${progress}%` }}

/>

// ✅ OK - runtime calculation
<div
  className="absolute"
  style={{ transform: `rotate(${angle}deg)` }}

/>

// ❌ Bad - could use Tailwind
<div style={{ padding: '16px', borderRadius: '8px' }} />
// Should be: className="p-4 rounded-lg"
```

**Variant Patterns:**

```tsx
const variants = {
  default: 'bg-background-primary border border-border-primary',
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-background-secondary text-content-secondary',
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

className={cn(variants[variant], sizes[size], className)}
```

### 5. Accessibility Implementation

**Semantic HTML:**

```tsx
// Use appropriate element
<button type="button" {...props}>  // for buttons
<nav aria-label="..." {...props}>  // for navigation
<dialog {...props}>                // for modals
```

**ARIA Attributes:**

```tsx
<div role="alert" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

**Keyboard Support:**

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick?.();
  }
  if (e.key === "Escape") {
    onClose?.();
  }
};
```

**Focus Management:**

```tsx
const ref = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isOpen) {
    ref.current?.focus();
  }
}, [isOpen]);
```

### 6. Write Tests

**Component Tests (ComponentName.test.tsx):**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders children correctly", () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(
      <ComponentName variant="primary">Content</ComponentName>
    );
    expect(container.firstChild).toHaveClass("expected-class");
  });

  it("handles click events", async () => {
    const onClick = jest.fn();
    render(<ComponentName onClick={onClick}>Click me</ComponentName>);

    await userEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation", async () => {
    const onClose = jest.fn();
    render(<ComponentName onClose={onClose}>Content</ComponentName>);

    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ComponentName ref={ref}>Content</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className prop", () => {
    const { container } = render(
      <ComponentName className="custom-class">Content</ComponentName>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
```

### 7. Create Storybook Stories

**Stories File (ComponentName.stories.tsx):**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Category/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Brief description of the component and its purpose.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "neutral"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Component size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: "Default ComponentName",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="neutral">Neutral</ComponentName>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

export const WithComposition: Story = {
  render: () => (
    <ComponentName>
      <Typography variant="h3">Title</Typography>
      <Typography>Description text</Typography>
      <Button>Action</Button>
    </ComponentName>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = React.useState(false);
    return (
      <ComponentName onClick={() => setState(!state)}>
        State: {state ? "On" : "Off"}
      </ComponentName>
    );
  },
};
```

### 8. Update Exports

**Add to main index.ts:**

```tsx
// packages/design-system/src/index.ts

// ... existing exports
export { ComponentName } from "./category/ComponentName";
export type { ComponentNameProps } from "./category/ComponentName";
```

### 9. Documentation

**Add JSDoc Comments:**

````tsx
/**
 * ComponentName provides [brief description]
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">
 *   Content here
 * </ComponentName>
 * ```
 */
export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>((props, ref) => {
  // ...
});
````

**Update README if needed:**
Add to the component inventory in `packages/design-system/README.md`.

### 10. Quality Checklist

Before submitting, verify:

- [ ] Component uses design system primitives (not raw HTML)
- [ ] TypeScript types are complete with JSDoc
- [ ] All variants and sizes work correctly
- [ ] Tailwind classes use design tokens
- [ ] Component is accessible (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Tests cover main functionality
- [ ] Tests achieve >80% coverage
- [ ] Storybook stories demonstrate all variants
- [ ] Stories use design system components
- [ ] No console errors in Storybook
- [ ] Component is exported from main index
- [ ] RefForwarding works correctly
- [ ] ClassName merging works
- [ ] Documentation is clear and complete

## Examples from the Codebase

### Simple Component: Badge

See: `packages/design-system/src/feedback/Badge/Badge.tsx`

### Complex Component: Table

See: `packages/design-system/src/data/Table/Table.tsx`

### Form Component: Select

See: `packages/design-system/src/forms/Select/Select.tsx`

## Common Patterns

### Extract Complex Logic to Hooks

When your component has complex state management, extract it to a custom hook:

```tsx
// ❌ Bad - complex logic in component
export const Table = ({ data, isLoading }) => {
  const [snapshot, setSnapshot] = useState([]);
  const [prevLoading, setPrevLoading] = useState(false);

  useEffect(() => {
    if ((!isLoading && prevLoading) || data?.length > 0) {
      setSnapshot(data || []);
    }
    setPrevLoading(isLoading);
  }, [isLoading, prevLoading, data]);

  const displayData = useMemo(() => {
    return isLoading && snapshot.length > 0 ? snapshot : data || [];
  }, [data, snapshot, isLoading]);

  // Component continues...
};

// ✅ Good - extracted to custom hook
// hooks/useDataSnapshot.ts
export const useDataSnapshot = <T,>(
  data: T[] | undefined,
  isLoading: boolean
) => {
  const [snapshot, setSnapshot] = useState<T[]>([]);
  const [prevLoading, setPrevLoading] = useState(isLoading);

  useEffect(() => {
    if ((!isLoading && prevLoading) || data?.length > 0) {
      setSnapshot(data || []);
    }
    setPrevLoading(isLoading);
  }, [isLoading, prevLoading, data]);

  return {
    displayData: isLoading && snapshot.length > 0 ? snapshot : data || [],
    hasSnapshot: snapshot.length > 0,
  };
};

// Table.tsx - clean and simple
export const Table = ({ data, isLoading }) => {
  const { displayData, hasSnapshot } = useDataSnapshot(data, isLoading);

  // Simple rendering logic
  return <div>{/* ... */}</div>;
};
```

**Where to Store Custom Hooks**:

```
packages/design-system/src/
└── hooks/                    # Reusable design system hooks
    ├── useDataSnapshot.ts    # Data persistence during loading
    ├── useDisclosure.ts      # Modal/drawer state
    ├── useMediaQuery.ts      # Responsive queries
    ├── usePagination.ts      # Pagination logic
    └── index.ts              # Hook exports

apps/admin/src/shared/
└── hooks/                    # App-specific hooks
    ├── useProducts.ts        # Product fetching
    ├── useFilters.ts         # Filter management
    └── index.ts
```

### Reuse Feedback Components

**Never create custom empty/error/loading states.** Use existing components:

```tsx
// ✅ Good - reuse existing components
import { EmptyState, ErrorState, LoadingOverlay } from "@nevo/design-system";

export const ProductList = ({ data, isLoading, error, refetch }) => {
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data?.length && !isLoading) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your filters or search criteria"
      />
    );
  }

  return (
    <LoadingOverlay isLoading={isLoading}>
      {/* Product list content */}
    </LoadingOverlay>
  );
};

// ❌ Bad - custom implementation
export const ProductList = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center py-12">
        <div className="text-gray-400 text-lg">No products</div>
        <div className="text-gray-300 text-sm">Try different filters</div>
      </div>
    );
  }
  // Duplicated across components!
};
```

**Available Feedback Components**:

- `EmptyState` - No data scenarios
- `ErrorState` - Error handling with retry button
- `Loading` - Loading spinners/indicators
- `LoadingOverlay` - Loading overlay on existing content
- `Alert` - Inline notifications
- `Toast` - Temporary toast messages

### Extract Subcomponents

When a component file exceeds 150-200 lines, extract subcomponents:

```tsx
// ❌ Bad - everything in one file (500+ lines)
export const ComplexTable = () => {
  // Header rendering (100 lines)
  const renderHeader = () => {
    /* ... */
  };

  // Row rendering (150 lines)
  const renderRow = () => {
    /* ... */
  };

  // Actions (80 lines)
  const renderActions = () => {
    /* ... */
  };

  // Loading states (70 lines)
  // ... becomes unmaintainable
};

// ✅ Good - extracted to separate files
// Table.tsx (150 lines)
export const Table = ({ data, columns, actions }) => {
  return (
    <table>
      <TableHeader columns={columns} />
      <tbody>
        {data.map((row) => (
          <TableRow row={row} columns={columns} actions={actions} />
        ))}
      </tbody>
    </table>
  );
};

// TableHeader.tsx (50 lines)
export const TableHeader = ({ columns }) => {
  /* ... */
};

// TableRow.tsx (80 lines)
export const TableRow = ({ row, columns, actions }) => {
  /* ... */
};

// TableActions.tsx (40 lines)
export const TableActions = ({ actions, row }) => {
  /* ... */
};
```

### Compound Components

```tsx
// Parent
export const Tabs = ({ children, ...props }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

// Children
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Trigger>Tab 1</Tabs.Trigger>
    <Tabs.Trigger>Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content>Content 1</Tabs.Content>
  <Tabs.Content>Content 2</Tabs.Content>
</Tabs>;
```

### Polymorphic Components

```tsx
type AsProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export const Polymorphic = <T extends React.ElementType = 'div'>({
  as,
  ...props
}: AsProps<T>) => {
  const Component = as || 'div';
  return <Component {...props} />;
};

// Usage
<Polymorphic as="button" onClick={...}>Click</Polymorphic>
<Polymorphic as={Link} to="/home">Home</Polymorphic>
```

---

## Common Patterns

### Filter Component Pattern

**ALWAYS use the `Filters` component** from design system for search and filter UI. Never build custom filter layouts.

**Pattern Structure:**

1. **Create Filter Hook** - Manages filter state and API integration
2. **Create Filter Component Wrapper** - Wraps `Filters` in `Card`
3. **Use in Page** - Compose hook + wrapper component

**Example: Creating Order Filters**

**1. Create Filter Hook (`useOrderFilters.ts`):**

```tsx
import useFilters from "../../../hooks/useFilters";
import useOrders from "../../../hooks/useOrders";
import type { OrderFilters } from "../types/Order";
import type { FilterConfig } from "../../../hooks/useFilters";

// Define filter configuration
const orderFilterConfig: FilterConfig<OrderFilters> = {
  search: {
    name: "search",
    label: "Search Orders",
    type: "text",
    placeholder: "Order number, customer, email...",
  },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "All Statuses",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
    ],
  },
};

export function useOrderFilters() {
  const initial: OrderFilters = { search: "", status: "" };

  const {
    filters: appliedFilters,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
  } = useFilters(initial, orderFilterConfig);

  // Integrate with API
  const { data, isLoading, error, refetch } = useOrders(appliedFilters);

  return {
    data,
    isLoading,
    error,
    refetch,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    config: orderFilterConfig,
  };
}
```

**2. Create Filter Component (`OrdersFilters.tsx`):**

```tsx
import React from "react";
import { Card, Filters } from "@nevo/design-system";
import type { OrderFilters } from "../types/Order";
import type { FilterConfig } from "../../../hooks/useFilters";

export interface OrdersFiltersProps {
  filters: OrderFilters;
  config: FilterConfig<OrderFilters>;
  onUpdateFilter: <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K]
  ) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isDirty?: boolean;
  hasAppliedFilters?: boolean;
}

export function OrdersFilters({
  filters,
  config,
  onUpdateFilter,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
  isFetching = false,
  isDirty = false,
  hasAppliedFilters = false,
}: OrdersFiltersProps) {
  return (
    <Card>
      <Filters<OrderFilters>
        filters={filters}
        config={config}
        onUpdateFilter={onUpdateFilter}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        isLoading={isLoading}
        isFetching={isFetching}
        isDirty={isDirty}
        hasAppliedFilters={hasAppliedFilters}
        applyLabel="Apply"
        clearLabel="Clear"
      />
    </Card>
  );
}
```

**3. Use in Page (`OrdersList.tsx`):**

```tsx
import { OrdersTable } from "../components/OrdersTable";
import { OrdersFilters } from "../components/OrdersFilters";
import { useOrderFilters } from "../hooks/useOrderFilters";

export function OrdersList() {
  const {
    data,
    isLoading,
    error,
    refetch,
    pendingFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    isDirty,
    hasAppliedFilters,
    config,
  } = useOrderFilters();

  return (
    <div className="space-y-4">
      <OrdersFilters
        filters={pendingFilters}
        config={config}
        onUpdateFilter={updateFilter}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        isLoading={isLoading}
        isDirty={isDirty}
        hasAppliedFilters={hasAppliedFilters}
      />

      <OrdersTable
        data={data}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
}
```

**❌ NEVER do this:**

```tsx
// BAD - Custom filter layout with raw HTML
<div className="flex gap-4">
  <input type="text" value={search} onChange={...} />
  <select value={status} onChange={...}>
    <option>All</option>
  </select>
  <button onClick={clearFilters}>Clear</button>
</div>

// BAD - Custom filter layout with primitives (still wrong pattern)
<div className="flex gap-4">
  <Input value={search} onChange={...} />
  <Select value={status} onChange={...} options={...} />
  <Button onClick={clearFilters}>Clear</Button>
</div>
```

**✅ ALWAYS do this:**

```tsx
// GOOD - Use Filters component
<OrdersFilters
  filters={pendingFilters}
  config={config}
  onUpdateFilter={updateFilter}
  onApplyFilters={applyFilters}
  onClearFilters={clearFilters}
  {...filterState}
/>
```

---

### Pagination with Page Size Selector

**ALWAYS use Pagination component's built-in page size selector** via `pageSizeOptions` prop. Never create custom page size selectors.

**Pattern:**

```tsx
// ✅ GOOD - Use Pagination's built-in page size selector
<ProductsTable
  data={data}
  isLoading={isLoading}
  error={error}
  pagination={{
    currentPage,
    onPageChange: setCurrentPage,
    mode: "pages",
    totalPages: pagination.totalPages,
    totalItems: pagination.totalCount,
    pageSize,
    disabled: isFetching,
    pageSizeOptions: [10, 20, 50], // Built-in page size selector
    onPageSizeChange: (newSize: number) => {
      setPageSize(newSize);
      setCurrentPage(1); // Reset to page 1
    },
  }}
/>
```

**❌ NEVER do this:**

```tsx
// BAD - Custom page size selector with raw HTML
<div className="flex items-center gap-2">
  <Typography type="caption">Items per page:</Typography>
  <select value={pageSize} onChange={handleChange}>
    <option value={10}>10</option>
    <option value={20}>20</option>
  </select>
</div>
<ProductsTable ... />

// BAD - Custom page size selector with Select component
<div className="flex items-center gap-2">
  <Typography type="caption">Items per page:</Typography>
  <Select
    value={pageSize}
    onChange={handleChange}
    options={[...]}
  />
</div>
<ProductsTable ... />
```

**Why:**

- Pagination component handles layout and styling
- Consistent UX across all paginated tables
- Built-in accessibility (ARIA labels)
- Automatic positioning relative to pagination controls

---

## Tips

1. **Start Small**: Build the simplest version first, add features iteratively
2. **Keep It Simple**: One responsibility per component, extract complexity to hooks
3. **Use Primitives**: Compose from existing components when possible
4. **Extract Early**: If component exceeds 150 lines, extract subcomponents
5. **Reuse Feedback**: Never create custom EmptyState/ErrorState/Loading
6. **Tailwind First**: Use utility classes, avoid inline styles
7. **Think Composition**: Design for composability from the start
8. **Test Early**: Write tests as you build, not after
9. **Review Storybook**: Check stories render correctly before committing
10. **Check Accessibility**: Use axe DevTools during development
11. **Read Similar Code**: Look at existing components for patterns
12. **Ask for Feedback**: Review with team before finalizing

## Next Steps

After creating the component:

1. Run tests: `pnpm test ComponentName`
2. Check Storybook: `pnpm storybook`
3. Run linter: `pnpm lint`
4. Create PR with clear description
5. Request review from design system maintainers
