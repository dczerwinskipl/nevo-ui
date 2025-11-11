import { HttpResponse } from "msw";
import { getCurrentScenario, simulateDelay } from "./scenarios";
import { generateErrorResponse } from "./errors";

/**
 * Higher-order function that wraps MSW handlers with scenario-based behavior.
 *
 * Automatically intercepts requests and returns appropriate responses based on
 * the active scenario. For 'success' and 'empty' scenarios, the original handler
 * is called. For error scenarios, predefined error responses are returned.
 *
 * @template T - The argument types of the handler function
 * @param handler - MSW request handler function to wrap
 * @returns Wrapped handler that respects the active scenario
 *
 * @example
 * ```typescript
 * import { http, HttpResponse } from 'msw';
 * import { withScenarios } from '@nevo/api-mocks';
 *
 * export const handlers = [
 *   http.get('/api/products', withScenarios(async ({ request, params }) => {
 *     return HttpResponse.json([
 *       { id: 1, name: 'Product 1' },
 *       { id: 2, name: 'Product 2' }
 *     ]);
 *   }))
 * ];
 * ```
 *
 * @remarks
 * Scenario behaviors:
 * - `success`: 300ms delay, calls original handler
 * - `empty`: 300ms delay, calls original handler (handler should return empty data)
 * - `loading-slow`: 3000ms delay, calls original handler
 * - `rate-limit`: Returns HTTP 429 with Retry-After header
 * - `server-error`: Returns HTTP 500 after 500ms delay
 * - `validation-error`: Returns HTTP 422 with sample validation errors
 * - `network-error`: Returns network connection failure
 */
export function withScenarios<T extends any[]>(
  handler: (...args: T) => Promise<HttpResponse>
) {
  return async (...args: T): Promise<HttpResponse> => {
    const scenario = getCurrentScenario();

    // Handle common scenarios
    switch (scenario) {
      case "server-error":
        await simulateDelay(500);
        return HttpResponse.json(
          generateErrorResponse("INTERNAL_ERROR", "Internal server error"),
          { status: 500 }
        );

      case "rate-limit":
        return HttpResponse.json(
          generateErrorResponse("RATE_LIMIT", "Too many requests"),
          { status: 429, headers: { "Retry-After": "60" } }
        );

      case "loading-slow":
        await simulateDelay(3000);
        break; // Continue to handler

      case "network-error":
        return HttpResponse.error();

      case "validation-error":
        await simulateDelay(200);
        return HttpResponse.json(
          generateErrorResponse("VALIDATION_ERROR", "Validation failed", {
            name: ["Name is required"],
            price: ["Price must be a positive number"],
          }),
          { status: 422 }
        );

      default:
        await simulateDelay(300);
        break; // Continue to handler
    }

    // Execute the actual handler
    return handler(...args);
  };
}
