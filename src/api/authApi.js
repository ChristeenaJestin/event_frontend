import axiosInstance from '../services/axiosInstance';

// POST /api/auth/register  body: { name, email, password }
// returns: { token, user: { id, name, email, role, profile_image, created_at } }
export const register = (payload) =>
  axiosInstance.post('/auth/register', payload).then((r) => r.data);

// POST /api/auth/login  body: { email, password }
// returns: { token, user }
export const login = (payload) =>
  axiosInstance.post('/auth/login', payload).then((r) => r.data);

// POST /api/auth/logout
export const logout = () =>
  axiosInstance.post('/auth/logout').then((r) => r.data);

// GET /api/users/profile  (used to validate token on app load)
export const getCurrentUser = () =>
  axiosInstance.get('/users/profile').then((r) => r.data.data);