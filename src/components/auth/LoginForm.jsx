import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

function LoginForm({ onSubmit, submitting = false }) {
  const [form, setForm] = useState({ email: '', password: '', stayIn: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Input
        label="College email"
        type="email"
        placeholder="yourname@college.edu"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••••"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
  <label style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--slate)' }}>
    <input
      type="checkbox"
      checked={form.stayIn}
      onChange={(e) => setForm({ ...form, stayIn: e.target.checked })}
    />
    Stay signed in
  </label>
</div>
      <Button type="submit" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 8, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  );
}

export default LoginForm;
