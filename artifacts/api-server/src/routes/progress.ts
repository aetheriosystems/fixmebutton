import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// In-memory fallback (no persistent DB for now — replace with real DB when auth is wired)
const progressStore = new Map<string, Record<string, unknown>>();

function getKey(userId: string, slug: string) {
  return `${userId}::${slug}`;
}

router.get("/guides/:slug/progress", async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "";
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(userId, req.params.slug);
  const progress = progressStore.get(key) || { currentStep: 1, completedSteps: [], isCompleted: false };
  res.json(progress);
});

router.put("/guides/:slug/progress", async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "";
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const key = getKey(userId, req.params.slug);
  const existing = progressStore.get(key) || { currentStep: 1, completedSteps: [], isCompleted: false };
  progressStore.set(key, { ...existing, ...req.body, updatedAt: new Date().toISOString() });
  res.json({ success: true });
});

export default router;
