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
  intent?: "primary" | "secondary" | "danger";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
}

// ❌ Bad - Non-English comments
interface ButtonProps {
  /** Kolor przycisku */
  intent?: "primary" | "secondary" | "danger";
}
```

## Project Structure & Responsibilities

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
├── data/               # Data display and filtering
│   ├── Table/          # Modular table components
│   │   ├── Table.tsx           # Main table (149 lines)
│   │   ├── TableHeader.tsx     # Header rendering
│   │   ├── TableRow.tsx        # Row rendering
│   │   ├── TableActions.tsx    # Action buttons
│   │   ├── TableSkeleton.tsx   # Loading skeleton
│   │   ├── LoadingOverlay.tsx  # Data refresh overlay
│   │   └── types.ts           # Table interfaces
│   ├── FilterGroup.tsx         # Filter container
│   ├── FiltersForm.tsx         # Filter form wrapper
│   ├── TextFilter.tsx          # Text input filter
│   ├── NumberFilter.tsx        # Number input filter
│   ├── SelectFilter.tsx        # Select dropdown filter
│   ├── FilterActions.tsx       # Apply/Clear buttons
│   ├── Pagination.tsx          # Data pagination
│   └── types.ts               # Shared filter types
├── overlays/           # Modals, Tooltips, Dropdowns
├── feedback/           # Loading, Progress, Alerts, States
│   ├── EmptyState.tsx          # Empty data display
│   ├── ErrorState.tsx          # Error handling
│   ├── Loading.tsx             # Loading indicators
│   └── ...
├── icons/              # SVG icon components
│   ├── TableIcons.tsx          # Table action icons
│   └── index.ts               # Icon exports
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

## Development Workflow

### Getting Started

#### Prerequisites

- Node.js (v18+)
- pnpm (latest)
- VS Code with recommended extensions

#### Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Start development: `pnpm dev`

### Code Quality Standards

#### ESLint and Formatting

**All code must pass ESLint checks before submission.**

- VS Code is configured to auto-format on save using ESLint and Prettier
- Run `pnpm lint` to check for issues
- Run `pnpm lint:fix` to auto-fix issues
- Use `pnpm format` for manual formatting

#### TypeScript

- **Strict mode is enforced** - all type errors must be resolved
- Use explicit types where TypeScript inference is unclear
- Prefer interfaces over types for object shapes
- Use generics for reusable components

```typescript
// ✅ Good
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

// ❌ Avoid
type ButtonProps = {
  variant: any;
  size: string;
  children: any;
};
```

### Testing Requirements

#### Test Coverage

- **All new components must include comprehensive tests**
- Minimum coverage targets:
  - Global: Current baseline (gradually increasing)
  - Critical components (ThemeProvider, etc.): 95%
- Tests must be co-located with components (e.g., `Button.test.tsx` next to `Button.tsx`)

#### Test Structure

```typescript
// Required test categories for components:
describe("ComponentName", () => {
  describe("Rendering", () => {
    // Basic rendering, props, accessibility
  });

  describe("Interactions", () => {
    // User interactions, events, state changes
  });

  describe("Edge Cases", () => {
    // Error states, edge cases, fallbacks
  });
});
```

#### Testing Standards

- Use `@testing-library/react` for component testing
- Test behavior, not implementation details
- Include accessibility tests (`toBeAccessible()`, roles, ARIA attributes)
- Mock external dependencies appropriately
- Clean up after each test (use `beforeEach`/`afterEach`)

#### Required Tests for New Components

1. **Rendering Tests**
   - Renders without crashing
   - Renders with default props
   - Renders with custom props
   - Accessibility compliance

2. **Interaction Tests**
   - User interactions (clicks, keyboard, etc.)
   - State changes
   - Event callbacks

3. **Variant/Style Tests**
   - All visual variants
   - Responsive behavior
   - Theme integration

4. **Edge Cases**
   - Error states
   - Loading states
   - Empty states
   - Invalid props

### Git Workflow

#### Branch Naming

- Feature: `feature/component-name`
- Bug fix: `fix/issue-description`
- Refactor: `refactor/area-being-refactored`

#### Commit Messages

Follow conventional commits:

```
feat(button): add loading state support
fix(theme): resolve token inheritance issue
test(modal): add accessibility tests
docs(readme): update installation instructions
```

#### Pull Request Requirements

**All PRs must pass the following checks:**

1. ✅ TypeScript compilation (`pnpm run typecheck`)
2. ✅ ESLint validation (`pnpm run lint`)
3. ✅ All tests passing (`pnpm run test`)
4. ✅ Build successful (`pnpm run build`)
5. ✅ Code review approval

#### Definition of Done

A feature is considered "done" when:

- [ ] Implementation is complete and functional
- [ ] Comprehensive tests are written and passing
- [ ] TypeScript types are properly defined
- [ ] ESLint passes without warnings
- [ ] Component is documented with JSDoc
- [ ] Accessibility requirements are met
- [ ] Code review is approved
- [ ] CI/CD pipeline passes

### VS Code Configuration

The project includes VS Code workspace settings for optimal development experience:

- **Auto-formatting**: Code is formatted on save using ESLint and Prettier
- **Type checking**: Real-time TypeScript error detection
- **Testing**: Jest integration with VS Code Test Explorer
- **Extensions**: Recommended extensions are automatically suggested

#### Recommended Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Jest
- Tailwind CSS IntelliSense

## Architecture Patterns

### Color System & Theming

#### Theme Architecture

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
  primary: { 50: "#...", 500: "#...", 900: "#..." },
  secondary: { 50: "#...", 500: "#...", 900: "#..." },
  neutral: { 50: "#...", 500: "#...", 900: "#..." },

  // Semantic colors
  success: { 50: "#...", 500: "#...", 900: "#..." },
  warning: { 50: "#...", 500: "#...", 900: "#..." },
  error: { 50: "#...", 500: "#...", 900: "#..." },
  info: { 50: "#...", 500: "#...", 900: "#..." },
};

// Usage example
const theme = {
  surface: {
    page: colors.neutral[50],
    card: colors.neutral[0],
    raised: colors.neutral[100],
  },
  intent: {
    primary: colors.primary[500],
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
  },
};
```

