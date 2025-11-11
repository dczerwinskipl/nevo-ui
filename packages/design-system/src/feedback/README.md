# Feedback Components

Components for providing user feedback, including alerts, loading states, empty states, and progress indicators.

## Components

### Alert

An alert component for displaying important messages to users.

**Features:**

- Multiple intents (info, success, warning, error, primary, neutral)
- Multiple variants (subtle, solid, outline)
- Dismissible option with custom onDismiss handler
- Icon support (auto, custom, or none)
- Title and content support
- Theme-aware styling

**Usage:**

```tsx
import { Alert } from "@nevo/design-system";

<Alert intent="success">
  Operation completed successfully!
</Alert>
<Alert intent="error" dismissible onDismiss={handleDismiss} title="Error">
  An error occurred
</Alert>
```

**Stories:** ✅ Alert.stories.tsx (14 stories)  
**Tests:** ✅ Alert.test.tsx (22 tests)

---

### Loading

A loading indicator component for showing loading states.

**Features:**

- Multiple variants (spinner, dots, pulse)
- Customizable size (sm, md, lg)
- Optional loading text
- Theme-aware styling

**Usage:**

```tsx
import { Loading } from "@nevo/design-system";

<Loading />
<Loading variant="dots" size="lg" text="Loading..." />
```

**Stories:** ✅ Loading.stories.tsx (11 stories)  
**Tests:** ✅ Loading.test.tsx (12 tests)

---

### EmptyState

A component for displaying empty states when no data is available.

**Features:**

- Icon/illustration support
- Title and description text
- Theme-aware styling
- Consistent empty state UX

**Usage:**

```tsx
import { EmptyState } from "@nevo/design-system";

<EmptyState
  title="No products found"
  description="Try adjusting your filters"
  icon={<Package />}
/>;
```

**Stories:** ✅ EmptyState.stories.tsx (12 stories)  
**Tests:** ✅ EmptyState.test.tsx (19 tests)

---

### ErrorState

A component for displaying error states.

**Features:**

- Error icon/illustration
- Error message display
- Retry action support
- Theme-aware styling

**Usage:**

```tsx
import { ErrorState } from "@nevo/design-system";

<ErrorState
  title="Failed to load data"
  message="Please try again"
  onRetry={handleRetry}
/>;
```

**Stories:** ✅ ErrorState.stories.tsx (11 stories)  
**Tests:** ❌ Missing

---

### Progress

A progress indicator component.

**Features:**

- Determinate and indeterminate modes
- Percentage display
- Color customization
- Theme-aware styling

**Usage:**

```tsx
import { Progress } from "@nevo/design-system";

<Progress value={60} max={100} />
<Progress indeterminate />
```

**Stories:** ✅ Progress.stories.tsx (15 stories)  
**Tests:** ❌ Missing

---

### Toast

A toast notification component for temporary messages.

**Features:**

- Auto-dismiss
- Multiple positions
- Different intent types
- Action buttons
- Theme-aware styling

**Usage:**

```tsx
import { Toast } from "@nevo/design-system";

<Toast message="Changes saved" intent="success" duration={3000} />;
```

**Stories:** ✅ Toast.stories.tsx (21 stories)  
**Tests:** ❌ Missing

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **Alert**: ✅ Alert.test.tsx (22 tests)
- **Loading**: ✅ Loading.test.tsx (12 tests)
- **EmptyState**: ✅ EmptyState.test.tsx (19 tests)
- **ErrorState**: ❌ Missing
- **Progress**: ❌ Missing
- **Toast**: ❌ Missing

### Storybook Stories

- **Alert**: ✅ Alert.stories.tsx (11 stories)
- **Loading**: ✅ Loading.stories.tsx (3 stories)
- **EmptyState**: ✅ EmptyState.stories.tsx (7 stories)
- **ErrorState**: ✅ ErrorState.stories.tsx (11 stories)
- **Progress**: ✅ Progress.stories.tsx (15 stories)
- **Toast**: ✅ Toast.stories.tsx (21 stories)

### Accessibility Testing

Priority items:

- Alert ARIA roles and live regions
- Loading state announcements
- Keyboard dismissal for toasts
- Focus management for alerts

---

## Development Guidelines

### Adding New Feedback Components

1. Create component file (e.g., `NewFeedback.tsx`)
2. Create Storybook stories showing all states
3. Create Jest tests for interactions
4. Export from `index.ts`
5. Update this README
6. Run accessibility audit

### Testing Requirements

- All feedback components must have stories
- Interactive components (Alert, Toast) must have tests
- Must pass a11y audits (especially ARIA roles)
- Must handle RTL layouts

### Accessibility Best Practices

- Use proper ARIA roles (`alert`, `status`, `progressbar`)
- Provide screen reader announcements for dynamic content
- Support keyboard navigation for dismissible components
- Ensure sufficient color contrast

### Theme Integration

All feedback components must use theme tokens:

```tsx
import { useTheme, getIntentStyle } from "../theme";

const { tokens } = useTheme();
const style = getIntentStyle(tokens, intent, variant);
```

---

## Related Documentation

- [Primitives](../primitives/README.md)
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
