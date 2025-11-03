# nEvo Ecommerce Admin - Turbo monorepo

Modern React admin interface with comprehensive table filtering system and modular design architecture.

- Turbo + pnpm workspaces
- `packages/design-system`: React component library + Tailwind CSS design tokens → `@nevo/design-system`
- `apps/admin`: Vite React app using `@nevo/design-system` → `@nevo/ecommerce-admin-app`

## Quick Start

1. Install pnpm: https://pnpm.io
2. `pnpm install`
3. `pnpm dev` to run development servers in parallel
4. Open `http://localhost:5173` (or other port if busy)

## Architecture Overview

### Design System (`packages/design-system`)

```
src/
├── primitives/     # Button, Input, Select, Badge, Card, Typography
├── layout/         # Grid, Stack, Container components
├── navigation/     # Topbar, Sidebar navigation
├── data/          # Data display and filtering system
│   ├── Table/      # Modular table components (149 lines main component)
│   │   ├── Table.tsx           # Main orchestrator component
│   │   ├── TableHeader.tsx     # Header with centered titles
│   │   ├── TableRow.tsx        # Row rendering with actions
│   │   ├── TableActions.tsx    # Action button groups
│   │   ├── TableSkeleton.tsx   # Loading skeleton state
│   │   └── LoadingOverlay.tsx  # Data refresh overlay
│   ├── FilterGroup.tsx         # Filter container
│   ├── FiltersForm.tsx         # Filter form with submit/reset
│   ├── TextFilter.tsx          # Text input filtering
│   ├── NumberFilter.tsx        # Number input filtering
│   ├── SelectFilter.tsx        # Dropdown select filtering
│   └── FilterActions.tsx       # Apply/Clear button group
├── icons/         # SVG icon system (lucide-react)
├── feedback/      # Loading, Progress, Alert, Toast, EmptyState, ErrorState
├── overlays/      # Modal system
├── theme/         # ThemeProvider, tokens, style helpers
└── utils/         # Utility functions and hooks
```

### Admin App (`apps/admin`)

```
src/
├── features/      # Vertical slices (products, dashboard, orders, users)
│   └── products/   # Product management feature
│       ├── components/     # ProductsTable, ProductsFilters
│       ├── hooks/          # useProductFilters
│       ├── pages/          # ProductsList
│       └── types/          # Product interface
├── hooks/         # Generic application hooks (useFilters, useProducts)
├── services/      # API integration (productsApi)
├── shared/        # Shared components, hooks, utils, constants
├── router/        # React Router configuration
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Key Features

### Enhanced Data Management

- **Generic Filtering System**: Strongly-typed filters with TanStack Query integration
- **Modular Table Architecture**: Components split by responsibility (<200 lines each)
- **Loading State Management**: Skeleton, overlay, empty, and error states
- **Apply/Clear Pattern**: Manual filter application with proper loading indicators

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build

# Build specific package
pnpm --filter @nevo/design-system build
pnpm --filter @nevo/ecommerce-admin-app build

# Run tests (when available)
pnpm test
```
