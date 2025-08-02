// app/api/attendance/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { users, attendanceRecords, saveData } from '@/lib/store';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { action } = await req.json();
  const userEmail = session.user.email;
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const recordIndex = attendanceRecords.findIndex(
    (r) => r.email === userEmail && r.date === today
  );

  if (action === 'clock-in') {
    if (recordIndex > -1 && attendanceRecords[recordIndex].clockIn) {
      return NextResponse.json({ message: 'Already clocked in today' }, { status: 400 });
    }
    
    if (recordIndex > -1) {
      attendanceRecords[recordIndex].clockIn = now.toISOString();
    } else {
      attendanceRecords.push({
        email: userEmail,
        date: today,
        clockIn: now.toISOString(),
        clockOut: null,
      });
    }
    saveData({ users, attendanceRecords });
    return NextResponse.json({ message: 'Clocked in successfully' });
  }

  if (action === 'clock-out') {
    if (recordIndex === -1 || !attendanceRecords[recordIndex].clockIn) {
      return NextResponse.json({ message: 'You have not clocked in yet' }, { status: 400 });
    }
    if (attendanceRecords[recordIndex].clockOut) {
      return NextResponse.json({ message: 'Already clocked out today' }, { status: 400 });
    }
    attendanceRecords[recordIndex].clockOut = now.toISOString();
    saveData({ users, attendanceRecords });
    return NextResponse.json({ message: 'Clocked out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const userRecords = attendanceRecords.filter((r) => r.email === userEmail);

  return NextResponse.json(userRecords);
}
