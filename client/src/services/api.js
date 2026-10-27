import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach bearer token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Capture unauthorized (401) responses to auto-logout the user
api.interceptors.response.use(
  (response) => {
    // If an API request receives HTML (common when SPA routing fallback kicks in due to missing backend), reject cleanly
    if (
      typeof response.data === 'string' &&
      (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))
    ) {
      return Promise.reject(
        new Error(
          'API endpoint returned HTML instead of JSON. Backend might be unreachable or VITE_API_URL is misconfigured.'
        )
      );
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      // Emit a global event to let AuthContext know it needs to clean state
      window.dispatchEvent(new Event('auth-logout'));
    }
    return Promise.reject(error);
  }
);

export default api;
