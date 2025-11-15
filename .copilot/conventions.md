# Coding Conventions

This document defines the coding standards, naming conventions, and style guidelines for the nEvo Ecommerce Admin project.

## 📝 Language & Documentation

### Language Requirements

**Rule**: All code, comments, documentation, and specifications must be written in **English**.

**Applies to**:

- Source code (`.ts`, `.tsx`, `.js`, `.jsx`)
- Comments and JSDoc
- Markdown files and markdown documentation
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

## 🎨 Design System First Approach

**CRITICAL RULE**: All UI must be built using design system primitives. Raw HTML elements are forbidden except in primitive component implementations.

### What This Means

**✅ ALWAYS USE - Design System Primitives:**
- `Card` - Instead of `<div>` for containers
- `Button` - Instead of `<button>` for actions
- `Typography` - Instead of `<h1>`, `<h2>`, `<p>`, `<span>` for text
- `Stack` - Instead of `<div style={{display: 'flex'}}>` for layout
- `Box` - Instead of `<div>` for spacing/layout
- Other primitives from `@nevo/design-system`

**❌ NEVER USE - Raw HTML Elements:**
- `<div>` - Use `Card`, `Stack`, or `Box`
- `<button>` - Use `Button`
- `<h1>`, `<h2>`, `<h3>`, `<p>`, `<span>` - Use `Typography`
- `<input>`, `<select>`, `<textarea>` - Use form primitives
- Any raw HTML where a primitive exists

**✅ ALWAYS USE - Theme Tokens:**
- Use utility functions: `getTextColor()`, `getBgColor()`, `getSpacing()`
- Use Tailwind config classes: `bg-card`, `text-text`, `border-border`

**❌ NEVER USE - Hardcoded Values:**
- No hardcoded colors: `bg-blue-500`, `text-red-600`
- No inline styles for colors/spacing (except dynamic values)
- No arbitrary Tailwind values: `bg-[#ff0000]`

### Examples

```typescript
// ✅ GOOD - Uses design system primitives
import { Card, Typography, Button, Stack } from '@nevo/design-system';

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Stack direction="column" gap="4">
        <Typography variant="h3">{product.name}</Typography>
        <Typography variant="body">{product.description}</Typography>
        <Button intent="primary" onClick={handleClick}>
          Add to Cart
        </Button>
      </Stack>
    </Card>
  );
}

// ❌ BAD - Uses raw HTML elements
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button onClick={handleClick}>Add to Cart</button>
      </div>
    </div>
  );
}
```

```typescript
// ✅ GOOD - Uses theme tokens
import { getTextColor, getBgColor } from '@nevo/design-system';

<Card className={getBgColor('primary')}>
  <Typography className={getTextColor('error')}>
    Error message
  </Typography>
</Card>

// ❌ BAD - Hardcoded colors and inline styles
<div className="bg-blue-500">
  <span style={{ color: '#ff0000' }}>
    Error message
  </span>
</div>
```

### When Raw HTML IS Allowed

Raw HTML is ONLY allowed in these specific cases:

1. **Inside primitive component implementations** (packages/design-system/src/primitives/)
2. **For semantic HTML without primitive equivalent** (e.g., `<main>`, `<nav>`, `<article>`)
3. **For dynamic inline styles** (runtime-calculated values like `width: ${progress}%`)

```typescript
// ✅ OK - Semantic HTML without primitive
<main className="app-container">
  <nav aria-label="Main navigation">
    {/* Navigation content using primitives */}
  </nav>
</main>

// ✅ OK - Dynamic inline style
<Box style={{ width: `${progress}%` }} className="progress-bar" />
```

### Why This Matters

- **Consistency**: All UI uses the same building blocks
- **Maintainability**: Changes to primitives automatically propagate
- **Accessibility**: Primitives include WCAG 2.1 AA compliance
- **Theming**: Automatic dark mode and theme support
- **Type Safety**: TypeScript catches API misuse

**See also**:
- [recipes/component.md](./recipes/component.md) - Component creation guide
- [recipes/storybook.md](./recipes/storybook.md) - Never use raw HTML in stories
- [context/ds-api-guidelines.md](./context/ds-api-guidelines.md) - Design system API patterns

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

## 🎨 Theme Helper Functions

### Overview

**IMPORTANT**: Before creating custom Tailwind classes or inline styles, **ALWAYS** check if a helper function exists in `@nevo/design-system/theme`.

Theme helpers provide:

- ✅ Consistent styling across all components
- ✅ Automatic theme switching (light/dark mode)
- ✅ Single source of truth for colors and shadows
- ✅ Type-safe intent-based styling
- ✅ Reusable shadow depths

### Available Helper Functions

#### 1. Intent + Variant Classes

**Use for**: Buttons, Badges, interactive elements with semantic meaning

