// app/components/ClientTime.tsx
'use client';
import { useEffect, useState } from 'react';

export default function ClientTime() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="text-sm">🕒 {new Date(time).toLocaleTimeString()}</div>;
}
