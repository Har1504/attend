'use client';

import { useState } from 'react';

interface LogEntry {
  action: 'Clock In' | 'Clock Out';
  timestamp: string;
}

export default function ClockInOut() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const handleAction = (action: 'Clock In' | 'Clock Out') => {
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, { action, timestamp }]);
  };

  const downloadCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Action,Timestamp\n' +
      logs.map(log => `${log.action},${log.timestamp}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'attendance_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => handleAction('Clock In')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Clock In
        </button>
        <button
          onClick={() => handleAction('Clock Out')}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clock Out
        </button>
      </div>

      <button
        onClick={downloadCSV}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export as CSV
      </button>

      <div className="mt-6 w-full max-w-md">
        <h3 className="font-bold text-lg mb-2">Logs:</h3>
        <ul className="bg-white shadow rounded p-4 space-y-2">
          {logs.map((log, index) => (
            <li key={index} className="text-sm text-gray-800">
              {log.action} at {log.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
