import axios from 'axios';
import { envConfig } from '@/shared/config/env';

export const apiClient = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
