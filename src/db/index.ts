import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;
  if (!process.env.DATABASE_URL) return null;
  try {
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
    return _db;
  } catch {
    return null;
  }
}

export { schema };
