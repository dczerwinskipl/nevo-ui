import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export interface ApiClientConfig extends CreateAxiosDefaults {
  baseURL: string;
}
export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
    ...config
  });

  // Request interceptor for authentication
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Auth token can be added here by the consuming application
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

    // No response interceptor - preserve full Axios response structure {data, status, headers}

  return client;
}