import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No DATABASE_URL" }, { status: 503 });
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT 1 as test`;
    return NextResponse.json({ ok: true, result: result[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
