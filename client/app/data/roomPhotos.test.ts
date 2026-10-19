import { describe, expect, it } from "vitest";
import {
  isRoomPhotoFilename,
  roomOnePhotos,
  roomPhotosBySlug,
  roomPhotoSource,
} from "./roomPhotos";

describe("room photo manifest", () => {
  it("assigns the three supplied photographs to room one", () => {
    expect(roomOnePhotos).toHaveLength(3);
  });

  it("curates the archive photographs across every open room", () => {
    expect(Object.keys(roomPhotosBySlug)).toHaveLength(20);
    expect(Object.values(roomPhotosBySlug).flat()).toHaveLength(80);
    for (const slug of Object.keys(roomPhotosBySlug).filter(
      (value) => value !== "01" && value !== "19" && value !== "20",
    )) {
      expect(roomPhotosBySlug[slug]).toHaveLength(4);
    }
    expect(roomPhotosBySlug["19"]).toHaveLength(3);
    expect(roomPhotosBySlug["19"].some((photo) => photo.filename === "portrait-15.jpg")).toBe(
      false,
    );
    expect(roomPhotosBySlug["20"]).toHaveLength(6);
    expect(roomPhotosBySlug["20"].every((photo) => photo.filename.startsWith("room-20-"))).toBe(
      true,
    );
  });

  it("features the flower portrait in the April 6, 2026 anniversary room", () => {
    expect(roomPhotosBySlug["13"][0]).toMatchObject({
      filename: "portrait-11.jpg",
      alt: "Smiling portrait holding a bouquet of pink flowers",
    });
  });

  it("only permits the new private room file", () => {
    expect(isRoomPhotoFilename(roomOnePhotos[0].filename)).toBe(true);
    expect(isRoomPhotoFilename("room-19-04.jpeg")).toBe(true);
    expect(isRoomPhotoFilename("room-20-06.jpg")).toBe(true);
    expect(isRoomPhotoFilename("../room-01.jpg")).toBe(false);
    expect(isRoomPhotoFilename("portrait-08.jpg")).toBe(false);
  });

  it("reuses existing portrait assets without duplicating them", () => {
    expect(roomPhotoSource(roomOnePhotos[0])).toContain("/api/room-media/");
    expect(roomPhotoSource(roomOnePhotos[1])).toBe("/api/portrait/portrait-08.jpg");
  });
});
