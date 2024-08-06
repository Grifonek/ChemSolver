import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);
        console.log(existingUser);

        if (!existingUser)
          await createUser({ email: user.email, fullName: user.name });

        console.log(existingUser);
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getUser(session.user.email);
      session.user.guestId = guest.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
