import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 64px', borderTop: '1px solid var(--hairline)', background: 'var(--surface)' }}>
      <div style={{ fontSize: 13, color: 'var(--slate)' }}>
        © 2026 EventHub, built for our campus community.
      </div>
      <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--slate)', fontWeight: 500 }}>
        {/* Added route navigations with mouse pointers while preserving your native layout styling */}
        <a style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}>Privacy</a>
        <a style={{ cursor: 'pointer' }} onClick={() => navigate('/guidelines')}>Guidelines</a>
        <a style={{ cursor: 'pointer' }} onClick={() => navigate('/help')}>Help</a>
      </div>
    </footer>
  );
}

export default Footer;