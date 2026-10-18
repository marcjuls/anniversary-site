import { describe, expect, it } from "vitest";
import { isRoomPhotoFilename, roomOnePhotos, roomPhotoSource } from "./roomPhotos";

describe("room photo manifest", () => {
  it("assigns the three supplied photographs to room one", () => {
    expect(roomOnePhotos).toHaveLength(3);
  });

  it("only permits the new private room file", () => {
    expect(isRoomPhotoFilename(roomOnePhotos[0].filename)).toBe(true);
    expect(isRoomPhotoFilename("../room-01.jpg")).toBe(false);
    expect(isRoomPhotoFilename("portrait-08.jpg")).toBe(false);
  });

  it("reuses existing portrait assets without duplicating them", () => {
    expect(roomPhotoSource(roomOnePhotos[0])).toContain("/api/room-media/");
    expect(roomPhotoSource(roomOnePhotos[1])).toBe("/api/portrait/portrait-08.jpg");
  });
});
