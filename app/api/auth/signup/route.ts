// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Email, password, and name are required' }, { status: 400 });
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: "member", // default role
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    // Handle Firebase errors
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
