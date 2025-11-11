# Story 004: Refactor Button Component

## Summary

As a **developer**, I want **the Button component to use only Tailwind CSS classes** so that **styling is consistent, maintainable, and follows project guidelines**.

## Context

**Background:** The Button component currently uses inline styles for theming, which violates the Tailwind-first guideline and makes the component harder to maintain.

**Current State:**
- Button uses inline `style` prop with dynamic background, color, border (Lines 53-60)
- Button stories use raw `<div>` elements with inline styles for layout (7 instances)
- Test coverage is incomplete (only basic rendering tests)
- 2 TODO comments indicate incomplete refactoring

**Desired State:**
- All styling done via Tailwind classes
- Button stories use layout primitives (Stack, Flex, Grid)
- Comprehensive test coverage (≥80%)
- No TODO comments

**Links:**
- Parent Epic: [003-design-system-cleanup/README-UPDATED.md](./README-UPDATED.md)
- Related Audit: [AUDIT-REPORT-COMPLETE.md](./AUDIT-REPORT-COMPLETE.md#1-button-component)

## Detailed Requirements

### 1. Remove Inline Styles

**Current Code (Lines 53-60):**
```tsx
style={{
  background: style.background,
  color: style.color,
  border: style.border,
  boxShadow: variant === "solid" 
    ? `0 1px 3px ${tokens.shadow.color}...` 
    : "none",
}}
```

**Required Changes:**
- Replace inline styles with Tailwind utility classes
- Create variant-specific className mappings
- Use `clsx` for conditional class composition
- Maintain all current visual states (intents, variants, sizes, loading, disabled)

### 2. Update Button Stories

**Current Issues:**
- 7 instances of raw `<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>` 
- Inline styles for layout

**Required Changes:**
- Replace all layout `<div>`s with `<Stack>`, `<Flex>`, or `<Grid>` primitives
- Remove all inline styles from stories
- Use only Tailwind classes for any custom styling

### 3. Improve Test Coverage

**Current Coverage:** Basic rendering only

**Required Tests:**
- All intent variants (default, primary, success, error, warning, neutral)
- All sizes (sm, md, lg)
- All states (loading, disabled, active)
- Click handler functionality
- Accessibility (ARIA attributes, keyboard support)
- Edge cases (empty children, null children)

### 4. Resolve TODO Comments

- Remove or complete all TODO comments (Lines 10, 19)

## Acceptance Criteria

### Component Refactoring
- [ ] AC1: No inline `style` prop in Button.tsx (Verification: `grep "style={{" Button.tsx` returns 0)
- [ ] AC2: All styling uses Tailwind classes (Verification: Code review)
- [ ] AC3: Variant styles implemented via className mappings (Verification: Unit tests pass for all variants)
- [ ] AC4: Intent styles implemented via className mappings (Verification: Unit tests pass for all intents)
- [ ] AC5: Size styles implemented via className mappings (Verification: Unit tests pass for all sizes)
- [ ] AC6: Loading state uses Tailwind classes (Verification: Unit test)
- [ ] AC7: Disabled state uses Tailwind classes (Verification: Unit test)
- [ ] AC8: All TODO comments resolved (Verification: `grep "TODO" Button.tsx` returns 0)

### Story Files
- [ ] AC9: No raw `<div>` in Button.stories.tsx (Verification: Manual review, uses Stack/Flex/Grid)
- [ ] AC10: No inline styles in Button.stories.tsx (Verification: `grep "style={{" Button.stories.tsx` returns 0)
- [ ] AC11: All layout uses primitives (Stack, Flex, Grid) (Verification: Code review)
- [ ] AC12: Stories demonstrate all variants (Verification: Storybook visual check)
- [ ] AC13: Stories demonstrate all intents (Verification: Storybook visual check)
- [ ] AC14: Stories demonstrate all sizes (Verification: Storybook visual check)

### Testing
- [ ] AC15: Intent variant tests added (Verification: Test file has describe block for intents)
- [ ] AC16: Size variant tests added (Verification: Test file has describe block for sizes)
- [ ] AC17: Loading state tests added (Verification: Test checks loading prop)
- [ ] AC18: Disabled state tests added (Verification: Test checks disabled prop)
- [ ] AC19: Click handler tests added (Verification: Test uses fireEvent.click)
- [ ] AC20: Accessibility tests added (Verification: Test checks ARIA attributes)
- [ ] AC21: Test coverage ≥80% (Verification: `pnpm test Button --coverage`)
- [ ] AC22: All tests pass (Verification: `pnpm test Button`)

### Code Quality
- [ ] AC23: No TypeScript errors (Verification: `pnpm tsc --noEmit`)
- [ ] AC24: No linting errors (Verification: `pnpm lint`)
- [ ] AC25: JSDoc comments updated if needed (Verification: Code review)

## Technical Approach

### 1. Create Variant/Intent/Size Mappings

```tsx
const VARIANT_CLASSES = {
  solid: 'shadow-sm',
  outline: 'border',
  ghost: 'border-transparent',
} as const;

const INTENT_CLASSES = {
  default: {
    solid: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  },
  primary: {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  },
  // ... other intents
} as const;

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;
```

### 2. Compose Classes with clsx

```tsx
const buttonClasses = clsx(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  VARIANT_CLASSES[variant],
  INTENT_CLASSES[intent][variant],
  SIZE_CLASSES[size],
  loading && 'opacity-50 cursor-wait',
  disabled && 'opacity-50 cursor-not-allowed',
  className
);
```

### 3. Update Stories to Use Primitives

**Before:**
```tsx
<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
  <Button>One</Button>
  <Button>Two</Button>
</div>
```

**After:**
```tsx
<Stack direction="row" gap={4} wrap>
  <Button>One</Button>
  <Button>Two</Button>
</Stack>
```

### 4. Add Comprehensive Tests

```tsx
describe('Button', () => {
  describe('variants', () => {
    it('renders solid variant', () => {
      render(<Button variant="solid">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('shadow-sm');
    });
    // ... more variant tests
  });

  describe('intents', () => {
    it('renders primary intent', () => {
      render(<Button intent="primary">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
    });
    // ... more intent tests
  });

  describe('sizes', () => {
    it('renders small size', () => {
      render(<Button size="sm">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });
    // ... more size tests
  });

  describe('states', () => {
    it('handles loading state', () => {
      render(<Button loading>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-50', 'cursor-wait');
    });

    it('handles disabled state', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('interactions', () => {
    it('calls onClick handler', () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} disabled>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has accessible name', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close">×</Button>);
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });
  });
});
```

## Definition of Done

- [ ] All inline styles removed from Button.tsx
- [ ] All styling uses Tailwind classes
- [ ] All Button stories use layout primitives
- [ ] No inline styles in Button.stories.tsx
- [ ] Test coverage ≥80%
- [ ] All tests passing (`pnpm test Button`)
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] No TODO comments
- [ ] Code reviewed and approved
- [ ] Storybook stories render correctly
- [ ] PR merged to main

