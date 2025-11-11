# 002 - Storybook for Design System ✅ COMPLETED

## Epic: 002-testing-infrastructure

## Task: 002-storybook-design-system ✅ COMPLETED

**Status**: ✅ COMPLETED  
**Completion Date**: November 11, 2025  
**Implementation**: Storybook 8 deployed with a11y addon and theme support

### Completion Summary

Storybook successfully implemented for the design system:

- ✅ Storybook 8.x with React-Vite builder
- ✅ @storybook/addon-a11y for accessibility testing
- ✅ @storybook/addon-essentials for controls, docs, viewport
- ✅ Tailwind CSS support configured
- ✅ ThemeProvider integration (dark/light theme toggle)
- ✅ Deployed to Cloudflare Pages (nevo-ui-storybook)
- ✅ Integrated into main CI/CD pipeline
- ✅ Foundation ready for adding more component stories

### Overview

This specification defines the implementation of **Storybook** for the `@nevo/design-system` package to enable visual component testing, documentation, and accessibility (a11y) validation.

Storybook will allow developers to:

- Visually test components in isolation
- Document component APIs and usage patterns
- Test accessibility with automated a11y checks
- Test different component states (loading, error, disabled, etc.)
- Verify responsive behavior and theming

The initial implementation will focus on the **Button** component as a showcase, demonstrating all variants, sizes, intents, and states.

### Objectives

- Install and configure Storybook 8 with Vite builder for optimal performance
- Setup @storybook/addon-a11y for automated accessibility testing
- Create comprehensive stories for Button component showcasing all props
- Configure Tailwind CSS support in Storybook
- Setup theme integration (ThemeProvider)
- Document how to run Storybook and interpret a11y results
- Prepare foundation for adding more component stories in the future

---

## Architecture Decisions

### Why Storybook for Design System?

1. **Component Isolation**: Test components without app context
2. **Visual Documentation**: Living documentation for developers
3. **Accessibility First**: Catch a11y issues early with axe-core
4. **Design-Dev Collaboration**: Shareable component gallery
5. **Regression Testing**: Visual regression baseline (future: Chromatic)

### Technology Stack

- **Storybook 8.x**: Latest stable version with React support and full addon ecosystem
- **@storybook/react-vite**: Vite builder for fast HMR
- **@storybook/addon-a11y**: Automated accessibility testing (axe-core)
- **@storybook/addon-essentials**: Controls, Actions, Viewport, Docs
- **Note**: Storybook 10.x is available but not all addons are published yet, so we use 8.x

---

## Requirements

### 1. Package Structure

```
/packages/design-system
  /.storybook/
    main.ts              # Storybook configuration
    preview.tsx          # Global decorators and parameters
    manager.ts           # Manager (UI) configuration
  /src
    /primitives
      Button.tsx         # Existing component
      Button.stories.tsx # NEW: Storybook stories
    /theme
      ThemeProvider.tsx  # Existing theme provider
```

### 2. Storybook Configuration

#### `.storybook/main.ts`

```typescript
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      // Ensure Tailwind CSS is processed
      css: {
        postcss: "./postcss.config.cjs",
      },
    });
  },
};

export default config;
```

#### `.storybook/preview.tsx`

```typescript
import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import '../src/styles.css'; // If exists, or inline Tailwind

// Global decorator to wrap all stories with ThemeProvider
const withTheme = (Story: any) => (
  <ThemeProvider>
    <div className="p-4">
      <Story />
    </div>
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      // Configure axe-core rules
      config: {
        rules: [
          {
            // Example: Disable color-contrast for brand colors if needed
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
```

### 3. Button Stories Example

#### `src/primitives/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ComponentIntent, ComponentVariant, ComponentSize } from '../theme';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with support for different intents, variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'] as ComponentIntent[],
      description: 'The visual intent/purpose of the button',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'subtle'] as ComponentVariant[],
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as ComponentSize[],
      description: 'The size of the button (affects padding and font size)',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Primary: Story = {
  args: {
    children: 'Click me',
    intent: 'primary',
    variant: 'solid',
    size: 'md',
  },
};

