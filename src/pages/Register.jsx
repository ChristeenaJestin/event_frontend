import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

// Backend register only needs: name, email, password
// role defaults to USER on the backend; organizer/admin are set by superadmin
function Register() {
  const navigate      = useNavigate();
  const { register }  = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError]           = useState('');
  const [submitting, setSubmitting] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      // POST /api/auth/register  body: { name, email, password }
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      {/* left: benefit panel */}
      <div style={{ background: 'var(--indigo)', color: '#fff', display: 'flex', alignItems: 'center', padding: 60 }}>
        <div>
          <div className="eyebrow" style={{ color: '#C7CCFF' }}>Free for every student</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1.25, marginTop: 18, maxWidth: 420 }}>
            One account for every fest, workshop, and club event on campus.
          </h1>
          <ul style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['RSVP to free events in one tap', 'Buy tickets for paid fests securely', 'Get reminders before events start'].map((t) => (
              <li key={t} style={{ display: 'flex', gap: 12, fontSize: 14.5, color: '#E2E4FA' }}>
                <span style={{ color: 'var(--coral)' }}>●</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, background: 'var(--bg)' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 36, color: 'var(--ink)' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--coral)' }} />EventHub
          </div>
          <div className="eyebrow">Get started</div>
          <h1 className="h1" style={{ fontSize: 28, marginTop: 10 }}>Create your account</h1>

          {error && (
            <div style={{ marginTop: 18, padding: '10px 14px', background: 'var(--red-bg)', color: 'var(--red)', borderRadius: 8, fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Full name" placeholder="Priya Nair" value={form.name} onChange={set('name')} required />
            <Input label="College email" type="email" placeholder="yourname@college.edu" value={form.email} onChange={set('email')} required />
            <Input label="Password" type="password" placeholder="At least 8 characters" value={form.password} onChange={set('password')} required />
            <label style={{ display: 'flex', gap: 9, fontSize: 12.5, color: 'var(--slate)', alignItems: 'flex-start', marginTop: 2 }}>
              <input type="checkbox" required style={{ marginTop: 2 }} />
              I agree to the Code of Conduct and Privacy Policy.
            </label>
            <Button type="submit" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 6, opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13.5, color: 'var(--slate)' }}>
            Already have an account? <a style={{ color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/login')}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
