export default function UserDashboard() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome, user! Here you can manage your attendance.</p>
        <div className="flex flex-col gap-4 mt-6">
          <a
            href="/attendance"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Clock In / Out
          </a>
          <a
            href="/attendance/logs"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            View Attendance Logs
          </a>
        </div>
      </div>
    </main>
  );
}