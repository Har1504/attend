"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"

export type LeaveRequest = {
  id: string
  employee: string
  start_date: string
  end_date: string
  status: "pending" | "approved" | "rejected"
}

const updateLeaveStatus = async ({ id, status }: { id: string, status: "approved" | "rejected" }) => {
  const res = await fetch(`/api/leave/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

export const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString(),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const leaveRequest = row.original
      const { toast } = useToast();
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: updateLeaveStatus,
        onSuccess: (data) => {
          toast({
            title: "Success!",
            description: data.message,
          });
          queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
        },
      });
 
      return (
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => mutation.mutate({ id: leaveRequest.id, status: "approved" })}
            disabled={leaveRequest.status !== 'pending' || mutation.isPending}
          >
            Approve
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => mutation.mutate({ id: leaveRequest.id, status: "rejected" })}
            disabled={leaveRequest.status !== 'pending' || mutation.isPending}
          >
            Reject
          </Button>
        </div>
      )
    },
  },
]
