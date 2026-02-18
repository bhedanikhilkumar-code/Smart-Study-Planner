import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function BacklogPage() {
  const [subjects, setSubjects] = useState([]);
  const [backlogs, setBacklogs] = useState([]);
  const [form, setForm] = useState({ subjectId: '', topic: '', urgency: 'medium' });

  const fetchData = async () => {
    const [s, b] = await Promise.all([api.get('/subjects'), api.get('/backlogs')]);
    setSubjects(s.data); setBacklogs(b.data);
    if (!form.subjectId && s.data[0]) setForm((p) => ({ ...p, subjectId: s.data[0]._id }));
  };
  useEffect(() => { fetchData(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/backlogs', form);
    setForm((p) => ({ ...p, topic: '' }));
    fetchData();
  };

  const toggle = async (item) => {
    await api.patch(`/backlogs/${item._id}`, { status: item.status === 'pending' ? 'completed' : 'pending' });
    fetchData();
  };

  return (
    <div className="space-y-4">
      <Card title="Add Backlog Topic">
        <form onSubmit={add} className="grid gap-2 md:grid-cols-4">
          <select className="rounded border p-2" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{subjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select>
          <input className="rounded border p-2" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Topic" />
          <select className="rounded border p-2" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}><option>low</option><option>medium</option><option>high</option></select>
          <button className="rounded bg-indigo-600 p-2 text-white">Add</button>
        </form>
      </Card>
      <Card title="Backlog Tracker">
        {backlogs.map((item) => (
          <div key={item._id} className="mb-2 flex items-center justify-between rounded border p-2">
            <span className={item.urgency === 'high' ? 'text-rose-500' : ''}>{item.topic} ({item.subjectId?.name}) [{item.urgency}]</span>
            <button onClick={() => toggle(item)} className="rounded bg-slate-200 px-2 py-1 dark:bg-slate-700">{item.status}</button>
          </div>
        ))}
      </Card>
    </div>
  );
}
