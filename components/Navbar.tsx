'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-background border-b h-20 flex items-center px-6 justify-between">
      <div>
        {/* Can add breadcrumbs or page titles here later */}
      </div>
      <div className="flex items-center gap-x-4">
        {session ? (
          <>
            <Button variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
            <UserAvatar
              username={session.user?.name || "User"}
              imageUrl={session.user?.image || ""}
            />
          </>
        ) : (
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
