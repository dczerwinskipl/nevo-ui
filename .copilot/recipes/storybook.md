# Recipe: Writing Storybook Stories

This recipe provides guidelines for creating effective Storybook stories for design system components.

## Overview

Storybook stories serve multiple purposes:

- **Documentation**: Show how to use components
- **Testing**: Visual regression and interaction testing
- **Development**: Isolated component development
- **Design Review**: Showcase all variants and states

## Story Structure

### Basic Story File Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

/**
 * Meta configuration
 */
const meta: Meta<typeof ComponentName> = {
  title: "Category/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered", // or 'fullscreen', 'padded'
    docs: {
      description: {
        component:
          "Component description here. Explain what it does and when to use it.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "error", "warning", "info", "neutral"],
      description: "Visual style variant",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

/**
 * Default story - simplest use case
 */
export const Default: Story = {
  args: {
    children: "Default Component",
  },
};
```

### Story Categories

Organize stories by domain:

```
Primitives/
  ├── Button
  ├── Card
  ├── Typography
  └── Input

Forms/
  ├── FormGroup
  ├── Select
  ├── Checkbox
  └── RadioGroup

Feedback/
  ├── Alert
  ├── Toast
  ├── Loading
  └── Badge

Navigation/
  ├── Sidebar
  ├── Topbar
  └── Breadcrumb

Data/
  ├── Table
  ├── Pagination
  └── Filters

Overlays/
  ├── Modal
  ├── Dropdown
  └── Popover
```

## Story Patterns

### ❌ NEVER Use Raw HTML in Stories

**Rule**: Always use design system primitives (Card, Button, Typography) instead of raw HTML (`<div>`, `<button>`, `<h1>`, etc.)

**Why**:

- Ensures consistency across all stories
- Uses proper theme tokens
- Demonstrates actual component usage
- Maintains accessibility standards
- Shows best practices to developers

### ✅ Use Design System Primitives

```tsx
// ❌ BAD - Using raw HTML
export const Example: Story = {
  render: () => (
    <div
      style={{ padding: "1rem", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Title</h3>
      <p>Description text</p>
      <button
        style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "#fff" }}
      >
        Click me
      </button>
    </div>
  ),
};

// ✅ GOOD - Using design system primitives
export const Example: Story = {
  render: () => (
    <Card className="p-4">
      <Typography type="card-title">Title</Typography>
      <Typography type="body" className="mt-2">
        Description text
      </Typography>
      <Button intent="primary" className="mt-4">
        Click me
      </Button>
    </Card>
  ),
};
```

### ✅ Common Primitives to Use

```tsx
import {
  Card,           // Instead of <div> for containers
  Typography,     // Instead of <h1>, <h2>, <p>, <span>
  Button,         // Instead of <button>
  Badge,          // For status indicators
} from '@nevo/design-system';

// Layout
<Card>...</Card>                                    // Container
<div className="flex gap-4">...</div>               // Flexbox (Tailwind OK)
<div className="grid grid-cols-2 gap-4">...</div>  // Grid (Tailwind OK)

// Typography
<Typography type="page-title">...</Typography>      // h1
<Typography type="section-title">...</Typography>   // h2
<Typography type="card-title">...</Typography>      // h3
<Typography type="body">...</Typography>            // p
<Typography type="caption">...</Typography>         // Small text
<Typography type="label">...</Typography>           // Form labels

// Interactive
<Button intent="primary">...</Button>
<Badge intent="success">...</Badge>
```

### ✅ When Tailwind Classes Are OK

**Acceptable**: Using Tailwind utility classes for layout and spacing

```tsx
// ✅ GOOD - Tailwind for layout
<div className="flex flex-col gap-4">
  <Card className="p-4">...</Card>
  <Card className="p-4">...</Card>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

// ✅ GOOD - Tailwind for responsive spacing
<div className="p-4 md:p-6 lg:p-8">...</div>

// ❌ BAD - Inline styles for things Tailwind can do
<div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>...</div>
```

### 1. Default Story

The simplest, most common use case:

```tsx
export const Default: Story = {
  args: {
    variant: "default",
    children: "Click me",
  },
};
```

### 2. Variants Story

Show all visual variants side-by-side:

```tsx
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button intent="primary" variant="solid">
        Primary
      </Button>
      <Button intent="neutral" variant="solid">
        Neutral
      </Button>
      <Button intent="neutral" variant="outline">
        Outline
      </Button>
      <Button intent="neutral" variant="ghost">
        Ghost
      </Button>
      <Button intent="error" variant="solid">
        Delete
      </Button>
    </div>
  ),
};
```

### 3. Sizes Story

Demonstrate size variations:

```tsx
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

### 4. States Story

Show interactive states:

```tsx
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button className="hover:bg-primary-600">Hover</Button>
        <Button className="ring-2 ring-primary-500">Focus</Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>Disabled</Button>
        <Button aria-busy="true">Loading</Button>
      </div>
    </div>
  ),
};
```

### 5. With Icons Story

Show icon usage:

```tsx
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Item
      </Button>
      <Button>
        Save
        <SaveIcon className="w-4 h-4 ml-2" />
      </Button>
      <Button size="icon">
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  ),
};
```

### 6. Composition Story

Demonstrate component composition:

```tsx
export const CompositionExample: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Typography variant="h3">Card Title</Typography>
        <Typography variant="muted">Card subtitle</Typography>
      </Card.Header>
      <Card.Content>
        <Typography>Main content goes here</Typography>
      </Card.Content>
      <Card.Footer className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save</Button>
      </Card.Footer>
    </Card>
  ),
};
```

### 7. Interactive Story

Stories with state and interactions:

```tsx
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <div className="space-y-4">
        <Typography>Count: {count}</Typography>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    );
  },
};
```

### 8. Playground Story

Let users experiment with all props:

```tsx
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Playground Button",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls to experiment with different prop combinations.",
      },
    },
  },
};
```

### 9. Real-World Example

Show realistic usage:

```tsx
export const RealWorldExample: Story = {
  render: () => (
    <Card className="max-w-md">
      <Card.Header>
        <Typography variant="h3">Delete Product</Typography>
      </Card.Header>
      <Card.Content>
        <Alert variant="warning">
          <AlertIcon className="w-4 h-4" />
          <Alert.Title>Are you sure?</Alert.Title>
          <Alert.Description>
            This action cannot be undone. The product will be permanently
            deleted.
          </Alert.Description>
        </Alert>
      </Card.Content>
      <Card.Footer className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete Product</Button>
      </Card.Footer>
    </Card>
  ),
};
```

## Best Practices

### ✅ DO: Use Design System Components

```tsx
// ✅ Good: Use design system components
export const GoodExample: Story = {
  render: () => (
    <Card>
      <Typography variant="h3">Title</Typography>
      <Button variant="primary">Action</Button>
    </Card>
  ),
};
```

### ❌ DON'T: Use Raw HTML

```tsx
// ❌ Bad: Raw HTML elements
export const BadExample: Story = {
  render: () => (
    <div className="card">
      <h3>Title</h3>
      <button>Action</button>
    </div>
  ),
};
```

### ✅ DO: Add Descriptions

```tsx
export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: "This story demonstrates the primary variant with icon.",
      },
    },
  },
  render: () => <Button variant="primary">Click</Button>,
};
```

### ✅ DO: Use Realistic Data

```tsx
// ✅ Good: Realistic data
export const TableExample: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Premium Widget</TableCell>
          <TableCell>$29.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
```

### ❌ DON'T: Use Lorem Ipsum Excessively

```tsx
// ❌ Avoid: Generic placeholder text doesn't show realistic usage
export const LoremExample: Story = {
  render: () => (
    <Card>
      <Typography>Lorem ipsum dolor sit amet...</Typography>
    </Card>
  ),
};
```

### ✅ DO: Show Responsive Behavior

```tsx
export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>Content</Card>
      <Card>Content</Card>
      <Card>Content</Card>
    </div>
  ),
};
```

### ✅ DO: Test Dark Mode

```tsx
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => <Button variant="primary">Dark Mode Button</Button>,
};
```

## Advanced Patterns

### Story Decorators

Wrap stories with common layout or context:

```tsx
const meta: Meta<typeof Component> = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-background-primary">
        <Story />
      </div>
    ),
  ],
};
```

### Story Parameters

Configure story behavior:

```tsx
export const FullWidth: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    backgrounds: {
      default: "light",
    },
  },
};
```

### Args vs Render

```tsx
// Use args for simple prop passing
export const WithArgs: Story = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};

// Use render for complex compositions
export const WithRender: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button {...args} />
      <Button {...args} intent="neutral" variant="outline" />
    </div>
  ),
  args: {
    children: "Click me",
  },
};
```

### Play Function (Interaction Testing)

```tsx
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export const TestInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find button
    const button = canvas.getByRole("button", { name: /click me/i });

    // Click it
    await userEvent.click(button);

    // Assert something changed
    await expect(canvas.getByText(/clicked/i)).toBeInTheDocument();
  },
};
```

## Storybook Configuration

### Preview Configuration

```tsx
// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

## Documentation

### Component Description

```tsx
const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Button component provides a clickable element for user actions.

## Features
- Multiple variants (primary, secondary, outline, ghost, destructive)
- Size options (sm, md, lg)
- Icon support
- Loading states
- Full keyboard accessibility

## Usage
\`\`\`tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
\`\`\`
        `,
      },
    },
  },
};
```

## Testing Checklist

Before committing stories:

- [ ] All variants shown
- [ ] All sizes demonstrated
- [ ] Interactive states visible
- [ ] Uses design system components (not raw HTML)
- [ ] Realistic data/content
- [ ] Descriptions added
- [ ] No console errors
- [ ] Renders correctly in Storybook
- [ ] Dark mode tested
- [ ] Responsive behavior shown
- [ ] Accessibility verified

## Common Mistakes to Avoid

1. **Using raw HTML instead of primitives**
2. **Missing story descriptions**
3. **Not showing all variants**
4. **Using unrealistic placeholder data**
5. **Forgetting to test dark mode**
6. **Not demonstrating composition**
7. **Missing interactive examples**
8. **Ignoring responsive behavior**

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Best Practices](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
