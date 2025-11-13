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
const currentTheme = "light";
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
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
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
function process(input: any): any {}

// ✅ PREFER
const data: UserData = fetchData();
function process(input: FormData): ProcessedData {}

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
type Status = "active" | "inactive" | "pending";
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
export function Button({
  intent,
  variant,
  size,
  children,
  className,
}: ButtonProps) {
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
  intent = "neutral",
  variant = "solid",
  size = "md",
  children,
}: ButtonProps) {
  // ...
}

// ❌ AVOID defaultProps (deprecated in function components)
Button.defaultProps = {
  intent: "neutral",
  variant: "solid",
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
  variant?: "solid" | "outline" | "ghost" | "subtle";

  // Size - physical dimensions
  size?: ComponentSize; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // Custom styling
  className?: string;
  style?: React.CSSProperties;

  // Accessibility
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;

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
  | "primary" // Main actions, brand colors
  | "success" // Positive actions, confirmations
  | "error" // Destructive actions, errors
  | "warning" // Cautionary actions
  | "info" // Informational
  | "neutral"; // Default, secondary actions
```

#### Size Scale

```typescript
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

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

## 🎨 Styling Conventions

### Token-Driven Design System

All design system components use a **centralized token system** defined in `packages/design-system/src/theme/tokens.ts`. Tokens are injected as CSS variables by the `ThemeProvider` and referenced via config-based Tailwind classes.

#### Core Principles

1. **No hardcoded colors** - All colors come from theme tokens
2. **CSS variables for theme switching** - Supports light/dark modes
3. **Config-based Tailwind classes** - Use `bg-card` instead of `bg-[var(--color-card)]`
4. **Centralized styling logic** - Intent-based styles in `classNames.ts`
5. **Type-safe theme tokens** - TypeScript ensures token consistency

### Tailwind Configuration

The `tailwind.config.cjs` maps all color tokens to CSS variables:

```javascript
// packages/design-system/tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        // Base surface colors
        page: "var(--color-page)",
        card: "var(--color-card)",
        raised: "var(--color-raised)",

        // Text colors
        text: "var(--color-text)",
        muted: "var(--color-muted)",

        // Border colors
        border: "var(--color-border)",

        // Primary brand colors
        primary: {
          DEFAULT: "var(--color-primary-base)",
          hover: "var(--color-primary-hover)",
        },

        // Intent colors - use intent-{type}-{variant} pattern
        "intent-primary": "var(--color-intent-primary-border)",
        "intent-primary-bg": "var(--color-intent-primary-bg)",
        "intent-primary-text": "var(--color-intent-primary-text)",
        // ... (success, warning, error, info, neutral)
      },
    },
  },
};
```

### Using Config-Based Tailwind Classes

**Always use config-based classes** instead of arbitrary value syntax:

```tsx
// ✅ GOOD - Config-based classes (clean, IDE-supported, validated)
<div className="bg-card border border-border text-text">
  <p className="text-muted">Secondary text</p>
  <button className="bg-intent-primary-bg border-intent-primary text-intent-primary-text">
    Primary Button
  </button>
</div>

// ❌ BAD - Arbitrary value syntax (verbose, no IDE support, error-prone)
<div className="bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)]">
  <p className="text-[var(--color-muted)]">Secondary text</p>
  <button className="bg-[var(--color-intent-primary-bg)] border-[var(--color-intent-primary-border)]">
    Primary Button
  </button>
</div>
```

### Available Color Classes

#### Base Colors

```tsx
// Surface/background colors
bg - page; // Darkest background (page)
bg - card; // Card background
bg - raised; // Raised elements (buttons, inputs)

// Text colors
text - text; // Primary text
text - muted; // Secondary/muted text

// Border colors
border - border; // Default border color
```

#### Primary Brand Colors

```tsx
bg - primary; // Primary brand color
bg - primary - hover; // Primary hover state
text - primary;
border - primary;
```

#### Intent Colors

For each intent (primary, success, warning, error, info, neutral):

```tsx
// Background
bg - intent - { intent } - bg; // e.g., bg-intent-success-bg

// Border
border - intent - { intent }; // e.g., border-intent-error

// Text
text - intent - { intent } - text; // e.g., text-intent-warning-text
```

**Examples**:

```tsx
<Badge intent="success">
  <span className="bg-intent-success-bg border-intent-success text-intent-success-text">
    Success Badge
  </span>
</Badge>

<Alert intent="error">
  <div className="bg-intent-error-bg border-intent-error text-intent-error-text">
    Error Alert
  </div>
</Alert>
```

### Component Styling Patterns

#### Intent-Based Styling

Use explicit conditionals for intent-based styles:

```tsx
// ✅ GOOD - Explicit conditionals with config-based classes
<div className={clsx(
  "border rounded-lg p-4",
  intent === "primary" && "bg-intent-primary-bg border-intent-primary text-intent-primary-text",
  intent === "success" && "bg-intent-success-bg border-intent-success text-intent-success-text",
  intent === "error" && "bg-intent-error-bg border-intent-error text-intent-error-text",
)} />

<!-- ❌ BAD - String interpolation with arbitrary values
<div className={clsx(
  "border rounded-lg p-4",
  intent !== "neutral" && `bg-[var(--color-intent-${intent}-bg)] border-[var(--color-intent-${intent}-border)]`
)} />
```

#### Variant-Based Styling

```tsx
// ✅ GOOD - Clear variant logic
<button
  className={clsx(
    "rounded-lg px-4 py-2 transition-colors",
    variant === "solid" && "bg-primary text-white",
    variant === "outline" &&
      "bg-transparent border-2 border-primary text-primary",
    variant === "ghost" && "bg-transparent text-primary hover:bg-primary/10"
  )}
/>
```

#### Size-Based Styling

Use size constants for consistency:

```tsx
const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-2.5 py-2 text-xs min-h-[36px]",
  sm: "px-3 py-2.5 text-sm min-h-[44px]",
  md: "px-3 py-3 text-base min-h-[44px]",
  lg: "px-4 py-4 text-lg min-h-[48px]",
  xl: "px-5 py-5 text-xl min-h-[52px]",
};

<button className={clsx("rounded-lg", SIZE_CLASSES[size])} />;
```

### Shadow Effects

Use CSS variable references for shadow effects (these stay as arbitrary values since they involve complex calculations):

```tsx
// ✅ GOOD - Shadow with CSS variables (complex, not suitable for config)
className =
  "shadow-[2px_2px_4px_var(--shadow-color),-1px_-1px_2px_var(--shadow-highlight)]";

// Inset shadow for neumorphic design
className =
  "shadow-[inset_2px_2px_4px_var(--shadow-color),inset_-1px_-1px_2px_var(--shadow-highlight)]";
```

### When to Use Arbitrary Values

Use arbitrary values **only** for:

- Complex shadows with CSS variables
- One-off spacing/sizing that doesn't fit the scale
- Transform values and animations
- Gradients with CSS variables

```tsx
// ✅ ACCEPTABLE - Complex shadow
className = "shadow-[0_10px_20px_rgba(0,0,0,.35)]";

// ✅ ACCEPTABLE - Custom transform
className = "translate-x-[calc(100%+8px)]";

// ❌ BAD - Color should use config
className = "bg-[var(--color-card)]"; // Use bg-card instead
```

## 📚 Documentation

### Design System Documentation
All design system architecture decisions and migration guides are in `/spec/003-design-system-cleanup/`:

- **QUICK-REFERENCE.md** - Developer quick reference for theme-aware classes ⭐ START HERE
- **COLOR-CLASSES-REFERENCE.md** - Complete list of available color classes
- **CONFIG-BASED-TAILWIND-MIGRATION.md** - Migration guide and rationale
- **CLASSNAMES-MIGRATION.md** - Utility function reference
- **FINAL-MIGRATION-SUMMARY.md** - Complete migration overview
- **VISUAL-VERIFICATION-CHECKLIST.md** - Manual testing checklist
