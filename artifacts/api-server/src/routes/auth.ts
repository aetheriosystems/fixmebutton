import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be set. Generate with: openssl rand -base64 64");
}

const JWT_EXPIRES_IN = "7d";

function signToken(userId: string, email: string): string {
  return jwt.sign({ sub: userId, email }, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}

router.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  if (typeof password !== "string" || password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  try {
    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, normalizedEmail)).limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "An account with this email already exists. Sign in instead." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = `user_${Date.now()}`;
    const [user] = await db.insert(usersTable).values({
      id,
      email: normalizedEmail,
      name: name || null,
      passwordHash,
      isPremium: false,
    }).returning();

    const token = signToken(user.id, user.email);
    res.status(201).json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, isPremium: user.isPremium },
    });
  } catch (err: unknown) {
    logger.error({ err }, "Signup error");
    res.status(500).json({ error: "Failed to create account" });
  }
});

router.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const normalizedEmail = String(email).toLowerCase().trim();
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, normalizedEmail)).limit(1);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(String(password), user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = signToken(user.id, user.email);
    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, isPremium: user.isPremium },
    });
  } catch (err: unknown) {
    logger.error({ err }, "Signin error");
    res.status(500).json({ error: "Sign in failed" });
  }
});

router.get("/auth/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as { sub: string; email: string };
    const [user] = await db.select({ id: usersTable.id, email: usersTable.email, name: usersTable.name, isPremium: usersTable.isPremium })
      .from(usersTable)
      .where(eq(usersTable.id, payload.sub))
      .limit(1);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export { JWT_SECRET };
export default router;
