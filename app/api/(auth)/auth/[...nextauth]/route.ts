import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getAffiliateByEmail } from "@/models/affiliates-model";
import { Config } from "@/utils/config";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      status?: string | null;
    };
  }
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    status?: string | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: Config.env.app.jwt_login_expiry,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const user = await getAffiliateByEmail(email);
        if (user === null || user === undefined || !user.data) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.data.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.data.id.toString(),
          email: user.data.email,
          name: user.data.name || null,
          status: user.data.approvalStatus || "pending",
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.status = user.status;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.status = token.status as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

// export { handler as GET, handler as POST };
