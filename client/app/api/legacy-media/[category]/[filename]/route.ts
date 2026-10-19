import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  isLegacyMediaCategory,
  isLegacyMediaFilename,
} from "../../../../data/legacyMedia";
import { isMuseumUnlocked } from "../../../../lib/session";

function byteRange(rangeHeader: string | null, size: number) {
  const match = rangeHeader?.match(/^bytes=(\d+)-(\d*)$/);
  if (!match) return null;

  const start = Number(match[1]);
  const requestedEnd = match[2] ? Number(match[2]) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || start > requestedEnd || start >= size) {
    return null;
  }

  return { start, end: Math.min(requestedEnd, size - 1) };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; filename: string }> },
) {
  if (!(await isMuseumUnlocked())) {
    return new Response(null, { status: 404 });
  }

  const { category, filename } = await params;
  if (!isLegacyMediaCategory(category) || !isLegacyMediaFilename(category, filename)) {
    return new Response(null, { status: 404 });
  }

  const media = await readFile(join(process.cwd(), "legacy-media", category, filename));
  const contentType = category === "audio" ? "audio/mpeg" : "image/jpeg";
  const range = byteRange(request.headers.get("range"), media.byteLength);
  const headers = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, max-age=3600, must-revalidate",
    "Content-Disposition": `inline; filename="${filename}"`,
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
  };

  if (range) {
    const body = media.subarray(range.start, range.end + 1);
    return new Response(body, {
      status: 206,
      headers: {
        ...headers,
        "Content-Length": String(body.byteLength),
        "Content-Range": `bytes ${range.start}-${range.end}/${media.byteLength}`,
      },
    });
  }

  return new Response(media, {
    headers: { ...headers, "Content-Length": String(media.byteLength) },
  });
}
