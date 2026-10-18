export type RoomPhoto = {
  id: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
  source: "room" | "portrait";
};

export const roomOnePhotos: readonly RoomPhoto[] = [
  {
    id: "01",
    filename: "01-Messenger_creation_35DEAF33-9ED2-4D26-B17F-D6C51C71BA1B.jpeg",
    width: 1152,
    height: 1536,
    alt: "Full-length mirror portrait in a softly lit hallway",
    source: "room",
  },
  {
    id: "02",
    filename: "portrait-08.jpg",
    width: 1536,
    height: 1380,
    alt: "Close portrait outdoors in warm light",
    source: "portrait",
  },
  {
    id: "03",
    filename: "portrait-05.jpg",
    width: 1152,
    height: 1536,
    alt: "Mirror portrait in a white shirt",
    source: "portrait",
  },
] as const;

const roomFilenames = new Set(
  roomOnePhotos.filter((photo) => photo.source === "room").map((photo) => photo.filename),
);

export function isRoomPhotoFilename(filename: string) {
  return roomFilenames.has(filename);
}

export function roomPhotoSource(photo: RoomPhoto) {
  const route = photo.source === "portrait" ? "portrait" : "room-media";
  return `/api/${route}/${encodeURIComponent(photo.filename)}`;
}
