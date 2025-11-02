# Filtering Guidelines

This document describes conventions and best practices for implementing table filters across the nEvo admin applications.

## Language
All docs, examples and in-code comments must be written in English.

## Goals
- Provide stateless, strongly-typed, reusable filter UI primitives in the design system.
- Keep business logic and API calls inside application code (hooks/services), not in the design system.
- Make filters configurable and typed at the table/feature level.
- Integrate seamlessly with TanStack Query for data fetching and caching.

## Architecture Overview

The current implementation uses a proven pattern:
- **Design System**: Stateless filter components (`FiltersForm`, `TextFilter`, `SelectFilter`, etc.)
- **Application Layer**: Business logic with `useFilters` hook + TanStack Query
- **Table Component**: Generic table with built-in loading states and data persistence

## Component Responsibilities

### Design System (`packages/design-system`)
- Filter components must be presentational and stateless
- Accept all data and callbacks via props only
- Expose clear typing in props so application code can enforce types
- Avoid embedding text strings — labels/placeholders/empty messages must be provided by the app
- Handle only UI interactions, not data fetching or validation

### Application Layer (`apps/admin`)
- Business logic lives in `useFilters` hook
- API calls handled by TanStack Query hooks (e.g., `useProducts`)
- Data transformation and validation
- Filter configuration and type definitions

## Current Implementation Pattern

### 1. Filter Configuration
```typescript
// Application defines filter types and configuration
interface ProductFilters {
  search: string;
  tags: string[];
  status: ProductStatus;
  priceRange: [number, number];
}

const filterConfig: FilterConfig<ProductFilters> = {
  search: {
    type: 'text',
    label: 'Search products',
    placeholder: 'Enter product name...',
  },
  tags: {
    type: 'multiselect',
    label: 'Tags',
    options: tagOptions,
    placeholder: 'Select tags...',
  },
  status: {
    type: 'select',
    label: 'Status',
    options: statusOptions,
  },
  priceRange: {
    type: 'number-range',
    label: 'Price Range',
    min: 0,
    max: 1000,
  },
};
```

### 2. Filter Hook Integration
```typescript
// Custom hook manages filter state and integrates with TanStack Query
function useProductFilters() {
  const {
    values: filters,
    pendingValues,
    setValue,
    applyFilters,
    clearFilters,
    isApplying,
  } = useFilters<ProductFilters>({
    search: '',
    tags: [],
    status: 'all',
    priceRange: [0, 1000],
  });

  // TanStack Query integration
  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useProducts(filters); // Query depends on current filter values

  return {
    filters,
    pendingValues,
    setValue,
    applyFilters,
    clearFilters,
    isApplying,
    products,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
```

### 3. Component Usage
```typescript
function ProductsPage() {
  const {
    filters,
    pendingValues,
    setValue,
    applyFilters,
    clearFilters,
    isApplying,
    products,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useProductFilters();

  return (
    <div>
      {/* Stateless filter form from design system */}
      <FiltersForm
        config={filterConfig}
        values={pendingValues}
        onChange={setValue}
        onApply={applyFilters}
        onClear={clearFilters}
        isApplying={isApplying}
        applyLabel="Apply Filters"
        clearLabel="Clear All"
      />

      {/* Generic table with built-in state management */}
      <Table
        data={products}
        columns={productColumns}
        actions={productActions}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={refetch}
        emptyTitle="No products found"
        emptyDescription="Try adjusting your filters to see more results"
        persistDataDuringLoading={true}
      />
    </div>
  );
}
```

## Typing & Config

### Filter Configuration Type
```typescript
type FilterConfig<TFilters extends Record<string, any>> = {
  [K in keyof TFilters]: {
    type: 'text' | 'number' | 'select' | 'multiselect' | 'number-range';
    label: string;
    placeholder?: string;
    options?: TFilters[K] extends string | string[] 
      ? Array<{ label: string; value: string }> 
      : never;
    min?: TFilters[K] extends number ? number : never;
    max?: TFilters[K] extends number ? number : never;
    disabled?: boolean;
    isError?: boolean;
  };
};
```

### Type Safety Rules
- Filter value types must match the configuration type
- Select options must use the same union types as filter values
- The design system validates props but not business logic
- Application layer handles all data transformation and validation

## UX & Behavior

