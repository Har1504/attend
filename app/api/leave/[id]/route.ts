// app/api/leave/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { checkAdmin } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!await checkAdmin()) {
    return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
  }

  const { status } = await req.json();
  if (!status || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }

  const leaveRequestRef = doc(db, 'leave_requests', params.id);
  const leaveRequestSnap = await getDoc(leaveRequestRef);

  if (!leaveRequestSnap.exists()) {
    return NextResponse.json({ message: 'Leave request not found' }, { status: 404 });
  }

  await updateDoc(leaveRequestRef, { status });

  // Also update the attendance records
  if (status === 'approved') {
    // This is a simplified implementation. A real implementation would need to
    // handle multi-day leave, check for existing records, etc.
    const leaveData = leaveRequestSnap.data();
    // This part needs a more robust implementation to correctly add 'leave' status
    // to the attendance collection for the duration of the leave.
  }

  return NextResponse.json({ message: `Leave request ${status}` });
}
