import { describe, expect, it } from "vitest";
import { createMuseumRooms, findMuseumRoom, relationshipLabel } from "./rooms";

describe("museum room timeline", () => {
  it("starts Room 01 on April 6, 2025", () => {
    const roomsAtOpening = createMuseumRooms(new Date("2025-04-06T00:00:00Z"));
    expect(roomsAtOpening[0]).toMatchObject({
      roomNumber: 1,
      slug: "01",
      date: "2025-04-06",
      relationshipLabel: "The Beginning",
    });
  });

  it("maps the first anniversary and current room correctly", () => {
    const roomsOnOctober18 = createMuseumRooms(new Date("2026-10-18T00:00:00Z"));
    expect(relationshipLabel(13)).toBe("First Anniversary");
    expect(findMuseumRoom("13", roomsOnOctober18)?.date).toBe("2026-04-06");
    expect(roomsOnOctober18[18]).toMatchObject({
      date: "2026-10-06",
      relationshipLabel: "18th Monthsary",
      status: "current",
    });
  });

  it("reserves rooms through the second anniversary", () => {
    const roomsBeforeSecondAnniversary = createMuseumRooms(new Date("2027-04-05T00:00:00Z"));
    expect(roomsBeforeSecondAnniversary).toHaveLength(25);
    expect(roomsBeforeSecondAnniversary.at(-1)).toMatchObject({
      date: "2027-04-06",
      relationshipLabel: "Second Anniversary",
      status: "future",
    });
  });
});
