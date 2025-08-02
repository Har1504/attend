// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { users, attendanceRecords } from '@/lib/store';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== 'admin@attendpro.com') {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const today = new Date().toISOString().split('T')[0];
  const todaysCheckIns = attendanceRecords.filter(
    (r) => r.date === today && r.clockIn
  ).length;

  const totalUsers = users.length;
  const absentUsers = totalUsers - todaysCheckIns;

  return NextResponse.json({
    totalUsers,
    todaysCheckIns,
    absentUsers,
  });
}
