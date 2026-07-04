import React from 'react';
import Footer from '../components/layout/Footer';

function Guidelines() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, padding: '88px 64px', maxWidth: '720px', margin: '0 auto' }}>
        <div className="eyebrow" style={{ textTransform: 'uppercase' }}>Community Standards</div>
        <h1 className="h1" style={{ fontSize: 40, marginTop: 14, marginBottom: 40, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>Campus Guidelines</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, lineHeight: 1.7, color: 'var(--slate)' }}>
          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>1. Accurate Listing Configurations</h3>
            <p>All clubs and student organizers must list actual dates, verified structural venues, and clear pricing definitions. Misrepresented event items are subject to removal.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>2. Safe Event Environments</h3>
            <p>Fests, technical hackathons, workshops, and gatherings must comply entirely with campus administrative protocols and behavior regulations.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>3. Account Accountability</h3>
            <p>Tickets, registration seats, and organizer administration profiles are strictly tied to specific student accounts and are non-transferable without system review.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Guidelines;