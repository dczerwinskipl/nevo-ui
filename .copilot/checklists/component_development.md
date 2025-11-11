# Component Development Checklist

Use this checklist when creating or modifying components in the design system.

## Planning Phase

- [ ] Review existing components for similar functionality
- [ ] Check if composition of primitives would work
- [ ] Define component requirements and use cases
- [ ] Identify all variants and states needed
- [ ] Determine accessibility requirements (WCAG AA)
- [ ] Sketch or review design mockups
- [ ] Get design approval (if applicable)
- [ ] **Identify complex logic that can be extracted to hooks**
- [ ] **Check if feedback components can be reused (EmptyState, ErrorState, Loading)**
- [ ] **Plan for component simplicity - keep it under 150-200 lines**

## Implementation Phase

### Component Structure

- [ ] Created component folder in correct category
  - `primitives/` - Base UI elements
  - `forms/` - Form-specific components
  - `feedback/` - User feedback components
  - `navigation/` - Navigation components
  - `data/` - Data display components
  - `overlays/` - Modal, dropdown, popover

- [ ] Created component files:
  - [ ] `ComponentName.tsx` - Main component
  - [ ] `types.ts` - TypeScript interfaces
  - [ ] `index.ts` - Public exports
  - [ ] `ComponentName.test.tsx` - Unit tests
  - [ ] `ComponentName.stories.tsx` - Storybook stories

### Component Code

- [ ] Uses `React.forwardRef` for ref forwarding
- [ ] TypeScript interface extends appropriate HTML element props
- [ ] Component has displayName set
- [ ] All props have JSDoc descriptions
- [ ] Default values documented in JSDoc
- [ ] Supports `className` prop with proper merging
- [ ] Accepts and spreads `...props` to underlying element
- [ ] Uses `cn()` utility for className merging
- [ ] **Component file is under 150-200 lines**
- [ ] **Complex logic extracted to custom hooks**
- [ ] **Subcomponents extracted to separate files if needed**
- [ ] **Uses feedback components instead of custom implementations**

### TypeScript

- [ ] Interface defined in `types.ts`
- [ ] Props extend correct HTML element type
- [ ] All props documented with JSDoc comments
- [ ] Default values specified in JSDoc
- [ ] Generic types used where appropriate
- [ ] No `any` types (use `unknown` or proper types)
- [ ] Exported from component `index.ts`
- [ ] Exported from main design system `index.ts`

### Styling

- [ ] Uses Tailwind CSS utility classes
- [ ] Uses design system color tokens
  - `bg-background-primary`, `bg-background-secondary`
  - `text-content-primary`, `text-content-secondary`
  - `border-border-primary`
- [ ] Uses design system spacing scale (p-2, m-4, gap-3, etc.)
- [ ] Uses design system typography variants
- [ ] Includes responsive classes where needed (sm:, md:, lg:)
- [ ] Includes dark mode support (dark:)
- [ ] **Avoids inline styles (except for dynamic values)**
- [ ] **Theme tokens use Tailwind classes, not CSS values**
- [ ] No magic numbers (use theme values)

### Variants & States

- [ ] All variants implemented and working
- [ ] Size variants (if applicable): sm, md, lg
- [ ] Visual variants (if applicable): default, primary, secondary, etc.
- [ ] Disabled state implemented
- [ ] Loading state implemented (if applicable)
- [ ] Error state implemented (if applicable)
- [ ] Hover state styled
- [ ] Focus state styled with visible indicator
- [ ] Active state styled (if clickable)

### Accessibility

- [ ] Uses semantic HTML element
- [ ] ARIA roles added where needed
- [ ] ARIA attributes correct (`aria-label`, `aria-labelledby`, etc.)
- [ ] ARIA states implemented (`aria-expanded`, `aria-selected`, etc.)
- [ ] Keyboard navigation works
  - Tab/Shift+Tab to focus
  - Enter/Space to activate
  - Escape to close (if applicable)
  - Arrow keys for navigation (if applicable)
- [ ] Focus management correct
- [ ] Focus trap implemented (for modals/dialogs)
- [ ] Focus restoration on close (for overlays)
- [ ] Screen reader tested with NVDA/VoiceOver
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus indicator visible and meets 3:1 contrast
- [ ] Does not rely on color alone

### Composition

- [ ] Works well with other design system components
- [ ] Renders children appropriately
- [ ] Supports icon components
- [ ] Compound components implemented correctly (if applicable)
- [ ] Context used appropriately (if needed)

## Testing Phase

### Unit Tests

