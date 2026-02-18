import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../services/api';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/analytics/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card title="Today Study Hours"><p className="text-2xl font-bold">{data.dailyStudyHours}</p></Card>
      <Card title="Pending Backlogs"><p className="text-2xl font-bold">{data.pendingBacklogs}</p></Card>
      <Card title="Study Streak"><p className="text-2xl font-bold">{data.streak} days</p></Card>
      <Card title="Upcoming Exams"><p className="text-sm">{data.upcomingExams.map((e) => e.subjectId?.name).join(', ') || 'No exams'}</p></Card>
      <div className="md:col-span-2 lg:col-span-4">
        <Card title="Weekly Productivity by Subject">
          <Bar
            data={{
              labels: data.weeklyProductivity.map((i) => i.name),
              datasets: [{ label: 'Hours', data: data.weeklyProductivity.map((i) => i.hours), backgroundColor: '#6366f1' }]
            }}
          />
        </Card>
      </div>
    </div>
  );
}
