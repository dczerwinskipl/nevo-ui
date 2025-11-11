# @nevo/design-system

A comprehensive, production-ready design system built with React, TypeScript, and Tailwind CSS. Every component is fully documented, tested, and accessible.

## Features

- 🎨 **Comprehensive Theme System**: Built-in theming with support for multiple intents, variants, and sizes
- 🌓 **Light/Dark Mode**: Live theme switching with persistent preferences
- ♿ **Accessibility First**: WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation
- 📖 **Complete Documentation**: Interactive Storybook stories for every component
- 🧪 **Fully Tested**: Jest unit tests and Storybook visual testing
- 🚀 **CI/CD Ready**: Automated Storybook deployments and test runs
- 🎯 **100% Type-Safe**: Full TypeScript support with exported types and interfaces
- 🔧 **Tree-Shakeable**: Optimized bundle size with proper module exports

## Components

### Primitives

- **Button**: Versatile button with intents, variants, sizes, and icons
- **Card**: Container component for grouping related content
- **Input**: Text input with validation states and labels
- **Select**: Dropdown select with native and custom styling
- **Badge**: Status indicators and labels with multiple variants
- **Typography**: Semantic text components with predefined type styles
- **Spinner**: Loading spinners with multiple variants

### Forms

- **FormField**: Complete form field with label, input, and error
- **FormLabel**: Accessible form labels with required indicators
- **FormError**: Error message display for form validation
- **FormGroup**: Group related form fields with proper spacing

### Navigation

- **Topbar**: Application header with branding and navigation
- **Sidebar**: Collapsible sidebar with nested navigation support

### Data Display

- **Table**: Modular table system with header, rows, actions, and skeleton states
- **Pagination**: Page navigation with customizable page sizes
- **Filters**: Complete filtering system with text, number, and select filters
- **FilterGroup**: Container for organizing filter controls

### Feedback

- **Alert**: Contextual alerts with intents and dismissible option
- **Toast**: Notification system with auto-dismiss
- **Loading**: Loading states with spinner, dots, and pulse variants
- **Progress**: Progress bars with multiple sizes and intents
- **EmptyState**: Empty state displays with icons and actions
- **ErrorState**: Error state displays with retry functionality

### Overlays

- **Modal**: Accessible modal dialogs with backdrop and animations

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Linting

