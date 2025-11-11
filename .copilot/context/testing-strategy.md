# Testing Strategy

This document outlines the comprehensive testing strategy for the Nevo UI monorepo.

## Testing Philosophy

### Goals

1. **Confidence**: Tests should give confidence that code works as expected
2. **Fast Feedback**: Tests should run quickly to enable rapid iteration
3. **Maintainability**: Tests should be easy to understand and update
4. **Coverage**: Critical paths and edge cases must be tested

### Test Pyramid

```
       /\
      /  \     E2E Tests (Playwright)
     /____\    Integration Tests (Storybook + Play functions)
    /      \
   /        \  Component Tests (Vitest + Testing Library)
  /__________\ Unit Tests (Vitest)
```

## Test Types

### 1. Unit Tests

**Purpose**: Test individual functions and utilities in isolation

**Tools**: Vitest

**Location**: Co-located with source files (`*.test.ts`)

**Example**:

```tsx
// utils.test.ts
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("base", "additional")).toBe("base additional");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", true && "visible")).toBe(
      "base visible"
    );
  });

  it("deduplicates conflicting Tailwind classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
});
```

### 2. Component Tests

**Purpose**: Test React components in isolation

**Tools**: Vitest + React Testing Library

**Location**: `ComponentName.test.tsx`

**Example**:

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant styles", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass("bg-primary-500");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

### 3. Integration Tests

**Purpose**: Test component interactions and workflows

**Tools**: Storybook Play Functions + Testing Library

**Location**: `*.stories.tsx`

**Example**:

```tsx
// Modal.stories.tsx
import { userEvent, within, expect } from "@storybook/test";

export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click button to open modal
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    // Modal should be visible
    const modal = canvas.getByRole("dialog");
    expect(modal).toBeVisible();

    // Close modal
    const closeButton = within(modal).getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Modal should be hidden
    expect(modal).not.toBeVisible();
  },
};
```

### 4. E2E Tests

**Purpose**: Test complete user workflows in the admin application

**Tools**: Playwright

**Location**: `apps/admin/e2e/tests/`

**Example**:

```tsx
// products.spec.ts
import { test, expect } from "../fixtures/test";

test("user can create a product", async ({ page }) => {
  await page.goto("/products");

  // Click new product button
  await page.getByRole("button", { name: /new product/i }).click();

  // Fill form
  await page.getByLabel(/name/i).fill("Premium Widget");
  await page.getByLabel(/price/i).fill("29.99");

  // Submit
  await page.getByRole("button", { name: /save/i }).click();

  // Verify success
  await expect(page.getByText(/product created/i)).toBeVisible();
  await expect(
    page.getByRole("row", { name: /premium widget/i })
  ).toBeVisible();
});
```

## Design System Testing

### Component Checklist

Every design system component should have:

- [ ] **Unit tests** for utilities and helpers
- [ ] **Component tests** for:
  - Rendering with different props
  - All variants
  - All sizes
  - Event handlers
  - Ref forwarding
  - className merging
  - Keyboard interactions
  - Edge cases

- [ ] **Storybook stories** showing:
  - Default state
  - All variants
  - All sizes
  - Interactive states
  - Composition examples
  - Real-world usage

- [ ] **Accessibility tests**:
  - ARIA attributes
  - Keyboard navigation
  - Screen reader compatibility
  - Focus management

### Test Structure

```tsx
describe("ComponentName", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {});
    it("renders with all variants", () => {});
    it("renders with all sizes", () => {});
  });

  describe("Props", () => {
    it("applies custom className", () => {});
    it("forwards ref correctly", () => {});
    it("spreads additional props", () => {});
  });

  describe("Interactions", () => {
    it("handles click events", () => {});
    it("handles keyboard events", () => {});
    it("handles state changes", () => {});
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {});
    it("supports keyboard navigation", () => {});
    it("manages focus correctly", () => {});
  });

  describe("Edge Cases", () => {
    it("handles missing props", () => {});
    it("handles empty children", () => {});
    it("handles disabled state", () => {});
  });
});
```

### Testing Hooks

For custom hooks:

```tsx
// useToggle.test.ts
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("initializes with default value", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it("toggles value", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
```

## Admin App Testing

### Feature Testing Pattern

