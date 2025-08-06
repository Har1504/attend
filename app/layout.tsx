// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import SessionProvider from '@/components/SessionProvider';
import { Sidebar } from '@/components/Sidebar';
import { QueryProvider } from '@/components/QueryProvider';
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AttendPro',
  description: 'Track attendance seamlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <QueryProvider>
            <div className="flex h-full">
              <Sidebar />
              <main className="flex-1 h-full pl-60">
                <Navbar />
                {children}
              </main>
            </div>
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
