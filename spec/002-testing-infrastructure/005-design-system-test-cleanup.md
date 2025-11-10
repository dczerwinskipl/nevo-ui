# 005 - Design System Test Cleanup

## Epic: 002-testing-infrastructure

## Task: 005-design-system-test-cleanup

### Overview

This specification defines a comprehensive **test cleanup and improvement** initiative for the `@nevo/design-system` package based on findings from Storybook implementation and accessibility testing.

This is a **follow-up specification** to:

- **002-storybook-design-system.md**: Will reveal visual inconsistencies and a11y issues
- Existing Jest unit tests that may need updates or consolidation

### Context

After implementing Storybook with a11y testing, we expect to discover:

- Accessibility violations (color contrast, ARIA labels, keyboard navigation)
- Visual inconsistencies across components
- Missing or redundant test coverage
- Opportunities to improve component APIs
- Documentation gaps

This spec will address these findings systematically.

### Objectives

- Audit all components for accessibility issues found via Storybook a11y addon
- Fix critical accessibility violations (WCAG AA compliance)
- Consolidate testing strategy (Jest unit tests vs Storybook visual tests)
- Add missing tests for untested components
- Update component APIs for better accessibility
- Improve component documentation
- Standardize test patterns across the design system

---

## Scope

### In Scope

1. **Accessibility Fixes**:
   - Color contrast issues (WCAG AA: 4.5:1 for text)
   - ARIA attributes for semantic HTML
   - Keyboard navigation support
   - Focus management
   - Screen reader compatibility

2. **Test Coverage**:
   - Identify gaps in existing Jest tests
   - Add missing component tests
   - Remove redundant tests
   - Standardize test patterns

3. **Visual Testing**:
   - Create Storybook stories for all major components
   - Document component variations
   - Test edge cases visually

4. **Documentation**:
   - Improve JSDoc comments
   - Update README with accessibility guidelines
   - Document testing strategy

### Out of Scope

- Major component API redesigns (unless required for a11y)
- Performance optimizations (separate initiative)
- Visual design changes (designer approval needed)
- New features or components

---

## Expected Findings (Hypothesis)

Based on the current codebase analysis, we anticipate:

### Accessibility Issues

1. **Button Component**:
   - ✅ Good: Minimum touch targets (44px)
   - ⚠️ Potential: Loading state needs ARIA live region
   - ⚠️ Potential: Icon-only buttons need aria-label

2. **Alert Component**:
   - ✅ Good: `role="alert"` present
   - ⚠️ Potential: Color contrast for warning/error variants
   - ⚠️ Potential: Dismiss button needs better ARIA label

3. **Table Component**:
   - ⚠️ Expected: Complex table may need improved ARIA
   - ⚠️ Expected: Sortable columns need aria-sort
   - ⚠️ Expected: Row actions need keyboard support

4. **Modal/Overlay Components**:
   - ⚠️ Expected: Focus trap implementation
   - ⚠️ Expected: Esc key to close
   - ⚠️ Expected: Focus restoration on close

5. **Input/Select Components**:
   - ⚠️ Expected: Error state needs aria-invalid
   - ⚠️ Expected: Helper text needs aria-describedby
   - ⚠️ Expected: Required fields need aria-required

### Test Coverage Gaps

1. **Components without stories**: Need Storybook stories
2. **Components without tests**: Need Jest unit tests
3. **Edge cases**: Loading, error, disabled states

### Documentation Gaps

1. **Accessibility guidelines**: How to use components accessibly
2. **Testing guidelines**: When to use Jest vs Storybook
3. **Component props**: Better JSDoc descriptions

---

## Execution Plan (Tasks)

### Phase 1: Discovery & Audit (2 hours)

#### Task 1.1: Run Storybook A11y Audit

- [ ] Start Storybook: `pnpm storybook` from design-system
- [ ] Open a11y panel for Button stories
- [ ] Document all violations found
- [ ] Take screenshots of violations
- [ ] Categorize by severity (critical, moderate, minor)
- [ ] Create spreadsheet tracking violations

#### Task 1.2: Audit All Components

- [ ] List all components in `src/` directory
- [ ] Check which have Storybook stories
- [ ] Check which have Jest tests
- [ ] Check which have TypeScript types
- [ ] Check which have JSDoc documentation
- [ ] Create component coverage matrix

#### Task 1.3: Identify Test Strategy Gaps

- [ ] Review existing Jest tests for patterns
- [ ] Identify what should be unit tested vs visual tested
- [ ] Document current test coverage percentage
- [ ] Identify redundant tests (testing same thing in multiple ways)

