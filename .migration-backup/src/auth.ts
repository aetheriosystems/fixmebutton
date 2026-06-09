import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// --- Build providers list, skipping OAuth if env vars not set ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providers: any[] = [];

// Google — only if keys are configured
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

// GitHub — only if keys are configured
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

// Email/password is always available
providers.push(
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const db = getDb();
      if (!db) return null;

      const email = credentials?.email as string;
      const password = credentials?.password as string;
      if (!email || !password) return null;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase().trim()))
        .limit(1);

      if (!user || !user.passwordHash) return null;

      // Block unverified accounts from signing in
      if (!user.emailVerified) {
        throw new Error(
          "Email not verified. Please check your inbox for the verification link."
        );
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // Create/find DB user on OAuth sign-in (Google/GitHub emails are pre-verified)
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;
      if (!user.email) return true;

      const db = getDb();
      if (!db) return true;

      try {
        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email.toLowerCase().trim()))
          .limit(1);

        if (existing.length === 0) {
          await db.insert(users).values({
            email: user.email.toLowerCase().trim(),
            name: user.name || null,
            image: user.image || null,
            emailVerified: true, // OAuth providers verify emails
          });
        } else {
          await db
            .update(users)
            .set({
              name: user.name || existing[0].name,
              image: user.image || existing[0].image,
              emailVerified: true,
            })
            .where(eq(users.id, existing[0].id));
        }
      } catch (e) {
        console.error("OAuth signIn callback error:", e);
      }
      return true;
    },

    // Persist the DB user ID into the JWT token
    async jwt({ token, user, account }) {
      // Credentials provider passes user.id directly
      if (user?.id) {
        token.id = user.id;
        return token;
      }

      // For OAuth: user was just created/updated in signIn callback.
      // Look up the DB id by email and store it.
      if (account?.provider !== "credentials" && token.email && !token.id) {
        const db = getDb();
        if (db) {
          try {
            const [dbUser] = await db
              .select({ id: users.id })
              .from(users)
              .where(eq(users.email, token.email.toLowerCase().trim()))
              .limit(1);
            if (dbUser) {
              token.id = dbUser.id;
            }
          } catch {
            // DB lookup failed — id stays undefined, session won't have it
          }
        }
      }

      return token;
    },

    // Expose the user ID on the session object
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }
      return true;
    },
  },
});
