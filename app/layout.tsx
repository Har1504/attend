// app/layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import { Inter } from 'next/font/google';
import SessionProvider from './components/SessionProvider';

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
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
