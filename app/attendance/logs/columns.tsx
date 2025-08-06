"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AttendanceLog = {
  id: string
  date: string
  status: "present" | "absent" | "leave"
  check_in: string
  check_out: string
}

export const columns: ColumnDef<AttendanceLog>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "check_in",
    header: "Check In",
  },
  {
    accessorKey: "check_out",
    header: "Check Out",
  },
]
