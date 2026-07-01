import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 64px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--ink)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--coral)' }} />EventHub
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Log in</Button>
          <Button onClick={() => navigate('/register')}>Sign up</Button>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ textAlign: 'center', maxWidth: 460 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 100, lineHeight: 1, color: 'var(--indigo)' }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 23, marginTop: 20, color: 'var(--ink)' }}>Looks like this event got cancelled</h1>
          <p style={{ color: 'var(--slate)', fontSize: 14.5, marginTop: 12, lineHeight: 1.7 }}>
            The page or event you're looking for may have been moved, renamed, or never
            existed. Check the link, or head back to explore what's on.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30 }}>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
            <Button onClick={() => navigate('/events')}>Explore events</Button>
          </div>
        </div>
      </div>

      <footer style={{ padding: '26px 64px', textAlign: 'center', color: 'var(--slate)', fontSize: 13, borderTop: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        © 2026 EventHub — Need help? <a style={{ color: 'var(--indigo)', fontWeight: 600 }}>Contact support</a>
      </footer>
    </div>
  );
}

export default NotFound;
