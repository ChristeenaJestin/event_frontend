import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

function RegisterForm({ onSubmit, submitting = false }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', department: 'Computer Science', year: '3rd year', password: '', agree: false,
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Input label="First name" placeholder="Priya" value={form.firstName} onChange={set('firstName')} />
        <Input label="Last name" placeholder="Nair" value={form.lastName} onChange={set('lastName')} />
      </div>
      <Input label="College email" type="email" placeholder="yourname@college.edu" value={form.email} onChange={set('email')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Select label="Department" value={form.department} onChange={set('department')}>
          <option>Computer Science</option>
        </Select>
        <Select label="Year" value={form.year} onChange={set('year')}>
          <option>3rd year</option>
        </Select>
      </div>
      <Input label="Password" type="password" placeholder="At least 8 characters" value={form.password} onChange={set('password')} />
      <label style={{ display: 'flex', gap: 9, fontSize: 12.5, color: 'var(--slate)', alignItems: 'flex-start', marginTop: 2 }}>
        <input
          type="checkbox"
          style={{ marginTop: 2 }}
          checked={form.agree}
          onChange={(e) => setForm({ ...form, agree: e.target.checked })}
        />
        I agree to the Code of Conduct and Privacy Policy.
      </label>
      <Button type="submit" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 6, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}

export default RegisterForm;
