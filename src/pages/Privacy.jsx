import React from 'react';
import Footer from '../components/layout/Footer';

function Privacy() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, padding: '88px 64px', maxWidth: '720px', margin: '0 auto' }}>
        <div className="eyebrow" style={{ textTransform: 'uppercase', tracking: '0.05em' }}>Security & Legal</div>
        <h1 className="h1" style={{ fontSize: 40, marginTop: 14, marginBottom: 40, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>Privacy Policy</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, lineHeight: 1.7, color: 'var(--slate)' }}>
          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>1. Data Collection</h3>
            <p>We process essential institutional profile attributes including your university email address, name, and selected campus affiliations to securely connect your profile to platform events.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>2. Event Management Tracking</h3>
            <p>When you register or purchase a ticket for a campus event, organizer metrics increment dynamically to protect venue capacities and manage institutional check-in processes safely.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>3. Information Safeguards</h3>
            <p>Your tokens and authorization protocols are stored securely via encrypted environments. Account sessions remain restricted to validated users to ensure a safe community environment.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Privacy;