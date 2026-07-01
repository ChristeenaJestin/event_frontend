import axiosInstance from '../services/axiosInstance';

// GET /api/users/profile
export const getProfile = () =>
  axiosInstance.get('/users/profile').then((r) => r.data);

// PUT /api/users/profile  body: { name, profile_image }
export const updateProfile = (payload) =>
  axiosInstance.put('/users/profile', payload).then((r) => r.data);
