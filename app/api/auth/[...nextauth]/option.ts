import { AuthOptions, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // user hanya ada saat sign in pertama kali
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // Ensure token.id exists for compatibility with the session callback
      if (!token.id) {
        token.id = token.sub as string;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