#### Task 1.4: Create Prioritized Fix List

- [ ] Group findings by category (a11y, testing, docs)
- [ ] Prioritize by severity and effort
- [ ] Create GitHub issues for each fix (or task checklist)
- [ ] Estimate effort for each fix

---

### Phase 2: Critical Accessibility Fixes (3-4 hours)

#### Task 2.1: Fix Button Component A11y Issues

- [ ] Add ARIA live region for loading state
  ```tsx
  {
    loading && (
      <span className="sr-only" role="status">
        Loading...
      </span>
    );
  }
  ```
- [ ] Ensure all icon-only buttons have aria-label
- [ ] Verify color contrast meets WCAG AA
- [ ] Test keyboard navigation (Tab, Enter, Space)
- [ ] Update Button.stories.tsx with a11y examples

#### Task 2.2: Fix Alert Component A11y Issues

- [ ] Verify color contrast for all intent variants
- [ ] Improve dismiss button accessibility
  ```tsx
  <button aria-label="Dismiss alert" onClick={onDismiss}>
  ```
- [ ] Add aria-live for dynamic alerts
- [ ] Test screen reader announcements
- [ ] Update Alert.stories.tsx

#### Task 2.3: Fix Input Component A11y Issues

- [ ] Add aria-invalid for error state
  ```tsx
  <input
    aria-invalid={!!error}
    aria-describedby={error ? "error-id" : undefined}
  />
  ```
- [ ] Add aria-required for required fields
- [ ] Associate labels properly (htmlFor/id)
- [ ] Add aria-describedby for helper text
- [ ] Test with screen reader

#### Task 2.4: Fix Select Component A11y Issues

- [ ] Ensure native select has proper labels
- [ ] Add aria-describedby for helper text
- [ ] Add aria-invalid for error state
- [ ] Test keyboard navigation (arrow keys)
- [ ] Consider custom select accessibility (if exists)

#### Task 2.5: Fix Modal Component A11y Issues

- [ ] Implement focus trap (focus stays in modal)
- [ ] Add aria-modal="true"
- [ ] Add aria-labelledby pointing to title
- [ ] Restore focus on close
- [ ] Support Esc key to close
- [ ] Prevent background scroll
- [ ] Test with keyboard only

#### Task 2.6: Fix Table Component A11y Issues

- [ ] Add proper table markup (thead, tbody)
- [ ] Add aria-sort for sortable columns
  ```tsx
  <th aria-sort="ascending">Name</th>
  ```
- [ ] Make row actions keyboard accessible
- [ ] Add aria-label for complex tables
- [ ] Test with screen reader

---

### Phase 3: Component Test Coverage (4-5 hours)

#### Task 3.1: Create Storybook Stories for All Components

**Primitives** (if missing):

- [ ] Input.stories.tsx (all variants, states, validation)
- [ ] Select.stories.tsx (options, error states, disabled)
- [ ] Checkbox.stories.tsx (checked, indeterminate, disabled)
- [ ] Radio.stories.tsx (groups, checked state)
- [ ] Badge.stories.tsx (all intents, sizes)

**Feedback** (if missing):

- [ ] Alert.stories.tsx (already done, verify completeness)
- [ ] EmptyState.stories.tsx (different messages, icons)
- [ ] ErrorState.stories.tsx (different errors, retry)
- [ ] LoadingSpinner.stories.tsx (sizes, colors)
- [ ] Skeleton.stories.tsx (different shapes)

**Data**:

- [ ] Table.stories.tsx (basic, sortable, paginated, empty)
- [ ] Pagination.stories.tsx (different page counts, disabled states)

**Overlays**:

- [ ] Modal.stories.tsx (sizes, with/without footer, scrollable)
- [ ] Drawer.stories.tsx (positions, sizes)
- [ ] Tooltip.stories.tsx (positions, delays)

**Navigation**:

- [ ] Tabs.stories.tsx (different numbers, icons, disabled)
- [ ] Breadcrumbs.stories.tsx (different depths, truncation)

#### Task 3.2: Add Missing Jest Unit Tests

Focus on **logic and interactions**, not visual rendering:

- [ ] Button: onClick handler, disabled state, loading state
- [ ] Input: onChange handler, validation, value updates
- [ ] Select: onChange handler, option selection
- [ ] Modal: onClose callback, escape key, focus trap
- [ ] Table: sorting logic, pagination logic, row selection
- [ ] Pagination: page change logic, boundary cases

#### Task 3.3: Remove Redundant Tests

