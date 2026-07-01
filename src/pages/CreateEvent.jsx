import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import { UploadIcon } from '../components/common/Icons';
import { EVENT_CATEGORIES, VENUES } from '../utils/constants';
import * as eventApi from '../api/eventApi';
import * as uploadApi from '../api/uploadApi';

function CreateEvent() {
  const navigate = useNavigate();
  const [category, setCategory]   = useState('Tech fest');
  const [entryType, setEntryType] = useState('free');
  const [bannerFile, setBannerFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');

  const [form, setForm] = useState({
    title: '', description: '', start_date: '', end_date: '',
    venue: VENUES[0], max_participants: '', registration_deadline: '', price: '',
  });
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (status) => {
    setError(''); setSubmitting(true);
    try {
      let banner_url = null;
      if (bannerFile) {
        // POST /api/upload  → { url, fileKey }
        const uploaded = await uploadApi.uploadFile(bannerFile);
        banner_url = uploaded.url;
      }

      // POST /api/events — backend expects snake_case
      const payload = {
        title:                 form.title,
        description:           form.description,
        category,
        venue:                 form.venue,
        start_date:            form.start_date || null,
        end_date:              form.end_date   || null,
        max_participants:      form.max_participants ? Number(form.max_participants) : null,
        registration_deadline: form.registration_deadline || null,
        is_paid:               entryType === 'paid',
        price:                 entryType === 'paid' ? Number(form.price) || 0 : 0,
        banner_url,
        status,               // 'DRAFT' or 'PENDING'
      };

      const created = await eventApi.createEvent(payload);
      navigate(`/events/${created.id || created.event?.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create the event.');
    } finally { setSubmitting(false); }
  };

  return (
    <DashboardLayout search={false} breadcrumb={<>Events <span style={{ color: 'var(--ink)' }}>/ Create event</span></>}>
      <div style={{ maxWidth: 760 }}>
        <div className="eyebrow">Step 1 of 3 — Details</div>
        <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Create a new event</h1>

        {error && <div style={{ marginTop: 18, padding: '10px 14px', background: 'var(--red-bg)', color: 'var(--red)', borderRadius: 8, fontSize: 13 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8, margin: '18px 0 32px' }}>
          <div style={{ height: 4, flex: 1, background: 'var(--coral)', borderRadius: 2 }} />
          <div style={{ height: 4, flex: 1, background: 'var(--hairline)', borderRadius: 2 }} />
          <div style={{ height: 4, flex: 1, background: 'var(--hairline)', borderRadius: 2 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label="Event name" placeholder="e.g. Annual Tech Fest — Spectra 2026" value={form.title} onChange={set('title')} required />
          <div>
            <label className="field-label">Description</label>
            <textarea rows={4} placeholder="What's this event about?" className="field-input" style={{ resize: 'vertical' }} value={form.description} onChange={set('description')} />
          </div>

          <div>
            <label className="field-label">Category</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EVENT_CATEGORIES.map((cat) => (
                <span key={cat} onClick={() => setCategory(cat)} style={category === cat
                  ? { fontSize: 12.5, padding: '8px 14px', background: 'var(--indigo)', color: '#fff', borderRadius: 8, cursor: 'pointer' }
                  : { fontSize: 12.5, padding: '8px 14px', border: '1px solid var(--hairline)', color: 'var(--slate)', borderRadius: 8, cursor: 'pointer' }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="Start date and time" type="datetime-local" value={form.start_date} onChange={set('start_date')} />
            <Input label="End date and time"   type="datetime-local" value={form.end_date}   onChange={set('end_date')} />
          </div>

          <Select label="Venue" value={form.venue} onChange={set('venue')}>
            {VENUES.map((v) => <option key={v}>{v}</option>)}
          </Select>

          <Input label="Registration deadline" type="datetime-local" value={form.registration_deadline} onChange={set('registration_deadline')} />

          <div>
            <label className="field-label">Entry type</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant={entryType === 'free' ? 'primary' : 'ghost'} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEntryType('free')}>Free · RSVP</Button>
              <Button variant={entryType === 'paid' ? 'primary' : 'ghost'} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEntryType('paid')}>Paid ticket</Button>
            </div>
          </div>

          {entryType === 'paid' && (
            <Input label="Ticket price (₹)" placeholder="150" value={form.price} onChange={set('price')} />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="Max participants" placeholder="2000" value={form.max_participants} onChange={set('max_participants')} />
            <Select label="Open to">
              <option>All students</option>
              <option>Department only</option>
              <option>Invite only</option>
            </Select>
          </div>

          <div>
            <label className="field-label">Cover image</label>
            <label style={{ display: 'block', border: '1px dashed var(--hairline)', borderRadius: 12, padding: 32, textAlign: 'center', color: 'var(--slate)', fontSize: 13.5, cursor: 'pointer' }}>
              <UploadIcon style={{ width: 22, height: 22, margin: '0 auto 10px' }} />
              {bannerFile ? bannerFile.name : 'Drag a poster here, or browse files'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setBannerFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <Button variant="ghost" disabled={submitting} onClick={() => submit('DRAFT')}>{submitting ? 'Saving…' : 'Save as draft'}</Button>
          <Button disabled={submitting} onClick={() => submit('PENDING')}>{submitting ? 'Submitting…' : 'Continue →'}</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateEvent;
