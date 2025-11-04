export { createApiClient } from './shared/client';
export type { ApiClientConfig } from './shared/client';
export type { ApiResponse, PaginatedResponse, ApiError as ApiErrorType } from './shared/types';
export { ApiError, handleApiError } from './shared/errors';