// All intents showcase
export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button intent="primary">Primary</Button>
      <Button intent="success">Success</Button>
      <Button intent="warning">Warning</Button>
      <Button intent="error">Error</Button>
      <Button intent="info">Info</Button>
      <Button intent="neutral">Neutral</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available intent variants',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available style variants',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available sizes with minimum touch targets for accessibility',
      },
    },
  },
};

// States showcase
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading disabled>Loading & Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states including loading and disabled',
      },
    },
  },
};

// Interactive example with all controls
export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    intent: 'primary',
    variant: 'solid',
    size: 'md',
    loading: false,
    disabled: false,
  },
};

// Accessibility test cases
export const AccessibilityTest: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button aria-label="Save document">Save</Button>
      <Button disabled aria-label="Delete (disabled)" title="You don't have permission to delete">
        Delete
      </Button>
      <Button size="xs">Touch Target Test (min 44px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility test scenarios - check the a11y panel for results',
      },
    },
    a11y: {
      config: {
        // Enable all rules for this story
        rules: [],
      },
    },
  },
};

// Long text handling
export const LongText: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <Button>Short</Button>
      <Button>This is a medium length button text</Button>
      <Button>This is a very long button text that might wrap or overflow</Button>
    </div>
  ),
};

// Icon buttons (if icons are added later)
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <span>📧</span> Send Email
      </Button>
      <Button intent="error">
        🗑️ Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icon + text combinations',
      },
    },
  },
};
```

### 4. Package.json Updates

Add scripts to `packages/design-system/package.json`:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "storybook:test": "test-storybook"
  }
}
```

### 5. Dependencies to Install

```json
{
  "devDependencies": {
    "@storybook/react": "^8.6.14",
    "@storybook/react-vite": "^8.6.14",
    "@storybook/addon-essentials": "^8.6.14",
    "@storybook/addon-a11y": "^8.6.14",
    "@storybook/addon-interactions": "^8.6.14",
    "storybook": "^8.6.14"
  }
}
```

**Note**: Using Storybook 8.x (not 10.x) because the full addon ecosystem is available and stable for v8.

### 6. Tailwind CSS Integration

If Tailwind styles are needed in Storybook, create `src/styles.css` (if not exists):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Execution Plan (Tasks)

### Phase 1: Installation & Configuration (30 min)

#### Task 1.1: Install Storybook Dependencies

- [ ] Navigate to `packages/design-system`
- [ ] Run `pnpm add -D storybook @storybook/react @storybook/react-vite @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-interactions`
- [ ] Verify installation in `package.json`
- [ ] Note: `@storybook/blocks` is included in essentials addon in v10

#### Task 1.2: Initialize Storybook Configuration

- [ ] Run `pnpm dlx storybook@latest init --builder vite --type react` (this creates base config)
- [ ] Review generated `.storybook/main.ts` and customize per spec
- [ ] Update framework to use `@storybook/react-vite`
- [ ] Add `@storybook/addon-a11y` to addons array
- [ ] Configure `viteFinal` to support Tailwind CSS (postcss config)

#### Task 1.3: Setup Preview Configuration

- [ ] Create `.storybook/preview.tsx`
- [ ] Import `ThemeProvider` from `../src/theme/ThemeProvider`
- [ ] Add global decorator to wrap all stories with ThemeProvider
- [ ] Configure a11y parameters with axe-core rules
- [ ] Add padding decorator for visual spacing

#### Task 1.4: Setup Tailwind CSS Support

- [ ] Check if `src/styles.css` exists with Tailwind directives
- [ ] If not, create it with `@tailwind base; @tailwind components; @tailwind utilities;`
- [ ] Import in `.storybook/preview.tsx`
- [ ] Verify `postcss.config.cjs` exists in package root

