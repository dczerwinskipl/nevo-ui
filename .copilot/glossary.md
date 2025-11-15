# Domain Glossary

This document defines domain-specific terminology used throughout the nEvo Ecommerce Admin project. Use these terms consistently in code, documentation, and communication.

---

## Design System Terms

### Component Classification

#### **Primitive**

Foundational, low-level UI components that form the building blocks of the design system.

**Examples**: Button, Input, Card, Badge, Typography

**Characteristics**:

- Single responsibility
- Highly reusable
- No business logic
- Minimal dependencies

```typescript
// Primitive component example
<Button intent="primary" size="md">Save</Button>
```

#### **Composite Component**

Higher-level components composed of multiple primitives or other composites.

**Examples**: FormField (Input + Label + Error), Table (Header + Row + Actions)

**Characteristics**:

- Combines multiple primitives
- Provides complex functionality
- Domain-agnostic
- Reusable patterns

```typescript
// Composite component example
<FormField
  label="Email"
  error="Invalid email"
>
  <Input type="email" />
</FormField>
```

#### **Feature Component**

Application-specific components that implement business logic and use design system components.

**Examples**: ProductsTable, ProductFilters, UserProfile

**Characteristics**:

- Business logic included
- Connects to APIs/state
- Specific to application domain
- Lives in `apps/` not `packages/`

---

## Component API Terms

### **Intent**

The semantic meaning or purpose of a component, translated into visual styling through the theme system.

**Values**: `primary` | `success` | `error` | `warning` | `info` | `neutral`

**Usage**:

```typescript
<Alert intent="error">Operation failed</Alert>
<Button intent="success">Confirm</Button>
```

**Not to be confused with**: Color, theme, or variant

### **Variant**

The visual style or emphasis level of a component, independent of its semantic meaning.

**Common Values**: `solid` | `outline` | `ghost` | `subtle`

**Usage**:

```typescript
<Button variant="solid">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>
```

### **Size**

The physical dimensions of a component.

**Values**: `xs` | `sm` | `md` | `lg` | `xl`

**Usage**:

```typescript
<Button size="sm">Small Button</Button>
<Input size="lg" />
```

**Accessibility Note**: Interactive elements should be `md` (44px) or larger to meet WCAG 2.1 AA touch target requirements.

---

## Data Management Terms

### **Filter**

A user-controlled condition that limits which data items are displayed. Filters are applied manually through an "Apply" button action.

**Types**:

- **TextFilter**: Free-text search (e.g., product name contains "shoe")
- **NumberFilter**: Numeric range (e.g., price between $10 and $50)
- **SelectFilter**: Predefined options (e.g., category equals "Electronics")

**Not to be confused with**: Search (which may apply automatically)

```typescript
interface ProductFilters {
  name?: string; // TextFilter
  minPrice?: number; // NumberFilter
  category?: string; // SelectFilter
  inStock?: boolean; // SelectFilter (boolean)
}
```

### **Facet**

A dimension along which data can be filtered, typically with available values and counts.

**Example**: In an e-commerce product list:

- Category facet: Electronics (45), Clothing (23), Books (67)
- Brand facet: Apple (12), Samsung (8), Nike (15)

**Usage**: Faceted search/navigation

### **Pagination**

The mechanism for dividing large datasets into discrete pages.

**Key Properties**:

- `page`: Current page number (1-indexed)
- `pageSize`: Number of items per page
- `total`: Total number of items
- `totalPages`: Calculated total number of pages

```typescript
interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
```

### **Sorting**

The ordering of data items based on a specific field and direction.

**Properties**:

- `sortBy`: Field name to sort by
- `sortOrder`: `asc` (ascending) or `desc` (descending)

```typescript
interface SortState {
  sortBy: string;
  sortOrder: "asc" | "desc";
}
```

---

## State Management Terms

### **Loading State**

The current status of an asynchronous operation.

**Values**:

- `idle`: No operation in progress
- `loading`: Operation in progress
- `success`: Operation completed successfully
- `error`: Operation failed

```typescript
type LoadingState = "idle" | "loading" | "success" | "error";
```

### **Skeleton**

A placeholder UI that approximates the layout of content while it loads.

**Usage**: Initial page load or when navigating to a new view

```typescript
<TableSkeleton rows={5} />
```

### **Overlay**

A loading indicator displayed on top of existing content during a refresh or update.

**Usage**: Refreshing data without leaving the current view

```typescript
<div style={{ position: 'relative' }}>
  <Table data={products} />
  {isRefreshing && <LoadingOverlay />}
</div>
```

### **Empty State**

UI displayed when a collection has no items to show.

**Usage**: No search results, empty list, or first-time experience

```typescript
<EmptyState
  icon={<PackageIcon />}
  title="No products found"
  description="Try adjusting your filters"
/>
```

### **Error State**

UI displayed when an operation fails.

**Usage**: API errors, network failures, or invalid operations

```typescript
<ErrorState
  title="Failed to load products"
  message={error.message}
  onRetry={refetch}
/>
```

---

## UI Pattern Terms

### **Modal** / **Dialog**

An overlay window that requires user interaction before returning to the main content.

**Types**:

- **Alert Dialog**: Simple message with confirmation
- **Confirmation Dialog**: Asks user to confirm an action
- **Form Dialog**: Contains a form for data entry

**Accessibility**: Must be keyboard accessible and trap focus.

