# Story 005: Refactor Badge Component

## Summary

**As a** design system maintainer  
**I want to** refactor the Badge component to eliminate inline styles and use config-based Tailwind classes  
**So that** the component follows design system guidelines with consistent, theme-aware styling and comprehensive tests

## Context

### Previous State

- Badge component contained inline styles
- Test coverage was incomplete
- Stories did not demonstrate all variants
- Did not follow config-based Tailwind approach

### Implemented State

- No inline styles in Badge component
- Uses config-based Tailwind CSS classes and CSS variables exclusively
- All colors reference CSS variables (e.g., `bg-intent-primary-bg`, `text-intent-primary-text`)
- Comprehensive test coverage implemented
- Stories demonstrate all variants and use layout primitives
- Follows design system architecture patterns
- Supports instant theme switching

## Requirements (COMPLETED ✅)

### 1. Badge Component Refactoring

- [x] Remove all inline styles from Badge.tsx
- [x] Use config-based Tailwind CSS classes for all styling
- [x] All colors reference CSS variables from `tokens.ts` and `tailwind.config.cjs`
- [x] Implement intent variants (primary, success, warning, error, info, neutral)
- [x] Implement size variants (xs, sm, md, lg)
- [x] Support optional icon/dot indicator
- [x] Support removable badges with close button
- [x] Ensure accessibility (proper ARIA attributes, semantic HTML)
- [x] No hardcoded dark mode classes

### 2. Testing

- [x] Comprehensive unit tests for Badge component
- [x] Test all intent variants
- [x] Test all size variants
- [x] Test with/without icons
- [x] Test removable badge functionality
- [x] Test accessibility features (ARIA, keyboard navigation)
- [x] Tests updated to expect config-based classes

### 3. Storybook Stories

- [x] Update Badge.stories.tsx to use layout primitives
- [x] Story for all intent variants
- [x] Story for all size variants
- [x] Story for badges with icons
- [x] Story for removable badges
- [x] Story demonstrating badge in context (e.g., on cards, in lists)
- [x] Controls for all props
- [x] Accessibility documentation in stories

## Acceptance Criteria

### Code Quality

- ✅ No inline styles remain in Badge.tsx
- ✅ All styles use Tailwind CSS classes
- ✅ Theme tokens used for colors via `useTheme()`
- ✅ Component follows TypeScript best practices
- ✅ Props interface properly typed with JSDoc

### Functionality

- ✅ Badge displays correctly in all intent variants
- ✅ Badge displays correctly in all size variants
- ✅ Badge supports optional icon/dot indicator
- ✅ Removable badge calls onRemove callback
- ✅ Disabled state works correctly

### Testing

- ✅ All tests pass
- ✅ Code coverage ≥80%
- ✅ Tests cover all variants and props
- ✅ Accessibility tests included

### Storybook

- ✅ Stories use Stack/Flex layout primitives
- ✅ All variants demonstrated
- ✅ Interactive controls work
- ✅ Stories build without errors

## Implementation Summary

### Key Changes Made

1. **Config-Based Tailwind Migration**:
   - Replaced all inline styles with config-based Tailwind classes
   - Colors reference CSS variables: `bg-intent-primary-bg`, `text-intent-primary-text`, `border-intent-primary-border`
   - All color tokens defined in `tailwind.config.cjs` as CSS variable references

2. **Intent and Variant Implementation**:
   - All intent colors use CSS variable references
   - Variant styles (solid, outline, ghost, subtle) use config-based classes
   - Size variants use config-based spacing and typography classes

3. **Utility Functions**:
   - `getIntentVariantClasses()` returns config-based classes
   - `getBgColor()`, `getTextColor()`, `getBorderColor()` use CSS variable references
   - All utilities centralized in `classNames.ts`

4. **Test Updates**:
   - Tests updated to expect config-based classes
   - Example: Expect `bg-intent-success-bg` instead of inline `backgroundColor`
   - All tests passing

### Migration Pattern

**Before:**
```tsx
<span
  style={{
    backgroundColor: tokens.intent.primary.bg,
    color: tokens.intent.primary.text,
  }}
  className="dark:bg-gray-800"
/>
```

**After:**
```tsx
<span
  className="bg-intent-primary-bg text-intent-primary-text"
/>
```

### Benefits

