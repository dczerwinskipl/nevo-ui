# Story 003: Fix Select Dropdown Visibility with Portal Rendering

## Summary

**As a** developer using the Select component  
**I want** dropdown options to always be visible regardless of parent container constraints  
**So that** users can always see all available options without overflow/clipping issues

## Context

### Current State (Problems Identified)

**Problem 1: Dropdown Options Clipped by Parent Containers**

- Select dropdown renders as a sibling to the trigger button in the DOM
- Parent containers (Card, Pagination, etc.) with `overflow: hidden` or bounded dimensions clip the dropdown
- Current workaround (wrapping Select in `<div className="relative">`) is unreliable and breaks when parent has overflow constraints

**Problem 2: Z-Index Stacking Context Issues**

- Dropdown relies on `z-50` to appear above other elements
- Stacking context created by parent containers can cause dropdown to appear behind other UI elements
- No global z-index management strategy

**Problem 3: Inconsistent Dropdown Positioning**

- Dropdown uses `absolute` positioning relative to nearest positioned ancestor
- Breaks when Select is nested deeply or in flex/grid layouts
- Manual positioning hacks required in consuming components

**Evidence:**

```tsx
// Current implementation in Select.tsx (lines 135-165)
{isOpen && (
  <div
    role="listbox"
    className={clsx(
      "absolute top-full left-0 right-0 z-50 mt-1 rounded-lg shadow-lg border max-h-60 overflow-auto",
      "bg-card border-border"
    )}
  >
    {/* Options */}
  </div>
)}

// Workaround in Pagination.tsx (line 218)
<div className="relative">  {/* Manual fix - unreliable */}
  <Select ... />
</div>
```

**User Impact:**

- In OrdersCursorList.tsx: Page size selector options are cut off by Card container
- In ProductsPaginatedList.tsx: Similar clipping issues with table pagination
- Any Select inside Card/Modal/other containers risks being partially hidden

### Desired State

**Solution: React Portal with Dynamic Positioning**

1. **Portal Rendering**: Dropdown renders directly into `document.body` via React Portal
   - Escapes parent container overflow constraints
   - No stacking context issues
   - Works universally regardless of parent

2. **Dynamic Positioning**: Calculate dropdown position based on trigger button coordinates
   - Use `getBoundingClientRect()` to get trigger position
   - Position dropdown absolutely relative to viewport
   - Handle viewport boundaries (flip up if near bottom, adjust horizontal if near edge)

3. **No Breaking Changes**: Maintain current Select API
   - Portal logic is internal implementation detail
   - Existing props and behavior unchanged
   - Remove manual positioning workarounds from consuming components

**Reference Implementations:**

- React Portal: `createPortal()` from `react-dom` (already documented in overlays/README.md)
- Positioning libraries: Floating UI, Popper.js, Radix UI primitives
- Similar pattern already used in Modal component (renders via portal to `document.body`)

## Detailed Requirements

### 1. Portal Rendering Infrastructure

- [ ] REQ-1.1: Dropdown renders via `ReactDOM.createPortal()` into `document.body`
- [ ] REQ-1.2: Portal container div created/destroyed with dropdown open state
- [ ] REQ-1.3: Portal cleanup on component unmount (no memory leaks)
- [ ] REQ-1.4: Portal maintains accessibility tree (ARIA relationships preserved)

### 2. Dynamic Positioning System

- [ ] REQ-2.1: Calculate trigger button position using `getBoundingClientRect()`
- [ ] REQ-2.2: Position dropdown using `position: fixed` with calculated `top`/`left` coordinates
- [ ] REQ-2.3: Update dropdown position on scroll/resize events
- [ ] REQ-2.4: Dropdown width matches trigger button width by default
- [ ] REQ-2.5: Provide `dropdownWidth` prop to override width (`auto`, `trigger`, or specific px value)

### 3. Smart Positioning (Collision Detection)

