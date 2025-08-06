// lib/hooks/use-user.ts
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  created_at: string;
}

const fetchUser = async (email: string | null | undefined): Promise<UserProfile | null> => {
  if (!email) return null;

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() } as UserProfile;
};

export const useUser = () => {
  const { data: session } = useSession();
  return useQuery<UserProfile | null>({
    queryKey: ['user', session?.user?.email],
    queryFn: () => fetchUser(session?.user?.email),
    enabled: !!session?.user?.email, // Only run if the session and email exist
  });
};
