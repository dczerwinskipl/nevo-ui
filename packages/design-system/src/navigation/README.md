# Navigation Components

Components for navigation and application structure.

## Components

### Topbar

A top navigation bar component with search, notifications, and theme toggle.

**Features:**

- Branding/logo area with gradient styling
- Full-width search on desktop, button on mobile
- Notifications button
- Theme toggle (light/dark mode)
- Mobile menu button
- Sticky positioning
- Responsive design
- Theme-aware styling
- Touch-friendly on mobile

**Usage:**

```tsx
import { Topbar } from "@nevo/design-system";

<Topbar onMenu={handleMenuToggle} />;
```

**Stories:** ✅ Topbar.stories.tsx (7 stories)  
**Tests:** None yet

---

### Sidebar

A sidebar navigation component with support for nested menu items.

**Features:**

- Navigation items with icons
- Nested navigation (children)
- Active state indication (parent and child)
- Expandable/collapsible sections
- Mobile overlay mode
- Desktop sidebar mode
- Touch-friendly interactions
- Smooth animations
- Theme-aware styling

**Usage:**

```tsx
import { Sidebar } from "@nevo/design-system";

<Sidebar
  route={currentRoute}
  onNavigate={handleNavigate}
  open={isMobileMenuOpen}
  onClose={handleClose}
/>;
```

**Stories:** ✅ Sidebar.stories.tsx (7 stories)  
**Tests:** None yet

---

### Tabs

A tabs component for organizing content into sections.

**Features:**

- Horizontal and vertical orientation
- Icon support
- Disabled tabs
- Keyboard navigation (arrow keys)
- Theme-aware styling

**Usage:**

```tsx
import { Tabs } from "@nevo/design-system";

const tabs = [
  { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
  { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
];

<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
```

**Stories:** None yet  
**Tests:** None yet

---

### Breadcrumbs

A breadcrumb navigation component.

**Features:**

- Hierarchical navigation
- Separator customization
- Truncation for long paths
- Theme-aware styling

**Usage:**

```tsx
import { Breadcrumbs } from "@nevo/design-system";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Product Name", href: "/products/123" },
];

<Breadcrumbs items={items} />;
```

**Stories:** None yet  
**Tests:** None yet

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

- **Topbar**: ❌ Missing
- **Sidebar**: ❌ Missing
- **Tabs**: ❌ Missing
- **Breadcrumbs**: ❌ Missing

### Storybook Stories

- **Topbar**: ❌ Missing (HIGH PRIORITY)
- **Sidebar**: ❌ Missing (HIGH PRIORITY)
- **Tabs**: ❌ Missing (HIGH PRIORITY)
- **Breadcrumbs**: ❌ Missing

### Accessibility Testing

Priority items:

- Keyboard navigation (Tab, arrow keys)
- ARIA landmarks (nav, navigation)
- Active/current state indication (aria-current)
- Skip links for main navigation
- Focus indicators

---

## Development Guidelines

### Adding New Navigation Components

1. Create component file (e.g., `NewNav.tsx`)
2. Implement keyboard navigation
3. Add ARIA attributes
4. Create Storybook stories
5. Create Jest tests
6. Export from `index.ts`
7. Update this README
8. Run accessibility audit

### Testing Requirements

- Must test keyboard navigation (Tab, arrow keys, Enter)
- Must test active state handling
- Must pass a11y audits
- Must test responsive behavior

### Accessibility Best Practices

#### Navigation Landmarks

```tsx
<nav aria-label="Main navigation">{/* navigation items */}</nav>
```

#### Active State

```tsx
<a href="/current" aria-current="page" className="active">
  Current Page
</a>
```

#### Tabs Keyboard Navigation

- Tab: Focus tab panel
- Left/Right arrows: Navigate between tabs
- Home/End: First/last tab
- Enter/Space: Activate tab

#### Skip Links

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Theme Integration

All navigation components must use theme tokens:

```tsx
import { useTheme } from "../theme";

const { tokens } = useTheme();
// Use tokens for background, borders, active states
```

---

## Best Practices

### Responsive Navigation

- Consider mobile menu for Topbar on small screens
- Collapsible sidebar for tablet/mobile
- Horizontal scroll for tabs on mobile

### Performance

- Lazy load navigation content when possible
- Memoize navigation items
- Avoid re-rendering entire navigation on route change

### User Experience

- Indicate current page/section
- Provide clear visual feedback on hover/focus
- Support keyboard navigation
- Show loading states during navigation

---

## Related Documentation

- [Primitives](../primitives/README.md)
- [Component Audit](../../../../spec/002-testing-infrastructure/005-COMPONENT-AUDIT.md)
- [ARIA Navigation Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/navigation/)
- [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
