# Accessibility Guidelines

This document outlines accessibility standards and best practices for the Nevo UI Design System.

## Core Principles

### WCAG 2.1 AA Compliance
All components MUST meet WCAG 2.1 Level AA standards as a minimum baseline.

### Semantic HTML First
- Use semantic HTML elements before ARIA attributes
- Proper heading hierarchy (h1 → h6)
- Native form controls with proper labels
- Landmark regions (header, nav, main, aside, footer)

### Keyboard Navigation
All interactive elements must be fully keyboard accessible:
- **Tab**: Move forward through focusable elements
- **Shift+Tab**: Move backward through focusable elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals, dropdowns, and overlays
- **Arrow keys**: Navigate within composite widgets (menus, tabs, lists)

## Component-Specific Guidelines

### Buttons
```tsx
// ✅ Good: Accessible button
<Button variant="primary" aria-label="Save changes">
  Save
</Button>

// ❌ Bad: Non-semantic clickable
<div onClick={handleClick}>Save</div>
```

### Forms
```tsx
// ✅ Good: Proper label association
<FormGroup>
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" aria-required="true" />
</FormGroup>

// ❌ Bad: Missing label
<Input type="email" placeholder="Email" />
```

### Modals & Dialogs
```tsx
// ✅ Good: Accessible modal
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Typography id="modal-title" variant="h2">
    Confirm Action
  </Typography>
  <Typography id="modal-description">
    Are you sure you want to proceed?
  </Typography>
</Modal>
```

### Navigation
```tsx
// ✅ Good: Semantic navigation
<nav aria-label="Main navigation">
  <Sidebar>
    <SidebarNav items={navItems} />
  </Sidebar>
</nav>

// Skip link for keyboard users
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Tables
```tsx
// ✅ Good: Accessible table with proper structure
<Table>
  <caption>Product Inventory</caption>
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    {/* rows */}
  </tbody>
</Table>
```

## ARIA Patterns

### When to Use ARIA
1. **Only when necessary**: Native HTML is always preferred
2. **Complex widgets**: When building custom components (tabs, accordions, comboboxes)
3. **Dynamic content**: Live regions for status updates
4. **Additional context**: aria-label, aria-describedby when visual context isn't enough

### Common ARIA Attributes

#### Roles
- `role="dialog"`: Modal dialogs
- `role="alertdialog"`: Confirmation dialogs
- `role="alert"`: Important time-sensitive information
- `role="status"`: Status messages (polite live region)
- `role="menu"`: Application menus (not site navigation)
- `role="tab"`, `role="tabpanel"`: Tab interfaces

#### States & Properties
- `aria-expanded`: For collapsible sections
- `aria-hidden`: Hide decorative elements from screen readers
- `aria-label`: Provide accessible name
- `aria-labelledby`: Associate with visible label
- `aria-describedby`: Provide additional description
- `aria-required`: Mark required form fields
- `aria-invalid`: Indicate validation errors
- `aria-live`: Announce dynamic updates (polite, assertive, off)
- `aria-busy`: Indicate loading state

### ARIA Example: Accordion
```tsx
<div>
  <button
    aria-expanded={isExpanded}
    aria-controls="panel-1"
    onClick={toggle}
  >
    Section Title
  </button>
  <div id="panel-1" hidden={!isExpanded} role="region">
    Panel content
  </div>
</div>
```

## Focus Management

### Visible Focus Indicators
All focusable elements must have a visible focus indicator:
```css
/* Global focus styles in design-system */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Focus Trapping
For modals and overlays, trap focus within the component:
```tsx
// Modal should trap focus
<Modal isOpen={isOpen}>
  {/* Focus cycles within modal, cannot tab outside */}
</Modal>
```

### Focus Restoration
When closing modals or navigating, restore focus to the triggering element:
```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

const openModal = () => {
  setIsOpen(true);
};

const closeModal = () => {
  setIsOpen(false);
  buttonRef.current?.focus(); // Restore focus
};
```

## Color & Contrast

### Contrast Ratios (WCAG AA)
- **Normal text**: Minimum 4.5:1
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1
- **UI components**: Minimum 3:1
- **Focus indicators**: Minimum 3:1

### Color-Blind Safe
- Never rely on color alone to convey information
- Use icons, labels, or patterns in addition to color
- Test with color-blind simulators

```tsx
// ✅ Good: Icon + color
<Alert variant="error" icon={<ErrorIcon />}>
  An error occurred
</Alert>

// ❌ Bad: Color only
<div style={{ color: 'red' }}>Error</div>
```

## Screen Reader Considerations

### Meaningful Content
```tsx
// ✅ Good: Descriptive link
<a href="/products">View all products</a>

// ❌ Bad: Generic link
<a href="/products">Click here</a>
```

### Live Regions
```tsx
// Announce status updates
<div role="status" aria-live="polite">
  {itemsCount} items loaded
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  Error: Failed to save
</div>
```

### Visually Hidden Text
```tsx
// Provide context for screen readers
<button>
  <SearchIcon aria-hidden="true" />
  <span className="sr-only">Search products</span>
</button>
```

## Testing Checklist

### Manual Testing
- [ ] Keyboard navigation works for all interactions
- [ ] Focus visible on all interactive elements
- [ ] Focus order is logical
- [ ] Screen reader announces content correctly
- [ ] No keyboard traps (can tab in and out)
- [ ] Escape key closes modals/overlays
- [ ] Skip links work properly

### Automated Testing
- [ ] Run axe-core or similar tool
- [ ] Check color contrast ratios
- [ ] Validate HTML semantics
- [ ] Test with browser extensions (axe DevTools, WAVE)

### Screen Reader Testing
Test with at least one screen reader:
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

### Browser Testing
Test keyboard navigation in:
- Chrome/Edge
- Firefox
- Safari

## Resources

### Official Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Component Libraries for Reference
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Headless UI](https://headlessui.com/) - Accessible components
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Adobe's accessible hooks
