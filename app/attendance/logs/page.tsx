// app/attendance/logs/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data-table';
import { columns, AttendanceLog } from './columns';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import { DataTableSkeleton } from '@/components/DataTableSkeleton';
import { ErrorDisplay } from '@/components/ErrorDisplay';

async function getAttendanceLogs(): Promise<AttendanceLog[]> {
  const res = await fetch('/api/attendance');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch attendance logs');
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default function LogsPage() {
  const { data: logs, isLoading, error } = useQuery<AttendanceLog[], Error> ({
    queryKey: ['attendanceLogs'],
    queryFn: getAttendanceLogs,
  });

  const exportToCsv = () => {
    if (!logs) return;

    const headers = ["Date", "Status", "Check In", "Check Out"];
    const csvRows = [
      headers.join(','),
      ...logs.map(log => [log.date, log.status, log.check_in, log.check_out].join(','))
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'attendance_logs.csv');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Attendance Logs</h1>
          <Button disabled>Export to CSV</Button>
        </div>
        <DataTableSkeleton columns={columns.length} />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Attendance Logs</h1>
        <Button onClick={exportToCsv} disabled={!logs || logs.length === 0}>Export to CSV</Button>
      </div>
      <DataTable columns={columns} data={logs || []} />
    </div>
  );
}