```typescript
import { getIntentVariantClasses } from '@nevo/design-system';

// ✅ GOOD - Use helper for consistent intent styling
<button
  className={clsx(
    'px-4 py-2 rounded-lg',
    getIntentVariantClasses('primary', 'subtle')
  )}
>

// ❌ BAD - Manual classes (hard to maintain, inconsistent)
<button
  className="px-4 py-2 rounded-lg bg-intent-primary-bg border-intent-primary text-intent-primary-text"
>
```

**Available combinations**:

- **Intents**: `primary`, `success`, `error`, `warning`, `info`, `neutral`
- **Variants**: `solid`, `outline`, `ghost`, `subtle`

#### 2. Shadow Classes

**Use for**: Elevation, depth, active states, overlays

```typescript
import { getShadowClasses } from '@nevo/design-system';

// ✅ GOOD - Use helper for consistent shadows
<div
  className={clsx(
    'bg-card border border-border',
    isActive ? getShadowClasses('lg') : getShadowClasses('sm')
  )}
>

// ❌ BAD - Custom shadow (hard to maintain)
<div
  className="bg-card border border-border shadow-[0_4px_8px_var(--shadow-color)]"
>
```

**Available sizes**:

- `sm` - Subtle shadow for default states
- `md` - Medium shadow for slightly elevated elements
- `lg` - Large shadow for active/focused states
- `xl` - Extra large for modals and overlays

#### 3. Elevation Classes (Gradients + Shadows)

**Use for**: Visual hierarchy with depth perception (inputs, cards, headers)

**Surface Scale System**: The design system uses a 10-level surface scale (50-900) similar to Material Design and Tailwind. Each level represents a subtle step in elevation (~3-5% lighter/darker).

**Dark theme**: Lower numbers = deeper/darker, higher numbers = elevated/lighter
**Light theme**: Lower numbers = elevated/lighter, higher numbers = deeper/darker

```typescript
import { getElevationClasses } from '@nevo/design-system';

// ✅ GOOD - Consistent elevation with subtle gradients
<input
  className={clsx(
    getElevationClasses('inset'),
    'px-3 py-2 rounded-lg'
  )}
/>

<div className={clsx(getElevationClasses('card'), 'p-4 rounded-xl')}>
  Card content
</div>

<header className={clsx(getElevationClasses('raised'), 'px-4 py-3')}>
  Table header
</header>

// ❌ BAD - Manual gradient and shadow (hard to maintain)
<input
  style={{
    background: 'linear-gradient(145deg, ...)',
    boxShadow: 'inset 2px 2px 4px ...'
  }}
/>
```

**Available levels** (from lowest to highest):

- `inset` - Recessed/cut into surface (inputs, text areas)
  - Gradient: surface-100 → surface-200 (reversed, darker top → lighter bottom)
  - Shadow: Inset shadow for recessed appearance
  - Use: Form inputs, search boxes, embedded content

- `card` - Default surface elevation (cards, panels)
  - Gradient: surface-200 → surface-100 (lighter top → darker bottom)
  - Shadow: Subtle drop shadow with top highlight
  - Use: Default content containers, product cards, list items

- `elevated` - Medium elevation (important cards, dropdowns)
  - Gradient: surface-500 → surface-400 (lighter top → darker bottom)
  - Shadow: Medium drop shadow with top highlight
  - Use: Cards that need emphasis, dropdown menus, popovers

- `raised` - Highest elevation (table headers, toolbars)
  - Gradient: surface-700 → surface-600 (lighter top → darker bottom)
  - Shadow: Strong drop shadow with top highlight
  - Use: Table headers, page headers, sticky navigation, floating toolbars

**Design Principle**: All raised elements (card, elevated, raised) follow the same pattern:

- **Lighter color at top** → darker at bottom (creates raised/convex appearance)
- **Inset** is the exception: darker at top → lighter at bottom (creates recessed/concave appearance)
- **Subtle transitions**: Each gradient uses adjacent surface levels for smooth, non-jarring depth

**When to use each level**:

- **Inset**: Form inputs, search boxes, embedded content that appears "cut into" the surface
- **Card**: Default content containers, product cards, list items, modals
- **Elevated**: Cards that need emphasis, dropdown menus, popovers, slightly important surfaces
- **Raised**: Table headers, page headers, sticky navigation, floating toolbars (highest priority)

#### 4. Text Color Classes

**Use for**: Typography, text with semantic meaning

```typescript
import { getTextColor } from '@nevo/design-system';

// ✅ GOOD - Intent-aware text color
<span className={getTextColor('error')}>Error message</span>
<span className={getTextColor(undefined, true)}>Muted text</span>

// ❌ BAD - Hardcoded color
<span className="text-intent-error-text">Error message</span>
```

#### 5. Background Color Classes

**Use for**: Cards, panels, surfaces

