# Design System API Guidelines

This document defines the API patterns and conventions for design system components.

## Core Principles

### 1. **Consistency**

All components follow the same prop naming and structure patterns.

### 2. **Composability**

Components can be combined to create complex UIs.

### 3. **Accessibility**

WCAG 2.1 AA compliance is mandatory, not optional.

### 4. **Type Safety**

All props are fully typed with exported TypeScript interfaces.

### 5. **Theming**

Components integrate with the theme system automatically.

---

## Standard Component Props

### Required Props Pattern

```typescript
export interface ComponentNameProps {
  // ===== Semantic & Style =====
  /** Semantic meaning (primary, success, error, etc.) */
  intent?: ComponentIntent;

  /** Visual style (solid, outline, ghost, subtle) */
  variant?: "solid" | "outline" | "ghost" | "subtle";

  /** Physical size (xs, sm, md, lg, xl) */
  size?: ComponentSize;

  // ===== Styling =====
  /** Additional CSS classes */
  className?: string;

  /** Inline styles (use sparingly) */
  style?: React.CSSProperties;

  // ===== Content =====
  /** Component content */
  children?: React.ReactNode;

  // ===== State =====
  /** Disabled state */
  disabled?: boolean;

  /** Loading state (if applicable) */
  loading?: boolean;

  // ===== Accessibility =====
  /** Accessible label */
  "aria-label"?: string;

  /** ID of labelling element */
  "aria-labelledby"?: string;

  /** ID of describing element */
  "aria-describedby"?: string;

  // ===== Standard HTML =====
  /** Element ID */
  id?: string;

  /** Test ID for automated testing */
  "data-testid"?: string;
}
```

---

## Intent System

### ComponentIntent Type

```typescript
type ComponentIntent =
  | "primary" // Main brand actions
  | "success" // Positive actions (save, confirm)
  | "error" // Destructive actions (delete, remove)
  | "warning" // Cautionary actions
  | "info" // Informational
  | "neutral"; // Default, secondary actions
```

### Intent Usage

```typescript
// ✅ GOOD - Intent describes meaning, not appearance
<Button intent="error" onClick={deleteProduct}>
  Delete Product
</Button>

<Alert intent="success">
  Product saved successfully!
</Alert>

// ❌ BAD - Don't use intent for visual preference
<Button intent="primary" variant="outline">
  Submit
</Button>
// Instead, use neutral intent with preferred variant:
<Button intent="neutral" variant="solid">
  Submit
</Button>
```

---

## Variant System

### Standard Variants

```typescript
type ComponentVariant =
  | "solid" // Filled background (highest emphasis)
  | "outline" // Border only (medium emphasis)
  | "ghost" // Transparent, hover effect (low emphasis)
  | "subtle"; // Minimal styling (lowest emphasis)
```

### Variant Guidelines

**Emphasis Hierarchy**:

1. **Solid**: Primary action on a page
2. **Outline**: Secondary action
3. **Ghost**: Tertiary action or navigation
4. **Subtle**: Minimal visual weight

```typescript
// ✅ GOOD - Clear action hierarchy
<div>
  <Button intent="primary" variant="solid">Save</Button>
  <Button intent="neutral" variant="outline">Cancel</Button>
  <Button intent="neutral" variant="ghost">Reset</Button>
</div>
```

---

## Size System

### ComponentSize Type

```typescript
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
```

### Size Specifications

| Size | Height | Use Case                     | Accessibility Note          |
| ---- | ------ | ---------------------------- | --------------------------- |
| `xs` | 32px   | Compact UIs, dense tables    | ⚠️ Below WCAG touch target  |
| `sm` | 40px   | Secondary actions            | ⚠️ Below WCAG touch target  |
| `md` | 44px   | Default interactive elements | ✅ Meets WCAG 2.1 AA        |
| `lg` | 48px   | Primary actions              | ✅ Comfortable touch target |
| `xl` | 56px   | Hero actions, mobile-first   | ✅ Generous touch target    |

**Default**: Always use `md` as the default size for interactive components.

```typescript
// ✅ GOOD - md is default and accessible
<Button size="md">Submit</Button>

// ⚠️ CAUTION - xs/sm require adequate spacing
<div className="flex gap-4"> {/* Adequate spacing */}
  <Button size="sm">Edit</Button>
  <Button size="sm">Delete</Button>
</div>
```

---

## Component Composition

### Children Prop

**For content containers**:

```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Render Props

**For flexible content**:

```typescript
<Select
  options={options}
  renderOption={(option) => (
    <div>
      <strong>{option.label}</strong>
      <span>{option.description}</span>
    </div>
  )}