```typescript
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>Confirm Delete</ModalHeader>
  <ModalBody>Are you sure you want to delete this item?</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button intent="error" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

### **Toast** / **Notification**

A temporary message that appears to provide feedback about an action.

**Characteristics**:

- Auto-dismisses after a timeout
- Non-blocking (doesn't require user action)
- Usually appears at screen edge

```typescript
toast.success("Product saved successfully");
toast.error("Failed to save product");
```

### **Alert**

A prominent message that draws attention to important information or actions.

**Characteristics**:

- Persistent (doesn't auto-dismiss unless configured)
- Can be dismissible or non-dismissible
- Semantically meaningful (success, warning, error, info)

```typescript
<Alert intent="warning" dismissible>
  Your session will expire in 5 minutes.
</Alert>
```

### **Tooltip**

A small popup that appears on hover/focus to provide additional information.

**Usage**: Clarify icons, show full text when truncated, provide help text

**Accessibility**: Should also appear on keyboard focus, not just hover

---

## Testing Terms

### **Unit Test**

Tests individual components or functions in isolation.

**Location**: Co-located with component (e.g., `Button.test.tsx`)

**Tools**: Jest, React Testing Library

### **Integration Test**

Tests how multiple components work together.

**Examples**: Form submission, filter application, data loading

### **E2E Test** (End-to-End)

Tests complete user flows through the application.

**Location**: `apps/admin/e2e/`

**Tools**: Playwright

### **Visual Regression Test**

Tests that UI components render correctly across changes.

**Tools**: Storybook with Chromatic or Percy

### **A11y Test** (Accessibility Test)

Tests that components meet accessibility standards.

**Tools**: Storybook a11y addon, axe-core, WAVE

---

## Architecture Terms

### **Monorepo**

A single repository containing multiple related packages.

**Structure**:

```
nevo-ui-v2/
├── apps/           # Applications
│   └── admin/      # Admin application
└── packages/       # Shared packages
    ├── design-system/
    ├── api-client/
    └── api-mocks/
```

### **Workspace**

An individual package within the monorepo.

**Managed by**: pnpm workspaces

**Example**: `@nevo/design-system`, `@nevo/ecommerce-admin-app`

### **Design System**

A collection of reusable components, patterns, and guidelines that ensure consistency across applications.

**Package**: `packages/design-system`

**Exports**: Components, hooks, types, theme system

### **Feature**

A vertical slice of functionality in the application, containing all related components, hooks, types, and logic.

**Structure**:

```
features/products/
├── components/
├── hooks/
├── pages/
└── types/
```

---

## Mock & Testing Terms

### **MSW** (Mock Service Worker)

Library for mocking HTTP requests at the network level.

**Usage**: Development, Storybook, tests

**Advantage**: Same mocks work in browser, Node.js, and Playwright

### **Scenario**

A predefined API response pattern for testing different states.

**Examples**:

- `success`: Normal response
- `empty`: Empty data array
- `loading-slow`: 3-second delay
- `server-error`: HTTP 500 response
- `rate-limit`: HTTP 429 response

```typescript
// Switch scenario in Storybook
scenarios.set("server-error");
```

### **Fixture**

Sample data used in tests.

**Location**: `apps/admin/e2e/fixtures/`

**Usage**: Consistent test data across E2E tests

---

## Storybook Terms

### **Story**

A single example of a component in a specific state.

**File**: `ComponentName.stories.tsx`

```typescript
export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Click me",
  },
};
```

### **Args**

Props/arguments passed to a component in a story.

**Usage**: Define component state for a story

### **Controls**

Interactive UI in Storybook for adjusting args.

**Usage**: Experiment with component props in real-time

### **Addon**

Extension that adds functionality to Storybook.

**Examples**:

- `a11y`: Accessibility testing
- `actions`: Event logging
- `docs`: Auto-generated documentation

---

## Theme Terms

### **Token**

A named value in the design system (color, spacing, typography, etc.).

**Examples**:

- `tokens.colors.primary`
- `tokens.spacing.md`
- `tokens.fontSize.lg`

### **Intent Token**

Theme-aware color tokens that adapt to semantic meaning and variant.

**Structure**:

```typescript
tokens.intent.primary.solid.background;
tokens.intent.error.outline.border;
```

### **Light / Dark Mode**

Theme variants that change the overall color scheme.

**Toggle**: `theme.toggleTheme()`

**Usage**: Provides comfortable viewing in different lighting conditions

---

## Accessibility (a11y) Terms

### **WCAG** (Web Content Accessibility Guidelines)

International standards for web accessibility.

**Target**: WCAG 2.1 Level AA

### **ARIA** (Accessible Rich Internet Applications)

Attributes that make web content more accessible to assistive technologies.

**Examples**:

- `aria-label`: Accessible name
- `aria-describedby`: Additional description
- `role`: Semantic role of element

### **Focus Management**

Controlling which element has keyboard focus.

**Requirements**:

- Visible focus indicators
- Logical tab order
- Trap focus in modals

### **Touch Target**

The area that responds to touch/click input.

**Minimum Size**: 44x44 pixels (WCAG 2.1 AA)

### **Color Contrast**

The difference in luminance between text and background.

**Minimum Ratio**:

- Normal text: 4.5:1
- Large text: 3:1
- UI components: 3:1

---

## Common Abbreviations

| Term     | Full Name            | Meaning                       |
| -------- | -------------------- | ----------------------------- |
| **a11y** | Accessibility        | Numeronym: a + 11 letters + y |
| **i18n** | Internationalization | Numeronym: i + 18 letters + n |
| **l10n** | Localization         | Numeronym: l + 10 letters + n |
| **DS**   | Design System        | Reusable component library    |
| **MSW**  | Mock Service Worker  | HTTP request mocking library  |
| **E2E**  | End-to-End           | Full user flow testing        |
| **PR**   | Pull Request         | Code review request           |
| **TS**   | TypeScript           | Typed superset of JavaScript  |
| **TSX**  | TypeScript XML       | TypeScript with JSX syntax    |

---

**Last Updated**: November 11, 2025
