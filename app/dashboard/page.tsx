'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <button onClick={() => signIn()}>Sign In</button>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <p className="mb-4">Email: {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
