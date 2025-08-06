// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getTodaysDate } from '@/lib/utils';
import { checkAdmin } from '@/lib/auth';

export async function GET() {
  if (!await checkAdmin()) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const today = getTodaysDate();

  const usersSnapshot = await getDocs(collection(db, 'users'));
  const totalUsers = usersSnapshot.size;

  const attendanceQuery = query(collection(db, 'attendance'), where('date', '==', today));
  const attendanceSnapshot = await getDocs(attendanceQuery);

  let presentToday = 0;
  let onLeaveToday = 0;

  attendanceSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.status === 'present') {
      presentToday++;
    } else if (data.status === 'leave') {
      onLeaveToday++;
    }
  });

  const absentToday = totalUsers - presentToday - onLeaveToday;

  return NextResponse.json({
    totalUsers,
    presentToday,
    absentToday,
    onLeaveToday,
  });
}
