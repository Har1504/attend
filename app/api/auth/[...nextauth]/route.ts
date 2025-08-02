import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

const readUsers = () => {
  try {
    const jsonString = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(jsonString).users;
  } catch (error) {
    console.error("Failed to read or parse db.json", error);
    return [];
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = readUsers(); // Read the latest user data on every login attempt
        const user = users.find((u: any) => u.email === credentials?.email);
        
        if (user && credentials?.password && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
