import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> | null {
  if (_db) return _db;
  if (!process.env.DATABASE_URL) return null;
  try {
    const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
    return _db;
  } catch {
    return null;
  }
}

// Convenience re-export for callers that know DB is available
export { schema };
