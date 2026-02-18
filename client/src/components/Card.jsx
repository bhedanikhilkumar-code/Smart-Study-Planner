export default function Card({ title, children }) {
  return (
    <section className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
