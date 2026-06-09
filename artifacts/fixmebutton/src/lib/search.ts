import { getAllGuides } from "./guides";
import * as fs from "fs";
import * as path from "path";

// Generate search index at build time
export function generateSearchIndex(): void {
  const guides = getAllGuides();
  const index = guides.map((g) => ({
    slug: `${g.category}/${g.slug}`,
    title: g.title,
    category: g.category,
    devices: g.devices || [],
    difficulty: g.difficulty || "beginner",
    time_estimate: g.time_estimate || "",
  }));

  const outDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "search-index.json"),
    JSON.stringify(index)
  );
}
