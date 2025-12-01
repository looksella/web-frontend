import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
});

// Agrega el token automáticamente en cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post('/login', data),
  register: (data) => api.post('/register', data),
};

export const productsAPI = {
  getAll: (page = 1) => api.get(`/store-products?page=${page}`),
  getById: (id) => api.get(`/store-products/${id}`),
};

export default api;
