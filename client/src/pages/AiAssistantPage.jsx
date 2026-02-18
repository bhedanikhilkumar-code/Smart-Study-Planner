import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function AiAssistantPage() {
  const [subjects, setSubjects] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(20);

  useEffect(() => {
    api.get('/subjects').then((res) => setSubjects(res.data));
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      const weakSubjects = subjects.sort((a, b) => b.priority - a.priority).slice(0, 2).map((s) => s.name);
      const { data } = await api.post('/ai/study-plan', {
        weeklyAvailableHours: Number(hours),
        weakSubjects,
        upcomingExams: []
      });
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card title="AI Study Assistant">
        <div className="flex items-center gap-2">
          <input type="number" className="rounded border p-2" value={hours} onChange={(e) => setHours(e.target.value)} />
          <button onClick={generate} className="rounded bg-indigo-600 px-3 py-2 text-white">Generate Plan</button>
        </div>
        {loading ? <p className="mt-2">Generating...</p> : null}
      </Card>
      {result ? (
        <Card title="Personalized Plan (JSON)">
          <pre className="overflow-auto rounded bg-slate-900 p-3 text-xs text-green-300">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      ) : null}
    </div>
  );
}
