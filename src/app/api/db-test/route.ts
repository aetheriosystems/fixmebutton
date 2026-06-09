import { NextResponse } from "next/server";
import { getDb } from "@/db";

export async function GET() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "No DB connection" }, { status: 503 });
  }
  try {
    const result = await db.execute("SELECT 1 as test");
    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack?.split("\n")[0] }, { status: 500 });
  }
}