#### Task 1.5: Add NPM Scripts

- [ ] Add `"storybook": "storybook dev -p 6006"` to `package.json` scripts
- [ ] Add `"storybook:build": "storybook build"` for static build
- [ ] Add `"storybook:test": "test-storybook"` for future interaction tests

---

### Phase 2: Button Component Stories (45 min)

#### Task 2.1: Create Button Stories File

- [ ] Create `packages/design-system/src/primitives/Button.stories.tsx`
- [ ] Import necessary types from Storybook (`Meta`, `StoryObj`)
- [ ] Import `Button` component and theme types
- [ ] Setup meta configuration with title, component, parameters

#### Task 2.2: Configure Story Controls

- [ ] Add `argTypes` for `intent` (select control with all options)
- [ ] Add `argTypes` for `variant` (select control with all options)
- [ ] Add `argTypes` for `size` (select control with all options)
- [ ] Add `argTypes` for `loading` (boolean control)
- [ ] Add `argTypes` for `disabled` (boolean control)
- [ ] Add descriptions for each control

#### Task 2.3: Create Basic Stories

- [ ] Create `Primary` story with default args
- [ ] Create `Interactive` story with all controls enabled
- [ ] Add tags: `['autodocs']` for automatic documentation

#### Task 2.4: Create Visual Showcase Stories

- [ ] Create `AllIntents` story showcasing all intent variants in a row
- [ ] Create `AllVariants` story showcasing all style variants
- [ ] Create `AllSizes` story showcasing all size options
- [ ] Create `States` story showing normal, loading, disabled states
- [ ] Create `LongText` story to test text overflow handling

#### Task 2.5: Create Accessibility Test Stories

- [ ] Create `AccessibilityTest` story with:
  - Button with `aria-label`
  - Disabled button with descriptive `title`
  - Small button to verify minimum touch target (44px)
- [ ] Add story-specific a11y configuration to enable all rules
- [ ] Add documentation describing what to look for in a11y panel

#### Task 2.6: Create Advanced Stories

- [ ] Create `WithIcon` story demonstrating icon + text combinations
- [ ] Add MDX documentation blocks if needed (optional for v1)

---

### Phase 3: Testing & Verification (30 min)

#### Task 3.1: Start Storybook Development Server

- [ ] Run `pnpm storybook` from design-system directory
- [ ] Verify Storybook opens at `http://localhost:6006`
- [ ] Verify Button stories appear in sidebar under "Primitives/Button"
- [ ] Check console for any errors or warnings

#### Task 3.2: Test Visual Rendering

- [ ] Navigate through all Button stories
- [ ] Verify all intents render with correct colors
- [ ] Verify all variants render correctly (solid, outline, ghost, subtle)
- [ ] Verify all sizes meet minimum touch targets
- [ ] Test loading state shows "Loading..." text
- [ ] Test disabled state has reduced opacity and no hover effect

#### Task 3.3: Test Interactive Controls

- [ ] Open "Interactive" story
- [ ] Toggle each control (intent, variant, size, loading, disabled)
- [ ] Verify button updates in real-time
- [ ] Verify combinations work correctly (e.g., loading + disabled)

#### Task 3.4: Test Accessibility Panel

- [ ] Open a11y panel (Accessibility tab at bottom)
- [ ] Run accessibility checks on each story
- [ ] Verify "AccessibilityTest" story shows results for:
  - Color contrast checks (should pass)
  - Touch target size checks (should pass for all buttons ≥44px)
  - ARIA labels (should pass for buttons with aria-label)
- [ ] Document any violations found

#### Task 3.5: Test Theme Integration

- [ ] Verify ThemeProvider is wrapping stories (check React DevTools)
- [ ] Verify theme tokens are applied correctly to buttons
- [ ] Test that theme-based colors work for all intents

#### Task 3.6: Test Build Process

