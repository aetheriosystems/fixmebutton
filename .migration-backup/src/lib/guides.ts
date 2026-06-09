import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { CATEGORIES, type Difficulty } from "./constants";

export interface GuideFrontmatter {
  title: string;
  category: string;
  devices?: string[];
  difficulty?: Difficulty;
  time_estimate?: string;
  last_verified?: string;
  search_volume?: number;
  steps?: number;
}

export interface GuideMeta extends GuideFrontmatter {
  slug: string;
  category: string;
}

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export function getAllGuides(): GuideMeta[] {
  const guides: GuideMeta[] = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(GUIDES_DIR, category.slug);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      guides.push({
        slug: file.replace(".mdx", ""),
        category: category.slug,
        title: data.title || file.replace(".mdx", "").replace(/-/g, " "),
        devices: data.devices,
        difficulty: data.difficulty,
        time_estimate: data.time_estimate,
        last_verified: data.last_verified,
        search_volume: data.search_volume,
        steps: data.steps,
      });
    }
  }

  return guides;
}

export function getGuideBySlug(
  category: string,
  slug: string
): { meta: GuideMeta; content: string } | null {
  const filePath = path.join(GUIDES_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      category,
      title: data.title || slug,
      devices: data.devices,
      difficulty: data.difficulty,
      time_estimate: data.time_estimate,
      last_verified: data.last_verified,
      search_volume: data.search_volume,
      steps: data.steps,
    },
    content,
  };
}

export function getGuidesByCategory(category: string): GuideMeta[] {
  return getAllGuides().filter((g) => g.category === category);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
