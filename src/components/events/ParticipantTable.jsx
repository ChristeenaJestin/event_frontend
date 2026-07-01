import Badge from '../common/Badge';
import Button from '../common/Button';

const avatarColors = ['#818CF8', '#FF6B4A', '#16A34A'];

function ParticipantTable({ participants = [], total = 0, page = 1, pageSize = 6, onPrev, onNext }) {
  return (
    <div style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, overflow: 'hidden' }}>
      <table className="t">
        <tbody>
          <tr>
            <th><input type="checkbox" /></th><th>Student</th><th>College email</th>
            <th>Department</th><th>Status</th><th>RSVP date</th><th></th>
          </tr>
          {participants.map((p, i) => (
            <tr key={p.email}>
              <td><input type="checkbox" /></td>
              <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 28, height: 28, fontSize: 11, background: avatarColors[i % avatarColors.length] }}>
                  {p.initials}
                </div>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
              </td>
              <td style={{ color: 'var(--slate)' }}>{p.email}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{p.department}</td>
              <td><Badge status={p.status}>{p.statusLabel}</Badge></td>
              <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--slate)' }}>{p.rsvpDate}</td>
              <td style={{ textAlign: 'right', color: 'var(--slate)' }}>⋯</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', fontSize: 13, color: 'var(--slate)' }}>
        <span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" style={{ padding: '6px 14px' }} onClick={onPrev}>Previous</Button>
          <Button variant="ghost" style={{ padding: '6px 14px' }} onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ParticipantTable;
