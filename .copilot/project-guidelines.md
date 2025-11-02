# nEvo Ecommerce Admin - Architecture Guidelines

## Overview
This document defines the architectural principles and best practices for the nEvo Ecommerce Admin monorepo project. These guidelines ensure consistency, maintainability, and scalability across the codebase.

## Documentation Standards

### Language Requirements
**Rule**: All documentation, comments, code examples, and specifications must be written in English.

**Why**: 
- Ensures accessibility for international contributors
- Maintains consistency across the codebase
- Improves collaboration and knowledge sharing
- Aligns with industry standards

**Scope**:
- All `.md` files (README, specifications, guidelines)
- Code comments and JSDoc documentation
- Component prop descriptions and interfaces
- Error messages and console logs
- Git commit messages and PR descriptions
- API documentation and schemas

**Examples**:
```typescript
// ✅ Good - English comments and descriptions
interface ButtonProps {
  /** The visual intent of the button */
  intent?: 'primary' | 'secondary' | 'danger';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
}

// ❌ Bad - Non-English comments
interface ButtonProps {
  /** Kolor przycisku */
  intent?: 'primary' | 'secondary' | 'danger';
}
```

## Package Structure & Responsibilities

### packages/design-system - Design System (@nevo/design-system)
**Purpose**: Reusable UI components for any nEvo application
**Rules**:
- ✅ Only generic, reusable components
- ❌ No hardcoded data or business logic
- ❌ No application-specific strings or content
- ❌ No API calls or state management
- ✅ Components should accept all necessary data via props
- ✅ Focus on presentation and interaction patterns

**Folder Structure**:
```
packages/design-system/src/
├── primitives/          # Basic building blocks (Button, Input, Badge)
├── layout/             # Layout components (Grid, Stack, Container)
├── data/               # Data display (Table, List, Pagination)
├── overlays/           # Modals, Tooltips, Dropdowns
├── feedback/           # Loading, Progress, Alerts
├── forms/              # Form-specific components
├── navigation/         # Navigation components
├── theme/              # Theme provider and utilities
├── utils/              # Helper functions and hooks
└── index.ts            # Main exports
```

### apps/admin - Ecommerce Admin Application (@nevo/ecommerce-admin)
**Purpose**: Business-specific ecommerce admin interface
**Architecture**: Vertical Slices pattern

**Folder Structure**:
```
apps/admin/src/
├── shared/             # Shared application utilities
│   ├── components/     # App-specific components (Logo, AppHeader)
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Helper functions
│   ├── constants/      # Application constants
│   └── types/          # TypeScript types
├── features/           # Vertical slices
│   ├── orders/         # Order management feature
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/      # Feature-specific hooks
│   │   ├── services/   # API calls and business logic
│   │   ├── types/      # Feature types
│   │   └── pages/      # Route components
│   ├── products/       # Product management
│   └── dashboard/      # Dashboard feature
├── router/             # Routing configuration
├── App.tsx             # Root component
└── main.tsx           # Entry point
```

## Color System & Theming

### Theme Architecture
**Best Practice**: Use CSS Custom Properties + TypeScript theme tokens
**Why**: 
- Runtime theme switching
- CSS-in-JS performance benefits
- IDE autocomplete support
- Easy maintenance

**Color Palette Structure**:
```typescript
// Semantic color tokens
const colors = {
  // Base colors
  primary: { 50: '#...', 500: '#...', 900: '#...' },
  secondary: { 50: '#...', 500: '#...', 900: '#...' },
  neutral: { 50: '#...', 500: '#...', 900: '#...' },
  
  // Semantic colors
  success: { 50: '#...', 500: '#...', 900: '#...' },
  warning: { 50: '#...', 500: '#...', 900: '#...' },
  error: { 50: '#...', 500: '#...', 900: '#...' },
  info: { 50: '#...', 500: '#...', 900: '#...' },
}

// Usage example
const theme = {
  surface: {
    page: colors.neutral[50],
    card: colors.neutral[0],
    raised: colors.neutral[100]
  },
  intent: {
    primary: colors.primary[500],
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500]
  }
}
```