- ✅ Theme-aware via CSS variables
- ✅ Instant theme switching
- ✅ No hardcoded dark mode classes
- ✅ Better developer experience
- ✅ Tailwind IntelliSense support

### Documentation

See `spec/003-design-system-cleanup/CONFIG-BASED-TAILWIND-MIGRATION.md` for complete implementation details.

## Technical Approach

### 1. Badge Component Structure

```tsx
import React from "react";
import { clsx } from "clsx";
import { useTheme, ComponentIntent, ComponentSize } from "../theme";

const SIZE_CLASSES: Record<ComponentSize, string> = {
  xs: "px-1.5 py-0.5 text-xs",
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
  xl: "px-4 py-2 text-lg",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: ComponentIntent;
  size?: ComponentSize;
  variant?: "solid" | "outline" | "soft";
  icon?: React.ReactNode;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  intent = "primary",
  size = "md",
  variant = "solid",
  icon,
  dot,
  removable,
  onRemove,
  className,
  children,
  ...rest
}) => {
  const { tokens } = useTheme();

  // Get colors from theme tokens
  const intentStyles = getIntentStyle(tokens, intent, variant);

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-medium",
        SIZE_CLASSES[size],
        intentStyles,
        className
      )}
      {...rest}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-full"
          aria-label="Remove badge"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
```

### 2. Test Structure

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "./Badge";
import { ThemeProvider } from "../theme";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("px-2", "py-1", "text-xs");

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText("Large")).toHaveClass(
      "px-3",
      "py-1.5",
      "text-base"
    );
  });

  it("renders with icon", () => {
    render(<Badge icon={<span data-testid="icon">★</span>}>Star</Badge>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with dot indicator", () => {
    const { container } = render(<Badge dot>Active</Badge>);
    const dot = container.querySelector(".h-1\\.5.w-1\\.5");
    expect(dot).toBeInTheDocument();
  });

  it("calls onRemove when close button clicked", () => {
    const onRemove = jest.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Removable
      </Badge>
    );

    const removeButton = screen.getByLabelText("Remove badge");
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  // Additional tests for intents, variants, accessibility...
});
```

### 3. Story Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Stack } from "../layout/Stack";
import { Flex } from "../layout/Flex";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Flex gap={2} wrap>
        <Badge intent="primary">Primary</Badge>
        <Badge intent="success">Success</Badge>
        <Badge intent="warning">Warning</Badge>
        <Badge intent="danger">Danger</Badge>
        <Badge intent="info">Info</Badge>
      </Flex>
    </Stack>
  ),
};

export const WithDot: Story = {
  render: () => (
    <Flex gap={2}>
      <Badge dot intent="success">
        Active
      </Badge>
      <Badge dot intent="danger">
        Error
      </Badge>
    </Flex>
  ),
};

export const Removable: Story = {
  render: () => (
    <Flex gap={2}>
      <Badge removable onRemove={() => console.log("Remove clicked")}>
        Click to remove
      </Badge>
    </Flex>
  ),
};
```

## Definition of Done

- [ ] Badge component refactored with no inline styles
- [ ] All tests passing with ≥80% coverage
- [ ] Stories updated and building successfully
- [ ] No console errors or warnings
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Accessibility verified

## Dependencies

- ✅ Story 002 (Layout primitives) - COMPLETED
- ⏳ Story 003 (Hooks library) - for potential shared hooks

## Effort Estimate

**3-4 hours**

- Component refactoring: 1 hour
- Test creation: 1.5 hours
- Story updates: 1 hour
- Review and fixes: 0.5 hours

## Task Breakdown

1. **Analyze Current Badge Component** (15 min)
   - Review Badge.tsx for inline styles
   - Check current test coverage
   - Review existing stories

2. **Refactor Badge Component** (1 hour)
   - Remove inline styles
   - Implement Tailwind classes
   - Add variant support
   - Add icon/dot support
   - Add removable functionality

3. **Create Comprehensive Tests** (1.5 hours)
   - Unit tests for all variants
   - Tests for icon/dot
   - Tests for removable functionality
   - Accessibility tests
   - Run coverage report

4. **Update Storybook Stories** (1 hour)
   - Update stories to use layout primitives
   - Add stories for all variants
   - Add interactive controls
   - Test stories in Storybook

5. **Review and Polish** (30 min)
   - Fix any failing tests
   - Address linting/type errors
   - Update documentation
   - Final verification
