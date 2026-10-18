import { describe, expect, it } from "vitest";
import { isPortraitFilename, portraitSource, portraits } from "./portraits";

describe("portrait exhibit manifest", () => {
  it("contains the complete ten-frame exhibit", () => {
    expect(portraits).toHaveLength(10);
    expect(new Set(portraits.map((portrait) => portrait.filename)).size).toBe(10);
  });

  it("only permits known private portrait filenames", () => {
    expect(isPortraitFilename("portrait-01.jpg")).toBe(true);
    expect(isPortraitFilename("portrait-10.jpg")).toBe(true);
    expect(isPortraitFilename("../portrait-01.jpg")).toBe(false);
    expect(isPortraitFilename("anything-else.jpg")).toBe(false);
  });

  it("serves portraits through the authenticated museum route", () => {
    expect(portraitSource("portrait-01.jpg")).toBe("/api/portrait/portrait-01.jpg");
  });
});
