import { Router, type IRouter } from "express";
import jwt from "jsonwebtoken";
import { eq, and } from "drizzle-orm";
import { db, progressTable } from "@workspace/db";
import { JWT_SECRET } from "./auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function getUserIdFromToken(req: import("express").Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as { sub: string; email: string };
    return payload.sub || null;
  } catch {
    return null;
  }
}

router.get("/guides/:slug/progress", async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const [row] = await db.select()
      .from(progressTable)
      .where(and(eq(progressTable.userId, userId), eq(progressTable.slug, req.params.slug)))
      .limit(1);
    res.json(row || { currentStep: 1, isCompleted: false });
  } catch (err) {
    logger.error({ err }, "Progress GET error");
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

router.put("/guides/:slug/progress", async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { currentStep, isCompleted } = req.body || {};
  try {
    const [existing] = await db.select({ userId: progressTable.userId })
      .from(progressTable)
      .where(and(eq(progressTable.userId, userId), eq(progressTable.slug, req.params.slug)))
      .limit(1);

    if (existing) {
      await db.update(progressTable)
        .set({
          ...(currentStep !== undefined ? { currentStep: Number(currentStep) } : {}),
          ...(isCompleted !== undefined ? { isCompleted: Boolean(isCompleted) } : {}),
          updatedAt: new Date(),
        })
        .where(and(eq(progressTable.userId, userId), eq(progressTable.slug, req.params.slug)));
    } else {
      await db.insert(progressTable).values({
        userId,
        slug: req.params.slug,
        currentStep: currentStep !== undefined ? Number(currentStep) : 1,
        isCompleted: isCompleted !== undefined ? Boolean(isCompleted) : false,
      });
    }
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Progress PUT error");
    res.status(500).json({ error: "Failed to save progress" });
  }
});

export default router;
