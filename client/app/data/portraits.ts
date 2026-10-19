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
  { id: "11", filename: "portrait-11.jpg", width: 1536, height: 2048, alt: "Smiling portrait holding a bouquet of pink flowers" },
  { id: "12", filename: "portrait-12.jpg", width: 3264, height: 2448, alt: "Bright smiling portrait beside the water" },
  { id: "13", filename: "portrait-13.jpg", width: 918, height: 2046, alt: "Full-length mirror portrait in a white blouse" },
  { id: "14", filename: "portrait-14.jpg", width: 1536, height: 2048, alt: "Seated outdoor portrait in soft sunlight" },
  { id: "15", filename: "portrait-16.jpg", width: 1536, height: 2048, alt: "Outdoor portrait in black with a cross necklace" },
  { id: "16", filename: "portrait-17.jpg", width: 1536, height: 2048, alt: "Smiling portrait seated in a garden" },
  { id: "17", filename: "portrait-18.jpg", width: 1944, height: 2592, alt: "Black-and-white close portrait with bangs" },
  { id: "18", filename: "portrait-19.jpg", width: 2048, height: 1536, alt: "Black-and-white portrait inside a car" },
  { id: "19", filename: "portrait-20.jpg", width: 720, height: 960, alt: "Full-length mirror portrait in a softly lit hall" },
  { id: "20", filename: "portrait-21.jpg", width: 2592, height: 1944, alt: "Smiling outdoor portrait in round sunglasses" },
  { id: "21", filename: "portrait-22.jpg", width: 2048, height: 2048, alt: "Playful portrait beside a colorful ball pit" },
  { id: "22", filename: "portrait-23.jpg", width: 1536, height: 2048, alt: "Black-and-white full-length mirror portrait" },
  { id: "23", filename: "portrait-24.jpg", width: 1944, height: 2592, alt: "Bright smiling portrait in a school uniform" },
] as const;

const portraitFilenames = new Set(portraits.map((portrait) => portrait.filename));

export function isPortraitFilename(filename: string) {
  return portraitFilenames.has(filename);
}

export function portraitSource(filename: string) {
  return `/api/portrait/${encodeURIComponent(filename)}`;
}
