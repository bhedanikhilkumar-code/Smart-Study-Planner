import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../hooks/useDarkMode';

const tabs = [
  ['/', 'Dashboard'],
  ['/subjects', 'Subjects'],
  ['/planner', 'Planner'],
  ['/backlogs', 'Backlogs'],
  ['/exams', 'Exams'],
  ['/assistant', 'AI Assistant'],
  ['/admin', 'Admin']
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { dark, setDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-lg font-bold">📚 Smart Study Planner</Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">
              {dark ? 'Light' : 'Dark'}
            </button>
            {user ? (
              <>
                <span className="text-sm">{user.name} ({user.role})</span>
                <button onClick={logout} className="rounded bg-rose-500 px-3 py-1 text-sm text-white">Logout</button>
              </>
            ) : null}
          </div>
        </div>
        {user ? (
          <nav className="mx-auto mt-3 flex max-w-7xl flex-wrap gap-2">
            {tabs.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded px-3 py-1 text-sm ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </div>
  );
}
