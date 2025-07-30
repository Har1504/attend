// app/admin/page.tsx
'use client';

import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">--</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-semibold">Today’s Check-ins</h2>
          <p className="text-3xl mt-2">--</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-semibold">Absent Users</h2>
          <p className="text-3xl mt-2">--</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Attendance Logs</h2>
        <table className="w-full bg-white shadow rounded-2xl">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Check-In</th>
              <th className="p-3">Check-Out</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Row */}
            <tr>
              <td className="p-3">John Doe</td>
              <td className="p-3">9:00 AM</td>
              <td className="p-3">5:00 PM</td>
              <td className="p-3">2025-07-28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
