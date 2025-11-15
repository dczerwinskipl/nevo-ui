# Architecture Overview

This document describes the high-level architecture of the nEvo Ecommerce Admin monorepo.

## System Architecture

```
nEvo Ecommerce Admin (Monorepo)
│
├── apps/                          # Applications
│   └── admin/                     # Admin web application
│       ├── src/
│       │   ├── features/          # Feature modules (vertical slices)
│       │   ├── hooks/             # Shared React hooks
│       │   ├── services/          # API services
│       │   ├── router/            # React Router configuration
│       │   ├── shared/            # Shared utilities
│       │   ├── App.tsx            # Root component
│       │   └── main.tsx           # Entry point
│       ├── e2e/                   # Playwright E2E tests
│       └── public/                # Static assets
│
├── packages/                      # Shared packages
│   ├── design-system/             # UI component library
│   │   ├── src/
│   │   │   ├── primitives/        # Basic components
│   │   │   ├── forms/             # Form components
│   │   │   ├── navigation/        # Navigation components
│   │   │   ├── data/              # Data display components
│   │   │   ├── feedback/          # Feedback components
│   │   │   ├── overlays/          # Modal, tooltip, etc.
│   │   │   ├── theme/             # Theme system
│   │   │   └── utils/             # Utilities
│   │   └── .storybook/            # Storybook configuration
│   │
│   ├── api-client/                # API client library
│   │   └── src/
│   │       ├── index.ts           # Exports
│   │       └── shared/            # Shared types/utilities
│   │
│   └── api-mocks/                 # MSW-based API mocking
│       └── src/
│           ├── browser.ts         # Browser MSW setup
│           ├── node.ts            # Node MSW setup
│           ├── playwright.ts      # Playwright MSW setup
│           ├── storybook.ts       # Storybook MSW integration
│           ├── data/              # Mock data
│           └── foundation/        # MSW handlers & scenarios
│
└── spec/                          # Technical specifications
    └── <epic-number>-<epic-name>/ # Organized by epic
```

---

## Design Principles

### 1. **Monorepo Benefits**

- **Shared dependencies**: Single version of React, TypeScript, etc.
- **Code sharing**: Design system used by admin app
- **Atomic changes**: Update library and app in same PR
- **Consistent tooling**: Shared lint, test, build configs

### 2. **Package Boundaries**

- **Design System** (`packages/design-system`):
  - Pure UI components
  - No business logic
  - No API calls
  - Domain-agnostic
- **API Client** (`packages/api-client`):
  - HTTP communication
  - Type definitions for API
  - Request/response handling
- **API Mocks** (`packages/api-mocks`):
  - MSW handlers
  - Scenario management
  - Mock data generation
- **Admin App** (`apps/admin`):
  - Business logic
  - Feature implementation
  - State management
  - Routing

### 3. **Dependency Flow**

```
apps/admin
  ↓ depends on
packages/design-system
packages/api-client
packages/api-mocks (dev only)

packages/design-system
  ↓ depends on
React, Tailwind CSS, Theme system

packages/api-mocks
  ↓ depends on
MSW, packages/api-client (types)
```

---

## Admin App Architecture

### Feature-Based Structure

**Philosophy**: Organize code by feature (vertical slice) rather than by technical role.

```
features/products/
├── components/          # Product-specific components
│   ├── ProductsTable.tsx
│   └── ProductFilters.tsx
├── hooks/               # Product-specific hooks
│   └── useProductFilters.ts
├── pages/               # Product pages/routes
│   └── ProductsList.tsx
└── types/               # Product types
    └── product.ts
```

**Benefits**:

- Related code stays together
- Easy to find feature logic
- Clear boundaries
- Can extract to separate package if needed

### Shared vs. Feature Code

#### **Shared** (`src/shared/`, `src/hooks/`, `src/services/`)

Generic, reusable code used across features:

- Generic hooks (`useFilters`, `usePagination`)
- Utilities (`formatDate`, `debounce`)
- Constants (`API_BASE_URL`)

#### **Feature-Specific**

Domain-specific code tied to a feature:

- Product filtering logic
- Order status display
- User management forms

---

## Design System Architecture

### Component Hierarchy

```
Primitives (Low-level, single-purpose)
├── Button
├── Input
├── Card
├── Badge
└── Typography
    ↓ used to build
Composite Components (Higher-level, multiple primitives)
├── FormField (Label + Input + Error)
├── Table (Header + Row + Actions)
└── Modal (Header + Body + Footer)
    ↓ used to build
Feature Components (App-specific, lives in apps/)
├── ProductsTable
├── ProductFilters
└── UserProfile
```

### Component API Patterns

All design system components follow consistent patterns:

#### **Standard Props**

```typescript
interface ComponentProps {
  intent?: ComponentIntent; // Semantic meaning
  variant?: ComponentVariant; // Visual style
  size?: ComponentSize; // Physical size
  className?: string; // Custom classes
  children?: React.ReactNode; // Content
  disabled?: boolean; // Disabled state
  // ... component-specific props
}
```

#### **Theme Integration**

