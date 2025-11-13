# Story 007: Refactor Sidebar Component

## Summary

**As a** developer  
**I want to** refactor the Sidebar component to accept navigation items as props and fix height issues  
**So that** the component is reusable, app-agnostic, and properly fills available space

## Context

### Current State (Problems Identified)

**Problem 1: Hardcoded Navigation Items**

- Sidebar has hardcoded `NAVIGATION_SECTIONS` array (lines 14-34)
- Routes are defined in the design system, not in the app
- Makes the component non-reusable across different applications
- Violates separation of concerns (UI component shouldn't know app routes)

**Problem 2: Height Issues**

- Desktop sidebar uses `h-full` but may not fill parent container
- Missing proper flex container setup
- Overflow behavior not properly configured

**Problem 3: Inline Styles**

- Uses inline `style` props with theme tokens
- Should use config-based Tailwind classes
- Not following established design system patterns

### Desired State

- Navigation items passed as props from the application
- Sidebar fills full available height
- No inline styles, only config-based Tailwind classes
- Fully reusable design system component
- App-specific navigation defined in admin app

## Requirements

### 1. Sidebar Component Refactoring

- [ ] Remove hardcoded `NAVIGATION_SECTIONS` constant
- [ ] Add `items` prop to accept navigation structure
- [ ] Make `items` prop required (no default navigation)
- [ ] Fix height issues - ensure sidebar fills parent container
- [ ] Replace all inline styles with config-based Tailwind classes
- [ ] Maintain backward compatibility during migration
- [ ] Update TypeScript types for better type safety

### 2. Height Fixes

- [ ] Desktop sidebar should use `h-screen` or parent-relative height
- [ ] Ensure proper flex container hierarchy
- [ ] Fix overflow behavior for scrollable navigation
- [ ] Test with long navigation lists
- [ ] Verify mobile overlay height

### 3. Styling Migration

- [ ] Replace inline `background: tokens.card` with `bg-card`
- [ ] Replace inline `borderRight: ${tokens.border}` with `border-r border-border`
- [ ] Replace inline `color: tokens.text` with `text-primary`
- [ ] Replace inline box-shadows with Tailwind shadow classes
- [ ] Update active state styling to use config-based classes
- [ ] Ensure theme switching works correctly

### 4. Admin App Integration

- [ ] Create navigation config in admin app
- [ ] Move `NAVIGATION_SECTIONS` to admin app constants
- [ ] Update `Layout.tsx` to pass navigation items
- [ ] Verify routing still works correctly
- [ ] Update admin app imports

### 5. Testing

- [ ] Update Sidebar component tests
- [ ] Test with custom navigation items
- [ ] Test empty navigation (edge case)
- [ ] Test deeply nested navigation
- [ ] Test height behavior in different containers
- [ ] Test mobile overlay functionality
- [ ] Verify theme switching works

### 6. Storybook Stories

- [ ] Update stories to pass navigation items as props
- [ ] Add story with minimal navigation (2-3 items)
- [ ] Add story with extensive navigation (10+ items)
- [ ] Add story with deeply nested items (3+ levels)
- [ ] Add story demonstrating height filling
- [ ] Remove hardcoded navigation from stories

## Acceptance Criteria (COMPLETED ✅)

### Component Quality

- [x] AC1: No hardcoded navigation items in Sidebar component
- [x] AC2: `items` prop is required and properly typed
- [x] AC3: No inline styles in Sidebar component
- [x] AC4: All styles use config-based Tailwind classes
- [x] AC5: Sidebar fills full available height (`md:h-screen`)
- [x] AC6: Component is app-agnostic and reusable

### Functionality

- [x] AC7: Navigation items passed from parent work correctly
- [x] AC8: Active state highlighting works
- [x] AC9: Nested navigation expands/collapses correctly
- [x] AC10: Mobile overlay shows correct height
- [x] AC11: Desktop sidebar scrolls when content overflows
- [x] AC12: Theme switching works without visual glitches

### Admin App Integration

- [x] AC13: Navigation config moved to admin app (`config/navigation.tsx`)
- [x] AC14: Routing still works correctly
- [x] AC15: Mobile menu closes on navigation
- [x] AC16: Active route highlights correctly

### Testing

- [x] AC17: All builds pass
- [x] AC18: Stories demonstrate custom navigation items
- [x] AC19: Height behavior verified in stories
- [x] AC20: Stories build without errors

## Implementation Summary

### Changes Made

1. **Removed Hardcoded Navigation** ✅
   - Removed `NAVIGATION_SECTIONS` constant from Sidebar.tsx
   - Added required `items` prop to SidebarProps interface
   - Navigation now passed from parent application

2. **Fixed Height Issues** ✅
   - Desktop: Changed from `h-full` to `md:h-screen` for proper full-height
   - Mobile: Used `inset-y-0` for full-height overlay
   - Both use `overflow-y-auto` for scrollable content

3. **Migrated to Config-Based Tailwind** ✅
   - Replaced all inline `style` props with config-based classes
   - Active states: `bg-intent-primary-bg/15 border-intent-primary-border/30`
   - Background: `bg-card`
   - Borders: `border-border`
   - Text: `text-primary`
   - Shadows: `shadow-sm`, `shadow-md`, `shadow-2xl`

4. **Created Admin App Navigation Config** ✅
   - Created `apps/admin/src/config/navigation.tsx`
   - Moved navigation structure to admin app
   - Used emoji icons (temporary, can be replaced)

5. **Updated Layout.tsx** ✅
   - Imported `ADMIN_NAVIGATION` from config
   - Passed `items` prop to Sidebar
   - Removed inline styles, used `bg-page text-primary`

6. **Updated Stories** ✅
   - Created sample navigation items in stories
   - All stories now pass `items` prop
   - Added MINIMAL_NAVIGATION and EXTENDED_NAVIGATION examples

### Migration Pattern

**Before:**

```tsx
// In Sidebar.tsx (hardcoded)
const NAVIGATION_SECTIONS = [
  /* items */
];

// In app
<Sidebar route={route} onNavigate={handleNavigate} />;
```

**After:**

```tsx
// In app config
export const ADMIN_NAVIGATION = [
  /* items */
];

// In app
<Sidebar items={ADMIN_NAVIGATION} route={route} onNavigate={handleNavigate} />;
```

### Benefits Achieved

✅ **Reusable**: Component can be used in any app with custom navigation  
✅ **Proper Height**: Fills full screen height correctly  
✅ **Theme-Aware**: Uses config-based Tailwind classes  
✅ **No Inline Styles**: Follows design system patterns  
✅ **Type Safe**: Proper TypeScript types  
✅ **Separation of Concerns**: Navigation defined by app, not UI library

## Status: ✅ COMPLETE

All acceptance criteria met. Sidebar component successfully refactored!

## Technical Approach

### 1. Updated Sidebar Component Interface

```tsx
export interface NavigationChild {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationChild[];
}

export interface SidebarProps {
  /** Navigation items to display */
  items: NavigationItem[];
  /** Current active route */
  route: string;
  /** Navigation callback */
  onNavigate: (key: string) => void;
  /** Mobile sidebar open state */
  open?: boolean;
  /** Mobile sidebar close callback */
  onClose?: () => void;
}
```

### 2. Height Fix Implementation

**Desktop Sidebar**:

```tsx
<aside className="hidden md:flex md:flex-col md:h-screen w-64 bg-card border-r border-border">
  <div className="flex-1 overflow-y-auto p-4">
    <NavList {...props} />
  </div>
</aside>
```

**Mobile Overlay**:

```tsx
<div className="fixed inset-0 z-50 md:hidden">
  <div className="absolute inset-0 bg-black/50" onClick={onClose} />
  <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-card border-r border-border shadow-xl">
    <div className="h-full overflow-y-auto p-4">
      <NavList {...props} />
    </div>
  </div>
</div>
```

### 3. Config-Based Tailwind Classes

**Active State** (replace inline styles):

```tsx
// Before
style={{
  background: isActive ? "rgba(109,106,255,.15)" : "transparent",
  border: `1px solid ${isActive ? "rgba(109,106,255,.3)" : tokens.border}`,
}}

// After
className={clsx(
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
  "text-sm font-medium transition-all duration-200",
  "border",
  isActive ? "bg-intent-primary-bg/15 border-intent-primary-border/30" : "border-border",
  "hover:scale-[1.02] touch-manipulation"
)}
```

**Shadow Classes**:

```tsx
// Before
boxShadow: isActive
  ? `0 4px 8px ${tokens.shadow.color}`
  : `0 1px 3px ${tokens.shadow.color}`

// After
className={clsx(
  isActive ? "shadow-md" : "shadow-sm"
)}
```

### 4. Admin App Navigation Config

**Create**: `apps/admin/src/config/navigation.tsx`

```tsx
import { LayoutGrid, Package, ShoppingCart, User } from "lucide-react";
import type { NavigationItem } from "@nevo/design-system";

export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    key: "products",
    label: "Produkty",
    icon: <Package className="w-4 h-4" />,
    children: [
      { key: "products", label: "Lista produktów" },
      { key: "products/new", label: "Dodaj produkt" },
    ],
  },
  {
    key: "orders",
    label: "Zamówienia",
    icon: <ShoppingCart className="w-4 h-4" />,
    children: [
      { key: "orders", label: "Lista zamówień" },
      { key: "orders/stats", label: "Statystyki" },
    ],
  },
  {
    key: "users",
    label: "Użytkownicy",
    icon: <User className="w-4 h-4" />,
  },
];
```

**Update**: `apps/admin/src/router/Layout.tsx`

```tsx
import { ADMIN_NAVIGATION } from "../config/navigation";

export function Layout() {
  // ...existing code...

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary">
      <Topbar onMenu={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={ADMIN_NAVIGATION}
          route={currentRoute}
          onNavigate={handleNavigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto">
          {/* ...existing code... */}
        </main>
      </div>
    </div>
  );
}
```

### 5. Updated Sidebar Component

**Key Changes**:

```tsx
export const Sidebar: React.FC<SidebarProps> = ({
  items, // NEW: required prop
  route,
  onNavigate,
  open,
  onClose,
}) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 w-full h-full"
            onClick={onClose}
            aria-label="Close navigation menu"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-card border-r border-border shadow-xl">
            <div className="h-full overflow-y-auto p-4">
              <NavList
                sections={items}
                route={route}
                onNavigate={(k) => {
                  onNavigate(k);
                  onClose?.();
                }}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:h-screen w-64 bg-card border-r border-border">
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <NavList
            sections={items}
            route={route}
            onNavigate={onNavigate}
            openMap={openMap}
            setOpenMap={setOpenMap}
          />
        </div>
      </aside>
    </>
  );
};
```

### 6. Test Structure

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "../theme";
import { Package } from "lucide-react";

const mockNavigation = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <Package className="w-4 h-4" />,
  },
  {
    key: "products",
    label: "Products",
    icon: <Package className="w-4 h-4" />,
    children: [
      { key: "products/list", label: "List" },
      { key: "products/new", label: "New" },
    ],
  },
];

