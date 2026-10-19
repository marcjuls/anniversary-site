export type RoomPhoto = {
  id: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
  source: "room" | "portrait";
};

type RoomPhotoSeed = readonly [
  filename: string,
  width: number,
  height: number,
  source: RoomPhoto["source"],
];

function curate(slug: string, seeds: readonly RoomPhotoSeed[]): readonly RoomPhoto[] {
  return seeds.map(([filename, width, height, source], index) => ({
    id: `${slug}-${index + 1}`,
    filename,
    width,
    height,
    alt:
      slug === "13" && index === 0
        ? "Smiling portrait holding a bouquet of pink flowers"
        : `Curated portrait for room ${slug}, frame ${index + 1}`,
    source,
  }));
}

export const roomOnePhotos: readonly RoomPhoto[] = [
  {
    id: "01-1",
    filename: "01-Messenger_creation_35DEAF33-9ED2-4D26-B17F-D6C51C71BA1B.jpeg",
    width: 1152,
    height: 1536,
    alt: "Full-length mirror portrait in a softly lit hallway",
    source: "room",
  },
  {
    id: "01-2",
    filename: "portrait-08.jpg",
    width: 1536,
    height: 1380,
    alt: "Close portrait outdoors in warm light",
    source: "portrait",
  },
  {
    id: "01-3",
    filename: "portrait-05.jpg",
    width: 1152,
    height: 1536,
    alt: "Mirror portrait in a white shirt",
    source: "portrait",
  },
] as const;

