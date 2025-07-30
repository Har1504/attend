'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  console.log('Session:', session);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">AttendPro</Link>
        <div className="flex items-center gap-4">
          {!session && (
            <Link href="/signin">Sign In</Link>
          )}

          {session?.user?.email === 'admin@attendpro.com' && (
            <>
              <Link href="/admin">Admin Dashboard</Link>
              <Link href="/user">User Dashboard</Link>
            </>
          )}

          {session?.user?.email === 'user@attendpro.com' && (
            <Link href="/user">User Dashboard</Link>
          )}

          {session && (
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
