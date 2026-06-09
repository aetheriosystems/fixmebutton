import type { GuideMeta } from "@/lib/guides";
import { SITE_URL } from "./constants";

export function generateHowToSchema(guide: GuideMeta): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: `Step-by-step guide: ${guide.title}. ${guide.time_estimate ? `Estimated time: ${guide.time_estimate}.` : ""}`,
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    ...(guide.time_estimate && {
      totalTime: `PT${guide.time_estimate.replace(/\D/g, "")}M`,
    }),
    step: Array.from({ length: guide.steps || 5 }, (_, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Step ${i + 1}`,
    })),
    tool: guide.devices?.map((d) => ({
      "@type": "HowToTool",
      name: d,
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
