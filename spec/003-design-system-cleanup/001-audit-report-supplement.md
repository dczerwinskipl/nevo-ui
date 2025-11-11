# Design System Audit Report - Additional Findings

**Date:** November 11, 2025  
**Supplement to:** AUDIT-REPORT-COMPLETE.md  
**Focus:** Navigation components, Filter components, and other missed components

## Critical Issues Found

### NAVIGATION COMPONENTS - MAJOR VIOLATIONS

#### 1. Topbar Component

**File:** `packages/design-system/src/navigation/Topbar.tsx` (123 lines)

**CRITICAL ISSUES:**

1. **Hardcoded Polish Text (Lines 55, 76, 84, 95)**

   ```tsx
   placeholder="Szukaj produktów, zamówień..."
   aria-label="Szukaj"
   aria-label="Powiadomienia"
   aria-label="Przełącz motyw"
   <div className="text-sm font-medium">Dominik</div>
   ```

   - **Violation:** Design system components should NEVER have hardcoded application text
   - **Impact:** Component is not reusable across applications or locales
   - **Priority:** **CRITICAL** - This breaks the fundamental design system principle
   - **Solution:** All text must come from props

2. **Extensive Inline Styles (20+ instances)**

   ```tsx
   style={{
     background: tokens.card,
     borderBottom: `1px solid ${tokens.border}`,
     boxShadow: `0 1px 3px ${tokens.shadow.color}...`,
     color: tokens.text,
   }}
   ```

   - Lines: 10-14, 23, 26, 32-34, 38, 48, 51, 55, 59-63, 75, 78, 84, 94, 97, 109, 111, 114, 116
   - **Count:** 20+ inline style objects
   - **Priority:** High

3. **Hardcoded Application Logic**
   - Hardcoded logo "N" and "nEvo"
   - Hardcoded user "Dominik"
   - **Should be:** Props for branding, user data

#### 2. Sidebar Component

**File:** `packages/design-system/src/navigation/Sidebar.tsx` (254 lines)

**CRITICAL ISSUES:**

1. **Hardcoded Polish Navigation Items (Lines 14-33)**

   ```tsx
   const NAVIGATION_SECTIONS: NavigationItem[] = [
     { key: "dashboard", label: "Dashboard", icon: ... },
     { key: "products", label: "Produkty", icon: ... },  // ❌ Polish!
     { key: "orders", label: "Zamówienia", icon: ... },  // ❌ Polish!
     { key: "users", label: "Użytkownicy", icon: ... }, // ❌ Polish!
   ]
   ```

   - **Violation:** Design system component with hardcoded app-specific navigation
   - **Impact:** Component is completely unusable in other applications
   - **Priority:** **CRITICAL**
   - **Solution:** Navigation items MUST be props

2. **TODO Comment (Line 12)**

   ```tsx
   // TODO: TASK-020 - Move sections array outside component to prevent recreation on each render
   ```

   - Already extracted, but should be removed from component entirely
   - **Priority:** Medium

3. **Extensive Inline Styles (30+ instances)**
   - Lines: 96-100, 123-127, 165-173, 207, 215-224, 235-240
   - Complex computed styles in render
   - **Count:** 30+ inline style objects
   - **Priority:** High

4. **Component Too Large (254 lines)**
   - Contains NavList as nested component
   - Should be split into separate files
   - **Priority:** Medium

5. **Hardcoded Polish ARIA Labels**
   ```tsx
   aria-label="Close navigation menu"
   ```

   - Should come from props
   - **Priority:** High

#### Sidebar Story File Issues

**File:** `packages/design-system/src/navigation/Sidebar.stories.tsx`

1. **Raw HTML Divs (Lines 31, 51, 72, 92, 113, 167, 265)**
   ```tsx
   <div style={{ height: "600px", display: "flex" }}>
   ```

   - **Count:** 7+ instances
   - Should use Container/Stack primitives
   - **Priority:** High

---

### DATA COMPONENTS - Additional Findings

#### Filters Components

**Folder:** `packages/design-system/src/data/Filters/`

**Files:**

- FilterActions.tsx
- FilterGroup.tsx
- Filters.tsx
- Filters.stories.tsx
- Filters.test.tsx

**Need Audit:** These files need detailed review for:

- Inline styles
- Polish text
- Test coverage
- Component complexity

