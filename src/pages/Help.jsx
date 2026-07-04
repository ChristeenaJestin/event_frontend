import React from 'react';
import Footer from '../components/layout/Footer';

function Help() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, padding: '88px 64px', maxWidth: '720px', margin: '0 auto' }}>
        <div className="eyebrow" style={{ textTransform: 'uppercase' }}>Faq & Support</div>
        <h1 className="h1" style={{ fontSize: 40, marginTop: 14, marginBottom: 40, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>Help Center</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, lineHeight: 1.7, color: 'var(--slate)' }}>
          <section style={{ paddingBottom: 24, borderBottom: '1px solid var(--hairline)' }}>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 17, marginBottom: 8 }}>How do I reserve a slot for a campus event?</h3>
            <p>Simply navigate to any active event block on the landing dashboard or events directory layout and click the action button to process your confirmation instantly.</p>
          </section>

          <section style={{ paddingBottom: 24, borderBottom: '1px solid var(--hairline)' }}>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Where do I locate my active tickets?</h3>
            <p>Log in with your verified profile credentials and enter your user panel workspace dashboard to check your personal registration lists.</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Need system technical support?</h3>
            <p>For account status issues, database sync updates, or administrative features, please get in touch with our team at <span style={{ color: 'var(--indigo)', fontWeight: 500 }}>support@eventhub.edu</span>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Help;