### Filter Application
- **Explicit Apply**: Use an `Apply` button to apply filters (current implementation)
- **Pending State**: Show pending values while user makes changes
- **Loading States**: Disable filter buttons during application
- **Clear Action**: Reset all filters to default values

### Table Loading States
The `Table` component handles multiple loading states automatically:

1. **Initial Loading**: Shows `TableSkeleton` matching exact table structure
2. **Filter Application**: Shows `LoadingOverlay` preserving previous data
3. **Empty Results**: Shows `EmptyState` with configurable message
4. **Error State**: Shows `ErrorState` with retry functionality
5. **Data Persistence**: Keeps previous data visible during filter operations

```typescript
// Table automatically handles these states based on props
<Table
  data={products}
  isLoading={isLoading}        // Initial load or no previous data
  isFetching={isFetching}      // Background refresh
  error={error}                // Error state
  onRetry={refetch}            // Retry function
  persistDataDuringLoading={true} // Keep data during filters
/>
```

## Component Architecture

### Design System Structure
```
packages/design-system/src/
├── data/
│   ├── Table/
│   │   ├── Table.tsx           # Main table component
│   │   ├── TableSkeleton.tsx   # Loading skeleton
│   │   ├── LoadingOverlay.tsx  # Overlay for refreshes
│   │   ├── types.ts            # Shared interfaces
│   │   └── index.ts            # Exports
│   ├── FiltersForm.tsx         # Main filter form
│   ├── TextFilter.tsx          # Text input filter
│   ├── SelectFilter.tsx        # Dropdown filter
│   └── FilterActions.tsx       # Apply/Clear buttons
├── feedback/
│   ├── EmptyState.tsx          # No data state
│   ├── ErrorState.tsx          # Error display
│   └── index.ts
```

### Application Structure
```
apps/admin/src/features/products/
├── hooks/
│   ├── useFilters.ts           # Generic filter hook
│   ├── useProducts.ts          # Product data fetching
│   └── useProductFilters.ts    # Combined filter + data hook
├── components/
│   ├── ProductsTable.tsx       # Product-specific table
│   ├── ProductsFilters.tsx     # Product filter configuration
│   └── ProductsPage.tsx        # Main page component
├── types/
│   └── Product.ts              # Product interfaces
```

## Integration with TanStack Query

### Query Key Strategy
```typescript
// Filters are part of the query key for proper caching
const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,    // Smooth transitions
  });
};
```

### Cache Behavior
- Each filter combination gets its own cache entry
- `keepPreviousData: true` enables smooth loading transitions
- Table component's `persistDataDuringLoading` works with this pattern
- Previous data stays visible while new data loads

## Accessibility
- All filter inputs have proper labels via `label` prop
- Filter buttons show loading state with `aria-busy`
- Table maintains focus management during state changes
- Keyboard navigation works throughout filter and table interactions

## Testing Strategy

### Unit Tests
- Test `useFilters` hook logic separately
- Test filter components with mock props
- Test table component state transitions

### Integration Tests
- Test complete filter → query → table flow
- Test loading state transitions
- Test empty and error states
- Test filter persistence and clearing

### Mock Data
```typescript
// Use consistent mock data with simulated delays
const mockProducts = [
  { id: 1, name: 'Product 1', tags: ['electronics'], status: 'active' },
  // ...
];

const useMockProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      return mockProducts.filter(/* apply filters */);
    },
  });
};
```

## Performance Considerations

### Optimization Patterns
- Filter debouncing handled at application level, not design system
- Table virtualization for large datasets (when needed)
- Query caching prevents unnecessary refetches
- Skeleton loading reduces perceived load time

### Bundle Size
- Tree-shakeable filter components
- Lazy loading for complex filter types
- Shared dependencies between filter components

---

## Current Implementation Status

✅ **Complete**: Generic `Table` component with all loading states  
✅ **Complete**: `useFilters` hook with TanStack Query integration  
✅ **Complete**: Stateless filter components (`FiltersForm`, `TextFilter`, etc.)  
✅ **Complete**: Data persistence during filter operations  
✅ **Complete**: Professional loading states (skeleton + overlay)  
✅ **Complete**: Error handling and retry functionality  

This architecture provides a robust, scalable foundation for filtering across all nEvo admin applications while maintaining clean separation of concerns and excellent user experience.