#### Component Color Props

```typescript
// ❌ Bad - hardcoded colors
<Badge status="success" />

// ✅ Good - semantic color props
<Badge intent="success" />
<Badge intent="warning" />
<Badge intent="error" />
```

### Component Design Patterns

#### Intent-Based Component API

**Rule**: All interactive components must use semantic intent props with a unified theme system

**Core Principle**: Use existing `bg`, `border`, `text` structure from theme. Dark/light themes already handle color variations automatically.

```typescript
// Unified intent and variant types
type ComponentIntent =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";
type ComponentVariant = "solid" | "outline" | "ghost" | "subtle";
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

// Existing theme structure (no changes needed!)
const theme = {
  intent: {
    primary: { bg: "...", border: "...", text: "..." },
    success: { bg: "...", border: "...", text: "..." },
    warning: { bg: "...", border: "...", text: "..." },
    error: { bg: "...", border: "...", text: "..." },
    info: { bg: "...", border: "...", text: "..." },
    neutral: { bg: "...", border: "...", text: "..." }, // Added for table actions
  },
};
```

**Variant Helper Function**:

```typescript
// Single helper transforms bg/border/text into all variants
const getIntentStyle = (tokens, intent, variant) => {
  const colors = tokens.intent[intent];

  switch (variant) {
    case "solid":
      return { bg: colors.text, color: tokens.page, border: colors.text };
    case "outline":
      return { bg: "transparent", color: colors.text, border: colors.border };
    case "ghost":
      return { bg: "transparent", color: colors.text, border: "transparent" };
    case "subtle":
      return { bg: colors.bg, color: colors.text, border: colors.border }; // Default
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

### Data Management Patterns

#### Generic Filtering System

**Rule**: Use strongly-typed, configurable filtering components with TanStack Query integration

**Architecture**: Generic filter hooks + stateless components + typed configurations

```typescript
// Filter configuration pattern
interface ProductFilters {
  search: string;
  category: "electronics" | "clothing" | "books";
  price: number;
  status: "active" | "inactive";
}

const productFilterConfig: FilterConfig<ProductFilters> = {
  search: {
    name: "search",
    label: "Search Products",
    type: "text",
    placeholder: "Name, SKU, description...",
  },
  category: {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "All Categories",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
    ],
  },
};
```

**Filter Components**:

```typescript
// Generic filter hook usage
const {
  filters,
  pendingFilters,
  updateFilter,
  applyFilters,
  clearFilters,
  isApplying
} = useFilters(initialFilters, productFilterConfig);

// TanStack Query integration
const { data, isLoading, isFetching, error } = useProducts(filters);

// Stateless filter components
<FiltersForm onSubmit={applyFilters} onReset={clearFilters}>
  <FilterGroup title="Product Filters">
    <TextFilter
      value={pendingFilters.search}
      onChange={(value) => updateFilter('search', value)}
      placeholder="Search products..."
    />
    <SelectFilter
      value={pendingFilters.category}
      onChange={(value) => updateFilter('category', value)}
      options={categoryOptions}
    />
  </FilterGroup>

  <FilterActions
    onApply={applyFilters}
    onClear={clearFilters}
    isLoading={isApplying}
  />
</FiltersForm>
```

**Key Principles**:

- **Apply Button Pattern**: Manual filter application instead of debounce
- **Stateless Components**: No internal state in design system components
- **Strong Typing**: Generic types enforce configuration compatibility
- **Configurable Texts**: All labels, placeholders via props
- **Loading States**: Proper loading/error handling for filters and data

#### Enhanced Table Architecture

**Rule**: Modular table components with focused responsibilities under 200 lines each

**Component Structure**:

```typescript
// Main Table component (149 lines) - orchestrates sub-components
<Table
  data={data}
  columns={columns}
  actions={actions}
  isLoading={isLoading}
  isFetching={isFetching}
  error={error}
  actionsHeaderText="Actions"