- [ ] Tests created in `ComponentName.test.tsx`
- [ ] Renders without crashing
- [ ] Renders children correctly
- [ ] Applies all variants correctly
- [ ] Handles all props correctly
- [ ] Forwards ref correctly
- [ ] Merges className prop
- [ ] Handles click events (if clickable)
- [ ] Handles keyboard events
- [ ] Tests disabled state
- [ ] Tests loading state (if applicable)
- [ ] Tests error conditions
- [ ] Tests edge cases
- [ ] Test coverage >80%
- [ ] All tests pass locally
- [ ] No console warnings during tests

### Storybook Stories

- [ ] Stories file created: `ComponentName.stories.tsx`
- [ ] Meta configuration complete
  - Title follows pattern: `Category/ComponentName`
  - Component assigned
  - Parameters set (layout, description)
  - Tags include 'autodocs'
  - ArgTypes defined for all props

- [ ] Default story created
- [ ] Variants story shows all variants
- [ ] Sizes story shows all sizes
- [ ] States story shows interactive states
- [ ] With Icons story (if applicable)
- [ ] Composition example story
- [ ] Interactive story with state
- [ ] Real-world usage example
- [ ] Playground story for experimentation

- [ ] Stories use design system components (not raw HTML)
- [ ] Stories use realistic data (not excessive lorem ipsum)
- [ ] Story descriptions added
- [ ] No console errors in Storybook
- [ ] Renders correctly in light mode
- [ ] Renders correctly in dark mode

### Manual Testing

- [ ] Component renders correctly
- [ ] All variants display properly
- [ ] All sizes work correctly
- [ ] Responsive behavior correct
- [ ] Dark mode works
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (basic check)
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile (if applicable)

### Accessibility Testing

- [ ] Tested with keyboard only
- [ ] Tested with screen reader
- [ ] Ran axe DevTools (no violations)
- [ ] Checked color contrast with tool
- [ ] Verified focus indicators visible
- [ ] Checked with zoom at 200%
- [ ] Works with reduced motion preference

## Documentation Phase

- [ ] JSDoc comments on component
- [ ] JSDoc comments on all props
- [ ] Usage example in JSDoc
- [ ] Complex logic explained with comments
- [ ] README updated (if needed)
- [ ] Design system component list updated
- [ ] Storybook autodocs complete

## Integration Phase

- [ ] Component exported from folder index.ts
- [ ] Component exported from main design-system index.ts
- [ ] Types exported from main design-system index.ts
- [ ] No circular dependencies
- [ ] Import paths correct

## Pre-Commit Checks

- [ ] All TypeScript errors resolved
- [ ] All ESLint errors resolved
- [ ] All tests pass: `pnpm test`
- [ ] Storybook builds: `pnpm storybook`
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Code formatted with Prettier
- [ ] Commits follow conventional commits format

## PR Submission

- [ ] Branch name follows convention: `feat/component-name` or `fix/component-name`
- [ ] Clear PR title
- [ ] PR description complete:
  - Description of changes
  - Type of change
  - Testing completed
  - Screenshots (if applicable)
- [ ] Linked to related issue (if applicable)
- [ ] Requested reviewers assigned
- [ ] CI checks passing
- [ ] No merge conflicts

## Post-Merge

- [ ] Verified in Storybook deployment
- [ ] Checked in integration environment
- [ ] Announced in team chat (if significant)
- [ ] Documentation site updated (if applicable)

---

## Quick Reference

### Component Template

```tsx
import React from "react";
import { cn } from "../../primitives/utils";
import type { ComponentNameProps } from "./types";

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("base-classes", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = "ComponentName";
```

### Test Template

```tsx
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Story Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Category/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: "Default ComponentName",
  },
};
```

## Common Pitfalls to Avoid

- ❌ Using raw HTML elements instead of primitives
- ❌ Missing ref forwarding
- ❌ Not supporting className prop
- ❌ Forgetting to set displayName
- ❌ No TypeScript types exported
- ❌ Missing JSDoc comments
- ❌ **Using inline styles instead of Tailwind classes**
- ❌ **Creating custom empty/error/loading states**
- ❌ **Component files exceeding 200 lines**
- ❌ **Complex logic embedded in component instead of hooks**
- ❌ Not testing keyboard navigation
- ❌ Missing ARIA attributes
- ❌ Console errors in Storybook
- ❌ Using raw HTML in stories
- ❌ No dark mode support
- ❌ Poor color contrast

## Resources

- [Component Recipe](../recipes/component.md)
- [Conventions](../conventions.md)
- [API Guidelines](../context/ds-api-guidelines.md)
- [Accessibility Guidelines](../context/a11y-guidelines.md)
- [Storybook Recipe](../recipes/storybook.md)
