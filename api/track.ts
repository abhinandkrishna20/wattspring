
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  request: { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> },
  response: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => {
      json: (data: unknown) => void;
      end: () => void;
    };
  }
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = request.body as {
      visitorId?: string;
      pagePath?: string;
      referrer?: string;
      source?: string;
    };

    const visitorId = body?.visitorId;
    const pagePath = body?.pagePath;

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (
      typeof visitorId !== "string" ||
      !uuidPattern.test(visitorId) ||
      typeof pagePath !== "string" ||
      !/^\/[a-zA-Z0-9/_-]*$/.test(pagePath) ||
      pagePath.length > 200
    ) {
      return response.status(400).json({ error: "Invalid event data" });
    }

    const rawReferrer =
      typeof body.referrer === "string" ? body.referrer : "";

    let referrer: string | null = null;

    try {
      if (rawReferrer) {
        const parsed = new URL(rawReferrer);
        if (parsed.protocol === "https:" || parsed.protocol === "http:") {
          referrer = parsed.origin;
        }
      }
    } catch {
      referrer = null;
    }

    const countryHeader = request.headers["x-vercel-ip-country"];
    const countryValue = Array.isArray(countryHeader)
      ? countryHeader[0]
      : countryHeader;

    const country =
      typeof countryValue === "string" &&
      /^[A-Z]{2}$/.test(countryValue)
        ? countryValue
        : null;

    const allowedSources = [
      "direct",
      "google",
      "social",
      "referral",
      "campaign",
    ];

    const source =
      typeof body.source === "string" &&
      allowedSources.includes(body.source)
        ? body.source
        : referrer
          ? "referral"
          : "direct";

    await sql`
      INSERT INTO page_views
        (visitor_id, page_path, referrer, source, country)
      VALUES
        (${visitorId}::uuid, ${pagePath}, ${referrer}, ${source}, ${country})
    `;

    return response.status(201).json({ success: true });
  } catch (error) {
    console.error("Analytics tracking failed:", error);
    return response.status(500).json({ error: "Unable to record visit" });
  }
}
