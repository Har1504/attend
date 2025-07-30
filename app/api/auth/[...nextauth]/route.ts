import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          { id: "1", email: "admin@attendpro.com", password: await bcrypt.hash("admin123", 10) },
          { id: "2", email: "user@attendpro.com", password: await bcrypt.hash("user123", 10) },
        ];

        const user = users.find(u => u.email === credentials?.email);
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