**Component Color Props**:
```typescript
// ❌ Bad - hardcoded colors
<Badge status="success" />

// ✅ Good - semantic color props  
<Badge intent="success" />
<Badge intent="warning" />
<Badge intent="error" />
```

### Component Design Patterns

### Intent-Based Component API
**Rule**: All interactive components must use semantic intent props with a unified theme system

**Core Principle**: Use existing `bg`, `border`, `text` structure from theme. Dark/light themes already handle color variations automatically.

```typescript
// Unified intent and variant types
type ComponentIntent = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'subtle';
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Existing theme structure (no changes needed!)
const theme = {
  intent: {
    primary: { bg: '...', border: '...', text: '...' },
    success: { bg: '...', border: '...', text: '...' },
    warning: { bg: '...', border: '...', text: '...' },
    error: { bg: '...', border: '...', text: '...' },
    info: { bg: '...', border: '...', text: '...' },
    neutral: { bg: '...', border: '...', text: '...' }, // Added for table actions
  }
};
```

**Variant Helper Function**:
```typescript
// Single helper transforms bg/border/text into all variants
const getIntentStyle = (tokens, intent, variant) => {
  const colors = tokens.intent[intent];
  
  switch (variant) {
    case 'solid': return { bg: colors.text, color: tokens.page, border: colors.text };
    case 'outline': return { bg: 'transparent', color: colors.text, border: colors.border };
    case 'ghost': return { bg: 'transparent', color: colors.text, border: 'transparent' };
    case 'subtle': return { bg: colors.bg, color: colors.text, border: colors.border }; // Default
  }
};
```

**Consistent Component APIs**:
```typescript
// All components use same intent/variant pattern
interface BadgeProps {
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  size?: ComponentSize;
  children: React.ReactNode;
}

// Button, Typography, Input - identical API pattern
interface ButtonProps {
  intent?: ComponentIntent;
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Usage Examples**:
```typescript
// Semantic Typography types - ensures consistency
<Typography type="page-title">Main Page Header</Typography>
<Typography type="section-title">Products</Typography>
<Typography type="card-title">Product Details</Typography>
<Typography type="label">Search:</Typography>
<Typography type="caption">Last updated: 2 hours ago</Typography>
<Typography type="error">Invalid email format</Typography>
<Typography type="success">Order saved successfully!</Typography>

// All components use same intent/variant combinations
<Badge intent="success" variant="subtle">Active</Badge>
<Button intent="success" variant="solid">Save</Button>
<Button intent="neutral" variant="ghost">Edit</Button>

// Table actions with neutral intent
<Button intent="neutral" variant="ghost" size="sm"><Eye /></Button>
<Button intent="error" variant="ghost" size="sm"><Trash /></Button>
```

**Typography Semantic Types**:
```typescript
// Predefined types ensure consistent visual hierarchy
type TypographyType = 
  | 'page-title'        // h1, 3xl, bold - Main page heading
  | 'section-title'     // h2, xl, semibold - Section headings  
  | 'card-title'        // h3, lg, semibold - Card/component titles
  | 'subtitle'          // h4, md, medium, neutral - Subtitles
  | 'body'              // p, md, normal - Main body text
  | 'label'             // label, sm, medium, neutral - Form labels
  | 'caption'           // span, sm, normal, neutral - Small text
  | 'button'            // span, md, medium - Button text
  | 'error'             // span, sm, normal, error - Error messages
  | 'success'           // span, sm, normal, success - Success messages

