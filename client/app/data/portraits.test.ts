import { describe, expect, it } from "vitest";
import { isPortraitFilename, portraitSource, portraits } from "./portraits";

describe("portrait exhibit manifest", () => {
  it("contains the curated twenty-three-frame exhibit", () => {
    expect(portraits).toHaveLength(23);
    expect(new Set(portraits.map((portrait) => portrait.filename)).size).toBe(23);
    expect(portraits.some((portrait) => portrait.filename === "portrait-15.jpg")).toBe(false);
  });

  it("only permits known private portrait filenames", () => {
    expect(isPortraitFilename("portrait-01.jpg")).toBe(true);
    expect(isPortraitFilename("portrait-10.jpg")).toBe(true);
    expect(isPortraitFilename("portrait-24.jpg")).toBe(true);
    expect(isPortraitFilename("portrait-15.jpg")).toBe(false);
    expect(isPortraitFilename("portrait-25.jpg")).toBe(false);
    expect(isPortraitFilename("../portrait-01.jpg")).toBe(false);
    expect(isPortraitFilename("anything-else.jpg")).toBe(false);
  });

  it("serves portraits through the authenticated museum route", () => {
    expect(portraitSource("portrait-01.jpg")).toBe("/api/portrait/portrait-01.jpg");
  });
});