- [ ] Identify tests that duplicate Storybook visual testing
- [ ] Remove snapshot tests (prefer Storybook for visual regression)
- [ ] Keep behavior tests (logic, callbacks, state)
- [ ] Update test philosophy documentation

#### Task 3.4: Standardize Test Patterns

- [ ] Create test utilities (renderWithTheme helper)
- [ ] Standardize test structure (describe/it blocks)
- [ ] Use Testing Library best practices (getByRole)
- [ ] Add test IDs only when necessary (prefer semantic queries)

---

### Phase 4: Component API Improvements (2-3 hours)

#### Task 4.1: Improve Button API

- [ ] Add `aria-label` prop for icon-only buttons
- [ ] Add `isLoading` prop (alias for `loading` - more React-ish)
- [ ] Consider `leftIcon` and `rightIcon` props
- [ ] Update TypeScript types
- [ ] Update documentation

#### Task 4.2: Improve Input API

- [ ] Add `error` prop (string or boolean)
- [ ] Add `helperText` prop
- [ ] Add `required` prop
- [ ] Ensure all ARIA attributes are configurable
- [ ] Update types and docs

#### Task 4.3: Improve Modal API

- [ ] Add `onClose` required prop
- [ ] Add `closeOnEscape` boolean prop (default true)
- [ ] Add `closeOnBackdropClick` boolean prop (default true)
- [ ] Add `initialFocus` ref prop
- [ ] Add `returnFocus` boolean prop (default true)

#### Task 4.4: Improve Table API

- [ ] Add `aria-label` or `caption` prop
- [ ] Improve sorting API (make more declarative)
- [ ] Add keyboard navigation props
- [ ] Document accessibility requirements

#### Task 4.5: Update All Components

- [ ] Ensure consistent prop naming across components
- [ ] Add `className` support to all components (for custom styling)
- [ ] Add `testId` prop (data-testid) where helpful
- [ ] Ensure all components forward refs where appropriate

---

### Phase 5: Documentation & Guidelines (2 hours)

#### Task 5.1: Update Component JSDoc

- [ ] Add detailed descriptions to all components
- [ ] Document all props with examples
- [ ] Add `@example` blocks showing usage
- [ ] Add accessibility notes in JSDoc

Example:

````tsx
/**
 * A versatile button component with accessibility built-in.
 *
 * @example
 * ```tsx
 * <Button intent="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example Icon-only button
 * ```tsx
 * <Button aria-label="Delete" intent="error">
 *   <TrashIcon />
 * </Button>
 * ```
 */
````

#### Task 5.2: Create Accessibility Guidelines Document

- [ ] Create `docs/accessibility-guidelines.md`
- [ ] Document WCAG compliance level (AA)
- [ ] List common a11y patterns used
- [ ] Document keyboard shortcuts
- [ ] Document screen reader support
- [ ] Add testing checklist for developers

#### Task 5.3: Update Testing Guidelines

- [ ] Create `docs/testing-guidelines.md`
- [ ] Explain when to use Jest vs Storybook
  - Jest: Logic, interactions, state management
  - Storybook: Visual appearance, a11y, edge cases
- [ ] Provide test templates for common scenarios
- [ ] Document testing utilities

#### Task 5.4: Update Main README

- [ ] Add "Accessibility" section
- [ ] Add "Testing" section
- [ ] Link to guidelines documents
- [ ] Add badges (test coverage, Storybook, etc.)

---

### Phase 6: Verification & QA (1-2 hours)

#### Task 6.1: Run Full A11y Audit

- [ ] Open Storybook with all component stories
- [ ] Run a11y checks on every story
- [ ] Verify all critical violations fixed
- [ ] Document remaining minor issues (if any)
- [ ] Take before/after screenshots

#### Task 6.2: Run Full Test Suite

- [ ] Run Jest: `pnpm test`
- [ ] Verify all tests pass
- [ ] Check test coverage: `pnpm test:coverage`
- [ ] Aim for >80% coverage
- [ ] Document coverage gaps (if acceptable)

#### Task 6.3: Manual Testing

- [ ] Test keyboard navigation on all components
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Test in high contrast mode
- [ ] Test with browser zoom (200%, 400%)
- [ ] Test with reduced motion preference

#### Task 6.4: Browser Testing

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Document any browser-specific issues

---

### Phase 7: Polish & Documentation (1 hour)

#### Task 7.1: Create Summary Report

- [ ] Document all changes made
- [ ] List all a11y issues fixed
- [ ] List all new tests added
- [ ] Create before/after comparison
- [ ] Calculate metrics (violations reduced, coverage increased)

