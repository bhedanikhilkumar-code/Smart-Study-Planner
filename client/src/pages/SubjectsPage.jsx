import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: '', weeklyHours: 2, priority: 3 });

  const fetchSubjects = async () => setSubjects((await api.get('/subjects')).data);
  useEffect(() => { fetchSubjects(); }, []);

  const createSubject = async (e) => {
    e.preventDefault();
    await api.post('/subjects', { ...form, weeklyHours: Number(form.weeklyHours), priority: Number(form.priority) });
    setForm({ name: '', weeklyHours: 2, priority: 3 });
    fetchSubjects();
  };

  const remove = async (id) => {
    await api.delete(`/subjects/${id}`);
    fetchSubjects();
  };

  return (
    <div className="space-y-4">
      <Card title="Add Subject">
        <form onSubmit={createSubject} className="grid gap-2 md:grid-cols-4">
          <input className="rounded border p-2" value={form.name} placeholder="Subject" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded border p-2" value={form.weeklyHours} type="number" onChange={(e) => setForm({ ...form, weeklyHours: e.target.value })} />
          <input className="rounded border p-2" value={form.priority} type="number" min="1" max="5" onChange={(e) => setForm({ ...form, priority: e.target.value })} />
          <button className="rounded bg-indigo-600 p-2 text-white">Save</button>
        </form>
      </Card>
      <Card title="Subject List">
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject._id} className="flex items-center justify-between rounded border p-2">
              <span>{subject.name} • {subject.weeklyHours} hrs/week • Priority {subject.priority}</span>
              <button className="rounded bg-rose-500 px-2 py-1 text-white" onClick={() => remove(subject._id)}>Delete</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
