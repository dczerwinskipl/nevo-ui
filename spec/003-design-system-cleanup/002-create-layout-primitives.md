# Story 002: Create Layout Primitives

## Summary

As a **Storybook author**, I want **reusable layout primitives (Stack, Flex, Grid, Container)** so that **I can create stories without using raw HTML and inline styles**.

## Context

**Background:** Currently, all Storybook stories use raw HTML `<div>` elements with inline styles for layout (80+ instances found). This violates our guideline that stories should use only design system primitives.

**Current State:**

```tsx
// Current approach in stories
<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
  <Button>One</Button>
  <Button>Two</Button>
</div>
```

**Desired State:**

```tsx
// Desired approach using primitives
<Stack direction="row" gap="4" wrap>
  <Button>One</Button>
  <Button>Two</Button>
</Stack>
```

**Links:**

- Parent Epic: [003-design-system-cleanup/README.md](./README-UPDATED.md)
- Related Audit: [AUDIT-REPORT-COMPLETE.md](./AUDIT-REPORT-COMPLETE.md#missing-layout-primitives)

## Detailed Requirements

### 1. Stack Component

Create a flexible stacking layout component for vertical/horizontal layouts with consistent spacing.

**Props:**

- `direction?: 'row' | 'column'` (default: 'column')
- `gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12` (Tailwind gap values)
- `align?: 'start' | 'center' | 'end' | 'stretch'`
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around'`
- `wrap?: boolean` (default: false)
- `className?: string`
- `children: ReactNode`

### 2. Flex Component

Create a Flexbox layout component with full control over flex properties.

**Props:**

- `direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'`
- `gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12`
- `align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'`
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`
- `wrap?: boolean | 'reverse'`
- `grow?: boolean` (applies flex-grow-1 to children)
- `shrink?: boolean` (applies flex-shrink-0 to children)
- `className?: string`
- `children: ReactNode`

### 3. Grid Component

Create a CSS Grid layout component for grid-based layouts.

**Props:**

- `cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto'` (number of columns)
- `gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12`
- `rows?: number | 'auto'` (number of rows)
- `alignItems?: 'start' | 'center' | 'end' | 'stretch'`
- `justifyItems?: 'start' | 'center' | 'end' | 'stretch'`
- `className?: string`
- `children: ReactNode`

### 4. Container Component

Create a container component with max-width constraints and responsive padding.

**Props:**

- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` (max-width: 640px, 768px, 1024px, 1280px, 100%)
- `padding?: 0 | 2 | 4 | 6 | 8` (responsive padding)
- `center?: boolean` (center with mx-auto)
- `className?: string`
- `children: ReactNode`

## Acceptance Criteria

### Stack Component

- [ ] AC1: Stack component file created at `packages/design-system/src/primitives/Stack.tsx` (Verification: File exists)
- [ ] AC2: Supports `direction` prop with 'row' and 'column' values (Verification: Unit test passes)
- [ ] AC3: Supports all gap values (0-12) using Tailwind gap utilities (Verification: Unit test passes)
- [ ] AC4: Supports `align` and `justify` props (Verification: Unit test passes)
- [ ] AC5: Supports `wrap` prop (Verification: Unit test passes)
- [ ] AC6: Uses only Tailwind classes, no inline styles (Verification: `grep "style={{" Stack.tsx` returns 0)
- [ ] AC7: Exported from `packages/design-system/src/index.ts` (Verification: Import test passes)

### Flex Component

- [ ] AC8: Flex component file created at `packages/design-system/src/primitives/Flex.tsx` (Verification: File exists)
- [ ] AC9: Supports all flex direction values (Verification: Unit test passes)
- [ ] AC10: Supports all alignment and justification values (Verification: Unit test passes)
- [ ] AC11: Supports wrap values (boolean and 'reverse') (Verification: Unit test passes)
- [ ] AC12: Uses only Tailwind classes, no inline styles (Verification: `grep "style={{" Flex.tsx` returns 0)
- [ ] AC13: Exported from index (Verification: Import test passes)

### Grid Component

- [ ] AC14: Grid component file created at `packages/design-system/src/primitives/Grid.tsx` (Verification: File exists)
- [ ] AC15: Supports cols prop with predefined values (Verification: Unit test passes)
- [ ] AC16: Supports gap prop (Verification: Unit test passes)
- [ ] AC17: Supports rows, alignItems, justifyItems props (Verification: Unit test passes)
- [ ] AC18: Uses only Tailwind classes, no inline styles (Verification: `grep "style={{" Grid.tsx` returns 0)
- [ ] AC19: Exported from index (Verification: Import test passes)

### Container Component

- [ ] AC20: Container component file created at `packages/design-system/src/primitives/Container.tsx` (Verification: File exists)
- [ ] AC21: Supports size prop with max-width values (Verification: Unit test passes)
- [ ] AC22: Supports padding prop (Verification: Unit test passes)
- [ ] AC23: Supports center prop (Verification: Unit test passes)
- [ ] AC24: Uses only Tailwind classes, no inline styles (Verification: `grep "style={{" Container.tsx` returns 0)
- [ ] AC25: Exported from index (Verification: Import test passes)

### Testing

- [ ] AC26: Stack.test.tsx created with ≥80% coverage (Verification: `pnpm test Stack.test.tsx --coverage`)
- [ ] AC27: Flex.test.tsx created with ≥80% coverage (Verification: `pnpm test Flex.test.tsx --coverage`)
- [ ] AC28: Grid.test.tsx created with ≥80% coverage (Verification: `pnpm test Grid.test.tsx --coverage`)
- [ ] AC29: Container.test.tsx created with ≥80% coverage (Verification: `pnpm test Container.test.tsx --coverage`)

### Storybook

- [ ] AC30: Stack.stories.tsx created with all prop variations (Verification: Story file exists, Storybook builds)
- [ ] AC31: Flex.stories.tsx created with all prop variations (Verification: Story file exists, Storybook builds)
- [ ] AC32: Grid.stories.tsx created with all prop variations (Verification: Story file exists, Storybook builds)
- [ ] AC33: Container.stories.tsx created with all prop variations (Verification: Story file exists, Storybook builds)
- [ ] AC34: All stories use real content (Button, Card, etc.) to demonstrate layout (Verification: Code review)

### Documentation

- [ ] AC35: JSDoc comments added to all components (Verification: Code review)
- [ ] AC36: Props documented with descriptions (Verification: Storybook controls show descriptions)
- [ ] AC37: Usage examples in story descriptions (Verification: Code review)

## Technical Approach

### Files to Create

1. **`packages/design-system/src/primitives/Stack.tsx`**
   - Use `clsx` for className composition
   - Map props to Tailwind classes
   - Forward remaining props to div

2. **`packages/design-system/src/primitives/Flex.tsx`**
   - Similar to Stack but with more flex options
   - Support all flex utilities

3. **`packages/design-system/src/primitives/Grid.tsx`**
   - Map cols prop to Tailwind grid columns
   - Support grid-specific utilities

4. **`packages/design-system/src/primitives/Container.tsx`**
   - Map size to max-w-\* classes
   - Responsive padding support

5. **Test files** for each component

6. **Story files** for each component

7. **Update `packages/design-system/src/index.ts`**
   - Export all new primitives

### Implementation Pattern

Example for Stack component:

```tsx
import React from "react";
import { clsx } from "clsx";

type StackDirection = "row" | "column";
type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between" | "around";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: React.ReactNode;
}

