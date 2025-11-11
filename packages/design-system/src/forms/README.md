# Form Components

Form field wrappers and components for building accessible forms.

## Components

### FormField

A wrapper component that combines label, input, error message, and helper text.

**Features:**

- Label association (htmlFor/id)
- Error state handling
- Helper text support
- Required field indicator
- Theme-aware styling

**Usage:**

```tsx
import { FormField } from "@nevo/design-system";

<FormField
  label="Email"
  error="Invalid email address"
  helperText="Enter your work email"
  required
>
  <Input type="email" />
</FormField>;
```

**Stories:** None yet  
**Tests:** None yet

---

### FormLabel

A label component for form fields.

**Features:**

- Proper htmlFor association
- Required indicator
- Theme-aware styling

**Usage:**

```tsx
import { FormLabel } from "@nevo/design-system";

<FormLabel htmlFor="email" required>
  Email Address
</FormLabel>;
```

**Stories:** ✅ FormLabel.stories.tsx  
**Tests:** ✅ FormLabel.test.tsx

---

### FormError

An error message component for form fields.

**Features:**

- Error icon
- ARIA role="alert"
- Theme-aware styling

**Usage:**

```tsx
import { FormError } from "@nevo/design-system";

<FormError id="email-error">Email is required</FormError>;
```

**Stories:** ✅ FormError.stories.tsx  
**Tests:** ❌ Missing

---

### FormGroup

A component for grouping related form fields.

**Features:**

- Fieldset/legend support
- Responsive layout
- Theme-aware styling

**Usage:**

```tsx
import { FormGroup } from "@nevo/design-system";

<FormGroup legend="Personal Information">
  <FormField label="First Name">
    <Input />
  </FormField>
  <FormField label="Last Name">
    <Input />
  </FormField>
</FormGroup>;
```

**Stories:** ✅ FormGroup.stories.tsx  
**Tests:** ❌ Missing

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **FormField**: ✅ FormField.test.tsx (14 tests)
- **FormLabel**: ✅ FormLabel.test.tsx (15 tests)
- **FormError**: ❌ Missing
- **FormGroup**: ❌ Missing

### Storybook Stories

- **FormField**: ✅ FormField.stories.tsx (11 stories)
- **FormLabel**: ✅ FormLabel.stories.tsx (9 stories)
- **FormError**: ✅ FormError.stories.tsx (9 stories)
- **FormGroup**: ✅ FormGroup.stories.tsx (10 stories)

### Accessibility Testing

Priority items:

- Label-input association (htmlFor/id)
- Error announcement (aria-invalid, aria-describedby)
- Required field indication (aria-required)
- Focus management

---

## Development Guidelines

### Adding New Form Components

1. Create component file (e.g., `NewFormComponent.tsx`)
2. Create Storybook stories showing all states
3. Create comprehensive Jest tests
4. Export from `index.ts`
5. Update this README
6. Run accessibility audit

### Testing Requirements

- All form components must have stories
- Must test ARIA attribute generation
- Must pass a11y audits (especially form labels)
- Must test error state handling

### Accessibility Best Practices

- Always associate labels with inputs (htmlFor/id)
- Use aria-invalid for error states
- Use aria-describedby for error messages and helper text
- Use aria-required for required fields
- Provide clear error messages

### Theme Integration

All form components must use theme tokens:

```tsx
import { useTheme } from "../theme";

const { tokens } = useTheme();
// Use tokens.error for error text, etc.
```

---

## Best Practices

### Form Field Accessibility Pattern

```tsx
<FormField
  label="Email"
  error={errors.email}
  helperText="We'll never share your email"
  required
>
  <Input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : "email-helper"}
    aria-required="true"
  />
</FormField>
```

This generates:

- Proper label association
- Error announcement on blur
- Helper text description
- Required field indication

---

## Related Documentation

- [Primitives](../primitives/README.md) - Input, Select components
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
- [WCAG Form Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
