import { NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "No DB URL" }, { status: 503 });
  }

  // Parse the URL to get connection params
  const parsed = new URL(url);
  const pool = new Pool({
    host: parsed.hostname,
    port: parseInt(parsed.port || "5432"),
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    const result = await pool.query("SELECT 1 as test");
    await pool.end();
    return NextResponse.json({ ok: true, test: result.rows[0].test });
  } catch (e: any) {
    await pool.end().catch(() => {});
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
