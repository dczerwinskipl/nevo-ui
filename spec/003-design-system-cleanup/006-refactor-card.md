# Story 006: Refactor Card Component

## Summary

**As a** design system maintainer  
**I want to** refactor the Card component to eliminate inline styles and improve quality  
**So that** the component follows design system guidelines with consistent styling and comprehensive tests

## Context

### Current State

- Card component likely contains inline styles
- Test coverage may be incomplete
- Stories may not demonstrate all variants and compositions
- May not follow Tailwind-first approach
- Card structure may not be composable

### Desired State

- No inline styles in Card component
- Uses Tailwind CSS classes and theme tokens exclusively
- Comprehensive test coverage (≥80%)
- Composable card structure (Card, CardHeader, CardBody, CardFooter)
- Stories demonstrate all variants and use cases
- Follows design system architecture patterns

## Requirements

### 1. Card Component Refactoring

- [ ] Remove all inline styles from Card.tsx
- [ ] Use Tailwind CSS classes for all styling
- [ ] Integrate theme tokens via `useTheme()` hook
- [ ] Create composable structure: Card, CardHeader, CardBody, CardFooter
- [ ] Implement variant options (default, bordered, elevated, flat)
- [ ] Support interactive cards (hoverable, clickable)
- [ ] Support loading state
- [ ] Ensure accessibility (proper semantic HTML, ARIA when needed)

### 2. Testing

- [ ] Comprehensive unit tests for Card and sub-components
- [ ] Test all variants
- [ ] Test composable structure
- [ ] Test interactive states (hover, click)
- [ ] Test loading state
- [ ] Test accessibility features
- [ ] Achieve ≥80% code coverage

### 3. Storybook Stories

- [ ] Update Card.stories.tsx to use layout primitives
- [ ] Story for all card variants
- [ ] Story for composable structure examples
- [ ] Story for interactive cards
- [ ] Story for cards in grid layouts
- [ ] Story demonstrating real-world use cases
- [ ] Controls for all props
- [ ] Accessibility documentation in stories

## Acceptance Criteria

### Code Quality

- ✅ No inline styles remain in Card.tsx
- ✅ All styles use Tailwind CSS classes
- ✅ Theme tokens used for colors via `useTheme()`
- ✅ Component follows TypeScript best practices
- ✅ Props interfaces properly typed with JSDoc
- ✅ Composable architecture implemented

### Functionality

- ✅ Card displays correctly in all variants
- ✅ Card sub-components work together seamlessly
- ✅ Interactive cards respond to user actions
- ✅ Loading state displays correctly
- ✅ Cards work in various layout contexts

### Testing

- ✅ All tests pass
- ✅ Code coverage ≥80%
- ✅ Tests cover all variants and compositions
- ✅ Accessibility tests included

### Storybook

- ✅ Stories use Stack/Flex/Grid layout primitives
- ✅ All variants demonstrated
- ✅ Interactive controls work
- ✅ Stories build without errors

## Technical Approach

### 1. Card Component Structure

```tsx
import React from "react";
import { clsx } from "clsx";
import { useTheme } from "../theme";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "flat";
  hoverable?: boolean;
  clickable?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  hoverable = false,
  clickable = false,
  loading = false,
  onClick,
  className,
  children,
  ...rest
}) => {
  const { tokens } = useTheme();

  const variantClasses = {
    default: "border border-gray-200 dark:border-gray-700",
    bordered: "border-2 border-gray-300 dark:border-gray-600",
    elevated: "shadow-lg",
    flat: "bg-gray-50 dark:bg-gray-800",
  };

  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden",
        variantClasses[variant],
        {
          "cursor-pointer": clickable,
          "transition-transform hover:scale-[1.02]": hoverable,
          "opacity-60 pointer-events-none": loading,
        },
        className
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      {...rest}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
        </div>
      )}
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  divider = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "px-6 py-4",
        {
          "border-b border-gray-200 dark:border-gray-700": divider,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody: React.FC<CardBodyProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx("px-6 py-4", className)} {...rest}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  divider = false,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "px-6 py-4",
        {
          "border-t border-gray-200 dark:border-gray-700": divider,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
```

