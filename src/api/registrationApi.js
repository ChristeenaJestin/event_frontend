import axiosInstance from '../services/axiosInstance';

// POST /api/events/:id/register
export const rsvpToEvent = (eventId) =>
  axiosInstance.post(`/events/${eventId}/register`).then((r) => r.data);

// GET /api/events/:id/participants  (organizer/admin only)
export const getParticipants = (eventId, params) =>
  axiosInstance.get(`/events/${eventId}/participants`, { params }).then((r) => r.data);

// Export participants as CSV — backend should support ?format=csv or a dedicated endpoint
export const exportParticipantsCSV = (eventId) =>
  axiosInstance
    .get(`/events/${eventId}/participants`, {
      params: { format: 'csv' },
      responseType: 'blob',
    })
    .then((r) => r.data);
