import { getRatingByProductSlug } from "@/server/rating/rating-service";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  const page = request.nextUrl.searchParams.get("page");
  if (!page) {
    return Response.json([]);
  }

  const results = await getRatingByProductSlug({
    slug,
    page: parseInt(page),
    take: 4,
  });
  const response = Response.json(results);
  // cache for 10 minutes
  response.headers.set("Cache-Control", "public, max-age=600");
  return response;
}
