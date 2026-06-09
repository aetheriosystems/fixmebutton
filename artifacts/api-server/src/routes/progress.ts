import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// In-memory store keyed by a hashed/opaque session token — no client-controlled user ID
const progressStore = new Map<string, Record<string, unknown>>();

function extractToken(req: import("express").Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  return token || null;
}

function getKey(token: string, slug: string) {
  return `${token}::${slug}`;
}

router.get("/guides/:slug/progress", (req, res) => {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(token, req.params.slug);
  const progress = progressStore.get(key) || { currentStep: 1, completedSteps: [], isCompleted: false };
  res.json(progress);
});

router.put("/guides/:slug/progress", (req, res) => {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(token, req.params.slug);
  const existing = progressStore.get(key) || { currentStep: 1, completedSteps: [], isCompleted: false };
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
