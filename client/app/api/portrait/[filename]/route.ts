import { get } from "@vercel/blob";
import { isPortraitFilename } from "../../../data/portraits";
import { isMuseumUnlocked } from "../../../lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  if (!(await isMuseumUnlocked())) {
    return new Response(null, { status: 404 });
  }

  const { filename } = await params;
  if (!isPortraitFilename(filename)) {
    return new Response(null, { status: 404 });
  }

  const result = await get(filename, {
    access: "private",
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });

  if (!result) {
    return new Response(null, { status: 404 });
  }

  if (result.statusCode === 304) {
    return new Response(null, {
      status: 304,
      headers: { ETag: result.blob.etag },
    });
  }

  return new Response(result.stream, {
    headers: {
      "Cache-Control": "private, max-age=3600, must-revalidate",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Length": String(result.blob.size),
      "Content-Type": result.blob.contentType,
      ETag: result.blob.etag,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
