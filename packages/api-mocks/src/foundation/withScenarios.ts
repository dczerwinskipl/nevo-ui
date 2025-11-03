import { HttpResponse } from 'msw';
import { getCurrentScenario, simulateDelay } from './scenarios';
import { generateErrorResponse } from './errors';

export function withScenarios<T extends any[]>(
  handler: (...args: T) => Promise<HttpResponse>
) {
  return async (...args: T): Promise<HttpResponse> => {
    const scenario = getCurrentScenario();
    
    // Handle common scenarios
    switch (scenario) {
      case 'server-error':
        await simulateDelay(500);
        return HttpResponse.json(
          generateErrorResponse('INTERNAL_ERROR', 'Internal server error'),
          { status: 500 }
        );
        
      case 'rate-limit':
        return HttpResponse.json(
          generateErrorResponse('RATE_LIMIT', 'Too many requests'),
          { status: 429, headers: { 'Retry-After': '60' } }
        );
        
      case 'loading-slow':
        await simulateDelay(3000);
        break; // Continue to handler
        
      case 'network-error':
        return HttpResponse.error();
        
      case 'validation-error':
        await simulateDelay(200);
        return HttpResponse.json(
          generateErrorResponse('VALIDATION_ERROR', 'Validation failed', {
            name: ['Name is required'],
            price: ['Price must be a positive number']
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