import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { PlusIcon } from '../components/common/Icons';
import * as eventApi from '../api/eventApi';
import { normalizeEvent, formatDate } from '../utils/helpers';

const TABS = ['All', 'Upcoming', 'Draft', 'Past'];

function MyEvents() {
  const navigate = useNavigate();
  const [tab, setTab]         = useState(0);
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true); setError(null);
    // GET /api/events?mine=true  (backend should filter by created_by = current user)
    eventApi.getMyEvents()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.events || []);
        setEvents(list.map((e, i) => normalizeEvent(e, i)));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = events.filter((e) => {
    if (tab === 1) return ['PUBLISHED', 'PENDING'].includes(e.status) && (!e.endDate || new Date(e.endDate) >= now);
    if (tab === 2) return e.status === 'DRAFT';
    if (tab === 3) return e.endDate && new Date(e.endDate) < now;
    return true;
  });

  return (
    <DashboardLayout placeholder="Search your events…">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="eyebrow">Organizer view</div>
          <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>My events</h1>
        </div>
        <Button icon={<PlusIcon />} onClick={() => navigate('/create-event')}>Create event</Button>
      </div>

      <div style={{ display: 'flex', gap: 10, margin: '26px 0 0', borderBottom: '1px solid var(--hairline)', fontSize: 14 }}>
        {TABS.map((t, i) => (
          <span key={t} onClick={() => setTab(i)} style={i === tab
            ? { color: 'var(--ink)', fontWeight: 600, borderBottom: '2px solid var(--coral)', paddingBottom: 14, cursor: 'pointer' }
            : { color: 'var(--slate)', paddingBottom: 14, paddingLeft: 20, cursor: 'pointer' }}>
            {t}
          </span>
        ))}
      </div>

      {loading && <Loader label="Loading your events…" />}
      {!loading && error && <EmptyState message="Couldn't load your events. Please try again." />}
      {!loading && !error && filtered.length === 0 && <EmptyState message="No events here yet." />}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', marginTop: 22, borderRadius: 14, overflow: 'hidden' }}>
          <table className="t">
            <tbody>
              <tr><th>Event name</th><th>Date</th><th>Status</th><th>RSVPs</th><th>Revenue</th><th /></tr>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600, color: e.status === 'CANCELLED' ? 'var(--slate)' : 'inherit' }}>{e.title}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--slate)' }}>{formatDate(e.startDate)}</td>
                  <td><Badge status={e.badgeStatus}>{e.statusLabel}</Badge></td>
                  <td>{e.registrationCount} / {e.maxParticipants ?? '∞'}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--slate)' }}>
                    {e.isPaid ? `₹${e.revenue ?? 0}` : 'Free'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <a
                      style={{ color: e.status === 'CANCELLED' ? 'var(--slate)' : 'var(--indigo)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => navigate(e.status === 'DRAFT' ? `/edit-event/${e.id}` : `/participants?eventId=${e.id}`)}
                    >
                      {e.status === 'DRAFT' ? 'Edit →' : e.status === 'CANCELLED' ? 'View →' : 'Manage →'}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyEvents;
