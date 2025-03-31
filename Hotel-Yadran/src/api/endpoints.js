// Definición de endpoints para la API

export const API_BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
  rooms: {
    getAll: `${API_BASE_URL}/rooms`,
    getById: (id) => `${API_BASE_URL}/rooms/${id}`,
  },
  bookings: {
    getAll: `${API_BASE_URL}/bookings`,
    getById: (id) => `${API_BASE_URL}/bookings/${id}`,
    create: `${API_BASE_URL}/bookings`,
  },
  users: {
    getAll: `${API_BASE_URL}/users`,
    getById: (id) => `${API_BASE_URL}/users/${id}`,
  }
};