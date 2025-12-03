import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
  },
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
  me: () => api.get('/me'),
  logout: () => api.post('/logout'), 
};

export const productsAPI = {
  getAll: (page = 1) => api.get(`/products?page=${page}`),
  getBest: () => api.get('/products/best'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  
  // Para reviews
  createReview: (productId, data) => api.post(`/products/${productId}/reviews`, data),
  updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default api;