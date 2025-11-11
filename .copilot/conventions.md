# Coding Conventions

This document defines the coding standards, naming conventions, and style guidelines for the nEvo Ecommerce Admin project.

## 📝 Language & Documentation

### Language Requirements

**Rule**: All code, comments, documentation, and specifications must be written in **English**.

**Applies to**:
- Source code (`.ts`, `.tsx`, `.js`, `.jsx`)
- Comments and JSDoc
- README files and markdown documentation
- Commit messages and PR descriptions
- Error messages and console logs
- Type definitions and interfaces
- Storybook stories and examples

**Exceptions**:
- User-facing content (if specifically required for Polish users)
- Test data that simulates user input

```typescript
// ✅ GOOD - English everywhere
interface ButtonProps {
  /** The visual intent of the button */
  intent?: ComponentIntent;
  /** Whether the button is in loading state */
  loading?: boolean;
}

// ❌ BAD - Non-English comments
interface ButtonProps {
  /** Intencja przycisku */
  intent?: ComponentIntent;
  /** Czy przycisk jest w stanie ładowania */
  loading?: boolean;
}
```

---

## 🏗️ Naming Conventions

### Files and Folders

#### React Components
```
PascalCase.tsx
Button.tsx
Card.tsx
FormField.tsx
```

#### Non-component TypeScript
```
camelCase.ts
useFilters.ts
productsApi.ts
themeHelpers.ts
```

#### Test Files
```
ComponentName.test.tsx
hookName.test.ts
```

#### Storybook Stories
```
ComponentName.stories.tsx
Button.stories.tsx
```

#### Folders
```
kebab-case/
design-system/
api-client/
form-fields/
```

### TypeScript Naming

#### Interfaces and Types
```typescript
// Interfaces: PascalCase with "Props" suffix for component props
interface ButtonProps {
  intent?: ComponentIntent;
  variant?: ButtonVariant;
}

// Type aliases: PascalCase
type ComponentIntent = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle';

// Generic type parameters: Single uppercase letter or PascalCase
function identity<T>(value: T): T
type FormValues<TData> = { ... }
```

#### Variables and Functions
```typescript
// camelCase for variables, functions, and methods
const currentTheme = 'light';
const handleClick = () => {};
const isDisabled = false;

// Boolean variables: use is/has/can/should prefix
const isLoading = true;
const hasError = false;
const canSubmit = true;
const shouldRender = false;
```

#### Constants
```typescript
// UPPER_SNAKE_CASE for true constants
const MAX_RETRY_COUNT = 3;
const DEFAULT_PAGE_SIZE = 25;

// camelCase for config objects
const themeConfig = {
  light: { ... },
  dark: { ... }
};
```

#### Enums
```typescript
// PascalCase for enum name, PascalCase for members
enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
```

---

## 🎨 Code Style

### TypeScript

#### Strict Mode
```typescript
// tsconfig.json - always use strict mode
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

#### No Any Types
```typescript
// ❌ AVOID
const data: any = fetchData();
function process(input: any): any { }

// ✅ PREFER
const data: UserData = fetchData();
function process(input: FormData): ProcessedData { }

// ✅ ACCEPTABLE - with explicit justification
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dynamicValue: any = JSON.parse(response); // OK: parsing unknown JSON
```

#### Prefer Interfaces Over Types for Objects
```typescript
// ✅ PREFER interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ PREFER types for unions, intersections, primitives
type Status = 'active' | 'inactive' | 'pending';
type ID = string | number;
type WithTimestamps = { createdAt: Date; updatedAt: Date };
```

#### Export Types
```typescript
// ✅ ALWAYS export component prop types
export interface ButtonProps {
  intent?: ComponentIntent;
  variant?: ButtonVariant;
  size?: ComponentSize;
  children: React.ReactNode;
}

export function Button({ intent, variant, size, children }: ButtonProps) {
  // ...
}
```

### React Components

#### Function Components with TypeScript
```typescript
// ✅ PREFER named function exports
export function Button({ intent = 'neutral', variant = 'solid', children }: ButtonProps) {
  return <button className={...}>{children}</button>;
}

// ❌ AVOID arrow function exports (for better stack traces)
export const Button: React.FC<ButtonProps> = ({ intent, variant }) => { };
```

#### Props Destructuring
```typescript
// ✅ GOOD - destructure in function signature
export function Button({ intent, variant, size, children, className }: ButtonProps) {
  // ...
}