### 2. Test Structure

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { ThemeProvider } from "../theme";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { container, rerender } = render(
      <Card variant="bordered">Test</Card>
    );
    expect(container.firstChild).toHaveClass("border-2");

    rerender(<Card variant="elevated">Test</Card>);
    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  it("renders as clickable when clickable prop is true", () => {
    const onClick = jest.fn();
    render(
      <Card clickable onClick={onClick}>
        Click me
      </Card>
    );

    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation when clickable", () => {
    const onClick = jest.fn();
    render(
      <Card clickable onClick={onClick}>
        Keyboard
      </Card>
    );

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("displays loading state", () => {
    const { container } = render(<Card loading>Loading</Card>);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders composable structure correctly", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies divider to header when specified", () => {
    const { container } = render(
      <Card>
        <CardHeader divider>Header</CardHeader>
      </Card>
    );

    const header = screen.getByText("Header").parentElement;
    expect(header).toHaveClass("border-b");
  });
});
```

### 3. Story Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Stack } from "../layout/Stack";
import { Grid } from "../layout/Grid";
import { Button } from "./Button";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const AllVariants: Story = {
  render: () => (
    <Grid columns={{ base: 1, md: 2 }} gap={4}>
      <Card variant="default">
        <CardBody>Default Card</CardBody>
      </Card>
      <Card variant="bordered">
        <CardBody>Bordered Card</CardBody>
      </Card>
      <Card variant="elevated">
        <CardBody>Elevated Card</CardBody>
      </Card>
      <Card variant="flat">
        <CardBody>Flat Card</CardBody>
      </Card>
    </Grid>
  ),
};

export const Composable: Story = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: "400px" }}>
      <CardHeader divider>
        <h3 className="text-lg font-semibold">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p>This is the card body content. It can contain any elements.</p>
      </CardBody>
      <CardFooter divider>
        <Button intent="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Grid columns={{ base: 1, md: 2 }} gap={4}>
      <Card hoverable variant="elevated">
        <CardBody>Hoverable Card</CardBody>
      </Card>
      <Card clickable onClick={() => alert("Card clicked!")} variant="bordered">
        <CardBody>Clickable Card</CardBody>
      </Card>
    </Grid>
  ),
};

export const Loading: Story = {
  render: () => (
    <Card loading variant="elevated" style={{ minHeight: "200px" }}>
      <CardBody>Content hidden while loading</CardBody>
    </Card>
  ),
};
```

## Definition of Done

- [ ] Card component and sub-components refactored with no inline styles
- [ ] All tests passing with ≥80% coverage
- [ ] Stories updated and building successfully
- [ ] No console errors or warnings
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Accessibility verified

## Dependencies

- ✅ Story 002 (Layout primitives) - COMPLETED
- ⏳ Story 004 (Button refactor) - for Card footer examples

## Effort Estimate

**4-5 hours**

- Component refactoring: 1.5 hours
- Test creation: 1.5 hours
- Story updates: 1.5 hours
- Review and fixes: 0.5 hours

## Task Breakdown

1. **Analyze Current Card Component** (15 min)
   - Review Card.tsx for inline styles
   - Check current test coverage
   - Review existing stories

2. **Refactor Card Components** (1.5 hours)
   - Remove inline styles from main Card
   - Create CardHeader, CardBody, CardFooter
   - Implement variants
   - Add interactive states
   - Add loading state

3. **Create Comprehensive Tests** (1.5 hours)
   - Unit tests for all variants
   - Tests for composable structure
   - Tests for interactive states
   - Accessibility tests
   - Run coverage report

4. **Update Storybook Stories** (1.5 hours)
   - Update stories to use layout primitives
   - Add stories for all variants
   - Add stories for real-world examples
   - Add interactive controls
   - Test stories in Storybook

5. **Review and Polish** (30 min)
   - Fix any failing tests
   - Address linting/type errors
   - Update documentation
   - Final verification
