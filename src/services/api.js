import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

// Instancia principal usada por la app. Añade Authorization si existe `access_token`.
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Instancia sin interceptores para llamadas de refresh (evita loops)
const plainApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Leer access token de localStorage
const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Agrega el access token automáticamente en cada petición si existe
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let refreshCall = null;

// Manejo simple de 401 -> intentar refresh una vez
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // No hay refresh token: limpiar y reenviar al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshCall = plainApi.post('/refresh', null, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
        }

        const { data } = await refreshCall;
        // Guardar nuevos tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Reintentar la petición original con nuevo token
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (e) {
        // Refresh falló: limpiar y redirect a login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
        refreshCall = null;
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/login', data),
  register: (data) => api.post('/register', data),
  me: () => api.get('/me'),
  logout: () => api.post('/logout'),
  // refresh usado internamente por el interceptor cuando sea necesario
  refresh: (refreshToken) => plainApi.post('/refresh', null, { headers: { Authorization: `Bearer ${refreshToken}` } }),
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