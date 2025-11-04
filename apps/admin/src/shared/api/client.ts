import { createApiClient } from '@nevo/api-client';

const API_BASE_URLS = {
  development: '/api',
  preview: '/api'
} as const;

function getBaseURL(): string {
  if (typeof window !== 'undefined' && import.meta?.env) {
    if (import.meta.env.DEV) return API_BASE_URLS.development;
    if (import.meta.env.MODE === 'preview') return API_BASE_URLS.preview;
    return API_BASE_URLS.development;
  }
  // Fallback for server-side rendering or non-Vite environments
  return API_BASE_URLS.development;
}

export const apiClient = createApiClient({
  baseURL: getBaseURL()
});