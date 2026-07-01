import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import { PlusIcon } from '../components/common/Icons';
import * as eventApi from '../api/eventApi';
import useAuth from '../hooks/useAuth';
import { ORGANIZER_ROLES } from '../utils/constants';
import { normalizeEvent, formatDate } from '../utils/helpers';

function Dashboard() {
  const navigate    = useNavigate();
  const { user, hasRole } = useAuth();
  const canCreate   = hasRole(...ORGANIZER_ROLES);

  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventApi.getEvents({ limit: 4, sort: 'start_date' })
      .then((data) => setEvents((Array.isArray(data) ? data : data.events || []).map(normalizeEvent)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div className="eyebrow">{today}</div>
          <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>
            Hey {user?.name?.split(' ')[0] || 'there'}, here's what's on
          </h1>
        </div>
        {canCreate && (
          <Button icon={<PlusIcon />} onClick={() => navigate('/create-event')}>Create event</Button>
        )}
      </div>

      {/* stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        <div className="stat-card">
          <div className="label">Events this week</div>
          <div className="num">{events.length}</div>
          <div className="delta" style={{ color: 'var(--slate)' }}>from the platform</div>
        </div>
        <div className="stat-card">
          <div className="label">Role</div>
          <div className="num" style={{ fontSize: 18, marginTop: 10 }}>{user?.role || '—'}</div>
          <div className="delta" style={{ color: 'var(--slate)' }}>your access level</div>
        </div>
        <div className="stat-card">
          <div className="label">Open events</div>
          <div className="num">{events.filter((e) => e.status === 'PUBLISHED').length}</div>
          <div className="delta" style={{ color: 'var(--green)' }}>RSVP open</div>
        </div>
        <div className="stat-card">
          <div className="label">Total participants</div>
          <div className="num">{events.reduce((s, e) => s + (e.registrationCount || 0), 0)}</div>
          <div className="delta" style={{ color: 'var(--slate)' }}>across all events</div>
        </div>
      </div>

      {/* upcoming events table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 22 }}>
        <div style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14 }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Upcoming events</span>
            <a style={{ fontSize: 13, color: 'var(--indigo)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/events')}>View all</a>
          </div>
          {loading ? (
            <Loader label="Loading events…" />
          ) : (
            <table className="t">
              <tbody>
                <tr><th>Event</th><th>Date</th><th>Going</th><th>Status</th></tr>
                {events.length === 0 && (
                  <tr><td colSpan={4} style={{ color: 'var(--slate)', textAlign: 'center', padding: 24 }}>No events yet</td></tr>
                )}
                {events.map((e) => (
                  <tr key={e.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/events/${e.id}`)}>
                    <td style={{ fontWeight: 600 }}>{e.title}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--slate)' }}>{formatDate(e.startDate)}</td>
                    <td>{e.registrationCount}</td>
                    <td><Badge status={e.badgeStatus}>{e.statusLabel}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* quick info panel */}
        <div style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, padding: 22 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>Your account</span>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--slate)' }}>Name</span><span>{user?.name || '—'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--slate)' }}>Email</span><span style={{ fontSize: 12.5 }}>{user?.email || '—'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--slate)' }}>Role</span>
              <span style={{ color: 'var(--indigo)', fontWeight: 600 }}>{user?.role || '—'}</span>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--hairline)', margin: '18px 0' }} />
          <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/profile')}>
            Edit profile
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
