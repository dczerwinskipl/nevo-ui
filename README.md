# nEvo Ecommerce Admin - Turbo monorepo

- Turbo + pnpm workspaces
- `packages/design-system`: React component library + Tailwind CSS design tokens → `@nevo/design-system`
- `apps/admin`: Vite React app using `@nevo/design-system` → `@nevo/ecommerce-admin-app`

## Szybki start
1. Zainstaluj pnpm: https://pnpm.io
2. `pnpm install`
3. `pnpm dev` aby odpalić równolegle development servers
4. Wejdź na `http://localhost:5173` (lub inny port jeśli zajęty)

## Struktura

### Design System (`packages/design-system`)
```
src/
├── primitives/     # Button, Input, Select, Badge, Card, Typography
├── navigation/     # Topbar, Sidebar 
├── data/          # Table, Pagination
├── forms/         # FormField, FormGroup, FormLabel, FormError
├── feedback/      # Loading, Progress, Alert, Toast
├── overlays/      # Modal
├── theme/         # ThemeProvider, tokens, style helpers
└── utils/         # Utility functions
```

### Admin App (`apps/admin`)
```
src/
├── features/      # Vertical slices (products, dashboard, orders, users)
├── shared/        # Shared components, hooks, utils, constants
├── router/        # React Router configuration
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Design System Features
- **Intent-based API**: Consistent `intent` and `variant` props across components
- **Theme system**: Dark/light mode with 3-tier surfaces (page/card/raised)
- **Semantic tokens**: Unified color system with component-specific tokens
- **Mobile-first**: Responsive design with 44px touch targets
- **TypeScript**: Strict typing with proper interfaces
- **Accessibility**: ARIA attributes and keyboard navigation

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

## Motyw
- Dark i light mode z automatycznym przełączaniem
- 3 poziomy tła (page/card/raised) + delikatny gradient i highlight
- Kolory inspirowane indigo/violet + cyan akcenty
- Unified elevation system (concave, raised, card styles)