/>
```

### Compound Components

**For related components**:

```typescript
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button>Close</Button>
  </Modal.Footer>
</Modal>
```

---

## Event Handlers

### Naming Convention

```typescript
interface ComponentProps {
  /** Called when component is clicked */
  onClick?: (event: React.MouseEvent) => void;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Called when component receives focus */
  onFocus?: (event: React.FocusEvent) => void;

  /** Called when component loses focus */
  onBlur?: (event: React.FocusEvent) => void;

  /** Called when user presses Enter key */
  onSubmit?: (event: React.FormEvent) => void;
}
```

### Event Handler Guidelines

```typescript
// ✅ GOOD - Meaningful callback names
<Button onClick={handleSave}>Save</Button>
<Input onChange={handleNameChange} />
<Modal onClose={handleModalClose} />

// ❌ BAD - Generic callback names
<Button onClick={handler}>Save</Button>
<Input onChange={fn} />
<Modal onClose={close} />
```

---

## Default Props

### Use Default Parameters

```typescript
// ✅ GOOD - Default parameters in function signature
export function Button({
  intent = "neutral",
  variant = "solid",
  size = "md",
  disabled = false,
  children,
}: ButtonProps) {
  // ...
}

// ❌ BAD - Deprecated defaultProps
Button.defaultProps = {
  intent: "neutral",
  variant: "solid",
  size: "md",
};
```

---

## Ref Forwarding

### For Interactive Elements

```typescript
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ type = 'text', ...props }, ref) {
    return <input ref={ref} type={type} {...props} />;
  }
);

Input.displayName = 'Input';
```

### Usage

```typescript
const inputRef = useRef<HTMLInputElement>(null);

<Input ref={inputRef} />

// Focus the input programmatically
inputRef.current?.focus();
```

---

## Polymorphic Components

### "as" Prop Pattern

```typescript
interface TypographyProps<T extends React.ElementType = 'p'> {
  as?: T;
  type?: TypographyType;
  children: React.ReactNode;
}

export function Typography<T extends React.ElementType = 'p'>({
  as,
  type = 'body',
  children,
}: TypographyProps<T>) {
  const Component = as || getDefaultElement(type);
  return <Component>{children}</Component>;
}

// Usage
<Typography as="h1" type="page-title">Title</Typography>
<Typography as="span" type="caption">Caption</Typography>
```

---

## State Management in Components

### Controlled vs. Uncontrolled

```typescript
// Controlled (parent manages state)
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Uncontrolled (component manages state)
<Input defaultValue="initial" />
```

### Support Both Patterns

```typescript
interface InputProps {
  value?: string;           // Controlled
  defaultValue?: string;    // Uncontrolled
  onChange?: (value: string) => void;
}

export function Input({ value, defaultValue, onChange }: InputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return <input value={currentValue} onChange={handleChange} />;
}
```

---

## Documentation Requirements

### JSDoc Comments

````typescript
/**
 * A versatile button component with multiple intents, variants, and sizes.
 *
 * @example
 * ```tsx
 * <Button intent="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * The semantic meaning of the button.
   * @default 'neutral'
   */
  intent?: ComponentIntent;

  /**
   * The visual style of the button.
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The content of the button.
   */
  children: React.ReactNode;

  /**
   * Callback fired when the button is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
````

---

## Export Requirements

### Always Export Types

```typescript
// ComponentName.tsx
export interface ComponentNameProps {
  // ... props
}

export function ComponentName(props: ComponentNameProps) {
  // ... implementation
}

// index.ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

---

## Anti-Patterns to Avoid

### ❌ Spreading All Props

```typescript
// ❌ BAD - Loses type safety
export function Button({ children, ...rest }: any) {
  return <button {...rest}>{children}</button>;
}

// ✅ GOOD - Explicit props
export function Button({
  intent,
  variant,
  size,
  className,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(getButtonClasses({ intent, variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### ❌ Using Colors Directly

```typescript
// ❌ BAD - Hardcoded colors
<div style={{ backgroundColor: '#3b82f6' }}>

// ✅ GOOD - Theme tokens
const { tokens } = useTheme();
<div style={{ backgroundColor: tokens.intent.primary.solid.background }}>
```

### ❌ Inconsistent Prop Names

```typescript
// ❌ BAD - Different names for same concept
<Button color="primary" />
<Alert level="error" />
<Badge type="success" />

// ✅ GOOD - Consistent naming
<Button intent="primary" />
<Alert intent="error" />
<Badge intent="success" />
```

---

**Last Updated**: November 11, 2025