#### Task 7.2: Update Changelog

- [ ] Add "Accessibility Improvements" section
- [ ] List breaking changes (if any)
- [ ] Document new component APIs

#### Task 7.3: Create PR/Commit

- [ ] Organize commits logically
- [ ] Write detailed commit messages
- [ ] Update package version (patch or minor)
- [ ] Create comprehensive PR description

#### Task 7.4: Team Communication

- [ ] Share summary report with team
- [ ] Demo Storybook improvements
- [ ] Discuss testing strategy
- [ ] Get feedback on changes

---

## Success Criteria

- [ ] All critical a11y violations fixed (axe-core clean)
- [ ] Test coverage >80% (or documented exceptions)
- [ ] All major components have Storybook stories
- [ ] Accessibility guidelines documented
- [ ] Testing guidelines documented
- [ ] All components keyboard accessible
- [ ] All components screen reader compatible
- [ ] No breaking changes to existing APIs (unless necessary)

---

## Metrics to Track

### Before

- Number of a11y violations: **TBD** (from Storybook audit)
- Test coverage: **TBD%** (from current Jest coverage)
- Components with stories: **1/30** (only Button initially)
- Components with tests: **TBD/30**

### After (Goals)

- Number of a11y violations: **0 critical, <5 minor**
- Test coverage: **>80%**
- Components with stories: **>20/30** (all major components)
- Components with tests: **>25/30**

---

## Testing Strategy

### Jest Unit Tests (Behavior)

**What to test:**

- Event handlers (onClick, onChange, onSubmit)
- State management (controlled components)
- Conditional rendering logic
- Data transformations
- Edge cases (null, undefined, empty arrays)

**What NOT to test:**

- Visual appearance (use Storybook)
- CSS classes (implementation detail)
- Exact text content (unless functional)

### Storybook Stories (Visual)

**What to test:**

- All component variants (intents, sizes, states)
- Visual edge cases (long text, many items, empty)
- Accessibility (via a11y addon)
- Responsive behavior (via viewport addon)
- Theme variations (if applicable)

**What NOT to test:**

- Business logic (use Jest)
- API integration (use E2E)

---

## Common A11y Fixes Reference

### Color Contrast

```tsx
// Before: contrast ratio 3:1 ❌
color: '#999' on background: '#fff'

// After: contrast ratio 4.7:1 ✅
color: '#666' on background: '#fff'
```

### ARIA Labels

```tsx
// Icon-only button
<button aria-label="Delete item">
  <TrashIcon />
</button>

// Loading state
<button disabled aria-busy="true">
  Loading...
  <span className="sr-only" role="status">Loading</span>
</button>
```

### Form Inputs

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : "email-help"}
  />
  {helperText && <span id="email-help">{helperText}</span>}
  {error && (
    <span id="email-error" role="alert">
      {error}
    </span>
  )}
</div>
```

### Modals

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal content</p>
</div>
```

### Tables

```tsx
<table aria-label="Products">
  <thead>
    <tr>
      <th aria-sort="ascending">Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Product A</td>
      <td>$10</td>
    </tr>
  </tbody>
</table>
```

---

## Related Specifications

- **002-storybook-design-system.md**: Foundation for visual testing and a11y discovery
- **004-api-mocks-testing-integration.md**: Will help test components with API dependencies

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about/#priority)
- [React Accessibility](https://react.dev/learn/accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Notes

### Iterative Approach

This spec is intentionally comprehensive but should be executed iteratively:

1. **Sprint 1**: Discovery + Critical A11y Fixes (Phases 1-2)
2. **Sprint 2**: Test Coverage + Component APIs (Phases 3-4)
3. **Sprint 3**: Documentation + Verification (Phases 5-7)

### Continuous Improvement

After initial cleanup:

- Add a11y checks to CI/CD (fail on violations)
- Add Storybook stories as part of definition of done for new components
- Regular a11y audits (quarterly)

### Breaking Changes Policy

If a11y fixes require breaking changes:

1. Document clearly in changelog
2. Provide migration guide
3. Consider deprecation path
4. Get team approval first

---

## Future Enhancements (Not in Scope)

- [ ] Visual regression testing (Chromatic)
- [ ] Automated accessibility testing in CI (axe-playwright)
- [ ] Internationalization (i18n) support
- [ ] Right-to-left (RTL) language support
- [ ] Dark mode accessibility audit
- [ ] Mobile accessibility testing (touch targets, gestures)
- [ ] Performance testing (Lighthouse)
- [ ] Component usage analytics (track which components used most)
