import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import * as userApi from '../api/userApi';
import useAuth from '../hooks/useAuth';
import { normalizeUser } from '../utils/helpers';

function Profile() {
  const { user, login } = useAuth();
  const [form, setForm]     = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError]     = useState('');

  useEffect(() => {
    // GET /api/users/profile
    userApi.getProfile()
      .then((raw) => {
        const u = normalizeUser(raw);
        setForm({ name: u.name, email: u.email });
      })
      .catch(() => {
        if (user) setForm({ name: user.name, email: user.email });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      // PUT /api/users/profile  body: { name, profile_image }
      await userApi.updateProfile({ name: form.name });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save profile.');
    } finally { setSaving(false); }
  };

  if (loading) return (
    <DashboardLayout search={false} breadcrumb={<>Account <span style={{ color: 'var(--ink)' }}>/ Profile</span></>}>
      <Loader label="Loading profile…" />
    </DashboardLayout>
  );

  return (
    <DashboardLayout search={false} breadcrumb={<>Account <span style={{ color: 'var(--ink)' }}>/ Profile</span></>}>
      <div style={{ maxWidth: 720 }}>
        <div className="eyebrow">Account</div>
        <h1 className="h1" style={{ fontSize: 28, marginTop: 8 }}>Your profile</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '28px 0', padding: 22, border: '1px solid var(--hairline)', background: 'var(--surface)', borderRadius: 14 }}>
          <div className="avatar" style={{ width: 64, height: 64, fontSize: 20 }}>{user?.initials || 'U'}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{user?.name || '—'}</div>
            <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 3 }}>{user?.email || '—'}</div>
            <div style={{ fontSize: 12, color: 'var(--indigo)', marginTop: 4, fontWeight: 600 }}>{user?.role || '—'}</div>
          </div>
          <div style={{ flex: 1 }} />
          <Button variant="secondary">Change photo</Button>
        </div>

        {success && <div style={{ padding: '10px 14px', background: 'var(--green-bg)', color: 'var(--green)', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{success}</div>}
        {error   && <div style={{ padding: '10px 14px', background: 'var(--red-bg)',   color: 'var(--red)',   borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input label="Full name"     value={form.name}  onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="College email" value={form.email} readOnly style={{ background: 'var(--bg)' }} />

          <div style={{ height: 1, background: 'var(--hairline)', margin: '12px 0' }} />

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>Password and security</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--hairline)' }}>
            <div><div style={{ fontSize: 14 }}>Password</div><div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 3 }}>Managed through your account settings</div></div>
            <Button variant="ghost" type="button">Change password</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div><div style={{ fontSize: 14 }}>Two-factor authentication</div><div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 3 }}>Add an extra layer of security</div></div>
            <Button variant="ghost" type="button">Enable</Button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
            <Button variant="ghost" type="button" onClick={() => setForm({ name: user?.name || '', email: user?.email || '' })}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
