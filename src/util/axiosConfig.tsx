import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

const excludePaths = ['/login', '/register', '/status', '/health'];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    const shouldSkipToken = excludePaths.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (token && !shouldSkipToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        toast('Server error. Please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;