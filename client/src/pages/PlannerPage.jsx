import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

const blocks = ['Morning', 'Afternoon', 'Evening'];

export default function PlannerPage() {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [form, setForm] = useState({ subjectId: '', date: new Date().toISOString().slice(0, 10), duration: 1, priority: 3 });

  const fetchData = async () => {
    const [subjectsRes, sessionsRes] = await Promise.all([api.get('/subjects'), api.get('/study-sessions')]);
    setSubjects(subjectsRes.data);
    setSessions(sessionsRes.data);
    if (!form.subjectId && subjectsRes.data[0]) setForm((prev) => ({ ...prev, subjectId: subjectsRes.data[0]._id }));
  };

  useEffect(() => { fetchData(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post('/study-sessions', { ...form, date: new Date(form.date).toISOString(), duration: Number(form.duration), priority: Number(form.priority), timeBlock: 'Morning' });
    fetchData();
  };

  const onDrop = async (block) => {
    if (!dragging) return;
    await api.patch(`/study-sessions/${dragging._id}`, { timeBlock: block });
    setDragging(null);
    fetchData();
  };

  return (
    <div className="space-y-4">
      <Card title="Add Study Session">
        <form onSubmit={add} className="grid gap-2 md:grid-cols-5">
          <select className="rounded border p-2" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
            {subjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <input type="date" className="rounded border p-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input type="number" className="rounded border p-2" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <input type="number" min="1" max="5" className="rounded border p-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
          <button className="rounded bg-indigo-600 p-2 text-white">Add</button>
        </form>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {blocks.map((block) => (
          <Card key={block} title={block}>
            <div className="min-h-40 space-y-2" onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(block)}>
              {sessions.filter((s) => s.timeBlock === block).map((s) => (
                <div key={s._id} draggable onDragStart={() => setDragging(s)} className="cursor-move rounded border p-2">
                  {s.subjectId?.name} • {s.duration}h • P{s.priority}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
