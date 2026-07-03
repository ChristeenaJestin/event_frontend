import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import * as eventApi from '../api/eventApi';
import * as registrationApi from '../api/registrationApi';
import useAuth from '../hooks/useAuth';
import { ORGANIZER_ROLES } from '../utils/constants';
import { normalizeEvent, formatDate } from '../utils/helpers';

const TABS = ['Overview'];

function EventDetails() {
  const navigate    = useNavigate();
  const { id }      = useParams();
  const { hasRole } = useAuth();
  const canEdit     = hasRole(...ORGANIZER_ROLES);

  const [event, setEvent]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [rsvping, setRsvping] = useState(false);

  const load = async () => {

    try {

        setLoading(true);

        const data = await eventApi.getEventById(id);

        setEvent(normalizeEvent(data));

    }

    catch (err) {

        setError(err);

    }

    finally {

        setLoading(false);

    }

};

  useEffect(() => { load(); }, [id]);

  const handleRsvp = async () => {
    setRsvping(true);
    try {
      // POST /api/events/:id/register
      await registrationApi.rsvpToEvent(id);
      alert("Successfully Registered!");
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    } finally { setRsvping(false); }
  };

  if (loading) return (
    <DashboardLayout search={false} breadcrumb="Events">
      <Loader label="Loading event…" />
    </DashboardLayout>
  );

  if (error || !event) return (
    <DashboardLayout search={false} breadcrumb="Events">
      <EmptyState message="Couldn't load this event." />
    </DashboardLayout>
  );

  const filled = event.maxParticipants
    ? Math.min(100, Math.round((event.registrationCount / event.maxParticipants) * 100))
    : 0;

  return (
    <DashboardLayout
      search={false}
      breadcrumb={<>Events <span style={{ color: 'var(--ink)' }}>/ {event.title}</span></>}
    >
      {/* banner — break out of app-content padding */}
      <div style={{ margin: '-36px -40px 0' }}>
        <div style={{
          height: 220,
          ...event.bannerStyle,
          background: event.bannerUrl
            ? `url(${event.bannerUrl}) center/cover no-repeat`
            : 'linear-gradient(135deg,#4F46E5,#312E81)',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                {event.statusLabel}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 30, marginTop: 12 }}>{event.title}</h1>
              <div style={{ color: '#D6D9F5', fontSize: 13.5, marginTop: 8 }}>
                {formatDate(event.startDate)} · {event.venue}
                {event.createdByName ? ` · Hosted by ${event.createdByName}` : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {canEdit && (
                <Button variant="secondary" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}
                  onClick={() => navigate(`/edit-event/${event.id}`)}>
                  Edit event
                </Button>
              )}
              <Button variant="coral"
                disabled={rsvping || event.isRegistered || event.status !== 'UPCOMING'}
                onClick={handleRsvp}>
                {event.isRegistered ? "You're registered" : rsvping ? 'Registering…' : `RSVP now — ${event.priceLabel}`}
              </Button>
            </div>
          </div>
        </div>

        {/* body */}
        <div style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32 }}>
          <div>
            <div style={{ display: 'flex', gap: 26, borderBottom: '1px solid var(--hairline)', paddingBottom: 14, marginBottom: 22, fontSize: 14 }}>
              {TABS.map((t, i) => (
                <span key={t} style={i === 0
                  ? { color: 'var(--ink)', fontWeight: 600, borderBottom: '2px solid var(--coral)', paddingBottom: 14, marginBottom: -15 }
                  : { color: 'var(--slate)' }}>
                  {t}
                </span>
              ))}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 14 }}>About this event</h2>
            <p style={{ color: 'var(--slate)', fontSize: 14.5, lineHeight: 1.75, maxWidth: 560 }}>
              {event.description || 'No description provided.'}
            </p>
          </div>

          <div>
            <div style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, padding: 22 }}>
              <div className="eyebrow">RSVPs</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, marginTop: 8 }}>
                {event.registrationCount} / {event.maxParticipants ?? '∞'}
              </div>
              {event.maxParticipants && (
                <>
                  <div style={{ height: 6, background: 'var(--hairline)', marginTop: 12, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${filled}%`, background: 'var(--indigo)' }} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 8 }}>{filled}% of capacity filled</div>
                </>
              )}
              <div style={{ height: 1, background: 'var(--hairline)', margin: '18px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
                {[
                  ['Venue',                event.venue || '—'],
                  ['Start',                formatDate(event.startDate)],
                  ['Registration deadline', formatDate(event.registrationDeadline)],
                  ['Entry fee',            event.priceLabel],
                  ['Hosted by',            event.createdByName || '—'],
                ].map(([k, v]) => (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }} key={k}>
                    <span style={{ color: 'var(--slate)' }}>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EventDetails;
