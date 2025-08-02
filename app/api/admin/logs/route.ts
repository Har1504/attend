// app/api/admin/logs/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { attendanceRecords } from '@/lib/store';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== 'admin@attendpro.com') {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  return NextResponse.json(attendanceRecords);
}
