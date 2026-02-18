import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-md space-y-3 rounded bg-white p-6 shadow dark:bg-slate-800">
      <h2 className="text-2xl font-bold">Register</h2>
      <input className="w-full rounded border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full rounded border p-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <button className="w-full rounded bg-indigo-600 p-2 text-white">Create account</button>
      <p className="text-sm">Already registered? <Link className="text-indigo-600" to="/login">Login</Link></p>
    </form>
  );
}