// Override when needed for special cases
<Typography type="section-title" size="2xl">Extra Large Title</Typography>
```

**Benefits**:
- **Simple**: Use existing theme structure, just add `neutral` intent
- **Consistent**: Same API across all components  
- **Automatic**: Dark/light themes work without extra complexity
- **Clean**: One helper function handles all variant transformations

### Generic Table Component
**Rule**: Table components must be generic and configurable, not hardcoded for specific data schemas

```typescript
// ✅ Good - generic table with column definitions
interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// Usage in admin app
const productColumns: TableColumn<Product>[] = [
  { key: 'id', label: 'ID', width: '100px' },
  { key: 'name', label: 'Name', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (status) => <Badge intent={getStatusIntent(status)}>{status}</Badge>
  },
  {
    key: 'tags',
    label: 'Tags', 
    render: (tags) => tags.map(tag => <TagBadge key={tag}>{tag}</TagBadge>)
  }
];

// ❌ Bad - hardcoded product schema in Table component
<Table rows={products} /> // Hardcoded columns inside Table
```

### Component Composition & File Structure
**Rule**: Split large components into smaller, focused components with proper file organization

**Core Principles**:
- **Single Responsibility**: Each component should have one clear purpose
- **Maintainable Size**: Keep components under 200 lines when possible
- **Reusable Sub-components**: Extract reusable parts into separate components
- **Clear File Organization**: Use folders with index files for complex components

**File Organization Patterns**:
```typescript
// ✅ Good - Simple component (single file)
packages/design-system/src/primitives/Button.tsx

// ✅ Good - Complex component (folder structure)
packages/design-system/src/data/Table/
├── index.ts              // Main exports
├── Table.tsx             // Main Table component
├── TableHeader.tsx       // Table header logic
├── TableRow.tsx          // Individual row component
├── TableCell.tsx         // Cell rendering logic
└── types.ts              // Shared interfaces

// Export pattern in index.ts
export { Table } from './Table';
export { TableHeader } from './TableHeader';
export { TableRow } from './TableRow';
export type { TableProps, TableColumn } from './types';
```

**Component Splitting Guidelines**:
```typescript
// ❌ Bad - Large monolithic component
function ProductsList() {
  // 300+ lines of JSX with inline components
  const renderFilters = () => (
    <div className="grid md:grid-cols-4 gap-3">
      <Input label="Szukaj" placeholder="Nazwa, SKU..." />
      <Select label="Kategoria" options={categoryOptions} />
      <Select label="Status" options={statusOptions} />
      <Button intent="primary">Zastosuj</Button>
    </div>
  );

  const renderActions = () => (
    <div className="flex gap-2">
      <Button intent="primary">Dodaj produkt</Button>
      <Button variant="outline">Export</Button>
      <Button intent="neutral" variant="ghost">Settings</Button>
    </div>
  );

  return (
    <div>
      {renderFilters()}
      {renderActions()}
      {/* 200+ more lines... */}
    </div>
  );
}

// ✅ Good - Split into focused components
// components/ProductsFilters.tsx
function ProductsFilters({ onFilter }: ProductsFiltersProps) {
  return (
    <Card>
      <div className="grid md:grid-cols-4 gap-3">
        <Input label="Search" placeholder="Name, SKU..." />
        <Select label="Category" options={categoryOptions} />
        <Select label="Status" options={statusOptions} />
        <Button intent="primary" onClick={onFilter}>Apply</Button>
      </div>
    </Card>
  );
}

// components/ProductsActions.tsx
function ProductsActions({ onAdd, onExport }: ProductsActionsProps) {
  return (
    <div className="flex gap-2">
      <Button intent="primary" onClick={onAdd}>Add Product</Button>
      <Button variant="outline" onClick={onExport}>Export</Button>
      <Button intent="neutral" variant="ghost">Settings</Button>
    </div>
  );
}

