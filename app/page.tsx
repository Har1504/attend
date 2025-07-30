// app/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function RootRedirect() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === 'admin@attendpro.com') {
    redirect('/admin');
  } else if (session?.user?.email === 'user@attendpro.com') {
    redirect('/user');
  }

  // Attractive landing UI for unauthenticated users
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to <span className="text-indigo-700">AttendPro</span></h1>
        <p className="text-lg text-gray-700 mb-8">
          Effortless attendance tracking for your organization.<br />
          Secure, fast, and easy to use.
        </p>
        <Link
          href="/signin"
          className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
        >
          Get Started
        </Link>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">Demo accounts:</span>
          <div className="text-xs text-gray-600">
            <span className="font-medium">Admin:</span> admin@attendpro.com
          </div>
          <div className="text-xs text-gray-600">
            <span className="font-medium">User:</span> user@attendpro.com
          </div>
        </div>
      </div>
    </main>
  );
}
