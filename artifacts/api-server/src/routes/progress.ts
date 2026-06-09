import { Router, type IRouter } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// In-memory progress store keyed by verified userId::slug
const progressStore = new Map<string, Record<string, unknown>>();

function getUserIdFromToken(req: import("express").Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
    return payload.sub || null;
  } catch {
    return null;
  }
}

function getKey(userId: string, slug: string) {
  return `${userId}::${slug}`;
}

router.get("/guides/:slug/progress", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(userId, req.params.slug);
  const progress = progressStore.get(key) || { currentStep: 1, isCompleted: false };
  res.json(progress);
});

router.put("/guides/:slug/progress", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(userId, req.params.slug);
  const existing = progressStore.get(key) || { currentStep: 1, isCompleted: false };
  const { currentStep, isCompleted } = req.body || {};
  progressStore.set(key, {
    ...existing,
    ...(currentStep !== undefined ? { currentStep: Number(currentStep) } : {}),
    ...(isCompleted !== undefined ? { isCompleted: Boolean(isCompleted) } : {}),
    updatedAt: new Date().toISOString(),
  });
  res.json({ success: true });
});

export default router;
