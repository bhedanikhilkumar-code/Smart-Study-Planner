import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const [s, u] = await Promise.all([api.get('/admin/stats'), api.get('/admin/users')]);
    setStats(s.data); setUsers(u.data);
  };

  useEffect(() => { fetchData(); }, []);

  const cleanup = async () => {
    await api.delete('/admin/inactive-users?days=90');
    fetchData();
  };

  return (
    <div className="space-y-4">
      <Card title="System Statistics">
        {stats ? <p>Total Users: {stats.totalUsers} | Admins: {stats.adminUsers} | Sessions: {stats.totalStudySessions}</p> : 'Loading...'}
      </Card>
      <Card title="User Monitoring">
        <button onClick={cleanup} className="mb-3 rounded bg-rose-600 px-3 py-1 text-white">Delete Inactive Users</button>
        {users.map((u) => <p key={u._id}>{u.name} - {u.email} ({u.role})</p>)}
      </Card>
    </div>
  );
}
