// app/admin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface Stats {
  totalUsers: number;
  todaysCheckIns: number;
  absentUsers: number;
}

interface Log {
  email: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/logs'),
        ]);

        if (!statsRes.ok || !logsRes.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const statsData = await statsRes.json();
        const logsData = await logsRes.json();

        setStats(statsData);
        setLogs(logsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-2xl p-4">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl mt-2">{stats?.totalUsers ?? '--'}</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4">
              <h2 className="text-xl font-semibold">Today’s Check-ins</h2>
              <p className="text-3xl mt-2">{stats?.todaysCheckIns ?? '--'}</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-4">
              <h2 className="text-xl font-semibold">Absent Users</h2>
              <p className="text-3xl mt-2">{stats?.absentUsers ?? '--'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Attendance Logs</h2>
            <table className="w-full bg-white shadow rounded-2xl">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Email</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Check-In</th>
                  <th className="p-3">Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td className="p-3">{log.email}</td>
                    <td className="p-3">{log.date}</td>
                    <td className="p-3">{log.clockIn ? new Date(log.clockIn).toLocaleTimeString() : 'N/A'}</td>
                    <td className="p-3">{log.clockOut ? new Date(log.clockOut).toLocaleTimeString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
