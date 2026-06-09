import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists. Sign in instead." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomUUID();

    // Insert user (unverified)
    await db.insert(users).values({
      email: normalizedEmail,
      name: name || null,
      passwordHash,
      emailVerified: false,
      verificationToken,
    });

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${verificationToken}`;

    // Log for development (in production, send email)
    console.log(`[SIGNUP] Verification URL for ${normalizedEmail}: ${verifyUrl}`);

    return NextResponse.json({
      success: true,
      message: "Account created! Check your email for a verification link.",
      // Include verification URL in dev so it can be tested
      ...(process.env.NODE_ENV !== "production" ? { verificationUrl: verifyUrl } : {}),
    }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to create account: ${error.message}` },
      { status: 500 }
    );
  }
}
