import axios from 'axios';
import { envConfig } from '@/shared/config/env';

export type ApiFieldError = {
  path: string[];
  message: string;
};

type ApiErrorBody = {
  message?: string | string[];
  error?: string;
  errors?: ApiFieldError[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly fieldErrors: ApiFieldError[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const axiosClient = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function toApiError(error: unknown): ApiError {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return new ApiError('Не удалось выполнить запрос');
  }

  const status = error.response?.status;
  const body = error.response?.data;
  const message = Array.isArray(body?.message)
    ? body.message.join(', ')
    : (body?.message ?? body?.error ?? error.message);

  return new ApiError(message, status, body?.errors ?? []);
}

async function request<T>(execute: () => Promise<{ data: T }>): Promise<T> {
  try {
    const response = await execute();
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const apiClient = {
  get<T>(url: string, params?: unknown): Promise<T> {
    return request(() => axiosClient.get<T>(url, { params }));
  },

  post<T>(url: string, data: unknown): Promise<T> {
    return request(() => axiosClient.post<T>(url, data));
  },

  put<T>(url: string, data: unknown): Promise<T> {
    return request(() => axiosClient.put<T>(url, data));
  },

  delete(url: string, data?: unknown): Promise<void> {
    return request(() => axiosClient.delete<void>(url, { data }));
  },
};
