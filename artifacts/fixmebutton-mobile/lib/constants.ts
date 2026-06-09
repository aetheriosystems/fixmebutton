export const SITE_NAME = "FixMeButton";

export const CATEGORIES = [
  {
    slug: "smartphones",
    name: "Smartphones",
    description: "iPhone & Android guides",
    icon: "phone-portrait-outline" as const,
    featherIcon: "smartphone" as const,
  },
  {
    slug: "computers",
    name: "Computers",
    description: "Windows & Mac guides",
    icon: "laptop-outline" as const,
    featherIcon: "monitor" as const,
  },
  {
    slug: "tvs-streaming",
    name: "TVs & Streaming",
    description: "Roku, Fire TV, Smart TVs",
    icon: "tv-outline" as const,
    featherIcon: "tv" as const,
  },
  {
    slug: "internet-wifi",
    name: "Internet & WiFi",
    description: "Router setup, slow internet",
    icon: "wifi-outline" as const,
    featherIcon: "wifi" as const,
  },
  {
    slug: "email-accounts",
    name: "Email & Accounts",
    description: "Gmail, Outlook, recovery",
    icon: "mail-outline" as const,
    featherIcon: "mail" as const,
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
