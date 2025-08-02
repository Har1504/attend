// app/attendance/logs/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

interface Log {
  date: string;
  clockIn: string | null;
  clockOut: string | null;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/attendance');
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to fetch logs');
        setLogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">My Attendance Logs</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4">Date</th>
                  <th className="border-b p-4">Clock In</th>
                  <th className="border-b p-4">Clock Out</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.date}>
                    <td className="border-b p-4">{log.date}</td>
                    <td className="border-b p-4">{log.clockIn ? new Date(log.clockIn).toLocaleTimeString() : 'N/A'}</td>
                    <td className="border-b p-4">{log.clockOut ? new Date(log.clockOut).toLocaleTimeString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
