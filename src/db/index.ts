import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;
  try {
    _db = drizzle(sql, { schema });
    return _db;
  } catch {
    return null;
  }
}

export { schema };