```tsx
// features/products/products.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Products } from "./Products";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Products Feature", () => {
  it("displays product list", async () => {
    render(<Products />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/premium widget/i)).toBeInTheDocument();
    });
  });

  it("creates new product", async () => {
    render(<Products />, { wrapper: createWrapper() });

    await userEvent.click(screen.getByRole("button", { name: /new/i }));
    await userEvent.type(screen.getByLabelText(/name/i), "New Product");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/product created/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Test Organization

```
e2e/
├── fixtures/
│   ├── test.ts          # Custom fixtures
│   └── msw.ts           # MSW setup
├── tests/
│   ├── products.spec.ts
│   ├── auth.spec.ts
│   └── navigation.spec.ts
└── playwright.config.ts
```

## MSW (Mock Service Worker)

### Purpose

Mock API responses for consistent testing without backend dependency.

### Setup

```tsx
// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json([
      { id: 1, name: "Product 1", price: 29.99 },
      { id: 2, name: "Product 2", price: 39.99 },
    ]);
  }),

  http.post("/api/products", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
];
```

### Usage in Tests

```tsx
import { setupServer } from "msw/node";
import { handlers } from "@nevo-ui/api-mocks";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Usage in Storybook

```tsx
// .storybook/preview.tsx
import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "@nevo-ui/api-mocks/storybook";

initialize();

export default {
  loaders: [mswLoader],
  parameters: {
    msw: { handlers },
  },
};
```

## Test Utilities

### Custom Render

```tsx
// test-utils.tsx
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};
```

### Custom Matchers

```tsx
// jest.setup.ts
import "@testing-library/jest-dom";

expect.extend({
  toHaveAccessibleName(element: HTMLElement, expected: string) {
    const name = element.getAttribute("aria-label") || element.textContent;

    return {
      pass: name === expected,
      message: () =>
        `Expected element to have accessible name "${expected}", got "${name}"`,
    };
  },
});
```

## Coverage Requirements

### Minimum Coverage

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Coverage Configuration

```js
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.stories.tsx",
        "**/*.test.tsx",
        "**/types.ts",
        "**/*.d.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test Button.test.tsx

# Run E2E tests
pnpm --filter admin e2e

# Run E2E tests with UI
pnpm --filter admin e2e:ui
```

### CI Integration

Tests run automatically on:

- Pull requests
- Commits to main branch
- Before deployment

## Best Practices

### DO ✅

1. **Test behavior, not implementation**

   ```tsx
   // ✅ Good
   expect(screen.getByRole("button")).toBeEnabled();

   // ❌ Bad
   expect(button.props.disabled).toBe(false);
   ```

2. **Use semantic queries**

   ```tsx
   // ✅ Good
   screen.getByRole("button", { name: /submit/i });
   screen.getByLabelText(/email/i);

   // ❌ Bad
   screen.getByTestId("submit-button");
   container.querySelector(".button");
   ```

3. **Test user interactions**

   ```tsx
   // ✅ Good
   await userEvent.click(button);
   await userEvent.type(input, "text");

   // ❌ Bad
   fireEvent.click(button);
   input.value = "text";
   ```

4. **Wait for async changes**

   ```tsx
   // ✅ Good
   await waitFor(() => {
     expect(screen.getByText(/success/i)).toBeInTheDocument();
   });

   // ❌ Bad
   expect(screen.getByText(/success/i)).toBeInTheDocument();
   ```

5. **Keep tests focused**

   ```tsx
   // ✅ Good - one concept per test
   it("renders children", () => {});
   it("handles click events", () => {});

   // ❌ Bad - testing multiple things
   it("renders and handles interactions", () => {});
   ```

### DON'T ❌

1. **Don't test implementation details**
2. **Don't use test IDs unless necessary**
3. **Don't test library code**
4. **Don't duplicate tests**
5. **Don't ignore async warnings**
6. **Don't skip cleanup**
7. **Don't mock unnecessarily**

## Debugging Tests

### Enable Debug Output

```tsx
import { render, screen } from "@testing-library/react";

test("debug example", () => {
  const { debug } = render(<Component />);

  // Print DOM
  debug();

  // Print specific element
  debug(screen.getByRole("button"));
});
```

### Check Queries

```tsx
// See all available queries
screen.logTestingPlaygroundURL();

// See what roles are available
screen.getByRole(""); // Intentional error shows available roles
```

### Playwright Debug

```bash
# Run with headed browser
pnpm --filter admin e2e --headed

# Run with debug mode
pnpm --filter admin e2e --debug

# Generate code
pnpm --filter admin e2e --codegen
```

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [MSW Docs](https://mswjs.io/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
