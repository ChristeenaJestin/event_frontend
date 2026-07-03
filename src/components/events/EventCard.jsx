import Badge from '../common/Badge';

function EventCard({ event, onClick }) {
  const { bannerStyle, gradient, badgeStatus, statusLabel, dateLabel, title, venue, registrationCount, priceLabel } = event;

  return (
    <div onClick={onClick}
      style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default' }}>
      <div
  
  style={{
    height: 130,
    position: "relative",
    overflow: "hidden",
    background: gradient,
  }}
>
  {event.bannerUrl ? (
    <img
      src={event.bannerUrl}
      alt={title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : null}

  <div
    style={{
      position: "absolute",
      top: 14,
      right: 14,
    }}
  >
    <Badge status={badgeStatus}>
      {statusLabel}
    </Badge>
  </div>
</div>
  
      <div style={{ padding: 18 }}>
        <div className="eyebrow">{dateLabel}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, marginTop: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 8 }}>{venue}</div>
        <div style={{ height: 1, background: 'var(--hairline)', margin: '14px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--slate)' }}>
          <span>{registrationCount ?? 0} going</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{priceLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
