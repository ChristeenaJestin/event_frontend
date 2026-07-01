import axiosInstance from '../services/axiosInstance';

// GET /api/events  — public, no auth needed
export const getEvents = (params) =>
  axiosInstance.get('/events', { params }).then((r) => r.data);

// GET /api/events/:id
export const getEventById = (id) =>
  axiosInstance.get(`/events/${id}`).then((r) => r.data);

// POST /api/events  (organizer/admin/superadmin only)
// body uses snake_case to match backend: title, description, venue,
//   start_date, end_date, max_participants, registration_deadline, banner_url, status
export const createEvent = (payload) =>
  axiosInstance.post('/events', payload).then((r) => r.data);

// PUT /api/events/:id
export const updateEvent = (id, payload) =>
  axiosInstance.put(`/events/${id}`, payload).then((r) => r.data);

// DELETE /api/events/:id
export const deleteEvent = (id) =>
  axiosInstance.delete(`/events/${id}`).then((r) => r.data);

// GET /api/events  filtered to current user's own events
// (if backend has a /events/mine route use it; otherwise filter by created_by client-side)
export const getMyEvents = () =>
  axiosInstance.get('/events', { params: { mine: true } }).then((r) => r.data);
