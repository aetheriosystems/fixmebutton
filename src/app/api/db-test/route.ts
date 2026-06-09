import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`SELECT 1 as test`;
    return NextResponse.json({ ok: true, test: result.rows[0].test });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
