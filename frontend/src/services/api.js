import axios from 'axios';

// Create axios instance with base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log('API Base URL:', import.meta.env.VITE_API_URL);

// Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============ AUTH API CALLS ============
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// ============ OPPORTUNITY API CALLS ============
export const getOpportunities = () => API.get('/opportunities');
export const getOpportunityById = (id) => API.get(`/opportunities/${id}`);
export const createOpportunity = (data) => API.post('/opportunities', data);
export const updateOpportunity = (id, data) => API.put(`/opportunities/${id}`, data);
export const deleteOpportunity = (id) => API.delete(`/opportunities/${id}`);