import axiosInstance from "../services/axiosInstance";

// Register current user
export const rsvpToEvent = async (eventId) => {
  const res = await axiosInstance.post(`/events/${eventId}/register`);
  return res.data.data;
};

// Get participants
export const getParticipants = async (eventId) => {
  const res = await axiosInstance.get(`/events/${eventId}/participants`);
  return res.data.data;
};