describe("Sidebar", () => {
  it("renders navigation items from props", () => {
    render(
      <ThemeProvider>
        <Sidebar
          items={mockNavigation}
          route="dashboard"
          onNavigate={jest.fn()}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("highlights active route", () => {
    const { container } = render(
      <ThemeProvider>
        <Sidebar
          items={mockNavigation}
          route="dashboard"
          onNavigate={jest.fn()}
        />
      </ThemeProvider>
    );

    const activeButton = screen.getByText("Dashboard").closest("button");
    expect(activeButton).toHaveClass("bg-intent-primary-bg/15");
  });

  it("calls onNavigate when item clicked", () => {
    const onNavigate = jest.fn();
    render(
      <ThemeProvider>
        <Sidebar
          items={mockNavigation}
          route="dashboard"
          onNavigate={onNavigate}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Dashboard"));
    expect(onNavigate).toHaveBeenCalledWith("dashboard");
  });

  it("expands/collapses nested navigation", () => {
    render(
      <ThemeProvider>
        <Sidebar
          items={mockNavigation}
          route="dashboard"
          onNavigate={jest.fn()}
        />
      </ThemeProvider>
    );

    // Children not visible initially
    expect(screen.queryByText("List")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText("Products"));

    // Children now visible
    expect(screen.getByText("List")).toBeInTheDocument();
  });
});
```

## Definition of Done

- [ ] Sidebar component refactored with `items` prop
- [ ] All inline styles replaced with config-based Tailwind classes
- [ ] Height issues fixed (desktop and mobile)
- [ ] Navigation config moved to admin app
- [ ] All tests passing
- [ ] Stories updated and building successfully
- [ ] No console errors or warnings
- [ ] Code reviewed and approved
- [ ] Documentation updated

## Dependencies

- ✅ Story 004 (Button refactor) - COMPLETED
- ✅ Story 006 (Card refactor) - COMPLETED
- ✅ Config-based Tailwind migration - COMPLETED

## Effort Estimate

**3-4 hours**

- Component refactoring: 1.5 hours
- Height fixes and styling migration: 1 hour
- Admin app integration: 0.5 hours
- Test updates: 0.5 hours
- Story updates: 0.5 hours

## Task Breakdown

1. **Refactor Sidebar Component** (1.5 hours)
   - Remove hardcoded `NAVIGATION_SECTIONS`
   - Add `items` prop to interface
   - Update component to use items from props
   - Replace inline styles with config-based classes
   - Fix height issues (h-screen, flex hierarchy)
   - Update TypeScript types

2. **Create Admin App Navigation Config** (30 min)
   - Create `config/navigation.tsx`
   - Move navigation items to admin app
   - Export properly typed navigation array
   - Update Layout.tsx to import and use

3. **Update Tests** (30 min)
   - Create mock navigation items
   - Test with custom items
   - Test height behavior
   - Test active states
   - Test nested navigation

4. **Update Storybook Stories** (30 min)
   - Pass navigation items as props
   - Add story with minimal navigation
   - Add story with extensive navigation
   - Add story demonstrating height filling
   - Test stories in Storybook

5. **Review and Polish** (30 min)
   - Verify no inline styles remain
   - Test in both themes
   - Verify mobile behavior
   - Test in admin app
   - Final verification

## Migration Notes

### Breaking Changes

**Before**:

```tsx
<Sidebar route="dashboard" onNavigate={handleNavigate} />
```

**After**:

```tsx
<Sidebar
  items={NAVIGATION_ITEMS}
  route="dashboard"
  onNavigate={handleNavigate}
/>
```

### Benefits

1. ✅ **Reusable**: Component can be used in any app with custom navigation
2. ✅ **Separation of Concerns**: Navigation structure defined by app, not UI library
3. ✅ **Theme-Aware**: Uses config-based Tailwind classes for instant theme switching
4. ✅ **Proper Height**: Fills available space correctly
5. ✅ **No Inline Styles**: Follows established design system patterns
6. ✅ **Type Safe**: Proper TypeScript types for navigation structure

## Related Documentation

- `CONFIG-BASED-TAILWIND-MIGRATION.md` - Migration patterns
- `QUICK-REFERENCE.md` - Config-based class reference
- `004-refactor-button.md` - Similar refactoring pattern
- `006-refactor-card.md` - Height and styling patterns
