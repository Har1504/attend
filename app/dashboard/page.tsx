'use client';

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/KpiCard";
import { Users, Clock, UserCheck, UserX } from "lucide-react";
import { AttendanceChart } from "@/components/AttendanceChart";
import { StatusPieChart } from "@/components/StatusPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { ErrorDisplay } from "@/components/ErrorDisplay";

interface Stats {
  totalUsers: number;
  presentToday: number;
  absentToday: number;
  onLeaveToday: number;
}

interface ChartData {
  weeklyData: any[];
  statusData: any[];
}

const fetchStats = async (): Promise<Stats> => {
  const res = await fetch('/api/admin/stats');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch stats');
  }
  return res.json();
};

const fetchChartData = async (): Promise<ChartData> => {
  const res = await fetch('/api/admin/chart-data');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch chart data');
  }
  return res.json();
};

export default function Dashboard() {
  const { status: sessionStatus } = useSession({ required: true });

  const { data: stats, isLoading: isLoadingStats, error: errorStats } = useQuery<Stats, Error>({
    queryKey: ['adminStats'],
    queryFn: fetchStats,
  });

  const { data: chartData, isLoading: isLoadingChartData, error: errorChartData } = useQuery<ChartData, Error>({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  if (sessionStatus === "loading" || isLoadingStats || isLoadingChartData) {
    return <DashboardSkeleton />;
  }

  if (errorStats || errorChartData) {
    return <ErrorDisplay message={errorStats?.message || errorChartData?.message || "Could not load dashboard data."} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Employees"
          value={stats?.totalUsers ?? 0}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <KpiCard
          title="Present Today"
          value={stats?.presentToday ?? 0}
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <KpiCard
          title="Absent Today"
          value={stats?.absentToday ?? 0}
          icon={<UserX className="h-4 w-4 text-muted-foreground" />}
        />
        <KpiCard
          title="On Leave"
          value={stats?.onLeaveToday ?? 0}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceChart data={chartData?.weeklyData || []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={chartData?.statusData || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
