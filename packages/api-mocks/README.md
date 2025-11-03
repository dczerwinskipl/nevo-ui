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
