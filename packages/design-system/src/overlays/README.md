# Overlay Components

Modal dialogs, drawers, tooltips, and other overlay components.

## Components

### Modal

A modal dialog component for displaying content in an overlay.

**Features:**

- Focus trap (focus stays within modal)
- Escape key to close
- Backdrop click to close (optional)
- Focus restoration on close
- Scroll lock on body
- Multiple sizes
- Theme-aware styling
- ARIA attributes (role="dialog", aria-modal)

**Usage:**

```tsx
import { Modal } from "@nevo/design-system";

<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
  <p>Modal content goes here</p>
</Modal>;
```

**Stories:** None yet  
**Tests:** `Modal.test.tsx`

---

### Drawer

A sliding panel component that appears from the side of the screen.

**Features:**

- Multiple positions (left, right, top, bottom)
- Focus trap
- Escape key to close
- Backdrop overlay
- Theme-aware styling

**Usage:**

```tsx
import { Drawer } from "@nevo/design-system";

<Drawer isOpen={isOpen} onClose={handleClose} position="right">
  <h2>Drawer Title</h2>
  <p>Drawer content</p>
</Drawer>;
```

**Stories:** None yet  
**Tests:** None yet

---

### Tooltip

A tooltip component for displaying helpful information on hover or focus.

**Features:**

- Multiple positions
- Delay configuration
- Hover and focus triggers
- Theme-aware styling
- ARIA attributes

**Usage:**

```tsx
import { Tooltip } from "@nevo/design-system";

<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>;
```

**Stories:** None yet  
**Tests:** None yet

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **Modal**: ✅ Comprehensive (open/close, focus trap, keyboard)
- **Drawer**: ❌ Missing
- **Tooltip**: ❌ Missing

### Storybook Stories

- **Modal**: ❌ Missing (HIGH PRIORITY)
- **Drawer**: ❌ Missing
- **Tooltip**: ❌ Missing

### Accessibility Testing

Priority items:

- Focus trap implementation
- Keyboard navigation (Esc, Tab)
- Focus restoration on close
- ARIA attributes (role, aria-modal, aria-labelledby)
- Screen reader announcements

---

## Development Guidelines

### Adding New Overlay Components

1. Create component file (e.g., `NewOverlay.tsx`)
2. Implement focus trap if modal-like
3. Handle keyboard events (Esc, Tab)
4. Create Storybook stories
5. Create comprehensive Jest tests
6. Export from `index.ts`
7. Update this README
8. Run accessibility audit

### Testing Requirements

- Must test open/close behavior
- Must test keyboard interactions (Esc, Tab)
- Must test focus management
- Must pass a11y audits
- Must test backdrop click behavior

### Accessibility Best Practices

#### Modal Requirements

- Use `role="dialog"` and `aria-modal="true"`
- Use `aria-labelledby` to reference title
- Implement focus trap (Tab cycles within modal)
- Return focus to trigger element on close
- Support Esc key to close
- Prevent body scroll when open

#### Tooltip Requirements

- Ensure tooltip content is accessible via keyboard (focus)
- Don't hide critical information in tooltips
- Support Esc key to close
- Position tooltips to avoid viewport overflow

### Focus Trap Implementation

```tsx
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first focusable element in modal
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    // Restore focus on unmount
    return () => {
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  // ... rest of component
};
```

### Theme Integration

All overlay components must use theme tokens:

```tsx
import { useTheme } from "../theme";

const { tokens } = useTheme();
// Use tokens.surface for modal background
// Use tokens.overlay for backdrop
```

---

## Performance Considerations

### Portal Rendering

Overlays should render into a portal to avoid z-index issues:

```tsx
import { createPortal } from "react-dom";

return createPortal(<div>{/* overlay content */}</div>, document.body);
```

### Animation Performance

- Use CSS transforms instead of position changes
- Use `will-change` sparingly
- Consider `prefers-reduced-motion` media query

---

## Related Documentation

- [Primitives](../primitives/README.md)
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
- [ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
