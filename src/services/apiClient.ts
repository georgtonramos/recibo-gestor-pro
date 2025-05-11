
import axios from 'axios';

// Change the API URL to a local mock since the remote API isn't accessible
// const API_URL = 'https://apiback.georgton.tech';
const API_URL = '/api'; // This will be intercepted by our mock service

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the authorization token in all requests
apiClient.interceptors.request.use(
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

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error('API error:', error);
    
    if (error.response?.status === 401) {
      // If unauthorized, clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

// Create a mock handler for the API
// This is only for development purposes when the real API isn't accessible
if (process.env.NODE_ENV !== 'production') {
  apiClient.interceptors.request.use(
    async (config) => {
      // Mock the login endpoint
      if (config.url === '/auth/login' && config.method === 'post') {
        const { email, password } = JSON.parse(config.data);
        
        // Check credentials
        if (
          (email === 'admin@exemplo.com' && password === 'admin123') || 
          (email === 'funcionario@exemplo.com' && password === 'func123')
        ) {
          // Simulate successful response
          throw {
            isAxiosError: true,
            response: {
              status: 200,
              data: { 
                token: 'mock-jwt-token-' + Date.now(),
              }
            }
          };
        } else {
          // Simulate failed authentication
          throw {
            isAxiosError: true,
            response: {
              status: 401,
              data: { message: 'Credenciais inválidas' }
            }
          };
        }
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default apiClient;
