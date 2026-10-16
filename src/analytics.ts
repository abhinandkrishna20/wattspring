
const VISITOR_ID_KEY = "wattspring_visitor_id";

function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

function getTrafficSource(): string {
  const params = new URLSearchParams(window.location.search);

  if (params.has("utm_source")) return "campaign";

  const referrer = document.referrer;

  if (!referrer) return "direct";

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();

    if (
      hostname === "google.com" ||
      hostname.endsWith(".google.com")
    ) {
      return "google";
    }

    if (
      hostname.includes("facebook.com") ||
      hostname.includes("instagram.com") ||
      hostname.includes("linkedin.com") ||
      hostname.includes("youtube.com") ||
      hostname.includes("t.co") ||
      hostname.includes("x.com")
    ) {
      return "social";
    }

    return "referral";
  } catch {
    return "direct";
  }
}

export async function trackPageView(pagePath: string): Promise<void> {
  try {
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        pagePath,
        referrer: document.referrer,
        source: getTrafficSource(),
      }),
    });

    if (!response.ok) {
      console.error("Analytics tracking failed:", response.status);
    }
  } catch (error) {
    console.error("Unable to send analytics event:", error);
  }
}
