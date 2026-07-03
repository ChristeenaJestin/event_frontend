import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import * as eventApi from '../api/eventApi';
import { normalizeEvent, formatDate } from '../utils/helpers';

const TABS = ['Details', 'Schedule', 'Speakers', 'Tickets', 'Danger zone'];

function EditEvent() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const [event, setEvent]     = useState(null);
  const [form, setForm]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

useEffect(() => {

    async function load() {

        try {

            setLoading(true);

            const data = await eventApi.getEventById(id);

            const e = normalizeEvent(data);

            setEvent(e);

            setForm({

                title: e.title,

                description: e.description,

                venue: e.venue,

                start_date: e.startDate
                    ? e.startDate.substring(0,16)
                    : "",

                end_date: e.endDate
                    ? e.endDate.substring(0,16)
                    : "",

                registration_deadline:
                    e.registrationDeadline
                    ? e.registrationDeadline.substring(0,16)
                    : "",

                max_participants:
                    e.maxParticipants

            });

        }

        catch{

            setError("Unable to load event");

        }

        finally{

            setLoading(false);

        }

    }

    load();

},[id]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
const handleSave = async () => {

    try {

        setSaving(true);

        await eventApi.updateEvent(id,{

            title:form.title,

            description:form.description,

            venue:form.venue,

            start_date:form.start_date,

            end_date:form.end_date,

            registration_deadline:form.registration_deadline,

            max_participants:Number(form.max_participants)

        });

        navigate(`/events/${id}`);

    }

    catch{

        setError("Unable to save event");

    }

    finally{

        setSaving(false);

    }

};

  const handleCancelEvent = async () => {
    if (!window.confirm("Cancel this event? All registered students will be notified.")) return;
    setSaving(true);
    try {
      // PUT /api/events/:id  with status: CANCELLED
      await eventApi.updateEvent(id, { status: 'CANCELLED' });
      navigate('/my-events');
    } catch { setError('Could not cancel the event.'); }
    finally { setSaving(false); }
  };

  if (loading || !form) return (
    <DashboardLayout search={false} breadcrumb="Events / Edit">
      <Loader label="Loading event…" />
    </DashboardLayout>
  );

  return (
    <DashboardLayout search={false} breadcrumb={<>Events / {event?.title} <span style={{ color: 'var(--ink)' }}>/ Edit</span></>}>
      <div style={{ maxWidth: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">Editing</div>
            <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>{event?.title}</h1>
          </div>
          <Badge status={event?.badgeStatus}>{event?.statusLabel}</Badge>
        </div>

        {error && <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--red-bg)', color: 'var(--red)', borderRadius: 8, fontSize: 13 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--hairline)', margin: '26px 0 26px', fontSize: 14 }}>
          {TABS.map((t, i) => (
            <span key={t} style={i === 0
              ? { color: 'var(--ink)', fontWeight: 600, borderBottom: '2px solid var(--coral)', paddingBottom: 14, marginBottom: -1 }
              : { color: 'var(--slate)', paddingBottom: 14 }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label="Event name" value={form.title} onChange={set('title')} />
          <div>
            <label className="field-label">Description</label>
            <textarea rows={4} className="field-input" style={{ resize: 'vertical' }} value={form.description} onChange={set('description')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="Start date and time" type="datetime-local" value={form.start_date} onChange={set('start_date')} />
            <Input label="End date and time"   type="datetime-local" value={form.end_date}   onChange={set('end_date')} />
          </div>
          <Input label="Venue" value={form.venue} onChange={set('venue')} />
          <Input label="Registration deadline" type="datetime-local" value={form.registration_deadline} onChange={set('registration_deadline')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <Input label="Max participants" value={form.max_participants} onChange={set('max_participants')} />
              <div style={{ fontSize: 12, color: 'var(--amber)', marginTop: 6 }}>
                {event?.registrationCount || 0} already RSVP'd — lowering capacity below this pauses new signups.
              </div>
            </div>
            <div>
              <label className="field-label">Entry fee</label>
              <input className="field-input" value={event?.priceLabel || 'Free'} readOnly style={{ background: 'var(--bg)' }} />
            </div>
          </div>
        </div>

        {/* danger zone */}
        <div style={{ border: '1px solid var(--red)', background: 'var(--red-bg)', padding: '20px 22px', marginTop: 32, borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--red)' }}>Cancel this event</div>
          <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 6, maxWidth: 480 }}>
            All {event?.registrationCount || 0} students who RSVP'd will be notified. This can't be undone.
          </div>
          <Button disabled={saving} style={{ marginTop: 14, background: 'var(--red)', borderColor: 'var(--red)' }} onClick={handleCancelEvent}>
            Cancel event
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <Button variant="ghost" disabled={saving} onClick={() => navigate(-1)}>Discard changes</Button>
          <Button disabled={saving} onClick={handleSave}>{saving ? 'Saving…' : 'Save changes'}</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditEvent;
