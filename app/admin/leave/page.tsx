"use client"

import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/app/attendance/logs/data-table"
import { columns, LeaveRequest } from "./columns"
import { withAdminAuth } from "@/components/withAdminAuth"
import { DataTableSkeleton } from "@/components/DataTableSkeleton"
import { ErrorDisplay } from "@/components/ErrorDisplay"

async function getLeaveRequests(): Promise<LeaveRequest[]> {
  const res = await fetch('/api/leave');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch leave requests');
  }
  return res.json();
}

function LeaveAdminPage() {
  const { data, isLoading, error } = useQuery<LeaveRequest[], Error>({
    queryKey: ['leaveRequests'],
    queryFn: getLeaveRequests,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Leave Requests</h1>
        <DataTableSkeleton columns={columns.length} />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Leave Requests</h1>
      <DataTable columns={columns} data={data || []} />
    </div>
  )
}

export default withAdminAuth(LeaveAdminPage);