```bash
# Run linter
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

### Type Checking

```bash
pnpm typecheck
```

## Storybook

Storybook provides interactive component documentation and visual testing. **Every component has comprehensive story coverage** with multiple examples demonstrating different states, variants, and use cases.

### Story Coverage

All components have Storybook stories demonstrating:

- ✅ Default state and basic usage
- ✅ All available variants and intents
- ✅ Different sizes (where applicable)
- ✅ Interactive states (hover, focus, disabled, loading)
- ✅ Edge cases (long text, empty states, errors)
- ✅ Composition patterns (combining components)
- ✅ Accessibility features

**Latest Audit**: All stories updated to use design-system primitives (November 2025)
- Card, Typography, Alert, and Button components consistently used
- No raw HTML elements in story demonstrations
- Proper semantic markup throughout

### Running Storybook

Start the development server:

```bash
pnpm storybook
```

This will open Storybook at [http://localhost:6006](http://localhost:6006).

### Building Static Storybook

Build a static version for deployment:

```bash
pnpm storybook:build
```

The static build will be available in `storybook-static/`.

### Using the Accessibility Panel

Storybook includes the a11y addon for automated accessibility testing:

1. Open any story in Storybook
2. Click the "Accessibility" tab at the bottom panel
3. Review any violations, passes, and incomplete checks
4. Click on violations to see details and how to fix them

The a11y addon uses [axe-core](https://github.com/dequelabs/axe-core) to check for:

- Color contrast ratios (WCAG AA: 4.5:1 for text)
- Minimum touch target sizes (44px × 44px)
- ARIA attributes and labels
- Keyboard navigation support
- Semantic HTML usage

### Adding New Stories

**Important**: All stories must use design-system primitives for consistency.

To add stories for a new component:

1. Create a `ComponentName.stories.tsx` file next to your component
2. Import necessary types and components:
   ```typescript
   import type { Meta, StoryObj } from "@storybook/react";
   import { Typography } from "../primitives/Typography";
   import { Card } from "../primitives/Card";
   import { Alert } from "../feedback/Alert";
   ```
3. Define the meta configuration and export stories
4. **Use primitives for all demonstrations**:
   - Use `<Typography>` instead of `<h1>`, `<h2>`, `<h3>`, `<p>`, `<span>`
   - Use `<Card>` instead of styled `<div>` containers
   - Use `<Alert>` instead of custom error/success/info displays
   - Use `<Button>` for all interactive actions

Example:
```typescript
export const ExampleStory: Story = {
  render: () => (
    <Card>
      <Typography type="card-title" className="mb-2">
        Component Example
      </Typography>
      <Typography type="body" intent="neutral">
        This demonstrates proper primitive usage in stories.
      </Typography>
    </Card>
  ),
};
```

See completed stories for reference:
- `src/primitives/Card.stories.tsx` - Comprehensive card examples
- `src/navigation/Sidebar.stories.tsx` - Navigation patterns
- `src/data/Pagination.stories.tsx` - Data display examples

## Theme System

The design system uses a centralized theme configuration:

### Intents

- `primary`: Main brand actions
- `success`: Positive actions
- `warning`: Cautionary actions
- `error`: Destructive actions
- `info`: Informational actions
- `neutral`: Neutral/secondary actions

### Variants

- `solid`: Filled background (highest emphasis)
- `outline`: Outlined with transparent background
- `ghost`: Transparent with hover state
- `subtle`: Minimal styling (lowest emphasis)

### Sizes

- `xs`: Extra small (32px min height)
- `sm`: Small (40px min height)
- `md`: Medium (44px min height) - Default
- `lg`: Large (48px min height)
- `xl`: Extra large (56px min height)

All interactive components maintain minimum touch targets of 44px for accessibility.

## Usage

```typescript
import { Button, ThemeProvider } from '@nevo/design-system';

function App() {
  return (
    <ThemeProvider>
      <Button intent="primary" size="md" onClick={() => alert('Clicked!')}>
        Click me
      </Button>
    </ThemeProvider>
  );
}
```

## Contributing

This design system was built through AI-assisted development with systematic quality assurance.

### Development Workflow

1. **Specification**: Define component API, variants, and behavior
2. **Implementation**: Build component with TypeScript and React
3. **Stories**: Create comprehensive Storybook examples
4. **Testing**: Write unit tests with Jest and React Testing Library
5. **Accessibility**: Verify WCAG compliance with a11y addon
6. **Documentation**: Update README and type definitions
7. **Audit**: Validate consistency with design system patterns

### Quality Standards

When adding new components:

1. ✅ Follow existing component structure and naming conventions
2. ✅ Create comprehensive Storybook stories (all variants, states, edge cases)
3. ✅ Add unit tests with Jest (minimum 80% coverage)
4. ✅ Verify accessibility with the a11y addon (zero violations)
5. ✅ Use design-system primitives in all examples
6. ✅ Document all props with TSDoc comments
7. ✅ Export types and interfaces
8. ✅ Ensure proper semantic HTML
9. ✅ Test keyboard navigation
10. ✅ Validate in both light and dark themes

### Component Structure

```typescript
// Component file structure
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Jest tests (if applicable)
└── index.ts                   # Exports

// Typical component template
export interface ComponentNameProps {
  intent?: ComponentIntent;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: ComponentSize;
  children: React.ReactNode;
  className?: string;
  // ... other props
}

export function ComponentName({
  intent = 'neutral',
  variant = 'solid',
  size = 'md',
  children,
  className,
}: ComponentNameProps) {
  const { tokens } = useTheme();
  // ... implementation
}
```

## License

See the root LICENSE file.
