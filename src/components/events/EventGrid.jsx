import EventCard from './EventCard';
import { PlusIcon } from '../common/Icons';

function EventGrid({ events = [], onEventClick, onCreateClick, showCreateTile = true }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onClick={() => onEventClick?.(event)} />
      ))}
      {showCreateTile && (
        <div
          onClick={onCreateClick}
          style={{
            border: '1px dashed var(--hairline)', borderRadius: 14, display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10,
            color: 'var(--slate)', minHeight: 280, cursor: 'pointer',
          }}
        >
          <PlusIcon style={{ width: 26, height: 26, stroke: 'var(--slate)' }} />
          <span style={{ fontSize: 14 }}>Create a new event</span>
        </div>
      )}
    </div>
  );
}

export default EventGrid;
