export type LegacyMediaCategory = "photos" | "audio";

const legacyMedia = {
  photos: [
    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "photo-6.jpg",
    "photo-7.jpg",
    "photo-8.jpg",
  ],
  audio: [
    "blue.mp3",
    "Rico Blanco - Balisong Transformed 2016.mp3",
    "d4vd - Here With Me (Lyrics).mp3",
  ],
} as const;

export function isLegacyMediaCategory(value: string): value is LegacyMediaCategory {
  return value === "photos" || value === "audio";
}

export function isLegacyMediaFilename(category: LegacyMediaCategory, filename: string) {
  return (legacyMedia[category] as readonly string[]).includes(filename);
}

export function legacyMediaSource(category: LegacyMediaCategory, filename: string) {
  return `/api/legacy-media/${category}/${encodeURIComponent(filename)}`;
}

export const anniversaryPhotos = legacyMedia.photos;
export const anniversarySongs = legacyMedia.audio;
