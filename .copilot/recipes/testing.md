# Recipe: Writing Tests

This recipe provides practical guidance for writing effective tests in the Nevo UI monorepo.

## Quick Start

### 1. Component Test Template

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders children correctly', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(
      <ComponentName variant="primary">Content</ComponentName>
    );
    expect(container.firstChild).toHaveClass('expected-variant-class');
  });

  it('handles click events', async () => {
    const onClick = jest.fn();
    render(<ComponentName onClick={onClick}>Click me</ComponentName>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ComponentName ref={ref}>Content</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges className prop', () => {
    const { container } = render(
      <ComponentName className="custom-class">Content</ComponentName>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### 2. Run Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test Button.test.tsx

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

## Testing Patterns

### Testing Component Rendering

```tsx
describe('Button rendering', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with icon', () => {
    render(
      <Button>
        <PlusIcon />
        Add Item
      </Button>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    // Icon is decorative, text is what matters
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing Props and Variants

```tsx
describe('Button variants', () => {
  it('applies default variant', () => {
    const { container } = render(<Button>Default</Button>);
    expect(container.firstChild).toHaveClass('expected-default-class');
  });

  it('applies primary variant', () => {
    const { container } = render(
      <Button variant="primary">Primary</Button>
    );
    expect(container.firstChild).toHaveClass('bg-primary-500');
  });

  it.each([
    ['primary', 'bg-primary-500'],
    ['secondary', 'bg-background-secondary'],
    ['outline', 'border-border-primary'],
  ])('applies %s variant with class %s', (variant, expectedClass) => {
    const { container } = render(
      <Button variant={variant as any}>Button</Button>
    );
    expect(container.firstChild).toHaveClass(expectedClass);
  });
});
```

### Testing User Interactions

```tsx
describe('Button interactions', () => {
  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('handles keyboard activation', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Forms

```tsx
describe('LoginForm', () => {
  it('submits with valid data', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    // Fill form
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      'password123'
    );
    
    // Submit
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Verify
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });

  it('shows validation errors', async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    // Submit without filling
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check errors
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('disables submit during submission', async () => {
    const onSubmit = jest.fn(() => new Promise(resolve => 
      setTimeout(resolve, 100)
    ));
    
    render(<LoginForm onSubmit={onSubmit} />);
    
    // Fill and submit
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(submitButton);
    
    // Should be disabled during submission
    expect(submitButton).toBeDisabled();
  });
});
```

### Testing Async Components

```tsx
describe('ProductList', () => {
  it('displays loading state', () => {
    render(<ProductList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays products after loading', async () => {
    render(<ProductList />);
    
    // Wait for products to appear
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
    
    // Loading should be gone
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('displays error state', async () => {
    // Mock API error
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.json({ error: 'Failed' }, { status: 500 });
      })
    );
    
    render(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

### Testing with React Query

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('ProductsPage', () => {
  it('fetches and displays products', async () => {
    renderWithQueryClient(<ProductsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
```

### Testing Hooks

```tsx
import { renderHook, act } from '@testing-library/react';

describe('useToggle', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it('toggles value when called', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1](); // toggle function
    });
    
    expect(result.current[0]).toBe(true);
  });

  it('sets specific value', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[2](true); // setValue function
    });
    
    expect(result.current[0]).toBe(true);
  });
});
```

### Testing Accessibility

```tsx
describe('Modal accessibility', () => {
  it('traps focus within modal', async () => {
    render(<Modal isOpen={true} onClose={jest.fn()}>Content</Modal>);
    
    const modal = screen.getByRole('dialog');
    const firstButton = within(modal).getAllByRole('button')[0];
    const lastButton = within(modal).getAllByRole('button').slice(-1)[0];
    
    // Focus first element
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);
    
    // Tab should cycle back
    await userEvent.tab();
    // ... test focus cycling
  });

  it('has correct ARIA attributes', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} aria-labelledby="title">
        <h2 id="title">Modal Title</h2>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', 'title');
  });

  it('closes on Escape key', async () => {
    const onClose = jest.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);
    
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
```

## Querying Elements

### Priority Order

Use queries in this priority order (most preferred first):

1. **Accessible to everyone**
   ```tsx
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email/i)
   screen.getByPlaceholderText(/search/i)
   screen.getByText(/hello world/i)
   screen.getByDisplayValue(/current value/i)
   ```

2. **Semantic queries**
   ```tsx
   screen.getByAltText(/profile picture/i)
   screen.getByTitle(/close/i)
   ```

3. **Test IDs (last resort)**
   ```tsx
   screen.getByTestId('custom-element')
   ```

### Query Variants

```tsx
// getBy - throws error if not found
screen.getByRole('button')

// queryBy - returns null if not found
screen.queryByRole('button')

// findBy - async, waits for element
await screen.findByRole('button')

// getAllBy - returns array, throws if none found
screen.getAllByRole('button')

// queryAllBy - returns empty array if none found
screen.queryAllByRole('button')

// findAllBy - async array query
await screen.findAllByRole('button')
```

### Within Queries

```tsx
const modal = screen.getByRole('dialog');
const closeButton = within(modal).getByRole('button', { name: /close/i });
```

## Assertions

### Common Matchers

```tsx
// Presence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibility
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// State
expect(button).toBeEnabled()
expect(button).toBeDisabled()
expect(checkbox).toBeChecked()
expect(input).toHaveFocus()

// Content
expect(element).toHaveTextContent('text')
expect(input).toHaveValue('value')
expect(element).toHaveAttribute('aria-label', 'label')

// Class/Style
expect(element).toHaveClass('class-name')
expect(element).toHaveStyle({ color: 'red' })
```

### Custom Matchers

```tsx
// Define in jest.setup.ts
expect.extend({
  toHaveAccessibleName(element: HTMLElement, expected: string) {
    const name = element.getAttribute('aria-label') || element.textContent;
    return {
      pass: name === expected,
      message: () => `Expected accessible name "${expected}", got "${name}"`,
    };
  },
});

// Use in tests
expect(button).toHaveAccessibleName('Submit form');
```

## Mocking

### MSW (Mock Service Worker)

```tsx
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Override for specific test
test('handles error', async () => {
  server.use(
    http.get('/api/products', () => {
      return HttpResponse.json({ error: 'Failed' }, { status: 500 });
    })
  );
  
  // ... test error handling
});
```

### Mock Functions

```tsx
// Create mock
const mockFn = jest.fn();

// With return value
const mockFn = jest.fn(() => 'return value');

// With implementation
const mockFn = jest.fn((arg) => arg * 2);

// Mock promise
const mockFn = jest.fn(() => Promise.resolve('value'));

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg');
```

### Mock Modules

```tsx
// Mock entire module
jest.mock('module-name');

// Mock with implementation
jest.mock('module-name', () => ({
  functionName: jest.fn(() => 'mocked'),
}));

// Mock specific export
jest.mock('module-name', () => ({
  ...jest.requireActual('module-name'),
  specificFunction: jest.fn(),
}));
```

## Common Patterns

### Setup and Teardown

```tsx
describe('Component', () => {
  let mockFn: jest.Mock;

  beforeEach(() => {
    mockFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('test case', () => {
    // ...
  });
});
```

### Test Each Pattern

```tsx
describe('Button sizes', () => {
  it.each([
    ['sm', 'px-2 py-1'],
    ['md', 'px-4 py-2'],
    ['lg', 'px-6 py-3'],
  ])('applies %s size with classes %s', (size, expectedClasses) => {
    const { container } = render(
      <Button size={size as any}>Button</Button>
    );
    expect(container.firstChild).toHaveClass(expectedClasses);
  });
});
```

### Snapshot Testing (use sparingly)

```tsx
it('matches snapshot', () => {
  const { container } = render(<Component />);
  expect(container.firstChild).toMatchSnapshot();
});
```

## Debugging

### Debug Output

```tsx
import { render, screen } from '@testing-library/react';

test('debug example', () => {
  const { debug } = render(<Component />);
  
  // Print entire DOM
  debug();
  
  // Print specific element
  debug(screen.getByRole('button'));
});
```

### Log Available Queries

```tsx
// Shows all available queries
screen.logTestingPlaygroundURL();

// Intentional error shows available roles
screen.getByRole('');
```

### Check What Rendered

```tsx
// Get HTML
const { container } = render(<Component />);
console.log(container.innerHTML);

// Pretty print
console.log(prettyDOM(container));
```

## Best Practices

### ✅ DO

1. Test user behavior, not implementation
2. Use semantic queries (getByRole, getByLabelText)
3. Wait for async changes with waitFor/findBy
4. Keep tests focused (one concept per test)
5. Use userEvent over fireEvent
6. Write descriptive test names
7. Test edge cases and error states
8. Mock external dependencies

### ❌ DON'T

1. Don't test implementation details
2. Don't use test IDs unnecessarily
3. Don't ignore async warnings
4. Don't test third-party libraries
5. Don't duplicate tests
6. Don't mock unnecessarily
7. Don't skip cleanup

## Checklist

Before committing:

- [ ] Tests written for new code
- [ ] Tests cover edge cases
- [ ] All tests pass locally
- [ ] No skipped/disabled tests
- [ ] Coverage meets threshold (>80%)
- [ ] No console warnings
- [ ] Tests use semantic queries
- [ ] Async operations properly awaited
- [ ] Mocks properly set up and cleaned up

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [userEvent API](https://testing-library.com/docs/user-event/intro)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Strategy](../context/testing-strategy.md)
