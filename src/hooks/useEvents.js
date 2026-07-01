import { useState, useEffect } from 'react';
import { getEvents } from '../api/eventApi';
import { normalizeEvent } from '../utils/helpers';

export default function useEvents(params = {}) {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchEvents = () => {
    setLoading(true); setError(null);
    getEvents(params)
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.events || []);
        setEvents(list.map((e, i) => normalizeEvent(e, i)));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(fetchEvents, [JSON.stringify(params)]);

  return { events, loading, error, refetch: fetchEvents };
}
