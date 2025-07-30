'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/admin'); // or wherever the dashboard is
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
        <input
          className="border px-4 py-2 w-full"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border px-4 py-2 w-full"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Sign In
        </button>
      </form>
    </main>
  );
}
