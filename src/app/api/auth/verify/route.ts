import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=missing-token", req.url)
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=db-unavailable", req.url)
    );
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token))
      .limit(1);

    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/signin?error=invalid-token", req.url)
      );
    }

    // Mark as verified and clear the token
    await db
      .update(users)
      .set({ emailVerified: true, verificationToken: null })
      .where(eq(users.id, user.id));

    return NextResponse.redirect(
      new URL("/auth/signin?verified=true", req.url)
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      new URL("/auth/signin?error=verification-failed", req.url)
    );
  }
}