// ❌ AVOID - destructuring in body
export function Button(props: ButtonProps) {
  const { intent, variant } = props;
  // ...
}
```

#### Default Props
```typescript
// ✅ PREFER default parameters
export function Button({
  intent = 'neutral',
  variant = 'solid',
  size = 'md',
  children,
}: ButtonProps) {
  // ...
}

// ❌ AVOID defaultProps (deprecated in function components)
Button.defaultProps = {
  intent: 'neutral',
  variant: 'solid',
};
```

---

## 📐 Design System Patterns

### Component API Consistency

All design system components should follow these patterns:

#### Standard Props
```typescript
interface ComponentProps {
  // Intent - semantic meaning
  intent?: ComponentIntent; // 'primary' | 'success' | 'error' | ...
  
  // Variant - visual style
  variant?: 'solid' | 'outline' | 'ghost' | 'subtle';
  
  // Size - physical dimensions
  size?: ComponentSize; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  // Custom styling
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  // Standard HTML attributes
  id?: string;
  disabled?: boolean;
  
  // Content
  children?: React.ReactNode;
}
```

#### Intent-based Theming
```typescript
type ComponentIntent = 
  | 'primary'   // Main actions, brand colors
  | 'success'   // Positive actions, confirmations
  | 'error'     // Destructive actions, errors
  | 'warning'   // Cautionary actions
  | 'info'      // Informational
  | 'neutral';  // Default, secondary actions
```

#### Size Scale
```typescript
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Minimum touch target: 44px (WCAG 2.1 AA)
// - xs: 32px (use sparingly, ensure adequate spacing)
// - sm: 40px
// - md: 44px (default for interactive elements)
// - lg: 48px
// - xl: 56px
```

### Using Primitives

#### In Stories
```typescript
// ✅ ALWAYS use design system primitives in stories
export const Example: Story = {
  render: () => (
    <Card>
      <Typography type="card-title" className="mb-2">
        Example Title
      </Typography>
      <Typography type="body">
        Example body text
      </Typography>
      <Button intent="primary">Action</Button>
    </Card>
  ),
};

// ❌ NEVER use raw HTML in stories
export const Example: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Example Title</h3>
      <p className="text-sm">Example body text</p>
      <button className="bg-blue-500 text-white px-4 py-2">Action</button>
    </div>
  ),
};
```

---

## 🔍 Import Organization

### Import Order
```typescript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';

// 2. Internal packages (monorepo)
import { useTheme } from '@nevo/design-system';
import { productsApi } from '@nevo/api-client';

// 3. Relative imports - types first
import type { ButtonProps } from './types';
import type { ThemeTokens } from '../theme';

// 4. Relative imports - components and utilities
import { Button } from './Button';
import { formatDate } from '../utils/date';

// 5. Styles (if separate)
import './Button.css';
```

### Named vs Default Exports
```typescript
// ✅ PREFER named exports
export function Button() { }
export { Button };

// ❌ AVOID default exports (harder to refactor, rename, find)
export default Button;
```

---

## ✅ Accessibility (a11y)

### Semantic HTML
```typescript
// ✅ GOOD - semantic HTML
export function Alert({ children }: AlertProps) {
  return (
    <div role="alert" aria-live="polite">
      {children}
    </div>
  );
}

// ❌ BAD - non-semantic
export function Alert({ children }: AlertProps) {
  return <div>{children}</div>;
}
```

### ARIA Attributes
```typescript
// ✅ GOOD - proper ARIA labels
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  <XIcon />
</button>

// ❌ BAD - no accessible label for icon button
<button>
  <XIcon />
</button>
```

### Keyboard Navigation
```typescript
// ✅ GOOD - keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>

// ❌ BAD - no keyboard support
<div onClick={handleClick}>
  Click me
</div>
```

---

## 🧪 Testing Conventions

### Test File Structure
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => { });
    it('renders with default props', () => { });
    it('renders all variants correctly', () => { });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => { });
    it('handles keyboard events', () => { });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', () => { });
    it('has proper ARIA attributes', () => { });
  });

  describe('Edge Cases', () => {
    it('handles loading state', () => { });
    it('handles error state', () => { });
  });
});
```

---

## 📦 Git Conventions

