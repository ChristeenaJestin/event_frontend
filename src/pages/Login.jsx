import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/auth/LoginForm';

import Button from '../components/common/Button';

import useAuth from '../hooks/useAuth';



function Login() {

  const navigate     = useNavigate();

  const { login }    = useAuth();

  const [error, setError]         = useState('');

  const [submitting, setSubmitting] = useState(false);



  const handleSubmit = async ({ email, password }) => {

    setError('');

    setSubmitting(true);

    try {

      await login({ email, password });

      navigate('/dashboard');

    } catch (err) {

      setError(err.response?.data?.message || 'Invalid email or password.');

    } finally {

      setSubmitting(false);

    }

  };



  return (

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>

      {/* left: form */}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, background: 'var(--bg)' }}>

        <div style={{ width: '100%', maxWidth: 380 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 44, color: 'var(--ink)' }}>

            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--coral)' }} />EventHub

          </div>

          <div className="eyebrow">Welcome back</div>

          <h1 className="h1" style={{ fontSize: 28, marginTop: 10 }}>Log in with your college email</h1>



          {error && (

            <div style={{ marginTop: 18, padding: '10px 14px', background: 'var(--red-bg)', color: 'var(--red)', borderRadius: 8, fontSize: 13 }}>

              {error}

            </div>

          )}



          <LoginForm onSubmit={handleSubmit} submitting={submitting} />



          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0', color: 'var(--slate)', fontSize: 12.5 }}>

            <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />OR<div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />

          </div>

         

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13.5, color: 'var(--slate)' }}>

            New here? <a style={{ color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/register')}>Create an account</a>

          </p>

        </div>

      </div>



      {/* right: quote panel */}

      <div style={{ background: 'var(--indigo)', color: '#fff', display: 'flex', alignItems: 'center', padding: 60 }}>

        <div>

          <div className="eyebrow" style={{ color: '#C7CCFF' }}>Used by students across campus</div>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1.3, marginTop: 18, maxWidth: 420 }}>

            "I found out about three workshops I would've completely missed."

          </div>

          <div style={{ marginTop: 22, fontSize: 13.5, color: '#D6D9F5' }}>— Priya N., 3rd year, Computer Science</div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '36px 0' }} />

          <div style={{ display: 'flex', gap: 32, fontSize: 13, color: '#C7CCFF', letterSpacing: '0.02em' }}>

            <span>TECH CLUB</span><span>CULTURAL COMMITTEE</span><span>SPORTS BOARD</span>

          </div>

        </div>

      </div>

    </div>

  );

}
export default Login;
