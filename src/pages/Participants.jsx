import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import SearchBar from '../components/events/SearchBar';
import ParticipantTable from '../components/events/ParticipantTable';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { UploadIcon } from '../components/common/Icons';
import * as registrationApi from '../api/registrationApi';
import * as eventApi from '../api/eventApi';
import { normalizeParticipant, normalizeEvent } from '../utils/helpers';

const PAGE_SIZE = 10;

function Participants() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');

  const [event, setEvent]             = useState(null);
  const [participants, setParticipants] = useState([]);
  const [total, setTotal]             = useState(0);
  const [page, setPage]               = useState(1);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (!eventId) return;
    // GET /api/events/:id
    eventApi.getEventById(eventId)
      .then((raw) => setEvent(normalizeEvent(raw)))
      .catch(() => {});
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true); setError(null);
    // GET /api/events/:id/participants
    registrationApi.getParticipants(eventId, { page, pageSize: PAGE_SIZE })
      .then((data) => {
        // backend may return array or { participants, total }
        const list  = Array.isArray(data) ? data : (data.participants || data.registrations || []);
        const count = data.total ?? list.length;
        setParticipants(list.map(normalizeParticipant));
        setTotal(count);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [eventId, page]);

  const handleExport = async () => {
    if (!eventId) return;
    try {
      const blob = await registrationApi.exportParticipantsCSV(eventId);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `participants-${eventId}.csv`; a.click();
      URL.revokeObjectURL(url);
    } catch { alert('Export failed.'); }
  };

  if (!eventId) return (
    <DashboardLayout search={false} breadcrumb="Participants">
      <EmptyState message="Open this page from My events → Manage to view participants." />
    </DashboardLayout>
  );

  // derive stats from participant list
  const confirmed  = participants.filter((p) => p.status === 'confirmed').length;
  const deptSet    = new Set(participants.map((p) => p.department).filter(Boolean));

  return (
    <DashboardLayout search={false}
      breadcrumb={<>My events <span style={{ color: 'var(--ink)' }}>/ {event?.title || '…'} / Participants</span></>}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="eyebrow">{event?.title || 'Event'}</div>
          <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Participants</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" icon={<UploadIcon />} onClick={handleExport}>Export CSV</Button>
          <Button>Invite students</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, margin: '26px 0' }}>
        <div className="stat-card"><div className="label">Total RSVPs</div><div className="num">{total}</div></div>
        <div className="stat-card"><div className="label">Confirmed</div><div className="num">{confirmed}</div></div>
        <div className="stat-card"><div className="label">Capacity</div><div className="num">{event?.maxParticipants ?? '∞'}</div></div>
        <div className="stat-card"><div className="label">Departments</div><div className="num">{deptSet.size || '—'}</div></div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <SearchBar placeholder="Search by name…" />
        <select style={{ border: '1px solid var(--hairline)', padding: '0 14px', fontSize: 13.5, borderRadius: 8, background: 'var(--surface)', color: 'var(--slate)' }}>
          <option>All statuses</option>
        </select>
      </div>

      {loading && <Loader label="Loading participants…" />}
      {!loading && error && <EmptyState message="Couldn't load participants." />}
      {!loading && !error && (
        <ParticipantTable
          participants={participants}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => { if (page * PAGE_SIZE < total) setPage((p) => p + 1); }}
        />
      )}
    </DashboardLayout>
  );
}

export default Participants;