```typescript
import { getBgColor } from '@nevo/design-system';

// ✅ GOOD - Intent-aware background
<div className={getBgColor('primary')}>Primary background</div>
<div className={getBgColor(undefined, true)}>Raised surface</div>

// ❌ BAD - Hardcoded background
<div className="bg-intent-primary-bg">Primary background</div>
```

#### 5. Border Color Classes

**Use for**: Borders with semantic meaning

```typescript
import { getBorderColor } from '@nevo/design-system';

// ✅ GOOD - Intent-aware border
<div className={getBorderColor('error', 'bottom')}>
<div className={getBorderColor()}>Default border all sides</div>

// ❌ BAD - Manual border
<div className="border-b border-intent-error">
```

### Real-World Example: Form Input with Elevation

```typescript
// ✅ EXCELLENT - Uses elevation helper for gradient + shadow
import { getElevationClasses } from '@nevo/design-system';

<div className={clsx(
  getElevationClasses('inset'),
  'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm'
)}>
  <input className="flex-1 bg-transparent outline-none" />
</div>

// ❌ BAD - Manual gradient and shadow
<div
  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm border"
  style={{
    background: 'linear-gradient(145deg, rgb(10, 13, 17) 0%, rgb(21, 25, 34) 100%)',
    boxShadow: 'rgba(0, 0, 0, 0.4) 2px 2px 4px inset, rgba(255, 255, 255, 0.08) -1px -1px 2px inset',
    borderColor: 'rgb(42, 52, 65)'
  }}
>
  <input className="flex-1 bg-transparent outline-none" />
</div>
```

### Real-World Example: Sidebar Navigation

```typescript
// ✅ EXCELLENT - Uses helpers for consistency
import { getIntentVariantClasses, getShadowClasses } from '@nevo/design-system';

<button
  className={clsx(
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
    'text-sm font-medium transition-all duration-200',
    'border',
    getShadowClasses('sm'),
    isActive
      ? clsx(
          getIntentVariantClasses('primary', 'subtle'),
          getShadowClasses('lg')
        )
      : 'bg-transparent border-border hover:bg-raised/50'
  )}
>

// ❌ BAD - Manual classes everywhere
<button
  className={clsx(
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
    'text-sm font-medium transition-all duration-200',
    'border shadow-[0_1px_3px_var(--shadow-color)]',
    isActive
      ? 'bg-intent-primary-bg border-intent-primary text-intent-primary-text shadow-[0_4px_8px_var(--shadow-color)]'
      : 'bg-transparent border-border'
  )}
>
```

### Decision Tree

**When styling a component, follow this order:**

1. ✅ **Check for existing helper function** in `theme/classNames.ts`
   - `getElevationClasses()` for layered depth (inputs, cards, headers)
   - `getIntentVariantClasses()` for semantic colors (buttons, badges)
   - `getShadowClasses()` for elevation depth
2. ✅ **Use config-based Tailwind class** (e.g., `bg-card`, `text-text`, `border-border`)
3. ⚠️ **Create new helper** if pattern repeats 3+ times
4. ❌ **Avoid custom arbitrary values** unless absolutely necessary
5. ❌ **Never use inline styles** for colors, gradients, or shadows

### Guidelines for Visual Hierarchy

**Use elevation system for depth perception (from lowest to highest):**

- **Inset** (`bg-gradient-inset` + `shadow-inset`): Elements recessed into the page (darkest)
- **Card** (`bg-gradient-card` + `shadow-card`): Default surface level for content (base)
- **Elevated** (`bg-gradient-elevated` + `shadow-elevated`): Slightly raised above card (lighter)
- **Raised** (`bg-gradient-raised` + `shadow-raised`): Highest elements that float above (lightest)

**Visual depth hierarchy:**

```
Page/Background (darkest)
  ↓
Inset (cut into surface)
  ↓
Card (default surface)
  ↓
Elevated (slightly raised)
  ↓
Raised (highest/closest to user)
```

**Use intent colors for semantic meaning:**

- **Primary**: Main actions, key information
- **Success**: Positive feedback, completed states
- **Error**: Errors, destructive actions
- **Warning**: Cautions, important notices
- **Info**: Helpful information
- **Neutral**: Default, non-semantic actions

### Adding New Helpers

If you need a new helper function:

1. Add to `packages/design-system/src/theme/classNames.ts`
2. Export from `packages/design-system/src/theme/index.ts`
3. Add JSDoc with examples
4. Update this conventions guide

````typescript
// Example: Adding a new helper
/**
 * Get focus ring classes for interactive elements
 *
 * @param intent - Optional semantic intent
 * @returns Tailwind focus ring classes
 *
 * @example
 * ```tsx
 * <button className={getFocusRing('primary')}>
 * ```
 */
export function getFocusRing(intent?: ComponentIntent): string {
  // Implementation
}
````

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
