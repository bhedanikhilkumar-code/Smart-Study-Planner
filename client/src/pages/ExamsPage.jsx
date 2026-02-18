import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

const daysLeft = (examDate) => Math.max(0, Math.ceil((new Date(examDate) - new Date()) / 86400000));

export default function ExamsPage() {
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ subjectId: '', examDate: '' });

  const fetchData = async () => {
    const [s, e] = await Promise.all([api.get('/subjects'), api.get('/exams')]);
    setSubjects(s.data); setExams(e.data);
    if (!form.subjectId && s.data[0]) setForm((p) => ({ ...p, subjectId: s.data[0]._id }));
  };

  useEffect(() => { fetchData(); }, []);

  const add = async (ev) => {
    ev.preventDefault();
    await api.post('/exams', { ...form, examDate: new Date(form.examDate).toISOString() });
    fetchData();
  };

  return (
    <div className="space-y-4">
      <Card title="Add Exam">
        <form onSubmit={add} className="grid gap-2 md:grid-cols-3">
          <select className="rounded border p-2" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{subjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select>
          <input type="date" className="rounded border p-2" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} />
          <button className="rounded bg-indigo-600 p-2 text-white">Add</button>
        </form>
      </Card>
      <Card title="Exam Countdown">
        {exams.map((exam) => {
          const left = daysLeft(exam.examDate);
          return <p key={exam._id} className={left < 7 ? 'text-rose-500' : ''}>{exam.subjectId?.name}: {left} day(s) left</p>;
        })}
      </Card>
    </div>
  );
}