```typescript
export function Component({ intent, variant, size }: ComponentProps) {
  const { tokens } = useTheme();
  const style = getIntentStyle(tokens, intent, variant);

  return (
    <element
      style={{
        backgroundColor: style.background,
        color: style.color,
        borderColor: style.border,
      }}
    >
      {children}
    </element>
  );
}
```

### Storybook Integration

Every component must have comprehensive Storybook stories:

```typescript
// ComponentName.stories.tsx
export default {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

// Required stories:
export const Default: Story = { ... };           // Default state
export const AllVariants: Story = { ... };       // All variants
export const AllSizes: Story = { ... };          // All sizes
export const WithCustomStyling: Story = { ... }; // Custom styling
export const Interactive: Story = { ... };       // Interactive example
```

---

## State Management

### Data Fetching: TanStack Query

**Why TanStack Query**:

- Automatic caching
- Background refetching
- Loading/error states
- Optimistic updates

```typescript
// In feature component
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["products", filters],
  queryFn: () => productsApi.getAll(filters),
});
```

### Local State: React useState/useReducer

**When to use**:

- UI state (modals, dropdowns)
- Form state (before submission)
- Temporary/derived state

```typescript
const [isOpen, setIsOpen] = useState(false);
const [filters, setFilters] = useState<Filters>({});
```

### Form State: React Hook Form (if needed)

**When to use**:

- Complex forms
- Validation requirements
- Multi-step forms

---

## Routing

### React Router v6

**Structure**:

```typescript
// apps/admin/src/router/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'products', element: <ProductsList /> },
      { path: 'orders', element: <OrdersList /> },
      { path: 'users', element: <UsersList /> },
    ],
  },
]);
```

**Navigation**:

- Sidebar items linked to routes
- Active route highlighted
- Nested routes supported

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

**Location**: Co-located with components

**Coverage**:

- Component rendering
- Props and variants
- User interactions
- Accessibility

```typescript
// Button.test.tsx
describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests (Playwright)

**Location**: `apps/admin/e2e/`

**Coverage**:

- Critical user flows
- Multi-page interactions
- API integration (with MSW)

```typescript
// products.spec.ts
test("user can filter products", async ({ page }) => {
  await page.goto("/products");
  await page.fill('[name="name"]', "shoe");
  await page.click('button:has-text("Apply Filters")');
  await expect(page.locator("table")).toContainText("shoe");
});
```

### Visual Tests (Storybook)

**Coverage**:

- Component visual states
- Theme variations
- Responsive layouts

---

## Build & Development Tools

### Turbo

**Purpose**: Monorepo task orchestration

**Features**:

- Parallel execution
- Dependency-aware builds
- Caching

```bash
# Runs dev for all packages in parallel
pnpm dev

# Builds all packages respecting dependencies
pnpm build
```

### pnpm Workspaces

**Purpose**: Dependency management

**Features**:

- Shared dependencies (hoisted)
- Workspace-specific dependencies
- Fast installs

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

### TypeScript Project References

**Purpose**: Fast incremental builds

**Structure**:

```json
// packages/design-system/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": []
}

// apps/admin/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "references": [
    { "path": "../../packages/design-system" },
    { "path": "../../packages/api-client" }
  ]
}
```

---

## Deployment

### Design System (Storybook)

**Platform**: Cloudflare Pages (or similar)

**Build**:

```bash
pnpm --filter @nevo/design-system storybook:build
# Outputs to packages/design-system/storybook-static/
```

### Admin App

**Platform**: Vercel/Netlify/Cloudflare Pages

**Build**:

```bash
pnpm --filter @nevo/ecommerce-admin-app build
# Outputs to apps/admin/dist/
```

---

## API Integration

### Development Mode

**MSW in Browser**:

```typescript
// apps/admin/src/main.tsx
if (import.meta.env.DEV) {
  const { worker } = await import("@nevo/api-mocks/browser");
  await worker.start();
}
```

### Storybook Mode

**MSW Integration**:

```typescript
// packages/design-system/.storybook/preview.tsx
import { initialize } from "@nevo/api-mocks/storybook";

initialize();
```

### E2E Tests

**MSW in Playwright**:

```typescript
// apps/admin/e2e/fixtures/test.ts
import { test as base } from "@playwright/test";
import { createMSWFixture } from "@nevo/api-mocks/playwright";

export const test = base.extend({
  msw: createMSWFixture(),
});
```

---

## Migration & Evolution

### Adding a New Package

1. Create package directory: `packages/new-package/`
2. Add `package.json` with name `@nevo/new-package`
3. Add to `pnpm-workspace.yaml` (if not using glob)
4. Run `pnpm install`

### Adding a New Feature

1. Create feature directory: `apps/admin/src/features/feature-name/`
2. Add components, hooks, pages, types
3. Create routes in `router/index.tsx`
4. Add navigation links in Sidebar

### Extracting Shared Code

If code becomes reusable:

1. Move to `shared/` if generic
2. Move to `packages/` if used across apps
3. Update imports
4. Add exports to `index.ts`

---

**Last Updated**: November 11, 2025
