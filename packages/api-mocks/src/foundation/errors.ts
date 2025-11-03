interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export function generateErrorResponse(
  code: string, 
  message: string, 
  details?: Record<string, string[]>
): ErrorResponse {
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code,
      message
    }
  };
  
  if (details) {
    errorResponse.error.details = details;
  }
  
  return errorResponse;
}

export const commonErrors = {
  serverError: () => generateErrorResponse(
    'INTERNAL_ERROR', 
    'Internal server error'
  ),
  
  rateLimit: () => generateErrorResponse(
    'RATE_LIMIT',
    'Too many requests'
  ),
  
  notFound: (resource: string = 'Resource') => generateErrorResponse(
    'NOT_FOUND',
    `${resource} not found`
  ),
  
  validationError: (details: Record<string, string[]>) => generateErrorResponse(
    'VALIDATION_ERROR',
    'Validation failed',
    details
  ),
  
  unauthorized: () => generateErrorResponse(
    'UNAUTHORIZED',
    'Authentication required'
  ),
  
  forbidden: () => generateErrorResponse(
    'FORBIDDEN', 
    'Access denied'
  )
};