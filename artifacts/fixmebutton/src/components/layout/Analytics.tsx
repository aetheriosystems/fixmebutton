import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    if (window.location.hostname === "localhost") return;
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", "fixmebutton.com");
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }, []);

  return null;
}