### Branch Naming
```
features/<epic>/<task>-<description>
features/000-devops/001-ci-cd-tests
features/001-ui/002-button-component
```

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(button): add loading state support
fix(theme): resolve token inheritance issue
docs(readme): update installation instructions
test(modal): add accessibility tests
refactor(table): extract row component
```

---

## 🚫 Anti-Patterns to Avoid

### TypeScript
```typescript
// ❌ AVOID any without justification
const data: any = response;

// ❌ AVOID non-null assertion without verification
const user = users.find(u => u.id === id)!;

// ❌ AVOID type casting
const button = document.querySelector('button') as HTMLButtonElement;

// ✅ PREFER proper typing
const user = users.find(u => u.id === id);
if (!user) throw new Error('User not found');
```

### React
```typescript
// ❌ AVOID inline object/array creation in render
<Component config={{ foo: 'bar' }} items={[1, 2, 3]} />

// ✅ PREFER extracted constants
const config = { foo: 'bar' };
const items = [1, 2, 3];
<Component config={config} items={items} />

// ❌ AVOID unnecessary useEffect
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ PREFER direct state updates
setCount(prev => prev + 1);
```

---

## ⚡ Performance Best Practices

### Component Performance

**Use React.memo() for expensive components**:
```tsx
// ✅ Good - memoized component
export const ExpensiveList = React.memo<ExpensiveListProps>(({ items, onItemClick }) => {
  return (
    <ul>
      {items.map(item => (
        <ExpensiveListItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </ul>
  );
});

// ❌ Bad - re-renders unnecessarily
export const ExpensiveList = ({ items, onItemClick }) => {
  // Component re-renders even when props haven't changed
  return <ul>...</ul>;
};
```

**Avoid inline object/function creation in render**:
```tsx
// ❌ Bad - creates new object/function on every render
<Component 
  config={{ foo: 'bar' }} 
  onClick={() => handleClick(id)}
/>

// ✅ Good - extracted constants and memoized functions
const config = { foo: 'bar' }; // Outside component or useMemo

export const MyComponent = ({ id }) => {
  const handleClickMemo = useCallback(() => {
    handleClick(id);
  }, [id]);
  
  return <Component config={config} onClick={handleClickMemo} />;
};
```

**Use useMemo and useCallback judiciously**:
```tsx
// ✅ Good - expensive computation memoized
const sortedItems = useMemo(() => {
  return items
    .filter(item => item.active)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// ✅ Good - callback memoized for child component
const handleItemClick = useCallback((itemId: string) => {
  setSelectedId(itemId);
  onItemSelect?.(itemId);
}, [onItemSelect]);

// ❌ Bad - unnecessary memoization (simple value)
const displayName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

// ✅ Good - just compute directly
const displayName = `${firstName} ${lastName}`;
```

**Define objects/arrays outside components when possible**:
```tsx
// ✅ Good - constant defined outside component
const STATUS_COLOR_MAP = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'error'
} as const;

export const OrderStatus = ({ status }) => {
  const intent = STATUS_COLOR_MAP[status];
  return <Badge intent={intent}>{status}</Badge>;
};

// ❌ Bad - recreated on every render
export const OrderStatus = ({ status }) => {
  const statusMap = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'error'
  };
  return <Badge intent={statusMap[status]}>{status}</Badge>;
};
```

**Implement proper dependency arrays in hooks**:
```tsx
// ✅ Good - all dependencies listed
useEffect(() => {
  fetchUserData(userId);
}, [userId, fetchUserData]);

// ❌ Bad - missing dependencies (ESLint will warn)
useEffect(() => {
  fetchUserData(userId);
}, []); // userId and fetchUserData are missing!

```

//  Good - no dependencies needed
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []); // Correct - no external dependencies
```

### Bundle Optimization

**Use dynamic imports for route-based code splitting**:
```tsx
//  Good - lazy load route components
const Dashboard = lazy(() => import('./features/dashboard/DashboardPage'));
const Orders = lazy(() => import('./features/orders/OrdersPage'));
const Products = lazy(() => import('./features/products/ProductsPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
  },
  // ...
]);
```

**Implement lazy loading for heavy components**:
```tsx
//  Good - lazy load heavy chart library
const HeavyChart = lazy(() => import('./components/HeavyChart'));

export const Dashboard = () => (
  <Suspense fallback={<Loading />}>
    <HeavyChart data={chartData} />
  </Suspense>
);
```

**Tree-shaking friendly exports**:
```tsx
//  Good - named exports enable tree-shaking
export { Button } from './Button';
export { Card } from './Card';
export { Modal } from './Modal';

//  Bad - default export of all components
export default { Button, Card, Modal };
```

**Avoid large dependencies**:
```tsx
//  Bad - importing entire lodash library
import _ from 'lodash';
_.debounce(fn, 300);

//  Good - import only what you need
import debounce from 'lodash/debounce';
debounce(fn, 300);

//  Better - use native alternatives when possible
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

### Runtime Performance

**Minimize re-renders with proper memoization**:
```tsx
//  Good - memoized list items
const MemoizedItem = React.memo(({ item, onClick }) => (
  <li onClick={() => onClick(item.id)}>
    {item.name}
  </li>
));

export const ItemList = ({ items }) => {
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <ul>
      {items.map(item => (
        <MemoizedItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </ul>
  );
};
```

**Implement virtualization for long lists**:
```tsx
//  Good - virtualized list for 1000+ items
import { useVirtualizer } from '@tanstack/react-virtual';

export const VirtualizedProductList = ({ products }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Row height
  });
  
  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: `px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <ProductRow
            key={virtualRow.key}
            product={products[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `px`,
              transform: `translateY(px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

**Use React DevTools Profiler to identify bottlenecks**:
1. Install React DevTools extension
2. Open DevTools > Profiler tab
3. Click "Record" and interact with your app
4. Analyze flame graph for slow components
5. Optimize components with most render time

**When to optimize**:
-  Optimize when you measure a performance issue
-  Optimize list rendering with many items (100+)
-  Optimize expensive computations
-  Don't optimize prematurely
-  Don't memoize everything by default

---

##  Responsive Design

### Breakpoint System

**Use Tailwind's default breakpoints**:

```tsx
// Tailwind breakpoints
sm: 640px   // Small devices (landscape phones)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices
2xl: 1536px // Extra extra large devices
```

### Mobile-First Approach

**Rule**: Design for mobile first, then add styles for larger screens.

```tsx
//  Good - mobile first
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>

<div className="p-4 md:p-6 lg:p-8">
  {/* Smaller padding on mobile, larger on desktop */}
</div>

//  Bad - desktop first
<div className="text-lg lg:text-base md:text-sm">
  Wrong approach
</div>
```

### Responsive Utilities

**Common responsive patterns**:

```tsx
// Show/hide elements
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>

// Responsive spacing
<div className="space-y-2 md:space-y-4 lg:space-y-6">
  {/* Items */}
</div>

// Responsive flex direction
<div className="flex flex-col md:flex-row">
  {/* Stack on mobile, row on desktop */}
</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Responsive grid with gaps */}
</div>
```

---

##  State Management

### Local Component State: useState / useReducer

**Use for**: Component-level state that doesn't need to be shared.

```tsx
//  Good - simple state
const [isOpen, setIsOpen] = useState(false);
const [count, setCount] = useState(0);

//  Good - complex state with useReducer
type State = {
  filters: ProductFilters;
  pagination: { page: number; pageSize: number };
  sorting: { column: string; direction: 'asc' | 'desc' };
};

type Action =
  | { type: 'SET_FILTER'; payload: Partial<ProductFilters> }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SORT'; payload: { column: string; direction: 'asc' | 'desc' } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_PAGE':
      return { ...state, pagination: { ...state.pagination, page: action.payload } };
    case 'SET_SORT':
      return { ...state, sorting: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

### Server State: TanStack Query

**Use for**: API data fetching, caching, and synchronization.

```tsx
//  Good - use TanStack Query for server data
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutations
const queryClient = useQueryClient();

const updateProductMutation = useMutation({
  mutationFn: (product: Product) => updateProduct(product),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});

//  Bad - managing server state with useState
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetchProducts().then(setData).finally(() => setLoading(false));
}, []);
```

### Global App State: Zustand (if needed)

**Use for**: Truly global application state (user preferences, theme, etc.).

```tsx
//  Good - Zustand for global state
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'app-storage',
    }
  )
);

// Usage
const { theme, setTheme } = useAppStore();
```

**When to use each**:
- **useState**: Simple component state (open/close, current tab)
- **useReducer**: Complex component state with multiple actions
- **TanStack Query**: All server data (GET, POST, PUT, DELETE)
- **Zustand**: Global app state (theme, user preferences, sidebar state)

 **Avoid**: Using global state for everything. Keep state as local as possible.

---

##  VS Code Configuration