- [ ] REQ-3.1: Detect if dropdown would overflow viewport bottom
- [ ] REQ-3.2: If overflow detected, flip dropdown to appear above trigger instead of below
- [ ] REQ-3.3: Detect if dropdown would overflow viewport right edge
- [ ] REQ-3.4: If overflow detected, align dropdown to right edge of trigger
- [ ] REQ-3.5: Handle edge case: dropdown too large for viewport (show scrollbar, don't flip)

### 4. Z-Index Management

- [ ] REQ-4.1: Define global z-index scale in theme tokens
  - Baseline content: `z-0`
  - Dropdowns: `z-40`
  - Sticky headers: `z-30`
  - Modals: `z-50`
  - Toasts: `z-60`
- [ ] REQ-4.2: Apply `z-40` to portal dropdown (below modals, above page content)
- [ ] REQ-4.3: Document z-index scale in `.copilot/conventions.md`

### 5. Accessibility Preservation

- [ ] REQ-5.1: Maintain `aria-labelledby` relationship between trigger and dropdown
- [ ] REQ-5.2: Maintain `aria-controls` on trigger button
- [ ] REQ-5.3: Focus management works correctly (Escape closes, Tab moves to next element)
- [ ] REQ-5.4: Screen readers announce dropdown correctly despite portal

### 6. Cleanup Existing Workarounds

- [ ] REQ-6.1: Remove `<div className="relative">` wrapper from Pagination.tsx
- [ ] REQ-6.2: Remove any positioning hacks from consuming components
- [ ] REQ-6.3: Update component examples to show simplified usage

## Acceptance Criteria

### Functional Requirements

- [ ] AC-F1: **Portal rendering works** - Given Select is opened, when I inspect DOM, then dropdown is a child of `document.body`, not Select container
- [ ] AC-F2: **Dropdown always visible** - Given Select inside Card with `max-h-60`, when dropdown opens, then all options are visible without clipping
- [ ] AC-F3: **Position matches trigger** - Given Select at any viewport position, when dropdown opens, then it appears directly below trigger (or above if near bottom)
- [ ] AC-F4: **Width matches trigger** - Given Select with specific width, when dropdown opens, then dropdown width equals trigger width
- [ ] AC-F5: **Flip on bottom overflow** - Given Select near bottom of viewport, when dropdown opens, then it appears above trigger instead of below
- [ ] AC-F6: **Adjust on right overflow** - Given Select near right edge, when dropdown opens, then it aligns to right edge of trigger
- [ ] AC-F7: **Updates on scroll** - Given dropdown is open, when user scrolls page, then dropdown position updates to stay aligned with trigger
- [ ] AC-F8: **Updates on resize** - Given dropdown is open, when viewport resizes, then dropdown repositions correctly

### Quality Requirements

- [ ] AC-Q1: **No breaking changes** - Existing Select usage works without modification (verified by running existing tests)
- [ ] AC-Q2: **TypeScript compliance** - No new `any` types, all portal logic properly typed
- [ ] AC-Q3: **Accessibility maintained** - WCAG 2.1 AA compliance verified (keyboard nav, screen reader, focus management)
- [ ] AC-Q4: **Performance** - No visible lag in dropdown positioning (tested with 100+ options)
- [ ] AC-Q5: **Memory safety** - Portal cleanup verified (no memory leaks after 100 open/close cycles)
- [ ] AC-Q6: **Design system compliance** - Uses design system primitives, no inline styles

### Testing Verification

- [ ] AC-T1: Unit tests for portal rendering logic (≥80% coverage for new code)
- [ ] AC-T2: Unit tests for position calculation edge cases (top/bottom/left/right boundaries)
- [ ] AC-T3: Unit tests for scroll/resize position updates
- [ ] AC-T4: Visual regression tests in Storybook for all positioning scenarios
- [ ] AC-T5: Integration tests with Card container (verify no clipping)
- [ ] AC-T6: Integration tests with Pagination (verify page size selector works)
- [ ] AC-T7: Accessibility tests (keyboard navigation, ARIA attributes)

### Bug Verification

- [ ] AC-BUG1: OrdersCursorList page size selector shows all options without clipping (manual verification)
- [ ] AC-BUG2: ProductsPaginatedList page size selector shows all options without clipping (manual verification)
- [ ] AC-BUG3: No `<div className="relative">` wrappers needed in Pagination component (code review)

## Technical Design

### Component Changes

**`packages/design-system/src/primitives/Select.tsx`** - Major refactor

Changes:

1. Add `useRef` for trigger button element
2. Add `useState` for dropdown position `{ top: number; left: number; width: number; placement: 'bottom' | 'top' }`
3. Add `useLayoutEffect` to calculate position when dropdown opens
4. Add scroll/resize event listeners with position recalculation
5. Replace dropdown div with `createPortal(dropdownContent, document.body)`
6. Apply `position: fixed` with calculated coordinates to dropdown
7. Add cleanup for event listeners on unmount

Example implementation pattern:

```tsx
import { createPortal } from 'react-dom';

const triggerRef = useRef<HTMLButtonElement>(null);
const [dropdownPosition, setDropdownPosition] = useState({
  top: 0,
  left: 0,
  width: 0,
  placement: 'bottom' as 'bottom' | 'top'
});

useLayoutEffect(() => {
  if (isOpen && triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Determine placement
    const placement = spaceBelow >= 240 || spaceBelow > spaceAbove
      ? 'bottom'
      : 'top';

    setDropdownPosition({
      top: placement === 'bottom'
        ? rect.bottom + window.scrollY + 4  // mt-1 (4px)
        : rect.top + window.scrollY - 4,    // Above trigger
      left: rect.left + window.scrollX,
      width: rect.width,
      placement
    });
  }
}, [isOpen]);

// Render dropdown via portal
{isOpen && createPortal(
  <div
    role="listbox"
    style={{
      position: 'fixed',
      top: `${dropdownPosition.top}px`,
      left: `${dropdownPosition.left}px`,
      width: `${dropdownPosition.width}px`,
      zIndex: 40,
      maxHeight: dropdownPosition.placement === 'top'
        ? `${dropdownPosition.top - 8}px`  // Constrain to space above
        : '240px'  // Default max-h-60
    }}
    className={clsx(
      "rounded-lg shadow-lg border overflow-auto",
      "bg-card border-border"
    )}
  >
    {allOptions.map(option => (...))}
  </div>,
  document.body
)}
```

**`packages/design-system/src/theme/tokens.ts`** - Z-index scale

Add:

```typescript
export const zIndex = {
  base: 0,
  dropdown: 40,
  sticky: 30,
  overlay: 50,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
} as const;
```

**`packages/design-system/src/data/Pagination.tsx`** - Remove workaround

Changes:

1. Remove `<div className="relative">` wrapper around Select (lines 213-221)
2. Simplify to direct Select usage

Before:

```tsx
<div className="relative">
  <Select value={pageSize} ... />
</div>
```

After:

```tsx
<Select value={pageSize} ... />
```

### New Files

**`packages/design-system/src/primitives/Select.test.tsx`** - Add portal tests

New test cases:

- "should render dropdown via portal in document.body"
- "should position dropdown below trigger by default"
- "should flip dropdown above trigger when near viewport bottom"
- "should update position on scroll"
- "should update position on resize"
- "should match trigger width"
- "should cleanup portal on unmount"
- "should maintain ARIA relationships across portal boundary"

**`packages/design-system/src/primitives/Select.stories.tsx`** - Add positioning stories

New stories:

- `NearViewportBottom` - Shows flip behavior
- `NearViewportRight` - Shows right alignment
- `InsideScrollableContainer` - Shows scroll tracking
- `InsideCard` - Demonstrates no clipping
- `InsideModal` - Shows proper z-index layering

**`.copilot/conventions.md`** - Document z-index scale

Add section:

````markdown
## Z-Index Management

Use defined z-index scale from theme tokens:

- **Base content**: `z-0` (default layer)
- **Sticky headers**: `z-30` (Topbar, sticky table headers)
- **Dropdowns/Popovers**: `z-40` (Select, date pickers, autocomplete)
- **Overlays/Modals**: `z-50` (Modal, Drawer, full-screen overlays)
- **Toasts/Notifications**: `z-60` (Toast, global notifications)
- **Tooltips**: `z-70` (Always on top of everything)

Never use arbitrary z-index values. Import from theme:

```tsx
import { tokens } from '@nevo/design-system/theme';
style={{ zIndex: tokens.zIndex.dropdown }}
```
````

````

### Utilities/Hooks (Optional Enhancement)

**`packages/design-system/src/hooks/usePortalDropdown.ts`** - Reusable positioning logic

Extract position calculation into custom hook:
```typescript
interface UsePortalDropdownOptions {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement>;
  minHeight?: number;
  offset?: number;
}

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  placement: 'top' | 'bottom';
}

export function usePortalDropdown(
  options: UsePortalDropdownOptions
): DropdownPosition;
````

Benefits:

- Reusable for future dropdown components (DatePicker, Autocomplete, Combobox)
- Centralized positioning logic
- Easier to test and maintain

_Note: This is optional for initial implementation, can be refactored later_

## Testing Strategy

### Unit Tests (`Select.test.tsx`)

**Portal Rendering Tests:**

```typescript
describe('Portal rendering', () => {
  it('should render dropdown in document.body when open', () => {
    const { container } = render(<Select isOpen options={...} />);

    // Dropdown should NOT be in component tree
    expect(container.querySelector('[role="listbox"]')).not.toBeInTheDocument();

    // Dropdown SHOULD be in body
    expect(document.body.querySelector('[role="listbox"]')).toBeInTheDocument();
  });

  it('should cleanup portal on unmount', () => {
    const { unmount } = render(<Select isOpen options={...} />);
    expect(document.body.querySelector('[role="listbox"]')).toBeInTheDocument();

    unmount();
    expect(document.body.querySelector('[role="listbox"]')).not.toBeInTheDocument();
  });
});
```

**Positioning Tests:**

```typescript
describe('Dynamic positioning', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      bottom: 144,
      left: 50,
      right: 250,
      width: 200,
      height: 44,
    }));
  });

  it('should position dropdown below trigger', () => {
    render(<Select isOpen options={...} />);
    const dropdown = document.body.querySelector('[role="listbox"]');

    expect(dropdown).toHaveStyle({
      position: 'fixed',
      top: '148px',  // 144 (bottom) + 4 (offset)
      left: '50px',
      width: '200px',
    });
  });

  it('should flip dropdown above trigger when near bottom', () => {
    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
      top: window.innerHeight - 100,
      bottom: window.innerHeight - 56,
      left: 50,
      right: 250,
      width: 200,
      height: 44,
    }));

    render(<Select isOpen options={...} />);
    const dropdown = document.body.querySelector('[role="listbox"]');

    // Should appear above trigger
    expect(dropdown).toHaveStyle({
      top: expect.stringMatching(/^[0-9]+px$/),  // Above trigger
    });
  });
});
```

**Scroll/Resize Tests:**

```typescript
describe('Position updates', () => {
  it('should update position on scroll', async () => {
    render(<Select isOpen options={...} />);
    const dropdown = document.body.querySelector('[role="listbox"]');
    const initialTop = dropdown.style.top;

    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(dropdown.style.top).not.toBe(initialTop);
    });
  });
});
```

### Visual Tests (Storybook)

**`Select.stories.tsx` - New positioning stories:**

1. **NearViewportBottom** - Select at bottom of viewport
2. **NearViewportRight** - Select at right edge
3. **InsideCard** - Select inside Card with max-height
4. **InsideModal** - Select inside Modal (test z-index)
5. **WithScroll** - Select in scrollable container
6. **LongOptionsList** - 100+ options to test scrolling

### Integration Tests

**Pagination Integration:**

```typescript
// In Pagination.test.tsx or new integration test file
it('should show all page size options without clipping', () => {
  render(
    <Card className="max-h-60">
      <Pagination
        pageSizeOptions={[10, 20, 50, 100]}
        pageSize={10}
        onPageSizeChange={jest.fn()}
        {...otherProps}
      />
    </Card>
  );

  const select = screen.getByRole('button', { name: /items per page/i });
  userEvent.click(select);

  // All options should be visible (in document.body, not clipped by Card)
  expect(screen.getByText('100')).toBeVisible();
});
```

### Accessibility Tests

**Keyboard Navigation:**

```typescript
it('should maintain focus management with portal', async () => {
  render(<Select options={...} />);
  const trigger = screen.getByRole('button');

  // Open with Enter
  trigger.focus();
  await userEvent.keyboard('{Enter}');

  // Dropdown should be open
  expect(document.body.querySelector('[role="listbox"]')).toBeInTheDocument();

  // Close with Escape
  await userEvent.keyboard('{Escape}');

  // Dropdown should close, focus returns to trigger
  expect(document.body.querySelector('[role="listbox"]')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
```

**Screen Reader:**

```typescript
it('should maintain ARIA relationships across portal', () => {
  render(<Select label="Choose option" options={...} />);
  const trigger = screen.getByRole('button');

  // Trigger should have aria-controls pointing to listbox
  expect(trigger).toHaveAttribute('aria-controls');

  userEvent.click(trigger);

  const listbox = document.body.querySelector('[role="listbox"]');
  expect(listbox).toHaveAttribute('id', trigger.getAttribute('aria-controls'));
});
```

## Definition of Done

**Code Quality:**

- [ ] All TypeScript errors resolved (`pnpm tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] No inline styles (verified by code review)
- [ ] Uses design system primitives only
- [ ] Follows project conventions (`.copilot/conventions.md`)

**Testing:**

- [ ] Unit tests pass (`pnpm test Select.test.tsx`)
- [ ] New test coverage ≥80% for portal logic
- [ ] Integration tests pass (Pagination + Card)
- [ ] Accessibility tests pass
- [ ] Storybook stories demonstrate all positioning scenarios
- [ ] Visual regression tests pass (if implemented)

**Documentation:**

- [ ] JSDoc comments added to new props/functions
- [ ] `.copilot/conventions.md` updated with z-index scale
- [ ] Storybook stories have descriptive documentation
- [ ] Migration guide for removing workarounds (if needed)

**Bug Verification:**

- [ ] OrdersCursorList page size selector shows all options (manual test)
- [ ] ProductsPaginatedList page size selector shows all options (manual test)
- [ ] Select works correctly inside Card (manual test)
- [ ] Select works correctly inside Modal (manual test)
- [ ] No positioning hacks remain in codebase (grep search for `relative` near Select)

**Review & Merge:**

- [ ] Code reviewed and approved
- [ ] All CI checks passing
- [ ] PR merged to main branch

## Dependencies

**Before This Story:**

- None - can start immediately

**After This Story:**

- Other dropdown components (DatePicker, Autocomplete) can use same portal pattern
- Story 004 (if created): Extract `usePortalDropdown` hook for reusability

## Risks & Mitigations

**Risk 1: Performance degradation with scroll/resize listeners**

- **Impact**: Dropdown position updates could cause jank on low-end devices
- **Mitigation**:
  - Use `useLayoutEffect` for synchronous updates (no visual jump)
  - Debounce/throttle scroll events if needed
  - Add performance tests with 100+ options

**Risk 2: ARIA relationships break across portal boundary**

- **Impact**: Screen readers might not associate dropdown with trigger
- **Mitigation**:
  - Use `aria-controls` with consistent IDs
  - Test with screen readers (NVDA, JAWS, VoiceOver)
  - Reference Modal component which already handles this correctly

**Risk 3: Z-index conflicts with other portals**

- **Impact**: Multiple dropdowns/modals could stack incorrectly
- **Mitigation**:
  - Define global z-index scale in theme
  - Document z-index usage in conventions
  - Test with Modal + Select combination

**Risk 4: Breaking changes for existing Select usage**

- **Impact**: Existing code might break if API changes
- **Mitigation**:
  - Keep existing API unchanged (portal is internal)
  - Run full test suite before merging
  - Test all current usages (Pagination, Filters, etc.)

**Risk 5: Dropdown flickers on scroll**

- **Impact**: Visual jank when repositioning
- **Mitigation**:
  - Use `position: fixed` instead of `absolute`
  - Calculate position in `useLayoutEffect` (synchronous, no flicker)
  - Add `will-change: transform` if needed

## Effort Estimate

**Size:** Large (L)  
**Complexity:** High  
**Estimated Hours:** 6-8 hours

**Breakdown:**

- Portal rendering implementation: 2 hours
- Position calculation logic: 2 hours
- Scroll/resize handling: 1 hour
- Unit tests (portal, positioning): 2 hours
- Integration tests + Storybook stories: 1.5 hours
- Cleanup workarounds + documentation: 0.5 hours

## Task Breakdown

### Task 1: Setup Portal Infrastructure (60 minutes)

- [ ] Add `createPortal` import
- [ ] Add refs for trigger element
- [ ] Add state for dropdown position
- [ ] Move dropdown rendering to portal
- [ ] Verify portal cleanup on unmount
- [ ] Basic manual test

### Task 2: Implement Position Calculation (90 minutes)

- [ ] Add `useLayoutEffect` for position calculation
- [ ] Implement `getBoundingClientRect()` logic
- [ ] Calculate `top`, `left`, `width` from trigger
- [ ] Add viewport boundary detection
- [ ] Implement flip logic (bottom → top)
- [ ] Manual test at different viewport positions

### Task 3: Scroll & Resize Handling (60 minutes)

- [ ] Add scroll event listener
- [ ] Add resize event listener
- [ ] Recalculate position on events
- [ ] Add cleanup for event listeners
- [ ] Test scroll tracking
- [ ] Test resize behavior

### Task 4: Z-Index Management (30 minutes)

- [ ] Add z-index scale to theme tokens
- [ ] Apply `z-40` to dropdown portal
- [ ] Update `.copilot/conventions.md` with z-index guidelines
- [ ] Test with Modal (ensure correct stacking)

### Task 5: Unit Tests - Portal (60 minutes)

- [ ] Test: dropdown renders in document.body
- [ ] Test: portal cleanup on unmount
- [ ] Test: portal cleanup on close
- [ ] Test: multiple open/close cycles

### Task 6: Unit Tests - Positioning (60 minutes)

- [ ] Mock `getBoundingClientRect`
- [ ] Test: dropdown below trigger
- [ ] Test: flip to above when near bottom
- [ ] Test: position updates on scroll
- [ ] Test: position updates on resize
- [ ] Test: width matches trigger

### Task 7: Integration Tests (45 minutes)

- [ ] Test Select inside Card (no clipping)
- [ ] Test Select in Pagination
- [ ] Test Select inside Modal
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: ARIA relationships

### Task 8: Storybook Stories (30 minutes)

- [ ] Story: NearViewportBottom
- [ ] Story: NearViewportRight
- [ ] Story: InsideCard
- [ ] Story: InsideModal
- [ ] Add documentation to stories

### Task 9: Cleanup & Documentation (30 minutes)

- [ ] Remove `relative` wrapper from Pagination
- [ ] Search codebase for other workarounds
- [ ] Update conventions.md
- [ ] Add JSDoc comments
- [ ] Final manual testing

## Open Questions

1. **Should we extract positioning logic into a custom hook (`usePortalDropdown`)?**
   - Pro: Reusable for future components (DatePicker, Autocomplete)
   - Con: Adds complexity upfront, might be premature
   - **Recommendation**: Implement in Select first, refactor to hook if we build another dropdown component

2. **Should dropdown width be configurable?**
   - Current behavior: Match trigger width
   - Alternative: `dropdownWidth` prop with options: `'auto'` | `'trigger'` | number
   - **Recommendation**: Start with trigger width, add prop if users request it

3. **How should we handle dropdown max-height near viewport edges?**
   - Option A: Fixed max-height (240px / `max-h-60`)
   - Option B: Dynamic max-height constrained by available space
   - **Recommendation**: Option B - better UX, prevents unnecessary scrolling

4. **Should we debounce/throttle scroll events?**
   - Pro: Better performance on low-end devices
   - Con: Visible lag in dropdown position
   - **Recommendation**: Start without debouncing, add only if performance issues detected

5. **Should we support horizontal placement (left/right)?**
   - Current: Only vertical (top/bottom)
   - Use case: Dropdowns in tight horizontal spaces
   - **Recommendation**: Not needed for current use cases, add if requested

## Success Metrics

**Bug Resolution:**

- ✅ Zero reports of clipped dropdown options after deployment
- ✅ Pagination page size selector works in all contexts

**Code Quality:**

- ✅ Zero positioning hacks in consuming components
- ✅ Test coverage ≥80% for Select component
- ✅ Zero accessibility regressions

**Performance:**

- ✅ Dropdown opens in <50ms (measured with React DevTools Profiler)
- ✅ No visible lag when scrolling with dropdown open
- ✅ No memory leaks (verified with Chrome DevTools)

**Adoption:**

- ✅ Pattern documented for future dropdown components
- ✅ Z-index scale adopted project-wide
