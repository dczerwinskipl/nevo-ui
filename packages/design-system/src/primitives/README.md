# Primitives

Fundamental UI building blocks that form the foundation of the design system.

## Components

### Button

A versatile button component with support for different intents, variants, sizes, and states.

**Features:**

- Multiple intents: primary, success, warning, error, info, neutral
- Multiple variants: solid, outline, ghost, subtle
- Five sizes: xs, sm, md, lg, xl (with proper touch targets)
- Loading and disabled states
- Full keyboard accessibility
- Theme-aware styling

**Usage:**

```tsx
import { Button } from "@nevo/design-system";

<Button intent="primary" size="md">Click me</Button>
<Button variant="outline" loading>Loading...</Button>
```

**Stories:** `Button.stories.tsx`  
**Tests:** `Button.test.tsx`

---

### Input

A versatile input component with support for different intents, variants, sizes, and accessibility features.

**Features:**

- Multiple intents: primary, success, warning, error, info, neutral
- Two variants: outline, filled
- Five sizes: xs, sm, md, lg, xl (with proper touch targets)
- Label and helper text support
- Left addon/icon support
- All HTML5 input types supported
- Theme-aware styling

**Usage:**

```tsx
import { Input } from "@nevo/design-system";

<Input label="Email" type="email" placeholder="you@example.com" />
<Input intent="error" helperText="This field is required" />
<Input left={<SearchIcon />} placeholder="Search..." />
```

**Stories:** `Input.stories.tsx`  
**Tests:** `Input.test.tsx`

---

### Select

A custom select/dropdown component with support for different intents, variants, sizes, and accessibility features.

**Features:**

- Multiple intents: primary, success, warning, error, info, neutral
- Two variants: outline, filled
- Five sizes: xs, sm, md, lg, xl (with proper touch targets)
- Label and helper text support
- Clear option functionality
- Keyboard navigation support
- Scrollable dropdown for long lists
- Theme-aware styling

**Usage:**

```tsx
import { Select } from "@nevo/design-system";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

<Select
  label="Choose"
  options={options}
  value={value}
  onChange={setValue}
  allowClear
/>;
```

**Stories:** `Select.stories.tsx`  
**Tests:** `Select.test.tsx`

---

### Card

A versatile card component that provides a consistent container with shadow, rounded corners, and proper theme support.

**Features:**

- Automatic theme-aware background and shadow
- Rounded corners
- Accepts any children
- Supports custom styling via className
- Full TypeScript support

**Usage:**

```tsx
import { Card } from "@nevo/design-system";

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>;
```

**Stories:** `Card.stories.tsx`  
**Tests:** None yet

---

### Badge

A small badge component used to highlight status, labels, or counts.

**Features:**

- Multiple intents: primary, success, warning, error, info, neutral
- Multiple variants: solid, outline, ghost, subtle
- Compact size for inline use
- Theme-aware styling

**Usage:**

```tsx
import { Badge } from "@nevo/design-system";

<Badge intent="success">Active</Badge>
<Badge intent="error" variant="solid">5</Badge>
```

**Stories:** `Badge.stories.tsx`  
**Tests:** None yet

---

### Spinner

A loading spinner component.

**Features:**

- Animated loading indicator
- Theme-aware styling

**Usage:**

```tsx
import { Spinner } from "@nevo/design-system";

<Spinner />;
```

**Stories:** None yet  
**Tests:** None yet

---

### Typography

Typography primitives for consistent text styling.

**Features:**

- Consistent text styling
- Theme-aware colors

**Usage:**

```tsx
import { Typography } from "@nevo/design-system";

// Check component implementation for usage
```

**Stories:** None yet  
**Tests:** None yet

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **Button**: ✅ Comprehensive (intent, variant, size, states, interactions, accessibility)
- **Input**: ✅ Comprehensive (intent, variant, size, types, states, accessibility)
- **Select**: ✅ Comprehensive (intent, variant, size, keyboard nav, accessibility)
- **Card**: ❌ Missing
- **Badge**: ❌ Missing
- **Spinner**: ❌ Missing
- **Typography**: ❌ Missing

### Storybook Stories

- **Button**: ✅ Complete
- **Input**: ✅ Complete
- **Select**: ✅ Complete
- **Card**: ✅ Complete
- **Badge**: ✅ Complete
- **Spinner**: ❌ Missing
- **Typography**: ❌ Missing

### Accessibility Testing

Run accessibility audits on all stories:

```bash
pnpm --filter @nevo/design-system storybook
# Then use the a11y addon panel to check violations
```

---

## Development Guidelines

### Adding New Primitives

1. Create component file (e.g., `NewComponent.tsx`)
2. Create Storybook stories (`NewComponent.stories.tsx`)
3. Create Jest tests (`NewComponent.test.tsx`)
4. Export from `index.ts`
5. Update this README
6. Run accessibility audit

### Testing Requirements

- All components must have Storybook stories
- Critical components must have unit tests
- All interactive components must pass a11y audits
- Touch targets must be minimum 44px for mobile

### Theme Integration

All primitives must use theme tokens:

```tsx
import { useTheme, getIntentStyle } from "../theme";

const { tokens } = useTheme();
const style = getIntentStyle(tokens, intent, variant);
```

---

## Related Documentation

- [Theme System](../theme/README.md)
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
- [Test Cleanup Plan](../../../../spec/002-testing-infrastructure/005-design-system-test-cleanup.md)
