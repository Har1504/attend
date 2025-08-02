// app/attendance/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function AttendancePage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClockIn = async () => {
    try {
      const res = await fetch('/api/attendance', { method: 'POST', body: JSON.stringify({ action: 'clock-in' }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Clocked in successfully!');
      setError('');
    } catch (err: any) {
      setError(err.message);
      setMessage('');
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await fetch('/api/attendance', { method: 'POST', body: JSON.stringify({ action: 'clock-out' }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Clocked out successfully!');
      setError('');
    } catch (err: any) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Clock In / Out</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-around">
            <button
              onClick={handleClockIn}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Clock Out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
