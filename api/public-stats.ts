
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

export default async function handler(
  request: { method?: string },
  response: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => {
      json: (data: unknown) => void;
      end: () => void;
    };
  }
) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!databaseUrl) {
    return response.status(500).json({
      error: "Analytics database is not configured",
    });
  }

  try {
    const sql = neon(databaseUrl);

    const result = await sql`
      SELECT
        COUNT(*)::int AS total_page_views,
        COUNT(DISTINCT visitor_id)::int AS unique_visitors
      FROM page_views
    `;

    return response.status(200).json(result[0]);
  } catch (error) {
    console.error("Public analytics stats failed:", error);

    return response.status(500).json({
      error: "Unable to load analytics statistics",
    });
  }
}
