import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Footer from '../components/layout/Footer';

// Helper to format timestamps cleanly inside the UI (e.g., "OCT 14–16")
const formatEventDate = (dateString) => {
  if (!dateString) return 'TBD';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
};

function Home() {
  const navigate = useNavigate();
  
  // State containers for your dynamic Supabase data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data directly from your live AWS EC2 instance on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const result = await response.json();
        if (result.success && result.data) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error("Error fetching database events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Isolate specific rows for your standalone hero feature boxes
  const heroEvent1 = events[0] || null;
  const heroEvent2 = events[1] || null;
  
  // Grab the top 3 events for the dynamic trending grid row
  const trendingEvents = events.slice(0, 3);

  // Default fallback gradients for the trending cards if no banner image is uploaded
  const fallbackGradients = [
    'linear-gradient(135deg,#4F46E5,#818CF8)',
    'linear-gradient(135deg,#FF6B4A,#FFB199)',
    'linear-gradient(135deg,#16A34A,#86EFAC)'
  ];

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* HEADER SECTION */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 64px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: 'var(--ink)', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />EventHub
        </div>
        
        {/* Fixed Active Navigation Routing Links */}
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: 'var(--slate)', fontWeight: 500 }}>
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/events')}>Explore events</a>
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/clubs')}>Clubs and societies</a>
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/calendar')}>Calendar</a>
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>About</a>
        </nav>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Log in</Button>
          <Button onClick={() => navigate('/register')}>Sign up</Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '88px 64px 76px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', borderBottom: '1px solid var(--hairline)' }}>
        <div>
          <div className="eyebrow">Campus events, all in one place</div>
          <h1 className="h1" style={{ fontSize: 50, marginTop: 14 }}>Never miss what's<br />happening on campus.</h1>
          <p style={{ marginTop: 20, color: 'var(--slate)', fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>
            Discover fests, workshops, hackathons and guest lectures hosted by every club and
            department — RSVP in a tap, or grab a ticket when there's one.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            <Button onClick={() => navigate('/events')}>Browse events</Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>I'm an organizer</Button>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
            {[
              [`${events.length}+`, 'events this semester'], 
              ['86', 'active clubs'], 
              ['12,800', 'students using EventHub']
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>{num}</div>
                <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO GRAPHIC WITH DYNAMIC EVENT BOXES */}
        <div style={{ position: 'relative', height: 400 }}>
          {loading ? (
            <div style={{ color: 'var(--slate)', padding: 40 }}>Loading campus events...</div>
          ) : (
            <>
              {/* Floating Box 1 (Replaces Spectra 2026) */}
              {heroEvent1 && (
                <div style={{ position: 'absolute', top: 0, right: 30, width: 300, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 24, boxShadow: '0 12px 30px rgba(22,24,43,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Badge status={heroEvent1.status === 'UPCOMING' ? 'confirmed' : 'ended'}>
                      {heroEvent1.status === 'UPCOMING' ? 'RSVP open' : heroEvent1.status}
                    </Badge>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate)' }}>FREE</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, marginTop: 14, color: 'var(--ink)' }}>
                    {heroEvent1.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 8 }}>
                    {formatEventDate(heroEvent1.start_date)} · {heroEvent1.venue}
                  </div>
                  <div style={{ height: 1, background: 'var(--hairline)', margin: '16px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--slate)' }}>
                    <span>{heroEvent1.registration_count || 0} going</span>
                    <span>{heroEvent1.category || 'Featured'}</span>
                  </div>
                </div>
              )}

              {/* Floating Box 2 (Replaces Cultural Night: Rhythms) */}
              {heroEvent2 && (
                <div style={{ position: 'absolute', top: 160, left: 0, width: 280, background: 'var(--indigo)', color: '#fff', borderRadius: 16, padding: 22 }}>
                  <span className="pill" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
                    Slots: {heroEvent2.max_participants || 'Open'}
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginTop: 12 }}>
                    {heroEvent2.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#D6D9F5', marginTop: 8 }}>
                    {formatEventDate(heroEvent2.start_date)} · {heroEvent2.venue}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section style={{ padding: 64, borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 30 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 23, color: 'var(--ink)' }}>Trending this week</h2>
          <a style={{ fontSize: 14, color: 'var(--indigo)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/events')}>View all events →</a>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {loading ? (
            <div style={{ color: 'var(--slate)' }}>Loading trending grid...</div>
          ) : (
            trendingEvents.map((event, index) => (
              <div key={event.id} style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, overflow: 'hidden' }}>
                {/* Dynamically uses banner image if present, else drops back cleanly to your CSS layout gradients */}
                <div style={{ 
                  height: 140, 
                  background: event.banner_url ? `url(${event.banner_url}) center/cover no-repeat` : fallbackGradients[index % fallbackGradients.length] 
                }} />
                <div style={{ padding: 18 }}>
                  <div className="eyebrow">
                    {formatEventDate(event.start_date)} · {event.category?.toUpperCase() || 'CAMPUS EVENT'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, marginTop: 8, color: 'var(--ink)' }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 6 }}>
                    {event.venue} · {event.registration_count || 0} going
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;