#### Pagination Component

**Previously audited but needs dedicated story:**

- Remove raw HTML from stories
- Improve test coverage
- Check for inline styles

---

### FEEDBACK COMPONENTS - Additional Findings

**Already Good (Minimal Issues):**

- Alert.tsx - Has tests, stories (needs inline style check)
- EmptyState.tsx - Has tests, stories
- ErrorState.tsx - Has stories (needs tests)
- Loading.tsx - Has tests, stories
- Progress.tsx - Has stories (needs tests)
- Toast.tsx - Has stories (needs tests)

**Action:** Quick pass to verify no inline styles, add missing tests

---

## Updated Issue Count

### Navigation Components (NEW)

| Component | Inline Styles | Hardcoded Text    | Raw HTML in Stories    | Test Coverage | Priority     |
| --------- | ------------- | ----------------- | ---------------------- | ------------- | ------------ |
| Topbar    | 20+           | 5+ Polish strings | 0 (no story audit yet) | No tests      | **CRITICAL** |
| Sidebar   | 30+           | 5+ Polish strings | 7+                     | No tests      | **CRITICAL** |

### Total Updated Counts

| Category              | Previous | New | Total    | Priority     |
| --------------------- | -------- | --- | -------- | ------------ |
| Inline styles         | 156+     | 50+ | **206+** | High         |
| Raw HTML in stories   | 80+      | 7+  | **87+**  | High         |
| Hardcoded text (NEW!) | 0        | 10+ | **10+**  | **CRITICAL** |
| Missing hooks         | 12+      | 3+  | **15+**  | Medium       |
| Test gaps             | 15+      | 4+  | **19+**  | Medium       |
| Large components      | 6+       | 2+  | **8+**   | Low          |

---

## Design System Principle Violations

### CRITICAL: Application-Specific Content in Design System

The navigation components violate the **fundamental principle** of design systems:

**From `.copilot/project-guidelines.md`:**

```
packages/design-system - Design System (@nevo/design-system)
Purpose: Reusable UI components for any nEvo application

Rules:
✅ Only generic, reusable components
❌ No hardcoded data or business logic
❌ No application-specific strings or content
```

**Violations Found:**

1. Topbar has hardcoded Polish text: "Szukaj produktów, zamówień...", "Powiadomienia", "Przełącz motyw"
2. Topbar has hardcoded branding: "nEvo", logo "N", user "Dominik"
3. Sidebar has hardcoded navigation: "Dashboard", "Produkty", "Zamówienia", "Użytkownicy"
4. Sidebar has hardcoded icons tied to specific features

**Impact:**

- Components cannot be used in other applications
- Cannot be internationalized
- Cannot be customized for different brands
- Violates design system contract

**Required Action:**

- **IMMEDIATE:** Refactor navigation components to accept all content as props
- **IMMEDIATE:** Remove all Polish text
- **IMMEDIATE:** Remove all application-specific logic

---

## Updated Epic Stories

### New Stories Required

#### Story 010: Refactor Navigation Components (CRITICAL PRIORITY)

**Scope:**

- Refactor Topbar to accept all content as props
- Refactor Sidebar to accept navigation items as props
- Remove all hardcoded text (Polish and English)
- Remove all inline styles
- Add comprehensive tests
- Update stories to demonstrate reusability

**Acceptance Criteria:**

- [ ] Zero hardcoded text in Topbar/Sidebar (verified by code review)
- [ ] Navigation items passed as props (verified by TypeScript interface)
- [ ] All text/labels passed as props (verified by interface)
- [ ] Zero inline styles (verified by grep)
- [ ] Both components have ≥80% test coverage
- [ ] Stories show multiple use cases (different nav items, different branding)

**Effort:** 8-10 hours (High complexity due to API redesign)

#### Story 011: Audit and Refactor Filter Components

**Scope:**

- Audit all Filter components (FilterActions, FilterGroup, Filters)
- Remove inline styles
- Add/improve tests
- Update stories

**Effort:** 4 hours

#### Story 012: Quick Pass - Feedback Components

**Scope:**

- Verify no inline styles in Alert, Progress, Toast, EmptyState, ErrorState
- Add missing tests for ErrorState, Progress, Toast
- Update any stories using raw HTML

**Effort:** 3 hours

---

## Revised Epic Timeline

### Phase 1: Foundation (Week 1)

