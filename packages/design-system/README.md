# @nevo/design-system

A comprehensive design system package built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Theming**: Built-in theme system with support for multiple intents, variants, and sizes
- 🌓 **Theme Toggle**: Live dark/light theme switching in Storybook
- ♿ **Accessibility**: WCAG 2.1 AA compliant components with minimum touch targets
- 📖 **Documentation**: Interactive component documentation with Storybook
- 🚀 **Preview Deployments**: Automatic Storybook deployments on pull requests
- 🧪 **Testing**: Comprehensive test coverage with Jest and visual testing with Storybook
- 🎯 **Type-Safe**: Full TypeScript support with exported types

## Components

### Primitives

- **Button**: Versatile button component with multiple intents, variants, and sizes

### Forms

- Additional components coming soon...

### Feedback

- Additional components coming soon...

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

Storybook provides interactive component documentation and visual testing.

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

To add stories for a component:

1. Create a `ComponentName.stories.tsx` file next to your component
2. Import types from `@storybook/react`:
   ```typescript
   import type { Meta, StoryObj } from "@storybook/react";
   ```
3. Define the meta configuration and export stories
4. See `src/primitives/Button.stories.tsx` for a comprehensive example

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

When adding new components:

1. Follow the existing component structure
2. Create comprehensive Storybook stories
3. Add unit tests with Jest
4. Verify accessibility with the a11y addon
5. Document props and usage

## License

See the root LICENSE file.
