import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// In-memory user store — replace with DB when DATABASE_URL is configured
const userStore = new Map<string, { id: string; email: string; name: string | null; passwordHash: string }>();

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
    if (userStore.has(normalizedEmail)) {
      res.status(409).json({ error: "An account with this email already exists. Sign in instead." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = `user_${Date.now()}`;
    userStore.set(normalizedEmail, { id, email: normalizedEmail, name: name || null, passwordHash });
    res.status(201).json({ success: true });
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
    const user = userStore.get(normalizedEmail);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(String(password), user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: unknown) {
    logger.error({ err }, "Signin error");
    res.status(500).json({ error: "Sign in failed" });
  }
});

export default router;
