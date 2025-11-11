# Story 005: Refactor Badge Component

## Summary
**As a** design system maintainer  
**I want to** refactor the Badge component to eliminate inline styles and improve quality  
**So that** the component follows design system guidelines with consistent styling and comprehensive tests

## Context

### Current State
- Badge component likely contains inline styles
- Test coverage may be incomplete
- Stories may not demonstrate all variants
- May not follow Tailwind-first approach

### Desired State
- No inline styles in Badge component
- Uses Tailwind CSS classes and theme tokens exclusively
- Comprehensive test coverage (≥80%)
- Stories demonstrate all variants and use cases
- Follows design system architecture patterns

## Requirements

### 1. Badge Component Refactoring
- [ ] Remove all inline styles from Badge.tsx
- [ ] Use Tailwind CSS classes for all styling
- [ ] Integrate theme tokens via `useTheme()` hook
- [ ] Implement intent variants (primary, success, warning, danger, info)
- [ ] Implement size variants (xs, sm, md, lg)
- [ ] Support optional icon/dot indicator
- [ ] Support removable badges with close button
- [ ] Ensure accessibility (proper ARIA attributes, semantic HTML)

### 2. Testing
- [ ] Comprehensive unit tests for Badge component
- [ ] Test all intent variants
- [ ] Test all size variants
- [ ] Test with/without icons
- [ ] Test removable badge functionality
- [ ] Test accessibility features (ARIA, keyboard navigation)
- [ ] Achieve ≥80% code coverage

### 3. Storybook Stories
- [ ] Update Badge.stories.tsx to use layout primitives
- [ ] Story for all intent variants
- [ ] Story for all size variants
- [ ] Story for badges with icons
- [ ] Story for removable badges
- [ ] Story demonstrating badge in context (e.g., on cards, in lists)
- [ ] Controls for all props
- [ ] Accessibility documentation in stories

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
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
    expect(screen.getByText("Large")).toHaveClass("px-3", "py-1.5", "text-base");
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
    render(<Badge removable onRemove={onRemove}>Removable</Badge>);
    
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
      <Badge dot intent="success">Active</Badge>
      <Badge dot intent="danger">Error</Badge>
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