export const roomPhotosBySlug: Readonly<Record<string, readonly RoomPhoto[]>> = {
  "01": roomOnePhotos,
  "02": curate("02", [
    ["portrait-14.jpg", 1536, 2048, "portrait"],
    ["portrait-17.jpg", 1536, 2048, "portrait"],
    ["room-02-03.jpeg", 1536, 2048, "room"],
    ["room-02-04.jpeg", 1536, 2048, "room"],
  ]),
  "03": curate("03", [
    ["portrait-18.jpg", 1944, 2592, "portrait"],
    ["room-03-02.jpeg", 1944, 2592, "room"],
    ["portrait-19.jpg", 2048, 1536, "portrait"],
    ["room-03-04.jpeg", 1944, 2592, "room"],
  ]),
  "04": curate("04", [
    ["portrait-13.jpg", 918, 2046, "portrait"],
    ["room-04-02.jpeg", 2048, 1536, "room"],
    ["room-04-03.jpeg", 720, 960, "room"],
    ["room-04-04.jpeg", 720, 960, "room"],
  ]),
  "05": curate("05", [
    ["portrait-12.jpg", 3264, 2448, "portrait"],
    ["room-05-02.jpeg", 3264, 2448, "room"],
    ["portrait-21.jpg", 2592, 1944, "portrait"],
    ["room-05-04.jpeg", 2592, 1944, "room"],
  ]),
  "06": curate("06", [
    ["room-06-01.jpeg", 720, 960, "room"],
    ["room-06-02.jpeg", 960, 720, "room"],
    ["room-06-03.jpeg", 720, 960, "room"],
    ["room-06-04.jpeg", 1182, 2045, "room"],
  ]),
  "07": curate("07", [
    ["room-07-01.jpeg", 1403, 2047, "room"],
    ["room-07-02.jpeg", 2160, 2880, "room"],
    ["room-07-03.jpeg", 2448, 3264, "room"],
    ["room-07-04.jpeg", 1536, 2048, "room"],
  ]),
  "08": curate("08", [
    ["portrait-16.jpg", 1536, 2048, "portrait"],
    ["room-08-02.jpeg", 720, 960, "room"],
    ["room-08-03.jpeg", 720, 960, "room"],
    ["room-08-04.jpeg", 2048, 1536, "room"],
  ]),
  "09": curate("09", [
    ["room-09-01.webp", 540, 960, "room"],
    ["room-09-02.jpeg", 1944, 2592, "room"],
    ["room-09-03.jpeg", 720, 960, "room"],
    ["room-09-04.jpeg", 1944, 2592, "room"],
  ]),
  "10": curate("10", [
    ["room-10-01.jpeg", 1404, 2021, "room"],
    ["room-10-02.jpeg", 960, 720, "room"],
    ["room-10-03.jpeg", 2048, 1536, "room"],
    ["room-10-04.jpeg", 1536, 2048, "room"],
  ]),
  "11": curate("11", [
    ["room-11-01.jpeg", 1536, 2048, "room"],
    ["room-11-02.jpeg", 1536, 2048, "room"],
    ["room-11-03.jpeg", 1536, 2048, "room"],
    ["room-11-04.jpeg", 1536, 2048, "room"],
  ]),
  "12": curate("12", [
    ["room-12-01.webp", 540, 960, "room"],
    ["room-12-02.jpeg", 2048, 2048, "room"],
    ["room-12-03.jpeg", 1536, 2048, "room"],
    ["room-12-04.jpeg", 960, 720, "room"],
  ]),
  "13": curate("13", [
    ["portrait-11.jpg", 1536, 2048, "portrait"],
    ["portrait-22.jpg", 2048, 2048, "portrait"],
    ["portrait-24.jpg", 1944, 2592, "portrait"],
    ["room-13-04.jpeg", 2048, 1536, "room"],
  ]),
  "14": curate("14", [
    ["room-14-01.jpeg", 1944, 2592, "room"],
    ["room-14-02.jpeg", 2048, 1536, "room"],
    ["room-14-03.jpeg", 2048, 1536, "room"],
    ["room-14-04.jpeg", 2592, 1944, "room"],
  ]),
  "15": curate("15", [
    ["room-15-01.jpeg", 720, 960, "room"],
    ["portrait-20.jpg", 720, 960, "portrait"],
    ["room-15-03.jpeg", 720, 960, "room"],
    ["room-15-04.jpeg", 1535, 1379, "room"],
  ]),
  "16": curate("16", [
    ["room-16-01.jpeg", 1536, 2048, "room"],
    ["room-16-02.jpeg", 2592, 1944, "room"],
    ["room-16-03.jpeg", 2592, 1944, "room"],
    ["room-16-04.jpeg", 1536, 2048, "room"],
  ]),
  "17": curate("17", [
    ["room-17-01.jpeg", 2160, 2880, "room"],
    ["room-17-02.jpeg", 641, 960, "room"],
    ["portrait-23.jpg", 1536, 2048, "portrait"],
    ["room-17-04.jpeg", 1536, 2048, "room"],
  ]),
  "18": curate("18", [
    ["room-18-01.jpeg", 1536, 2048, "room"],
    ["room-18-02.jpeg", 720, 400, "room"],
    ["room-18-03.jpeg", 960, 720, "room"],
    ["room-18-04.jpeg", 720, 960, "room"],
  ]),
  "19": curate("19", [
    ["room-19-02.jpeg", 1944, 2592, "room"],
    ["room-19-03.jpeg", 720, 960, "room"],
    ["room-19-04.jpeg", 1536, 2048, "room"],
  ]),
  "20": curate("20", [
    ["room-20-01.jpg", 1152, 1536, "room"],
    ["room-20-02.jpg", 1152, 1536, "room"],
    ["room-20-03.jpg", 1152, 1536, "room"],
    ["room-20-04.jpg", 1152, 1536, "room"],
    ["room-20-05.jpg", 1152, 1536, "room"],
    ["room-20-06.jpg", 1152, 1536, "room"],
  ]),
} as const;

const roomFilenames = new Set(
  Object.values(roomPhotosBySlug)
    .flat()
    .filter((photo) => photo.source === "room")
    .map((photo) => photo.filename),
);

export function isRoomPhotoFilename(filename: string) {
  return roomFilenames.has(filename);
}

export function roomPhotoSource(photo: RoomPhoto) {
  const route = photo.source === "portrait" ? "portrait" : "room-media";
  return `/api/${route}/${encodeURIComponent(photo.filename)}`;
}
