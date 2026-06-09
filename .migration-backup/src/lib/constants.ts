export const SITE_NAME = "FixMeButton";
export const SITE_URL = "https://fixmebutton.com";
export const SITE_DESCRIPTION =
  "Step-by-step tech troubleshooting guides for non-technical users. Fix your phone, computer, TV, and more — one button at a time.";

export const CATEGORIES = [
  {
    slug: "smartphones",
    name: "Smartphones",
    description: "iPhone & Android guides",
    icon: "📱",
  },
  {
    slug: "computers",
    name: "Computers",
    description: "Windows & Mac guides",
    icon: "💻",
  },
  {
    slug: "tvs-streaming",
    name: "TVs & Streaming",
    description: "Roku, Fire TV, Apple TV, Smart TVs",
    icon: "📺",
  },
  {
    slug: "internet-wifi",
    name: "Internet & WiFi",
    description: "Router setup, slow internet fixes",
    icon: "🌐",
  },
  {
    slug: "email-accounts",
    name: "Email & Accounts",
    description: "Gmail, Outlook, account recovery",
    icon: "📧",
  },
] as const;

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
export type Category = (typeof CATEGORIES)[number];
