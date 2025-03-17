import axios from 'axios';

// URL de base de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Création d'une instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT si présent
api.interceptors.request.use(
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

// Fonctions génériques pour les opérations CRUD
const apiService = {
  // Récupérer tous les éléments d'un endpoint
  getAll: async (endpoint) => {
    try {
      const response = await api.get(`/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des données depuis ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Récupérer un élément par son ID
  getById: async (endpoint, id) => {
    try {
      const response = await api.get(`/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'élément #${id} depuis ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Créer un nouvel élément
  create: async (endpoint, data) => {
    try {
      const response = await api.post(`/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la création d'un élément dans ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Mettre à jour un élément existant
  update: async (endpoint, id, data) => {
    try {
      const response = await api.put(`/${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'élément #${id} dans ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Supprimer un élément
  delete: async (endpoint, id) => {
    try {
      const response = await api.delete(`/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'élément #${id} dans ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiService;