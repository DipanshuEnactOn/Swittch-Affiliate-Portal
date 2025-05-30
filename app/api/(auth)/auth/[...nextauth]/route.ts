import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {
  getAffiliateByEmail,
  getAffiliateStatus,
} from "@/models/affiliates-model";
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
    // maxAge: 20,
    updateAge: 5 * 60,
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

        let user;
        try {
          user = await getAffiliateByEmail(email);
        } catch (err) {
          return null;
        }
        if (user === null || user === undefined || !user.data) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.data.password);

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
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.status = user.status;
      } else {
        if (token.email) {
          try {
            const affiliate = await getAffiliateStatus(token.email);
            if (affiliate && affiliate.data) {
              token.status = affiliate.data.status || "pending";
              // console.log("[JWT Callback] Changed Token status:", token.status);
            }
          } catch (error) {
            console.log(error);
            // token.status = user.status;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.status = token.status as string;
        // console.log("[Session Callback] User ID:", session.user.id);
        // console.log("[Session Callback] User Status:", session.user.status);
      }
      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name:
  //       Config.env.app.environment === "PRODUCTION" ||
  //       Config.env.app.environment === "STAGING"
  //         ? `__Secure-next-auth.session-token`
  //         : `next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure:
  //         Config.env.app.environment === "PRODUCTION" ||
  //         Config.env.app.environment === "STAGING",
  //       domain: Config.env.app.root_domain.startsWith(".")
  //         ? Config.env.app.root_domain
  //         : "." + Config.env.app.root_domain,
  //     },
  //   },
  //   // callbackUrl: {
  //   //   name:
  //   //     Config.env.app.environment === "PRODUCTION" ||
  //   //     Config.env.app.environment === "STAGING"
  //   //       ? `__Secure-authjs.callback-url`
  //   //       : `authjs.callback-url`,
  //   //   options: {
  //   //     httpOnly: true,
  //   //     sameSite: "lax",
  //   //     path: "/",
  //   //     secure:
  //   //       Config.env.app.environment === "PRODUCTION" ||
  //   //       Config.env.app.environment === "STAGING",
  //   //     domain: Config.env.app.root_domain.startsWith(".")
  //   //       ? Config.env.app.root_domain
  //   //       : "." + Config.env.app.root_domain,
  //   //   },
  //   // },
  // },

  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
});

// export { handler as GET, handler as POST };
