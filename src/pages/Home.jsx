import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Footer from '../components/layout/Footer';

const defaultTrending = [
  { gradient: 'linear-gradient(135deg,#4F46E5,#818CF8)', tag: 'SEP 18–20 · TECH FEST', title: 'HackNight 2026', meta: 'CS Auditorium · 600 going' },
  { gradient: 'linear-gradient(135deg,#FF6B4A,#FFB199)', tag: 'OCT 02 · WORKSHOP', title: 'Intro to UI Design', meta: 'Seminar Hall 2 · 120 going' },
  { gradient: 'linear-gradient(135deg,#16A34A,#86EFAC)', tag: 'OCT 14 · SPORTS', title: 'Inter-College Athletics Meet', meta: 'Sports Complex · 940 going' },
];

function Home() {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [eventCountLabel, setEventCountLabel] = useState('340+');

  const formatEventDate = (dateString) => {
    if (!dateString) return 'TBD';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setEvents(result.data);
          setEventCountLabel(`${result.data.length}`);
        }
      } catch (error) {
        console.error("Database fetch failed or was blocked by mixed content browser rules.", error);
      }
    };
    fetchEvents();
  }, []);

  const heroEvent1 = events[0];
  const heroEvent2 = events[1];

  const dynamicTrendingList = events.length > 0 
    ? events.slice(0, 3).map((event, index) => ({
        gradient: event.banner_url ? `url(${event.banner_url}) center/cover no-repeat` : defaultTrending[index % 3].gradient,
        tag: `${formatEventDate(event.start_date)} · ${event.category?.toUpperCase() || 'CAMPUS EVENT'}`,
        title: event.title,
        meta: `${event.venue} · ${event.registration_count || 0} going`
      }))
    : defaultTrending;

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* HEADER SECTION */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 64px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: 'var(--ink)', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />EventHub
        </div>
        
        {/* Cleaned Navigation Layout - Kept only Explore Events */}
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: 'var(--slate)', fontWeight: 500 }}>
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/events')}>Explore events</a>
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
          
          {/* Action Row - Cleaned up Organizer link button */}
          <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
            <Button onClick={() => navigate('/events')}>Browse events</Button>
          </div>
          
          <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
            {[[eventCountLabel, 'events this semester'], ['86', 'active clubs'], ['12,800', 'students using EventHub']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>{num}</div>
                <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO CARDS BLOCK */}
        <div style={{ position: 'relative', height: 400 }}>
          {/* Box 1 */}
          <div style={{ position: 'absolute', top: 0, right: 30, width: 300, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 16, padding: 24, boxShadow: '0 12px 30px rgba(22,24,43,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Badge status="confirmed">RSVP open</Badge>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate)' }}>FREE</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, marginTop: 14, color: 'var(--ink)' }}>
              {heroEvent1 ? heroEvent1.title : 'Annual Tech Fest — Spectra 2026'}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 8 }}>
              {heroEvent1 ? `${formatEventDate(heroEvent1.start_date)} · ${heroEvent1.venue}` : 'Oct 14–16 · Main Auditorium'}
            </div>
            <div style={{ height: 1, background: 'var(--hairline)', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--slate)' }}>
              <span>{heroEvent1 ? `${heroEvent1.registration_count || 0} going` : '1,240 going'}</span>
              <span>{heroEvent1 ? (heroEvent1.category || 'Featured') : 'Hosted by CS Dept'}</span>
            </div>
          </div>

          {/* Box 2 */}
          <div style={{ position: 'absolute', top: 160, left: 0, width: 280, background: 'var(--indigo)', color: '#fff', borderRadius: 16, padding: 22 }}>
            <span className="pill" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
              {heroEvent2 ? `Slots: ${heroEvent2.max_participants || 'Open'}` : 'Paid · ₹150'}
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginTop: 12 }}>
              {heroEvent2 ? heroEvent2.title : 'Cultural Night: Rhythms'}
            </div>
            <div style={{ fontSize: 12, color: '#D6D9F5', marginTop: 8 }}>
              {heroEvent2 ? `${formatEventDate(heroEvent2.start_date)} · ${heroEvent2.venue}` : 'Nov 02 · Open Air Theatre'}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING GRID SECTION */}
      <section style={{ padding: 64, borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 30 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 23, color: 'var(--ink)' }}>Trending this week</h2>
          <a style={{ fontSize: 14, color: 'var(--indigo)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/events')}>View all events →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {dynamicTrendingList.map((e) => (
            <div key={e.title} style={{ border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 140, background: e.gradient }} />
              <div style={{ padding: 18 }}>
                <div className="eyebrow">{e.tag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, marginTop: 8, color: 'var(--ink)' }}>{e.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 6 }}>{e.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;