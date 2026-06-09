import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { guideProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";

interface Props {
  params: Promise<{ slug: string }>;
}

// GET — Read progress
export async function GET(req: Request, { params }: Props) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ currentStep: 1, completedSteps: [], isCompleted: false });
  }

  const { slug } = await params;

  try {
    const [progress] = await db
      .select()
      .from(guideProgress)
      .where(
        and(
          eq(guideProgress.userId, session.user.email),
          eq(guideProgress.guideSlug, slug)
        )
      )
      .limit(1);

    if (!progress) {
      return NextResponse.json({ currentStep: 1, completedSteps: [], isCompleted: false });
    }

    return NextResponse.json({
      currentStep: progress.currentStep,
      completedSteps: progress.completedSteps || [],
      totalSteps: progress.totalSteps,
      isCompleted: progress.isCompleted,
    });
  } catch {
    return NextResponse.json({ currentStep: 1, completedSteps: [], isCompleted: false });
  }
}

// PUT — Save progress
export async function PUT(req: Request, { params }: Props) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ success: true, db: "unavailable" });
  }

  const { slug } = await params;
  const body = await req.json();
  const { currentStep, isCompleted } = body;

  try {
    await db
      .insert(guideProgress)
      .values({
        userId: session.user.email,
        guideSlug: slug,
        currentStep: currentStep || 1,
        totalSteps: 12,
        isCompleted: isCompleted || false,
      })
      .onConflictDoUpdate({
        target: [guideProgress.userId, guideProgress.guideSlug],
        set: {
          currentStep: currentStep,
          isCompleted: isCompleted || false,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
