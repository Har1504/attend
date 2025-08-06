import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { subDays, format } from 'date-fns';

export async function GET() {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(today, i);
    return format(date, 'yyyy-MM-dd');
  });

  const attendanceCollection = collection(db, 'attendance');
  const q = query(attendanceCollection, where('date', 'in', last7Days));
  const querySnapshot = await getDocs(q);

  const weeklyData = last7Days.map(date => {
    const dayOfWeek = format(new Date(date), 'E');
    const recordsForDay = querySnapshot.docs.filter(doc => doc.data().date === date);
    const present = recordsForDay.filter(doc => doc.data().status === 'present').length;
    const absent = recordsForDay.filter(doc => doc.data().status === 'absent').length;
    return { name: dayOfWeek, present, absent };
  }).reverse();

  const allAttendanceSnapshot = await getDocs(collection(db, 'attendance'));
  let presentCount = 0;
  let absentCount = 0;
  let leaveCount = 0;

  allAttendanceSnapshot.forEach(doc => {
    const status = doc.data().status;
    if (status === 'present') presentCount++;
    else if (status === 'absent') absentCount++;
    else if (status === 'leave') leaveCount++;
  });

  const statusData = [
    { name: 'Present', value: presentCount },
    { name: 'Absent', value: absentCount },
    { name: 'On Leave', value: leaveCount },
  ];

  return NextResponse.json({ weeklyData, statusData });
}
