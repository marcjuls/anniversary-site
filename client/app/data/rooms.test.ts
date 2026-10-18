import { describe, expect, it } from "vitest";
import { createMuseumRooms, findMuseumRoom, relationshipLabel } from "./rooms";

describe("museum room timeline", () => {
  it("starts Room 01 at midnight in Manila on April 6, 2025", () => {
    const roomsBeforeOpening = createMuseumRooms(
      new Date("2025-04-05T15:59:59.999Z"),
    );
    const roomsAtOpening = createMuseumRooms(
      new Date("2025-04-05T16:00:00.000Z"),
    );

    expect(roomsBeforeOpening[0].status).toBe("future");
    expect(roomsAtOpening[0]).toMatchObject({
      roomNumber: 1,
      slug: "01",
      date: "2025-04-06",
      relationshipLabel: "The Beginning",
      status: "current",
    });
  });

  it("opens each new room on its Manila monthsary boundary", () => {
    const roomsBeforeMay = createMuseumRooms(
      new Date("2025-05-05T15:59:59.999Z"),
    );
    const roomsAtMay = createMuseumRooms(new Date("2025-05-05T16:00:00.000Z"));

    expect(roomsBeforeMay[0].status).toBe("current");
    expect(roomsBeforeMay[1].status).toBe("future");
    expect(roomsAtMay[0].status).toBe("awaiting");
    expect(roomsAtMay[1].status).toBe("current");
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
