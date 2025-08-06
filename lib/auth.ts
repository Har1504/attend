// lib/auth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return false;
  }

  const userDocQuery = query(collection(db, 'users'), where('email', '==', session.user.email));
  const userDocSnapshot = await getDocs(userDocQuery);

  if (userDocSnapshot.empty || userDocSnapshot.docs[0].data().role !== 'admin') {
    return false;
  }

  return true;
}
