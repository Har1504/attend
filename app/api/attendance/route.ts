// app/api/attendance/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getTodaysDate } from '@/lib/utils';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { action } = await req.json();
  const userId = session.user.id;
  const now = new Date();
  const today = getTodaysDate();

  const attendanceCollection = collection(db, 'attendance');
  const q = query(attendanceCollection, where('user_id', '==', userId), where('date', '==', today));
  const querySnapshot = await getDocs(q);

  if (action === 'clock-in') {
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      if (docData.check_in) {
        return NextResponse.json({ message: 'Already clocked in today' }, { status: 400 });
      }
    }
    
    await addDoc(attendanceCollection, {
      user_id: userId,
      date: today,
      check_in: now.toISOString(),
      check_out: null,
      status: 'present',
    });
    return NextResponse.json({ message: 'Clocked in successfully' });
  }

  if (action === 'clock-out') {
    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'You have not clocked in yet' }, { status: 400 });
    }
    const docToUpdate = querySnapshot.docs[0];
    if (docToUpdate.data().check_out) {
      return NextResponse.json({ message: 'Already clocked out today' }, { status: 400 });
    }
    await updateDoc(doc(db, 'attendance', docToUpdate.id), {
      check_out: now.toISOString(),
    });
    return NextResponse.json({ message: 'Clocked out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const userId = session.user.id;
  const attendanceCollection = collection(db, 'attendance');
  const q = query(attendanceCollection, where('user_id', '==', userId));
  const querySnapshot = await getDocs(q);

  const userRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(userRecords);
}