/>

// Sub-components handle specific concerns
- TableHeader: Column headers with proper alignment
- TableRow: Individual row rendering with actions
- TableActions: Action button group with consistent spacing
- TableSkeleton: Loading state matching actual table structure
- LoadingOverlay: Data refresh overlay
- EmptyState/ErrorState: Feedback states
```

**Icon System**:

```typescript
// SVG icons from lucide-react for consistency
import { ViewIcon, EditIcon, DeleteIcon } from "@nevo/design-system";

const actions: TableAction<Product>[] = [
  {
    icon: <ViewIcon />,
    label: "View Product",
    intent: "neutral",
    variant: "ghost"
  }
];
```

**Loading States Pattern**:

- **Skeleton**: Initial loading (no data available)
- **Overlay**: Data refresh (existing data with loading indicator)
- **Empty State**: No data with configurable message/icon
- **Error State**: Error handling with retry option

#### Constant Definitions

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

### Performance Guidelines

#### Component Performance

- Use `React.memo()` for expensive components
- Implement proper dependency arrays in hooks
- Avoid inline object/function creation in render
- Use `useMemo` and `useCallback` judiciously
- Define objects/arrays outside components when possible
- Implement proper memoization for list items

#### Bundle Optimization

- Use dynamic imports for route-based code splitting
- Implement lazy loading for heavy components
- Optimize images and assets
- Tree-shaking friendly exports
- Avoid large dependencies
- Use dynamic imports for non-critical features

#### Runtime Performance

- Minimize re-renders with proper memoization
- Use React DevTools Profiler to identify bottlenecks
- Implement virtualization for long lists

## Technical Standards

### TypeScript Standards

#### Strict Configuration

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

#### Prop Types

```typescript
// ✅ Good - explicit and descriptive
interface ButtonProps {
  intent?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### File Naming Conventions

#### Components

- PascalCase: `StatusBadge.tsx`
- One component per file
- Export as named export

#### Hooks

- camelCase with `use` prefix: `useOrderData.ts`

#### Types

- PascalCase: `OrderStatus.ts`
- Prefer interfaces over types for objects

#### Constants

- SCREAMING_SNAKE_CASE: `API_ENDPOINTS.ts`

### Responsive Design

#### Breakpoint System

Use Tailwind's default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

#### Mobile-First Approach

```css
/* ✅ Good - mobile first */
.component {
  @apply text-sm;
  @apply md:text-base;
  @apply lg:text-lg;
}
```

### Accessibility Standards

#### WCAG 2.1 AA Compliance

- Proper semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements (4.5:1 for normal text)

#### Implementation

- Use proper ARIA labels
- Implement focus management
- Provide alternative text for images
- Ensure logical tab order

### State Management

#### Local State: useState/useReducer

For component-level state

#### Server State: TanStack Query

For API data fetching and caching

#### Global State: Zustand (if needed)

For truly global application state

### Routing Architecture

#### Recommended Router: React Router v6

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

### Testing Strategy

#### Unit Tests: Vitest

- Test component behavior, not implementation
- Focus on user interactions and outcomes

#### Component Tests: Testing Library

- Test accessibility and user experience
- Avoid testing internal state

## Tooling & Infrastructure

### Build & Development

#### Package Manager: PNPM

- Efficient disk usage
- Fast installations
- Workspace support

#### Build Tool: Vite

- Fast development server
- Optimized production builds
- TypeScript support out of the box

#### Monorepo: Turbo

- Intelligent caching
- Parallel task execution
- Dependency graph optimization

### Component Documentation

- Use JSDoc comments for all public APIs
- Include usage examples in comments
- Document prop types and default values

````typescript
/**
 * A flexible button component that supports multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** The visual style variant */
  variant?: "primary" | "secondary" | "danger";
  /** The size of the button */
  size?: "sm" | "md" | "lg";
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}
````

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release PR
4. Merge after approval
5. Tag release
6. Publish to npm (automated)

### Support

For questions or issues:

- Check existing documentation
- Search GitHub issues
- Create new issue with reproduction steps
- Ask in team chat for urgent matters

**Remember: Quality over speed. Well-tested, accessible, and maintainable code is always preferred over quick implementations.**

---

## Project Summary

- `packages/design-system` - buttons, cards, inputs, selects, badge, table, pagination, modal, topbar, sidebar, theme provider
- `apps/admin` - demo product list + filters

## Next Steps

1. **Audit Current Implementation**: Identify deviations from these guidelines
2. **Refactor Phase**: Address architectural issues systematically
3. **Migration Plan**: Move hardcoded values to theme system
4. **Component Library**: Standardize component API interfaces
5. **Documentation**: Create component documentation with Storybook
