export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: any): never {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    throw new ApiError(
      data?.error?.message || 'An error occurred',
      status,
      data?.error?.code,
      data?.error?.details
    );
  } else if (error.request) {
    // Network error
    throw new ApiError('Network error occurred');
  } else {
    // Other error
    throw new ApiError(error.message || 'Unknown error occurred');
  }
}