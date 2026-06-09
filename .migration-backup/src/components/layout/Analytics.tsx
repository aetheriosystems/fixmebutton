"use client";

import Script from "next/script";

export function Analytics() {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return null;
  }

  return (
    <Script
      defer
      data-domain="fixmebutton.com"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
