# @nevo/api-mocks

A reusable MSW (Mock Service Worker) foundation package for HTTP-realistic API mocking with scenario management.

## Features

- **Scenario Management**: Switch between different API behaviors (success, error, loading states)
- **HTTP Realistic**: Uses MSW to intercept actual HTTP requests
- **Environment Aware**: Works in browser (development) and Node.js (testing)
- **TypeScript Support**: Full type safety and IntelliSense
- **HOC Pattern**: Reusable `withScenarios` wrapper for MSW handlers

## Installation

```bash
npm install @nevo/api-mocks msw
```

## Quick Start

### 1. Setup MSW in your app

```typescript
// main.ts
import { setupMocks } from "@nevo/api-mocks/browser";

async function enableMocking() {
  if (process.env.NODE_ENV === "development") {
    const { setupMocks } = await import("@nevo/api-mocks/browser");
    const { handlers } = await import("./mocks");

    const mockService = setupMocks();
    mockService.use(...handlers);
    return mockService.start();
  }
}

enableMocking().then(() => {
  // Start your app
});
```

### 2. Create mock handlers

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { withScenarios } from "@nevo/api-mocks";

export const handlers = [
  http.get(
    "/api/users",
    withScenarios(async () => {
      return HttpResponse.json([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ]);
    })
  ),
];
```

## Scenario Management

### Available Scenarios

- `success` - Normal responses with realistic delays (300ms)
- `empty` - Empty result sets
- `loading-slow` - Slow responses (3 seconds)
- `rate-limit` - HTTP 429 rate limiting errors
- `server-error` - HTTP 500 internal server errors
- `validation-error` - HTTP 422 validation errors
- `network-error` - Network connection failures

### Switching Scenarios

```javascript
// Via localStorage (persists across page reloads)
localStorage.setItem("mockScenario", "loading-slow");

// Via global function
window.setMockScenario("server-error");

// Get current scenario
const current = getCurrentScenario(); // 'success' (default)
```

## Storybook Integration

The package provides a decorator and toolbar integration for switching scenarios in Storybook.

### Setup

```typescript
// .storybook/preview.tsx
import { withMockScenario, mockScenarioGlobalTypes } from '@nevo/api-mocks/storybook';

export const decorators = [withMockScenario];
export const globalTypes = mockScenarioGlobalTypes;
```

### Usage

Once configured, you'll see a "Mock Scenario" dropdown in the Storybook toolbar. Select any scenario to test your components with different API states:

- ✅ Success - Normal responses
- ⭕ Empty - Empty data sets
- ⏱️ Slow Loading - 3-second delays
- 🛑 Rate Limit - HTTP 429 errors
- ❌ Server Error - HTTP 500 errors
- ⚠️ Validation Error - HTTP 422 errors
- 🌐 Network Error - Connection failures

The scenario selection persists across page reloads via localStorage.

## Playwright Integration

Playwright helpers make it easy to test different API scenarios in E2E tests.

### Setup

```typescript
import { setScenario, resetScenario } from '@nevo/api-mocks/playwright';

test.beforeEach(async ({ page }) => {
  // Reset to success scenario before each test
  await resetScenario(page);
});
```

### Examples

```typescript
test('handles rate limiting gracefully', async ({ page }) => {
  await setScenario(page, 'rate-limit');
  await page.goto('/products');
  
  await expect(page.getByText(/rate limit/i)).toBeVisible();
});

test('shows loading state for slow responses', async ({ page }) => {
  await setScenario(page, 'loading-slow');
  await page.goto('/products');
  
  await expect(page.getByRole('progressbar')).toBeVisible();
});

test('displays error message on server failure', async ({ page }) => {
  await setScenario(page, 'server-error');
  await page.goto('/products');
  
  await expect(page.getByText(/something went wrong/i)).toBeVisible();
});
```

### Playwright API

- `setScenario(page, scenario)` - Set the active scenario
- `getScenario(page)` - Get the current scenario
- `resetScenario(page)` - Reset to 'success' scenario
- `waitForScenario(page, scenario, waitMs?)` - Set scenario and wait for it to apply
- `listScenarios(page)` - Get all available scenarios

## Programmatic API

The ScenarioManager provides a programmatic API for managing scenarios in your code.

### Basic Usage

```typescript
import { scenarios, getCurrentScenario } from '@nevo/api-mocks';

// Set scenario programmatically
scenarios.set('loading-slow');

// Get current scenario
const current = getCurrentScenario(); // 'loading-slow'

// Reset to default
scenarios.reset();

// Get all available scenarios
const all = scenarios.list();
// ['success', 'empty', 'loading-slow', 'rate-limit', 'server-error', 'validation-error', 'network-error']
```

### Event Subscriptions

Subscribe to scenario changes to update your UI or debug tools:

```typescript
import { scenarios } from '@nevo/api-mocks';

// Subscribe to changes
const unsubscribe = scenarios.subscribe((scenario) => {
  console.log('Scenario changed to:', scenario);
  // Update debug UI, analytics, etc.
});

// Unsubscribe when done
unsubscribe();
```

### Window API (Browser Console)

When running in a browser, global functions are available for debugging:

```javascript
// In browser console
window.setMockScenario('server-error');
window.getMockScenario(); // 'server-error'
window.resetMockScenario();
window.listMockScenarios(); // Array of all scenarios
```

Scenario changes also dispatch a custom event:

```javascript
window.addEventListener('mock-scenario-change', (event) => {
  console.log('Scenario changed:', event.detail);
  // { scenario: 'loading-slow', previous: 'success' }
});
```

## API Reference

### `withScenarios(handler)`

Higher-order component that wraps MSW handlers with scenario management.

```typescript
import { withScenarios } from "@nevo/api-mocks";

const handler = withScenarios(async ({ request, params }) => {
  // Your handler logic
  return HttpResponse.json(data);
});
```

### `setupMocks()` (Browser)

```typescript
import { setupMocks } from "@nevo/api-mocks/browser";

const mockService = setupMocks();
mockService.use(...handlers);
mockService.start();
```

### `setupMocks()` (Node.js)

```typescript
import { setupMocks } from "@nevo/api-mocks/node";

const mockService = setupMocks();
mockService.use(...handlers);
mockService.start();
```

### Error Generators

```typescript
import { generateErrorResponse } from "@nevo/api-mocks";

// Generate standardized error responses
const error = generateErrorResponse("VALIDATION_ERROR", "Invalid input", {
  field: ["This field is required"],
});
```

## Environment Support

- **Browser**: Uses MSW Service Worker for development/preview builds
- **Node.js**: Uses MSW server for testing environments
- **Production**: Automatically disabled, real API calls pass through

## Best Practices

1. **Organize by feature**: Group related handlers in feature directories
2. **Use realistic data**: Generate test data with libraries like Faker.js
3. **Test all scenarios**: Verify your app handles all error states
4. **Keep scenarios simple**: Focus on common API behaviors

## Contributing

This package provides the foundation for API mocking. Extend it by:

1. Adding new scenario types
2. Creating domain-specific error generators
3. Building development tools for scenario switching
