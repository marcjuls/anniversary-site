import { describe, expect, it } from "vitest";
import {
  anniversaryPhotos,
  anniversarySongs,
  isLegacyMediaCategory,
  isLegacyMediaFilename,
  legacyMediaSource,
} from "./legacyMedia";

describe("legacy anniversary media manifest", () => {
  it("keeps the original anniversary collection complete", () => {
    expect(anniversaryPhotos).toHaveLength(8);
    expect(anniversarySongs).toHaveLength(3);
  });

  it("only permits known categories and filenames", () => {
    expect(isLegacyMediaCategory("photos")).toBe(true);
    expect(isLegacyMediaCategory("audio")).toBe(true);
    expect(isLegacyMediaCategory("../photos")).toBe(false);
    expect(isLegacyMediaFilename("photos", "hero-1.jpg")).toBe(true);
    expect(isLegacyMediaFilename("photos", "../hero-1.jpg")).toBe(false);
    expect(isLegacyMediaFilename("audio", "unknown.mp3")).toBe(false);
  });

  it("builds an encoded authenticated media URL", () => {
    expect(legacyMediaSource("audio", "Here With Me (Lyrics).mp3")).toBe(
      "/api/legacy-media/audio/Here%20With%20Me%20(Lyrics).mp3",
    );
  });
});
