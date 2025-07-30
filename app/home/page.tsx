// app/home/page.tsx
'use client';

import React from 'react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to AttendPro</h1>
        <p className="mt-4 text-gray-600">Select a section from the navbar to get started.</p>
      </div>
    </>
  );
}
