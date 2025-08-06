// app/api/leave/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { checkAdmin } from '@/lib/auth';

// Create a new leave request
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { startDate, endDate, reason } = await req.json();
  if (!startDate || !endDate || !reason) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  await addDoc(collection(db, 'leave_requests'), {
    user_id: session.user.id,
    start_date: startDate,
    end_date: endDate,
    reason: reason,
    status: 'pending',
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ message: 'Leave request submitted successfully' }, { status: 201 });
}

// Get all leave requests (for admins)
export async function GET() {
  if (!await checkAdmin()) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const leaveRequestsSnapshot = await getDocs(collection(db, 'leave_requests'));
  const leaveRequests = leaveRequestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch user details for each leave request
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const usersMap = new Map(users.map(user => [user.id, user.name]));

  const populatedLeaveRequests = leaveRequests.map(request => ({
    ...request,
    employee: usersMap.get(request.user_id) || 'Unknown User',
  }));

  return NextResponse.json(populatedLeaveRequests);
}