// pages/ProductsList.tsx - Clean main component
function ProductsList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography type="section-title">Products</Typography>
        <ProductsActions onAdd={handleAdd} onExport={handleExport} />
      </div>
      
      <ProductsFilters onFilter={handleFilter} />
      
      <Card className="p-0 overflow-hidden">
        <Table data={data} columns={columns} actions={actions} />
      </Card>
      
      <Pagination total={128} pageSize={25} />
    </div>
  );
}
```

**When to Extract Sub-components**:
- **Always**: When component exceeds 200 lines
- **Always**: When inline component has 3+ props or complex logic
- **Consider**: When component logic can be reused elsewhere
- **Consider**: When component has distinct responsibility
- **Avoid**: Over-extraction for trivial components (1-2 lines JSX)

**Folder Structure Decision Tree**:
```
Component has 1 file + simple types? → Single .tsx file
Component has 2-3 related files? → Folder with index.ts
Component has 4+ files or sub-components? → Folder with organized structure
```

### Constant Definitions
**Rule**: All constants must be defined outside components to prevent re-renders

```typescript
// ✅ Good - defined outside component
const STATUS_COLOR_MAP = {
  completed: 'success',
  pending: 'warning', 
  cancelled: 'error'
} as const

// ❌ Bad - recreated on every render
function Component() {
  const statusMap = { completed: 'success', ... }
}
```

### Performance Patterns
- Use `useMemo` and `useCallback` for expensive computations
- Define objects/arrays outside components when possible
- Implement proper memoization for list items

## Responsive Design

### Breakpoint System
Use Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```css
/* ✅ Good - mobile first */
.component {
  @apply text-sm;
  @apply md:text-base;
  @apply lg:text-lg;
}
```

## Routing Architecture

### Recommended Router: React Router v6
**Why**: 
- Excellent TypeScript support
- Nested routing for layouts
- Code splitting support
- Active maintenance

**Structure**:
```typescript
// router/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'orders', element: <OrdersLayout />, 
        children: [
          { index: true, element: <OrdersList /> },
          { path: ':id', element: <OrderDetail /> }
        ]
      }
    ]
  }
])
```

## State Management

### Local State: useState/useReducer
For component-level state

### Server State: TanStack Query
For API data fetching and caching

### Global State: Zustand (if needed)
For truly global application state

## File Naming Conventions

### Components
- PascalCase: `StatusBadge.tsx`
- One component per file
- Export as named export

### Hooks
- camelCase with `use` prefix: `useOrderData.ts`

### Types
- PascalCase: `OrderStatus.ts`
- Prefer interfaces over types for objects

### Constants
- SCREAMING_SNAKE_CASE: `API_ENDPOINTS.ts`

## TypeScript Standards

### Strict Configuration
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### Prop Types
```typescript
// ✅ Good - explicit and descriptive
interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}
```

## Testing Strategy

### Unit Tests: Vitest
- Test component behavior, not implementation
- Focus on user interactions and outcomes

### Component Tests: Testing Library
- Test accessibility and user experience
- Avoid testing internal state

## Performance Guidelines

### Bundle Optimization
- Use dynamic imports for route-based code splitting
- Implement lazy loading for heavy components
- Optimize images and assets

### Runtime Performance
- Minimize re-renders with proper memoization
- Use React DevTools Profiler to identify bottlenecks
- Implement virtualization for long lists

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Proper semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements (4.5:1 for normal text)

### Implementation
- Use proper ARIA labels
- Implement focus management
- Provide alternative text for images
- Ensure logical tab order

## Build & Development

### Package Manager: PNPM
- Efficient disk usage
- Fast installations
- Workspace support

### Build Tool: Vite
- Fast development server
- Optimized production builds
- TypeScript support out of the box

### Monorepo: Turbo
- Intelligent caching
- Parallel task execution
- Dependency graph optimization

---

## Structure
- `packages/design-system` - buttons, cards, inputs, selects, badge, table, pagination, modal, topbar, sidebar, theme provider
- `apps/admin` - demo product list + filters

## Next Steps

1. **Audit Current Implementation**: Identify deviations from these guidelines
2. **Refactor Phase**: Address architectural issues systematically  
3. **Migration Plan**: Move hardcoded values to theme system
4. **Component Library**: Standardize component API interfaces
5. **Documentation**: Create component documentation with Storybook