const GAP_CLASSES: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export const Stack: React.FC<StackProps> = ({
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        GAP_CLASSES[gap],
        align && `items-${align}`,
        justify && `justify-${justify}`,
        wrap && "flex-wrap",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
```

### Testing Strategy

**Unit Tests (per component):**

- [ ] Renders with default props
- [ ] Applies correct classes for each prop value
- [ ] Forwards className prop
- [ ] Forwards remaining HTML props
- [ ] Renders children correctly

**Example Test:**

```tsx
describe("Stack", () => {
  it("renders with default props", () => {
    render(<Stack>Content</Stack>);
    const stack = screen.getByText("Content").parentElement;
    expect(stack).toHaveClass("flex", "flex-col", "gap-4");
  });

  it("applies row direction", () => {
    render(<Stack direction="row">Content</Stack>);
    const stack = screen.getByText("Content").parentElement;
    expect(stack).toHaveClass("flex-row");
  });

  // ... more tests
});
```

### Storybook Stories

**Example Stories:**

```tsx
export const Default: Story = {
  render: () => (
    <Stack gap="4">
      <Button>Item 1</Button>
      <Button>Item 2</Button>
      <Button>Item 3</Button>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap="4">
      <Button>Item 1</Button>
      <Button>Item 2</Button>
      <Button>Item 3</Button>
    </Stack>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <Stack align="center" gap="4">
      <Button>Short</Button>
      <Button>Medium Button</Button>
      <Button>Very Long Button Text</Button>
    </Stack>
  ),
};
```

## Definition of Done

- [ ] All 4 layout primitive components created
- [ ] All components use only Tailwind CSS (no inline styles)
- [ ] All components have TypeScript interfaces with proper types
- [ ] All components have unit tests with ≥80% coverage
- [ ] All tests passing (`pnpm test`)
- [ ] All components have Storybook stories showing all variations
- [ ] Storybook builds without errors (`pnpm storybook`)
- [ ] All components exported from index.ts
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] JSDoc comments added to all components
- [ ] Code reviewed and approved
- [ ] PR merged to main

## Dependencies

**Before This Story:**

- None (can start immediately)

**After This Story:**

- Story 004-018 will use these primitives in their stories

## Effort Estimate

- **Size:** Large (L)
- **Complexity:** Medium
- **Estimated Hours:** 8 hours
  - Stack component: 1.5 hours (component + tests + stories)
  - Flex component: 2 hours (component + tests + stories)
  - Grid component: 2 hours (component + tests + stories)
  - Container component: 1.5 hours (component + tests + stories)
  - Documentation and polish: 1 hour

## Task Breakdown

### Task 1: Create Stack Component (90 minutes)

- [ ] Create `Stack.tsx` file
- [ ] Implement Stack component with all props
- [ ] Create `Stack.test.tsx` with full test coverage
- [ ] Create `Stack.stories.tsx` with examples
- [ ] Export from index.ts

### Task 2: Create Flex Component (120 minutes)

- [ ] Create `Flex.tsx` file
- [ ] Implement Flex component with all props
- [ ] Create `Flex.test.tsx` with full test coverage
- [ ] Create `Flex.stories.tsx` with examples
- [ ] Export from index.ts

### Task 3: Create Grid Component (120 minutes)

- [ ] Create `Grid.tsx` file
- [ ] Implement Grid component with all props
- [ ] Create `Grid.test.tsx` with full test coverage
- [ ] Create `Grid.stories.tsx` with examples
- [ ] Export from index.ts

### Task 4: Create Container Component (90 minutes)

- [ ] Create `Container.tsx` file
- [ ] Implement Container component with all props
- [ ] Create `Container.test.tsx` with full test coverage
- [ ] Create `Container.stories.tsx` with examples
- [ ] Export from index.ts

### Task 5: Documentation & Verification (60 minutes)

- [ ] Add comprehensive JSDoc comments
- [ ] Verify all tests pass
- [ ] Verify Storybook builds
- [ ] Verify no TypeScript/linting errors
- [ ] Create PR and add screenshots

## Notes

- These primitives will replace 80+ instances of raw HTML in story files
- Keep components simple and focused on layout only
- No theming/styling logic - just layout utilities
- Follow Tailwind gap scale for consistency
- Consider adding responsive variants in future (not in this story)

## References

- Audit Report: [AUDIT-REPORT-COMPLETE.md](./AUDIT-REPORT-COMPLETE.md#missing-layout-primitives)
- Component Guidelines: [.copilot/conventions.md](../../.copilot/conventions.md)
- Storybook Guidelines: [.copilot/recipes/storybook.md](../../.copilot/recipes/storybook.md)
- Testing Strategy: [.copilot/context/testing-strategy.md](../../.copilot/context/testing-strategy.md)