- [ ] Run `pnpm storybook:build` from design-system directory
- [ ] Verify static build completes successfully in `storybook-static/`
- [ ] Open `storybook-static/index.html` in browser
- [ ] Verify all stories render correctly in static build
- [ ] Verify a11y addon works in static build

---

### Phase 4: Documentation & Cleanup (20 min)

#### Task 4.1: Add README Documentation

- [ ] Create or update `packages/design-system/README.md`
- [ ] Add "Storybook" section with:
  - How to run Storybook locally (`pnpm storybook`)
  - How to build static version (`pnpm storybook:build`)
  - How to use a11y panel for accessibility testing
  - Link to Storybook best practices

#### Task 4.2: Add .gitignore Entries

- [ ] Add `storybook-static/` to `.gitignore` (if not present)
- [ ] Verify `.storybook` folder is committed

#### Task 4.3: Update Turbo Configuration (Optional)

- [ ] Add `storybook:build` task to `turbo.json` if needed for CI/CD
- [ ] Configure caching for Storybook builds

#### Task 4.4: Document Findings

- [ ] Create a summary of a11y issues found (if any)
- [ ] List any component improvements needed (for spec 005)
- [ ] Document any theme inconsistencies discovered
- [ ] Note any missing ARIA attributes

#### Task 4.5: Verify Monorepo Integration

- [ ] Test running Storybook from root: `pnpm --filter @nevo/design-system storybook`
- [ ] Verify Turbo can handle Storybook as a dev task
- [ ] Confirm build works in CI environment (if CI is setup)

---

## Success Criteria

- [ ] Storybook runs successfully on `http://localhost:6006`
- [ ] Button stories showcase all props (intent, variant, size, loading, disabled)
- [ ] a11y addon is active and shows accessibility reports
- [ ] All Button stories pass accessibility checks (or violations are documented)
- [ ] Interactive controls work for all Button props
- [ ] Theme integration works (ThemeProvider wraps stories)
- [ ] Static build completes without errors
- [ ] Documentation is updated with Storybook usage instructions

---

## Future Enhancements (Not in Scope)

- [ ] Visual regression testing with Chromatic
- [ ] Interaction testing with `@storybook/test` addon
- [ ] Stories for all design-system components (Alert, Table, Input, etc.)
- [ ] Dark mode toggle in Storybook toolbar
- [ ] Custom Storybook theme matching brand colors
- [ ] MSW addon integration for API-dependent components
- [ ] Playwright component testing integration

---

## Notes

### Accessibility Testing with a11y Addon

The `@storybook/addon-a11y` runs axe-core accessibility checks on each story. Key things to verify:

1. **Color Contrast**: Text vs background meets WCAG AA standards (4.5:1)
2. **Touch Targets**: Interactive elements ≥44px (mobile) or ≥24px (desktop)
3. **Keyboard Navigation**: Buttons are focusable and activatable via keyboard
4. **ARIA Labels**: Buttons with icons-only should have `aria-label`
5. **Disabled State**: Disabled buttons should not be keyboard-focusable

### Known Potential Issues

Based on the Button component code:

1. **Minimum Touch Target**: SIZE_CLASSES already define `min-h-[44px]` for sm/md, which is good ✅
2. **Color Contrast**: Theme tokens should be verified for WCAG compliance
3. **Loading State**: "Loading..." text is good, but could use an ARIA live region
4. **Disabled + Loading**: Currently both disabled and loading set disabled attribute, which is correct

### Testing Strategy

- **Visual Testing**: Manual verification in Storybook
- **Accessibility Testing**: Automated via a11y addon
- **Unit Testing**: Keep existing Jest tests for logic (don't duplicate)
- **Interaction Testing**: Future enhancement with Storybook interactions

---

## Related Specifications

- **005-design-system-test-cleanup.md**: Will address issues found via Storybook/a11y
- **004-api-mocks-testing-integration.md**: Will add MSW support for complex components

---

## References

- [Storybook 8 Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook a11y Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
