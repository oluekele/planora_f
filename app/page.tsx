export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reusable Tailwind Components 🚀</h1>

      <button className="btn btn-primary">Submit</button>
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-primary" disabled>
        Disabled
      </button>
      <button className="btn btn-loading">Loading...</button>

      <input type="text" className="input" placeholder="Enter your name" />
    </main>
  );
}