- Story 001: ✅ Audit complete
- Story 002: Create layout primitives (8 hours)
- Story 003: Create hooks library (8 hours)

### Phase 2: Primitives Cleanup (Week 2)

- Story 004: Refactor Button (4 hours)
- Story 005: Refactor Badge (3 hours)
- Story 006: Refactor Card (3 hours)
- Story 007: Refactor Input (5 hours)
- Story 008: Refactor Select (6 hours)
- Story 009: Refactor Typography (3 hours)

### Phase 3: Complex Components (Week 2-3)

- **Story 010: Refactor Navigation (Topbar + Sidebar) - CRITICAL** (10 hours) **NEW**
- Story 011: Refactor Filter Components (4 hours) **NEW**
- Story 012: Quick Pass - Feedback Components (3 hours) **NEW**
- Story 013: Refactor Table (4 hours) **RENAMED**
- Story 014: Refactor Spinner (2 hours) **RENAMED**
- Story 015: Refactor Pagination (3 hours) **RENAMED**

### Phase 4: Story Files (Week 3)

- Story 016: Update Button/Badge/Card stories (6 hours) **RENAMED**
- Story 017: Update Input/Select/Typography stories (4 hours) **RENAMED**
- Story 018: Update Navigation stories (3 hours) **NEW**
- Story 019: Update remaining stories (3 hours) **RENAMED**

### Phase 5: Quality & Documentation (Week 4)

- Story 020: Improve test coverage (8 hours) **RENAMED**
- Story 021: Accessibility fixes (8 hours) **RENAMED**
- Story 022: Update documentation (4 hours) **RENAMED**
- Story 023: Final verification (4 hours) **RENAMED**

**Updated Total:** 23 stories, 108 hours, 13.5 working days

---

## Verification Commands

### Check for Hardcoded Text

```bash
# Should return 0 (after cleanup)
grep -r "Szukaj\|Produkty\|Zamówienia\|Użytkownicy\|Powiadomienia" packages/design-system/src
```

### Check Navigation Props Pattern

```tsx
// After refactor, Topbar should look like:
interface TopbarProps {
  logo?: React.ReactNode;
  appName?: string;
  searchPlaceholder?: string;
  userName?: string;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  // etc.
}

// Sidebar should look like:
interface SidebarProps {
  navigationItems: NavigationItem[]; // Passed as prop!
  currentRoute: string;
  onNavigate: (key: string) => void;
  // etc.
}
```

---

## Action Items

### Immediate (Before Starting Implementation)

1. ✅ Update audit report with navigation findings
2. ⏳ Create Story 010 spec (Refactor Navigation Components)
3. ⏳ Update epic README with revised story list
4. ⏳ Get stakeholder approval for API changes to Topbar/Sidebar
5. ⏳ Confirm translation/i18n strategy for consuming apps

### High Priority (Week 1-2)

1. Complete Phase 1 (Layout primitives, hooks)
2. Complete Phase 2 (Primitive components)
3. **CRITICAL:** Complete Story 010 (Navigation refactor) before story file updates

### Medium Priority (Week 3)

1. Complete remaining component refactors
2. Update all story files
3. Begin testing improvements

### Low Priority (Week 4)

1. Documentation updates
2. Final verification
3. Migration guide for consuming apps

---

## Risk Update

### New High Risk: Breaking API Changes

**Risk:** Topbar and Sidebar API changes will break consuming applications

**Impact:** Apps/admin application currently uses these components

**Mitigation:**

1. Check if Topbar/Sidebar are used in apps/admin
2. Create migration guide
3. Update consuming code in same PR OR provide backward-compatible wrapper
4. Add deprecation warnings if keeping old API temporarily

**Verification Needed:**

```bash
# Check if navigation components are used in apps
grep -r "Topbar\|Sidebar" apps/
```

---

## Next Steps

1. **Review this supplement** - Confirm findings
2. **Check apps/admin usage** - See if navigation components are already used
3. **Create Story 010 spec** - Detail the navigation refactor
4. **Get approval** - For breaking changes to navigation components
5. **Proceed with Phase 1** - Start with layout primitives (Story 002)

---

**Report End - Supplement**

**Key Takeaway:** Navigation components have CRITICAL violations that must be addressed. They contain hardcoded Polish text and application-specific navigation, violating core design system principles.