## Dependencies

**Before This Story:**
- Story 002 (Create Layout Primitives) ✅ Complete

**After This Story:**
- Story 014 (Update Button Stories) - further story improvements

## Effort Estimate

- **Size:** Medium (M)
- **Complexity:** Medium
- **Estimated Hours:** 4 hours
  - Component refactoring: 1.5 hours
  - Story updates: 1 hour
  - Test creation: 1.5 hours

## Task Breakdown

### Task 1: Refactor Button Component (90 minutes)
- [ ] Create variant/intent/size class mappings
- [ ] Replace inline styles with clsx composition
- [ ] Test all visual variants manually in Storybook
- [ ] Remove TODO comments

### Task 2: Update Button Stories (60 minutes)
- [ ] Replace all raw `<div>` with Stack/Flex/Grid
- [ ] Remove all inline styles
- [ ] Verify all stories render correctly in Storybook

### Task 3: Improve Test Coverage (90 minutes)
- [ ] Add variant tests
- [ ] Add intent tests
- [ ] Add size tests
- [ ] Add state tests (loading, disabled)
- [ ] Add interaction tests
- [ ] Add accessibility tests
- [ ] Run coverage report and verify ≥80%

## Notes

- Maintain backward compatibility (same API)
- Visual appearance should remain identical
- Focus on code quality, not feature changes
- Document any breaking changes (if any)

## References

- Audit Report: [AUDIT-REPORT-COMPLETE.md](./AUDIT-REPORT-COMPLETE.md#1-button-component)
- Component Guidelines: [.copilot/conventions.md](../../.copilot/conventions.md)
- Tailwind Documentation: https://tailwindcss.com/docs
