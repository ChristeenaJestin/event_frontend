import axiosInstance from "../services/axiosInstance";

export const getEvents = async () => {
  const res = await axiosInstance.get("/events");
  return res.data.data;
};

export const getEventById = async (id) => {
  const res = await axiosInstance.get(`/events/${id}`);
  return res.data.data;
};

export const createEvent = async (payload) => {
  const res = await axiosInstance.post("/events", payload);
  return res.data.data;
};

export const updateEvent = async (id, payload) => {
  const res = await axiosInstance.put(`/events/${id}`, payload);
  return res.data.data;
};

export const deleteEvent = async (id) => {
  const res = await axiosInstance.delete(`/events/${id}`);
  return res.data;
};

export const getMyEvents = async () => {
  const res = await axiosInstance.get("/events");
  return res.data.data;
};