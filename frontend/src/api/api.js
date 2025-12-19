import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to get storage URL
export const getStorageUrl = (path) => {
  if (!path) return '';
  return `${API_BASE_URL}/api/storage/${path}`;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (optional - only for protected routes)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config.url.includes('/user')) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (data) => {
    return apiClient.post('/api/register', data);
  },
  login: async (data) => {
    return apiClient.post('/api/login', data);
  },
  logout: async () => {
    return apiClient.post('/api/logout');
  },
  getUser: async () => {
    return apiClient.get('/api/user');
  },
};

export const productAPI = {
  getAll: () => apiClient.get('/api/products'),
  getOne: (id) => apiClient.get(`/api/products/${id}`),
  create: (data) => {
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    return apiClient.post('/api/products', data, config);
  },
  update: (id, data) => {
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    return apiClient.post(`/api/products/${id}?_method=PUT`, data, config);
  },
  delete: (id) => apiClient.delete(`/api/products/${id}`),
};

export const customerAPI = {
  getAll: () => apiClient.get('/api/customers'),
  getOne: (id) => apiClient.get(`/api/customers/${id}`),
  create: (data) => apiClient.post('/api/customers', data),
  update: (id, data) => apiClient.put(`/api/customers/${id}`, data),
  delete: (id) => apiClient.delete(`/api/customers/${id}`),
};

export const rentalAPI = {
  getAll: () => apiClient.get('/api/rentals'),
  getOne: (id) => apiClient.get(`/api/rentals/${id}`),
  create: (data) => apiClient.post('/api/rentals', data),
  update: (id, data) => apiClient.put(`/api/rentals/${id}`, data),
  delete: (id) => apiClient.delete(`/api/rentals/${id}`),
};

export const paymentAPI = {
  getAll: () => apiClient.get('/api/payments'),
  getOne: (id) => apiClient.get(`/api/payments/${id}`),
  create: (data) => apiClient.post('/api/payments', data),
  update: (id, data) => apiClient.put(`/api/payments/${id}`, data),
  delete: (id) => apiClient.delete(`/api/payments/${id}`),
};

export default apiClient;
