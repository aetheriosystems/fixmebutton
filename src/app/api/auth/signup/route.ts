import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

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
    try {
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
    } catch (dbErr: any) {
      console.error("DB check error:", dbErr.message, dbErr.stack);
      return NextResponse.json({ error: "Database error checking email" }, { status: 500 });
    }

    // Hash password
    let passwordHash: string;
    try {
      passwordHash = await bcrypt.hash(password, 12);
    } catch (hashErr: any) {
      console.error("Bcrypt error:", hashErr.message);
      return NextResponse.json({ error: "Password hashing failed" }, { status: 500 });
    }

    // Insert user
    try {
      await db.insert(users).values({
        email: normalizedEmail,
        name: name || null,
        passwordHash,
      });
    } catch (insertErr: any) {
      console.error("Insert error:", insertErr.message, insertErr.stack);
      return NextResponse.json({ error: `Database insert failed: ${insertErr.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to create account: ${error.message}` },
      { status: 500 }
    );
  }
}
