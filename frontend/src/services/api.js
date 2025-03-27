import axios from 'axios';

// Configuration de base pour axios
const API = axios.create({
  baseURL: 'http://10.27.20.200:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter le token d'authentification si nécessaire
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services pour chaque entité
export const clientsService = {
  getAll: () => API.get('/clients'),
  getById: (id) => API.get(`/clients/${id}`),
  create: (data) => API.post('/clients', data),
  update: (id, data) => API.put(`/clients/${id}`, data),
  delete: (id) => API.delete(`/clients/${id}`)
};

export const commandesService = {
  getAll: () => API.get('/commandes'),
  getById: (id) => API.get(`/commandes/${id}`),
  create: (data) => API.post('/commandes', data),
  update: (id, data) => API.put(`/commandes/${id}`, data),
  delete: (id) => API.delete(`/commandes/${id}`)
};

// Répétez pour chaque entité (articles, fournisseurs, factures, etc.)
export const articlesService = {
  getAll: () => API.get('/articles'),
  getById: (id) => API.get(`/articles/${id}`),
  create: (data) => API.post('/articles', data),
  update: (id, data) => API.put(`/articles/${id}`, data),
  delete: (id) => API.delete(`/articles/${id}`)
};

// Vous pouvez créer des méthodes spécifiques pour des besoins particuliers
export const authService = {
  login: (credentials) => API.post('/auth/login', credentials),
  logout: () => API.post('/auth/logout'),
  getCurrentUser: () => API.get('/auth/me')
};

export default API;