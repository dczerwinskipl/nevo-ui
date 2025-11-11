# Data Components

Components for displaying and interacting with data, including tables, filters, and pagination.

## Components

### Table

A comprehensive data table component with sorting, filtering, and row selection capabilities.

**Features:**

- Column configuration with custom renderers
- Row actions with icons and intents
- Loading states with skeleton and data persistence
- Empty state handling
- Error state with retry
- Responsive design
- Theme-aware styling
- Custom empty messages and icons

**Sub-components:**

- `Table` - Main table component
- `TableHeader` - Table header with sorting
- `TableRow` - Individual row component
- `TableActions` - Row action buttons
- `TableSkeleton` - Loading skeleton
- `LoadingOverlay` - Loading overlay with message

**Usage:**

```tsx
import { Table } from "@nevo/design-system";

const columns = [
  {
    key: "name",
    header: "Name",
    accessor: "name",
    sortable: true,
  },
  // ...more columns
];

const actions = [
  {
    icon: <Edit />,
    label: "Edit",
    intent: "neutral",
    onClick: (row) => handleEdit(row),
  },
];

<Table
  data={data}
  columns={columns}
  actions={actions}
  onRowClick={handleRowClick}
  isLoading={isLoading}
  error={error}
  onRetry={refetch}
/>;
```

**Stories:** ✅ Table.stories.tsx (15 stories)  
**Tests:** ✅ Table.test.tsx

---

### Pagination

A pagination component for navigating through large datasets.

**Features:**

- Page number display
- Total item count
- Configurable page size
- Theme-aware styling
- Responsive design

**Usage:**

```tsx
import { Pagination } from "@nevo/design-system";

<Pagination total={100} pageSize={20} />;
```

**Stories:** ✅ Pagination.stories.tsx (8 stories)  
**Tests:** None yet

---

### Filters

A flexible filtering component for data tables and lists.

**Features:**

- Multiple filter types (text, select, number)
- Apply and clear actions
- Dirty state detection
- Loading states
- Filter configuration system
- Theme-aware styling

**Sub-components:**

- `Filters` - Main filters component
- `FilterGroup` - Group of related filters
- `FilterActions` - Clear and apply actions

**Usage:**

```tsx
import { Filters } from "@nevo/design-system";

const filterConfig = {
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
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
};

<Filters
  filters={filters}
  config={filterConfig}
  onUpdateFilter={handleUpdate}
  onApplyFilters={handleApply}
  onClearFilters={handleClear}
  isDirty={isDirty}
  isFetching={isFetching}
/>;
```

**Stories:** ✅ Filters.stories.tsx (6 stories)  
**Tests:** ✅ Filters.test.tsx

**Stories:** None yet  
**Tests:** `Filters.test.tsx`

---

### Pagination

A pagination component for navigating through pages of data.

**Features:**

- Page number display
- Previous/Next navigation
- First/Last page navigation
- Page size selector
- Total count display
- Theme-aware styling

**Usage:**

```tsx
import { Pagination } from "@nevo/design-system";

<Pagination
  currentPage={page}
  totalPages={totalPages}
  pageSize={pageSize}
  totalCount={totalCount}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>;
```

**Stories:** None yet  
**Tests:** None yet

---

### MockScenarios (Demo Component)

A demonstration component showing API mock scenario switching integration.

**Features:**

- All 8 MSW scenario examples
- Scenario toolbar in Storybook
- Theme integration
- Live error states

**Usage:**
This is a demo/test component. See stories for usage examples.

**Stories:** `MockScenarios.stories.tsx`  
**Tests:** None (demo component)

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **Table**: ✅ Comprehensive (rendering, sorting, selection, interactions)
- **Filters**: ✅ Comprehensive (filter application, clearing, interactions)
- **Pagination**: ❌ Missing
- **MockScenarios**: N/A (demo component)

### Storybook Stories

- **Table**: ❌ Missing
- **Filters**: ❌ Missing
- **Pagination**: ❌ Missing
- **MockScenarios**: ✅ Complete (8 scenario stories)

### Integration Tests

- **Table + Filters**: Consider Playwright test for full workflow
- **Table + Pagination**: Consider Playwright test for full workflow

### Accessibility Testing

Priority items:

- Table keyboard navigation (arrow keys, Enter, Space)
- Filter form accessibility (labels, ARIA)
- Pagination keyboard navigation

---

## Development Guidelines

### Adding New Data Components

1. Create component file in appropriate subfolder
2. Create Storybook stories showcasing all features
3. Create comprehensive Jest tests
4. Export from folder `index.ts` and main `index.ts`
5. Update this README
6. Run accessibility audit

### Testing Requirements

- Table components must test sorting, selection, and keyboard nav
- Filter components must test all filter types and clearing
- All components must pass a11y audits
- Consider edge cases (empty data, loading states)

### Performance Considerations

- Large tables: consider virtualization
- Filter debouncing: debounce filter onChange handlers
- Memoization: use React.memo for row components

### Theme Integration

All data components must use theme tokens:

```tsx
import { useTheme } from "../theme";

const { tokens } = useTheme();
// Use tokens.surface, tokens.border, etc.
```

---

## Related Documentation

- [Primitives](../primitives/README.md)
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
- [Filtering Guidelines](../../../../docs/filtering-guidelines.md)
