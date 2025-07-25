import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

export const getBooks = (params) => api.get('/books', { params });
export const getBookById = (id) => api.get(`/books/${id}`);
export const addBook = (bookData) => api.post('/books', bookData);

export const addReview = (bookId, reviewData) => api.post(`/books/${bookId}/reviews`, reviewData);
export const getReviewsForBook = (bookId) => api.get(`/books/${bookId}/reviews`);


export default api;
