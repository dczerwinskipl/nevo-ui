# Testing Guidelines

> **Note:** This file is part of `.copilot` context. All testing guidelines should be maintained here, not in package-level documentation.

## General Principles

### 1. Locale-Agnostic Testing ⭐

**Problem:** Tests should not assume a specific locale (e.g., date formats, numbers, currencies).

**❌ Bad:**

```typescript
// Assumes US date format (M/D/YYYY)
expect(screen.getByText("1/1/2023")).toBeInTheDocument();

// Assumes dot as decimal separator
expect(screen.getByText("1.234,56")).toBeInTheDocument();
```

**✅ Good:**

```typescript
// Use the same formatting method as in the component
const expectedDate = mockData.date.toLocaleDateString();
expect(screen.getByText(expectedDate)).toBeInTheDocument();

// Check pattern, not specific format
expect(screen.getByText(/\d+[.,]\d+/)).toBeInTheDocument();

// Best: test logic, not format
const dateElement = screen.getByTestId("formatted-date");
expect(dateElement).toHaveTextContent(mockData.date.toLocaleDateString());
```

**Why this matters:**

- Tests run in different environments (CI, developer machines)
- Node.js locale may differ from browser locale
- Date/number formatting varies by region
- Hard-coded formats make tests brittle

**When testing formatted values:**

1. Use the same formatter in test as in component
2. Test the data, not the presentation
3. If testing presentation is necessary, use regex patterns
4. Document why locale-specific testing is needed

### 2. Avoid Hard-Coded Locale-Specific Values

If you must test formatting, use the same formatting method as in the component:

**✅ Example:**

```typescript
// In component:
const formattedDate = date.toLocaleDateString();

// In test:
const expectedDate = mockDate.toLocaleDateString();
expect(screen.getByText(expectedDate)).toBeInTheDocument();
```

**For complex formatting:**

```typescript
// If component uses Intl API
const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Test uses same formatter
const expectedDate = formatter.format(mockDate);
expect(screen.getByText(expectedDate)).toBeInTheDocument();
```

### 3. Suppress Benign React Testing Warnings

React 18 introduces many `act()` warnings that don't affect functionality. Filter them in `jest.setup.js`:

**✅ Example:**

```javascript
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render is deprecated") ||
        args[0].includes("Warning: An update to") ||
        args[0].includes("was not wrapped in act(") ||
        args[0].includes("Warning: Encountered two children with the same key"))
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
});
```

### 4. User Event Over FireEvent

Use `@testing-library/user-event` instead of `fireEvent` for more realistic interaction tests:

**❌ Bad:**

```typescript
fireEvent.click(button);
fireEvent.change(input, { target: { value: "test" } });
```

**✅ Good:**

```typescript
const user = userEvent.setup();
await user.click(button);
await user.type(input, "test");
```

**Why `userEvent` is better:**

- Simulates real user behavior (including hover, focus, blur)
- Handles keyboard navigation properly
- Triggers all related events in correct order
- Better for accessibility testing

### 5. Accessibility-First Queries

Prefer queries by role and accessible names:

**❌ Bad:**

```typescript
screen.getByTestId("submit-button");
screen.getByClassName("btn-primary");
```

**✅ Good:**

```typescript
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email address");
```

**Query Priority:**

1. `getByRole` - Accessible to screen readers
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - When no label exists
4. `getByText` - Non-interactive content
5. `getByTestId` - Last resort only

### 6. Test Data Management

**✅ Best Practices:**

- Define mock data at the top of the file
- Use helper functions to render components
- Clear mocks in `afterEach`:

```typescript
const mockData = [
  { id: 1, name: 'Test User', email: 'test@example.com' }
];

function renderComponent(props = {}) {
  const defaultProps = {
    data: mockData,
    ...props,
  };

  return render(
    <ThemeProvider>
      <Component {...defaultProps} />
    </ThemeProvider>
  );
}

afterEach(() => {
  jest.clearAllMocks();
});
```

### 7. Async Operations

Always use `waitFor` or `findBy*` for asynchronous operations:

**✅ Example:**

```typescript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

// Or use findBy (combines getBy + waitFor)
const dialog = await screen.findByRole("dialog");
expect(dialog).toBeInTheDocument();
```

**Common mistakes:**

- Using `getBy*` for async content (will fail immediately)
- Using arbitrary delays (`setTimeout`)
- Not waiting for state updates

### 8. Error States Testing

Test not only happy paths but also error states:

**✅ Example:**

```typescript
it("should handle null/undefined values gracefully", () => {
  const dataWithNulls = [{ id: 1, name: null, email: "test@example.com" }];

  renderComponent({ data: dataWithNulls });
  expect(screen.getByText("test@example.com")).toBeInTheDocument();
});

it("should display error message for invalid input", async () => {
  const user = userEvent.setup();
  renderComponent();

  const input = screen.getByRole("textbox");
  await user.type(input, "invalid");

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
```

### 9. Date and Time Testing

For tests requiring specific dates, use `jest.useFakeTimers()`:

**✅ Example:**

```typescript
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2023-01-01"));
});

afterEach(() => {
  jest.useRealTimers();
});

it("should use current date", () => {
  const currentDate = new Date().toLocaleDateString();
  renderComponent();
  expect(screen.getByText(currentDate)).toBeInTheDocument();
});
```

**Benefits:**

- Consistent test results across runs
- No timezone issues
- Can test time-dependent behavior
- Can advance time with `jest.advanceTimersByTime()`

### 10. Performance Testing

Test performance for large datasets:

**✅ Example:**

```typescript
it("should handle large datasets efficiently", () => {
  const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
  }));

  const { container } = renderComponent({ data: largeDataset });

  // Should render without errors
  expect(container.querySelector("table")).toBeInTheDocument();
});

it("should virtualize long lists", () => {
  const longList = Array.from({ length: 10000 }, (_, i) => i);
  renderComponent({ items: longList });

  // Should only render visible items
  const renderedItems = screen.getAllByRole("listitem");
  expect(renderedItems.length).toBeLessThan(100);
});
```

## Common Patterns

### Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";

it("should toggle value", () => {
  const { result } = renderHook(() => useToggle(false));

  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1](); // toggle
  });

  expect(result.current[0]).toBe(true);
});
```

### Testing Context Providers

```typescript
function renderWithTheme(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
}

it("should use theme context", () => {
  renderWithTheme(<Component />);
  // assertions
});
```

### Testing Component Variants

```typescript
const variants = ["primary", "neutral", "error"] as const;

variants.forEach((variant) => {
  it(`should render ${variant} variant`, () => {
    renderComponent({ variant });
    expect(screen.getByRole("button")).toHaveClass(`variant-${variant}`);
  });
});
```

### Testing Keyboard Navigation

```typescript
it("should support keyboard navigation", async () => {
  const user = userEvent.setup();
  renderComponent();

  const firstItem = screen.getByRole("button", { name: /first/i });
  const secondItem = screen.getByRole("button", { name: /second/i });

  firstItem.focus();
  expect(firstItem).toHaveFocus();

  await user.keyboard("{Tab}");
  expect(secondItem).toHaveFocus();

  await user.keyboard("{Enter}");
  expect(mockOnClick).toHaveBeenCalled();
});
```

## Anti-Patterns

### ❌ Don't: Test Implementation Details

```typescript
// Bad - tests internal state
expect(component.state.isOpen).toBe(true);

// Good - tests user-visible behavior
expect(screen.getByRole("dialog")).toBeVisible();
```

### ❌ Don't: Use Arbitrary Delays

```typescript
// Bad
await new Promise((resolve) => setTimeout(resolve, 1000));

// Good
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

### ❌ Don't: Query By Class Names

```typescript
// Bad
container.querySelector(".my-class");

// Good
screen.getByRole("button", { name: /submit/i });
```

### ❌ Don't: Test Multiple Concerns in One Test

```typescript
// Bad - tests too many things
it("should work correctly", () => {
  renderComponent();
  expect(screen.getByRole("button")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(mockOnClick).toHaveBeenCalled();
  expect(screen.getByText("Success")).toBeInTheDocument();
});

// Good - split into focused tests
it("should render button", () => {
  renderComponent();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

it("should call onClick when clicked", async () => {
  const user = userEvent.setup();
  renderComponent();
  await user.click(screen.getByRole("button"));
  expect(mockOnClick).toHaveBeenCalled();
});

it("should show success message after click", async () => {
  const user = userEvent.setup();
  renderComponent();
  await user.click(screen.getByRole("button"));
  expect(await screen.findByText("Success")).toBeInTheDocument();
});
```

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [React Testing Best Practices](https://github.com/testing-library/react-testing-library#guiding-principles)
- [User Event vs FireEvent](https://testing-library.com/docs/user-event/intro#differences-from-fireevent)

## Maintenance

**Important:** All testing guidelines should be maintained in this file (`.copilot/context/testing-guidelines.md`), not in package-level documentation. Package-level testing docs should reference this file.

**When to update this file:**

- New testing patterns emerge
- Common mistakes are identified
- Testing library updates require changes
- Team identifies confusing patterns

**How to update:**

- Follow the same structure (Bad/Good examples)
- Include "Why this matters" for complex guidelines
- Link to relevant resources
- Update recipes if workflow changes
