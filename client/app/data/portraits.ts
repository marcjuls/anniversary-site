export type Portrait = {
  id: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
};

export const portraits: readonly Portrait[] = [
  { id: "01", filename: "portrait-01.jpg", width: 1536, height: 1152, alt: "Close portrait by a car window" },
  { id: "02", filename: "portrait-02.jpg", width: 1536, height: 1152, alt: "Playful close portrait resting on one hand" },
  { id: "03", filename: "portrait-03.jpg", width: 1536, height: 1152, alt: "Portrait in soft daylight inside a car" },
  { id: "04", filename: "portrait-04.jpg", width: 1536, height: 1152, alt: "Portrait in green with loose hair framing the face" },
  { id: "05", filename: "portrait-05.jpg", width: 1152, height: 1536, alt: "Mirror portrait in a white shirt" },
  { id: "06", filename: "portrait-06.jpg", width: 1152, height: 1536, alt: "Close smiling portrait in a school uniform" },
  { id: "07", filename: "portrait-07.jpg", width: 1536, height: 1536, alt: "Mirror portrait in a black top" },
  { id: "08", filename: "portrait-08.jpg", width: 1536, height: 1380, alt: "Close portrait outdoors in warm light" },
  { id: "09", filename: "portrait-09.jpg", width: 1152, height: 1536, alt: "Playful portrait in a school uniform" },
  { id: "10", filename: "portrait-10.jpg", width: 1536, height: 1152, alt: "Soft smiling portrait indoors" },
] as const;

const portraitFilenames = new Set(portraits.map((portrait) => portrait.filename));

export function isPortraitFilename(filename: string) {
  return portraitFilenames.has(filename);
}

export function portraitSource(filename: string) {
  return `/api/portrait/${encodeURIComponent(filename)}`;
}
