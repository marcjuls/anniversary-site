export type RoomStatus = "awaiting" | "current" | "future";

export type MuseumRoom = {
  roomNumber: number;
  slug: string;
  date: string;
  dateLabel: string;
  relationshipLabel: string;
  designName: string;
  description: string;
  motif: string;
  palette: {
    background: string;
    surface: string;
    accent: string;
    ink: string;
  };
  status: RoomStatus;
};

const designs = [
  ["First Light Rotunda", "Where the museum begins: quiet, luminous, and full of possibility.", "sunburst", "#17120f", "#f4e8d7", "#c89d5e", "#231a14"],
  ["Pressed Flower Cabinet", "A botanical room made for tender first-month memories.", "pressed-flower", "#162019", "#eef0df", "#a76f78", "#1e261d"],
  ["Moonlit Cinema", "A widescreen exhibit with film frames, subtitles, and midnight blue light.", "film", "#090d18", "#e8e0d2", "#8da4d8", "#151827"],
  ["Handwritten Archive", "Layered notes, envelopes, stamps, and words worth keeping.", "letter", "#231918", "#f4e9dc", "#b56b62", "#2f201d"],
  ["Seaside Promenade", "An airy room shaped by horizon lines and salt-washed color.", "wave", "#0e2529", "#e7f0ed", "#77aeb1", "#163034"],
  ["Vinyl Listening Salon", "A warm listening room for songs that became part of the story.", "record", "#1d1217", "#f0dfd2", "#d07b78", "#2a171f"],
  ["Constellation Hall", "Memories arranged like stars across a deep observatory ceiling.", "stars", "#080d1d", "#e6e1cf", "#b8a3d9", "#12182b"],
  ["Velvet Portrait Room", "A dramatic gallery of portraits framed in wine and antique gold.", "velvet", "#260e17", "#f1e3d1", "#bb8a4d", "#321420"],
  ["Autumn Glasshouse", "Warm amber light, falling leaves, and photographs suspended in glass.", "leaves", "#241a10", "#f2e7d4", "#c67a43", "#332417"],
  ["Candlelight Gallery", "A soft, intimate exhibition lit like a table for two.", "candle", "#1b1110", "#f5e4ca", "#d29a55", "#2a1916"],
  ["Contact Sheet Studio", "An editorial photography room filled with frames and annotations.", "contact-sheet", "#121212", "#eeeeea", "#d44e54", "#1c1c1c"],
  ["Clockmaker's Hall", "A room about time, rituals, and all the minutes that became ours.", "clock", "#111b1c", "#e7e2d3", "#9c8361", "#1b292a"],
  ["Anniversary Rotunda", "The grand first-year hall, designed as the museum's central celebration.", "rotunda", "#260d1b", "#f7e8da", "#d1a159", "#361226"],
  ["Watercolor Garden", "A fluid gallery of painted edges, blooms, and gentle color.", "watercolor", "#18231f", "#eef0e5", "#c7869a", "#23302b"],
  ["Ticket & Postcard Archive", "A travel-inspired room for places, receipts, and little souvenirs.", "ticket", "#1d2022", "#eee3ce", "#bc7657", "#2a2b2b"],
  ["Sunlit Atelier", "An open studio with warm linen, sketches, and bright afternoon light.", "atelier", "#242016", "#f4ebd6", "#d19e4b", "#332c1d"],
  ["Midnight Rooftop", "A city-night exhibit with glowing windows and quiet conversations.", "skyline", "#080d16", "#e7e4dc", "#728ebd", "#121927"],
  ["Theatre of Us", "A theatrical room of curtains, spotlights, and favorite scenes.", "curtain", "#22090f", "#f2dfca", "#cc6f66", "#310e17"],
  ["Rose Conservatory", "The newest open room: living, romantic, and still being curated.", "rose", "#171813", "#f2eadf", "#c67b8f", "#24231c"],
  ["Winter Observatory", "A future room waiting behind frosted glass and silver light.", "frost", "#111a22", "#ebeff0", "#8aa5b4", "#1b2730"],
  ["Film Negative Lab", "A future darkroom for candid frames and imperfect favorites.", "negative", "#101010", "#ece8dc", "#b66f4e", "#1c1a18"],
  ["Travel Trunk Room", "A future cabinet of maps, luggage tags, and shared destinations.", "map", "#1d1b13", "#eee6d1", "#a98b55", "#2b281b"],
  ["Mirrored Ballroom", "A future celebration room made for movement and reflection.", "mirror", "#17131d", "#eee7ef", "#ad8bb7", "#241e2a"],
  ["Memory Library", "A future reading room where every shelf holds a chapter.", "books", "#171712", "#eee4ce", "#9e6f55", "#27231b"],
  ["Second-Year Grand Hall", "A future landmark room reserved for the second anniversary.", "grand-hall", "#200e18", "#f6eadc", "#d7aa59", "#311421"],
] as const;

const MANILA_UTC_OFFSET_MS = 8 * 60 * 60 * 1_000;

function roomDateTimestamp(index: number) {
  return Date.UTC(2025, 3 + index, 6);
}

function roomOpeningTimestamp(index: number) {
  return roomDateTimestamp(index) - MANILA_UTC_OFFSET_MS;
}

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

export function relationshipLabel(roomNumber: number) {
  if (roomNumber === 1) return "The Beginning";
  const completedMonths = roomNumber - 1;
  if (completedMonths === 12) return "First Anniversary";
  if (completedMonths === 24) return "Second Anniversary";
  return `${ordinal(completedMonths)} Monthsary`;
}

export function createMuseumRooms(referenceDate = new Date()): MuseumRoom[] {
  const reference = referenceDate.getTime();
  const newestOpenIndex = designs.reduce((latest, _design, index) => {
    return roomOpeningTimestamp(index) <= reference ? index : latest;
  }, -1);

  return designs.map((design, index) => {
    const roomNumber = index + 1;
    const date = new Date(roomDateTimestamp(index));

    return {
      roomNumber,
      slug: String(roomNumber).padStart(2, "0"),
      date: date.toISOString().slice(0, 10),
      dateLabel: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date),
      relationshipLabel: relationshipLabel(roomNumber),
      designName: design[0],
      description: design[1],
      motif: design[2],
      palette: {
        background: design[3],
        surface: design[4],
        accent: design[5],
        ink: design[6],
      },
      status: index < newestOpenIndex ? "awaiting" : index === newestOpenIndex ? "current" : "future",
    };
  });
}

export function findMuseumRoom(slug: string, rooms = createMuseumRooms()) {
  return rooms.find((room) => room.slug === slug);
}
