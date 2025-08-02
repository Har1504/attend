// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { users, saveData } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: String(users.length + 1), email, password: hashedPassword };

    // Add the new user to the array and save the entire data object
    const updatedData = {
      users: [...users, newUser],
      attendanceRecords: (await import('@/lib/store')).attendanceRecords // get the latest records
    };
    saveData(updatedData);


    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
